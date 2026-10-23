// Programmatic pair pages — selection + shared computations.
//
// The full 1.0 breeding table has 44,551 unordered pairs. Publishing all
// of them at once would bury the site in thin pages, so pair pages ship
// in curated batches (multi-game pivot plan, Week 2). Batch 1 selection:
//
//   1. Every official unique combo (incl. the gender-dependent pair) —
//      these override the formula and are the highest-intent searches.
//   2. For every high-value child (unique-combo result or rarity >= 9),
//      its 6 easiest producing pairs (lowest combined parent rarity,
//      wild-caught parents first).
//
// Every pair page carries the formula working, alternatives and
// sub-recipes, so no page is a bare answer. Later batches widen the
// child set; the selection lives here, in one place, on purpose.

import { PALS, UNIQUE_COMBOS, type Pal } from "@/data/pals";
import { GENDER_DEPENDENT_COMBOS } from "@/data/specials";
import { TRUE_BREED_GROUP } from "@/data/overrides";
import { getResultingPal } from "@/lib/breeding";
import { slugify } from "@/lib/palSlug";

export type PairKind = "unique" | "gender" | "formula";

export interface PairPageEntry {
  a: Pal;
  b: Pal;
  child: Pal;
  kind: PairKind;
  slug: string;
}

const byName = new Map(PALS.map((p) => [p.name, p]));
const pairKey = (a: string, b: string) => [a, b].sort().join("+");

export function pairSlug(a: string, b: string): string {
  const [x, y] = [slugify(a), slugify(b)].sort();
  return `${x}+${y}`;
}

/** Wild-caught / trivially available parents make a pair "easy". */
export function isBasePal(pal: Pal): boolean {
  return pal.rarity <= 4 || TRUE_BREED_GROUP.includes(pal.name);
}

let producersCache: Map<string, Array<{ a: Pal; b: Pal }>> | null = null;

/** All producing pairs per child, easiest first. Computed once. */
export function producersByChild(): Map<string, Array<{ a: Pal; b: Pal }>> {
  if (producersCache) return producersCache;
  const map = new Map<string, Array<{ a: Pal; b: Pal }>>();
  for (let i = 0; i < PALS.length; i++) {
    for (let j = i; j < PALS.length; j++) {
      const a = PALS[i];
      const b = PALS[j];
      const child = getResultingPal(a, b);
      const list = map.get(child.name) ?? [];
      list.push({ a, b });
      map.set(child.name, list);
    }
  }
  for (const list of map.values()) {
    list.sort(
      (x, y) =>
        Number(isBasePal(y.a)) + Number(isBasePal(y.b)) -
          (Number(isBasePal(x.a)) + Number(isBasePal(x.b))) ||
        x.a.rarity + x.b.rarity - (y.a.rarity + y.b.rarity),
    );
  }
  producersCache = map;
  return map;
}

function buildManifest(): PairPageEntry[] {
  const chosen = new Map<string, PairPageEntry>();
  const add = (a: Pal, b: Pal, kind: PairKind) => {
    const key = pairKey(a.name, b.name);
    if (!chosen.has(key)) {
      chosen.set(key, {
        a,
        b,
        child: getResultingPal(a, b),
        kind,
        slug: pairSlug(a.name, b.name),
      });
    }
  };

  // 1. Unique combos + the gender-dependent pair.
  for (const key of Object.keys(UNIQUE_COMBOS)) {
    const [a, b] = key.split("+");
    const pa = byName.get(a);
    const pb = byName.get(b);
    if (pa && pb) add(pa, pb, "unique");
  }
  for (const g of GENDER_DEPENDENT_COMBOS) {
    const pa = byName.get(g.parents[0]);
    const pb = byName.get(g.parents[1]);
    if (pa && pb) add(pa, pb, "gender");
  }

  // 2. Easiest pairs for high-value children.
  const uniqueChildren = new Set(Object.values(UNIQUE_COMBOS));
  const producers = producersByChild();
  for (const pal of PALS) {
    if (!uniqueChildren.has(pal.name) && pal.rarity < 9) continue;
    const pairs = producers.get(pal.name) ?? [];
    let added = 0;
    for (const { a, b } of pairs) {
      if (added >= 6) break;
      const before = chosen.size;
      add(a, b, "formula");
      if (chosen.size > before) added++;
    }
  }

  return [...chosen.values()].sort((x, y) => x.slug.localeCompare(y.slug));
}

let manifestCache: PairPageEntry[] | null = null;
export function pairPageManifest(): PairPageEntry[] {
  if (!manifestCache) manifestCache = buildManifest();
  return manifestCache;
}

export function getPairPage(slug: string): PairPageEntry | undefined {
  return pairPageManifest().find((e) => e.slug === slug);
}
