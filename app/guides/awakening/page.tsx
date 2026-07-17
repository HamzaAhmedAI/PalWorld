import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Awakening Guide — Radiant Gems & World Tree Passives",
  description:
    "How Awakening works in Palworld 1.0: Radiant Gems from the World Tree raid, the stat boosts they grant, and the World Tree passive skills like Twin-Edged Holy Blade.",
  keywords: [
    "palworld 1.0 awakening",
    "palworld radiant gems",
    "palworld world tree passive",
    "twin-edged holy blade",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/awakening" },
  openGraph: {
    title: "Palworld 1.0 Awakening Guide — PalBreed.AI",
    description: "Radiant Gems, stat boosts, and World Tree passives in 1.0.",
    url: "https://palbreedai.com/guides/awakening",
  },
};

const WORLD_TREE_PASSIVES = [
  { name: "Twin-Edged Holy Blade", effect: "Attack +50%, but lowers Defense." },
  { name: "Holy Burst", effect: "Adds a Holy-type burst to attacks." },
  { name: "Saint of the Sun", effect: "Boosts stats while fighting in daylight." },
  { name: "Swift Sprinter", effect: "Increases movement speed." },
];

export default function AwakeningGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Awakening</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Awakening Guide
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Awakening uses <strong>Radiant Gems</strong>, earned from the <strong>World Tree</strong>{" "}
            raid, to push a Pal beyond its normal limits with big stat boosts and exclusive World
            Tree passive skills.
          </p>
        </header>

        <section className="mb-10 space-y-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-2 text-lg font-black text-slate-900 dark:text-white">How to awaken</h2>
            <p>
              Defeat the World Tree boss to collect Radiant Gems, then use them on a Pal to awaken it.
              Each awakening grants a permanent stat boost and a chance at a World Tree passive skill.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-white">World Tree passives</h2>
            <ul className="space-y-2">
              {WORLD_TREE_PASSIVES.map((p) => (
                <li key={p.name}>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{p.name}</span>
                  <span className="text-slate-500"> — {p.effect}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Exact passive pools and percentages can vary by patch — verify in-game before committing
              a high-value Pal.
            </p>
          </div>
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
