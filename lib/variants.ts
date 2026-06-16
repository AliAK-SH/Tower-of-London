// lib/variants.ts
import { RefreshCcw, TimerReset, Scale, Target } from "lucide-react";
import { FIMBEL_OLD_TRIALS } from "./variants/fimbelOld";
import { FIMBEL_YOUNG_TRIALS } from "./variants/fimbelYoung";

export interface VariantConfig {
  id: string;
  title: string;
  sub: string;
  rules: {
    title: string;
    description: string;
    icon: any;
  }[];
  game: {
    disks: number;
    pegCapacities: number[];
    trialTimeLimit?: number;   // seconds per trial
    moveLimit?: number;        // max moves per trial
  };
  trials: any[];
}

export const VARIANT_DATA_TEST: Record<string, VariantConfig> = {
  "fimbel-old": {
    id: "fimbel-old",
    title: "آزمون فیمبل (سالمندان)",
    sub: "۳ دیسک، ۱۵ مرحله تخصصی",
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "قانون اندازه مهره", description: "مهره بزرگ روی مهره کوچک قرار نمی‌گیرد.", icon: Scale },
      { title: "تمرکز بر دقت", description: "هدف حل صحیح مسائل بدون حرکت اضافی است.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      trialTimeLimit: undefined,
      moveLimit: undefined,
    },
    
    trials: FIMBEL_OLD_TRIALS,
  },

  "fimbel-young": {
    id: "fimbel-young",
    title: "آزمون فیمبل (جوانان)",
    sub: "۳ دیسک، ۳۵ مرحله تخصصی",
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر حرکت فقط یک مهره قابل جابه‌جایی است.", icon: RefreshCcw },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی برای مهره‌ها دارد.", icon: TimerReset },
      { title: "رعایت اندازه مهره‌ها", description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.", icon: Scale },
      { title: "تمرکز بر سرعت و دقت", description: "عملکرد بر اساس سرعت و تعداد حرکت ارزیابی می‌شود.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      trialTimeLimit: undefined,
      moveLimit: undefined,
    },
    trials: FIMBEL_YOUNG_TRIALS,
  }
};
