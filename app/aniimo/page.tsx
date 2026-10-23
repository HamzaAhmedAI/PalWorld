import type { Metadata } from "next";
import Link from "next/link";
import { ANIIMO_CREATURES } from "@/data/aniimo";
import { aniimoPack } from "@/lib/engine/packs/aniimo";
import { AniimoPlanner } from "@/components/AniimoPlanner";
import { getAniimoSlug, stageName } from "@/lib/aniimoSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Aniimo Evolution Planner — Every Evolution, Every Condition",
  description:
    "Plan any Aniimo evolution: pick a target and get the shortest path with the exact level gate, evolution stone, deed or talent each step needs. All 97 Aniimo, 59 evolutions, conditions sourced and cross-checked.",
  keywords: [
    "aniimo evolution",
    "aniimo evolution chart",
    "aniimo evolution planner",
    "how to evolve aniimo",
    "aniimo evolutions list",
  ],
  alternates: { canonical: "https://palbreedai.com/aniimo" },
  openGraph: {
    title: "Aniimo Evolution Planner — PalBreed.AI",
    description:
      "Shortest evolution paths with every condition, for all 97 Aniimo.",
    url: "https://palbreedai.com/aniimo",
  },
};

const byStage = new Map<number, typeof ANIIMO_CREATURES>();
for (const c of ANIIMO_CREATURES) {
  const s = c.stage ?? 0;
  byStage.set(s, [...(byStage.get(s) ?? []), c]);
}

const HOW_IT_WORKS = [
  {
    t: "Three stages, sometimes four",
    b: "Lumin (stage 1) to Gamma (stage 2) to Nova (stage 3). Lines can skip Gamma, branch at any stage, and two species reach a stage-4 Legendary form.",
  },
  {
    t: "Every step has three locks",
    b: "An unlock condition (a deed, a learned talent, a potential rating), a level gate between 12 and 48, and a material cost — usually an evolution stone. All three must be met.",
  },
  {
    t: "Twining is not pairing",
    b: "Twining syncs you with a single Aniimo to use its abilities — there is no creature-pairing system, so there is no Twine matrix to plan. Evolution is the whole game.",
  },
];

export default function AniimoHub() {
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
          <span className="text-indigo-600 dark:text-indigo-400">Aniimo</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Aniimo Evolution Planner
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Aniimo don&apos;t breed — they evolve, and every evolution is
            gated. Pick the Aniimo you want and the planner walks the
            shortest path back to its base form, with the exact requirement
            on every step: the level gate, the evolution stone, the deed,
            the talent. No step is a guess — conditions are sourced from the
            official wiki data and cross-checked against datamined game
            files.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Data: {aniimoPack.dataVersion}
          </p>
        </header>

        <section className="mb-12">
          <AniimoPlanner />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How Aniimo evolution works
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"
              >
                <h3 className="font-black text-slate-900 dark:text-white">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            All Aniimo ({ANIIMO_CREATURES.length})
          </h2>
          {[...byStage.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([stage, list]) => (
              <div key={stage} className="mb-8">
                <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Stage {stage} · {stageName(stage)}
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[...list]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((c) => (
                      <Link
                        key={c.name}
                        href={`/aniimo/${getAniimoSlug(c)}`}
                        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-indigo-400"
                      >
                        {c.name}
                        {c.dex && (
                          <span className="ml-2 text-xs font-semibold text-slate-400">
                            #{c.dex}
                          </span>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">
            Data sources: official-wiki snapshot (roster + evolution trees)
            and community-curated evolution conditions, cross-checked
            against datamined game data on 2026-10-23. Six evolutions are
            confirmed but their conditions are not published anywhere yet —
            those steps are labelled &quot;not yet verified&quot; on their
            pages, never guessed.
          </p>
        </section>
      </div>
    </main>
  );
}
