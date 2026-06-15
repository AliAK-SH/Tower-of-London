"use client";

import React, { useEffect } from 'react';
import Peg from '../components/ToL/Peg';
import { useGameStore } from '../store/useGameStore';
import { exportToExcel } from '../utils/excel';
import { Peg as PegType } from '../types'; // Import the type for casting

export default function TowerOfLondonPage() {
  // Destructure state and actions from the store
  const { 
    pegs, 
    goal, 
    moveCount, 
    startTrial, 
    handlePegClick, 
    results 
  } = useGameStore();

  // Initialize the first trial when the component mounts
  useEffect(() => {
    // We cast these as [Peg, Peg, Peg] to satisfy TypeScript's tuple requirement
    const initialStart = [[1, 2, 3], [], []] as [PegType, PegType, PegType];
    const initialGoal = [[], [], [1, 2, 3]] as [PegType, PegType, PegType];
    
    startTrial(initialStart, initialGoal);
  }, [startTrial]);

  return (
    <main className="min-h-screen bg-[#1a2332] text-white p-8 flex flex-col items-center font-sans">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">آزمون برج لندن</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        هدف این آزمون این است که آرایش دیسک‌ها در قسمت پایین را با آرایش دیسک‌ها در قسمت بالا یکسان کنید.
      </p>

      <div className="w-full max-w-2xl space-y-6">
        
        {/* Goal Pattern Section */}
        <div className="bg-[#2a3447] rounded-3xl p-8 border border-gray-700 relative">
          <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#3a4457] px-4 py-1 rounded-full text-sm">
            الگوی هدف
          </span>
          <div className="flex justify-around items-end pt-8">
            {goal.map((disks, idx) => (
              <div key={`goal-${idx}`} className="opacity-80 pointer-events-none">
                 <Peg disks={disks} onDiskClick={() => {}} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative h-px bg-gray-700 my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
        </div>

        {/* Interactive Section */}
        <div className="bg-[#2a3447] rounded-3xl p-8 border border-gray-700 relative">
          <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#3a4457] px-4 py-1 rounded-full text-sm">
            قسمت تعاملی
          </span>
          <div className="flex justify-around items-end pt-8">
            {pegs.map((disks, idx) => (
              <Peg 
                key={`active-${idx}`} 
                disks={disks} 
                onDiskClick={() => handlePegClick(idx)} 
              />
            ))}
          </div>
        </div>

        {/* Footer Info & Move Count */}
        <div className="bg-[#252f3f] rounded-2xl p-4 flex justify-between items-center border border-gray-700">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#3a4457] flex items-center justify-center">
                <span className="text-blue-400 font-bold">{moveCount}</span>
             </div>
             <p className="text-sm text-gray-300">تعداد حرکات انجام شده</p>
          </div>
          
          <button 
            onClick={() => exportToExcel(results)}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            خروجی اکسل
          </button>
        </div>

      </div>
    </main>
  );
}
