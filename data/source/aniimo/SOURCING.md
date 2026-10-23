# Aniimo Data Sourcing (`data/source/aniimo/`)

Pipeline: `scripts/build-aniimo.mjs` → `data/aniimo.ts` → `lib/engine/packs/aniimo.ts`.
Researched 2026-10-23 (full report: `~/workspace/palbreedai/aniimo-research.md`).
No source publishes a license; only factual data (names, numbers, conditions)
is used — never source text or artwork.

## Sources

| File | Source | Role |
| --- | --- | --- |
| `wiki-snapshot.json` | `wanghuan072/aniimo` (GitHub) — normalized snapshot of the official Aniimo wiki, synced 2026-09-02 (pre-1.1) | Canonical roster (94 entries) + evolution trees (edges) |
| `evolutions-conditions.json` | Parsed from aniimotools.dev `/evolutions/` (fan-curated) on 2026-10-23 | Canonical per-step evolution conditions (29 lines, 53 steps) |
| `species-forms.json` | `joebywan/aniimo-homeland-planner` (GitHub) — auto-regenerated weekly from datamined aniimo.gg | Forms/dex metadata; not yet consumed by the pack |

Cross-checks: aniimo.gg and aniidex.com (both datamined from game files)
agree with the conditions source on levels/stones/items everywhere checked,
and caught one deed it omits (below).

## Model

88 species by the research verdict (the "200+" launch figure counts forms);
the wiki snapshot carries 94 unique entries. Stages: 1 Lumin, 2 Gamma,
3 Nova, 4 Legendary. Lines can skip Gamma and branch at any stage. Every
step is: unlock condition(s) + level gate (12–48) + material cost. There
are **no weather-gated evolutions**, and **Twining is not a pairing
system** — it is a single-creature sync mechanic, so no Twine matrix exists.

## Conflict resolutions (also in scripts/build-aniimo.mjs)

- Wiki snapshot is pre-1.1: three unambiguous steps it misses are added
  from the conditions source, marked `source: "tools"` — Hummin → Hexxin,
  Jawling → Helmwhelp, Squarrel → Squashel. Hexxin, Squarrel and Squashel
  exist only in the conditions source and are added as creatures.
- Hummin's route to Tuckin differs between sources (direct in the wiki
  tree; via Hexxin in the conditions source). Both edges are kept; the
  planner shows both routes.
- Six evolved forms have no published conditions anywhere found — Coraliz,
  Gachapus, Glameep, Malevsera, Wavwal, Witchin. Their edges are emitted
  with `conditionsVerified: false` and must be labelled as such in the UI.
- Cross-check correction: Flameruff → Scorchhowl additionally requires the
  deed "Defeat the Alpha Scorchhowl" (aniimo.gg + aniidex).
- Wiki snapshot name typo "Budclaw." is normalised to Budclaw.
