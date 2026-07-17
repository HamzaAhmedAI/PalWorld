import { PALS, Pal } from "@/data/pals";

/** Convert a Pal name into a URL-safe slug (e.g. "Tanzee Ignis" -> "tanzee-ignis"). */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPalSlug(pal: Pal): string {
  return slugify(pal.name);
}

// First-come map so the canonical (lowest-id) Pal wins any slug collision.
const PAL_BY_SLUG = new Map<string, Pal>();
for (const pal of PALS) {
  const slug = slugify(pal.name);
  if (!PAL_BY_SLUG.has(slug)) PAL_BY_SLUG.set(slug, pal);
}

export function getPalBySlug(slug: string): Pal | undefined {
  return PAL_BY_SLUG.get(slug);
}

export function allPalSlugs(): string[] {
  return Array.from(PAL_BY_SLUG.keys());
}
