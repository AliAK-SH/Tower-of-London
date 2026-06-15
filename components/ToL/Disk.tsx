export function Disk({ size, isTop, isSelected }: { size: number, isTop: boolean, isSelected?: boolean }) {
  const COLORS: Record<number, string> = { 1: "bg-red-500", 2: "bg-green-500", 3: "bg-blue-500" };
  
  return (
    <div 
      className={`w-24 h-8 rounded-md mb-1 shadow-md transition-all ${COLORS[size]} 
      ${isSelected ? "ring-4 ring-white scale-105" : ""} 
      ${isTop ? "cursor-pointer" : ""}`}
    />
  );
}
