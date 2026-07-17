import type { Metadata } from "next";
import Link from "next/link";
import { PALS } from "@/data/pals";
import { getPalSlug } from "@/lib/palSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Work Suitability Lv 10 Guide — Condense to 48",
  description:
    "How work suitability works in Palworld 1.0: the cap raised from Lv 4 to Lv 10, rebalanced values, condense-to-48, and the best Lv 10 worker for every base job.",
  keywords: [
    "palworld 1.0 work suitability",
    "palworld condense to 48",
    "palworld work level 10",
    "best base worker pals",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/work-suitability" },
  openGraph: {
    title: "Palworld 1.0 Work Suitability Lv 10 Guide — PalBreed.AI",
    description: "Cap raised to Lv 10, condense-to-48, best workers per job.",
    url: "https://palbreedai.com/guides/work-suitability",
  },
};

const slugByName = new Map(PALS.map((p) => [p.name.toLowerCase(), getPalSlug(p)]));
function PalLink({ name }: { name: string }) {
  const slug = slugByName.get(name.toLowerCase());
  if (slug)
    return (
      <Link href={`/pals/${slug}`} className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">
        {name}
      </Link>
    );
  return <span className="font-bold text-slate-400">{name}</span>;
}

const JOBS = [
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
  { job: "Transporting", pals: ["Eidrolon"] },
  { job: "Farming (Ranch)", pals: ["Vixy"] },
];

export default function WorkSuitabilityGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Work Suitability</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Work Suitability Lv 10 Guide
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            In 1.0 the work suitability cap jumped from <strong>Lv 4</strong> to <strong>Lv 10</strong>,
            with rebalanced per-level values. Maxing a base worker is now a condense game.
          </p>
        </header>

        <section className="mb-10 space-y-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-white">Condense to Lv 10</h2>
            <p>
              No wild Pal spawns at Lv 10. The fastest path: catch Pals that reach <strong>Lv 8</strong>{" "}
              naturally, then condense <strong>4 copies</strong> into one to hit Lv 10. Condensing to
              max rank now takes <strong>48 Pals</strong> (down from 116 in 0.5).
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-white">Best Lv 10 pick per job</h2>
            <p className="mb-3">Condense these natural workers to Lv 10 for a maxed base:</p>
            <ul className="space-y-1">
              {JOBS.map((row) => (
                <li key={row.job} className="flex gap-2">
                  <span className="w-44 shrink-0 font-bold text-slate-700 dark:text-slate-200">{row.job}</span>
                  <span className="flex flex-wrap gap-x-2">
                    {row.pals.map((p) => (
                      <PalLink key={p} name={p} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Transporting has no natural Lv 8 Pal — condense whatever you use to the cap.
            </p>
          </div>
        </section>

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
