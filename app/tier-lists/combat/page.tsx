import type { Metadata } from "next";
import Link from "next/link";
import { TierList, type Tier } from "@/components/TierList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Palworld 1.0 Combat Tier List — Best Pals for Battle",
  description:
    "The Palworld 1.0 combat tier list: S-, A-, and B-tier Pals for fighting, raiding, and bossing. Element coverage tips and links to every Pal's breeding guide.",
  keywords: [
    "palworld 1.0 combat tier list",
    "best pals for combat palworld",
    "palworld best battle pals",
    "palworld s tier pals",
  ],
  alternates: { canonical: "https://palbreedai.com/tier-lists/combat" },
  openGraph: {
    title: "Palworld 1.0 Combat Tier List — PalBreed.AI",
    description: "S-, A-, and B-tier Pals for combat in Palworld 1.0.",
    url: "https://palbreedai.com/tier-lists/combat",
  },
};

const COMBAT_TIERS: Tier[] = [
  {
    label: "S-Tier",
    accent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    blurb: "Best-in-slot raid & boss Pals",
    pals: [
      "Jetragon",
      "Hartalis",
      "Neptilius",
      "Jormuntide Ignis",
      "Frostallion",
      "Frostallion Noct",
      "Necromus",
      "Paladius",
      "Blazamut Ryu",
      "Bellanoir Libero",
      "Xenolord",
      "Lyleen Noct",
      "Shadowbeak",
      "Anubis",
    ],
  },
  {
    label: "A-Tier",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    blurb: "Strong all-rounders",
    pals: [
      "Suzaku",
      "Faleris",
      "Grizzbolt",
      "Orserk",
      "Relaxaurus Lux",
      "Astegon",
      "Beakon",
      "Bastigor",
      "Selyne",
      "Blazamut",
      "Xenogard",
    ],
  },
  {
    label: "B-Tier",
    accent: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    blurb: "Situational / budget picks",
    pals: ["Warsect", "Quivern", "Elphidran", "Univolt", "Kitsun", "Rayhound", "Pyrin Noct", "Sweepa"],
  },
];

export default function CombatTierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tier-lists" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tiers</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">Combat</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Palworld 1.0 Combat Tier List
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            The strongest Pals for fighting, tower raids, and bossing in the 1.0 update. Click any
            Pal to open its full breeding, stat, and location breakdown.
          </p>
        </header>

        <TierList tiers={COMBAT_TIERS} />

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Element Coverage Tips
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Pair a Dark attacker (Shadowbeak, Lyleen Noct) with a Dragon (Jetragon, Jormuntide Ignis) for flexible type coverage.</li>
            <li>Frostallion / Frostallion Noct bring Ice and Dark — strong against Grass and Dragon raid bosses.</li>
            <li>Mount up on Jetragon or a Frostallion for mobility while keeping a high-DPS ground team for raids.</li>
            <li>Stack combat passives (Legend, Demon God, Serenity, Musclehead) — see the combat passives guide.</li>
          </ul>
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
