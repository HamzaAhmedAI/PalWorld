"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { digimonPack } from "@/lib/engine/packs/digimon";
import { findPlans } from "@/lib/engine/graph";
import { getDigimonSlug } from "@/lib/digimonSlug";
import { DIGIMON_CREATURES } from "@/data/digimon";

const sorted = [...DIGIMON_CREATURES].sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function DigimonPlanner() {
  const [target, setTarget] = useState<string>("Omnimon");
  const plans = useMemo(
    () =>
      target
        ? findPlans(digimonPack, target, { maxPlans: 3, maxSteps: 8 })
        : [],
    [target],
  );
  const best = plans[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <label
        htmlFor="digimon-target"
        className="text-xs font-bold uppercase tracking-wider text-slate-400"
      >
        I want to digivolve into…
      </label>
      <select
        id="digimon-target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 dark:border-white/15 dark:bg-[#0a0a0a] dark:text-white"
      >
        {sorted.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {target && plans.length === 0 && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {target} is an In-Training I Digimon — a starting form. Scan or
          convert one, then digivolve it upward.
        </p>
      )}

      {best && (
        <div className="mt-5">
          <h3 className="text-sm font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Shortest path · {best.steps.length}{" "}
            {best.steps.length === 1 ? "step" : "steps"}
          </h3>
          <ol className="mt-3 space-y-3">
            {best.steps.map((s, i) => (
              <li
                key={i}
                className="rounded-xl border border-slate-200 p-4 dark:border-white/10"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  {s.inputs.map((inp, j) => (
                    <span key={inp.id} className="flex items-center gap-2">
                      {j > 0 && <span aria-hidden>+</span>}
                      <Link
                        href={`/digimon/${getDigimonSlug({ name: inp.name })}`}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {inp.name}
                      </Link>
                    </span>
                  ))}
                  <span aria-hidden>→</span>
                  <Link
                    href={`/digimon/${getDigimonSlug({ name: s.output.name })}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {s.output.name}
                  </Link>
                  {s.inputs.length === 2 && (
                    <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-bold text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">
                      DNA Digivolution
                    </span>
                  )}
                </div>
                {s.conditions && s.conditions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.conditions.map((c, j) => (
                      <span
                        key={j}
                        className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Requirements belong to the Digimon being digivolved INTO, and
            de-digivolving back down is always free. Open the{" "}
            <Link
              href={`/digimon/${getDigimonSlug({ name: target })}`}
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {target} page
            </Link>{" "}
            for every route, not just the shortest.
          </p>
        </div>
      )}
    </div>
  );
}
