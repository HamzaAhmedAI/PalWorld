import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "What's Changed in Palworld 1.0 Breeding — Old Recipes Are Dead",
  description:
    "Palworld 1.0 rewrote the breeding table: ~98% of pairs produce a different child, Penking + Bushi no longer makes Anubis, 72 new Pals joined, and mutation + cakes changed the meta. Everything that changed, with the new rules explained.",
  keywords: [
    "palworld 1.0 breeding changes",
    "palworld breeding changed 1.0",
    "penking bushi sibelyx",
    "palworld 1.0 breeding calculator",
    "palworld combirank",
  ],
  alternates: {
    canonical: "https://palbreedai.com/guides/whats-changed-1-0",
  },
  openGraph: {
    title: "What's Changed in Palworld 1.0 Breeding — PalBreed.AI",
    description:
      "The 1.0 breeding table was rewritten. Old recipes, new ranks, mutation, cakes, and the pairs that broke.",
    url: "https://palbreedai.com/guides/whats-changed-1-0",
  },
};

const CHANGES = [
  {
    title: "The combination table was rewritten",
    body: "Community diffs of the 1.0 game data found that roughly 98% of parent pairs produce a different child than they did in 0.7. If a recipe is burned into your memory from early access, assume it is wrong until you check it. This calculator was rebuilt from the 1.0 game files and reproduces the full 44,551-pair table exactly.",
  },
  {
    title: "The famous Anubis shortcut is gone",
    body: "Penking + Bushi — the classic early-access route to Anubis — now produces Sibelyx. Anubis is still breedable, but the parents changed. Any guide or video published before 10 July 2026 that shows the old pair is out of date.",
  },
  {
    title: "72 new Pals joined the breeding pool",
    body: "1.0 added 47 new species and 25 variant forms — Knocklem, Yakumo, Tarantriss, Whalaska, the Bellanoir line and more — taking the Paldeck to 287 entries, plus 11 Terraria crossover Pals. New Pals mean new shortest paths: several old multi-step chains are now one step shorter.",
  },
  {
    title: "Breeding power is now CombiRank — and the scale changed",
    body: "Every Pal carries a hidden CombiRank. The child of two parents is the Pal whose rank is closest to floor((rankA + rankB + 1) / 2), with ties going to the higher rank. In 1.0 data the scale runs from about 30 (rarest) to 3,100 (most common) — old calculators built on the early-access 10–1,500 scale give wrong answers even for Pals that did not change.",
  },
  {
    title: "Most Pals can never come out of the formula",
    body: "Only 183 Pals sit in the formula pool the rank rule can produce. Variants, legendaries and crossover Pals hatch only from their fixed unique combo, from two parents of their own species, or not at all. That is why some targets show a single specific pair in the calculator — it is genuinely the only route.",
  },
  {
    title: "134 fixed unique combos",
    body: "The game data defines 134 order-independent unique combinations that override the rank rule — Arsox + Chillet → Chillet Ignis is the textbook example. If a pair has a unique combo, the formula never applies.",
  },
  {
    title: "One pair cares about gender: Katress × Wixen",
    body: "Katress + Wixen is the only gender-dependent pair in 1.0. Which child hatches — Katress Ignis or Wixen Noct — depends on which parent is which gender. Every other pair in the game is gender-blind.",
  },
  {
    title: "Legendaries and tower bosses are breed-locked",
    body: "Orserk, Frostallion, Jetragon, Paladius, Necromus and their peers can only be bred from two parents of their own species. No shortcut pair produces them — if a pre-1.0 guide shows one, it is wrong now.",
  },
  {
    title: "Mutation breeding and four new cakes",
    body: "Eggs now have a ~1% baseline chance to hatch mutated, gaining a rainbow passive. Four specialised cakes steer the odds and the outcome: Mushroom (talents grow faster), Vegetable (two eggs per cycle), Deluxe Vegetable (mutation up to ~3%), and Special (multi-passive inheritance). Rates are community batch-tested estimates — Pocketpair has not published exact numbers. Full breakdown in the mutation guide.",
  },
  {
    title: "Small print: a Pal got renamed",
    body: "Snock Lux is Snock Terra in the 1.0 game files. Same Pal, new name — worth knowing if your old notes or a favourite video use the early-access name.",
  },
];

export default function WhatsChangedPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/guides"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">
            What&apos;s Changed in 1.0
          </span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            What&apos;s Changed in Palworld 1.0 Breeding
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Returning from early access? Your breeding knowledge expired on
            10 July 2026. Version 1.0 rewrote the combination table, changed
            the rank scale, added 72 Pals and introduced mutation breeding.
            Here is every change that matters — and the new rules underneath
            them.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Data: Palworld 1.0 · build 24575149 · verified against the full
            44,551-pair breeding table
          </p>
        </header>

        <section className="space-y-4">
          {CHANGES.map((c, i) => (
            <article
              key={c.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                {i + 1}. {c.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {c.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-indigo-500/30 bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Check your old routes before you breed
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            The fastest way to unlearn the old table is to run your favourite
            pairs through the calculator — every result on this site comes
            from the verified 1.0 data, including the shortest chain to any
            Pal you are chasing.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
            >
              Open the breeding calculator
            </Link>
            <Link
              href="/guides/mutation"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-indigo-500/40 dark:border-white/20 dark:text-slate-200"
            >
              Mutation &amp; cakes guide
            </Link>
            <Link
              href="/guides/breeding-combos"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:border-indigo-500/40 dark:border-white/20 dark:text-slate-200"
            >
              All 1.0 breeding combos
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
