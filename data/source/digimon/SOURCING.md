# Digimon Data Sourcing (`data/source/digimon/`)

Pipeline: `scripts/build-digimon.mjs` → `data/digimon.ts` → `lib/engine/packs/digimon.ts`.
Researched 2026-10-23 (full report: `~/workspace/palbreedai/digimon-research.md`).
Facts only — no source text or artwork is used.

## Sources

| File | Source | Role |
| --- | --- | --- |
| `digimon-data.js` | jsuk.cloud `/data/digimon.js` (the data file behind the digimon.jsuk.cloud path finder), snapshot 2026-10-23 | Canonical: roster, edges, per-target requirements, mode changes, DLC flags |
| `jogress-crosscheck.csv` | `sny-tanaka` GitHub CSV export | DNA (jogress) partner-pair validation — build fails if the 17 detected pairs disagree |
| `roster-crosscheck.csv` | `SpencerHBoyd` GitHub CSV export | Roster cross-check (459 launch Digimon; strict subset of the 476) |

Game: Digimon Story: Time Stranger (Oct 2025). Roster verdict: **476**
(459 launch + 17 DLC/free additions through Episode Pack 3, Mar 2026).
Beware franchise/Cyber Sleuth datasets — they describe different games.

## Semantics that will bite if forgotten

- `ev`/`pr` are **0-based array indices** into `mon[]`, not Field Guide
  numbers (`no`). Under the index reading, ev↔pr consistency is
  1088/1088 and Omnimon's parents are WarGreymon + MetalGarurumon.
- Requirements attach to the **target** Digimon (its `r` list):
  agent-rank (453), stat thresholds (855), item (15 — Armor evolutions
  need Capsules, this game's Digi-Eggs), agent-skill (27), personality
  (34 — all DNA), requires-Digimon (5 — X-Antibody forms). There are
  **no bond or level gates** in this game.
- **DNA digivolution (17)** is implicit in the source: a target with two
  `pers` requirements naming two different Digimon in its `pr` list.
  The build emits one two-input edge and removes the two single edges.
- **De-digivolution** is free reverse traversal with no requirements.
  The pack exports those edges separately (`digimonDevolveEdges`) — they
  are NOT in the planner's edge set, because free up/down traversal
  creates cycles in path expansion.
- **Mode change** (`mc`, 30 entries) is a lateral edge type: Hybrid
  slide evolutions, Imperialdramon DM↔FM, X-Antibody conversions.
- Two DNA results keep literal combined names ("Craniamon + Enbarrmon",
  "Titamon + SkullBaluchimon" — Field Guide nos. 428, 442).

## Refresh

Re-pull `digimon.js` on game DLC/patch events; jsuk's patch notes are
the change signal (maintained through 2026-08-30 at research time).
Re-run `npm run build-digimon` — the validation gates (476 / 1088 /
17 DNA / jogress agreement) fail loudly if the data shifts shape.
