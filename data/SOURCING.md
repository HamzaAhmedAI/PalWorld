# Palworld Data Sourcing (`SOURCING.md`)

This file documents the canonical data source for `data/pals.ts` and the
pipeline that regenerates it (`scripts/fetch-1-0-data.mjs` →
`scripts/build-pals.mjs`). It exists so the Pal table is **never
hand-maintained** after a patch.

## Canonical source (locked 2026-10-22, data fix)

The dataset committed under `data/source/` is **palworldcalc-20260730-298**
(game version 1.0, Steam build 24575149), published by palworldcalc.com at
`https://palworldcalc.com/data/` and pinned by SHA-256 in
`scripts/fetch-1-0-data.mjs`:

| File | Contents | SHA-256 (prefix) |
| --- | --- | --- |
| `pals-1.0.json` | 298 Pals (287 Paldeck + 11 Terraria crossover): name, Paldeck no., elements, rarity, CombiRank, base stats, work suitability, description, new-in-1.0 flag | `a8556fe7…` |
| `combos-1.0.json` | Full 298×298 breeding matrix (child index per parent pair) | `aab14cb7…` |
| `special-1.0.json` | 136 unique combos decoded from the official `DT_PalCombiUnique` DataTable, incl. the gender-locked Katress × Wixen pair | `027724c0…` |

Upstream provenance (per palworldcalc's data page): per-Pal metadata and the
matrix come from the 1.0 game files via `oMaN-Rod/palworld-save-pal` and
`beckerfelipee/PalworldBreedingCalculator` (AllCombos.csv); the matrix was
cross-validated pair-by-pair against the independent `palcalc-tools`
breeding engine — all 44,551 unordered pairs identical.

### Why this source replaced the old one

The previous pipeline built on `mlg404/palworld-paldex-api`, a **pre-1.0**
snapshot of 137 Pals, with the 72 new 1.0 Pals hand-authored in the build
script using **interpolated** breeding ranks. Against the verified 1.0
matrix, that engine reproduced only ~2% of pair outcomes, the roster was
missing 78 Pals that exist in 1.0, and many new-Pal stats were placeholders.
All of that is replaced by the game-file dataset above.

## How the build uses the source

`scripts/build-pals.mjs`:

1. **Roster / ranks / types / rarity / stats / work / description** ←
   `pals-1.0.json` (authoritative). Vocabulary is mapped to this repo's
   (`Normal`→`Neutral`, `Electricity`→`Electric`,
   `MedicineProduction`→`medicine`, `Lumbering`→`deforesting`,
   `GenerateElectricity`→`generating`). Lovander is Dark in the source, so
   the old hand type-override is gone.
2. **Unique combos** ← `special-1.0.json`, emitted to `data/specials.ts`.
   The Katress × Wixen rows are split out into `GENDER_DEPENDENT_COMBOS`:
   the matrix marks this pair `-1` (no fixed outcome — it depends on the
   parents' genders); the engine's primary result is Katress Ignis, and
   Wixen Noct is the other gender-specific child.
3. **`Pal.formulaPool`** ← derived from `combos-1.0.json`: a Pal is in the
   formula pool iff some non-special, mixed-species pair produces it
   (183 Pals). The engine's power rule only ever returns pool Pals.
4. **Enrichment** ← `data/enrichment.json` (repo-only fields the canonical
   dataset lacks): `partnerSkill`, `drops`, `habitats`, `notableLocations`.
   Carried over from the pre-fix `data/pals.ts` for the original roster and
   extended with paldb.cc partner-skill text (via the mikiagent dataset)
   for Pals that had none. Fabricated placeholder fields from the
   hand-authored era (generic partner-skill text, `<pal>_meat` drops) were
   dropped rather than carried over.

## Verification

- `lib/breeding-matrix.test.ts` replays **all 44,551 unordered pairs**
  through `getResultingPal` and asserts equality with `combos-1.0.json`.
  `npm test` and `npm run verify-breeding` both run it. A data refresh that
  breaks the engine fails the test suite, loudly.
- With this dataset the formula engine (same-species → gender pair →
  unique combos → closest-CombiRank in pool, equal-distance ties to the
  higher CombiRank) reproduces the matrix exactly.

## Reproducibility

```bash
npm run fetch-pals   # download + SHA-256 verify the pinned dataset
npm run build-pals   # regenerate data/pals.ts + data/specials.ts
npm run verify-breeding
npm test
```

If `fetch-pals` reports a checksum change, upstream published a new
dataset: review the diff (roster/rank changes) before building, then update
the pinned hashes in `scripts/fetch-1-0-data.mjs` and this file.
