export function getDiskZIndex(pegIndex: number, slotIndex: number, capacities: number[]): number {
  let z = 4;
  for (let s = 0; s < slotIndex; s++) {
    for (let p = 0; p < capacities.length; p++) {
      if (capacities[p] > s) z++;
    }
  }
  for (let p = 0; p < pegIndex; p++) {
    if (capacities[p] > slotIndex) z++;
  }
  return z + 1;
}

export function getDiskAssetPath(pegIndex: number, slotIndex: number, capacities: number[]): string {
  const peg = pegIndex + 1;
  const slot = slotIndex + 1;
  const z = getDiskZIndex(pegIndex, slotIndex, capacities);
  return `/assets/disk${slot}peg${peg}position {${z}}.png`;
}

export function getDiskColorFilter(diskId: string | number): string {
  const base = "brightness(1.1) saturate(1.2)";
  const hues: Record<string, string> = {
    "1": "hue-rotate(242deg)",
    red: "hue-rotate(242deg)",
    "2": "hue-rotate(22deg)",
    green: "hue-rotate(22deg)",
    "3": "hue-rotate(110deg)",
    blue: "hue-rotate(110deg)",
    "4": "hue-rotate(300deg)",
    yellow: "hue-rotate(300deg)",
    "5": "hue-rotate(145deg)",
    purple: "hue-rotate(145deg)",
  };
  const hue = hues[String(diskId)] || "";
  return hue ? `${hue} ${base}` : base;
}

export const POLE_ASSETS = [
  `/assets/peg1 {2}.png`,
  `/assets/peg2 {3}.png`,
  `/assets/peg3 {4}.png`,
];

export const BASE_ASSET = `/assets/pegBase (1).png`;
