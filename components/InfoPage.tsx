import React from "react";
import { ArrowLeft, CircleAlert, Play, RefreshCcw, Scale, Target, TimerReset } from "lucide-react";
import { VARIANT_DATA_INFO } from "../data/variants";

const DEFAULT_RULES = [
  { title: "در هر حرکت، فقط یک مهره را جابه‌جا کنید.", description: "هر حرکت باید از روی یک مهره انجام شود.", icon: RefreshCcw },
  { title: "هر مهره را می‌توان فقط روی میله‌ی دیگر قرار داد.", description: "حرکت‌ها باید روی میله‌های مجاز انجام شوند.", icon: TimerReset },
  { title: "مهره‌ی بزرگ‌تر نمی‌تواند روی کوچک‌تر قرار گیرد.", description: "قانون اصلی آزمون را رعایت کنید.", icon: Scale },
  { title: "هدف، رسیدن به آرایش هدف با کمترین تعداد حرکت است.", description: "عملکرد شما بر اساس دقت و کارایی سنجیده می‌شود.", icon: Target },
];

const InfoPage: React.FC = () => {

  // Get variant from URL
  const params = new URLSearchParams(window.location.search);
  const variantId = params.get("variant") || "shallice-random";

  // Find variant safely
  const currentVariant =
    VARIANT_DATA_INFO[variantId as keyof typeof VARIANT_DATA_INFO] ??
    VARIANT_DATA_INFO["shallice-random"];

  // Load rules dynamically
  const rules = currentVariant.rules ?? DEFAULT_RULES;

  const handleStart = () => {
    window.location.search = `?variant=${variantId}&step=test`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#020b18] text-white flex items-start justify-center px-4 py-6 md:py-8 font-sans">
      <div className="w-full max-w-[760px]">

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

        <h1 className="text-5xl font-black mb-0.5 py-1 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {currentVariant.title}
        </h1>

          <div className="flex justify-center items-center gap-2 mb-6 mt-6">
            <span className="h-px w-8 bg-blue-500"></span>
            <span className="text-blue-400 tracking-[0.3em] uppercase text-sm">
              Tower of London
            </span>
            <span className="h-px w-8 bg-blue-500"></span>
          </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-1 text-[12px] text-white/70">
              <span>{currentVariant.sub}</span>
            </div>
      </header>

        {/* Section 1 */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e3a8a] text-white text-sm font-bold shadow-inner">۱</span>
            <h2 className="text-[18px] font-bold">چه کاری انجام خواهید داد؟</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <p className="text-[15px] leading-8 text-white/80 text-justify">
            در این آزمون، مجموعه‌ای از مسائل را مشاهده می‌کنید. در هر مسئله، آرایش اولیه‌ای از مهره‌ها به شما نشان داده می‌شود و هدف شما دستیابی به آرایش هدف با کمترین تعداد حرکت ممکن است.
          </p>
        </section>

        {/* Section 2: Rules */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e3a8a] text-white text-sm font-bold shadow-inner">۲</span>
            <h2 className="text-[18px] font-bold">قوانین</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rules.map((card, idx) => {
              const Icon = card.icon;

              return (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c3357] border border-white/5 text-blue-300">
                    <Icon size={24} />
                  </div>

                  <p className="text-[13px] font-medium leading-6 text-white/90 mb-2">
                    {card.title}
                  </p>

                  <p className="text-[11px] leading-5 text-white/50">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Example */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e3a8a] text-white text-sm font-bold shadow-inner">۳</span>
            <h2 className="text-[18px] font-bold">مثال مسئله</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <TowerStack colors={["#8b5cf6", "#3b82f6"]} label="آرایش اولیه" />
            </div>

            <ArrowLeft className="text-white/30" size={32} />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <TowerStack colors={["#22c55e", "#f59e0b", "#ef4444"]} label="آرایش هدف" />
            </div>
          </div>
        </section>

        {/* Warning */}
        <section className="mt-10">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex gap-4">
            <CircleAlert className="text-amber-400 shrink-0" size={22} />

            <div>
              <p className="font-bold text-amber-200 mb-1 text-[15px]">نکته مهم</p>
              <p className="text-[13px] leading-6 text-amber-100/70">
                پس از شروع آزمون نمی‌توانید فرآیند را متوقف کرده، مکث کنید یا به عقب برگردید. لطفا در محیطی آرام و بدون مزاحمت در آزمون شرکت کنید.
              </p>
            </div>
          </div>
        </section>

        {/* Start Button */}
        <div className="mt-10 mb-6 flex justify-center">
          <button
            onClick={handleStart}
            className="group min-w-[240px] rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <span>شروع آزمون</span>
            <Play size={18} className="fill-white" />
          </button>
        </div>

      </div>
    </div>
  );
};

function TowerStack({ colors, label }: { colors: string[], label: string }) {
  return (
    <div className="flex flex-col items-center h-full">
      <p className="text-[11px] text-white/40 mb-4 uppercase tracking-tighter">{label}</p>

      <div className="flex flex-col-reverse items-center gap-1 mb-1 h-20 justify-start">
        {colors.map((c, i) => (
          <div key={i} className="rounded-full w-5 h-5 shadow-lg" style={{ background: c }} />
        ))}
      </div>

      <div className="w-full h-1 bg-white/20 rounded-full"></div>
    </div>
  );
}

export default InfoPage;
