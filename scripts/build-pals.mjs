#!/usr/bin/env node
// build-pals.mjs — Palworld 1.0 data pipeline (rewritten 2026-10-22).
//
// Regenerates data/pals.ts and data/specials.ts from the canonical 1.0 dataset
// committed under data/source/ (see data/SOURCING.md for provenance):
//   1. data/source/pals-1.0.json    — 298 Pals (287 Paldeck + 11 Terraria):
//      name, Paldeck no., elements, rarity, CombiRank (breedingPower), base
//      stats, work suitability, description. Extracted from 1.0 game files.
//   2. data/source/special-1.0.json — 136 official unique combos
//      (DT_PalCombiUnique), as index triples into pals-1.0.json.
//   3. data/source/combos-1.0.json   — the full 298x298 breeding matrix. Used
//      here ONLY to derive each Pal's formulaPool flag (the set of Pals the
//      power-average formula can produce). The matrix itself is the test
//      oracle for lib/breeding-matrix.test.ts.
//   4. data/enrichment.json         — repo-only enrichment that the canonical
//      dataset does not carry: partnerSkill, drops, habitats, notableLocations.
//
// Output PALS are sorted by breedingPower (CombiRank) ascending, then Paldeck
// number, with sequential ids — the canonical breeding index the engine's
// tie-break relies on.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const palsFile = resolve(root, "data/source/pals-1.0.json");
const specialFile = resolve(root, "data/source/special-1.0.json");
const combosFile = resolve(root, "data/source/combos-1.0.json");
const enrichFile = resolve(root, "data/enrichment.json");
const outPals = resolve(root, "data/pals.ts");
const outSpecials = resolve(root, "data/specials.ts");

const localPalImage = (name) =>
  `/paldex/${name.replace(/[^A-Za-z0-9]/g, "")}.webp`;

// Canonical dataset vocabulary -> this repo's vocabulary.
const ELEMENT_MAP = { Normal: "Neutral", Electricity: "Electric" };
const WORK_MAP = {
  Kindling: "kindling",
  Watering: "watering",
  Planting: "planting",
  GenerateElectricity: "generating",
  Gathering: "gathering",
  Mining: "mining",
  MedicineProduction: "medicine",
  Transporting: "transporting",
  Lumbering: "deforesting",
  Cooling: "cooling",
  Farming: "farming",
  Handiwork: "handiwork",
};

// The one gender-dependent pair in 1.0. The breeding matrix marks this pair
// -1 ("no fixed outcome") in both orders; the official unique-combo table
// lists two gender-specific children. The engine returns the primary child
// (Katress Ignis); specials.ts records both so the UI can surface the note.
const GENDER_PAIR = ["Katress", "Wixen"];
const GENDER_DEFAULT_CHILD = "Katress Ignis";

