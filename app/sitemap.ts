import { MetadataRoute } from "next";
import { PALS } from "@/data/pals";
import { slugify } from "@/lib/palSlug";
import { ANIIMO_CREATURES } from "@/data/aniimo";
import { getAniimoSlug } from "@/lib/aniimoSlug";
import { pairPageManifest } from "@/lib/pairPages";
import { DIGIMON_CREATURES } from "@/data/digimon";
import { getDigimonSlug } from "@/lib/digimonSlug";

const BASE = "https://palbreedai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/pals`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/aniimo`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tools/god-roll`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/digimon`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/map`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/breeding/routes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tier-lists`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tier-lists/combat`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tier-lists/overall`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tier-lists/mounts`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tier-lists/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/whats-changed-1-0`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/mutation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/work-suitability`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/awakening`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/combat-passives`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides/best-passive-skills`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides/cake-recipe`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides/essence-condenser`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides/best-base-pals`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides/breeding-combos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/compare/jetragon-vs-necromus`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/jormuntide-ignis-vs-blazamut`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/frostallion-vs-paladius`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/anubis-vs-shadowbeak`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/jetragon-vs-frostallion`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/blazamut-ryu-vs-xenolord`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/necromus-vs-paladius`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/grizzbolt-vs-orserk`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/suzaku-vs-faleris`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/shadowbeak-vs-lyleen-noct`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/xenolord-vs-bellanoir-libero`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/compare/bastigor-vs-astagon`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const palRoutes: MetadataRoute.Sitemap = PALS.map((pal) => ({
    url: `${BASE}/pals/${slugify(pal.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const aniimoRoutes: MetadataRoute.Sitemap = ANIIMO_CREATURES.map((c) => ({
    url: `${BASE}/aniimo/${getAniimoSlug(c)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const pairRoutes: MetadataRoute.Sitemap = pairPageManifest().map((e) => ({
    url: `${BASE}/breed/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const digimonRoutes: MetadataRoute.Sitemap = DIGIMON_CREATURES.map((c) => ({
    url: `${BASE}/digimon/${getDigimonSlug(c)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...palRoutes,
    ...aniimoRoutes,
    ...pairRoutes,
    ...digimonRoutes,
  ];
}
