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
  hasTimeLimit: boolean;
  rules: {
    title: string;
    description: string;
    icon?: any;
  }[];
  game: {
    disks: number;
    pegCapacities: number[];
    hasMoveLimit: boolean;
    moveLimit?: number;
    hasTrialTimeLimit: boolean;
    trialTimeLimit?: number;
  };
  trials: Trial[];
}

export type EventType = "start" | "move" | "incorrectSubmit" | "correctSubmit";

export interface EventLogRow {
  userName: string;
  userId: string;
  testId: string;
  trialIndex: number;
  sessionDate: string;
  eventDateTime: string;
  currentPattern: string;
  endPattern: string;
  eventTime: number;
  trialTimeMs: number;
  totalTimeMs: number;
  moveCount: number;
  incorrectCompletionAttempts: number;
  incorrectCompletionConfig: string;
  eventType: EventType;
}

export interface TrialResultRow {
  userName: string;
  userId: string;
  testId: string;
  trialIndex: number;
  sessionDate: string;
  startPattern: string;
  endPattern: string;
  firstMoveTimeMs: number;
  planningTimeMs: number;
  implementationTimeMs: number;
  trialTimeMs: number;
  remainingTimeMs: number;
  moveCount: number;
  excessMoves: number;
  incorrectCompletionAttempts: number;
  incorrectCompletionConfig: string;
  trialSuccess: 0 | 1;
  optimalSolve: 0 | 1;
}

export interface SessionSummaryRow {
  userName: string;
  userId: string;
  testId: string;
  sessionDate: string;
  sessionStartTime: string;
  totalTrials: number;
  totalAttempts: number;
  totalTimeMs: number;
  totalMoveCount: number;
  totalOptimalMoves: number;
  totalExcessMoves: number;
  totalSuccess: number;
  successRate: number;
  totalOptimalSolve: number;
  optimalSolveRate: number;
  moveAccuracy: number;
  attemptAccuracy: number;
}
