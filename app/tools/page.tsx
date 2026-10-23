import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Breeding Tools — PalBreed.AI",
  description:
    "Interactive Palworld 1.0 breeding tools: god-roll and mutation odds calculator, breeding planner, pair results and full breeding routes.",
  alternates: { canonical: "https://palbreedai.com/tools" },
};

const TOOLS = [
  {
    href: "/tools/god-roll",
    title: "God-Roll & Mutation Odds",
    blurb:
      "Per-egg mutation odds per cake, inheritance boosts, expected eggs and 90%-confidence hatch counts.",
  },
  {
    href: "/#calculator",
    title: "Breeding Planner",
    blurb:
      "The full path from wild-caught parents to any target Pal, with passives and IVs.",
  },
  {
    href: "/breeding/routes",
    title: "Breeding Routes",
    blurb: "Shortest breeding chains for the Pals everyone is chasing in 1.0.",
  },
  {
    href: "/aniimo",
    title: "Aniimo Evolution Planner",
    blurb: "New: every Aniimo evolution path with its level gate, stone, deed or talent.",
  },
];

export default function ToolsHub() {
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
          <span className="text-indigo-600 dark:text-indigo-400">Tools</span>
        </nav>
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Breeding Tools
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            The calculators behind the guides — every number sourced from
            verified 1.0 game data.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.href + t.title}
              href={t.href}
              className="group rounded-2xl border border-slate-200 p-6 transition-colors hover:border-indigo-500/50 dark:border-white/10"
            >
              <h2 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
