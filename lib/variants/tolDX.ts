import { Trial } from "../../types";

export const TOL_DX_TRIALS: Trial[] = [
{ id: 1, optimalMoves: 3, start: [[], [3], [2, 1]], goal: [[], [1], [2, 3]] },
{ id: 2, optimalMoves: 3, start: [[], [3], [2, 1]], goal: [[2], [3], [1]] },
{ id: 3, optimalMoves: 3, start: [[], [3], [2, 1]], goal: [[], [1, 3], [2]] },
{ id: 4, optimalMoves: 4, start: [[], [3], [2, 1]], goal: [[], [3], [1, 2]] },
{ id: 5, optimalMoves: 4, start: [[], [3], [2, 1]], goal: [[], [1, 2], [3]] },
{ id: 6, optimalMoves: 4, start: [[], [3], [2, 1]], goal: [[2], [1, 3], []] },
{ id: 7, optimalMoves: 5, start: [[], [3], [2, 1]], goal: [[2], [1], [3]] },
{ id: 8, optimalMoves: 5, start: [[], [3], [2, 1]], goal: [[3], [], [1, 2]] },
{ id: 9, optimalMoves: 5, start: [[], [3], [2, 1]], goal: [[], [1], [3, 2]] },
{ id: 10, optimalMoves: 6, start: [[], [3], [2, 1]], goal: [[], [2, 3], [1]] },
{ id: 11, optimalMoves: 6, start: [[], [3], [2, 1]], goal: [[1], [], [3, 2]] },
{ id: 12, optimalMoves: 6, start: [[], [3], [2, 1]], goal: [[3], [2], [1]] },
{ id: 13, optimalMoves: 7, start: [[], [3], [2, 1]], goal: [[], [2], [3, 1]] },
{ id: 14, optimalMoves: 7, start: [[], [3], [2, 1]], goal: [[], [], [3, 1, 2]] },
{ id: 15, optimalMoves: 7, start: [[], [3], [2, 1]], goal: [[1], [2], [3]] },
];
