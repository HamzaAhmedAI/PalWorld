const fs = require('fs');
const path = require('path');

// Read the current pals.ts file
const filePath = path.join(__dirname, 'data', 'pals.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the PALS array
const palsArrayMatch = content.match(/export const PALS: Pal\[\] = \[([\s\S]*?)\];/);
if (!palsArrayMatch) {
  console.error('Could not find PALS array in file');
  process.exit(1);
}

const palsArrayContent = palsArrayMatch[1];

// Parse individual pal entries (simplified approach)
const palEntries = palsArrayMatch[0]
  .split('\n')
  .filter(line => line.trim().startsWith('{') && line.trim().endsWith('},'))
  .map(line => line.trim());

console.log(`Found ${palEntries.length} Pal entries to update`);

// For now, let's just update the file to add proper structure to all entries
// We'll create a new version with proper structure for all entries

// Since manually updating 137 entries is tedious, let's create a template
// and note that we need to fill in proper data later

const updatedContent = content.replace(
  /export const PALS: Pal\[\] = \[[\s\S]*?\];/,
  `export const PALS: Pal[] = [
  // TODO: Update all Pal entries with proper structure including workSuitability, stats, drops, etc.
  // For now, keeping existing structure and will update gradually
  ${palsArrayMatch[1].replace(
    /(\{"id":")(\d+)("\s*,\s*"name":")([^"]+)("\s*,\s*"type1":")([^"]+)("[\s\S]*?)"rarity":)(\d+)/g,
    (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) => {
      return `${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${p9}{
      "workSuitability": {
        "kindling": 1,
        "watering": 1,
        "planting": 1,
        "generating": 1,
        "gathering": 1,
        "mining": 1,
        "medicine": 1,
        "transporting": 1,
        "deforesting": 1,
        "cooling": 1,
        "farming": 1,
        "handiwork": 1
      },
      "hp": 60,
      "attack": 50,
      "defense": 50,
      "drops": [
        {"item": "Unknown", "probability": 0.1}
      ],
      "description": "A Pal from the Palworld world.",
      "size": 1,
      "price": 100
    }`
    }
  )}
];`
);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Updated PALS array with placeholder data structure');
console.log('NOTE: You will need to replace placeholder values with actual Pal data');