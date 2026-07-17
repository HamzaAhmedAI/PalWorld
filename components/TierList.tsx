import Link from "next/link";
import { PALS } from "@/data/pals";
import { getPalSlug } from "@/lib/palSlug";

export interface Tier {
  label: string;
  /** Tailwind classes for the tier badge. */
  accent: string;
  blurb?: string;
  pals: string[];
}

export function TierList({ tiers }: { tiers: Tier[] }) {
  const slugByName = new Map(PALS.map((p) => [p.name.toLowerCase(), getPalSlug(p)]));

  return (
    <div className="space-y-8">
      {tiers.map((tier) => (
        <section key={tier.label} aria-label={`${tier.label} Pals`}>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className={`rounded-xl px-3 py-1 text-sm font-black ${tier.accent}`}>
              {tier.label}
            </span>
            {tier.blurb && (
              <span className="text-xs font-medium text-slate-500">{tier.blurb}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tier.pals.map((name) => {
              const slug = slugByName.get(name.toLowerCase());
              if (slug) {
                return (
                  <Link
                    key={name}
                    href={`/pals/${slug}`}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 transition-all hover:border-indigo-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {name}
                  </Link>
                );
              }
              return (
                <span
                  key={name}
                  className="rounded-xl border border-dashed border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-400 dark:border-white/10"
                  title="Not yet in the Paldex"
                >
                  {name}
                </span>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
