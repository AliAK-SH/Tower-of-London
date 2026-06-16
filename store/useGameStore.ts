// src/store/useGameStore.ts
import { create } from "zustand";
import { BoardData } from "../types";
import { isValidMove as validateMove, isGoalReached } from "../lib/gameLogic";

interface GameState {
  config: any;
  board: BoardData;
  goalBoard: BoardData;
  selectedPeg: number | null;
  moveCount: number;
  isComplete: boolean;
  isFailed: boolean;
  
  // Trial Timer
  timeLeft: number | null;
  timer?: NodeJS.Timeout;

  // Global Session Timer
  totalTime: number;
  totalTimer?: NodeJS.Timeout;

  setConfig: (config: any) => void;
  startTrial: (initial: BoardData, goal: BoardData) => void;
  handlePegClick: (pegIndex: number) => void;
  stopTotalTimer: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  config: null,
  board: [[], [], []] as BoardData,
  goalBoard: [[], [], []] as BoardData,
  selectedPeg: null,
  moveCount: 0,
  isComplete: false,
  isFailed: false,
  timeLeft: null,
  totalTime: 0,

  setConfig: (config) => set({ config }),

  startTrial: (initial, goal) => {
    const { config, timer: oldTimer, totalTimer } = get();
    
    if (oldTimer) clearInterval(oldTimer);

    // Start Global Timer if it hasn't started yet
    if (!totalTimer) {
      const tTimer = setInterval(() => {
        set((state) => ({ totalTime: state.totalTime + 1 }));
      }, 1000);
      set({ totalTimer: tTimer });
    }

    set({
      board: initial,
      goalBoard: goal,
      selectedPeg: null,
      moveCount: 0,
      isComplete: false,
      isFailed: false,
      timeLeft: config?.game?.trialTimeLimit ?? null,
    });

    if (config?.game?.trialTimeLimit) {
      const timer = setInterval(() => {
        const { timeLeft, isComplete } = get();
        if (isComplete) {
          clearInterval(timer);
          return;
        }
        if (timeLeft === null) return;
        if (timeLeft <= 1) {
          clearInterval(timer);
          set({ isFailed: true, timeLeft: 0 });
        } else {
          set({ timeLeft: timeLeft - 1 });
        }
      }, 1000);
      set({ timer });
    }
  },

  handlePegClick: (pegIndex) => {
    const { board, selectedPeg, goalBoard, moveCount, config, isComplete, isFailed, timer } = get();
    if (!config || isComplete || isFailed) return;

    if (selectedPeg === null) {
      if (board[pegIndex].length > 0) set({ selectedPeg: pegIndex });
      return;
    }

    if (selectedPeg === pegIndex) {
      set({ selectedPeg: null });
      return;
    }

    const validation = validateMove(board, selectedPeg, pegIndex, config.game.pegCapacities);

    if (validation.valid) {
      const newBoard = board.map((p) => [...p]) as BoardData;
      const disk = newBoard[selectedPeg].pop();
      if (disk !== undefined) newBoard[pegIndex].push(disk);

      const reached = isGoalReached(newBoard, goalBoard);
      const newMoveCount = moveCount + 1;
      let failed = (config.game.moveLimit && newMoveCount > config.game.moveLimit);

      if (reached && timer) clearInterval(timer);

      set({
        board: newBoard,
        moveCount: newMoveCount,
        isComplete: reached,
        isFailed: failed,
        selectedPeg: null,
      });
    } else {
      set({ selectedPeg: board[pegIndex].length > 0 ? pegIndex : null });
    }
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
      selectedPeg: null,
      moveCount: 0,
      isComplete: false,
      isFailed: false,
      timeLeft: null,
      totalTime: 0,
      totalTimer: undefined
    });
  },
}));
