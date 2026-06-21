// lib/variants.ts
import { RefreshCcw, TimerReset, Scale, Target } from "lucide-react";
import { FIMBEL_OLD_TRIALS } from "./variants/fimbelOld";
import { FIMBEL_YOUNG_TRIALS } from "./variants/fimbelYoung";
import { TOL_R_TRIALS } from "./variants/tolR";
import { TOL_DX_TRIALS } from "./variants/tolDX";
import { VariantConfig } from "../types";
import { SHALLICE_CLASSIC_TRIALS } from "./variants/shalliceClassic";
import { SHALLICE_RANDOM_TRIALS } from "./variants/shalliceRandom";
import { UNCON_PRO_TRIALS } from "./variants/unconstrainedPro";
import { UNCON_RAN_TRIALS } from "./variants/unconstrainedRan";
import { PHILLIPS_A_TRIALS } from "./variants/phillips-a";
import { PHILLIPS_B_TRIALS } from "./variants/phillips-b";
import { PHILLIPS_C_TRIALS } from "./variants/phillips-c";

export const VARIANT_DATA_TEST: Record<string, VariantConfig> = {

  "unconstrained-prog": {
    id: "unconstrained-prog",
    title: "تست صعودی بدون محدودیت",
    sub: "۳ تا ۵ دیسک، ۲۴ مرحله با افزایش سختی",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 5,
      pegCapacities: [5, 5, 5],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: UNCON_PRO_TRIALS,
  },

  "unconstrained-rand": {
    id: "unconstrained-rand",
    title: "تست صعودی بدون محدودیت",
    sub: "۳ تا ۵ دیسک، ۲۴ مرحله نامنظم",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 5,
      pegCapacities: [5, 5, 5],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: UNCON_RAN_TRIALS,
  },


  "shallice-classic": {
    id: "shallice-classic",
    title: "آزمون کلاسیک شالیس",
    sub: "۳ دیسک، ۱۲ مسئله استاندارد شالیس",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: true,
      hasTrialTimeLimit: false,
    },

    trials: SHALLICE_CLASSIC_TRIALS,
  },

  "shallice-random": {
    id: "shallice-random",
    title: "آزمون کلاسیک شالیس",
    sub: "۳ دیسک، ۱۲ مسئله استاندارد شالیس",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: SHALLICE_RANDOM_TRIALS,
  },

"phillips-a": {
    id: "phillips-a",
    title: "آزمون فیلیپس - سری A",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 5,
      pegCapacities: [5, 5, 5],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: PHILLIPS_A_TRIALS,
  },

  "phillips-b": {
    id: "phillips-b",
    title: "آزمون فیلیپس - سری B",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 5,
      pegCapacities: [5, 5, 5],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: PHILLIPS_B_TRIALS,
  },

  "phillips-c": {
    id: "phillips-c",
    title: "آزمون فیلیپس - سری C",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 5,
      pegCapacities: [5, 5, 5],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: PHILLIPS_C_TRIALS,
  },

  "fimbel-old": {
    id: "fimbel-old",
    title: "آزمون فیمبل (سالمندان)",
    sub: "۳ دیسک، ۱۵ مرحله تخصصی",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "قانون اندازه مهره", description: "مهره بزرگ روی مهره کوچک قرار نمی‌گیرد.", icon: Scale },
      { title: "تمرکز بر دقت", description: "هدف حل صحیح مسائل بدون حرکت اضافی است.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },

    trials: FIMBEL_OLD_TRIALS,
  },

  "fimbel-young": {
    id: "fimbel-young",
    title: "آزمون فیمبل (جوانان)",
    sub: "۳ دیسک، ۳۵ مرحله تخصصی",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر حرکت فقط یک مهره قابل جابه‌جایی است.", icon: RefreshCcw },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی برای مهره‌ها دارد.", icon: TimerReset },
      { title: "رعایت اندازه مهره‌ها", description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.", icon: Scale },
      { title: "تمرکز بر سرعت و دقت", description: "عملکرد بر اساس سرعت و تعداد حرکت ارزیابی می‌شود.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },
    trials: FIMBEL_YOUNG_TRIALS,
  },

  "tol-r": {
    id: "tol-r",
    title: "آزمون TOL-R)",
    sub: "۳ دیسک، ۱۵ مرحله ۳۰ مسئله (محدودیت زمان و حرکت)",
    hasTimeLimit: true,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "محدودیت زمان و حرکت", description: "هر مرحله دارای محدودیت زمانی و تعداد حرکات است.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: true,
      hasTrialTimeLimit: true,
      trialTimeLimit: 120, // 2 دقیقه
    },

    trials: TOL_R_TRIALS,
  },

    "tol-dx": {
    id: "tol-dx",
    title: "آزمون TOL-DX",
    sub: "۳ دیسک، ۱۵ مسئله استاندارد کلبرتسون",
    hasTimeLimit: false,
    rules: [
      { title: "حرکت تک مهره‌ای", description: "در هر حرکت فقط یک مهره قابل جابه‌جایی است.", icon: RefreshCcw },
      { title: "مهره‌های قابل حرکت", description: "تنها مهره‌هایی که در بالای میله قرار دارند قابل جابه‌جایی هستند.", icon: Scale },
      { title: "محدودیت ظرفیت میله‌ها", description: "هر میله ظرفیت مشخصی دارد.", icon: TimerReset },
      { title: "تمرکز بر سرعت و دقت", description: "عملکرد بر اساس سرعت و تعداد حرکت ارزیابی می‌شود.", icon: Target },
    ],
    game: {
      disks: 3,
      pegCapacities: [1, 2, 3],
      hasMoveLimit: false,
      hasTrialTimeLimit: false,
    },
    trials: TOL_DX_TRIALS,
    },
};
