
"use client";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ThemeLogo from "./ThemeLogo";
import { VARIANT_DATA_TEST } from "@/lib/variants";
import { VARIANT_DATA_INFO } from "../data/variants";
import { useGameStore } from "@/store/useGameStore";
import { isGoalReached } from "@/lib/gameLogic";
import { exportAll } from "@/utils/exports";
import { SessionSummaryRow, EventLogRow, TrialResultRow } from "@/types";
import { getBaseAsset, getPoleAssets, getDiskAssetPath, getDiskZIndex, getDiskColorFilter } from "@/utils/assetHelpers";

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
  const baseAsset = getBaseAsset(variant.game.pegCapacities);
  const poleAssets = getPoleAssets(variant.game.pegCapacities);

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

  const isLastTrial = trialIndex === variant.trials.length - 1;

  const autoAdvancedRef = useRef(false);

  useEffect(() => {
    if (!variant.game.hasMoveLimit) return;
    if (isComplete || isFailed) {
      if (autoAdvancedRef.current) return;
      autoAdvancedRef.current = true;
      const timeout = setTimeout(() => {
        setShowCorrectFlash(false);
        if (isLastTrial) {
          setShowResultModal(true);
        } else {
          handleNextTrial();
        }
      }, 1000);
      if (!isFailed) setShowCorrectFlash(true);
      return () => clearTimeout(timeout);
    } else {
      autoAdvancedRef.current = false;
      setShowCorrectFlash(false);
    }
  }, [isComplete, isFailed, isLastTrial, variant.game.hasMoveLimit]);

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
    <div dir="ltr" className="min-h-screen bg-page-bg text-text-primary overflow-hidden font-sans" style={{ zoom: 1.0 }}>
      <ThemeToggle />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-5">

        <div className="grid grid-cols-1 items-start">

      <header className="text-center mb-12 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-soft-bg blur-3xl rounded-full"></div>
          <ThemeLogo
            className="relative w-32 h-32 md:w-40 md:h-40 object-contain"
            style={{ filter: "drop-shadow(0 0 15px var(--color-logo-shadow))" }}
          />
        </div>

        <h1 className="text-5xl font-black mb-0.5 py-1 bg-gradient-to-b from-title-from to-title-to bg-clip-text text-transparent" dir="rtl">
            {currentVariant.title}
        </h1>

          <div className="flex justify-center items-center gap-2 mb-6 mt-6">
            <span className="h-px w-8 bg-blue-500"></span>
            <span className="text-blue-400 tracking-[0.3em] uppercase text-sm">
              Tower of London
            </span>
            <span className="h-px w-8 bg-blue-500"></span>
          </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface-card border border-border-default px-5 py-1 text-[12px] text-text-body">
              <span>{currentVariant.sub}</span>
            </div>
      </header>
        </div>

      {/* Combined Game Container */}
      <Panel className="mt-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left Side: Goal Pattern */}
          <div className="p-6 border-b md:border-b-0 md:border-l border-border-default/50 flex flex-col items-center">
            <div className="mb-6 text-center">
              <div className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-1">Target Pattern</div>
              <div className="text-xl font-black text-text-heading">الگوی هدف</div>
            </div>

            <div className="relative aspect-square w-full max-w-[340px] mb-8">
              <img src={baseAsset} alt="" className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }} />
              {goalBoard?.map((disks, i) => (
                <React.Fragment key={`goal-peg-${i}`}>
                  <img src={poleAssets[i]} alt="" className="absolute top-0 left-0 w-full h-full" style={{ zIndex: i + 2 }} />
                  {disks.map((diskColor, slotIdx) => (
                    <img
                      key={`goal-disk-${i}-${slotIdx}`}
                      src={getDiskAssetPath(i, slotIdx, variant.game.pegCapacities)}
                      alt=""
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ zIndex: getDiskZIndex(i, slotIdx, variant.game.pegCapacities), filter: getDiskColorFilter(diskColor) }}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full" dir="rtl">
              <StatItem
                label="زمان باقی‌مانده"
                value={variant.game.hasTrialTimeLimit ? formatTime(timeLeft) : "--:--"}
                icon="◔"
                isError={variant.game.hasTrialTimeLimit}
              />
              <StatItem
                label="مرحله"
                value={`${trialIndex + 1} از ${variant.trials.length}`}
                icon="◔"
              />
              <StatItem
                label="محدودیت حرکات"
                value={variant.game.hasMoveLimit ? String(variant.trials[trialIndex]?.optimalMoves ?? "--") : "--"}
                icon="↻"
                isError={variant.game.hasMoveLimit}
              />
              <StatItem
                label="حرکات انجام شده"
                value={String(moveCount).padStart(2, "0")}
                icon="↻"
              />
            </div>
          </div>

          {/* Right Side: Interactive Space */}
          <div className="p-6 flex flex-col items-center bg-surface-interactive-bg/30">
            <div className="mb-6 text-center">
              <div className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-1">Interactive Area</div>
              <div className="text-xl font-black text-text-heading">فضای تعاملی</div>
              <div className="mt-1 text-xs text-text-muted">روی میله مبدا و سپس مقصد کلیک کنید</div>
            </div>

            <div className={`relative aspect-square w-full max-w-[420px] rounded-[32px] border transition-all duration-300 ${shaking ? 'animate-shake border-error-border' : ''} ${showCorrectFlash ? 'animate-flash-green border-success-border' : ''} ${isFailed ? 'border-error-border' : ''} ${!shaking && !showCorrectFlash && !isFailed ? 'border-border-default/50 bg-surface-card/50' : ''}`}
              style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.1)" }}>

              <img src={baseAsset} alt="" className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }} />
              {board?.map((disks, i) => (
                <React.Fragment key={`play-peg-${i}`}>
                  <img
                    src={poleAssets[i]}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      zIndex: i + 2,
                      filter: selectedPeg === i ? "drop-shadow(0 0 15px var(--color-selected-peg)) brightness(1.2)" : undefined,
                      transition: "filter 0.2s",
                    }}
                  />
                  {disks.map((diskColor, slotIdx) => (
                    <img
                      key={`disk-${i}-${slotIdx}`}
                      src={getDiskAssetPath(i, slotIdx, variant.game.pegCapacities)}
                      alt=""
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ zIndex: getDiskZIndex(i, slotIdx, variant.game.pegCapacities), filter: getDiskColorFilter(diskColor) }}
                    />
                  ))}
                </React.Fragment>
              ))}

              {!isComplete && [0, 1, 2].map(i => (
                <div
                  key={`click-${i}`}
                  className="absolute top-0 h-full cursor-pointer hover:bg-white/5 transition-colors"
                  style={{ left: `${(i / 3) * 100}%`, width: `${100 / 3}%`, zIndex: 30 }}
                  onClick={() => handlePegClick(i)}
                />
              ))}

              {showCorrectFlash && (
                <div className="absolute inset-0 z-40 flex items-center justify-center rounded-[32px] bg-success-soft/40 backdrop-blur-sm animate-in fade-in">
                  <div className="bg-success text-white p-4 rounded-full shadow-2xl scale-125">✓</div>
                </div>
              )}
            </div>

            {!variant.game.hasMoveLimit && (
              <div className="mt-8 w-full flex justify-center">
                <button
                  onClick={handleSubmitAnswer}
                  className={`group relative overflow-hidden rounded-2xl px-16 py-4 text-m font-bold text-white transition-all hover:scale-105 active:scale-95 ${
                    isLastTrial ? "bg-blue-600" : "bg-emerald-600"
                  }`}
                  style={{ boxShadow: "0 10px 30px -5px rgba(0,0,0,0.3)" }}
                >
                  <span className="relative z-10">{buttonText}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Panel>

        <div className="mt-7 grid grid-cols-[1fr_1fr] gap-4" dir = "rtl">

          <Panel className="p-4">
            <div className="mb-2 text-xl font-semibold text-text-secondary">اطلاعات آزمون</div>
            <div className="grid grid-cols-2 gap-y-1 text-m text-text-muted">
              <div>نام آزمون</div>
              <div className="text-left text-text-secondary">{variant.title}</div>
              <div>زمان کل سپری شده</div>
              <div className="text-left text-text-secondary font-mono">{formatTime(totalTime)}</div>
              <div>تعداد مراحل</div>
              <div className="text-left text-text-secondary">{variant.trials.length}</div>
            </div>
          </Panel>

          <Panel className="p-4 text-right">
            <div className="mb-2 text-xl font-semibold text-text-secondary">راهنما</div>
            <ul className="space-y-1 text-m leading-6 text-text-body">
              <li>در هر حرکت تنها می‌توانید یک مهره را جابجا کنید.</li>
              <li>برای انتخاب مهره یا میله، بر روی آن کلیک چپ کنید.</li>
              <li>برای جابه‌جایی یک مهره بین میله‌ها، ابتدا مهره مورد نظر را انتخاب کرده، سپس میله هدف را انتخاب کنید.</li>
              <li>محدودیت ظرفیت میله‌ها: {variant.game.pegCapacities.join("-").split("").reverse().join("")}</li>
            </ul>
          </Panel>
        </div>
      </div>

      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border-default bg-surface-modal p-8" style={{ boxShadow: "0 20px 60px var(--color-modal-shadow)" }}>
            <h2 className="mb-6 text-center text-2xl font-bold text-text-heading">ثبت نتایج آزمون</h2>

            <div className="mb-5" dir="rtl">
              <label className="mb-2 block text-sm text-text-body">نام شرکت‌کننده</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Akbarpour"
                className="w-full rounded-xl border border-border-default bg-surface-card px-4 py-3 text-right text-text-primary placeholder-text-placeholder outline-none transition focus:border-border-focus"
              />
              {userName && !userNameValid && (
                <p className="mt-1 text-xs text-error">فقط حروف لاتین، بدون فاصله و علامت</p>
              )}
            </div>

            <div className="mb-6" dir="rtl">
              <label className="mb-2 block text-sm text-text-body">شناسه شرکت کننده</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="TOL_1001"
                className="w-full rounded-xl border border-border-default bg-surface-card px-4 py-3 text-right text-text-primary placeholder-text-placeholder outline-none transition focus:border-border-focus"
              />
              {userId && !userIdValid && (
                <p className="mt-1 text-xs text-error">فقط حروف و اعداد لاتین، خط تیره و زیرخط، بدون فاصله</p>
              )}
            </div>

            <button
              onClick={handleSaveAndExport}
              disabled={!formValid}
              className={`w-full rounded-xl px-12 py-3 text-sm font-semibold text-text-primary transition ${
                formValid
                  ? "bg-gradient-to-b from-btn-primary-from to-btn-primary-to"
                  : "cursor-not-allowed bg-btn-disabled-bg text-text-disabled"
              }`}
              style={formValid ? { boxShadow: "0 10px 28px var(--color-success-glow)" } : undefined}
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
    <div className={`rounded-2xl border border-border-default bg-surface-panel backdrop-blur-md ${className}`}
      style={{ boxShadow: "0 10px 30px var(--color-panel-shadow)" }}>
      {children}
    </div>
  );
}

function StatItem({ label, value, icon, isError }: { label: string; value: string; icon: string; isError?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${isError ? 'border-error-border bg-error-surface' : 'border-border-default bg-surface-card'}`}>
      <div className="flex items-center justify-between text-xs text-text-body">
        <span>{label}</span>
        <div className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${isError ? 'border-error-border bg-error-soft' : 'border-border-default bg-surface-card'}`}>{icon}</div>
      </div>
      <div className={`mt-1 text-lg font-bold tracking-wider ${isError ? 'text-error' : 'text-text-primary'}`}>
        {value}
      </div>
    </div>
  );
}
