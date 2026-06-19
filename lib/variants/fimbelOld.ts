// lib/variants/fimbelOld.ts
import { BoardData } from "../../types";

export interface Trial {
  id: number;
  start: BoardData;
  goal: BoardData;
  optimalMoves?: number;
  
}

export const FIMBEL_OLD_TRIALS: Trial[] = [
  { id: 1, optimalMoves: 1, goal: [[], [3], [1,2]], start: [[3], [], [1,2]] },
  { id: 2, optimalMoves: 1, goal: [[1], [], [2,3]], start: [[], [1], [2,3]] },
  { id: 3, optimalMoves: 1, goal: [[], [2,3], [1]], start: [[], [2], [1,3]] },
  { id: 4, optimalMoves: 2, goal: [[2], [3], [1]], start: [[3], [], [1,2]] },
  { id: 5, optimalMoves: 2, goal: [[1], [2,3], []], start: [[], [2], [1,3]] },
  { id: 6, optimalMoves: 2, goal: [[1], [3], [2]], start: [[], [1], [2,3]] },
  { id: 7, optimalMoves: 3, goal: [[1], [2], [3]], start: [[], [2], [1,3]] },
  { id: 8, optimalMoves: 3, goal: [[], [3,1], [2]], start: [[], [1], [2,3]] },
  { id: 9, optimalMoves: 3, goal: [[2], [3,1], []], start: [[3], [], [1,2]] },
  { id: 10, optimalMoves: 4, goal: [[2], [3,1], []], start: [[], [1], [2,3]] },
  { id: 11, optimalMoves: 4, goal: [[], [3,1], [2]], start: [[3], [], [1,2]] },
  { id: 12, optimalMoves: 4, goal: [[], [2], [3,1]], start: [[], [2], [1,3]] },
  { id: 13, optimalMoves: 5, goal: [[], [3], [2,1]], start: [[3], [], [1,2]] },
  { id: 14, optimalMoves: 5, goal: [[2], [3], [1]], start: [[], [1], [2,3]] },
  { id: 15, optimalMoves: 5, goal: [[2], [], [3,1]], start: [[], [2], [1,3]] }
];
