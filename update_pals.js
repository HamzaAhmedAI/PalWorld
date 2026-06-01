const fs = require('fs');

try {
  const mdContent = fs.readFileSync('C:\\Users\\Hamza\\.gemini\\antigravity\\brain\\fa56cfe7-f366-42c9-9fc9-cc9d5f850fff\\.system_generated\\steps\\150\\content.md', 'utf8');

  const jsonStart = mdContent.indexOf('[');
  const jsonEnd = mdContent.lastIndexOf(']') + 1;
  const jsonStr = mdContent.substring(jsonStart, jsonEnd);

  const rawPals = JSON.parse(jsonStr);

  const pals = rawPals.map(p => {
    return {
      id: String(p.id),
      name: p.name,
      type1: p.types[0]?.name.charAt(0).toUpperCase() + p.types[0]?.name.slice(1) || "Neutral",
      type2: p.types[1] ? p.types[1].name.charAt(0).toUpperCase() + p.types[1].name.slice(1) : undefined,
      breedingPower: p.breeding?.rank || 0,
      image: `https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/public/images/paldeck/${p.key}.png`,
      rarity: p.rarity || 1
    };
  });

  const currentPalsTs = fs.readFileSync('data/pals.ts', 'utf8');
  
  // Extract interface
  const interfaceMatch = currentPalsTs.match(/export interface Pal \{[\s\S]*?\}/);
  // Extract unique combos
  const combosMatch = currentPalsTs.match(/export const UNIQUE_COMBOS[\s\S]*?\};/);

  let output = '';
  if (interfaceMatch) {
    output += interfaceMatch[0] + '\n\n';
  } else {
    output += `export interface Pal {
  id: string;
  name: string;
  type1: string;
  type2?: string;
  breedingPower: number;
  image: string;
  rarity: number;
}\n\n`;
  }

  output += 'export const PALS: Pal[] = [\n';
  pals.forEach(p => {
    const pStr = JSON.stringify(p);
    // Remove quotes around keys for better readability if desired, but JSON.stringify is fine.
    output += `  ${pStr},\n`;
  });
  output += '];\n\n';

  if (combosMatch) {
    output += combosMatch[0] + '\n';
  } else {
    output += `export const UNIQUE_COMBOS: Record<string, string> = {
  "Nitewing+Vanwyrm": "Anubis",
  "Penking+Bushi": "Anubis",
  "Relaxaurus+Sparkit": "Orserk",
  "Mossanda+Vanwyrm": "Rayhound",
};\n`;
  }

  fs.writeFileSync('data/pals.ts', output);
  console.log('Successfully updated data/pals.ts with ' + pals.length + ' pals.');
} catch (e) {
  console.error(e);
}
