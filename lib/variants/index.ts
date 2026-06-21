import { FIMBEL_OLD_TRIALS } from "./fimbelOld";
import { FIMBEL_YOUNG_TRIALS } from "./fimbelYoung";
import { TOL_R_TRIALS } from "./tolR";
import { TOL_DX_TRIALS } from "./tolDX";
import { SHALLICE_CLASSIC_TRIALS } from "./shalliceClassic";
import { SHALLICE_RANDOM_TRIALS } from "./shalliceRandom";
import { UNCON_PRO_TRIALS } from "./unconstrainedPro";
import { UNCON_RAN_TRIALS } from "./unconstrainedRan";
import { PHILLIPS_B_TRIALS } from "./phillips-b";
import { PHILLIPS_A_TRIALS } from "./phillips-a";
import { PHILLIPS_C_TRIALS } from "./phillips-c";

export const VARIANT_REGISTRY = {
  "fimbel-old": FIMBEL_OLD_TRIALS,
  "fimbel-young": FIMBEL_YOUNG_TRIALS,
  "tol-r": TOL_R_TRIALS,
  "tol-dx": TOL_DX_TRIALS,
  "shallice-classic": SHALLICE_CLASSIC_TRIALS,
  "shallice-random" : SHALLICE_RANDOM_TRIALS,
  "unconstrained-progressive" : UNCON_PRO_TRIALS,
  "unconstrained-random" :UNCON_RAN_TRIALS,
  "phillips-a": PHILLIPS_A_TRIALS,
  "phillips-b": PHILLIPS_B_TRIALS,
  "phillips-c": PHILLIPS_C_TRIALS,
};
