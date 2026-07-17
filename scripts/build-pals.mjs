#!/usr/bin/env node
// Phase 0.3 — build-pals.mjs
// Regenerates data/pals.ts from:
//   1. scripts/_cache/normalized-137.json  (the 137 canonical pre-1.0 Pals, enriched w/ work/drops/stats)
//   2. NEW_PALS_1_0                         (the 72 authored 1.0 Pals, defined inline below)
//   3. TYPE_OVERRIDES                       (1.0 type corrections, e.g. Lovander -> Dark)
// Output is sorted by breedingPower ascending with sequential ids (spec P0.3 #3 / P2.1 #2).
// UNIQUE_COMBOS / TRUE_BREED_GROUP live in data/overrides.ts and are re-exported, not regenerated.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const cacheFile = resolve(root, "scripts/_cache/normalized-137.json");
const outFile = resolve(root, "data/pals.ts");

// New 1.0 Pals (138-210) are not on the mlg404 paldeck; their art is backfilled
// locally from scripts/fetch-pal-images.mjs into /public/paldex/<Name>.webp.
// Sanitization must match that script.
const localPalImage = (name) =>
  `/paldex/${name.replace(/[^A-Za-z0-9]/g, "")}.webp`;

// ---------------------------------------------------------------------------
// 1.0 type corrections (canonical source: data/overrides.ts). Kept here so the
// generated PALS already carry corrected types; the engine reads types from PALS.
// ---------------------------------------------------------------------------
const TYPE_OVERRIDES = {
  Lovander: { type1: "Dark" },
};

