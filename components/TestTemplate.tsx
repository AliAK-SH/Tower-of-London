"use client";
import React, { useEffect, useState } from "react";
import { VARIANT_DATA_TEST } from "@/lib/variants";
import { VARIANT_DATA_INFO } from "../data/variants";
import { useGameStore } from "@/store/useGameStore";
import { isGoalReached } from "@/lib/gameLogic";
import { exportAll } from "@/utils/exports";
import { SessionSummaryRow, EventLogRow, TrialResultRow } from "@/types";

export default function TestTemplate({ variantId }: { variantId: string }) {
  const variant = VARIANT_DATA_TEST[variantId] || VARIANT_DATA_TEST["fimbel-young"];
  const {
    board,
    goalBoard,
    moveCount,
    selectedPeg,
    handlePegClick,
    handleSubmit,
    startTrial,
    setConfig,
    totalTime,
    timeLeft,
    isComplete,
    isFailed,
    stopTotalTimer,
    eventLog,
    trialResults,
    totalAttempts,
    isTestFinished,
    testId,
    _sessionStartTime,
    _sessionDate,
    sessionTotalMoveCount,
    sessionTotalOptimalMoves,
    sessionTotalSuccess,
    sessionTotalOptimalSolve,
    config,
    _finalCorrectSubmitTime,
  } = useGameStore();

  const params = new URLSearchParams(window.location.search);
  const variantIdInfo = params.get("variant") || "shallice-random";

  const currentVariant =
    VARIANT_DATA_INFO[variantIdInfo as keyof typeof VARIANT_DATA_INFO] ??
    VARIANT_DATA_INFO["shallice-random"];

  const [trialIndex, setTrialIndex] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [showCorrectFlash, setShowCorrectFlash] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setConfig(variant);
    const firstTrial = variant.trials[0];
    startTrial(firstTrial.start, firstTrial.goal, 1);
  }, [variantId, setConfig, startTrial, variant]);

  const handleNextTrial = () => {
    const nextIndex = trialIndex + 1;
    if (nextIndex < variant.trials.length) {
      setTrialIndex(nextIndex);
      const nextTrial = variant.trials[nextIndex];
      startTrial(nextTrial.start, nextTrial.goal, nextIndex + 1);
    }
  };

  const handleSubmitAnswer = () => {
    const currentTrial = variant.trials[trialIndex];
    const result = handleSubmit(trialIndex + 1, currentTrial.optimalMoves);

    if (result.action === "shake") {
      setShaking(true);
      setTimeout(() => setShaking(false), 1000);
    } else {
      setShowCorrectFlash(true);
      setTimeout(() => {
        setShowCorrectFlash(false);
        if (result.isLastTrial) {
          setShowResultModal(true);
        } else {
          handleNextTrial();
        }
      }, 1000);
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

  const handleSaveAndExport = () => {
    const userEventLog: EventLogRow[] = eventLog.map((e: any) => ({
      ...e,
      userName,
      userId,
    }));
    const userTrialResults: TrialResultRow[] = trialResults.map((r: any) => ({
      ...r,
      userName,
      userId,
    }));

    const totalTrials = variant.trials.length;
    const totalTimeMs = _finalCorrectSubmitTime > 0
      ? _finalCorrectSubmitTime - _sessionStartTime
      : 0;

    const totalOpt = sessionTotalOptimalMoves;
    const totalExcess = sessionTotalMoveCount - totalOpt;
    const successRate = totalTrials > 0 ? sessionTotalSuccess / totalTrials : 0;
    const optimalSolveRate = totalTrials > 0 ? sessionTotalOptimalSolve / totalTrials : 0;

    let moveAccuracy: number;
    if (config?.game?.hasMoveLimit) {
      moveAccuracy = -1;
    } else if (totalOpt === 0) {
      moveAccuracy = -1;
    } else {
      moveAccuracy = 1 - (totalExcess / totalOpt);
    }

    const attemptAccuracy = totalTrials > 0
      ? 1 - ((totalAttempts - totalTrials) / totalTrials)
      : 0;

    const summary: SessionSummaryRow = {
      userName,
      userId,
      testId,
      sessionDate: _sessionDate,
      sessionStartTime: new Date(_sessionStartTime).toISOString(),
      totalTrials,
      totalAttempts,
      totalTimeMs,
      totalMoveCount: sessionTotalMoveCount,
      totalOptimalMoves: totalOpt,
      totalExcessMoves: totalExcess,
      totalSuccess: sessionTotalSuccess,
      successRate,
      totalOptimalSolve: sessionTotalOptimalSolve,
      optimalSolveRate,
      moveAccuracy,
      attemptAccuracy,
    };

    exportAll(userEventLog, userTrialResults, summary);
    setShowResultModal(false);
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#020b18] text-white overflow-hidden font-sans">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-5">

        <div className="grid grid-cols-1 items-start">

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

        <div className="mt-8 grid grid-cols-[2fr_1fr_1fr] gap-6">
          <Panel className="p-4">
            <div className="mb-2 text-center">
              <div className="text-l font-semibold text-white/90">الگوی هدف</div>
            </div>
            <div className="flex items-end justify-center gap-10 py-2">
              {goalBoard?.map((disks, i) => (
                <PegDisplay key={`goal-${i}`} id={["A","B","C"][i]} disks={disks} capacity={variant.game.pegCapacities[i]} />
              ))}
            </div>
          </Panel>

          <div className="flex flex-col gap-4" dir="rtl">
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

          <div className="flex flex-col gap-4" dir="rtl">
            <Panel className="p-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>مرحله</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">◔</div>
              </div>
              <div className="mt-2 text-3xl font-bold tracking-wider">
                {String(trialIndex + 1)} از {String(variant.trials.length)}
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

        <Panel className="mt-6 p-4 relative">
          <div className="mb-2 text-center">
            <div className="text-xl font-semibold text-white/90">فضای تعاملی</div>
          </div>
          <div className="mb-2 text-center text-xs text-white/60">.روی میله مبدا و سپس مقصد کلیک کنید</div>

          <div className={`relative flex items-end justify-center gap-16 rounded-[28px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-10 py-8 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.08)] transition-all ${shaking ? 'animate-shake border-red-500/40' : ''} ${showCorrectFlash ? 'animate-flash-green border-green-400/40' : ''} ${isFailed ? 'border-red-500/40' : ''} ${!shaking && !showCorrectFlash && !isFailed ? 'border-white/10' : ''}`}>
            <div className="absolute pointer-events-none h-1/2 w-full max-w-[1200px] rounded-[28px] blur-3xl bg-blue-500/5" />
            {board?.map((disks, i) => (
              <PegDisplay
                key={`play-${i}`}
                id={["A","B","C"][i]}
                disks={disks}
                tall
                capacity={variant.game.pegCapacities[i]}
                isSelected={selectedPeg === i}
                onClick={() => !isComplete && handlePegClick(i)}
              />
            ))}
            {showCorrectFlash && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[28px] bg-green-500/10 backdrop-blur-sm">
                <span className="text-2xl font-bold text-green-400 drop-shadow-lg">✓ مرحله تکمیل شد</span>
              </div>
            )}
            {isFailed && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[28px] bg-red-500/10 backdrop-blur-sm">
                <span className="text-2xl font-bold text-red-400 drop-shadow-lg">✗ زمان یا تعداد حرکات به پایان رسید</span>
              </div>
            )}
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

        <div className="mt-7 grid grid-cols-[1fr_1fr] gap-4" dir = "rtl">

          <Panel className="p-4">
            <div className="mb-2 text-xl font-semibold text-white/80">اطلاعات آزمون</div>
            <div className="grid grid-cols-2 gap-y-1 text-m text-white/55">
              <div>نام آزمون</div>
              <div className="text-left text-white/80">{variant.title}</div>
              <div>زمان کل سپری شده</div>
              <div className="text-left text-white/80 font-mono">{formatTime(totalTime)}</div>
              <div>تعداد مراحل</div>
              <div className="text-left text-white/80">{variant.trials.length}</div>
            </div>
          </Panel>

          <Panel className="p-4 text-right">
            <div className="mb-2 text-xl font-semibold text-white/80">راهنما</div>
            <ul className="space-y-1 text-m leading-6 text-white/60">
              <li>در هر حرکت تنها می‌توانید یک مهره را جابجا کنید.</li>
              <li>برای انتخاب مهره یا میله، بر روی آن کلیک راست کنید.</li>
              <li>برای جابه‌جایی یک مهره بین میله‌ها، ابتدا مهره مورد نظر را انتخاب کرده، سپس میله هدف را انتخاب کنید.</li>
              <li>محدودیت ظرفیت میله‌ها: {variant.game.pegCapacities.join("-").split("").reverse().join("")}</li>
            </ul>
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
              onClick={handleSaveAndExport}
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
          animation: shake 1s ease-in-out, flashRed 1s ease-out;
        }
        .animate-flash-green {
          animation: flashGreen 1s ease-out;
        }
        @keyframes flashGreen {
          0% { box-shadow: inset 0 0 0 0 rgba(34,197,94,0); }
          20% { box-shadow: inset 0 0 60px 10px rgba(34,197,94,0.25); }
          50% { box-shadow: inset 0 0 60px 10px rgba(34,197,94,0.2); }
          100% { box-shadow: inset 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes flashRed {
          0% { box-shadow: inset 0 0 0 0 rgba(239,68,68,0); }
          20% { box-shadow: inset 0 0 60px 10px rgba(239,68,68,0.25); }
          50% { box-shadow: inset 0 0 60px 10px rgba(239,68,68,0.2); }
          100% { box-shadow: inset 0 0 0 0 rgba(239,68,68,0); }
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

function PegDisplay({ id, disks, tall = false, isSelected = false, onClick, capacity }: any) {
  const slotHeight = tall ? 55 : 28;
  const baseHeight = tall ? 20 : 16;
  const poleWidth = tall ? 8 : 6;
  const cap = capacity ?? 3;
  const totalHeight = baseHeight + cap * slotHeight;

  return (
    <div className="flex flex-col items-center justify-end gap-2 cursor-pointer group" onClick={onClick}>
      <div className="relative flex items-end justify-center" style={{ height: totalHeight, width: 100 }}>
        <div className={`absolute bottom-0 w-[90px] rounded-[999px] border border-white/10 bg-[#1c2740] shadow-xl transition-all ${isSelected ? 'border-blue-500 shadow-blue-500/20' : 'group-hover:border-blue-400/60 group-hover:shadow-blue-400/10'}`} style={{ height: baseHeight }} />
        <div className={`absolute rounded-full bg-gradient-to-r from-slate-200 via-slate-400 to-slate-100 transition-all ${isSelected ? 'brightness-125' : 'group-hover:brightness-150'}`} style={{ bottom: baseHeight, height: cap * slotHeight, width: poleWidth }} />
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1" style={{ bottom: baseHeight - 2 }}>
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
    yellow: "radial-gradient(circle at 30% 30%, #fef08a 0%, #eab308 35%, #854d0e 100%)",
    purple: "radial-gradient(circle at 30% 30%, #d8b4fe 0%, #a855f7 35%, #581c87 100%)",
    1: "radial-gradient(circle at 30% 30%, #ff9aa2 0%, #ef4444 35%, #991b1b 100%)",
    2: "radial-gradient(circle at 30% 30%, #bef264 0%, #22c55e 35%, #14532d 100%)",
    3: "radial-gradient(circle at 30% 30%, #93c5fd 0%, #3b82f6 35%, #1e3a8a 100%)",
    4: "radial-gradient(circle at 30% 30%, #fef08a 0%, #eab308 35%, #854d0e 100%)",
    5: "radial-gradient(circle at 30% 30%, #d8b4fe 0%, #a855f7 35%, #581c87 100%)",
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
