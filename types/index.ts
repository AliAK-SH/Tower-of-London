export type Disk = number; // 1, 2, or 3
export type Peg = Disk[];     
export type BoardData = [Peg, Peg, Peg]; // A fixed tuple of 3 pegs

export interface Move {
  fromPeg: number;
  toPeg: number;
  timestamp: number;
}

export interface ToLResult {
  participantId: string;
  trialIndex: number;
  numDisks: number;
  startState: string;
  goalState: string;
  actualMoves: number;
  optimalMoves: number;
  planningTimeMs: number;
  completionTimeMs: number;
  success: boolean;
  score: number;
}
