// Palworld game pack — adapter over the existing, matrix-verified 1.0 data
// and engine (data/pals.ts + lib/breeding.ts). This pack is the reference
// implementation every future pack is measured against: its combine()
// delegates to getResultingPal, which reproduces the verified 1.0 breeding
// matrix exactly (lib/breeding-matrix.test.ts).

import { PALS, Pal } from "../../../data/pals";
import { TRUE_BREED_GROUP } from "../../../data/overrides";
import { getResultingPal } from "../../breeding";
import type { Creature, GamePack } from "../types";

const byName = new Map<string, Pal>(PALS.map((p) => [p.name, p]));

function toCreature(p: Pal): Creature {
  return { id: p.name, name: p.name, gameId: "palworld" };
}

export const palworldPack: GamePack = {
  gameId: "palworld",
  gameName: "Palworld",
  dataVersion: "1.0 · build 24575149 · dataset palworldcalc-20260730-298",
  creatures: PALS.map(toCreature),
  edges: [],
  combine: (aId, bId) => {
    const a = byName.get(aId);
    const b = byName.get(bId);
    if (!a || !b) return null;
    return getResultingPal(a, b).name;
  },
  isBaseCreature: (c) => {
    const pal = byName.get(c.id);
    if (!pal) return true;
    return pal.rarity <= 4 || TRUE_BREED_GROUP.includes(pal.name);
  },
  terms: { combine: "breed", creature: "Pal", creatures: "Pals" },
};
