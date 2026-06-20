
import React from "react";
import ThemeToggle from "./ThemeToggle";
import ThemeLogo from "./ThemeLogo";
import {
  BarChart3,
  Dices,
  Scale,
  Shuffle,
  Layers,
  Users,
  Baby,
  Timer,
  Stethoscope,
  ArrowRight,
  Clock
} from "lucide-react";

const variants = [
  { id: "unconstrained-prog", title: "تست بدون محدودیت (صعودی)", sub: "۳ تا ۵ دیسک، ۲۴ مرحله تدریجی", icon: BarChart3 },
  { id: "unconstrained-rand", title: "تست بدون محدودیت (تصادفی)", sub: "۳ تا ۵ دیسک، ۲۴ مرحله نامنظم", icon: Dices },
  { id: "shallice-classic", title: "آزمون شالیس (کلاسیک)", sub: "۳ دیسک، ۱۲ مسئله استاندارد شالیس", icon: Scale },
  { id: "shallice-random", title: "آزمون شالیس (تصادفی)", sub: "۳ دیسک، ۳۰ مسئله تصادفی با محدودیت شالیس", icon: Shuffle },
  { id: "phillips-a", title: "آزمون فیلیپس - سری A", sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده", icon: Layers },
  { id: "phillips-b", title: "آزمون فیلیپس - سری B", sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده", icon: Layers },
  { id: "phillips-c", title: "آزمون فیلیپس - سری C", sub: "۵ دیسک، ۸ مرحله با دشواری فزاینده", icon: Layers },
  { id: "fimbel-old", title: "آزمون فیمبل (سالمندان)", sub: "۳ دیسک، ۱۵ مرحله تخصصی فیمبل", icon: Users },
  { id: "fimbel-young", title: "آزمون فیمبل (جوانان)", sub: "۳ دیسک، ۳۵ مرحله تخصصی فیمبل", icon: Baby },
  { id: "tol-r", title: "آزمون TOL-R", sub: "۳ دیسک، ۳۰ مسئله (محدودیت زمان و حرکت)", icon: Timer },
  { id: "tol-dx", title: "آزمون TOL-DX", sub: "۳ دیسک، ۱۵ مسئله استاندارد کلبرتسون", icon: Stethoscope },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-page-bg text-text-primary p-8 font-sans" dir="rtl">
      <ThemeToggle />
      
      {/* Header Area */}
      <header className="text-center mb-12 flex flex-col items-center">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-soft-bg blur-3xl rounded-full"></div>
          <ThemeLogo
            className="relative w-32 h-32 md:w-40 md:h-40 object-contain"
            style={{ filter: "drop-shadow(0 0 15px var(--color-logo-shadow))" }}
          />
        </div>

        <h1 className="text-5xl font-black mb-0.5 py-1 bg-gradient-to-b from-title-from to-title-to bg-clip-text text-transparent">
          آزمون‌های برج لندن
        </h1>

          <div className="flex justify-center items-center gap-2 mb-6 mt-6">
            <span className="h-px w-8 bg-blue-500"></span>
            <span className="text-blue-400 tracking-[0.3em] uppercase text-sm">
              Tower of London
            </span>
            <span className="h-px w-8 bg-blue-500"></span>
          </div>

        <p className="max-w-2xl mx-auto text-text-muted leading-relaxed text-sm">
          مجموعه‌ای جامع از آزمون‌های شناختی مبتنی بر تکلیف برج لندن برای ارزیابی برنامه‌ریزی، حل مسئله، و کنترل اجرایی.
          طراحی شده برای پژوهشگران و مراکز ارزیابی عصبی-روانشناختی.
        </p>
      </header>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {variants.map((v, index) => {
          const Icon = v.icon;

          return (
            <a
              key={v.id}
              href={`?variant=${v.id}&step=info`}
              className="group relative block w-full max-w-xs bg-surface-card border border-border-default rounded-2xl p-6 text-center transition-all hover:bg-surface-card-hover hover:border-border-hover backdrop-blur-sm"
            >
              <span className="absolute top-4 left-4 text-xs font-mono text-text-disabled group-hover:text-blue-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex justify-center mb-4">
                <Icon
                  size={42}
                  className="text-text-secondary group-hover:text-blue-400 transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">
                {v.title}
              </h3>

              <p className="text-xs text-text-muted group-hover:text-text-secondary leading-tight">
                {v.sub}
              </p>

              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 rounded-full border border-border-strong flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-soft-bg">
                  <ArrowRight size={12} className="rotate-180" />
                </div>
              </div>
            </a>
          );
        })}

        {/* Report Card */}
        <div className="relative block w-full max-w-xs bg-surface-card border border-border-default rounded-2xl p-6 text-center opacity-50 backdrop-blur-sm">
          <div className="flex justify-center mb-4">
            <Clock size={42} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-bold mb-2">به زودی...</h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 max-w-6xl mx-auto">
        <div className="bg-surface-panel border border-border-light rounded-2xl p-6 backdrop-blur-sm">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">

            <div>
              <h4 className="text-sm font-bold text-text-primary mb-2">
                هدف سامانه
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                اجرای نسخه‌های مختلف آزمون برج لندن برای سنجش برنامه‌ریزی، حل مسئله و کنترل اجرایی.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-text-primary mb-2">
                کاربرد
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                مناسب برای پژوهشگران، درمانگران، مراکز ارزیابی شناختی و مطالعات عصب‌روان‌شناختی.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-text-primary mb-2">
                توجه
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                نتایج آزمون باید همراه با سایر اطلاعات بالینی و پژوهشی تفسیر شوند.
              </p>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-text-faint">
              نسخه ۱.۰
            </span>

            <span className="text-[11px] text-text-faint">
              © {new Date().getFullYear()} Tower of London Cognitive Assessment
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;
