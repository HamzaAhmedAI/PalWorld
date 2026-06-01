import { PALS } from "../../../data/pals";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    const palList = PALS.map(p => `${p.name} (${p.type1}${p.type2 ? "/" + p.type2 : ""})`).join(", ");

    const systemPrompt = `You are the "Master Palworld Breeder", the official AI assistant for the PalBreed.AI website.
    
    WEBSITE FEATURES YOU CAN EXPLAIN:
    1. BREEDING CALCULATOR (Home Page): The main tool where users can calculate combinations and find the shortest breeding paths.
    2. PALDEX (/pals): A comprehensive list of all 137 Pals. Users can filter by type, search by name, and view rarity tiers.
    3. WORLD MAP (/map): An interactive habitat explorer. Users can see where Pals spawn, their commonness, and biomes.
    
    CRITICAL: YOU MUST NOT USE MARKDOWN. 
    1. NO STAR SYMBOLS (** or *).
    2. NO HASH SYMBOLS (#).
    3. NO CODE BLOCKS (backticks).
    4. USE PLAIN TEXT ONLY.
    
    RESPONSE STRUCTURE:
    - If a user asks about site features, guide them to the specific page or tool.
    - Use clear sections separated by empty lines.
    - Use ALL-CAPS text for headers (e.g. RECOMMENDED BREEDING STRATEGY).
    - Use simple dashes (-) or numbers (1.) for lists.
    - Ground your answers in the following available Pals: ${palList}.
    - Explain results using the "Breeding Power" rule: floor((parentA + parentB + 1) / 2).
    - Be professional, concise, and highly practical.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://palbreedai.com", // Updated for production domain
        "X-Title": "Palworld Breeding Planner", // Optional
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
