#!/usr/bin/env node
// build-digimon.mjs — Digimon Story: Time Stranger data pack pipeline
// (multi-game pivot, Tier 1 #3). Generates data/digimon.ts from
// data/source/digimon/digimon-data.js — the structured data file behind
// jsuk.cloud's path finder, the ONLY source carrying per-target
// digivolution requirements (see data/source/digimon/SOURCING.md and
// ~/workspace/palbreedai/digimon-research.md).
//
// CRITICAL SEMANTICS (verified in research, gated below):
//   - `ev` / `pr` lists are 0-BASED ARRAY INDICES into mon[], NOT Field
//     Guide numbers. Misreading them makes Omnimon's parents come out as
//     Venusmon + MirageGaogamon instead of WarGreymon + MetalGarurumon.
//   - ev<->pr must be exact inverses (1,088 forward edges).
//   - Requirements attach to the TARGET (its `r` list), whatever the
//     parent. Kinds: rank (453), stat (855), item (15), skill (27),
//     pers (34), mon (5).
//   - DNA digivolution is implicit: a target whose `r` holds TWO `pers`
//     requirements naming two DIFFERENT Digimon that are both in its
//     `pr` is a DNA result — emit ONE two-input edge and remove those
//     two single edges. Exactly 17 exist; the partner pairs are
//     cross-validated against jogress-crosscheck.csv (34 jogress rows).
//   - De-digivolution = free reverse traversal, no requirements.
//   - `mc` lists are lateral mode-change edges (30 entries).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const srcFile = resolve(root, "data/source/digimon/digimon-data.js");
const jogressFile = resolve(root, "data/source/digimon/jogress-crosscheck.csv");
const outFile = resolve(root, "data/digimon.ts");

function fail(msg) {
  console.error(`[build-digimon] VALIDATION FAILED: ${msg}`);
  process.exit(1);
}

function parseCondition(r) {
  switch (r.k) {
    case "rank":
      return { kind: "agent-rank", label: r.fE, value: r.v };
    case "stat":
      return { kind: "stat", label: r.fE };
    case "item":
      return { kind: "item", label: r.fE };
    case "skill":
      return { kind: "agent-skill", label: r.fE };
    case "mon":
      return { kind: "requires-digimon", label: r.fE };
    case "pers":
      return { kind: "personality", label: r.fE };
    default:
      return { kind: "requirement", label: r.fE ?? r.tE };
  }
}

