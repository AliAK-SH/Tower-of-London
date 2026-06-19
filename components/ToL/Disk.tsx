import { getDiskColorFilter } from "@/utils/assetHelpers";

export function Disk({ color, assetSrc, zIndex }: { color: string; assetSrc: string; zIndex: number }) {
  return (
    <img
      src={assetSrc}
      alt=""
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex, filter: getDiskColorFilter(color) }}
    />
  );
}
