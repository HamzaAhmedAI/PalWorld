"use client";

import { Check } from "lucide-react";
import type { Pal } from "@/data/pals";
import { usePalbox } from "./PalboxProvider";

interface PalboxToggleProps {
  pal: Pal;
  className?: string;
}

/** A small "add/remove from Palbox" checkbox button for a single Pal. */
export function PalboxToggle({ pal, className = "" }: PalboxToggleProps) {
  const { isOwned, toggleOwned } = usePalbox();
  const owned = isOwned(pal.id);

  return (
    <button
      type="button"
      aria-pressed={owned}
      aria-label={owned ? `Remove ${pal.name} from Palbox` : `Add ${pal.name} to Palbox`}
      onClick={(e) => {
        e.stopPropagation();
        toggleOwned(pal.id);
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
        owned
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "border-slate-200 bg-slate-100 text-slate-500 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5"
      } ${className}`}
    >
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
          owned
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 dark:border-white/20"
        }`}
      >
        {owned && <Check size={10} strokeWidth={3} />}
      </span>
      Box
    </button>
  );
}
