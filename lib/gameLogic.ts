export const isValidMove = (
  board: BoardData,
  fromIndex: number,
  toIndex: number,
  capacities: number[] // Now passed in dynamically
): { valid: boolean; error?: string } => {
  if (fromIndex === toIndex) return { valid: false, error: "Same peg" };
  if (board[fromIndex].length === 0) return { valid: false, error: "Source empty" };
  
  // Dynamic capacity check
  if (board[toIndex].length >= capacities[toIndex]) {
    return { valid: false, error: "Peg full" };
  }

  return { valid: true };
};