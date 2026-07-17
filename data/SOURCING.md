# Palworld Data Sourcing (`SOURCING.md`)

This file documents the canonical data source for `data/pals.ts` and the merge
order used by the regeneration pipeline (`scripts/fetch-1-0-data.mjs` →
`scripts/build-pals.mjs`). It exists so the 209-Pal table is **never hand-maintained**
after a patch.

## Locked canonical source (P0.1)

Primary: **`mlg404/palworld-paldex-api`** — already used by the site for Pal deck
images (`raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/paldeck/<key>.png`).
It exposes, per Pal:

- `name`, `key` (paldeck image key, e.g. `001`, `012B`)
- `types[]` (`neutral`, `grass`, `fire`, `water`, `electric`, `ice`, `ground`, `dark`, `dragon`)
- `breeding.rank` — the canonical **breeding power** (scale 10–1500, unique per Pal)
- `rarity` (1–20)
- `suitability[]` — per-job work levels (`handiwork`, `transporting`, `farming`, `gathering`,
  `mining`, `planting`, `lumbering`, `medicine_production`, `kindling`, `watering`,
  `generating_electricity`, `cooling`)
- `drops[]`, `aura` (partner skill name + description), `description`, `stats` (hp/attack/defense/...)
- `genus`, `price`, `size`, `maps`

Pinned endpoint (verify before each re-run):
`https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json`
`https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/breeding.json`

## Merge order (P0.1 #3)

1. **breeding power / types / key / rarity** ← primary (paldex API). These are authoritative.
2. **work suitability, drops, partner skill, stats, description** ← primary (paldex API).
3. **habitats / regions** ← `data/pals.ts` existing `habitats` fields + §1.3 / Phase 8 region map.
4. **1.0-specific corrections** ← `data/overrides.ts` (see below). This layer always wins.

## 1.0 correction layer (`data/overrides.ts`)

The paldex API is **pre-1.0** (137 Pals). The 72 new 1.0 Pals and the 1.0 breeding
reshuffle are applied as overrides so they survive regeneration:

- `TYPE_OVERRIDES` — e.g. `Lovander: Neutral → Dark` (1.0 type change).
- `UNIQUE_COMBOS` — hand-verified 1.0 combos, e.g. `Penking+Bushi → Sibelyx`.
  Stale pre-1.0 overrides (`Penking+Bushi → Anubis`, `Relaxaurus+Sparkit → Orserk`)
  were removed (see spec D1/D2).
- `TRUE_BREED_GROUP` — tower bosses / legendaries that only breed `same + same`
  (Orserk, Faleris, Shadowbeak, Grizzbolt, Lyleen, Frostallion, Jetragon, Paladius,
  Necromus, Neptilius, Selyne, Bastigor, Bellanoir Libero, Blazamut Ryu, Mimog, Xenolord line, Chikipi).
- `NEW_PALS_1_0` — the 72 new 1.0 Pals (47 species + 25 variants) authored from the
  verified name list in spec §1.3. **Verification status:** names, element re-types, and
  roles are researched; `breedingPower` ranks for new Pals are interpolated (spread across
  the canonical 10–1500 ladder, variants near their base) because the API does not yet
  expose 1.0 ranks. Known combos are guaranteed correct via `UNIQUE_COMBOS` + `TRUE_BREED_GROUP`
  regardless of interpolated ranks. When a 1.0-accurate `pals.json` becomes available,
  re-run `npm run fetch-pals && npm run build-pals` to replace interpolated values.

## Reproducibility (P0.1 #4)

Re-run order (idempotent):

```bash
npm run fetch-pals   # download + normalize API -> scripts/_cache/normalized-137.json
npm run build-pals   # merge 137 + NEW_PALS_1_0 + overrides -> data/pals.ts
npm run verify-breeding  # assert Penking+Bushi===Sibelyx, Orserk true-breed, etc.
```

`scripts/_cache/` is local-only and should not be committed (it is the intermediate
"raw 1-0" artifact from spec P0.2 #4).
