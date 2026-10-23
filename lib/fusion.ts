// Breed My Pal — deterministic fusion generator (multi-game pivot, Week 4).
//
// Pick any two Pals and get the fusion they *would* have: a blended name,
// inherited types, averaged stats with a seeded twist, merged work
// suitability, and a personality line. Everything is computed from the
// real 1.0 Pal data and is DETERMINISTIC per pair — the same pair always
// produces the same fusion, so a shared link shows everyone the same
// result. Fusions are fan concepts, clearly labelled as such in the UI;
// they are not real game Pals and never enter the breeding data.

import type { Pal, WorkKind } from "@/data/pals";

/** Small stable string hash (FNV-1a). */
function hashPair(a: string, b: string): number {
  const key = [a, b].sort().join("+");
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic PRNG (mulberry32) seeded from the pair. */
function rng(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const firstWord = (name: string) => name.split(" ")[0];
const suffixOf = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1 ? parts.slice(1).join(" ") : null;
};

/**
 * Blend two names: head of A + tail of B, cut at a vowel boundary where
 * possible so the result stays pronounceable.
 */
export function blendName(a: string, b: string): string {
  const aw = firstWord(a);
  const bw = firstWord(b);
  const cutA = (() => {
    const m = aw.match(/^[^aeiou]*[aeiou]+[^aeiou]*/i);
    return m ? m[0].length : Math.ceil(aw.length / 2);
  })();
  const tailStart = (() => {
    const m = bw.match(/[aeiou][^aeiou]*$/i);
    return m ? bw.length - m[0].length : Math.floor(bw.length / 2);
  })();
  let blended =
    aw.slice(0, cutA) + bw.slice(Math.min(tailStart, bw.length - 1));
  blended = blended.charAt(0).toUpperCase() + blended.slice(1);
  const suffix = suffixOf(b) ?? suffixOf(a);
  return suffix ? `${blended} ${suffix}` : blended;
}

const PERSONALITIES = [
  "inherited {A}'s stubborn streak and {B}'s curiosity — a handful at the base, first into every fight",
  "sleeps like {B}, eats like {A}, and has never once come when called. Beloved anyway",
  "combines {A}'s work ethic with {B}'s talent for finding the one fence gap in the whole base",
  "quietly the strongest personality on the ranch: half {A} loyalty, half {B} mischief",
  "workers swear it plans its breaks around {A}'s schedule and its meals around {B}'s",
  "an unshakeable optimist with {A}'s courage and {B}'s complete disregard for instructions",
];

export interface Fusion {
  name: string;
  type1: string;
  type2?: string;
  hp: number;
  attack: number;
  defense: number;
  breedingPower: number;
  rarity: number;
  workSuitability: Partial<Record<WorkKind, number>>;
  personality: string;
  parents: [string, string];
}

const WORK_KINDS: WorkKind[] = [
  "kindling", "watering", "planting", "generating", "gathering",
  "mining", "medicine", "transporting", "deforesting", "cooling",
  "farming", "handiwork",
];

export function fusePals(a: Pal, b: Pal): Fusion {
  const rand = rng(hashPair(a.name, b.name));
  const blend = (x?: number, y?: number) => {
    const base = ((x ?? 60) + (y ?? 60)) / 2;
    return Math.max(10, Math.round(base * (0.92 + rand() * 0.16)));
  };

  // Types: primary from A; secondary = B's primary if different, else B's
  // secondary. Never duplicate a type.
  const type1 = a.type1;
  let type2: string | undefined;
  if (b.type1 !== type1) type2 = b.type1;
  else if (b.type2 && b.type2 !== type1) type2 = b.type2;
  else if (a.type2 && a.type2 !== type1) type2 = a.type2;

  const work: Partial<Record<WorkKind, number>> = {};
  for (const kind of WORK_KINDS) {
    const v = Math.max(
      a.workSuitability?.[kind] ?? 0,
      b.workSuitability?.[kind] ?? 0,
    );
    if (v > 0) work[kind] = v;
  }

  const template = PERSONALITIES[Math.floor(rand() * PERSONALITIES.length)];

  return {
    name: blendName(a.name, b.name),
    type1,
    type2,
    hp: blend(a.hp, b.hp),
    attack: blend(a.attack, b.attack),
    defense: blend(a.defense, b.defense),
    breedingPower: Math.round((a.breedingPower + b.breedingPower) / 2),
    rarity: Math.min(10, Math.round((a.rarity + b.rarity) / 2 + rand())),
    workSuitability: work,
    personality: template.replace("{A}", a.name).replace("{B}", b.name),
    parents: [a.name, b.name],
  };
}
