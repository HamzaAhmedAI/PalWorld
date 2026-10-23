import { DIGIMON_CREATURES, type DigimonCreature } from "@/data/digimon";
import { slugify } from "@/lib/palSlug";

export function getDigimonSlug(c: Pick<DigimonCreature, "name">): string {
  return slugify(c.name);
}

const bySlug = new Map<string, DigimonCreature>(
  DIGIMON_CREATURES.map((c) => [getDigimonSlug(c), c]),
);

export function getDigimonBySlug(slug: string): DigimonCreature | undefined {
  return bySlug.get(slug);
}

export function allDigimonSlugs(): string[] {
  return [...bySlug.keys()];
}

export const STAGE_ORDER = [
  "In-Training I",
  "In-Training II",
  "Rookie",
  "Champion",
  "Armor",
  "Hybrid",
  "Ultimate",
  "Mega",
  "Mega+",
  "Mega+ Ⅱ",
];
