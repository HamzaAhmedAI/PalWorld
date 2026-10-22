import { PALS, UNIQUE_COMBOS, Pal } from "../data/pals";
import { GENDER_DEPENDENT_COMBOS } from "../data/specials";
import { TRUE_BREED_GROUP } from "../data/overrides";

// Palworld 1.0 breeding engine (data fix, 2026-10-22).
// Validated against the full verified 1.0 breeding matrix
// (data/source/combos-1.0.json) by lib/breeding-matrix.test.ts — every one
// of the 44,551 unordered pairs reproduces the matrix result.
//
// Rules, in order:
//   1. Same species always breeds itself.
//   2. The gender-dependent pair (Katress + Wixen) has no fixed matrix
//      outcome; the engine returns its primary child (Katress Ignis) and
//      data/specials.ts records both gender-specific children.
//   3. Official unique combos (DT_PalCombiUnique) override the formula.
//   4. Power rule: target = floor((A + B + 1) / 2) over 1.0 CombiRank
//      (Pal.breedingPower); the child is the FORMULA-POOL Pal closest to
//      the target. Pals outside the pool (variants, legendaries, Terraria
//      crossover, ...) can never be produced by the formula — they come
//      only from rule 1, 2 or 3. On an equal-distance tie the HIGHER
//      CombiRank wins (the game's CombiDuplicatePriority behaviour,
//      confirmed against the matrix); further ties keep PALS order
//      (CombiRank asc, then Paldeck no.).

const byNameMap = new Map(PALS.map((p) => [p.name, p]));
const sortedPairKey = (a: string, b: string) => [a, b].sort().join("+");

export function getResultingPal(parentA: Pal, parentB: Pal): Pal {
  // 1) Same species always breeds same species.
  if (parentA.name === parentB.name) return parentA;

  // 2) Gender-dependent pair: default (matrix) outcome.
  for (const g of GENDER_DEPENDENT_COMBOS) {
    if (sortedPairKey(parentA.name, parentB.name) === sortedPairKey(...g.parents)) {
      const found = byNameMap.get(g.defaultChild);
      if (found) return found;
    }
  }

  // 3) Official unique combos. Order-independent lookup.
  const uniqueName = UNIQUE_COMBOS[sortedPairKey(parentA.name, parentB.name)];
  if (uniqueName) {
    const found = byNameMap.get(uniqueName);
    if (found) return found;
  }

  // 4) Power rule over the formula pool only.
  const targetPower = Math.floor(
    (parentA.breedingPower + parentB.breedingPower + 1) / 2,
  );

  let closestPal: Pal | null = null;
  let minDiff = Number.POSITIVE_INFINITY;

  for (const pal of PALS) {
    if (!pal.formulaPool) continue;
    const diff = Math.abs(pal.breedingPower - targetPower);
    if (
      diff < minDiff ||
      (diff === minDiff &&
        closestPal !== null &&
        pal.breedingPower > closestPal.breedingPower)
    ) {
      minDiff = diff;
      closestPal = pal;
    }
  }

  return closestPal ?? parentA;
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
 *   chance (Vegetable = two eggs per cycle; Special = multi-passive
 *   inheritance), so they keep the ~1% baseline — they do not remove it.
 *   (Fixed 2026-10-22: these previously returned 0, i.e. "never mutates".)
 */
export function mutationChance(cake: CakeType): number {
  if (cake === "deluxe") return 0.03;
  return 0.01;
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