function main() {
  const raw = readFileSync(srcFile, "utf8");
  const data = JSON.parse(raw.replace(/^window\.DIGIMON_DATA=/, "").replace(/;\s*$/, ""));
  const mon = data.mon;
  const gen = data.dictE.gen;
  const attr = data.dictE.attr;
  const type = data.dictE.type;
  const pers = data.dictE.pers;

  if (mon.length !== 476) fail(`expected 476 Digimon, got ${mon.length}`);

  const creatures = mon.map((m) => ({
    no: m.no,
    name: m.eE,
    stage: gen[m.g],
    attribute: attr[m.a],
    type: type[m.t],
    personality: pers[m.p],
    dlc: !!m.dlc,
  }));
  const nameAt = (i) => mon[i].eE;

  // --- inverse consistency gate ------------------------------------------------
  let rawEdges = 0;
  for (let i = 0; i < mon.length; i++) {
    for (const j of mon[i].ev ?? []) {
      rawEdges++;
      if (!(mon[j].pr ?? []).includes(i))
        fail(`ev/pr inverse broken: ${nameAt(i)} -> ${nameAt(j)}`);
    }
  }
  if (rawEdges !== 1088) fail(`expected 1088 raw edges, got ${rawEdges}`);

  // --- DNA detection -------------------------------------------------------------
  const dnaByTarget = new Map(); // targetIdx -> [aIdx, bIdx]
  for (let t = 0; t < mon.length; t++) {
    const persReqs = (mon[t].r ?? []).filter((r) => r.k === "pers");
    if (persReqs.length !== 2) continue;
    const named = persReqs.map((r) => r.tE.split(":")[0].trim());
    const pr = mon[t].pr ?? [];
    const idx = named.map((n) => mon.findIndex((m) => m.eE === n));
    if (idx.every((i) => i >= 0 && pr.includes(i)) && idx[0] !== idx[1]) {
      dnaByTarget.set(t, idx);
    }
  }
  if (dnaByTarget.size !== 17)
    fail(`expected 17 DNA targets, detected ${dnaByTarget.size}`);

  // Cross-validate partner pairs against the jogress CSV (Field Guide nos).
  // Rules learned from the data (see SOURCING.md):
  //  - A detected pair must never be CONTRADICTED: if the CSV has the row,
  //    it must be jogress=true. (32/32 covered pairs agree.)
  //  - The CSV has no rows at all into DLC target no. 456 (Omnimon
  //    Alter-S), so its two pairs are absent — a coverage gap, not a
  //    contradiction. Counted and printed, not fatal.
  //  - The CSV itself contains two spurious reciprocal jogress rows
  //    (430->431 and 431->430, Omnimon <-> Omnimon Zwart, which do not
  //    evolve into each other in the canonical data). Allowlisted below;
  //    any OTHER undetected jogress row fails the build.
  const csvRows = new Map();
  const jogressPairs = new Set();
  for (const line of readFileSync(jogressFile, "utf8").trim().split("\n").slice(1)) {
    const [from, to, jog] = line.split(",");
    csvRows.set(`${from}->${to}`, jog?.trim());
    if (jog?.trim() === "true") jogressPairs.add(`${from}->${to}`);
  }
  if (jogressPairs.size !== 34)
    fail(`expected 34 jogress rows, got ${jogressPairs.size}`);
  const detectedPairs = new Set();
  for (const [t, partners] of dnaByTarget) {
    for (const p of partners) {
      const key = `${mon[p].no}->${mon[t].no}`;
      detectedPairs.add(key);
      const row = csvRows.get(key);
      if (row !== undefined && row !== "true")
        fail(`DNA pair contradicted by jogress CSV: ${key}`);
    }
  }
  const KNOWN_SPURIOUS = new Set(["430->431", "431->430"]);
  for (const key of jogressPairs) {
    if (!detectedPairs.has(key) && !KNOWN_SPURIOUS.has(key))
      fail(`jogress CSV pair not detected as DNA: ${key}`);
  }
  const absent = [...detectedPairs].filter((k) => !csvRows.has(k));
  if (absent.length)
    console.log(
      `[build-digimon] note: ${absent.length} DNA pairs absent from the cross-check CSV (DLC coverage gap): ${absent.join(", ")}`,
    );

  // --- edges ---------------------------------------------------------------------
  const dnaSingles = new Set();
  for (const [t, partners] of dnaByTarget) {
    for (const p of partners) dnaSingles.add(`${p}->${t}`);
  }

  const edges = [];
  for (let i = 0; i < mon.length; i++) {
    for (const j of mon[i].ev ?? []) {
      if (dnaSingles.has(`${i}->${j}`)) continue;
      edges.push({
        kind: "digivolve",
        from: [nameAt(i)],
        to: nameAt(j),
        conditions: (mon[j].r ?? [])
          .filter((r) => r.k !== "pers")
          .map(parseCondition),
      });
    }
  }
  for (const [t, partners] of dnaByTarget) {
    edges.push({
      kind: "dna",
      from: partners.map(nameAt),
      to: nameAt(t),
      conditions: (mon[t].r ?? []).map(parseCondition),
    });
  }
  for (let i = 0; i < mon.length; i++) {
    for (const j of mon[i].mc ?? []) {
      edges.push({
        kind: "modechange",
        from: [nameAt(i)],
        to: nameAt(j),
        conditions: [{ kind: "mode-change", label: "Mode change" }],
      });
    }
  }
  // De-digivolve edges for the remaining single-input digivolve edges.
  const singles = edges.filter((e) => e.kind === "digivolve");
  for (const e of singles) {
    edges.push({
      kind: "dedigivolve",
      from: [e.to],
      to: e.from[0],
      conditions: [],
    });
  }

  // --- emit ----------------------------------------------------------------------
  // Data ships as JSON + a thin typed wrapper: inlining 476 creatures and
  // 2,156 edges as a TS literal makes the compiler infer a union type too
  // complex to represent (verified — the build fails on it).
  const jsonFile = resolve(root, "data/digimon.json");
  writeFileSync(jsonFile, JSON.stringify({ creatures, edges }));
  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/build-digimon.mjs — do not edit by hand.");
  lines.push("// Regenerate: npm run build-digimon");
  lines.push("// Sources + semantics: data/source/digimon/SOURCING.md");
  lines.push("");
  lines.push('import raw from "./digimon.json";');
  lines.push("");
  lines.push("export interface DigimonCreature {");
  lines.push("  no: number;");
  lines.push("  name: string;");
  lines.push("  stage: string;");
  lines.push("  attribute: string;");
  lines.push("  type: string;");
  lines.push("  personality: string;");
  lines.push("  dlc: boolean;");
  lines.push("}");
  lines.push("");
  lines.push("export interface DigimonEdge {");
  lines.push('  kind: "digivolve" | "dna" | "modechange" | "dedigivolve";');
  lines.push("  from: string[];");
  lines.push("  to: string;");
  lines.push(
    "  conditions: Array<{ kind: string; label: string; value?: string | number }>;",
  );
  lines.push("}");
  lines.push("");
  lines.push(
    "export const DIGIMON_CREATURES = raw.creatures as DigimonCreature[];",
  );
  lines.push("export const DIGIMON_EDGES = raw.edges as DigimonEdge[];");
  writeFileSync(outFile, lines.join("\n") + "\n");

  const counts = {};
  for (const e of edges) counts[e.kind] = (counts[e.kind] ?? 0) + 1;
  console.log(
    `[build-digimon] wrote ${creatures.length} creatures, ${edges.length} edges ` +
      `(${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(", ")}) -> data/digimon.ts`,
  );
}

main();
