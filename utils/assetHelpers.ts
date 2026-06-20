function is555Capacities(capacities: number[]): boolean {
  return capacities.length === 3 && capacities.every(c => c === 5);
}

export function getAssetPrefix(capacities: number[]): string {
  return is555Capacities(capacities) ? '/assets/555' : '/assets/123';
}

export function getDiskZIndex(pegIndex: number, slotIndex: number, capacities: number[]): number {
  if (is555Capacities(capacities)) {
    return 5 + pegIndex * 5 + slotIndex;
  }
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
  const prefix = getAssetPrefix(capacities);
  const peg = pegIndex + 1;
  const slot = slotIndex + 1;
  const z = getDiskZIndex(pegIndex, slotIndex, capacities);
  return `${prefix}/disk${slot}peg${peg}position {${z}}.png`;
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

export function getPoleAssets(capacities: number[]): string[] {
  const prefix = getAssetPrefix(capacities);
  return [
    `${prefix}/peg1 {2}.png`,
    `${prefix}/peg2 {3}.png`,
    `${prefix}/peg3 {4}.png`,
  ];
}

export function getBaseAsset(capacities: number[]): string {
  const prefix = getAssetPrefix(capacities);
  return `${prefix}/pegBase (1).png`;
}
