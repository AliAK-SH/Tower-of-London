import { Trial } from "../../types";

export const PHILLIPS_B_TRIALS: Trial[] = [
{ id: 1, optimalMoves: 3, start: [[4, 3], [], [2, 1, 5]], goal: [[4], [5, 1, 3], [2]] },
{ id: 2, optimalMoves: 5, start: [[4, 1], [5, 3, 2], []], goal: [[2, 1, 4, 5], [], [3]] },
{ id: 3, optimalMoves: 5, start: [[1, 3], [4, 5, 2], []], goal: [[], [4, 3, 1, 5], [2]] },
{ id: 4, optimalMoves: 7, start: [[2], [], [5, 4, 3, 1]], goal: [[], [2, 1], [5, 3, 4]] },
{ id: 5, optimalMoves: 7, start: [[4, 2, 1], [3, 5], []], goal: [[], [1], [5, 2, 3, 4]] },
{ id: 6, optimalMoves: 9, start: [[5], [1, 4, 3], [2]], goal: [[], [2, 5, 3], [1, 4]] },
{ id: 7, optimalMoves: 9, start: [[4, 1, 2, 5], [], [3]], goal: [[3, 1, 4], [], [5, 2]] },
{ id: 8, optimalMoves: 11, start: [[], [], [5, 1, 3, 2, 4]], goal: [[], [], [2, 4, 1, 5, 3]] },
];
