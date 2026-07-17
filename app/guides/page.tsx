import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Guides — Mutation, Work, Awakening & Passives",
  description:
    "Palworld 1.0 endgame guides: mutation breeding & cakes, Lv 10 work suitability, World Tree awakening, and the best combat & worker passive builds.",
  keywords: ["palworld 1.0 guides", "palworld mutation guide", "palworld work suitability guide"],
  alternates: { canonical: "https://palbreedai.com/guides" },
  openGraph: {
    title: "Palworld 1.0 Guides — PalBreed.AI",
    description: "Mutation, work suitability, awakening, and passive builds for 1.0.",
    url: "https://palbreedai.com/guides",
  },
};

const GUIDES = [
  {
    href: "/guides/mutation",
    title: "Mutation Breeding",
    blurb: "Cakes, recipes, and the rainbow-passive reference table.",
  },
  {
    href: "/guides/work-suitability",
    title: "Work Suitability Lv 10",
    blurb: "Cap raised to 10, condense-to-48, best worker per job.",
  },
  {
    href: "/guides/awakening",
    title: "Awakening",
    blurb: "Radiant Gems, stat boosts, and World Tree passives.",
  },
  {
    href: "/guides/combat-passives",
    title: "Combat & Worker Passives",
    blurb: "S-Tier combat build and S-Tier base-worker build.",
  },
  {
    href: "/guides/best-passive-skills",
    title: "Best Passive Skills",
    blurb: "Every combat & worker passive ranked S/A/B.",
  },
  {
    href: "/guides/cake-recipe",
    title: "Cake Recipes",
    blurb: "All 5 breeding cakes, ingredients, and effects.",
  },
  {
    href: "/guides/essence-condenser",
    title: "Essence Condenser",
    blurb: "Condense Pals, boost stats, pick the right targets.",
  },
  {
    href: "/guides/best-base-pals",
    title: "Best Base Pals",
    blurb: "Top worker Pal for every job under Lv 10.",
  },
  {
    href: "/guides/breeding-combos",
    title: "All Breeding Combos",
    blurb: "Every 1.0 breeding combination, A–Z, with easiest pair.",
  },
];

export default function GuidesIndex() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Guides</span>
        </nav>

        <h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Palworld 1.0 Guides
        </h1>

        <div className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{g.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{g.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
