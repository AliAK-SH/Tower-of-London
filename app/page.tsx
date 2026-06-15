"use client";

import React, { useEffect, useState } from "react";
import { Peg } from "../components/ToL/Peg";
import { useGameStore } from "../store/useGameStore";
import { TRIALS } from "../lib/trials";

export default function TowerOfLondonPage() {
  const { board, goalBoard, moveCount, resetGame, isComplete } = useGameStore();

  const [trialIndex, setTrialIndex] = useState(0);

  const currentTrial = TRIALS[trialIndex];

  useEffect(() => {
    if (!currentTrial) return;
    resetGame(currentTrial.start, currentTrial.goal);
  }, [trialIndex, resetGame]);

  function handleNextTrial() {
    if (trialIndex < TRIALS.length - 1) {
      setTrialIndex((prev) => prev + 1);
    } else {
      window.location.href = "/results";
    }
  }

  return (
    <main className="min-h-screen bg-[#1a2332] text-white p-8 flex flex-col items-center font-sans">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">آزمون برج لندن</h1>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        هدف این آزمون این است که آرایش دیسک‌های پایین را دقیقاً مطابق با الگوی هدف در بالا قرار دهید.
      </p>

      <div className="w-full max-w-2xl space-y-6">

        {/* GOAL BOARD */}
        <div className="bg-[#2a3447] rounded-3xl p-8 border border-gray-700 relative">

          <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#3a4457] px-4 py-1 rounded-full text-sm">
            الگوی هدف
          </span>

          <div className="flex justify-around items-end pt-8">
            {goalBoard.map((disks, idx) => (
              <div
                key={`goal-${idx}`}
                className="opacity-80 pointer-events-none scale-90"
              >
                <Peg pegIndex={idx} disks={disks} isGoal />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px bg-gray-700 my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
        </div>

        {/* INTERACTIVE BOARD */}
        <div className="bg-[#2a3447] rounded-3xl p-8 border border-gray-700 relative">

          <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#3a4457] px-4 py-1 rounded-full text-sm">
            قسمت تعاملی
          </span>

          <div className="flex justify-around items-end pt-8">
            {board.map((disks, idx) => (
              <Peg key={`play-${idx}`} pegIndex={idx} disks={disks} />
            ))}
          </div>

          {/* SUCCESS OVERLAY */}
          {isComplete && (
            <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">

              <div className="flex flex-col items-center gap-4">

                <div className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                  هدف با موفقیت تکمیل شد
                </div>

                <button
                  onClick={handleNextTrial}
                  className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-medium"
                >
                  {trialIndex === TRIALS.length - 1
                    ? "مشاهده نتایج"
                    : "مرحله بعد"}
                </button>

              </div>

            </div>
          )}
        </div>

        {/* STATS BAR */}
        <div className="bg-[#252f3f] rounded-2xl p-4 flex justify-between items-center border border-gray-700">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-[#3a4457] flex items-center justify-center">
              <span className="text-blue-400 font-bold">{moveCount}</span>
            </div>

            <p className="text-sm text-gray-300">
              تعداد حرکات انجام شده
            </p>

          </div>

          <div className="text-sm text-gray-400">
            مرحله {trialIndex + 1} از {TRIALS.length}
          </div>

        </div>

      </div>
    </main>
  );
}
