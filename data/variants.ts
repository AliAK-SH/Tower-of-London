import { RefreshCcw, TimerReset, Scale, Target } from "lucide-react";

export const VARIANT_DATA_INFO = {

  "unconstrained-prog": {
    title: "تست بدون محدودیت (صعودی)",
    sub: "۳ تا ۵ دیسک، ۲۴ مرحله تدریجی",
    rules: [
      {
        title: "در هر حرکت فقط یک مهره جابه‌جا کنید",
        description: "در هر مرحله تنها یک مهره می‌تواند حرکت کند.",
        icon: RefreshCcw
      },
      {
        title: "حرکت آزاد بین میله‌ها",
        description: "می‌توانید مهره بالایی هر میله را به میله دیگر منتقل کنید.",
        icon: TimerReset
      },
      {
        title: "مهره بزرگ روی کوچک قرار نمی‌گیرد",
        description: "مهره بزرگ‌تر نمی‌تواند روی مهره کوچک‌تر قرار گیرد.",
        icon: Scale
      },
      {
        title: "هدف رسیدن به آرایش نهایی است",
        description: "با کمترین تعداد حرکت به آرایش هدف برسید.",
        icon: Target
      }
    ]
  },

  "unconstrained-rand": {
    title: "تست بدون محدودیت (تصادفی)",
    sub: "۳ تا ۵ دیسک، ۲۴ مسئله تصادفی",
    rules: [
      {
        title: "فقط یک مهره در هر حرکت",
        description: "در هر مرحله تنها یک مهره می‌تواند حرکت کند.",
        icon: RefreshCcw
      },
      {
        title: "حرکت آزاد بین میله‌ها",
        description: "می‌توانید مهره بالایی هر میله را به میله دیگر منتقل کنید.",
        icon: TimerReset
      },
      {
        title: "قانون اندازه مهره",
        description: "مهره بزرگ‌تر روی مهره کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "حل مسائل به صورت تصادفی ارائه می‌شود",
        description: "سطح دشواری مسائل به صورت نامنظم نمایش داده می‌شود.",
        icon: Target
      }
    ]
  },

  "shallice-classic": {
    title: "آزمون شالیس (کلاسیک)",
    sub: "۳ دیسک، ۱۲ مسئله استاندارد شالیس",
    rules: [
      {
        title: "فقط یک مهره در هر حرکت",
        description: "حرکت همزمان چند مهره مجاز نیست.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت مشخصی برای قرار دادن مهره‌ها دارد.",
        icon: TimerReset
      },
      {
        title: "مهره بزرگ روی کوچک قرار نمی‌گیرد",
        description: "قانون اندازه مهره باید رعایت شود.",
        icon: Scale
      },
      {
        title: "هدف رسیدن به پاسخ بهینه است",
        description: "بهترین عملکرد زمانی است که مسئله با حداقل حرکت حل شود.",
        icon: Target
      }
    ]
  },

  "shallice-random": {
    title: "آزمون شالیس (تصادفی)",
    sub: "۳ دیسک، ۳۰ مسئله تصادفی با محدودیت شالیس",
    rules: [
      {
        title: "فقط یک مهره در هر حرکت",
        description: "در هر مرحله تنها یک مهره می‌تواند جابه‌جا شود.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله تعداد محدودی مهره می‌تواند نگه دارد.",
        icon: TimerReset
      },
      {
        title: "رعایت اندازه مهره‌ها",
        description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "ارائه مسائل به صورت تصادفی",
        description: "مسائل بدون ترتیب دشواری مشخص ارائه می‌شوند.",
        icon: Target
      }
    ]
  },

  "phillips-a": {
    title: "آزمون فیلیپس - سری A",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر بار فقط یک مهره قابل جابه‌جایی است.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت محدودی برای مهره‌ها دارد.",
        icon: TimerReset
      },
      {
        title: "رعایت اندازه مهره‌ها",
        description: "مهره بزرگ‌تر روی مهره کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "افزایش تدریجی دشواری",
        description: "در هر مرحله مسئله پیچیده‌تر از مرحله قبل است.",
        icon: Target
      }
    ]
  },

  "phillips-b": {
    title: "آزمون فیلیپس - سری B",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر حرکت فقط یک مهره می‌تواند جابه‌جا شود.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "میله‌ها تعداد محدودی مهره می‌توانند نگه دارند.",
        icon: TimerReset
      },
      {
        title: "قانون اندازه مهره",
        description: "مهره بزرگ روی مهره کوچک قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "هدف رسیدن به آرایش هدف",
        description: "مسئله را با کمترین حرکت ممکن حل کنید.",
        icon: Target
      }
    ]
  },

  "phillips-c": {
    title: "آزمون فیلیپس - سری C",
    sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر بار فقط یک مهره قابل جابه‌جایی است.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت مشخصی برای مهره‌ها دارد.",
        icon: TimerReset
      },
      {
        title: "رعایت اندازه مهره‌ها",
        description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "تمرکز بر برنامه‌ریزی حرکتی",
        description: "قبل از حرکت مسیر حل مسئله را برنامه‌ریزی کنید.",
        icon: Target
      }
    ]
  },

  "fimbel-old": {
    title: "آزمون فیمبل (سالمندان)",
    sub: "۳ دیسک، ۱۵ مرحله تخصصی",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر مرحله فقط یک مهره می‌تواند حرکت کند.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت مشخصی دارد.",
        icon: TimerReset
      },
      {
        title: "قانون اندازه مهره",
        description: "مهره بزرگ روی مهره کوچک قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "تمرکز بر دقت در حل مسئله",
        description: "هدف حل صحیح مسائل بدون حرکت اضافی است.",
        icon: Target
      }
    ]
  },

  "fimbel-young": {
    title: "آزمون فیمبل (جوانان)",
    sub: "۳ دیسک، ۳۵ مرحله تخصصی",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر حرکت فقط یک مهره قابل جابه‌جایی است.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت مشخصی برای مهره‌ها دارد.",
        icon: TimerReset
      },
      {
        title: "رعایت اندازه مهره‌ها",
        description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "تمرکز بر سرعت و دقت",
        description: "عملکرد بر اساس سرعت و تعداد حرکت ارزیابی می‌شود.",
        icon: Target
      }
    ]
  },

  "tol-r": {
    title: "آزمون TOL‑R",
    sub: "۳ دیسک، ۳۰ مسئله با محدودیت زمان",
    rules: [
      {
        title: "حرکت تک‌مهره‌ای",
        description: "در هر بار فقط یک مهره قابل جابه‌جایی است.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت زمانی",
        description: "برای هر مسئله زمان محدودی در نظر گرفته شده است.",
        icon: TimerReset
      },
      {
        title: "قانون اندازه مهره",
        description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "برنامه‌ریزی قبل از حرکت",
        description: "بهترین عملکرد زمانی است که قبل از حرکت فکر کنید.",
        icon: Target
      }
    ]
  },

  "tol-dx": {
    title: "آزمون TOL‑DX",
    sub: "۳ دیسک، ۱۵ مسئله استاندارد کلبرتسون",
    rules: [
      {
        title: "حرکت تک مهره‌ای",
        description: "در هر حرکت فقط یک مهره قابل جابه‌جایی است.",
        icon: RefreshCcw
      },
      {
        title: "محدودیت ظرفیت میله‌ها",
        description: "هر میله ظرفیت مشخصی برای مهره‌ها دارد.",
        icon: TimerReset
      },
      {
        title: "رعایت اندازه مهره‌ها",
        description: "مهره بزرگ‌تر روی کوچک‌تر قرار نمی‌گیرد.",
        icon: Scale
      },
      {
        title: "هدف حل دقیق مسائل",
        description: "عملکرد بر اساس تعداد حرکت و دقت پاسخ ارزیابی می‌شود.",
        icon: Target
      }
    ]
  }

};
