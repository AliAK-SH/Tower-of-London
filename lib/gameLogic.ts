import { BoardData } from "../types";

// Default peg capacities for standard Tower of London
export const CAPACITIES = [1, 2, 3];

/**
 * Checks if a move is physically possible based on peg capacities.
 */
export const isValidMove = (
  board: BoardData,
  fromIndex: number,
  toIndex: number,
  capacities: number[]
): { valid: boolean; error?: string } => {
  if (fromIndex === toIndex) return { valid: false, error: "Same peg" };
  if (board[fromIndex].length === 0) return { valid: false, error: "Source empty" };

  // Dynamic capacity check using the provided capacities array
  const targetCapacity = capacities[toIndex] ?? 3; 
  if (board[toIndex].length >= targetCapacity) {
    return { valid: false, error: "Peg full" };
  }

  return { valid: true };
};

/**
 * Compares current board state to the goal state.
 */
export const isGoalReached = (current: BoardData, goal: BoardData): boolean => {
  return current.every((peg, i) => {
    if (peg.length !== goal[i].length) return false;
    return peg.every((disk, j) => disk === goal[i][j]);
  });
};