function main() {
  const srcPals = JSON.parse(readFileSync(palsFile, "utf8"));
  const srcSpecial = JSON.parse(readFileSync(specialFile, "utf8"));
  const combos = JSON.parse(readFileSync(combosFile, "utf8"));
  const enrich = JSON.parse(readFileSync(enrichFile, "utf8"));
  const nameAt = (i) => srcPals[i].name;

  // --- special combos -------------------------------------------------------
  const specialPairs = new Set(
    srcSpecial.map((s) => [Math.min(s.p1, s.p2), Math.max(s.p1, s.p2)].join("+")),
  );
  const uniqueCombos = {};
  const genderChildren = [];
  for (const s of srcSpecial) {
    const a = nameAt(s.p1);
    const b = nameAt(s.p2);
    const child = nameAt(s.child);
    const pairNames = [a, b].sort();
    if (pairNames.join("+") === [...GENDER_PAIR].sort().join("+")) {
      genderChildren.push(child);
      continue;
    }
    uniqueCombos[pairNames.join("+")] = child;
  }

  // --- formula pool ---------------------------------------------------------
  // A Pal is in the formula pool iff some non-special, mixed-species pair in
  // the verified matrix produces it.
  const poolIdx = new Set();
  for (let i = 0; i < srcPals.length; i++) {
    for (let j = i + 1; j < srcPals.length; j++) {
      if (specialPairs.has(`${i}+${j}`)) continue;
      poolIdx.add(combos[i][j]);
    }
  }

  // --- build PALS -----------------------------------------------------------
  const pals = srcPals.map((p, idx) => {
    const work = {};
    for (const [k, v] of Object.entries(p.work || {})) {
      const mapped = WORK_MAP[k];
      if (mapped) work[mapped] = v;
    }
    const e = enrich[p.name] || {};
    const pal = {
      id: "", // assigned after sort
      dex: p.dex,
      name: p.name,
      type1: ELEMENT_MAP[p.elements[0]] || p.elements[0],
      type2: p.elements[1]
        ? ELEMENT_MAP[p.elements[1]] || p.elements[1]
        : undefined,
      breedingPower: p.combiRank,
      image: localPalImage(p.name),
      rarity: p.rarity,
      workSuitability: Object.keys(work).length ? work : undefined,
      hp: p.stats?.hp,
      attack: p.stats?.atk,
      defense: p.stats?.def,
      partnerSkill: e.partnerSkill,
      drops: e.drops,
      description: p.desc,
      habitats: e.habitats,
      notableLocations: e.notableLocations,
      formulaPool: poolIdx.has(idx) ? true : undefined,
    };
    return pal;
  });

  pals.sort(
    (a, b) => a.breedingPower - b.breedingPower || (a.dex ?? 999) - (b.dex ?? 999),
  );
  pals.forEach((p, i) => (p.id = String(i + 1)));

  // --- emit data/pals.ts ------------------------------------------------------
  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/build-pals.mjs — do not edit by hand.");
  lines.push("// Regenerate: npm run fetch-pals && npm run build-pals");
  lines.push("// Canonical 1.0 source: data/source/ (see data/SOURCING.md).");
  lines.push("// Repo-only enrichment (partner skills, drops, habitats): data/enrichment.json.");
  lines.push("");
  lines.push('import type { Biome } from "./mapData";');
  lines.push('import { UNIQUE_COMBOS } from "./specials";');
  lines.push("");
  lines.push("export type WorkKind =");
  lines.push("  | 'kindling' | 'watering' | 'planting' | 'generating' | 'gathering'");
  lines.push("  | 'mining' | 'medicine' | 'transporting' | 'deforesting' | 'cooling'");
  lines.push("  | 'farming' | 'handiwork';");
  lines.push("");
  lines.push("export interface Pal {");
  lines.push("  id: string;");
  lines.push("  dex?: number;");
  lines.push("  name: string;");
  lines.push("  type1: string;");
  lines.push("  type2?: string;");
  lines.push("  /** Palworld 1.0 CombiRank (the game's breeding power). Lower = rarer. */");
  lines.push("  breedingPower: number;");
  lines.push("  image: string;");
  lines.push("  rarity: number;");
  lines.push("  workSuitability?: Partial<Record<WorkKind, number>>;");
  lines.push("  hp?: number;");
  lines.push("  attack?: number;");
  lines.push("  defense?: number;");
  lines.push("  partnerSkill?: string;");
  lines.push("  drops?: { item: string; probability: number }[];");
  lines.push("  description?: string;");
  lines.push("  habitats?: Array<{");
  lines.push("    biome: Biome;");
  lines.push("    regionName: string;");
  lines.push("    commonness?: 'common' | 'uncommon' | 'rare' | 'very rare';");
  lines.push("    timeOfDay?: ('day' | 'night' | 'both')[];");
  lines.push("    weather?: ('clear' | 'rain' | 'sandstorm' | 'snow' | 'any')[];");
  lines.push("  }>;");
  lines.push("  notableLocations?: string[];");
  lines.push("  /** True iff the 1.0 power-average formula can produce this Pal. */");
  lines.push("  formulaPool?: boolean;");
  lines.push("}");
  lines.push("");
  lines.push("export const PALS: Pal[] = [");
  for (const p of pals) lines.push("  " + palToLine(p) + ",");
  lines.push("];");
  lines.push("");
  lines.push("export { UNIQUE_COMBOS };");
  writeFileSync(outPals, lines.join("\n") + "\n");

  // --- emit data/specials.ts --------------------------------------------------
  const sp = [];
  sp.push("// AUTO-GENERATED by scripts/build-pals.mjs — do not edit by hand.");
  sp.push("// Official Palworld 1.0 unique breeding combos (DT_PalCombiUnique),");
  sp.push("// from data/source/special-1.0.json. Keys are order-independent:");
  sp.push('// "ParentA+ParentB" with parent names sorted A-Z.');
  sp.push("");
  sp.push("export const UNIQUE_COMBOS: Record<string, string> = {");
  for (const [k, v] of Object.entries(uniqueCombos).sort()) {
    sp.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }
  sp.push("};");
  sp.push("");
  sp.push("/**");
  sp.push(" * The single gender-dependent pair in 1.0 (Katress + Wixen).");
  sp.push(" * The breeding matrix has no fixed outcome for this pair; which of");
  sp.push(" * the genderChildren hatches depends on the parents' genders.");
  sp.push(" * defaultChild is the engine's primary result.");
  sp.push(" */");
  sp.push("export const GENDER_DEPENDENT_COMBOS: Array<{");
  sp.push("  parents: [string, string];");
  sp.push("  defaultChild: string;");
  sp.push("  genderChildren: string[];");
  sp.push("}> = [");
  sp.push(
    `  { parents: ${JSON.stringify(GENDER_PAIR)}, defaultChild: ${JSON.stringify(GENDER_DEFAULT_CHILD)}, genderChildren: ${JSON.stringify(genderChildren)} },`,
  );
  sp.push("];");
  writeFileSync(outSpecials, sp.join("\n") + "\n");

  console.log(
    `[build-pals] wrote ${pals.length} Pals (${poolIdx.size} in formula pool), ` +
      `${Object.keys(uniqueCombos).length} unique combos -> data/pals.ts + data/specials.ts`,
  );
}

function palToLine(p) {
  const keys = [
    "id", "dex", "name", "type1", "type2", "breedingPower", "image", "rarity",
    "workSuitability", "hp", "attack", "defense", "partnerSkill", "drops",
    "description", "habitats", "notableLocations", "formulaPool",
  ];
  const parts = keys
    .filter((k) => p[k] !== undefined)
    .map((k) => `${JSON.stringify(k)}: ${JSON.stringify(p[k])}`);
  return `{${parts.join(", ")}}`;
}

main();
