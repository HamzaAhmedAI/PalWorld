"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PALS } from "@/data/pals";
import { getPalSlug } from "@/lib/palSlug";

const sorted = [...PALS].sort((a, b) => a.name.localeCompare(b.name));

export function FusionPicker({
  initialA,
  initialB,
}: {
  initialA?: string;
  initialB?: string;
}) {
  const router = useRouter();
  const [a, setA] = useState(initialA ?? "Anubis");
  const [b, setB] = useState(initialB ?? "Lamball");

  const selectCls =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 dark:border-white/15 dark:bg-[#0a0a0a] dark:text-white";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fusion-a" className="text-xs font-bold uppercase tracking-wider text-slate-400">
            First parent
          </label>
          <select id="fusion-a" value={a} onChange={(e) => setA(e.target.value)} className={selectCls}>
            {sorted.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fusion-b" className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Second parent
          </label>
          <select id="fusion-b" value={b} onChange={(e) => setB(e.target.value)} className={selectCls}>
            {sorted.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={() =>
          router.push(
            `/breed-my-pal?a=${getPalSlug(sorted.find((p) => p.name === a)!)}&b=${getPalSlug(sorted.find((p) => p.name === b)!)}`,
          )
        }
        className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-black uppercase tracking-wider text-white hover:bg-indigo-500"
      >
        Fuse them
      </button>
      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        Every pair has one true fusion — the link is the share card. Send it
        to a friend and you will both see the same result.
      </p>
    </div>
  );
}
