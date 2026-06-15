import { useGameStore } from "@/store/useGameStore";
import { CAPACITIES } from "../../lib/gameLogic";
import { Disk } from "./Disk"

export function Peg({ pegIndex, disks, isGoal = false }: { pegIndex: number, disks: number[], isGoal?: boolean }) {
  const { handlePegClick, selectedPeg } = useGameStore();
  const isSelected = selectedPeg === pegIndex;

  // Peg height logic: 1 unit per disk capacity + base
const heights = CAPACITIES.map(cap => {
  if (cap === 1) return "h-20";
  if (cap === 2) return "h-36";
  return "h-52"; // cap === 3
});

  return (
    <div 
      onClick={() => !isGoal && handlePegClick(pegIndex)}
      className="relative flex flex-col-reverse items-center w-32 h-64 cursor-pointer"
    >
      {/* Visual Peg Pole - Variable Height */}
      {!isGoal && (
        <div className={`absolute bottom-0 w-3 bg-gray-600 rounded-t-full transition-colors ${heights[pegIndex]} 
          ${isSelected ? "bg-blue-400" : "bg-gray-700"}`} 
        />
      )}
      
      <div className="flex flex-col-reverse items-center w-full pb-2 z-10">
        {disks.map((size, i) => (
          <Disk 
            key={i} 
            size={size} 
            isTop={i === disks.length - 1} 
            isSelected={isSelected && i === disks.length - 1} 
          />
        ))}
      </div>
      <div className="absolute bottom-[-10px] w-36 h-3 bg-gray-800 rounded-full" />
    </div>
  );
}
