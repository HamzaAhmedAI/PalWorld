import { ANIIMO_CREATURES, type AniimoCreature } from "@/data/aniimo";
import { slugify } from "@/lib/palSlug";

export function getAniimoSlug(c: Pick<AniimoCreature, "name">): string {
  return slugify(c.name);
}

const bySlug = new Map<string, AniimoCreature>(
  ANIIMO_CREATURES.map((c) => [getAniimoSlug(c), c]),
);

export function getAniimoBySlug(slug: string): AniimoCreature | undefined {
  return bySlug.get(slug);
}

export function allAniimoSlugs(): string[] {
  return [...bySlug.keys()];
}

export const STAGE_NAMES: Record<number, string> = {
  1: "Lumin",
  2: "Gamma",
  3: "Nova",
  4: "Legendary",
};

export function stageName(stage: number | null): string {
  if (stage == null) return "Unknown stage";
  return STAGE_NAMES[stage] ?? `Stage ${stage}`;
}
