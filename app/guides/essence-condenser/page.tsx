import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld Essence Condenser Guide — How to Condense & Max Out Pals",
  description:
    "How the Essence Condenser works in Palworld 1.0: what Pal Souls and Condensed Souls do, the 4-condense limit, the per-condense stat boost, and the best Pals to condense for combat and base work.",
  keywords: [
    "palworld essence condenser",
    "how to condense pals palworld",
    "palworld condense guide",
    "pal souls palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/essence-condenser" },
  openGraph: {
    title: "Palworld Essence Condenser Guide — PalBreed.AI",
    description: "Condense Pals, boost stats, and pick the right targets.",
    url: "https://palbreedai.com/guides/essence-condenser",
  },
};

const STEPS = [
  "Catch or breed several copies of the same species — you need 4 extra Pals to reach the cap.",
  "Unlock the Essence Condenser at Level 6 (Ancient Technology) and place it at your base.",
  "Feed one duplicate Pal into the condenser to consume it and produce a Pal Soul for that species.",
  "Spend Condensed Souls (built from Pal Souls at the condensing menu) to raise the star level, up to 4 times.",
];

const TARGETS = [
  { name: "Anubis", why: "Top-tier ground attacker and handiwork/base worker — condense for both." },
  { name: "Jetragon", why: "Best mount; condensing boosts its already huge combat stats." },
  { name: "Frostallion", why: "Premier Ice mount and raid attacker." },
  { name: "Jormuntide Ignis", why: "Strong Dragon/Fire attacker and watering worker." },
  { name: "Lyleen Noct", why: "Excellent Dark healer/support for raids." },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use the Essence Condenser in Palworld",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    text: s,
  })),
};

export default function EssenceCondenserPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Essence Condenser</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld Essence Condenser Guide
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            The Essence Condenser lets you sacrifice duplicate Pals of the same species to permanently
            boost one Pal&rsquo;s stats. It is the core power-up path for both your combat team and
            your base workers.
          </p>
        </header>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            How condensing works
          </h2>
          <ul className="space-y-2">
            <li>Each condense raises the Pal&rsquo;s level cap and grants a flat stat boost that grows with each star.</li>
            <li>You can condense a Pal <strong>up to 4 times</strong> (to a 4-star / ⭐⭐⭐⭐ state).</li>
            <li>Consumed duplicates become <em>Pal Souls</em>; multiple souls combine into a <em>Condensed Soul</em> used at the condenser.</li>
            <li>Condensing also raises effective work-suitability level — key for the Lv 10 base-worker system.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Step-by-step
          </h2>
          <ol className="space-y-3">
            {STEPS.map((s, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Best Pals to condense
          </h2>
          <div className="space-y-3">
            {TARGETS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-sm font-black text-slate-900 dark:text-white">{t.name}</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{t.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <h2 className="mb-2 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Pair with passives
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Condensing maxes a Pal&rsquo;s raw stats, but passives stack on top. Combine a 4-star
            condense with the right passive build — see the{" "}
            <Link href="/guides/combat-passives" className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">
              combat &amp; worker passives guide
            </Link>
            .
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
