import { Disk } from "./Disk";
import { getDiskAssetPath, getDiskZIndex, getPoleAssets } from "@/utils/assetHelpers";

interface PegProps {
  pegIndex: number;
  disks: (string | number)[];
  capacity: number;
  capacities: number[];
  isSelected?: boolean;
  isGoal?: boolean;
  onClick?: () => void;
  label?: string;
}

export function Peg({
  pegIndex,
  disks,
  capacities,
  isSelected = false,
  label,
}: PegProps) {
  return (
    <>
      <img
        src={getPoleAssets(capacities)[pegIndex]}
        alt=""
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: pegIndex + 2,
          filter: isSelected ? "drop-shadow(0 0 10px #3b82f6) brightness(1.15)" : undefined,
          transition: "filter 0.2s",
        }}
      />
      {disks.map((diskColor, slotIndex) => (
        <Disk
          key={`${pegIndex}-${slotIndex}`}
          color={String(diskColor)}
          assetSrc={getDiskAssetPath(pegIndex, slotIndex, capacities)}
          zIndex={getDiskZIndex(pegIndex, slotIndex, capacities)}
        />
      ))}
      {label && (
        <div
          className="absolute bottom-0 text-center text-[10px] font-bold text-white/40 tracking-widest uppercase pointer-events-none"
          style={{ zIndex: 20, width: `${100 / 3}%`, left: `${(pegIndex / 3) * 100}%` }}
        >
          {label}
        </div>
      )}
    </>
  );
}
