import { create } from "zustand";
import { BoardData } from "../types";
import { isValidMove as validateMove, isGoalReached } from "../lib/gameLogic";

export interface MetricsState {
  config: any;
  board: BoardData;
  goalBoard: BoardData;
  selectedPeg: number | null;
  moveCount: number;
  isComplete: boolean;
  isFailed: boolean;

  timeLeft: number | null;
  timer?: NodeJS.Timeout;
  totalTime: number;
  totalTimer?: NodeJS.Timeout;

  _sessionStartTime: number;
  _sessionDate: string;
  _trialStartTime: number;
  _firstMoveTime: number | null;
  _finalCorrectSubmitTime: number;
  _currentTrialIndex: number;
  _lastEventTotalTime: number;

  eventLog: any[];
  trialResults: any[];
  totalAttempts: number;
  trialIncorrectAttempts: number;
  trialIncorrectConfigs: string[];
  isTestFinished: boolean;
  testId: string;

  sessionTotalMoveCount: number;
  sessionTotalOptimalMoves: number;
  sessionTotalSuccess: number;
  sessionTotalOptimalSolve: number;

  setConfig: (config: any) => void;
  startTrial: (initial: BoardData, goal: BoardData, trialIndex?: number) => void;
  handlePegClick: (pegIndex: number) => void;
  handleSubmit: (trialIndex: number, optimalMoves: number | undefined) => { action: "shake" } | { action: "finalize"; isLastTrial: boolean };
  stopTotalTimer: () => void;
  resetGame: () => void;
}

