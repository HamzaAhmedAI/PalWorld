#!/usr/bin/env node
// Phase 0.2 — fetch-1-0-data.mjs
// Downloads the canonical Palworld dataset (mlg404/palworld-paldex-api) and normalizes
// each Pal into the site's intermediate shape, writing scripts/_cache/normalized-137.json.
//
// The API is the pre-1.0 (137 Pal) dataset; the 72 new 1.0 Pals are layered on by
// scripts/build-pals.mjs via data/overrides.ts. See data/SOURCING.md for the merge order.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const cacheDir = resolve(root, "scripts/_cache");
const outPath = resolve(cacheDir, "normalized-137.json");

const PALS_URL =
  "https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json";
const IMAGE_BASE =
  "https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/paldeck/";

// API work-kind -> site WorkKind union (spec P1.1).
const WORK_MAP = {
  handiwork: "handiwork",
  transporting: "transporting",
  farming: "farming",
  gathering: "gathering",
  mining: "mining",
  planting: "planting",
  lumbering: "deforesting",
  medicine_production: "medicine",
  kindling: "kindling",
  watering: "watering",
  generating_electricity: "generating",
  cooling: "cooling",
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`);
  return res.json();
}

function normalize(raw) {
  return raw.map((p) => {
    const types = (p.types || []).map((t) => cap(t.name));
    const workSuitability = {};
    for (const s of p.suitability || []) {
      const kind = WORK_MAP[s.type];
      if (kind) workSuitability[kind] = s.level;
    }
    const stats = p.stats || {};
    const attack = stats.attack?.melee ?? stats.attack ?? undefined;
    return {
      name: p.name,
      key: p.key,
      type1: types[0] ?? "Neutral",
      type2: types[1],
      breedingPower: p.breeding?.rank ?? 0,
      rarity: p.rarity ?? 1,
      image: `${IMAGE_BASE}${p.key}.png`,
      workSuitability,
      drops: (p.drops || []).map((item) => ({ item, probability: 1 })),
      partnerSkill: p.aura?.description || p.aura?.name || "",
      description: p.description || "",
      hp: stats.hp,
      attack,
      defense: stats.defense,
      genus: p.genus,
    };
  });
}

async function main() {
  mkdirSync(cacheDir, { recursive: true });
  let raw;
  try {
    console.log(`[fetch-1-0-data] downloading ${PALS_URL}`);
    raw = await fetchJson(PALS_URL);
  } catch (err) {
    // Fall back to a previously cached normalized file so the pipeline still builds offline.
    if (existsSync(outPath)) {
      console.warn(
        `[fetch-1-0-data] network failed (${err.message}); using cached ${outPath}`,
      );
      process.exit(0);
    }
    console.error(`[fetch-1-0-data] FAILED and no cache: ${err.message}`);
    process.exit(1);
  }

  const normalized = normalize(raw);
  writeFileSync(outPath, JSON.stringify(normalized, null, 2));
  console.log(
    `[fetch-1-0-data] normalized ${normalized.length} Pals -> ${outPath}`,
  );
}

main();
