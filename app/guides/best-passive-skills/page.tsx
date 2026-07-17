import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Best Passive Skills in Palworld 1.0 — Combat & Worker Ranked",
  description:
    "The best passive skills in Palworld 1.0 ranked: S-tier combat passives (Legend, Demon God, Musclehead, Serenity) and the best worker passives (Artisan, Work Slave, Remarkable Craftsmanship, Serious) for your base.",
  keywords: [
    "best passives palworld",
    "best passive skills palworld 1.0",
    "palworld legend passive",
    "best worker passives palworld",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/best-passive-skills" },
  openGraph: {
    title: "Best Passive Skills in Palworld 1.0 — PalBreed.AI",
    description: "S-tier combat and worker passives ranked.",
    url: "https://palbreedai.com/guides/best-passive-skills",
  },
};

const COMBAT = [
  { name: "Legend", effect: "+20% Attack, +20% Defense, +15% Move Speed. The best all-round combat passive.", tier: "S" },
  { name: "Demon God", effect: "+30% Attack. Pure damage boost for any attacker.", tier: "S" },
  { name: "Musclehead", effect: "+30% Attack, −50% Work Speed. Great on fighters, bad on workers.", tier: "A" },
  { name: "Serenity", effect: "+30% Attack, but only while the Pal is not in combat. Pair with tanky fronts.", tier: "A" },
  { name: "Ferocious", effect: "+20% Attack. Easy to breed in, solid budget pick.", tier: "B" },
  { name: "Brave", effect: "+15% Attack. Common, good filler before you land S-tier.", tier: "B" },
];

const WORKER = [
  { name: "Artisan", effect: "+50% Work Speed. The single best base-worker passive.", tier: "S" },
  { name: "Work Slave", effect: "+30% Work Speed. Strong stack with Artisan.", tier: "S" },
  { name: "Remarkable Craftsmanship", effect: "+25% Work Speed. Easy to condense in.", tier: "A" },
  { name: "Serious", effect: "+20% Work Speed. Common and reliable.", tier: "A" },
  { name: "Noble / Philanthropist", effect: "+15% Work Speed. Budget filler for early bases.", tier: "B" },
  { name: "Lucky", effect: "+15% Work Speed and +10% Attack. A flexible all-rounder.", tier: "B" },
];

const faqItems = [
  {
    q: "What is the best passive skill in Palworld 1.0?",
    a: "For combat, Legend (+20% Attack, +20% Defense, +15% Move Speed) is the best. For base work, Artisan (+50% Work Speed) is unmatched. Most endgame Pals run a stack of both.",
  },
  {
    q: "Can you breed passives onto Pals?",
    a: "Yes. A child can inherit passives from its parents. Using a Special Cake during breeding can bundle multiple parent passives onto one offspring at once.",
  },
  {
    q: "Are there passives to avoid?",
    a: "Yes — Musclehead, Glutton, and other 'work-reducing' passives hurt base workers even though they help fighters. Keep combat and worker builds separate.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function PassiveTable({ title, rows }: { title: string; rows: { name: string; effect: string; tier: string }[] }) {
  const accent = (t: string) =>
    t === "S"
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      : t === "A"
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "bg-sky-500/10 text-sky-600 dark:text-sky-400";
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
            <tr>
              <th className="px-4 py-3">Passive</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Effect</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{r.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-black ${accent(r.tier)}`}>{r.tier}</span>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function BestPassiveSkillsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Best Passives</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Best Passive Skills in Palworld 1.0
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Passives are the difference between a good Pal and a great one. Build a separate combat
            stack and worker stack — some passives that help fighters hurt workers.
          </p>
        </header>

        <PassiveTable title="Best Combat Passives" rows={COMBAT} />
        <PassiveTable title="Best Worker Passives" rows={WORKER} />

        <section aria-label="Passive skills FAQ">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Passive Skills FAQ
          </h2>
          <dl className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                <dt className="text-sm font-black text-slate-900 dark:text-white">{item.q}</dt>
                <dd className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/guides/combat-passives"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700"
          >
            See Full Passive Builds →
          </Link>
        </div>
      </div>
    </main>
  );
}
