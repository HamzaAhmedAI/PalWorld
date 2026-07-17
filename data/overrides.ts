// 1.0 correction layer for the breeding engine (spec D1/D2, Phase 2).
// These are hand-verified, 1.0-specific overrides and survive regeneration of
// data/pals.ts. See data/SOURCING.md for the merge order.

import type { Pal } from "./pals";

// Hand-verified 1.0 breeding combos. Key format is "ParentA+ParentB" (order-independent
// lookup is performed in lib/breeding.ts). Stale pre-1.0 overrides removed:
//   - "Penking+Bushi" -> "Anubis"  (1.0: resolves to Sibelyx; handled by the power ladder / D1)
//   - "Relaxaurus+Sparkit" -> "Orserk"  (1.0: Orserk is true-breed only; D2)
export const UNIQUE_COMBOS: Record<string, string> = {
  "Nitewing+Vanwyrm": "Anubis",
  "Mossanda+Vanwyrm": "Rayhound",
  "Penking+Bushi": "Sibelyx",
};

// Tower bosses / legendaries that only breed same + same (spec §3).
// If exactly one parent is in this group, the result can NEVER be a group member
// (the engine falls through to the power rule). If both parents are the same group
// member, the result is that Pal (true-breed).
export const TRUE_BREED_GROUP: string[] = [
  "Faleris",
  "Shadowbeak",
  "Grizzbolt",
  "Orserk",
  "Lyleen",
  "Frostallion",
  "Jetragon",
  "Paladius",
  "Necromus",
  "Neptilius",
  "Selyne",
  "Bastigor",
  "Bellanoir Libero",
  "Blazamut Ryu",
  "Mimog",
  "Xenolord",
  "Chikipi",
];

// 1.0 type corrections applied to PALS at build time (spec D6 / P1.3).
// Mirror of TYPE_OVERRIDES in scripts/build-pals.mjs — kept here as the canonical record.
export const TYPE_OVERRIDES: Record<string, { type1?: string; type2?: string }> = {
  Lovander: { type1: "Dark" },
};

// Convenience: is this Pal in the true-breed group?
export function isTrueBreed(pal: Pick<Pal, "name">): boolean {
  return TRUE_BREED_GROUP.includes(pal.name);
}
