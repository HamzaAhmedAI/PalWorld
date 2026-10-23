"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { aniimoPack } from "@/lib/engine/packs/aniimo";
import { findPlans } from "@/lib/engine/graph";
import { getAniimoSlug } from "@/lib/aniimoSlug";
import { ANIIMO_CREATURES } from "@/data/aniimo";

const sorted = [...ANIIMO_CREATURES].sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function AniimoPlanner() {
  const [target, setTarget] = useState<string>("Scorchhowl");
  const plans = useMemo(
    () => (target ? findPlans(aniimoPack, target, { maxPlans: 4 }) : []),
    [target],
  );
  const best = plans[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <label
        htmlFor="aniimo-target"
        className="text-xs font-bold uppercase tracking-wider text-slate-400"
      >
        I want to evolve into…
      </label>
      <select
        id="aniimo-target"
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
          {target} is a base form — it does not evolve from anything. Catch it
          in the wild, then evolve it onward.
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
                  <Link
                    href={`/aniimo/${getAniimoSlug({ name: s.inputs[0].name })}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {s.inputs[0].name}
                  </Link>
                  <span aria-hidden>→</span>
                  <Link
                    href={`/aniimo/${getAniimoSlug({ name: s.output.name })}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {s.output.name}
                  </Link>
                </div>
                {s.conditions && s.conditions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.conditions.map((c, j) => (
                      <span
                        key={j}
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
                )}
              </li>
            ))}
          </ol>
          {plans.length > 1 && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {plans.length - 1} alternative route
              {plans.length > 2 ? "s" : ""} exist — open the{" "}
              <Link
                href={`/aniimo/${getAniimoSlug({ name: target })}`}
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {target} page
              </Link>{" "}
              to compare them.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
