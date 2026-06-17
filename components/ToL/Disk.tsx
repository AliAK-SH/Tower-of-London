// components/ToL/Disk.tsx
export function Disk({ color, isSelected }: { color: string, isSelected?: boolean }) {
  const gradients: Record<string, string> = {
    red: "bg-[radial-gradient(circle_at_30%_28%,#ff9b9b,#ef4444_40%,#991b1b_100%)]",
    green: "bg-[radial-gradient(circle_at_30%_28%,#b9ff98,#84cc16_40%,#365314_100%)]",
    blue: "bg-[radial-gradient(circle_at_30%_28%,#9ecbff,#3b82f6_40%,#1e3a8a_100%)]",
    yellow: "bg-[radial-gradient(circle_at_30%_28%,#fef08a,#eab308_40%,#854d0e_100%)]",
    purple: "bg-[radial-gradient(circle_at_30%_28%,#d8b4fe,#a855f7_40%,#581c87_100%)]",
  };

  // Map numerical IDs (1-5) or strings to color keys
  const colorKey = 
    color === "1" || color === "red" ? "red" : 
    color === "2" || color === "green" ? "green" : 
    color === "3" || color === "blue" ? "blue" :
    color === "4" || color === "yellow" ? "yellow" :
    "purple";

  return (
    <div 
      className={`h-12 w-12 rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.4),inset_0_4px_6px_rgba(255,255,255,0.3)] border border-white/10 transition-all duration-200 
      ${gradients[colorKey]} 
      ${isSelected ? "ring-4 ring-yellow-400 scale-110 z-20 shadow-[0_0_20px_rgba(250,204,21,0.6)]" : ""}`} 
    />
  );
}
