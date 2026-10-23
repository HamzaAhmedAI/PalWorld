#!/usr/bin/env node
// build-aniimo.mjs — Aniimo data pack pipeline (multi-game pivot, Week 3).
//
// Generates data/aniimo.ts from the sources committed under
// data/source/aniimo/ (see data/source/aniimo/SOURCING.md):
//   1. wiki-snapshot.json        — official-wiki snapshot (wanghuan072/aniimo):
//      roster (94 entries) + recursive evolutionTree per entry. CANONICAL
//      for the roster and for evolution edges.
//   2. evolutions-conditions.json — per-step evolution conditions parsed
//      from aniimotools.dev (the only complete conditions source), cross-
//      checked against datamined aniimo.gg / aniidex.com. Conditions attach
//      to the CHILD of each edge (requirementsToReach).
//   3. species-forms.json        — forms/dex metadata (not yet consumed by
//      the pack; kept for the forms pages).
//
// Known source conflicts, resolved as follows (documented, not hidden):
//   - The wiki snapshot is pre-1.1 and misses a few edges/species that the
//     conditions source has. Single unambiguous steps are added and marked
//     source: "tools": Hummin -> Hexxin, Jawling -> Helmwhelp,
//     Squarrel -> Squashel (the last two species exist only in the tools
//     source). Where both sources give Hummin a different route to Tuckin,
//     both edges are kept and the planner shows both.
//   - Six evolved forms have no published conditions anywhere found
//     (Coraliz, Gachapus, Glameep, Malevsera, Wavwal, Witchin): their edges
//     carry conditionsVerified: false.
//   - Cross-check correction: Flameruff -> Scorchhowl also requires the
//     deed "Defeat the Alpha Scorchhowl" (aniimo.gg + aniidex; the
//     conditions source omits it). Added in EXTRA_CONDITIONS below.
//   - The wiki snapshot contains one name typo, "Budclaw." — normalised.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const wikiFile = resolve(root, "data/source/aniimo/wiki-snapshot.json");
const condFile = resolve(root, "data/source/aniimo/evolutions-conditions.json");
const outFile = resolve(root, "data/aniimo.ts");

const normName = (n) => n.replace(/\.$/, "").trim();

// Extra conditions from the datamined cross-check (aniimo.gg / aniidex.com).
const EXTRA_CONDITIONS = {
  Scorchhowl: [{ kind: "deed", label: "Defeat the Alpha Scorchhowl" }],
};

// Edges present in the conditions source but missing from the wiki trees.
const EXTRA_EDGES = [
  { from: "Hummin", to: "Hexxin" },
  { from: "Jawling", to: "Helmwhelp" },
  { from: "Squarrel", to: "Squashel" },
];
// Species that exist only in the conditions source (stage from line position).
const EXTRA_CREATURES = [
  { slug: "hexxin", name: "Hexxin", dex: null, stage: 2, elements: [], roles: [], habitats: [] },
  { slug: "squarrel", name: "Squarrel", dex: null, stage: 1, elements: [], roles: [], habitats: [] },
  { slug: "squashel", name: "Squashel", dex: null, stage: 3, elements: [], roles: [], habitats: [] },
];

function parseCondition(req) {
  const text = req.text.replace(/\.$/, "");
  const level = text.match(/level\s*(\d+)|Lv\.\s*(\d+)/i);
  if (/aniimo (level|reaches)/i.test(text) && level) {
    return {
      kind: "level",
      label: `Reach level ${level[1] || level[2]}`,
      value: Number(level[1] || level[2]),
    };
  }
  if (req.itemId) return { kind: "item", label: text, value: req.itemId };
  if (/learn passive talent/i.test(text))
    return { kind: "talent", label: text };
  if (/potential/i.test(text)) return { kind: "potential", label: text };
  if (/dig in|at the entrance|sanctum/i.test(text))
    return { kind: "location", label: text };
  if (/night|day|dawn|dusk/i.test(text)) return { kind: "time", label: text };
  if (/gender|male|female/i.test(text)) return { kind: "gender", label: text };
  if (/defeat/i.test(text)) return { kind: "deed", label: text };
  return { kind: "requirement", label: text };
}

