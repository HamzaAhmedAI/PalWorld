import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PALS, type Pal, type WorkKind } from "@/data/pals";
import { getResultMap } from "@/lib/breeding";
import { allPalSlugs, getPalBySlug, getPalSlug } from "@/lib/palSlug";
import { SafeImage } from "@/components/SafeImage";
import { Star } from "lucide-react";

const WORK_LABELS: Record<WorkKind, string> = {
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

export const revalidate = 86400;

export function generateStaticParams() {
  return allPalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pal = getPalBySlug(slug);
  if (!pal) return { title: "Pal not found — PalBreed.AI" };

  const title = `${pal.name} — Palworld 1.0 Breeding, Stats & Locations`;
  const description = `Everything about ${pal.name} in Palworld 1.0: breeding combinations, ${pal.type1}${pal.type2 ? "/" + pal.type2 : ""} typing, work suitability, base stats, drops, and where to catch it.`;
  const url = `https://palbreedai.com/pals/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${pal.name} palworld`,
      `${pal.name} breeding`,
      `${pal.name} locations`,
      `${pal.name} stats`,
      "palworld 1.0 breeding",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${pal.name} — PalBreed.AI`,
      description,
      url,
      type: "article",
    },
  };
}

// Pairs that directly produce `pal`, sorted easiest-to-catch first.
function directCombos(pal: Pal) {
  const map = getResultMap();
  const pairs = (map.get(pal.name) ?? []).map(([a, b]) => ({ a, b }));
  return pairs.sort((x, y) => {
    const dx = Math.max(x.a.rarity, x.b.rarity);
    const dy = Math.max(y.a.rarity, y.b.rarity);
    if (dx !== dy) return dx - dy;
    return (
      x.a.breedingPower + x.b.breedingPower - (y.a.breedingPower + y.b.breedingPower)
    );
  });
}

// Pals you can breed using `pal` as a parent.
function breedingTargets(pal: Pal) {
  const map = getResultMap();
  const seen = new Set<string>();
  const out: { pal: Pal; a: Pal; b: Pal }[] = [];
  for (const [childName, pairs] of map.entries()) {
    if (childName === pal.name) continue;
    for (const [a, b] of pairs) {
      if (a.id === pal.id || b.id === pal.id) {
        if (seen.has(childName)) continue;
        seen.add(childName);
        const target = PALS.find((p) => p.name === childName);
        if (target) out.push({ pal: target, a, b });
        break;
      }
    }
  }
  return out;
}

export default async function PalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pal = getPalBySlug(slug);
  if (!pal) notFound();

  const combos = directCombos(pal);
  const targets = breedingTargets(pal);
  const work = pal.workSuitability
    ? (Object.entries(pal.workSuitability) as [WorkKind, number][])
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: pal.name,
    url: `https://palbreedai.com/pals/${slug}`,
    description: pal.description ?? `${pal.name} — Palworld 1.0 Pal.`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "HP", value: pal.hp },
      { "@type": "PropertyValue", name: "Attack", value: pal.attack },
      { "@type": "PropertyValue", name: "Defense", value: pal.defense },
      { "@type": "PropertyValue", name: "Breeding Power", value: pal.breedingPower },
      { "@type": "PropertyValue", name: "Type", value: pal.type2 ? `${pal.type1}/${pal.type2}` : pal.type1 },
    ],
  };

  const topCombo = combos[0];
  const faqItems = [
    {
      q: `What is the best breeding combination for ${pal.name} in Palworld 1.0?`,
      a:
        combos.length > 0
          ? `The easiest way to breed ${pal.name} is ${topCombo.a.name} + ${topCombo.b.name}. This page lists ${combos.length} valid parent pair${combos.length === 1 ? "" : "s"}, sorted by how easy the parents are to catch.`
          : `${pal.name} is a base / true-breeding Pal — breed two of the same, or catch it in the wild.`,
    },
    {
      q: `How do you get ${pal.name} in Palworld 1.0?`,
      a:
        combos.length > 0
          ? `You can breed ${pal.name} from the parent combinations listed above, or catch it in the wild at its spawn locations.`
          : `Catch ${pal.name} in the wild at its spawn locations, or breed two of the same Pal together.`,
    },
    {
      q: `Where does ${pal.name} spawn in Palworld 1.0?`,
      a:
        pal.habitats && pal.habitats.length > 0
          ? `${pal.name} spawns in: ${pal.habitats.map((h) => h.regionName).join(", ")}.`
          : `${pal.name} is not known to spawn in the wild in 1.0 — obtain it through breeding.`,
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

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/pals" className="hover:text-indigo-600 dark:hover:text-indigo-400">Paldex</Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">{pal.name}</span>
        </nav>

        {/* Hero */}
        <header className="flex flex-col items-center gap-6 rounded-3xl border border-indigo-500/10 bg-slate-50 p-8 dark:border-white/5 dark:bg-white/5 sm:flex-row sm:items-center">
          <SafeImage
            src={pal.image}
            alt={pal.name}
            width={160}
            height={160}
            className="rounded-2xl bg-white p-2 dark:bg-black/40"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {pal.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                {pal.type1}
              </span>
              {pal.type2 && (
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                  {pal.type2}
                </span>
              )}
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                {Array.from({ length: pal.rarity }).map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </span>
            </div>
            <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              {pal.description ??
                `${pal.name} is a Palworld Pal with ${pal.type1}${pal.type2 ? "/" + pal.type2 : ""} typing.`}
            </p>
          </div>
        </header>

        {/* Stats + Work */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Base Stats (1.0)
            </h2>
            <dl className="space-y-3 text-sm">
              {[
                ["HP", pal.hp],
                ["Attack", pal.attack],
                ["Defense", pal.defense],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-white/5">
                  <dt className="font-bold text-slate-500 dark:text-slate-400">{label}</dt>
                  <dd className="font-black text-slate-900 dark:text-white">{value ?? "—"}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <dt className="font-bold text-slate-500 dark:text-slate-400">Breeding Power</dt>
                <dd className="font-black text-slate-900 dark:text-white">{pal.breedingPower}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Work Suitability
            </h2>
            {work.length > 0 ? (
              <ul className="space-y-2">
                {work.map(([kind, level]) => (
                  <li
                    key={kind}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5"
                  >
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {WORK_LABELS[kind]}
                    </span>
                    <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-black text-indigo-600 dark:text-indigo-300">
                      Lv {level}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">No work suitability data.</p>
            )}
          </div>
        </section>

        {/* Breeding combos */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How to Breed {pal.name}
          </h2>
          {combos.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {combos.slice(0, 12).map(({ a, b }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5"
                >
                  <Link href={`/pals/${getPalSlug(a)}`} className="flex items-center gap-2 hover:opacity-80">
                    <SafeImage src={a.image} alt={a.name} width={40} height={40} className="rounded-xl bg-slate-100 dark:bg-black/40" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{a.name}</span>
                  </Link>
                  <span className="text-indigo-500/50 font-black">+</span>
                  <Link href={`/pals/${getPalSlug(b)}`} className="flex items-center gap-2 hover:opacity-80">
                    <SafeImage src={b.image} alt={b.name} width={40} height={40} className="rounded-xl bg-slate-100 dark:bg-black/40" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{b.name}</span>
                  </Link>
                  <span className="text-indigo-500/40">→</span>
                  <SafeImage src={pal.image} alt={pal.name} width={36} height={36} className="rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              {pal.name} is a base / true-breeding Pal — breed two of the same to get more,
              or catch it in the wild.
            </p>
          )}
        </section>

        {/* Breeding targets */}
        {targets.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Breeds Into
            </h2>
            <div className="flex flex-wrap gap-3">
              {targets.slice(0, 16).map((t) => (
                <Link
                  key={t.pal.id}
                  href={`/pals/${getPalSlug(t.pal)}`}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pr-4 transition-all hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/5"
                >
                  <SafeImage src={t.pal.image} alt={t.pal.name} width={36} height={36} className="rounded-xl bg-slate-100 dark:bg-black/40" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.pal.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Locations */}
        {pal.habitats && pal.habitats.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Where to Find {pal.name}
            </h2>
            <ul className="space-y-3">
              {pal.habitats.map((h, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {h.biome}
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{h.regionName}</span>
                    {h.commonness && (
                      <span className="text-xs font-medium text-slate-500">{h.commonness}</span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Time: {h.timeOfDay?.join(", ")} · Weather: {h.weather?.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Drops */}
        {pal.drops && pal.drops.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Drops
            </h2>
            <ul className="flex flex-wrap gap-3">
              {pal.drops.map((d, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {d.item.replace(/_/g, " ")}
                  <span className="ml-2 text-xs text-slate-400">
                    {Math.round(d.probability * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Q&A */}
        <section className="mt-8" aria-label={`${pal.name} frequently asked questions`}>
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            {pal.name} — Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <dt className="text-sm font-black text-slate-900 dark:text-white">{item.q}</dt>
                <dd className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.a}</dd>
              </div>
            ))}
          </dl>
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
