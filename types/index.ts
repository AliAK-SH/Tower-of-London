export interface VariantConfig {
  id: string;
  name: string;
  description: string;
  numDisks: number;
  pegCapacities: number[]; // e.g., [1, 2, 3] or [5, 5, 5]
  hasTimeLimit: boolean;
  timeLimitMs?: number;
  hasMoveLimit: boolean;
  moveLimitType?: 'optimal' | 'fixed'; // Some limit moves based on optimal + X
  trials: Trial[];
}