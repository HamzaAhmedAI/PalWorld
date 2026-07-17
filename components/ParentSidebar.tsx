"use client";

import { Check } from "lucide-react";
import type { Pal } from "@/data/pals";
import { SafeImage } from "./SafeImage";

interface ParentSidebarProps {
  parents: Pal[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onClear: () => void;
}

/** Sidebar listing each distinct parent Pal (from all paths) as a checkbox. */
export function ParentSidebar({
  parents,
  selected,
  onToggle,
  onClear,
}: ParentSidebarProps) {
  if (parents.length === 0) return null;

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Parent Pals
          </h4>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-[10px] font-bold text-slate-400 transition-colors hover:text-indigo-600"
            >
              Clear
            </button>
          )}
        </div>
        <ul className="max-h-[60vh] space-y-1.5 overflow-y-auto pr-1">
          {parents.map((p) => {
            const active = selected.has(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onToggle(p.id)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-2 rounded-xl border px-2 py-1.5 text-left transition-all ${
                    active
                      ? "border-indigo-500/40 bg-indigo-500/10"
                      : "border-slate-200 bg-white hover:border-indigo-500/30 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      active
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-slate-300 dark:border-white/20"
                    }`}
                  >
                    {active && <Check size={11} strokeWidth={3} />}
                  </span>
                  <SafeImage
                    src={p.image}
                    alt={p.name}
                    width={28}
                    height={28}
                    className="shrink-0 rounded-lg"
                  />
                  <span className="truncate text-xs font-bold text-slate-700 dark:text-slate-200">
                    {p.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
