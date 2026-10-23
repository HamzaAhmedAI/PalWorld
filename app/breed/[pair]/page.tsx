import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  pairPageManifest,
  getPairPage,
  producersByChild,
  isBasePal,
  pairSlug,
} from "@/lib/pairPages";
import { GENDER_DEPENDENT_COMBOS } from "@/data/specials";
import { getPalSlug } from "@/lib/palSlug";
import { SafeImage } from "@/components/SafeImage";

export const revalidate = 86400;

export function generateStaticParams() {
  return pairPageManifest().map((e) => ({ pair: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const entry = getPairPage(decodeURIComponent(pair));
  if (!entry) return { title: "Breeding pair not found — PalBreed.AI" };
  const title = `${entry.a.name} + ${entry.b.name} = ${entry.child.name} — Palworld 1.0 Breeding`;
  const description = `What do you get from breeding ${entry.a.name} with ${entry.b.name} in Palworld 1.0? ${entry.child.name}. See the formula, whether it's a unique combo, the easiest alternative pairs for ${entry.child.name}, and how to breed the parents.`;
  return {
    title,
    description,
    alternates: { canonical: `https://palbreedai.com/breed/${entry.slug}` },
    openGraph: {
      title: `${title} | PalBreed.AI`,
      description,
      url: `https://palbreedai.com/breed/${entry.slug}`,
    },
  };
}

export default async function PairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const entry = getPairPage(decodeURIComponent(pair));
  if (!entry) notFound();
  const { a, b, child } = entry;

  const genderInfo = GENDER_DEPENDENT_COMBOS.find(
    (g) =>
      (g.parents[0] === a.name && g.parents[1] === b.name) ||
      (g.parents[0] === b.name && g.parents[1] === a.name),
  );

  const producers = producersByChild().get(child.name) ?? [];
  const manifestSlugs = new Set(pairPageManifest().map((e) => e.slug));
  const alternatives = producers
    .filter(
      (p) =>
        !(p.a.name === a.name && p.b.name === b.name) &&
        !(p.a.name === b.name && p.b.name === a.name),
    )
    .slice(0, 8);

  const parentRecipes = [a, b]
    .filter((p) => !isBasePal(p))
    .map((p) => ({
      pal: p,
      easiest: (producersByChild().get(p.name) ?? [])[0],
    }))
    .filter((r) => r.easiest);

  const target = Math.floor((a.breedingPower + b.breedingPower + 1) / 2);

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-[#050505] dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs font-bold uppercase tracking-wider text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/pals" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Pals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">
            {a.name} + {b.name}
          </span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {a.name} + {b.name} = {child.name}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            In Palworld 1.0, breeding <strong>{a.name}</strong> with{" "}
            <strong>{b.name}</strong> hatches <strong>{child.name}</strong>.
            {entry.kind === "unique" &&
              " This is an official unique combo — it overrides the breeding formula entirely, and it is the only way this pair produces this child."}
            {entry.kind === "gender" &&
              " This pair is gender-dependent: which child hatches depends on which parent is male and which is female."}
            {entry.kind === "formula" &&
              " The result comes from the 1.0 breeding formula, shown in full below."}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Palworld 1.0 · build 24575149 · verified against the full
            44,551-pair breeding table
          </p>
        </header>

        <section className="mb-10 flex items-center justify-center gap-3 sm:gap-5">
          {[
            { pal: a, href: `/pals/${getPalSlug(a)}` },
            { pal: b, href: `/pals/${getPalSlug(b)}` },
          ].map(({ pal, href }, i) => (
            <div key={pal.name} className="flex items-center gap-3 sm:gap-5">
              {i === 1 && (
                <span className="text-2xl font-black text-slate-400">+</span>
              )}
              <Link href={href} className="group text-center">
                <SafeImage
                  src={pal.image}
                  alt={pal.name}
                  width={96}
                  height={96}
                  className="mx-auto h-20 w-20 rounded-2xl object-cover sm:h-24 sm:w-24"
                />
                <span className="mt-2 block text-sm font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {pal.name}
                </span>
              </Link>
            </div>
          ))}
          <span className="text-2xl font-black text-slate-400">=</span>
          <Link href={`/pals/${getPalSlug(child)}`} className="group text-center">
            <SafeImage
              src={child.image}
              alt={child.name}
              width={96}
              height={96}
              className="mx-auto h-20 w-20 rounded-2xl object-cover ring-2 ring-indigo-500 sm:h-24 sm:w-24"
            />
            <span className="mt-2 block text-sm font-bold text-indigo-600 group-hover:underline dark:text-indigo-400">
              {child.name}
            </span>
          </Link>
        </section>

        {genderInfo && (
          <section className="mb-10 rounded-2xl border border-amber-500/40 bg-amber-50 p-5 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
            <strong>Gender decides the child:</strong> a male {a.name} with a
            female {b.name} (or the reverse) hatches a different Pal. This
            pair can produce {genderInfo.genderChildren.join(" or ")},
            depending on the parents&apos; genders. {child.name} is the
            primary outcome.
          </section>
        )}

        <section className="mb-10 rounded-2xl border border-slate-200 p-6 dark:border-white/10">
          <h2 className="mb-3 text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Why {child.name}? The formula
          </h2>
          {entry.kind === "unique" ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Unique combos are hard-coded by the game (the
              DT_PalCombiUnique table) and ignore breeding power completely.
              No other pair of parents is guaranteed this result through the
              formula — and this pair will never hatch anything else
              (mutation aside).
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Each Pal has a hidden breeding power (CombiRank). The child is
              the formula-pool Pal closest to the parents&apos; average: (
              {a.name} {a.breedingPower} + {b.name} {b.breedingPower} + 1) / 2
              = target <strong>{target}</strong>. {child.name}&apos;s power
              is <strong>{child.breedingPower}</strong> — the closest match
              in the pool. On an exact tie the game picks the higher-power
              Pal.
            </p>
          )}
        </section>

        {alternatives.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Easiest other ways to breed {child.name}
            </h2>
            <div className="space-y-2">
              {alternatives.map((p) => {
                const slug = pairSlug(p.a.name, p.b.name);
                const inner = (
                  <>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {p.a.name} + {p.b.name}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {isBasePal(p.a) && isBasePal(p.b)
                        ? "both parents wild-caught"
                        : `parent rarity ${p.a.rarity} + ${p.b.rarity}`}
                    </span>
                  </>
                );
                return manifestSlugs.has(slug) ? (
                  <Link
                    key={slug}
                    href={`/breed/${slug}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:border-indigo-500/50 dark:border-white/10"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {producers.length.toLocaleString()} pairs in total produce{" "}
              {child.name} in 1.0. The full list lives on the{" "}
              <Link
                href={`/pals/${getPalSlug(child)}`}
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {child.name} page
              </Link>
              .
            </p>
          </section>
        )}

        {parentRecipes.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Don&apos;t have the parents yet?
            </h2>
            <div className="space-y-3">
              {parentRecipes.map(({ pal, easiest }) => (
                <p
                  key={pal.name}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400"
                >
                  The easiest way to breed{" "}
                  <strong className="text-slate-900 dark:text-white">
                    {pal.name}
                  </strong>{" "}
                  is {easiest!.a.name} + {easiest!.b.name}. See every route on
                  the{" "}
                  <Link
                    href={`/pals/${getPalSlug(pal)}`}
                    className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    {pal.name} page
                  </Link>
                  .
                </p>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Plan the full route
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Need {child.name} from scratch — or a god-roll with the right
            passives and IVs? The planner walks the whole tree from
            wild-caught parents.
          </p>
          <Link
            href="/#calculator"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Open the breeding planner
          </Link>
        </section>
      </div>
    </main>
  );
}
