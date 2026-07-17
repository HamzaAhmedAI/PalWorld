import type { Metadata } from "next";
import Link from "next/link";
import { PALS, type Pal, type WorkKind } from "@/data/pals";
import { getPalSlug } from "@/lib/palSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Best Base Worker Pals in Palworld 1.0 — Work Suitability by Job",
  description:
    "The best base-worker Pals in Palworld 1.0 for every job: kindling, watering, planting, generating, gathering, mining, medicine, transporting, deforesting, cooling, farming, and handiwork. Ranked by work level and ease of capture.",
  keywords: [
    "best base pals palworld",
    "best worker pals palworld 1.0",
    "palworld work suitability best",
    "best gathering pal palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/best-base-pals" },
  openGraph: {
    title: "Best Base Worker Pals in Palworld 1.0 — PalBreed.AI",
    description: "Top worker Pal for every base job under the Lv 10 work system.",
    url: "https://palbreedai.com/guides/best-base-pals",
  },
};

const JOBS: { kind: WorkKind; label: string }[] = [
  { kind: "kindling", label: "Kindling" },
  { kind: "watering", label: "Watering" },
  { kind: "planting", label: "Planting" },
  { kind: "generating", label: "Generating" },
  { kind: "gathering", label: "Gathering" },
  { kind: "mining", label: "Mining" },
  { kind: "medicine", label: "Medicine" },
  { kind: "transporting", label: "Transporting" },
  { kind: "deforesting", label: "Deforesting" },
  { kind: "cooling", label: "Cooling" },
  { kind: "farming", label: "Farming" },
  { kind: "handiwork", label: "Handiwork" },
];

function topForJob(kind: WorkKind, limit = 5): Pal[] {
  return PALS.filter((p) => p.workSuitability?.[kind])
    .sort((a, b) => {
      const la = a.workSuitability![kind]!;
      const lb = b.workSuitability![kind]!;
      if (lb !== la) return lb - la;
      return a.rarity - b.rarity;
    })
    .slice(0, limit);
}

export default function BestBasePalsPage() {
  const ranked = JOBS.map((j) => ({ ...j, pals: topForJob(j.kind) })).filter(
    (r) => r.pals.length > 0,
  );

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Best Base Pals</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Best Base Worker Pals in Palworld 1.0
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            The top Pals for every base job, ranked by work-suitability level and then by how easy
            they are to catch. Under the 1.0 Lv 10 system you can condense a Pal up to 4 times to
            nearly double its work level.
          </p>
        </header>

        <div className="space-y-8">
          {ranked.map((job) => (
            <section key={job.kind}>
              <h2 className="mb-3 text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Best {job.label} Pals
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.pals.map((pal) => (
                  <Link
                    key={pal.id}
                    href={`/pals/${getPalSlug(pal)}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 transition-all hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {pal.name}
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-black text-indigo-600 dark:text-indigo-300">
                      Lv {pal.workSuitability![job.kind]}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Condensing for Max Output
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A Pal condensed to the cap (4 times, ~Lv 48 in worker XP terms) gains a large work-level
            bonus. Pair that with worker passives (Remarkable Craftsmanship, Artisan, Work Slave,
            Serious) for the fastest possible base. See the{" "}
            <Link href="/guides/combat-passives" className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">
              combat &amp; worker passives guide
            </Link>{" "}
            for the full passive build.
          </p>
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
