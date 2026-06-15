import { VariantConfig, BoardData } from "../../types";

export interface Trial {
  id: number;
  start: BoardData;
  goal: BoardData;
  optimalMoves?: number;
}

const trials: Trial[] = [
{
  id: 1,
  goal: [[], [3], [1,2]],
  start: [[3], [], [1,2]]
},
{
  id: 2,
  goal: [[1], [], [2,3]],
  start: [[], [1], [2,3]]
},
{
  id: 3,
  goal: [[], [2,3], [1]],
  start: [[], [2], [1,3]]
},
{
  id: 4,
  goal: [[2], [3], [1]],
  start: [[3], [], [1,2]]
},
{
  id: 5,
  goal: [[1], [2,3], []],
  start: [[], [2], [1,3]]
},
{
  id: 6,
  goal: [[1], [3], [2]],
  start: [[], [1], [2,3]]
},
{
  id: 7,
  goal: [[1], [2], [3]],
  start: [[], [2], [1,3]]
},
{
  id: 8,
  goal: [[], [3,1], [2]],
  start: [[], [1], [2,3]]
},
{
  id: 9,
  goal: [[2], [3,1], []],
  start: [[3], [], [1,2]]
},
{
  id: 10,
  goal: [[2], [3,1], []],
  start: [[], [1], [2,3]]
},
{
  id: 11,
  goal: [[], [3,1], [2]],
  start: [[3], [], [1,2]]
},
{
  id: 12,
  goal: [[], [2], [3,1]],
  start: [[], [2], [1,3]]
},
{
  id: 13,
  goal: [[], [3], [2,1]],
  start: [[3], [], [1,2]]
},
{
  id: 14,
  goal: [[2], [3], [1]],
  start: [[], [1], [2,3]]
},
{
  id: 15,
  goal: [[2], [], [3,1]],
  start: [[], [2], [1,3]]
}
];

export const FIMBEL_OLD: VariantConfig = {
  id: "fimbel-old",
  name: "Tower of London – Fimbel (Old)",
  description: "Color-based 3-disk Tower of London variant based on Fimbel et al.",

  numDisks: 3,

  pegCapacities: [1, 2, 3],

  hasTimeLimit: false,
  hasMoveLimit: false,

  trials
};
