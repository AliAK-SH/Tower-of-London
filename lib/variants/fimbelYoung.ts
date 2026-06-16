// lib/variants/fimbelYoung.ts
import { BoardData } from "../../types";

export interface Trial {
  id: number;
  start: BoardData;
  goal: BoardData;
  optimalMoves?: number;
}

export const FIMBEL_YOUNG_TRIALS: Trial[] = [
  {
    id: 1,
    optimalMoves: 2,
    start: [[], [2], [1, 3]],
    goal: [[3], [], [1, 2]]
  },
  {
    id: 2,
    optimalMoves: 2,
    start: [[], [], [1, 3, 2]],
    goal: [[2], [3], [1]]
  },
  // ✅ Keep remaining trials exactly as you already have them
];
