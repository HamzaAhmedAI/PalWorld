// Hatch-odds maths for the god-roll / mutation tools.
//
// Built on the 1.0 model already encoded (and fixed) in lib/breeding.ts:
//   mutationChance(cake)          — per-egg mutation probability.
//   passiveInheritanceChance(cake)— chance an egg inherits MULTIPLE parent
//                                   passives. Only cakes with a real boost
//                                   return a number; the rest return 0 in
//                                   the source model, which means "no boost
//                                   beyond normal inheritance" — NOT a 0%
//                                   chance. inheritanceBoost() below keeps
//                                   that distinction honest (null, not 0).

import {
  mutationChance,
  passiveInheritanceChance,
  type CakeType,
} from "./breeding";

export type { CakeType };

export const CAKES: Array<{
  id: CakeType;
  name: string;
  effect: string;
}> = [
  { id: "none", name: "Regular Cake", effect: "Baseline breeding. ~1% mutation chance, standard passive inheritance." },
  { id: "mushroom", name: "Mushroom Cake", effect: "Same ~1% mutation baseline; no inheritance boost." },
  { id: "vegetable", name: "Vegetable Cake", effect: "Two eggs per cycle — double the rolls at the ~1% baseline." },
  { id: "deluxe", name: "Deluxe Vegetable Cake", effect: "~3% mutation chance and a moderate multi-passive inheritance boost (~20%)." },
  { id: "special", name: "Special Cake", effect: "High multi-passive inheritance (~90% — bundles passives like Swift + Lucky); mutation stays at the ~1% baseline." },
];

/** Probability of at least one success in n independent attempts. */
export function chanceAtLeastOne(p: number, n: number): number {
  if (n <= 0 || p <= 0) return 0;
  return 1 - Math.pow(1 - p, n);
}

/** Mean attempts to first success (geometric distribution). */
export function expectedAttempts(p: number): number {
  return p > 0 ? 1 / p : Infinity;
}

/** Attempts needed for a given cumulative confidence (e.g. 0.9 = 90%). */
export function attemptsForConfidence(p: number, confidence: number): number {
  if (p <= 0) return Infinity;
  return Math.ceil(Math.log(1 - confidence) / Math.log(1 - p));
}

/** Multi-passive inheritance boost, or null when the cake has none defined. */
export function inheritanceBoost(cake: CakeType): number | null {
  const v = passiveInheritanceChance(cake);
  return v > 0 ? v : null;
}

export interface GodRollOdds {
  /** Per-egg probability of the full god-roll, or null when a component has no defined rate. */
  perEgg: number | null;
  mutationP: number;
  boost: number | null;
  needsMutation: boolean;
}

/**
 * God-roll = the egg inherits the parents' passive set AND (optionally)
 * rolls a mutation passive. Components multiply only when both are
 * defined; otherwise perEgg stays null and the UI shows the components
 * separately instead of inventing a number.
 */
export function godRollOdds(cake: CakeType, needsMutation: boolean): GodRollOdds {
  const mutationP = mutationChance(cake);
  const boost = inheritanceBoost(cake);
  let perEgg: number | null = null;
  if (boost !== null) {
    perEgg = boost * (needsMutation ? mutationP : 1);
  } else if (!needsMutation) {
    perEgg = null; // standard inheritance has no single published rate
  }
  return { perEgg, mutationP, boost, needsMutation };
}
