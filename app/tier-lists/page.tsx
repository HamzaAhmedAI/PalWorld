import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Tier Lists — Combat & Work",
  description:
    "Browse Palworld 1.0 tier lists: the best combat Pals for raids and bosses, and the best base workers for every job under the Lv 10 work suitability system.",
  keywords: ["palworld tier list", "palworld 1.0 tiers", "best pals palworld"],
  alternates: { canonical: "https://palbreedai.com/tier-lists" },
  openGraph: {
    title: "Palworld 1.0 Tier Lists — PalBreed.AI",
    description: "Combat and work suitability tier lists for Palworld 1.0.",
    url: "https://palbreedai.com/tier-lists",
  },
};

const CARDS = [
  {
    href: "/tier-lists/combat",
    title: "Combat Tier List",
    blurb: "S-, A-, and B-tier Pals for raids, bossing, and battles.",
  },
  {
    href: "/tier-lists/overall",
    title: "Overall Tier List",
    blurb: "The best all-rounder Pals across combat, work, and utility.",
  },
  {
    href: "/tier-lists/mounts",
    title: "Best Mounts Tier List",
    blurb: "Fastest rideable Pals for travel and mobility.",
  },
  {
    href: "/tier-lists/work",
    title: "Work Suitability Tier List",
    blurb: "Best base worker per job under the Lv 10 condense-to-48 system.",
  },
];

export default function TierListsIndex() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Tiers</span>
        </nav>

        <h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Palworld 1.0 Tier Lists
        </h1>

        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
