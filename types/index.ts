export type Disk = number;
export type Peg = Disk[];
export type BoardData = Peg[];

export interface Trial {
  id: number;
  start: BoardData;
  goal: BoardData;
  optimalMoves?: number;
}

export interface VariantConfig {
  id: string;
  name: string;
  description: string;
  numDisks: number;
  pegCapacities: number[];
  hasTimeLimit: boolean;
  timeLimitMs?: number;
  hasMoveLimit: boolean;

  trials: Trial[];
}
