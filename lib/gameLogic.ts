// src/lib/gameLogic.ts
import { BoardData } from '../types';

// Fimbel et al (2009) capacities
export const CAPACITIES = [1, 2, 3]; 

export const isValidMove = (
  board: BoardData,
  fromIndex: number,
  toIndex: number
): { valid: boolean; error?: string } => {
  if (fromIndex === toIndex) return { valid: false, error: "Same peg" };

  // 1. Source must have disks
  if (board[fromIndex].length === 0) {
    return { valid: false, error: "Source peg is empty" };
  }

  // 2. Destination must have space
  if (board[toIndex].length >= CAPACITIES[toIndex]) {
    return { valid: false, error: `Peg ${toIndex + 1} can only hold ${CAPACITIES[toIndex]} disk(s)` };
  }

  return { valid: true };
};

export const isGoalReached = (current: BoardData, goal: BoardData): boolean => {
  return JSON.stringify(current) === JSON.stringify(goal);
};
