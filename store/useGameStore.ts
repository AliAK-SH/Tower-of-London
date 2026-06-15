// src/store/useGameStore.ts
import { create } from 'zustand';
import { BoardData, Move } from '../types';
import { isValidMove as validateMove, isGoalReached } from '../lib/gameLogic';

interface GameState {
  board: BoardData;
  goalBoard: BoardData;
  selectedPeg: number | null; // Track the first click
  moveCount: number;
  isComplete: boolean;
  
  // Actions
  handlePegClick: (pegIndex: number) => void;
  resetGame: (initial: BoardData, goal: BoardData) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: [[], [], []] as unknown as BoardData,
  goalBoard: [[], [], []] as unknown as BoardData,
  selectedPeg: null,
  moveCount: 0,
  isComplete: false,

  handlePegClick: (pegIndex) => {
    const { board, selectedPeg, goalBoard, moveCount } = get();

    // IF NO PEG SELECTED: Select the peg if it has disks
    if (selectedPeg === null) {
      if (board[pegIndex].length > 0) {
        set({ selectedPeg: pegIndex });
      }
      return;
    }

    // IF PEG ALREADY SELECTED: Try to move
    if (selectedPeg === pegIndex) {
      set({ selectedPeg: null }); // Deselect if same peg clicked
      return;
    }

    const validation = validateMove(board, selectedPeg, pegIndex);
    if (validation.valid) {
      const newBoard = board.map(p => [...p]) as unknown as BoardData;
      const disk = newBoard[selectedPeg].pop();
      if (disk) newBoard[pegIndex].push(disk);

      const reached = isGoalReached(newBoard, goalBoard);
      set({
        board: newBoard,
        moveCount: moveCount + 1,
        isComplete: reached,
        selectedPeg: null
      });
    } else {
      // Invalid move: deselect or select the new peg if it has disks
      set({ selectedPeg: board[pegIndex].length > 0 ? pegIndex : null });
    }
  },

  resetGame: (initial, goal) => set({
    board: initial,
    goalBoard: goal,
    selectedPeg: null,
    moveCount: 0,
    isComplete: false
  })
}));
