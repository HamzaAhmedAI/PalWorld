import type { Metadata } from "next";
import Link from "next/link";
import { TierList, type Tier } from "@/components/TierList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Overall Tier List — Best Pals Ranked",
  description:
    "The overall best Pals in Palworld 1.0 ranked across combat, work, and utility: the S-tier all-rounders you should breed first, with links to every Pal's breeding and location guide.",
  keywords: [
    "palworld overall tier list",
    "best pals palworld 1.0",
    "palworld 1.0 best pals ranked",
    "strongest pal palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/tier-lists/overall" },
  openGraph: {
    title: "Palworld 1.0 Overall Tier List — PalBreed.AI",
    description: "The best all-rounder Pals in 1.0, ranked.",
    url: "https://palbreedai.com/tier-lists/overall",
  },
};

const OVERALL_TIERS: Tier[] = [
  {
    label: "S-Tier",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    blurb: "Breed these first — top combat + utility",
    pals: ["Jetragon", "Anubis", "Frostallion", "Paladius", "Necromus", "Jormuntide Ignis", "Xenolord", "Bellanoir Libero"],
  },
  {
    label: "A-Tier",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    blurb: "Excellent specialists",
    pals: ["Shadowbeak", "Lyleen Noct", "Grizzbolt", "Orserk", "Blazamut Ryu", "Suzaku", "Faleris", "Astegon"],
  },
  {
    label: "B-Tier",
    accent: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    blurb: "Strong early-game and role picks",
    pals: ["Beakon", "Quivern", "Relaxaurus Lux", "Warsect", "Elphidran", "Lyleen", "Bastigor", "Selyne"],
  },
];

export default function OverallTierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tier-lists" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tiers</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Overall</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Overall Tier List
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            The best all-rounder Pals in 1.0 — the ones that pull their weight in both combat and the
            base. For job-specific rankings see the{" "}
            <Link href="/tier-lists/combat" className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">combat</Link>{" "}
            and{" "}
            <Link href="/guides/best-base-pals" className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">base-worker</Link>{" "}
            lists.
          </p>
        </header>

        <TierList tiers={OVERALL_TIERS} />

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Where to start
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><strong>Anubis</strong> is the best early target — strong attacker and a top handiwork worker.</li>
            <li><strong>Jetragon</strong> is the mobility goal; breed toward it once your base is stable.</li>
            <li>Condense and passive-stack your S-tier picks (see the essence condenser and passives guides).</li>
          </ul>
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
