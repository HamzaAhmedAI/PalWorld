import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Mutation Breeding Guide — Cakes & Rainbow Passives",
  description:
    "How mutation breeding works in Palworld 1.0: the ~1% baseline mutation rate, the 4 breeding cakes (recipes + effects), and the full rainbow-passive reference table.",
  keywords: [
    "palworld 1.0 mutation",
    "palworld mutation breeding",
    "palworld breeding cakes",
    "palworld rainbow passives",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/mutation" },
  openGraph: {
    title: "Palworld 1.0 Mutation Breeding Guide — PalBreed.AI",
    description: "Cakes, recipes, and rainbow passives for mutation breeding in 1.0.",
    url: "https://palbreedai.com/guides/mutation",
  },
};

const CAKES = [
  {
    name: "Mushroom Cake",
    level: 30,
    ingredients: ["5 Flour", "5 Mushroom", "3 Cavern Mushroom", "8 Egg", "2 Honey"],
    effect: "Talents grow slightly faster.",
  },
  {
    name: "Vegetable Cake",
    level: 47,
    ingredients: ["8 Flour", "8 Tomato", "7 Lettuce", "8 Egg", "4 Honey"],
    effect: "Lays two eggs per breeding cycle.",
  },
  {
    name: "Deluxe Vegetable Cake",
    level: 60,
    ingredients: ["12 Flour", "8 Cotton Candy", "10 Potato", "6 Onion", "8 Carrot"],
    effect: "Mutation chance up (~3%) and talents grow faster.",
  },
  {
    name: "Special Cake",
    level: 74,
    ingredients: ["20 Flour", "8 Caramel Cotton Candy", "15 Milk", "15 Egg", "2 Mammorest Meat"],
    effect: "Multiple passive inheritance from parents at once (e.g. Swift + Lucky bundled).",
  },
];

const RAINBOW = [
  { name: "Immortality", effect: "Life Steal +5%, Auto HP Regen +100%, Attack +15%." },
  { name: "Idiosyncratic", effect: "Auto HP Regen +50%, Defense +25%, immune to Poison & Burn." },
  { name: "Heavily Armored", effect: "Immune to Explosion damage." },
  { name: "Babysitter", effect: "Egg production +30%, incubation speed +30%." },
  { name: "Lavish Hospitality", effect: "Dropped items +100% when summoned during butchering." },
  { name: "Ranch Master", effect: "Farming work suitability +2." },
  { name: "Lightfooted", effect: "Mounted jump height +1." },
  { name: "Skymarcher", effect: "Mounted jump height +2." },
  { name: "Skirmisher", effect: "Rainbow passive pool entry (combat-oriented).", pool: "Pool 1" },
  { name: "Demon God", effect: "High Attack boost — Pool 2 catchable rainbow passive.", pool: "Pool 2" },
  { name: "Eternal Engine", effect: "Infinite SAN (no work-speed decay) — Pool 2.", pool: "Pool 2" },
  { name: "Diamond Body", effect: "Defense boost — Pool 2 catchable rainbow passive.", pool: "Pool 2" },
];

const recipeLd = {
  "@context": "https://schema.org",
  "@graph": CAKES.map((c) => ({
    "@type": "Recipe",
    name: c.name,
    description: c.effect,
    recipeIngredient: c.ingredients,
  })),
};

export default function MutationGuidePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Mutation</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Mutation Breeding Guide
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Mutation is a low-chance breeding mechanic that can produce rainbow passives on an egg.
            The baseline rate is around <strong>1%</strong>; the right cake pushes it to ~3%.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            The four 1.0 breeding cakes
          </h2>
          <div className="space-y-4">
            {CAKES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{c.name}</h3>
                  <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                    Tech Lv {c.level}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.effect}</p>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  {c.ingredients.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Rainbow passive reference
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10">
                <tr>
                  <th className="px-4 py-3">Passive</th>
                  <th className="px-4 py-3">Effect</th>
                  <th className="px-4 py-3">Pool</th>
                </tr>
              </thead>
              <tbody>
                {RAINBOW.map((r) => (
                  <tr key={r.name} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{r.name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.effect}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{r.pool ?? "Pool 1"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Not granted by mutation: Legend, Siren of the Void, Savior, Invader — parents can still
            pass these via normal inheritance.
          </p>
        </section>

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <h2 className="mb-2 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Strategy
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Feed <strong>Deluxe Vegetable Cake</strong> while hunting for rainbow passives (~3%
            mutation chance). Once you have the passives you want, switch to <strong>Special Cake</strong>{" "}
            to spread multiple passives from both parents onto a single offspring at once.
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
