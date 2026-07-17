import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PALS, type Pal, type WorkKind } from "@/data/pals";
import { getPalSlug, slugify } from "@/lib/palSlug";
import { SafeImage } from "@/components/SafeImage";

export const revalidate = 86400;

interface Pair {
  a: string;
  b: string;
}

// Curated high-traffic "vs" matchups (mounts + combat rivals).
const PAIRS: Pair[] = [
  { a: "Jetragon", b: "Necromus" },
  { a: "Jormuntide Ignis", b: "Blazamut" },
  { a: "Frostallion", b: "Paladius" },
  { a: "Anubis", b: "Shadowbeak" },
  { a: "Jetragon", b: "Frostallion" },
  { a: "Blazamut Ryu", b: "Xenolord" },
  { a: "Necromus", b: "Paladius" },
  { a: "Grizzbolt", b: "Orserk" },
  { a: "Suzaku", b: "Faleris" },
  { a: "Shadowbeak", b: "Lyleen Noct" },
  { a: "Xenolord", b: "Bellanoir Libero" },
  { a: "Bastigor", b: "Astegon" },
];

const pairSlug = (p: Pair) => `${slugify(p.a)}-vs-${slugify(p.b)}`;

const PAIR_BY_SLUG = new Map(PAIRS.map((p) => [pairSlug(p), p]));
const ALL_SLUGS = PAIRS.map(pairSlug);

const WORK_LABELS: Record<WorkKind, string> = {
  kindling: "Kindling",
  watering: "Watering",
  planting: "Planting",
  generating: "Generating",
  gathering: "Gathering",
  mining: "Mining",
  medicine: "Medicine",
  transporting: "Transporting",
  deforesting: "Deforesting",
  cooling: "Cooling",
  farming: "Farming",
  handiwork: "Handiwork",
};

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = PAIR_BY_SLUG.get(slug);
  if (!pair) return { title: "Pal comparison — PalBreed.AI" };
  const title = `${pair.a} vs ${pair.b} — Palworld 1.0 Comparison`;
  const url = `https://palbreedai.com/compare/${slug}`;
  return {
    title,
    description: `Compare ${pair.a} and ${pair.b} in Palworld 1.0: typing, base stats, breeding power, and work suitability side by side.`,
    keywords: [`${pair.a} vs ${pair.b}`, `${pair.a} palworld`, `${pair.b} palworld`],
    alternates: { canonical: url },
    openGraph: { title: `${title} — PalBreed.AI`, description: "Side-by-side Palworld 1.0 stats.", url },
  };
}

function StatRow({ label, a, b }: { label: string; a: number | undefined; b: number | undefined }) {
  const av = a ?? 0;
  const bv = b ?? 0;
  return (
    <tr className="border-b border-slate-100 last:border-0 dark:border-white/5">
      <td className={`px-4 py-3 text-right font-bold ${av >= bv ? "text-indigo-600 dark:text-indigo-300" : "text-slate-400"}`}>
        {a ?? "—"}
      </td>
      <td className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </td>
      <td className={`px-4 py-3 text-left font-bold ${bv >= av ? "text-indigo-600 dark:text-indigo-300" : "text-slate-400"}`}>
        {b ?? "—"}
      </td>
    </tr>
  );
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = PAIR_BY_SLUG.get(slug);
  if (!pair) notFound();

  const a = PALS.find((p) => p.name === pair.a);
  const b = PALS.find((p) => p.name === pair.b);
  if (!a || !b) notFound();

  const workA = Object.entries(a.workSuitability ?? {}) as [WorkKind, number][];
  const workB = Object.entries(b.workSuitability ?? {}) as [WorkKind, number][];

  const atkWin = (a.attack ?? 0) >= (b.attack ?? 0) ? a.name : b.name;
  const defWin = (a.defense ?? 0) >= (b.defense ?? 0) ? a.name : b.name;
  const bpWin = (a.breedingPower ?? 0) >= (b.breedingPower ?? 0) ? a.name : b.name;

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/pals" className="hover:text-indigo-600 dark:hover:text-indigo-400">Paldex</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">{a.name} vs {b.name}</span>
        </nav>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {a.name} <span className="text-indigo-500/40">vs</span> {b.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">Palworld 1.0 — side-by-side comparison</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {[a, b].map((pal) => (
            <div key={pal.id} className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-white/10 dark:bg-white/5">
              <SafeImage src={pal.image} alt={pal.name} width={120} height={120} className="mx-auto rounded-2xl bg-slate-100 dark:bg-black/40" />
              <h2 className="mt-3 text-lg font-black text-slate-900 dark:text-white">
                <Link href={`/pals/${getPalSlug(pal)}`} className="hover:underline">{pal.name}</Link>
              </h2>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-300">{pal.type1}</span>
                {pal.type2 && (
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-300">{pal.type2}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-right font-black text-slate-700 dark:text-slate-200">{a.name}</th>
                <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-slate-500">Stat</th>
                <th className="px-4 py-3 text-left font-black text-slate-700 dark:text-slate-200">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              <StatRow label="HP" a={a.hp} b={b.hp} />
              <StatRow label="Attack" a={a.attack} b={b.attack} />
              <StatRow label="Defense" a={a.defense} b={b.defense} />
              <StatRow label="Breeding Power" a={a.breedingPower} b={b.breedingPower} />
            </tbody>
          </table>
        </div>

        <section className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-sm">
          <h2 className="mb-2 text-lg font-black tracking-tight text-slate-900 dark:text-white">Quick verdict</h2>
          <ul className="space-y-1 text-slate-600 dark:text-slate-400">
            <li><strong>{atkWin}</strong> wins on Attack.</li>
            <li><strong>{defWin}</strong> wins on Defense.</li>
            <li><strong>{bpWin}</strong> is easier to breed (lower/higher breeding power floor).</li>
          </ul>
        </section>

        {workA.length > 0 || workB.length > 0 ? (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">Work Suitability</h2>
            <div className="grid grid-cols-2 gap-4">
              {[workA, workB].map((list, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                  <h3 className="mb-2 text-sm font-black text-slate-900 dark:text-white">{i === 0 ? a.name : b.name}</h3>
                  {list.length > 0 ? (
                    <ul className="space-y-1 text-xs">
                      {list.map(([kind, lvl]) => (
                        <li key={kind} className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">{WORK_LABELS[kind]}</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-300">Lv {lvl}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">No work suitability.</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href={`/pals/${getPalSlug(a)}`} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700">
            {a.name} full guide →
          </Link>
          <Link href={`/pals/${getPalSlug(b)}`} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700">
            {b.name} full guide →
          </Link>
        </div>
      </div>
    </main>
  );
}
