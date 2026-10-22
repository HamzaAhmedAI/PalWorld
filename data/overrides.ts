// Breeding classification helpers (Palworld 1.0).
//
// As of the 2026-10-22 data fix, the hand-maintained override tables are
// gone: unique combos are generated from the official DT_PalCombiUnique
// extraction in data/specials.ts, types/ranks come straight from the 1.0
// game-file dataset in data/source/, and "true-breed" status is DERIVED
// from the data instead of hand-listed:
//
// A Pal is breed-locked iff (a) the power-average formula can never produce
// it (not in Pal.formulaPool) and (b) no unique combo produces it. Such a
// Pal can only be bred from two parents of its own species.

import { PALS } from "./pals";
import type { Pal } from "./pals";
import { UNIQUE_COMBOS, GENDER_DEPENDENT_COMBOS } from "./specials";

const comboChildren = new Set<string>([
  ...Object.values(UNIQUE_COMBOS),
  ...GENDER_DEPENDENT_COMBOS.flatMap((g) => [
    g.defaultChild,
    ...g.genderChildren,
  ]),
]);

export const TRUE_BREED_GROUP: string[] = PALS.filter(
  (p) => !p.formulaPool && !comboChildren.has(p.name),
).map((p) => p.name);

// Convenience: is this Pal only obtainable (by breeding) from same + same?
export function isTrueBreed(pal: Pick<Pal, "name">): boolean {
  return TRUE_BREED_GROUP.includes(pal.name);
}
