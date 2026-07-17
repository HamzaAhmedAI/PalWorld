import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Combat & Worker Passive Builds — Best Passive Combos",
  description:
    "The S-Tier combat passive build (Legend, Demon God, Serenity, Musclehead) and the S-Tier base-worker build (Demon's Hand, Artisan, Serious, Work Slave) for Palworld 1.0.",
  keywords: [
    "palworld best combat passives",
    "palworld legend demon god",
    "palworld best worker passives",
    "palworld passive build",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/combat-passives" },
  openGraph: {
    title: "Palworld 1.0 Combat & Worker Passive Builds — PalBreed.AI",
    description: "S-Tier combat and base-worker passive combos for 1.0.",
    url: "https://palbreedai.com/guides/combat-passives",
  },
};

const COMBAT_BUILD = [
  { name: "Legend", effect: "Attack +20%, Defense +20% (rainbow passive)." },
  { name: "Demon God", effect: "Attack +30%." },
  { name: "Serenity", effect: "Slows SAN loss — Pal stays active/working far longer." },
  { name: "Musclehead", effect: "Attack +30%, but Work Speed -50% (pure combat pick)." },
];

const WORKER_BUILD = [
  { name: "Demon's Hand", effect: "Work Speed boost (combat-handling Pal passive)." },
  { name: "Artisan", effect: "Work Speed boost." },
  { name: "Serious", effect: "Work Speed boost." },
  { name: "Work Slave", effect: "Work Speed boost." },
];

export default function CombatPassivesGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Combat Passives</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Passive Builds
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            The two god-roll passive sets players chase in 1.0: one for combat Pals, one for base
            workers. Stack them via the breeding chains on this site.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            S-Tier combat build
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
                <tr>
                  <th className="px-4 py-3">Passive</th>
                  <th className="px-4 py-3">Effect</th>
                </tr>
              </thead>
              <tbody>
                {COMBAT_BUILD.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            S-Tier base-worker build
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
                <tr>
                  <th className="px-4 py-3">Passive</th>
                  <th className="px-4 py-3">Effect</th>
                </tr>
              </thead>
              <tbody>
                {WORKER_BUILD.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Exact percentage values can shift between patches — verify in-game before committing a
            high-value Pal to a final build.
          </p>
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
