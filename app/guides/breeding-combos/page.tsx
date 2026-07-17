import type { Metadata } from "next";
import Link from "next/link";
import { PALS, type Pal } from "@/data/pals";
import { getResultMap } from "@/lib/breeding";
import { getPalSlug } from "@/lib/palSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "All Palworld 1.0 Breeding Combinations — Complete Combo List",
  description:
    "Every breeding combination in Palworld 1.0: all 210 Pals with their easiest parent pair, breeding power, and typing. The complete Palworld breeding combos reference, sorted A–Z.",
  keywords: [
    "palworld breeding combos",
    "all palworld breeding combinations",
    "palworld 1.0 breeding list",
    "palworld breeding combinations chart",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/breeding-combos" },
  openGraph: {
    title: "All Palworld 1.0 Breeding Combinations — PalBreed.AI",
    description: "The complete A–Z list of every Palworld 1.0 breeding combo.",
    url: "https://palbreedai.com/guides/breeding-combos",
  },
};

function easiestPair(pairs: Array<[Pal, Pal]>): [Pal, Pal] | null {
  if (!pairs.length) return null;
  return [...pairs].sort((x, y) => {
    const dx = Math.max(x[0].rarity, x[1].rarity);
    const dy = Math.max(y[0].rarity, y[1].rarity);
    if (dx !== dy) return dx - dy;
    return (
      x[0].breedingPower + x[1].breedingPower -
      (y[0].breedingPower + y[1].breedingPower)
    );
  })[0];
}

export default function BreedingCombosPage() {
  const map = getResultMap();
  const rows = PALS.map((pal) => {
    const pairs = map.get(pal.name) ?? [];
    const pair = easiestPair(pairs);
    return { pal, pair, count: pairs.length };
  })
    .filter((r) => r.pair)
    .sort((a, b) => a.pal.name.localeCompare(b.pal.name));

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Breeding Combos</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            All Palworld 1.0 Breeding Combinations
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Every Pal in the 1.0 Paldeck and the easiest parent pair that produces it. Combos are
            sorted by how simple the parents are to catch. Open any Pal for its full stat, location,
            and breeding breakdown.
          </p>
        </header>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">How breeding results are decided:</strong>{" "}
          two parents breed into the Pal whose <em>breeding power</em> is closest to the average of
          theirs (the &ldquo;power rule&rdquo;). Hand-verified legendary and unique combos override
          the rule. Same species always breeds the same species.
        </section>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
              <tr>
                <th className="px-4 py-3">Result Pal</th>
                <th className="px-4 py-3">Easiest Parent Pair</th>
                <th className="px-4 py-3 text-right">Breeding Power</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ pal, pair }) => (
                <tr
                  key={pal.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/pals/${getPalSlug(pal)}`}
                      className="font-bold text-indigo-600 hover:underline dark:text-indigo-300"
                    >
                      {pal.name}
                    </Link>
                    <span className="ml-2 text-xs text-slate-400">
                      {pal.type1}
                      {pal.type2 ? `/${pal.type2}` : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    <Link href={`/pals/${getPalSlug(pair![0])}`} className="hover:underline">
                      {pair![0].name}
                    </Link>
                    <span className="mx-1 text-indigo-500/50 font-black">+</span>
                    <Link href={`/pals/${getPalSlug(pair![1])}`} className="hover:underline">
                      {pair![1].name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-200">
                    {pal.breedingPower}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Showing the single easiest combo per Pal. Each individual Pal page lists every valid parent
          pair it can come from.
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/#calculator"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700"
          >
            Plan a Breeding Path →
          </Link>
        </div>
      </div>
    </main>
  );
}