export const useGameStore = create<MetricsState>((set, get) => ({
  config: null,
  board: [[], [], []] as BoardData,
  goalBoard: [[], [], []] as BoardData,
  selectedPeg: null,
  moveCount: 0,
  isComplete: false,
  isFailed: false,
  timeLeft: null,
  totalTime: 0,

  _sessionStartTime: 0,
  _sessionDate: "",
  _trialStartTime: 0,
  _firstMoveTime: null,
  _finalCorrectSubmitTime: 0,
  _currentTrialIndex: 0,
  _lastEventTotalTime: 0,

  eventLog: [],
  trialResults: [],
  totalAttempts: 0,
  trialIncorrectAttempts: 0,
  trialIncorrectConfigs: [],
  isTestFinished: false,
  testId: "",

  sessionTotalMoveCount: 0,
  sessionTotalOptimalMoves: 0,
  sessionTotalSuccess: 0,
  sessionTotalOptimalSolve: 0,

  setConfig: (config) => set({ config, testId: config?.id ?? "" }),

  startTrial: (initial, goal, trialIndex = 0) => {
    const { config, timer: oldTimer, totalTimer } = get();

    if (oldTimer) clearInterval(oldTimer);

    if (!totalTimer) {
      const now = Date.now();
      set({ _sessionStartTime: now, _sessionDate: new Date(now).toISOString().slice(0, 10) });
      const tTimer = setInterval(() => {
        set((state) => ({ totalTime: state.totalTime + 1 }));
      }, 1000);
      set({ totalTimer: tTimer });
    }

    const now = Date.now();

    set({
      board: initial,
      goalBoard: goal,
      selectedPeg: null,
      moveCount: 0,
      isComplete: false,
      isFailed: false,
      timeLeft: config?.game?.trialTimeLimit ?? null,
      _trialStartTime: now,
      _firstMoveTime: null,
      _currentTrialIndex: trialIndex,
      trialIncorrectAttempts: 0,
      trialIncorrectConfigs: [],
    });

    if (config?.game?.trialTimeLimit) {
      const timer = setInterval(() => {
        const st = get();
        if (st.isComplete) { clearInterval(timer); return; }
        if (st.timeLeft === null) return;
        if (st.timeLeft <= 1) {
          clearInterval(timer);
          set({ isFailed: true, timeLeft: 0 });
          const st2 = get();
          if (st2.config?.game?.hasMoveLimit) {
            const tIdx = st2._currentTrialIndex;
            const trial = st2.config.trials[tIdx - 1];
            st2.handleSubmit(tIdx, trial?.optimalMoves);
          }
        } else {
          set({ timeLeft: st.timeLeft - 1 });
        }
      }, 1000);
      set({ timer });
    }

    const { _sessionStartTime, testId, _sessionDate, eventLog, board, goalBoard } = get();
    const totalTimeMs = now - _sessionStartTime;
    const startEvent = {
      userName: "", userId: "", testId, trialIndex,
      sessionDate: _sessionDate, eventDateTime: new Date(now).toISOString(),
      currentPattern: JSON.stringify(board),
      endPattern: JSON.stringify(goalBoard),
      eventTime: 0, trialTimeMs: 0, totalTimeMs, moveCount: 0,
      incorrectCompletionAttempts: 0, incorrectCompletionConfig: "[]",
      eventType: "start" as const,
    };
    set({ eventLog: [...eventLog, startEvent], _lastEventTotalTime: totalTimeMs });
  },

  handlePegClick: (pegIndex) => {
    const state = get();
    if (!state.config || state.isComplete || state.isFailed) return;

    if (state.selectedPeg === null) {
      if (state.board[pegIndex].length > 0) set({ selectedPeg: pegIndex });
      return;
    }

    if (state.selectedPeg === pegIndex) {
      set({ selectedPeg: null });
      return;
    }

    const validation = validateMove(state.board, state.selectedPeg, pegIndex, state.config.game.pegCapacities);

    if (!validation.valid) {
      set({ selectedPeg: state.board[pegIndex].length > 0 ? pegIndex : null });
      return;
    }

    const newBoard = state.board.map((p) => [...p]) as BoardData;
    const disk = newBoard[state.selectedPeg].pop();
    if (disk !== undefined) newBoard[pegIndex].push(disk);

    const newMoveCount = state.moveCount + 1;
    const reached = isGoalReached(newBoard, state.goalBoard);
    const currentTrial = state.config.trials[state._currentTrialIndex - 1];
    const effectiveMoveLimit = state.config.game.hasMoveLimit ? currentTrial?.optimalMoves : undefined;
    const atLimit = effectiveMoveLimit !== undefined && newMoveCount >= effectiveMoveLimit;
    const failed = atLimit && !reached;
    const autoComplete = atLimit && reached;

    const firstMove = state._firstMoveTime ?? Date.now();
    const now = Date.now();

    const totalTimeMs = now - state._sessionStartTime;
    const event = {
      userName: "", userId: "", testId: state.testId, trialIndex: state._currentTrialIndex,
      sessionDate: state._sessionDate, eventDateTime: new Date(now).toISOString(),
      currentPattern: JSON.stringify(newBoard),
      endPattern: JSON.stringify(state.goalBoard),
      eventTime: totalTimeMs - state._lastEventTotalTime,
      trialTimeMs: now - state._trialStartTime, totalTimeMs,
      moveCount: newMoveCount,
      incorrectCompletionAttempts: state.trialIncorrectAttempts,
      incorrectCompletionConfig: JSON.stringify(state.trialIncorrectConfigs),
      eventType: "move" as const,
    };

    set({
      board: newBoard, moveCount: newMoveCount, isComplete: autoComplete || state.isComplete, isFailed: failed,
      selectedPeg: null, _firstMoveTime: firstMove,
      eventLog: [...state.eventLog, event],
      _lastEventTotalTime: totalTimeMs,
    });

    const afterState = get();
    if (afterState.config?.game?.hasMoveLimit && (afterState.isComplete || afterState.isFailed)) {
      afterState.handleSubmit(afterState._currentTrialIndex, currentTrial?.optimalMoves);
    }
  },

  handleSubmit: (trialIndex, optimalMoves) => {
    const state = get();
    const now = Date.now();
    const trialTimeMs = now - state._trialStartTime;
    const totalTimeMs = now - state._sessionStartTime;
    const configMatches = isGoalReached(state.board, state.goalBoard);
    const newTotalAttempts = state.totalAttempts + 1;
    const isLast = trialIndex >= (state.config?.trials?.length ?? 1);

    // --- INCORRECT SUBMIT (board doesn't match goal, trial not failed) ---
    if (!configMatches && !state.isFailed) {
      const snapshot = JSON.stringify(state.board.map((p) => [...p]));
      const newConfigs = [...state.trialIncorrectConfigs, snapshot];
      const newIncorrect = state.trialIncorrectAttempts + 1;

      const event = {
        userName: "", userId: "", testId: state.testId, trialIndex,
        sessionDate: state._sessionDate, eventDateTime: new Date(now).toISOString(),
        currentPattern: JSON.stringify(state.board),
        endPattern: JSON.stringify(state.goalBoard),
        eventTime: totalTimeMs - state._lastEventTotalTime,
        trialTimeMs, totalTimeMs, moveCount: state.moveCount,
        incorrectCompletionAttempts: newIncorrect,
        incorrectCompletionConfig: JSON.stringify(newConfigs),
        eventType: "incorrectSubmit" as const,
      };

      set({
        totalAttempts: newTotalAttempts,
        trialIncorrectAttempts: newIncorrect,
        trialIncorrectConfigs: newConfigs,
        eventLog: [...state.eventLog, event],
        _lastEventTotalTime: totalTimeMs,
      });

      return { action: "shake" as const };
    }

    // --- CORRECT SUBMIT (board matches goal, or isFailed forces finalize) ---
    const firstMoveMs = state._firstMoveTime !== null
      ? state._firstMoveTime - state._trialStartTime
      : trialTimeMs;
    const planningMs = firstMoveMs;
    const implMs = Math.max(0, trialTimeMs - firstMoveMs);
    const optMoves = optimalMoves ?? 0;
    const excess = state.moveCount - optMoves;

    const trialSuccess: 0 | 1 = (state.isFailed || !configMatches) ? 0 : 1;

    let optimalSolve: 0 | 1;
    if (state.config?.game?.hasMoveLimit) {
      optimalSolve = trialSuccess;
    } else {
      optimalSolve = state.moveCount === optMoves ? 1 : 0;
    }

    const remainingTimeMs = state.config?.game?.hasTrialTimeLimit && state.config?.game?.trialTimeLimit
      ? (state.config.game.trialTimeLimit * 1000) - trialTimeMs
      : -1;

    const boardSnapshot = JSON.stringify(state.trialIncorrectConfigs);

    const resultEvent = {
      userName: "", userId: "", testId: state.testId, trialIndex,
      sessionDate: state._sessionDate, eventDateTime: new Date(now).toISOString(),
      currentPattern: JSON.stringify(state.board),
      endPattern: JSON.stringify(state.goalBoard),
      eventTime: totalTimeMs - state._lastEventTotalTime,
      trialTimeMs, totalTimeMs, moveCount: state.moveCount,
      incorrectCompletionAttempts: state.trialIncorrectAttempts,
      incorrectCompletionConfig: boardSnapshot,
      eventType: configMatches ? "correctSubmit" as const : "incorrectSubmit" as const,
    };

    const currentTrialData = state.config?.trials[trialIndex - 1];
    const trialResult = {
      userName: "", userId: "", testId: state.testId, trialIndex,
      sessionDate: state._sessionDate,
      startPattern: JSON.stringify(currentTrialData?.start ?? []),
      endPattern: JSON.stringify(currentTrialData?.goal ?? []),
      firstMoveTimeMs: firstMoveMs, planningTimeMs: planningMs,
      implementationTimeMs: implMs, trialTimeMs, remainingTimeMs,
      moveCount: state.moveCount, excessMoves: excess,
      incorrectCompletionAttempts: state.trialIncorrectAttempts,
      incorrectCompletionConfig: boardSnapshot,
      trialSuccess, optimalSolve,
    };

    set({
      isComplete: true,
      totalAttempts: newTotalAttempts,
      eventLog: [...state.eventLog, resultEvent],
      trialResults: [...state.trialResults, trialResult],
      isTestFinished: isLast,
      _lastEventTotalTime: totalTimeMs,
      _finalCorrectSubmitTime: now,
      sessionTotalMoveCount: state.sessionTotalMoveCount + state.moveCount,
      sessionTotalOptimalMoves: state.sessionTotalOptimalMoves + optMoves,
      sessionTotalSuccess: state.sessionTotalSuccess + trialSuccess,
      sessionTotalOptimalSolve: state.sessionTotalOptimalSolve + optimalSolve,
    });

    if (isLast) {
      const { totalTimer } = get();
      if (totalTimer) clearInterval(totalTimer);
      set({ totalTimer: undefined });
    }

    return { action: "finalize" as const, isLastTrial: isLast };
  },

  stopTotalTimer: () => {
    const { totalTimer } = get();
    if (totalTimer) clearInterval(totalTimer);
    set({ totalTimer: undefined });
  },

  resetGame: () => {
    const { timer, totalTimer } = get();
    if (timer) clearInterval(timer);
    if (totalTimer) clearInterval(totalTimer);
    set({
      selectedPeg: null, moveCount: 0, isComplete: false, isFailed: false,
      timeLeft: null, totalTime: 0, totalTimer: undefined,
      _sessionStartTime: 0, _sessionDate: "", _trialStartTime: 0,
      _firstMoveTime: null, _finalCorrectSubmitTime: 0, _currentTrialIndex: 0,
      eventLog: [], trialResults: [], totalAttempts: 0,
      trialIncorrectAttempts: 0, trialIncorrectConfigs: [],
      isTestFinished: false, testId: "",
      sessionTotalMoveCount: 0, sessionTotalOptimalMoves: 0,
      sessionTotalSuccess: 0, sessionTotalOptimalSolve: 0,
    });
  },
}));
