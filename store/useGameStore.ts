// src/store/useGameStore.ts
import { create } from "zustand";
import { BoardData, VariantConfig } from "../types";
import { isValidMove as validateMove, isGoalReached } from "../lib/gameLogic";

interface GameState {
  config: VariantConfig | null;

  board: BoardData;
  goalBoard: BoardData;

  selectedPeg: number | null;
  moveCount: number;
  isComplete: boolean;

  // actions
  setConfig: (config: VariantConfig) => void;
  handlePegClick: (pegIndex: number) => void;
  resetGame: (initial: BoardData, goal: BoardData) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  config: null,

  board: [[], [], []] as unknown as BoardData,
  goalBoard: [[], [], []] as unknown as BoardData,

  selectedPeg: null,
  moveCount: 0,
  isComplete: false,

  setConfig: (config) => set({ config }),

  handlePegClick: (pegIndex) => {
    const { board, selectedPeg, goalBoard, moveCount, config } = get();

    if (!config) return;

    // FIRST CLICK — select peg if it has disks
    if (selectedPeg === null) {
      if (board[pegIndex].length > 0) {
        set({ selectedPeg: pegIndex });
      }
      return;
    }

    // CLICKED SAME PEG — deselect
    if (selectedPeg === pegIndex) {
      set({ selectedPeg: null });
      return;
    }

    const validation = validateMove(
      board,
      selectedPeg,
      pegIndex,
      config.pegCapacities
    );

    if (validation.valid) {
      const newBoard = board.map((p) => [...p]) as unknown as BoardData;

      const disk = newBoard[selectedPeg].pop();
      if (disk) newBoard[pegIndex].push(disk);

      const reached = isGoalReached(newBoard, goalBoard);

      set({
        board: newBoard,
        moveCount: moveCount + 1,
        isComplete: reached,
        selectedPeg: null,
      });
    } else {
      // invalid move — optionally select the new peg if it has disks
      set({
        selectedPeg: board[pegIndex].length > 0 ? pegIndex : null,
      });
    }
  },

  resetGame: (initial, goal) =>
    set({
      board: initial,
      goalBoard: goal,
      selectedPeg: null,
      moveCount: 0,
      isComplete: false,
    }),
}));
