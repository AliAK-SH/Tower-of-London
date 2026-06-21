import { Trial } from "../../types";

export const PHILLIPS_A_TRIALS: Trial[] = [
{ id: 1, optimalMoves: 3, start: [[], [4, 3, 2, 1], [5]], goal: [[2, 3], [4], [5, 1]] },
{ id: 2, optimalMoves: 5, start: [[5, 3, 2, 4, 1], [], []], goal: [[], [1, 4, 3], [2, 5]] },
{ id: 3, optimalMoves: 5, start: [[4], [3, 2], [5, 1]], goal: [[2, 4, 3, 1], [], [5]] },
{ id: 4, optimalMoves: 7, start: [[3], [1, 2, 5], [4]], goal: [[], [4, 3], [2, 5, 1]] },
{ id: 5, optimalMoves: 4, start: [[], [3, 5], [1, 4, 2]], goal: [[3, 5], [2], [1, 4]] },
{ id: 6, optimalMoves: 9, start: [[4, 3], [5], [2, 1]], goal: [[3, 5], [2], [1, 4]] },
{ id: 7, optimalMoves: 9, start: [[2], [5, 3], [1, 4]], goal: [[], [], [5, 1, 4, 2, 3]] },
{ id: 8, optimalMoves: 9, start: [[1, 2, 5, 3, 4], [], []], goal: [[2, 3], [], [5, 4, 1]] },
];
