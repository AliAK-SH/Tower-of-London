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
  title: string;
  sub: string;
  rules: {
    title: string;
    description: string;
    icon?: any;
  }[];
  game: {
    disks: number;
    pegCapacities: number[];
    trialTimeLimit?: number;
    moveLimit?: number;
  };
  trials: Trial[];
}