function main() {
  const wiki = JSON.parse(readFileSync(wikiFile, "utf8"));
  const cond = JSON.parse(readFileSync(condFile, "utf8"));

  // --- conditions per child -------------------------------------------------
  const condByChild = new Map();
  for (const line of cond.lines) {
    for (const step of line) {
      if (step.requirementsToReach?.length) {
        condByChild.set(
          normName(step.name),
          step.requirementsToReach.map(parseCondition),
        );
      }
    }
  }
  for (const [child, extra] of Object.entries(EXTRA_CONDITIONS)) {
    condByChild.set(child, [...(condByChild.get(child) ?? []), ...extra]);
  }

  // --- creatures --------------------------------------------------------------
  const creatures = wiki.entries.map((e) => ({
    slug: e.slug,
    name: normName(e.name),
    dex: e.entryId ?? null,
    stage: e.stage ?? null,
    elements: e.elements ?? [],
    roles: e.roles ?? [],
    habitats: e.habitats ?? [],
  }));
  const known = new Set(creatures.map((c) => c.name));
  for (const c of EXTRA_CREATURES) {
    if (!known.has(c.name)) creatures.push(c);
  }

  // --- edges ------------------------------------------------------------------
  const edgeMap = new Map();
  const addEdge = (from, to, source) => {
    const key = `${from}->${to}`;
    if (!edgeMap.has(key)) edgeMap.set(key, { from, to, source });
  };
  const walk = (node, parent) => {
    const name = normName(node.name);
    if (parent) addEdge(parent, name, "wiki");
    for (const child of node.children ?? []) walk(child, name);
  };
  for (const e of wiki.entries) {
    if (e.evolutionTree) walk(e.evolutionTree, null);
  }
  for (const e of EXTRA_EDGES) addEdge(e.from, e.to, "tools");

  const edges = [...edgeMap.values()].map((e) => {
    const conditions = condByChild.get(e.to) ?? [];
    return {
      from: e.from,
      to: e.to,
      source: e.source,
      conditions,
      conditionsVerified: conditions.length > 0,
    };
  });

  // --- emit -------------------------------------------------------------------
  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/build-aniimo.mjs — do not edit by hand.");
  lines.push("// Regenerate: npm run build-aniimo");
  lines.push("// Sources + conflict resolutions: data/source/aniimo/SOURCING.md");
  lines.push("");
  lines.push("export interface AniimoCreature {");
  lines.push("  slug: string;");
  lines.push("  name: string;");
  lines.push("  dex: string | null;");
  lines.push("  /** 1 = Lumin, 2 = Gamma, 3 = Nova, 4 = Legendary. */");
  lines.push("  stage: number | null;");
  lines.push("  elements: string[];");
  lines.push("  roles: string[];");
  lines.push("  habitats: string[];");
  lines.push("}");
  lines.push("");
  lines.push("export interface AniimoEdge {");
  lines.push("  from: string;");
  lines.push("  to: string;");
  lines.push('  source: "wiki" | "tools";');
  lines.push(
    "  conditions: Array<{ kind: string; label: string; value?: string | number }>;",
  );
  lines.push("  conditionsVerified: boolean;");
  lines.push("}");
  lines.push("");
  lines.push(
    `export const ANIIMO_CREATURES: AniimoCreature[] = ${JSON.stringify(creatures, null, 1)};`,
  );
  lines.push("");
  lines.push(
    `export const ANIIMO_EDGES: AniimoEdge[] = ${JSON.stringify(edges, null, 1)};`,
  );
  writeFileSync(outFile, lines.join("\n") + "\n");

  const unverified = edges.filter((e) => !e.conditionsVerified);
  console.log(
    `[build-aniimo] wrote ${creatures.length} creatures, ${edges.length} edges ` +
      `(${unverified.length} with unverified conditions: ${unverified.map((e) => e.to).join(", ")}) -> data/aniimo.ts`,
  );
}

main();
