import type { Metadata } from "next";
import Link from "next/link";
import { DIGIMON_CREATURES } from "@/data/digimon";
import { digimonPack } from "@/lib/engine/packs/digimon";
import { DigimonPlanner } from "@/components/DigimonPlanner";
import { getDigimonSlug, STAGE_ORDER } from "@/lib/digimonSlug";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Digimon Time Stranger Digivolution Planner — Every Path, Every Requirement",
  description:
    "Plan any digivolution in Digimon Story: Time Stranger: shortest paths for all 476 Digimon with the exact Agent Rank, stat thresholds, Capsule items and DNA partners each step needs.",
  keywords: [
    "digimon time stranger digivolution chart",
    "time stranger digivolution planner",
    "how to digivolve time stranger",
    "digimon time stranger dna digivolution",
    "omnimon time stranger how to get",
  ],
  alternates: { canonical: "https://palbreedai.com/digimon" },
  openGraph: {
    title: "Digimon Time Stranger Digivolution Planner — PalBreed.AI",
    description:
      "Shortest digivolution paths with every requirement, for all 476 Digimon.",
    url: "https://palbreedai.com/digimon",
  },
};

const byStage = new Map<string, typeof DIGIMON_CREATURES>();
for (const c of DIGIMON_CREATURES) {
  byStage.set(c.stage, [...(byStage.get(c.stage) ?? []), c]);
}

const HOW_IT_WORKS = [
  {
    t: "Requirements live on the target",
    b: "Every digivolution checks the Digimon you are evolving INTO: an Agent Rank gate (1 for Rookie up to 8 for Mega+), stat thresholds, and sometimes an item, an Agent Skill, or a specific partner. Any valid pre-form works.",
  },
  {
    t: "DNA needs two partners",
    b: "17 Digimon are DNA results — two specific partners, each with a required personality (Omnimon wants a Daring WarGreymon and a Friendly MetalGarurumon). The planner treats DNA as a real two-input step, not a footnote.",
  },
  {
    t: "Going down is free",
    b: "De-digivolution has no requirements at all, and mode changes slide certain Digimon sideways (Hybrid forms, Imperialdramon DM/FM). Paths here plan upward; every Digimon page lists what it can de-digivolve into.",
  },
];

export default function DigimonHub() {
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
          <span className="text-indigo-600 dark:text-indigo-400">Digimon</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Time Stranger Digivolution Planner
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Pick the Digimon you want and the planner walks the shortest
            path back to an In-Training I form — with the exact requirement
            on every step: the Agent Rank, the stat thresholds, the Capsule,
            the DNA partner personalities. There are no bond or level gates
            in Time Stranger, whatever other sites claim; if a requirement
            is listed here, it is in the game data.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Data: {digimonPack.dataVersion}
          </p>
        </header>

        <section className="mb-12">
          <DigimonPlanner />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How Time Stranger digivolution works
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
            All Digimon ({DIGIMON_CREATURES.length})
          </h2>
          {STAGE_ORDER.filter((s) => byStage.has(s)).map((stage) => (
            <div key={stage} className="mb-8">
              <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {stage} · {byStage.get(stage)!.length}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[...byStage.get(stage)!]
                  .sort((a, b) => a.no - b.no)
                  .map((c) => (
                    <Link
                      key={c.name}
                      href={`/digimon/${getDigimonSlug(c)}`}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-indigo-400"
                    >
                      {c.name}
                      <span className="ml-2 text-xs font-semibold text-slate-400">
                        #{c.no}
                      </span>
                      {c.dlc && (
                        <span className="ml-2 rounded-full bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">
                          DLC
                        </span>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">
            Data source: the structured game data behind jsuk.cloud&apos;s
            path finder (snapshot 2026-10-23), DNA pairs cross-validated
            against an independent community dataset. Digital Monster
            names and the Digimon franchise are trademarks of Bandai; this
            is an unofficial fan tool.
          </p>
        </section>
      </div>
    </main>
  );
}
