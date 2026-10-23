import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DIGIMON_EDGES } from "@/data/digimon";
import { digimonPack, digimonDevolveEdges, isDnaResult } from "@/lib/engine/packs/digimon";
import { findPlans, producersOf } from "@/lib/engine/graph";
import {
  allDigimonSlugs,
  getDigimonBySlug,
  getDigimonSlug,
} from "@/lib/digimonSlug";

export const revalidate = 86400;

export function generateStaticParams() {
  return allDigimonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getDigimonBySlug(slug);
  if (!c) return { title: "Digimon not found — PalBreed.AI" };
  const title = `How to Get ${c.name} — Digimon Story: Time Stranger Digivolution`;
  const description = `How to digivolve into ${c.name} in Digimon Story: Time Stranger: every route from In-Training, with the Agent Rank, stat, item or DNA requirements for each step. ${c.name} is a ${c.stage} ${c.attribute} Digimon.`;
  return {
    title,
    description,
    alternates: { canonical: `https://palbreedai.com/digimon/${slug}` },
    openGraph: {
      title: `${title} | PalBreed.AI`,
      description,
      url: `https://palbreedai.com/digimon/${slug}`,
    },
  };
}

function Chips({
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
          className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

const link = (name: string) => `/digimon/${getDigimonSlug({ name })}`;

export default async function DigimonCreaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creature = getDigimonBySlug(slug);
  if (!creature) notFound();

  const incoming = producersOf(digimonPack, creature.name);
  const outgoing = DIGIMON_EDGES.filter(
    (e) => e.kind === "digivolve" && e.from[0] === creature.name,
  );
  const modeChanges = DIGIMON_EDGES.filter(
    (e) => e.kind === "modechange" && e.from[0] === creature.name,
  );
  const devolvesTo = digimonDevolveEdges
    .filter((e) => e.from[0] === creature.name)
    .map((e) => e.to);
  const plans = findPlans(digimonPack, creature.name, {
    maxPlans: 3,
    maxSteps: 8,
  });
  const edgeByKey = new Map(
    digimonPack.edges.map((e) => [`${e.from.join("+")}->${e.to}`, e]),
  );
  const dna = isDnaResult(creature.name);

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
          <Link href="/digimon" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Digimon
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
                #{creature.no} · {creature.stage} · {creature.attribute} ·{" "}
                {creature.type} · Personality: {creature.personality}
                {creature.dlc && " · DLC"}
              </p>
            </div>
          </div>
          {dna && (
            <p className="mt-4 rounded-2xl border border-fuchsia-500/40 bg-fuchsia-50 p-4 text-sm text-fuchsia-900 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
              <strong>DNA Digivolution:</strong> {creature.name} is not a
              normal digivolution — it needs two specific partners, each
              with the right personality, shown in the route below.
            </p>
          )}
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Data: {digimonPack.dataVersion}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
            How to get {creature.name}
          </h2>
          {incoming.length === 0 ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {creature.name} is an In-Training I Digimon — a starting
              form. Scan or convert one in the field, then digivolve it
              upward.
            </p>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                Requirements belong to {creature.name} itself — any route
                below must end by meeting them. De-digivolving is always
                free, so you can also reach pre-forms by coming down from
                anything above them.
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
                        const edge = edgeByKey.get(
                          `${s.inputs.map((x) => x.id).join("+")}->${s.output.id}`,
                        );
                        return (
                          <li key={i} className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {s.inputs.map((inp, j) => (
                                <span key={inp.id}>
                                  {j > 0 && " + "}
                                  <Link href={link(inp.name)} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                    {inp.name}
                                  </Link>
                                </span>
                              ))}
                              {" → "}
                              <Link href={link(s.output.name)} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                {s.output.name}
                              </Link>
                              {s.inputs.length === 2 && (
                                <span className="ml-2 rounded-full bg-fuchsia-100 px-2 py-0.5 text-xs font-bold text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">
                                  DNA
                                </span>
                              )}
                            </span>
                            <Chips conditions={edge?.conditions} />
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
              {creature.name} digivolves into
            </h2>
            <div className="flex flex-wrap gap-2">
              {outgoing.map((e) => (
                <Link
                  key={e.to}
                  href={link(e.to)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  {e.to}
                </Link>
              ))}
            </div>
          </section>
        )}

        {modeChanges.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Mode change
            </h2>
            <div className="flex flex-wrap gap-2">
              {modeChanges.map((e) => (
                <Link
                  key={e.to}
                  href={link(e.to)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  {e.to}
                </Link>
              ))}
            </div>
          </section>
        )}

        {devolvesTo.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
              De-digivolves into (free)
            </h2>
            <div className="flex flex-wrap gap-2">
              {devolvesTo.map((name) => (
                <Link
                  key={name}
                  href={link(name)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-indigo-400"
                >
                  {name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-50 p-6 dark:bg-indigo-500/10">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Plan another digivolution
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            All 476 Digimon, every path, every requirement — back to the
            planner.
          </p>
          <Link
            href="/digimon"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Open the Time Stranger planner
          </Link>
        </section>
      </div>
    </main>
  );
}
