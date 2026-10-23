import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ANIIMO_EDGES } from "@/data/aniimo";
import { aniimoPack } from "@/lib/engine/packs/aniimo";
import { findPlans, producersOf } from "@/lib/engine/graph";
import {
  allAniimoSlugs,
  getAniimoBySlug,
  getAniimoSlug,
  stageName,
} from "@/lib/aniimoSlug";

export const revalidate = 86400;

export function generateStaticParams() {
  return allAniimoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getAniimoBySlug(slug);
  if (!c) return { title: "Aniimo not found — PalBreed.AI" };
  const title = `${c.name} Evolution — How to Get ${c.name} in Aniimo`;
  const description = `How to evolve into ${c.name} in Aniimo: the full path from its base form, with the level gate, stone, deed or talent required at every step. ${c.name} is a ${stageName(c.stage)}-stage Aniimo.`;
  return {
    title,
    description,
    alternates: { canonical: `https://palbreedai.com/aniimo/${slug}` },
    openGraph: {
      title: `${title} | PalBreed.AI`,
      description,
      url: `https://palbreedai.com/aniimo/${slug}`,
    },
  };
}

function ConditionChips({
  conditions,
}: {
  conditions?: Array<{ kind: string; label: string }>;
}) {
  if (!conditions?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {conditions.map((c, i) => (
        <span
          key={i}
          className={
            c.kind === "unverified"
              ? "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"
              : "rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
          }
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default async function AniimoCreaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creature = getAniimoBySlug(slug);
  if (!creature) notFound();

  const incoming = producersOf(aniimoPack, creature.name);
  const outgoing = ANIIMO_EDGES.filter((e) => e.from === creature.name);
  const plans = findPlans(aniimoPack, creature.name, { maxPlans: 4 });
  const edgeByPair = new Map(
    aniimoPack.edges.map((e) => [`${e.from[0]}->${e.to}`, e]),
  );
  const unverified = incoming.some((e) =>
    e.conditions?.some((c) => c.kind === "unverified"),
  );

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
          <Link href="/aniimo" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Aniimo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-indigo-600 dark:text-indigo-400">{creature.name}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/10 text-2xl font-black text-indigo-600 dark:text-indigo-400"
            >
              {creature.name.slice(0, 1)}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {creature.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {creature.dex ? `#${creature.dex} · ` : ""}
                {stageName(creature.stage)} stage
                {creature.elements.length
                  ? ` · ${creature.elements.join(" / ")}`
                  : ""}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Data: {aniimoPack.dataVersion}
          </p>
        </header>

        {unverified && (
          <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-50 p-5 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
            <strong>Data note:</strong> this evolution is confirmed, but no
            source publishes its exact requirements yet, so the step below is
            marked unverified rather than guessed. We update conditions as
            soon as a datamined source confirms them.
          </div>
        )}

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How to get {creature.name}
          </h2>
          {incoming.length === 0 ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {creature.name} is a base form — it does not evolve from
              anything.
              {creature.habitats.length > 0 && (
                <>
                  {" "}
                  Find it in the wild: {creature.habitats.join(", ")}.
                </>
              )}
            </p>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {plans.length > 1
                  ? `${plans.length} routes lead here. The shortest is shown first.`
                  : "One route leads here:"}
              </p>
              <div className="space-y-6">
                {plans.map((plan, pi) => (
                  <div
                    key={pi}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"
                  >
                    <h3 className="text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Route {pi + 1} · {plan.steps.length}{" "}
                      {plan.steps.length === 1 ? "step" : "steps"}
                    </h3>
                    <ol className="mt-3 space-y-3">
                      {plan.steps.map((s, i) => {
                        const edge = edgeByPair.get(
                          `${s.inputs[0].id}->${s.output.id}`,
                        );
                        return (
                          <li key={i} className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">
                              <Link
                                href={`/aniimo/${getAniimoSlug({ name: s.inputs[0].name })}`}
                                className="hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {s.inputs[0].name}
                              </Link>
                              {" → "}
                              <Link
                                href={`/aniimo/${getAniimoSlug({ name: s.output.name })}`}
                                className="hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {s.output.name}
                              </Link>
                            </span>
                            <ConditionChips conditions={edge?.conditions} />
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {outgoing.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {creature.name} evolves into
            </h2>
            <div className="space-y-3">
              {outgoing.map((e) => {
                const edge = edgeByPair.get(`${e.from}->${e.to}`);
                return (
                  <div
                    key={e.to}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"
                  >
                    <Link
                      href={`/aniimo/${getAniimoSlug({ name: e.to })}`}
                      className="font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                    >
                      {e.to}
                    </Link>
                    <ConditionChips conditions={edge?.conditions} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {creature.habitats.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Where to find {creature.name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {creature.habitats.join(", ")}
            </p>
          </section>
        )}

        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Plan another evolution
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Every Aniimo, every path, every condition — back to the planner.
          </p>
          <Link
            href="/aniimo"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Open the Aniimo evolution planner
          </Link>
        </section>
      </div>
    </main>
  );
}
