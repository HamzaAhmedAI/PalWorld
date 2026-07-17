import { PALS, UNIQUE_COMBOS, Pal } from "../data/pals";
import { TRUE_BREED_GROUP } from "../data/overrides";

export function getResultingPal(parentA: Pal, parentB: Pal): Pal {
  // 1) Hand-verified 1.0 combos (spec D1). Order-independent lookup.
  const key1 = `${parentA.name}+${parentB.name}`;
  const key2 = `${parentB.name}+${parentA.name}`;
  const uniqueName = UNIQUE_COMBOS[key1] || UNIQUE_COMBOS[key2];
  if (uniqueName) {
    const found = PALS.find((p) => p.name === uniqueName);
    if (found) return found;
  }

  // 2) True-breeding tower bosses / legendaries (spec D2).
  //    same + same -> that Pal. Any other pair can NEVER yield a group member;
  //    the power rule below skips group members entirely.
  const aInGroup = TRUE_BREED_GROUP.includes(parentA.name);
  const bInGroup = TRUE_BREED_GROUP.includes(parentB.name);
  if (aInGroup && bInGroup && parentA.name === parentB.name) {
    return parentA;
  }

  // 3) Same species always breeds same species.
  if (parentA.name === parentB.name) return parentA;

  // 4) Power rule: floor((A + B + 1) / 2), result = closest breedingPower.
  //    Tie-break = first in PALS array order (canonical breeding index; P2.1).
  //    Group members are skipped: they can only come from same + same (D2).
  const targetPower = Math.floor(
    (parentA.breedingPower + parentB.breedingPower + 1) / 2,
  );

  let closestPal = PALS[0];
  let minDiff = Number.POSITIVE_INFINITY;

  for (const pal of PALS) {
    if (TRUE_BREED_GROUP.includes(pal.name)) continue;
    const diff = Math.abs(pal.breedingPower - targetPower);
    if (diff < minDiff) {
      minDiff = diff;
      closestPal = pal; // first match in array order wins ties
    }
  }

  return closestPal;
}

// ---------------------------------------------------------------------------
// Precomputed result map (Phase 2.4 perf fix): child name -> list of parent pairs.
// Built once; turns the old O(n^4) brute force into O(n^2) build + O(1) lookup.
// ---------------------------------------------------------------------------
let _resultMap: Map<string, Array<[Pal, Pal]>> | null = null;

export function getResultMap(): Map<string, Array<[Pal, Pal]>> {
  if (_resultMap) return _resultMap;
  const map = new Map<string, Array<[Pal, Pal]>>();
  for (let i = 0; i < PALS.length; i++) {
    for (let j = i; j < PALS.length; j++) {
      const child = getResultingPal(PALS[i], PALS[j]);
      const arr = map.get(child.name) ?? [];
      arr.push([PALS[i], PALS[j]]);
      map.set(child.name, arr);
    }
  }
  _resultMap = map;
  return map;
}

// A Pal is "trivial" to obtain directly (common / true-breed) and should not be
// decomposed further when building multi-step trees — keeps the search bounded.
function isTrivial(pal: Pal): boolean {
  return pal.rarity <= 4 || TRUE_BREED_GROUP.includes(pal.name);
}

export interface BreedingPath {
  steps: {
    parentA: Pal;
    parentB: Pal;
    result: Pal;
  }[];
}

export function findBreedingPaths(
  targetPal: Pal,
  maxSteps: number = 6,
): BreedingPath[] {
  const map = getResultMap();
  const paths: BreedingPath[] = [];
  const MAX_PATHS = 64; // safety cap before dedup/slice

  // Recursively expand one non-trivial parent into its own breeding pair.
  function expand(
    current: { parentA: Pal; parentB: Pal; result: Pal },
    trail: { parentA: Pal; parentB: Pal; result: Pal }[],
    depth: number,
  ) {
    const newTrail = [...trail, current];
    paths.push({ steps: newTrail });
    if (depth >= maxSteps || paths.length >= MAX_PATHS) return;

    for (const candidate of [current.parentA, current.parentB]) {
      if (isTrivial(candidate)) continue;
      const subs = map.get(candidate.name) ?? [];
      for (const [ga, gb] of subs) {
        // Skip the trivial base case (pal + pal).
        if (ga.name === candidate.name && gb.name === candidate.name) continue;
        expand({ parentA: ga, parentB: gb, result: candidate }, newTrail, depth + 1);
        if (paths.length >= MAX_PATHS) return;
      }
    }
  }

  for (const [a, b] of map.get(targetPal.name) ?? []) {
    expand({ parentA: a, parentB: b, result: targetPal }, [], 1);
  }

  // Remove duplicates based on resulting step keys.
  const uniquePaths = Array.from(
    new Map(
      paths.map((p) => {
        const key = p.steps
          .map((s) => `${s.parentA.name}+${s.parentB.name}=${s.result.name}`)
          .join("->");
        return [key, p];
      }),
    ).values(),
  );

  return uniquePaths
    .sort((a, b) => a.steps.length - b.steps.length)
    .slice(0, 8);
}

// ---------------------------------------------------------------------------
// Mutation breeding helpers (Palworld 1.0)
// ---------------------------------------------------------------------------

export type CakeType = "none" | "mushroom" | "vegetable" | "deluxe" | "special";

/**
 * Probability that a breeding cycle produces a *mutated* offspring.
 * - Baseline (no cake / regular cake): ~1%
 * - Deluxe / Extravagant Vegetable Cake: ~3% (per 1.0 patch notes)
 * - Mushroom / Vegetable / Special cakes do NOT raise the per-egg mutation
 *   chance (Vegetable = two eggs per cycle; Special = multi-passive inheritance).
 */
export function mutationChance(cake: CakeType): number {
  if (cake === "deluxe") return 0.03;
  if (cake === "none") return 0.01;
  return 0;
}

/**
 * Likelihood that an egg inherits MULTIPLE parent passives.
 * - Special Cake: high (bundles passives like Swift + Lucky)
 * - Deluxe Vegetable Cake: moderate (talents grow faster)
 * - Others: none beyond normal single-passive inheritance.
 */
export function passiveInheritanceChance(cake: CakeType): number {
  if (cake === "special") return 0.9;
  if (cake === "deluxe") return 0.2;
  return 0;
}
