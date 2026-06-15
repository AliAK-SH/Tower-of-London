import React from "react";
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
  LineChart
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
    <div className="min-h-screen bg-[#020b18] text-white p-8 font-sans" dir="rtl">
      
      {/* Header Area */}
      <header className="text-center mb-12 flex flex-col items-center">
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <img
            src="/logo.png"
            alt="University Logo"
            className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        <h1 className="text-5xl font-black mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          آزمون‌های برج لندن
        </h1>

        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="h-px w-8 bg-blue-500"></span>
          <span className="text-blue-400 tracking-[0.3em] uppercase text-sm">
            Tower of London
          </span>
          <span className="h-px w-8 bg-blue-500"></span>
        </div>

        <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed text-sm">
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
              className="group relative block w-full max-w-xs bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:bg-blue-600/20 hover:border-blue-400/50 backdrop-blur-sm"
            >
              <span className="absolute top-4 left-4 text-xs font-mono text-white/20 group-hover:text-blue-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex justify-center mb-4">
                <Icon
                  size={42}
                  className="text-gray-300 group-hover:text-blue-400 transition-colors"
                />
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">
                {v.title}
              </h3>

              <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-tight">
                {v.sub}
              </p>

              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400/20">
                  <ArrowRight size={12} className="rotate-180" />
                </div>
              </div>
            </a>
          );
        })}

        {/* Report Card */}
        <div className="w-full max-w-xs bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center opacity-50">
          <LineChart size={40} className="opacity-50" />
          <h3 className="text-sm font-bold mt-2 italic">گزارش عملکرد</h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-950/20 border border-white/5 rounded-2xl p-6">
        <p className="text-xs text-gray-400">
          ابزاری قدرتمند برای درک بهتر عملکردهای اجرایی و توانمندسازی مداخلات هدفمند.
        </p>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all">
          <span>شروع ارزیابی</span>
          <LineChart size={16} />
        </button>
      </footer>

    </div>
  );
};

export default Home;
