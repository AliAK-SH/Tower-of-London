"use client";
import React, { useEffect, useState } from "react";
import { VARIANT_DATA_TEST } from "@/lib/variants";
import { VARIANT_DATA_INFO } from "../data/variants";
import { useGameStore } from "@/store/useGameStore";
import { isGoalReached } from "@/lib/gameLogic";

export default function TestTemplate({ variantId }: { variantId: string }) {
  const variant = VARIANT_DATA_TEST[variantId] || VARIANT_DATA_TEST["fimbel-young"];
  const {
    board,
    goalBoard,
    moveCount,
    selectedPeg,
    handlePegClick,
    startTrial,
    setConfig,
    totalTime,
    timeLeft,
    isComplete,
    isFailed,
    stopTotalTimer,
  } = useGameStore();

   const params = new URLSearchParams(window.location.search);
   const variantIdInfo = params.get("variant") || "shallice-random";

   const currentVariant =
     VARIANT_DATA_INFO[variantIdInfo as keyof typeof VARIANT_DATA_INFO] ??
     VARIANT_DATA_INFO["shallice-random"];

  const [trialIndex, setTrialIndex] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setConfig(variant);
    const firstTrial = variant.trials[0];
    startTrial(firstTrial.start, firstTrial.goal);
  }, [variantId, setConfig, startTrial, variant]);

  const handleNextTrial = () => {
    const nextIndex = trialIndex + 1;
    if (nextIndex < variant.trials.length) {
      setTrialIndex(nextIndex);
      const nextTrial = variant.trials[nextIndex];
      startTrial(nextTrial.start, nextTrial.goal);
    }
  };

  const handleSubmitAnswer = () => {
    if (isGoalReached(board, goalBoard)) {
      if (trialIndex === variant.trials.length - 1) {
        stopTotalTimer();
        setShowResultModal(true);
      } else {
        handleNextTrial();
      }
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const isLastTrial = trialIndex === variant.trials.length - 1;
  const buttonText = isLastTrial ? "مشاهده نتایج" : "ثبت پاسخ";

  const userNameValid = /^[A-Za-z]+$/.test(userName);
  const userIdValid = /^[A-Za-z0-9_-]+$/.test(userId);
  const formValid = userNameValid && userIdValid;

  const formatTime = (s: number | null) => {
    if (s === null) return "--:--";
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#020b18] text-white overflow-hidden font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-5">

        {/* Header Section */}
        <div className="grid grid-cols-1 items-start">

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

        <h1 className="text-5xl font-black mb-0.5 py-1 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent" dir="rtl">
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


        </div>

        {/* Target + Info */}
        <div className="mt-8 grid grid-cols-[2fr_1fr_1fr] gap-6">
          {/* Target State */}
          <Panel className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-white/55">حالت هدف (Target State)</div>
              <div className="text-xs text-blue-400 font-mono">GOAL_CONFIG</div>
            </div>
            <div className="flex items-center justify-center gap-10 py-2">
              {goalBoard?.map((disks, i) => (
                <PegDisplay key={`goal-${i}`} id={["A","B","C"][i]} disks={disks} />
              ))}
            </div>
          </Panel>

          <div className="flex flex-col gap-4" dir = "rtl">
            <Panel className="p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>زمان باقی‌مانده</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">◔</div>
              </div>
              <div className="mt-2 text-3xl font-bold tracking-wider">
                {variant.game.hasTrialTimeLimit ? formatTime(variant.game.trialTimeLimit ?? null) : "--:--"}
              </div>
            </Panel>

            <Panel className="p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>محدودیت حرکات</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">↻</div>
              </div>
              <div className="mt-2 text-3xl font-bold tracking-wider">
                {variant.game.hasMoveLimit ? variant.game.moveLimit ?? "--" : "--"}
              </div>
            </Panel>
          </div>

          <div className="flex flex-col gap-4" dir = "rtl">
            <Panel className="p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>مرحله</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">◔</div>
              </div>
              <div className="mt-2 text-3xl font-bold tracking-wider">
                {String((trialIndex + 1))} از {String(((variant.trials.length)))}  
              </div>
            </Panel>

            <Panel className="p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>حرکات انجام شده</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">↻</div>
              </div>
              <div className="mt-2 text-3xl font-bold tracking-wider">
                {String(moveCount).padStart(2, "0")}
              </div>
            </Panel>
          </div>
        </div>

        {/* Workspace */}
        <Panel className="mt-6 p-4 relative">
          <div className="mb-2 text-center text-xs text-white/60">
            {isFailed ? "تعداد حرکات یا زمان مجاز به پایان رسید." : "روی میله مبدا و سپس مقصد کلیک کنید."}
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xl font-semibold text-white/90">فضای کاری</div>
            <div className={`text-sm ${isComplete ? 'text-green-400' : 'text-white/55'}`}>
              {isComplete ? "✓ مرحله تکمیل شد" : "i در حال اجرا"}
            </div>
          </div>

          <div className={`flex items-end justify-center gap-16 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-10 py-8 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.08)] transition-all ${shaking ? 'animate-shake' : ''} ${isComplete ? 'opacity-50' : 'opacity-100'}`}>
            <div className="absolute pointer-events-none h-1/2 w-full max-w-[1200px] rounded-[28px] blur-3xl bg-blue-500/5" />
            {board?.map((disks, i) => (
              <PegDisplay
                key={`play-${i}`}
                id={["A","B","C"][i]}
                disks={disks}
                tall
                isSelected={selectedPeg === i}
                onClick={() => !isComplete && handlePegClick(i)}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={handleSubmitAnswer}
              className={`rounded-xl px-12 py-3 text-sm font-semibold text-white transition ${
                isLastTrial
                  ? "bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_10px_28px_rgba(34,197,94,0.35)] animate-pulse"
                  : "bg-gradient-to-b from-green-500 to-green-700 shadow-[0_10px_28px_rgba(34,197,94,0.35)]"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </Panel>

        {/* Footer */}
        <div className="mt-7 grid grid-cols-[1fr_300px_1fr] gap-4">
          <Panel className="p-4 text-right">
            <div className="mb-2 text-sm font-semibold text-white/80">راهنما</div>
            <ul className="space-y-1 text-xs leading-6 text-white/60">
              <li>• فقط یک مهره را در هر حرکت جابجا کنید.</li>
              <li>• محدودیت حرکات: {variant.trials[trialIndex]?.optimalMoves ?? "--"}</li>
              <li>• محدودیت ظرفیت میله‌ها: {variant.game.pegCapacities.join(" - ")}</li>
            </ul>
          </Panel>

          <Panel className="p-4 text-center flex flex-col justify-center">
            <div className="text-sm font-semibold text-white/80 uppercase">University of Tehran</div>
            <div className="text-[10px] text-white/40 mt-1 tracking-widest">LABORATORY OF COGNITIVE SCIENCE</div>
          </Panel>

          <Panel className="p-4">
            <div className="mb-2 text-sm font-semibold text-white/80">اطلاعات آزمون</div>
            <div className="grid grid-cols-2 gap-y-1 text-xs text-white/55">
              <div>نام آزمون</div>
              <div className="text-left text-white/80">{variant.title}</div>
              <div>زمان کل سپری شده</div>
              <div className="text-left text-white/80 font-mono">{formatTime(totalTime)}</div>
              <div>تعداد مراحل</div>
              <div className="text-left text-white/80">{variant.trials.length}</div>
            </div>
          </Panel>
        </div>
      </div>

      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a1628] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <h2 className="mb-6 text-center text-2xl font-bold text-white/90">ثبت نتایج آزمون</h2>

            <div className="mb-5" dir="rtl">
              <label className="mb-2 block text-sm text-white/70">نام شرکت‌کننده</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Akbarpour"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-white placeholder-white/30 outline-none transition focus:border-blue-500"
              />
              {userName && !userNameValid && (
                <p className="mt-1 text-xs text-red-400">فقط حروف لاتین، بدون فاصله و علامت</p>
              )}
            </div>

            <div className="mb-6" dir="rtl">
              <label className="mb-2 block text-sm text-white/70">شناسه شرکت کننده</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="TOL_1001"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-white placeholder-white/30 outline-none transition focus:border-blue-500"
              />
              {userId && !userIdValid && (
                <p className="mt-1 text-xs text-red-400">فقط حروف و اعداد لاتین، خط تیره و زیرخط، بدون فاصله</p>
              )}
            </div>

            <button
              onClick={() => {
                console.log({ userName, userId });
                setShowResultModal(false);
              }}
              disabled={!formValid}
              className={`w-full rounded-xl px-12 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(34,197,94,0.35)] ${
                formValid
                  ? "bg-gradient-to-b from-blue-500 to-blue-700"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
            >
              ثبت
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function PegDisplay({ id, disks, tall = false, isSelected = false, onClick }: any) {
  return (
    <div className="flex flex-col items-center justify-end gap-2 cursor-pointer group" onClick={onClick}>
      <div className="relative flex items-end justify-center" style={{ height: tall ? 220 : 120, width: 100 }}>
        <div className={`absolute bottom-0 w-[90px] h-[20px] rounded-[999px] border border-white/10 bg-[#1c2740] shadow-xl transition-all ${isSelected ? 'border-blue-500 shadow-blue-500/20' : ''}`} />
        <div className={`absolute bottom-[14px] h-[90%] w-[8px] rounded-full bg-gradient-to-r from-slate-200 via-slate-400 to-slate-100 transition-all ${isSelected ? 'brightness-125' : ''}`} />

        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1">
          {disks?.map((color: string, idx: number) => (
            <DiskItem key={idx} color={color} size={tall ? 48 : 32} />
          ))}
        </div>
      </div>
      <div className={`text-sm font-bold transition-colors ${isSelected ? 'text-blue-400' : 'text-white/50'}`}>{id}</div>
    </div>
  );
}

function DiskItem({ color, size }: { color: string, size: number }) {
  const colorMap: any = {
    red: "radial-gradient(circle at 30% 30%, #ff9aa2 0%, #ef4444 35%, #991b1b 100%)",
    green: "radial-gradient(circle at 30% 30%, #bef264 0%, #22c55e 35%, #14532d 100%)",
    blue: "radial-gradient(circle at 30% 30%, #93c5fd 0%, #3b82f6 35%, #1e3a8a 100%)",
    1: "radial-gradient(circle at 30% 30%, #ff9aa2 0%, #ef4444 35%, #991b1b 100%)",
    2: "radial-gradient(circle at 30% 30%, #bef264 0%, #22c55e 35%, #14532d 100%)",
    3: "radial-gradient(circle at 30% 30%, #93c5fd 0%, #3b82f6 35%, #1e3a8a 100%)",
  };

  return (
    <div 
      className="rounded-full border border-white/20 shadow-lg relative"
      style={{
        width: size,
        height: size * 0.8,
        background: colorMap[color] || color,
      }}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 blur-[1px]" />
      <div className="absolute left-[20%] top-[15%] h-[25%] w-[25%] rounded-full bg-white/30 blur-[1px]" />
    </div>
  );
}
