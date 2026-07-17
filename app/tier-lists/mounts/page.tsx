import type { Metadata } from "next";
import Link from "next/link";
import { TierList, type Tier } from "@/components/TierList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Best Mounts Tier List — Fastest Rideable Pals",
  description:
    "The best mounts in Palworld 1.0 ranked by speed and utility: Jetragon, Frostallion, Paladius, and the other top rideable Pals, with links to their breeding guides.",
  keywords: [
    "best mounts palworld",
    "palworld mount tier list",
    "fastest mount palworld",
    "jetragon palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/tier-lists/mounts" },
  openGraph: {
    title: "Palworld 1.0 Best Mounts Tier List — PalBreed.AI",
    description: "S-, A-, and B-tier rideable Pals for travel and mobility.",
    url: "https://palbreedai.com/tier-lists/mounts",
  },
};

const MOUNT_TIERS: Tier[] = [
  {
    label: "S-Tier",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    blurb: "Fastest, with glide/dash utility",
    pals: ["Jetragon", "Frostallion", "Frostallion Noct", "Paladius", "Shadowbeak"],
  },
  {
    label: "A-Tier",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    blurb: "Strong travel and combat mounts",
    pals: ["Faleris", "Faleris Aqua", "Suzaku", "Suzaku Aqua", "Beakon", "Grizzbolt", "Helzephyr"],
  },
  {
    label: "B-Tier",
    accent: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    blurb: "Solid early/mid-game mounts",
    pals: ["Rideable Pyrin", "Quivern", "Vanwyrm", "Cawgnito", "Direhowl", "Melpaca"],
  },
];

export default function MountsTierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tier-lists" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tiers</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Mounts</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Best Mounts Tier List
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            The fastest and most useful rideable Pals in the 1.0 update. Jetragon is the raw speed
            king, while Frostallion and Paladius add elemental coverage and survive combat on the
            move. Click any mount for its full breeding and location breakdown.
          </p>
        </header>

        <TierList tiers={MOUNT_TIERS} />

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Picking a mount
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><strong>Raw travel:</strong> Jetragon — highest flat speed and a long glide.</li>
            <li><strong>Element coverage:</strong> Frostallion (Ice) and Paladius (Neutral/Dark) handle different raid biomes.</li>
            <li><strong>Budget:</strong> Quivern and Vanwyrm are easy to catch and still fast enough for most runs.</li>
            <li>Glide and dash saddles are unlocked via Ancient Technology — prioritize them early.</li>
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
