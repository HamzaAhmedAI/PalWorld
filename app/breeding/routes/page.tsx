import type { Metadata } from "next";
import Link from "next/link";
import { BreedingPlanner } from "@/components/BreedingPlanner";
import { PalboxProvider } from "@/components/PalboxProvider";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Breeding Routes — Passive & Trait Transfer Planner",
  description:
    "Plan breeding routes to move passives and traits across your Pal collection in Palworld 1.0. Find the shortest chain of parents that breeds any target Pal.",
  keywords: [
    "palworld breeding routes",
    "palworld passive transfer",
    "palworld trait breeding",
    "palworld breeding calculator",
  ],
  alternates: { canonical: "https://palbreedai.com/breeding/routes" },
  openGraph: {
    title: "Palworld 1.0 Breeding Routes — PalBreed.AI",
    description: "Plan passive & trait transfer breeding chains in Palworld 1.0.",
    url: "https://palbreedai.com/breeding/routes",
  },
};

export default function BreedingRoutesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Breeding Routes</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Breeding Routes
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Breeding is the fastest way to stack passives and traits onto a target Pal. Pick the Pal
            you want, and the planner works backward through the 1.0 breeding ladder to the base
            Pals you must catch or breed first. Tick Pals you already own to filter routes, and
            switch to the tree view to see the full chain.
          </p>
        </header>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            How passive transfer works in 1.0
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Each child inherits passives from its two parents — the more steps in the chain, the more chances to bundle the passives you want.</li>
            <li>Cake type changes the odds: Deluxe Vegetable Cake raises mutation chance (~3%); Special Cake can inherit multiple passives at once.</li>
            <li>Longer routes let you consolidate passives from several bloodlines into one end Pal — but each extra step is more breeding time.</li>
          </ul>
        </section>

        <PalboxProvider>
          <BreedingPlanner />
        </PalboxProvider>
      </div>
    </main>
  );
}
