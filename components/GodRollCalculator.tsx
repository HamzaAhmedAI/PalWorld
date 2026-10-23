"use client";

import { useMemo, useState } from "react";
import {
  CAKES,
  chanceAtLeastOne,
  expectedAttempts,
  attemptsForConfidence,
  godRollOdds,
  type CakeType,
} from "@/lib/odds";
import { mutationChance } from "@/lib/breeding";

const pct = (p: number) =>
  p >= 0.1 ? `${(p * 100).toFixed(1)}%` : `${(p * 100).toFixed(2)}%`;

export function GodRollCalculator() {
  const [cake, setCake] = useState<CakeType>("deluxe");
  const [needsMutation, setNeedsMutation] = useState(true);
  const [eggs, setEggs] = useState(100);

  const cakeInfo = CAKES.find((c) => c.id === cake)!;
  const mutP = mutationChance(cake);
  const rolls = cake === "vegetable" ? eggs * 2 : eggs;
  const odds = useMemo(() => godRollOdds(cake, needsMutation), [cake, needsMutation]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cake" className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Breeding cake
          </label>
          <select
            id="cake"
            value={cake}
            onChange={(e) => setCake(e.target.value as CakeType)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 dark:border-white/15 dark:bg-[#0a0a0a] dark:text-white"
          >
            {CAKES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{cakeInfo.effect}</p>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={needsMutation}
              onChange={(e) => setNeedsMutation(e.target.checked)}
              className="h-4 w-4 accent-indigo-600"
            />
            My god-roll needs a mutation (rainbow) passive
          </label>

          <label htmlFor="eggs" className="mt-5 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Eggs I plan to hatch: {eggs}
          </label>
          <input
            id="eggs"
            type="range"
            min={1}
            max={500}
            value={eggs}
            onChange={(e) => setEggs(Number(e.target.value))}
            className="mt-2 w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Mutation odds
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Per egg: <strong className="text-slate-900 dark:text-white">{pct(mutP)}</strong>
              {" · "}expected eggs for one mutation:{" "}
              <strong className="text-slate-900 dark:text-white">
                {Math.round(expectedAttempts(mutP))}
              </strong>
              {" · "}90% sure within{" "}
              <strong className="text-slate-900 dark:text-white">
                {attemptsForConfidence(mutP, 0.9)}
              </strong>{" "}
              eggs
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Chance of at least one mutation in {rolls} rolls:{" "}
              <strong className="text-slate-900 dark:text-white">
                {pct(chanceAtLeastOne(mutP, rolls))}
              </strong>
              {cake === "vegetable" && " (Vegetable Cake = 2 eggs per cycle)"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              God-roll odds
            </h3>
            {odds.boost === null ? (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {cakeInfo.name} has no multi-passive inheritance boost, so a
                full-set god-roll follows standard inheritance — no single
                published rate, and we won&apos;t invent one. Switch to
                Deluxe (~20% boost) or Special Cake (~90% boost) to plan a
                multi-passive roll.
                {needsMutation &&
                  ` Your mutation odds above still apply: ${pct(mutP)} per egg.`}
              </p>
            ) : odds.perEgg !== null ? (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Per egg:{" "}
                <strong className="text-slate-900 dark:text-white">{pct(odds.perEgg)}</strong>{" "}
                ({pct(odds.boost)} inherit the passive set
                {needsMutation && <> × {pct(odds.mutationP)} mutation</>})
                {" · "}expected eggs:{" "}
                <strong className="text-slate-900 dark:text-white">
                  {Math.round(expectedAttempts(odds.perEgg))}
                </strong>
                {" · "}chance in {rolls} rolls:{" "}
                <strong className="text-slate-900 dark:text-white">
                  {pct(chanceAtLeastOne(odds.perEgg, rolls))}
                </strong>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
