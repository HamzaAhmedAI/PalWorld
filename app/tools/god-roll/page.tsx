import type { Metadata } from "next";
import Link from "next/link";
import { GodRollCalculator } from "@/components/GodRollCalculator";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "God-Roll & Mutation Odds Calculator — Palworld 1.0",
  description:
    "How many eggs does a god-roll actually take? Mutation odds per cake (~1% baseline, ~3% Deluxe), multi-passive inheritance boosts (Special ~90%, Deluxe ~20%), expected eggs and confidence targets for Palworld 1.0 breeding.",
  keywords: [
    "palworld god roll calculator",
    "palworld mutation chance",
    "palworld mutation odds",
    "palworld breeding cake odds",
    "how many eggs mutation palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/tools/god-roll" },
  openGraph: {
    title: "God-Roll & Mutation Odds Calculator — PalBreed.AI",
    description:
      "Per-egg mutation odds, inheritance boosts and expected eggs for every breeding cake in Palworld 1.0.",
    url: "https://palbreedai.com/tools/god-roll",
  },
};

export default function GodRollPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">God-Roll Odds</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            God-Roll &amp; Mutation Odds Calculator
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            A god-roll is a budgeting problem: a ~1% mutation rate means an
            average of 100 eggs — and a 37% chance of still having nothing
            after those 100. Pick your cake and your target, and this
            calculator shows the per-egg odds, the expected eggs, and the
            hatch count you need for real confidence. Every rate comes from
            the 1.0 model in our{" "}
            <Link
              href="/guides/mutation"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              mutation breeding guide
            </Link>
            ; where the game publishes no rate, the calculator says so
            instead of inventing one.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Palworld 1.0 · build 24575149
          </p>
        </header>

        <section className="mb-12">
          <GodRollCalculator />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How to use the odds
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-900 dark:text-white">
                Hunting a rainbow passive?
              </strong>{" "}
              Deluxe Vegetable Cake triples the mutation rate to ~3% — an
              average of 33 eggs per mutation instead of 100, and 230 eggs
              buys you 90% confidence at the baseline rate versus 76 on
              Deluxe.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">
                Stacking parent passives?
              </strong>{" "}
              That is an inheritance problem, not a mutation problem.
              Special Cake&apos;s ~90% multi-passive inheritance is the tool
              — use Deluxe to find the mutation first, then switch to
              Special to bundle the set onto the final Pal.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">
                On a budget?
              </strong>{" "}
              Vegetable Cake gives two eggs per cycle at the baseline rate —
              the cheapest way to double your rolls when cakes are scarce.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Got the parents picked?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Check what any pair actually hatches — and the easiest route to
            your target Pal — in the planner and pair pages.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/#calculator"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
            >
              Open the breeding planner
            </Link>
            <Link
              href="/guides/mutation"
              className="rounded-xl border border-indigo-500/40 px-4 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            >
              Read the mutation guide
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
