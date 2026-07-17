import type { Metadata } from "next";
import Link from "next/link";
import { PALS } from "@/data/pals";
import { getPalSlug } from "@/lib/palSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Work Suitability Tier List — Best Base Workers",
  description:
    "The best Pals for each base job in Palworld 1.0. Work suitability now caps at Lv 10 (condense 4 → Lv 10, or 48 to max rank). Per-job recommendations with links.",
  keywords: [
    "palworld 1.0 work suitability",
    "best base worker pals palworld",
    "palworld work tier list",
    "palworld condense to 48",
  ],
  alternates: { canonical: "https://palbreedai.com/tier-lists/work" },
  openGraph: {
    title: "Palworld 1.0 Work Suitability Tier List — PalBreed.AI",
    description: "Best Pals for every base job in Palworld 1.0 (Lv 10 system).",
    url: "https://palbreedai.com/tier-lists/work",
  },
};

const slugByName = new Map(PALS.map((p) => [p.name.toLowerCase(), getPalSlug(p)]));

function PalLink({ name }: { name: string }) {
  const slug = slugByName.get(name.toLowerCase());
  if (slug) {
    return (
      <Link
        href={`/pals/${slug}`}
        className="font-bold text-indigo-600 hover:underline dark:text-indigo-300"
      >
        {name}
      </Link>
    );
  }
  return <span className="font-bold text-slate-400">{name}</span>;
}

const JOBS: { job: string; pals: string[]; note?: string }[] = [
  { job: "Kindling", pals: ["Renjishi", "Jormuntide Ignis"] },
  { job: "Watering", pals: ["Shaolong", "Jormuntide"] },
  { job: "Planting", pals: ["Lyleen"] },
  { job: "Generating Electricity", pals: ["Orserk"] },
  { job: "Handiwork", pals: ["Solenne", "Selyne"] },
  { job: "Gathering", pals: ["Frostallion Noct"] },
  { job: "Lumbering", pals: ["Celesdir"] },
  { job: "Mining", pals: ["Aegidron", "Astegon"] },
  { job: "Medicine", pals: ["Bellanoir"] },
  { job: "Cooling", pals: ["Bastigor", "Frostallion"] },
  { job: "Transporting", pals: ["Eidrolon"], note: "No Pal reaches Lv 8 naturally — condense to cap." },
  { job: "Farming (Ranch)", pals: ["Vixy"] },
];

export default function WorkTierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tier-lists" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tiers</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Work</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Work Suitability Tier List
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Work suitability now caps at <strong>Lv 10</strong>. A single Pal condenses 4 copies to
            reach Lv 10, or 48 copies to hit max rank (down from 116 in 0.5). Below are the best
            natural workers per job — condense them to Lv 10 for a maxed base.
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
              <tr>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Best Natural Worker(s)</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((row) => (
                <tr key={row.job} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                  <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{row.job}</td>
                  <td className="px-4 py-3">
                    <span className="flex flex-wrap gap-x-2 gap-y-1">
                      {row.pals.map((p) => (
                        <PalLink key={p} name={p} />
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{row.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
