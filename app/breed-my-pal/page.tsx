import type { Metadata } from "next";
import Link from "next/link";
import type { Pal } from "@/data/pals";
import { getPalBySlug, getPalSlug } from "@/lib/palSlug";
import { fusePals } from "@/lib/fusion";
import { getResultingPal } from "@/lib/breeding";
import { FusionPicker } from "@/components/FusionPicker";
import { SafeImage } from "@/components/SafeImage";

export const revalidate = 86400;

interface SP {
  a?: string;
  b?: string;
}

function pairFrom(sp: SP): [Pal, Pal] | null {
  if (!sp.a || !sp.b) return null;
  const a = getPalBySlug(sp.a);
  const b = getPalBySlug(sp.b);
  return a && b ? [a, b] : null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const pair = pairFrom(await searchParams);
  if (!pair) {
    return {
      title: "Breed My Pal — The Palworld Fusion Generator",
      description:
        "Pick any two Pals and meet their fusion: a blended name, inherited types, averaged stats and a personality of its own. Deterministic — your link is the share card.",
      alternates: { canonical: "https://palbreedai.com/breed-my-pal" },
    };
  }
  const [a, b] = pair;
  const fusion = fusePals(a, b);
  return {
    title: `${a.name} + ${b.name} = ${fusion.name}?! — Breed My Pal`,
    description: `If ${a.name} and ${b.name} could fuse: ${fusion.name}, a ${fusion.type1}${fusion.type2 ? `/${fusion.type2}` : ""} fan fusion with ${fusion.hp} HP. Breed your own pair and share the link.`,
    alternates: {
      canonical: `https://palbreedai.com/breed-my-pal?a=${getPalSlug(a)}&b=${getPalSlug(b)}`,
    },
    openGraph: {
      title: `${a.name} + ${b.name} = ${fusion.name}?!`,
      description: `A ${fusion.type1}${fusion.type2 ? `/${fusion.type2}` : ""} fan fusion from Breed My Pal.`,
      url: `https://palbreedai.com/breed-my-pal?a=${getPalSlug(a)}&b=${getPalSlug(b)}`,
    },
  };
}

const WORK_LABELS: Record<string, string> = {
  kindling: "Kindling",
  watering: "Watering",
  planting: "Planting",
  generating: "Generating",
  gathering: "Gathering",
  mining: "Mining",
  medicine: "Medicine",
  transporting: "Transporting",
  deforesting: "Deforesting",
  cooling: "Cooling",
  farming: "Farming",
  handiwork: "Handiwork",
};

export default async function BreedMyPalPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const pair = pairFrom(sp);
  const fusion = pair ? fusePals(pair[0], pair[1]) : null;
  const realChild = pair ? getResultingPal(pair[0], pair[1]) : null;

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
          <span className="text-indigo-600 dark:text-indigo-400">Breed My Pal</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Breed My Pal
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Real breeding follows the formula. This is the other question —
            what would these two Pals&apos; fusion actually look like? Pick
            any pair and meet it: a blended name, inherited types, stats
            averaged from both parents, and a personality assembled from
            their worst habits. Every pair has exactly one fusion, so the
            link you share shows everyone the same one.
          </p>
        </header>

        <section className="mb-10">
          <FusionPicker
            initialA={pair?.[0].name}
            initialB={pair?.[1].name}
          />
        </section>

        {fusion && pair && realChild && (
          <section className="mb-12 overflow-hidden rounded-3xl border-2 border-indigo-500/50 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-500/10 dark:to-transparent">
            <div className="p-6 sm:p-8">
              <p className="text-center text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Fan fusion · not a real Pal
              </p>
              <h2 className="mt-2 text-center text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {fusion.name}
              </h2>
              <p className="mt-1 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                {fusion.type1}
                {fusion.type2 ? ` / ${fusion.type2}` : ""} · Rarity{" "}
                {fusion.rarity} · Breeding power {fusion.breedingPower}
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">
                {pair.map((p) => (
                  <Link key={p.name} href={`/pals/${getPalSlug(p)}`} className="text-center">
                    <SafeImage
                      src={p.image}
                      alt={p.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 rounded-2xl object-cover opacity-90 sm:h-20 sm:w-20"
                    />
                    <span className="mt-1 block text-xs font-bold text-slate-500 dark:text-slate-400">
                      {p.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3 text-center">
                {[
                  { label: "HP", value: fusion.hp },
                  { label: "Attack", value: fusion.attack },
                  { label: "Defense", value: fusion.defense },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/70 p-3 dark:bg-white/5">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {s.value}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(fusion.workSuitability).length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {Object.entries(fusion.workSuitability).map(([kind, v]) => (
                    <span
                      key={kind}
                      className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200"
                    >
                      {WORK_LABELS[kind] ?? kind} Lv {v}
                    </span>
                  ))}
                </div>
              )}

              <p className="mx-auto mt-6 max-w-lg text-center text-sm italic leading-relaxed text-slate-600 dark:text-slate-400">
                “{fusion.personality}.”
              </p>

              <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-slate-200 bg-white/70 p-4 text-center text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                In the real game, {pair[0].name} + {pair[1].name} hatches{" "}
                <Link
                  href={`/pals/${getPalSlug(realChild)}`}
                  className="font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {realChild.name}
                </Link>{" "}
                — see the{" "}
                <Link href="/#calculator" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
                  actual breeding route
                </Link>
                .
              </div>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 p-6 dark:border-white/10">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            How fusions are made
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Names are blended at a vowel boundary (Anubis + Lamball gives
            you the idea), types are inherited from both parents, stats are
            the parents&apos; average with a small seeded twist, and work
            suitability takes the best of each parent. The twist is seeded
            by the pair itself — not by when you visit — which is why your
            fusion is the same as everyone else&apos;s. Fusions are fan
            concepts for fun and sharing; the breeding calculator and pair
            pages carry the real 1.0 data.
          </p>
        </section>
      </div>
    </main>
  );
}
