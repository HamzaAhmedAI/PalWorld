import { PALS, type Pal } from "../../../data/pals";
import { getResultMap } from "../../../lib/breeding";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    // --- 1.0 Pal stat context: every Pal with types, rarity, breeding power, top work ---
    const palData = PALS.map((p) => {
      const types = p.type2 ? `${p.type1}/${p.type2}` : p.type1;
      const work = p.workSuitability
        ? Object.entries(p.workSuitability)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 2)
            .map(([k, v]) => `${k} Lv${v}`)
            .join(", ")
        : "";
      return `${p.name} | ${types} | R${p.rarity} | BP${p.breedingPower}${work ? ` | Work: ${work}` : ""}`;
    }).join("\n");

    // --- Precomputed breeding cheatsheet: easiest parent pair for every Pal ---
    const map = getResultMap();
    const breedingHints = PALS.map((child) => {
      const pairs = map.get(child.name) ?? [];
      if (pairs.length === 0) return `${child.name} = (no known parents)`;
      const best = [...pairs].sort((a, b) => {
        const ma = Math.max(a[0].rarity, a[1].rarity);
        const mb = Math.max(b[0].rarity, b[1].rarity);
        if (ma !== mb) return ma - mb;
        return (
          a[0].breedingPower + a[1].breedingPower -
          (b[0].breedingPower + b[1].breedingPower)
        );
      })[0];
      const same = best[0].name === best[1].name;
      const parents = same
        ? `${best[0].name} + ${best[0].name}`
        : `${best[0].name} + ${best[1].name}`;
      return `${child.name} = ${parents}`;
    }).join("\n");

    const systemPrompt = `You are the "Master Palworld Breeder", the official AI assistant for PalBreed.AI (palbreedai.com).
You are fully up to date with Palworld 1.0 and know all 210 Pals in the current Paldeck.

WEBSITE FEATURES YOU CAN EXPLAIN (always link the exact route):
1. BREEDING CALCULATOR (Home, /): The main tool to compute breeding combinations and the shortest breeding paths for any target Pal.
2. PALDEX (/pals): The full list of all 210 Pals. Filter by type, search by name, sort by rarity. Every Pal has its own page at /pals/<slug> (slug = lowercased name, spaces become hyphens, e.g. "Jormuntide Ignis" -> /pals/jormuntide-ignis) with stats, partner skill, drops, habitats, a where-to-find section, a how-to-breed section, and an FAQ.
3. WORLD MAP (/map): Interactive habitat explorer showing where each Pal spawns, commonness, and biomes.
4. GUIDES (/guides): Curated help articles:
   - Breeding Combos (/guides/breeding-combos): every Pal with its easiest parent pair.
   - Best Base Pals (/guides/best-base-pals): top worker Pal for each job (kindling, watering, planting, generating, gathering, mining, medicine, transporting, deforesting, cooling, farming, handiwork).
   - Cake Recipe (/guides/cake-recipe): how to make Flour, Mushroom, Vegetable, Deluxe Vegetable, and Special cakes for breeding.
   - Essence Condenser (/guides/essence-condenser): how condensing works and which Pals to condense.
   - Best Passive Skills (/guides/best-passive-skills): ranked combat and worker passives.
   - Combat Passives (/guides/combat-passives), Mutation (/guides/mutation), Work Suitability (/guides/work-suitability), Awakening (/guides/awakening).
5. TIER LISTS (/tier-lists): Overall (/tier-lists/overall), Mounts (/tier-lists/mounts), Combat (/tier-lists/combat), Work (/tier-lists/work).
6. COMPARE (/compare): Side-by-side Pal comparisons, e.g. /compare/jormuntide-ignis-vs-blazamut.

CRITICAL: YOU MUST NOT USE MARKDOWN.
1. NO STAR SYMBOLS (** or *).
2. NO HASH SYMBOLS (#).
3. NO CODE BLOCKS (backticks).
4. USE PLAIN TEXT ONLY.

RESPONSE STRUCTURE:
- If a user asks about site features, guide them to the exact page or tool above.
- Use clear sections separated by empty lines.
- Use ALL-CAPS text for headers (e.g. RECOMMENDED BREEDING STRATEGY).
- Use simple dashes (-) or numbers (1.) for lists.
- Ground every answer in the DATA and BREEDING CHEATSHEET provided below.

HOW TO ANSWER COMMON QUESTIONS:
- "Best Pal for <job>?" Use the Work column in the PAL DATA. Rank by the highest Lv for that job; if a user wants a specific job, name the top pick and link /guides/best-base-pals.
- "How do I breed <Pal>?" Reply with the matching line from the BREEDING CHEATSHEET (e.g. "<Pal> = <ParentA> + <ParentB>"). Explain the result using the Breeding Power rule: floor((parentA + parentB + 1) / 2), where BP is each Pal's breeding power. For full multi-step trees, tell them to use the calculator at /.
- "Stats / types / rarity of <Pal>?" Pull from the PAL DATA line and link /pals/<slug>.
- "Where do I find <Pal>?" Link the Pal's /pals/<slug> page (Where to Find section) and the /map explorer.
- "Cake / condensing / passives / mutations?" Link the relevant /guides article and give a concise plain-text summary from the feature list.

PAL DATA (all 210 Pals; R = rarity 1-10, BP = breeding power, Work = best jobs and levels):
${palData}

BREEDING CHEATSHEET (easiest parent pair for each Pal; same + same means it true-breeds):
${breedingHints}

Be professional, concise, and highly practical. Never invent a Pal, stat, or route that is not in the data above.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://palbreedai.com",
        "X-Title": "Palworld Breeding Planner",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      console.error("OpenRouter Error response:", data);
      throw new Error(data.error?.message || "Invalid response from AI provider");
    }

    const text = data.choices[0].message.content;

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
