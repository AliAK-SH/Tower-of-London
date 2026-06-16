// lib/variants/fimbelYoung.ts
import { BoardData } from "../../types";

export interface Trial {
  id: number;
  start: BoardData;
  goal: BoardData;
  optimalMoves?: number;
}

export const FIMBEL_YOUNG_TRIALS: Trial[] = [
  { id: 1, optimalMoves: 2, start: [[], [2], [1, 3]], goal: [[3], [], [1, 2]] },
  { id: 2, optimalMoves: 2, start: [[], [], [1, 3, 2]], goal: [[2], [3], [1]] },
  { id: 3, optimalMoves: 2, start: [[], [3, 2], [1]], goal: [[2], [], [1, 3]] },
  { id: 4, optimalMoves: 2, start: [[3], [2, 1], []], goal: [[3], [], [1, 2]] },
  { id: 5, optimalMoves: 2, start: [[3], [1, 2], []], goal: [[], [1], [3, 2]] },
  { id: 6, optimalMoves: 3, start: [[], [2], [3, 1]], goal: [[], [1, 2], [3]] },
  { id: 7, optimalMoves: 3, start: [[], [2, 1], [3]], goal: [[], [1], [3, 2]] },
  { id: 8, optimalMoves: 3, start: [[], [1], [2, 3]], goal: [[], [3], [2, 1]] },
  { id: 9, optimalMoves: 3, start: [[], [3], [2, 1]], goal: [[], [1], [2, 3]] },
  { id: 10, optimalMoves: 3, start: [[], [3, 1], [2]], goal: [[], [3, 2], [1]] },
  { id: 11, optimalMoves: 4, start: [[2], [1, 3], []], goal: [[], [2, 1], [3]] },
  { id: 12, optimalMoves: 4, start: [[2], [], [1, 3]], goal: [[1], [3], [2]] },
  { id: 13, optimalMoves: 4, start: [[], [2], [3, 1]], goal: [[], [2], [1, 3]] },
  { id: 14, optimalMoves: 4, start: [[2], [], [1, 3]], goal: [[], [2, 1], [3]] },
  { id: 15, optimalMoves: 4, start: [[1], [3], [2]], goal: [[], [], [1, 2, 3]] },
  { id: 16, optimalMoves: 5, start: [[2], [], [1, 3]], goal: [[3], [], [2, 1]] },
  { id: 17, optimalMoves: 5, start: [[], [], [3, 1, 2]], goal: [[], [2], [1, 3]] },
  { id: 18, optimalMoves: 5, start: [[1], [], [2, 3]], goal: [[2], [], [3, 1]] },
  { id: 19, optimalMoves: 5, start: [[], [1, 2], [3]], goal: [[3], [2, 1], []] },
  { id: 20, optimalMoves: 5, start: [[2], [], [3, 1]], goal: [[], [2], [1, 3]] },
  { id: 21, optimalMoves: 6, start: [[], [], [1, 3, 2]], goal: [[], [], [3, 1, 2]] },
  { id: 22, optimalMoves: 6, start: [[2], [], [3, 1]], goal: [[], [], [1, 2, 3]] },
  { id: 23, optimalMoves: 6, start: [[], [2], [1, 3]], goal: [[2], [1], [3]] },
  { id: 24, optimalMoves: 6, start: [[2], [], [1, 3]], goal: [[], [], [3, 1, 2]] },
  { id: 25, optimalMoves: 6, start: [[], [], [3, 2, 1]], goal: [[3], [], [1, 2]] },
  { id: 26, optimalMoves: 7, start: [[], [3, 2], [1]], goal: [[], [], [3, 1, 2]] },
  { id: 27, optimalMoves: 5, start: [[3], [2], [1]], goal: [[], [1], [3, 2]] },
  { id: 28, optimalMoves: 7, start: [[1], [2, 3], []], goal: [[1], [3], [2]] },
  { id: 29, optimalMoves: 7, start: [[2], [1, 3], []], goal: [[2], [3], [1]] },
  { id: 30, optimalMoves: 7, start: [[], [3], [2, 1]], goal: [[], [], [3, 1, 2]] },
  { id: 31, optimalMoves: 8, start: [[2], [], [1, 3]], goal: [[2], [1, 3], []] },
  { id: 32, optimalMoves: 8, start: [[], [2, 3], [1]], goal: [[], [], [2, 3, 1]] },
  { id: 33, optimalMoves: 8, start: [[3], [2, 1], []], goal: [[3], [], [2, 1]] },
  { id: 34, optimalMoves: 8, start: [[1], [2], [3]], goal: [[1], [3], [2]] },
  { id: 35, optimalMoves: 8, start: [[3], [1, 2], []], goal: [[], [], [1, 3, 2]] }
];
