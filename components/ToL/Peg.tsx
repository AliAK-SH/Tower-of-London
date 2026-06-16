// components/ToL/Peg.tsx
import { Disk } from "./Disk";

interface PegProps {
  pegIndex: number;
  disks: number[];
  capacity: number;
  isSelected?: boolean;
  isGoal?: boolean;
  onClick?: () => void;
  label?: string;
}

export function Peg({ 
  pegIndex, 
  disks, 
  capacity, 
  isSelected = false, 
  isGoal = false, 
  onClick, 
  label 
}: PegProps) {
  
  // Visual height based on peg capacity (1=small, 2=medium, 3=large)
  const heightClass = capacity === 1 ? "h-24" : capacity === 2 ? "h-40" : "h-56";

  return (
    <div 
      className={`flex flex-col items-center justify-end flex-1 px-2 ${!isGoal ? "cursor-pointer group" : ""}`} 
      onClick={onClick}
    >
      <div className={`relative flex ${heightClass} w-full items-end justify-center`}>
        {/* Pole */}
        <div 
          className={`absolute bottom-0 h-full w-3 rounded-full transition-colors 
          ${isSelected ? "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "bg-gray-600"}`} 
        />
        
        {/* Base */}
        <div className="absolute bottom-0 h-3 w-24 rounded-full bg-[#101826] border border-white/10 shadow-md" />
        
        {/* Beads Stack */}
        <div className="absolute bottom-2 flex flex-col-reverse items-center gap-1">
          {disks.map((diskId, i) => (
            <Disk 
              key={`${pegIndex}-${i}`} 
              color={String(diskId)} 
              isSelected={isSelected && i === disks.length - 1} 
            />
          ))}
        </div>
      </div>
      {label && (
        <div className="mt-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">
          {label}
        </div>
      )}
    </div>
  );
}