// ---------------------------------------------------------------------------
// The 72 new 1.0 Pals (47 species + 25 variants). Names/types verified from
// spec §1.3. breedingPower is interpolated (spread for species, base±offset for
// variants) until a 1.0-accurate source is available — see data/SOURCING.md.
// ---------------------------------------------------------------------------
const NEW_PALS_1_0 = [
  // --- 47 new species (verified, spec §1.3) ---
  { name: "Pupperai", t1: "Fire", t2: null, rarity: 1 },
  { name: "Clovee", t1: "Grass", t2: null, rarity: 1 },
  { name: "Amione", t1: "Neutral", t2: null, rarity: 2 },
  { name: "Wispaw", t1: "Fire", t2: null, rarity: 2 },
  { name: "Muffly", t1: "Grass", t2: null, rarity: 1 },
  { name: "Puffolt", t1: "Electric", t2: null, rarity: 2 },
  { name: "Elgrove", t1: "Grass", t2: null, rarity: 6 },
  { name: "Leafan", t1: "Grass", t2: null, rarity: 1 },
  { name: "Needoll", t1: "Dark", t2: null, rarity: 3 },
  { name: "Moldron", t1: "Ground", t2: null, rarity: 5 },
  { name: "Majex", t1: "Dragon", t2: null, rarity: 6 },
  { name: "Gildra", t1: "Dark", t2: null, rarity: 6 },
  { name: "Skutlass", t1: "Water", t2: null, rarity: 4 },
  { name: "Pierdon", t1: "Ground", t2: null, rarity: 6 },
  { name: "Snugloo", t1: "Ice", t2: null, rarity: 3 },
  { name: "Carnibora", t1: "Grass", t2: null, rarity: 6 },
  { name: "Dualith", t1: "Ground", t2: null, rarity: 6 },
  { name: "Sekhmet", t1: "Fire", t2: null, rarity: 8 },
  { name: "Tetroise", t1: "Ground", t2: null, rarity: 8 },
  { name: "Bulldosu", t1: "Ground", t2: null, rarity: 7 },
  { name: "Valentail", t1: "Water", t2: null, rarity: 4 },
  { name: "Snock", t1: "Dark", t2: null, rarity: 6 },
  { name: "Souffline", t1: "Fire", t2: null, rarity: 5 },
  { name: "Lapiron", t1: "Ice", t2: null, rarity: 7 },
  { name: "Hoodle", t1: "Dark", t2: null, rarity: 6 },
  { name: "Slowatt", t1: "Water", t2: null, rarity: 4 },
  { name: "Bakemi", t1: "Fire", t2: null, rarity: 5 },
  { name: "Solmora", t1: "Fire", t2: null, rarity: 8 },
  { name: "Lapure", t1: "Water", t2: null, rarity: 5 },
  { name: "Eidrolon", t1: "Dark", t2: null, rarity: 9, work: { transporting: 7 } },
  { name: "Dynamoff", t1: "Electric", t2: null, rarity: 4 },
  { name: "Tropicaw", t1: "Grass", t2: null, rarity: 6 },
  { name: "Flaracle", t1: "Fire", t2: null, rarity: 7 },
  { name: "Ophydia", t1: "Dark", t2: null, rarity: 7 },
  { name: "Dupin", t1: "Dark", t2: null, rarity: 7 },
  { name: "Roujay", t1: "Electric", t2: null, rarity: 5 },
  { name: "Venusa", t1: "Grass", t2: null, rarity: 8 },
  { name: "Mycora", t1: "Grass", t2: null, rarity: 6 },
  { name: "Loomen", t1: "Electric", t2: null, rarity: 5 },
  { name: "Wistella", t1: "Dark", t2: null, rarity: 8 },
  { name: "Solenne", t1: "Neutral", t2: null, rarity: 8, work: { handiwork: 8 } },
  { name: "Renjishi", t1: "Fire", t2: null, rarity: 9, work: { kindling: 8 } },
  { name: "Aegidron", t1: "Ground", t2: null, rarity: 9, work: { mining: 8 } },
  { name: "Shaolong", t1: "Water", t2: null, rarity: 9, work: { watering: 8 } },
  { name: "Silvance", t1: "Ice", t2: null, rarity: 8 },
  { name: "Dandilord", t1: "Grass", t2: null, rarity: 9 },
  { name: "Panthalus", t1: "Water", t2: null, rarity: 9 },
  { name: "Astralym", t1: "Dragon", t2: null, rarity: 10 },

  // --- 25 variant forms (verified, spec §1.3). base = base Pal name for rank interpolation ---
  { name: "Tanzee Ignis", t1: "Fire", t2: null, rarity: 2, base: "Tanzee" },
  { name: "Woolipop Terra", t1: "Ground", t2: null, rarity: 4, base: "Woolipop" },
  { name: "Gloopie Primo", t1: "Dragon", t2: null, rarity: 4, base: "Gloopie" },
  { name: "Univolt Cryst", t1: "Ice", t2: null, rarity: 6, base: "Univolt" },
  { name: "Polapup Terra", t1: "Ground", t2: null, rarity: 3, base: "Polapup" },
  { name: "Elgrove Cryst", t1: "Ice", t2: null, rarity: 7, base: "Elgrove" },
  { name: "Petallia Ignis", t1: "Fire", t2: null, rarity: 9, base: "Petallia" },
  { name: "Beakon Cryst", t1: "Ice", t2: null, rarity: 7, base: "Beakon" },
  { name: "Rayhound Cryst", t1: "Ice", t2: null, rarity: 6, base: "Rayhound" },
  { name: "Needoll Noct", t1: "Dark", t2: null, rarity: 4, base: "Needoll" },
  { name: "Moldron Cryst", t1: "Ice", t2: null, rarity: 6, base: "Moldron" },
  { name: "Sibelyx Primo", t1: "Dragon", t2: null, rarity: 8, base: "Sibelyx" },
  { name: "Skutlass Ignis", t1: "Fire", t2: null, rarity: 5, base: "Skutlass" },
  { name: "Starryon Primo", t1: "Dragon", t2: null, rarity: 7, base: "Starryon" },
  { name: "Pierdon Cryst", t1: "Ice", t2: null, rarity: 7, base: "Pierdon" },
  { name: "Dualith Noct", t1: "Dark", t2: null, rarity: 7, base: "Dualith" },
  { name: "Prixter Lux", t1: "Electric", t2: null, rarity: 7, base: "Prixter" },
  { name: "Tetroise Primo", t1: "Dragon", t2: null, rarity: 9, base: "Tetroise" },
  { name: "Nitemary Botan", t1: "Grass", t2: null, rarity: 8, base: "Nitemary" },
  { name: "Smokie Cryst", t1: "Ice", t2: null, rarity: 6, base: "Smokie" },
  { name: "Celesdir Noct", t1: "Dark", t2: null, rarity: 9, work: { deforesting: 8 }, base: "Celesdir" },
  { name: "Knocklem Ignis", t1: "Fire", t2: null, rarity: 9, base: "Knocklem" },
  { name: "Snock Lux", t1: "Electric", t2: null, rarity: 7, base: "Snock" },
  { name: "Solmora Lux", t1: "Electric", t2: null, rarity: 9, base: "Solmora" },
  { name: "Eidrolon Ignis", t1: "Fire", t2: null, rarity: 10, base: "Eidrolon" },
];

// Best-worker Lv-8 (condense to 10) assignments beyond the per-Pal `work` above (spec §1.7).
const EXTRA_WORKERS = {
  "Jormuntide Ignis": { kindling: 8 },
};

// Type -> default work suitability (Lv 2) and habitat biome for authored Pals.
const TYPE_WORK = {
  Fire: "kindling",
  Water: "watering",
  Grass: "planting",
  Ground: "mining",
  Electric: "generating",
  Ice: "cooling",
  Dark: "handiwork",
  Dragon: "gathering",
  Neutral: "transporting",
};
const TYPE_BIOME = {
  Fire: "volcanic",
  Water: "river",
  Grass: "forest",
  Ground: "canyon",
  Electric: "mountain",
  Ice: "snow",
  Dark: "ruins",
  Dragon: "mountain",
  Neutral: "grassland",
};
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_");

function applyTypeOverride(pal) {
  const ov = TYPE_OVERRIDES[pal.name];
  if (ov) {
    if (ov.type1) pal.type1 = ov.type1;
    if (ov.type2 !== undefined) pal.type2 = ov.type2;
  }
  return pal;
}

