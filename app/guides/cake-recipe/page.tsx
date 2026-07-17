import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld Cake Recipes — How to Make Breeding Cakes in 1.0",
  description:
    "Every Palworld 1.0 breeding cake recipe: Flour, Vegetable, Mushroom, Deluxe Vegetable, and Special Cake — ingredients, unlock level, and what each one does for your breeding farm.",
  keywords: [
    "palworld cake recipe",
    "how to make cake palworld",
    "palworld breeding cake",
    "vegetable cake palworld recipe",
  ],
  alternates: { canonical: "https://palbreedai.com/guides/cake-recipe" },
  openGraph: {
    title: "Palworld Cake Recipes — PalBreed.AI",
    description: "All 1.0 breeding cake recipes and what they do.",
    url: "https://palbreedai.com/guides/cake-recipe",
  },
};

const CAKES = [
  {
    name: "Flour Cake",
    level: 15,
    ingredients: ["4 Flour", "4 Red Berries", "2 Milk", "2 Egg", "1 Honey"],
    effect: "Basic breeding cake — keeps the farm producing eggs.",
  },
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
    effect: "A breeding pair lays two eggs per cycle instead of one.",
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

const STEPS = [
  "Unlock the appropriate Cooking Pot / Electric Kitchen recipe at the given Technology level.",
  "Gather or farm the ingredients (set up Berry, Wheat, Tomato, and Onion plantations with a worker Pal).",
  "Load the ingredients into the Cooking Pot and let the cook Pal finish the recipe.",
  "Place the finished cake in the Feeding Box inside your Breeding Farm.",
];

const recipeLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...CAKES.map((c) => ({
      "@type": "Recipe",
      name: `${c.name} — Palworld`,
      recipeCategory: "Breeding",
      recipeIngredient: c.ingredients,
      description: c.effect,
    })),
    {
      "@type": "HowTo",
      name: "How to make a breeding cake in Palworld",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s,
      })),
    },
  ],
};

export default function CakeRecipePage() {
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
          <span className="text-indigo-600 dark:text-indigo-400">Cake Recipe</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Cake Recipes
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Cakes are placed in the Feeding Box of a Breeding Farm to keep Pals breeding and to
            trigger special effects. Higher-tier cakes unlock more eggs, faster mutations, and
            multi-passive inheritance.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            All 1.0 breeding cake recipes
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
            How to make a breeding cake
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

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <h2 className="mb-2 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Which cake should I use?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Starting out, <strong>Vegetable Cake</strong> doubles egg output. Once you want rainbow
            passives, switch to <strong>Deluxe Vegetable Cake</strong> (~3% mutation chance), then{" "}
            <strong>Special Cake</strong> to stack multiple passives from both parents at once. Read
            the{" "}
            <Link href="/guides/mutation" className="font-bold text-indigo-600 hover:underline dark:text-indigo-300">
              mutation breeding guide
            </Link>{" "}
            for the full strategy.
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