function main() {
  if (!existsSync(cacheFile)) {
    console.error(
      `[build-pals] missing ${cacheFile}. Run \`npm run fetch-pals\` first.`,
    );
    process.exit(1);
  }
  const base = JSON.parse(readFileSync(cacheFile, "utf8")); // 137 canonical Pals

  // Build name->pal + used breedingPower set for interpolation.
  const byName = new Map(base.map((p) => [p.name, p]));
  const used = new Set(base.map((p) => p.breedingPower));

  const newPals = [];
  NEW_PALS_1_0.forEach((spec, idx) => {
    let bp;
    if (spec.base) {
      const b = byName.get(spec.base);
      bp = b ? b.breedingPower + 5 : 15 + idx * 30;
    } else {
      bp = 15 + idx * 30;
    }
    // ensure uniqueness
    while (used.has(bp)) bp += 1;
    used.add(bp);

    const work = { ...(spec.work || {}) };
    if (!Object.keys(work).length && TYPE_WORK[spec.t1]) {
      work[TYPE_WORK[spec.t1]] = 2;
    }
    if (EXTRA_WORKERS[spec.name]) Object.assign(work, EXTRA_WORKERS[spec.name]);

    const key = String(138 + idx).padStart(3, "0");
    const pal = {
      id: "", // assigned after sort
      name: spec.name,
      type1: spec.t1,
      type2: spec.t2 || undefined,
      breedingPower: bp,
      image: localPalImage(spec.name),
      rarity: spec.rarity,
      workSuitability: work,
      hp: 80 + spec.rarity * 8,
      attack: 80 + spec.rarity * 6,
      defense: 80 + spec.rarity * 5,
      partnerSkill: `${spec.name}'s partner skill provides a combat or base-work bonus (1.0).`,
      drops: [{ item: `${slug(spec.name)}_meat`, probability: 1 }],
      description:
        `${spec.name} is a Pal added in the Palworld 1.0 update. ` +
        `Full 1.0 stats, partner-skill text, and drop rates are pending verification against official game data.`,
      habitats: [
        {
          biome: TYPE_BIOME[spec.t1] || "grassland",
          regionName: spec.rarity >= 8 ? "World Tree" : "Palworld",
          commonness: spec.rarity >= 8 ? "very rare" : "common",
          timeOfDay: ["both"],
          weather: ["any"],
        },
      ],
    };
    newPals.push(applyTypeOverride(pal));
  });

  // Merge, apply 1.0 type overrides to the base 137 too, sort by breedingPower asc, assign ids.
  // Base Pals now use the same local complete-character Fandom art as the 1.0 Pals
  // (the mlg404 paldeck only had zoomed-face art), so every Pal renders consistently.
  const all = [
    ...base.map((p) => {
      const withOverride = applyTypeOverride(p);
      return { ...withOverride, image: localPalImage(withOverride.name) };
    }),
    ...newPals,
  ].sort((a, b) => a.breedingPower - b.breedingPower);
  all.forEach((p, i) => (p.id = String(i + 1)));

  // Emit data/pals.ts
  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/build-pals.mjs — do not edit by hand.");
  lines.push("// Regenerate: npm run fetch-pals && npm run build-pals");
  lines.push("// Edit 1.0 corrections in data/overrides.ts; edit the 72 new Pals in scripts/build-pals.mjs.");
  lines.push("");
  lines.push('import type { Biome } from "./mapData";');
  lines.push('import { UNIQUE_COMBOS } from "./overrides";');
  lines.push("");
  lines.push("export type WorkKind =");
  lines.push(
    "  | 'kindling' | 'watering' | 'planting' | 'generating' | 'gathering'",
  );
  lines.push(
    "  | 'mining' | 'medicine' | 'transporting' | 'deforesting' | 'cooling'",
  );
  lines.push("  | 'farming' | 'handiwork';");
  lines.push("");
  lines.push("export interface Pal {");
  lines.push('  id: string;');
  lines.push("  name: string;");
  lines.push("  type1: string;");
  lines.push("  type2?: string;");
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
  lines.push("}");
  lines.push("");
  lines.push("export const PALS: Pal[] = [");
  for (const p of all) {
    lines.push("  " + palToLine(p) + ",");
  }
  lines.push("];");
  lines.push("");
  lines.push("export { UNIQUE_COMBOS };");

  writeFileSync(outFile, lines.join("\n") + "\n");
  console.log(
    `[build-pals] wrote ${all.length} Pals (${base.length} base + ${newPals.length} new) -> ${outFile}`,
  );
}

// Compact single-line object literal, omitting undefined fields, stable key order.
function palToLine(p) {
  const keys = [
    "id",
    "name",
    "type1",
    "type2",
    "breedingPower",
    "image",
    "rarity",
    "workSuitability",
    "hp",
    "attack",
    "defense",
    "partnerSkill",
    "drops",
    "description",
    "habitats",
  ];
  const parts = keys
    .filter((k) => p[k] !== undefined)
    .map((k) => `${JSON.stringify(k)}: ${JSON.stringify(p[k])}`);
  return `{${parts.join(", ")}}`;
}

main();
