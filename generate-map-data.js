// Script to generate map data for all Pals based on their types

const fs = require('fs');
const path = require('path');

// Read the pals data
const palsFilePath = path.join(__dirname, 'data', 'pals.ts');
let palsContent = fs.readFileSync(palsFilePath, 'utf8');

// Extract the PALS array
const palsArrayMatch = palsContent.match(/export const PALS: Pal\[\] = \[([\s\S]*?)\];/);
if (!palsArrayMatch) {
  console.error('Could not find PALS array in file');
  process.exit(1);
}

const palsArrayContent = palsArrayMatch[1];

// Parse individual pal entries
const palLines = palsArrayContent.split('\n')
  .filter(line => line.trim().startsWith('{') && line.trim().endsWith('},'))
  .map(line => line.trim());

console.log(`Found ${palLines.length} Pal entries`);

// Parse each pal entry to extract id, name, type1, type2
const pals = [];
palLines.forEach(line => {
  try {
    // Extract fields using regex
    const idMatch = line.match(/"id":"(\d+)"/);
    const nameMatch = line.match(/"name":"([^"]+)"/);
    const type1Match = line.match(/"type1":"([^"]+)"/);
    const type2Match = line.match(/"type2":"([^"]+)"/);

    if (idMatch && nameMatch && type1Match) {
      pals.push({
        id: idMatch[1],
        name: nameMatch[1],
        type1: type1Match[1],
        type2: type2Match ? type2Match[1] : null
      });
    }
  } catch (e) {
    console.warn(`Could not parse line: ${line}`);
  }
});

console.log(`Parsed ${pals.length} Pals`);

// Define habitat mappings based on elemental types
const typeToHabitat = {
  'Neutral': [
    { biome: 'grassland', regions: ['East Plains', 'West Plains', 'Plateau of Beginnings', 'Windswept Hills', 'Sea Breeze Archipelago'] },
    { biome: 'forest', regions: ['Whispering Woods', 'Ancient Forest', 'Goblin\'s Hill'] },
    { biome: 'urban', regions: ['Plateau of Beginnings'] }
  ],
  'Fire': [
    { biome: 'volcanic', regions: ['Volcano', 'Crater Lake', 'Desert Zone', 'Sand Dunes'] },
    { biome: 'grassland', regions: ['East Plains', 'West Plains', 'Sacred Mountain Foothills'] },
    { biome: 'desert', regions: ['Desert Zone', 'Sand Dunes', 'Oasis'] }
  ],
  'Water': [
    { biome: 'lake', regions: ['East Lake', 'West Lake'] },
    { biome: 'river', regions: ['Riverbank'] },
    { biome: 'coastal', regions: ['Sea Breeze Archipelago'] },
    { biome: 'jungle', regions: ['Southern Jungle'] } // Assuming some water types are near jungle
  ],
  'Grass': [
    { biome: 'forest', regions: ['Whispering Woods', 'Ancient Forest', 'Goblin\'s Hill'] },
    { biome: 'grassland', regions: ['East Plains', 'West Plains', 'Sacred Mountain Foothills'] },
    { biome: 'jungle', regions: ['Southern Jungle'] }
  ],
  'Electric': [
    { biome: 'grassland', regions: ['East Plains', 'West Plains'] },
    { biome: 'urban', regions: ['Plateau of Beginnings'] },
    { biome: 'forest', regions: ['Whispering Woods', 'Ancient Forest'] }
  ],
  'Ice': [
    { biome: 'snow', regions: ['Frostbound Mountains', 'Astral Mountain'] },
    { biome: 'mountain', regions: ['Mount Obsidian', 'Astral Mountain'] },
    { biome: 'forest', regions: ['Ancient Forest'] } // Some ice types in forests
  ],
  'Ground': [
    { biome: 'grassland', regions: ['East Plains', 'West Plains'] },
    { biome: 'desert', regions: ['Desert Zone', 'Sand Dunes', 'Oasis'] },
    { biome: 'canyon', regions: ['Mount Obsidian', 'Astral Mountain'] } // Assuming canyon areas near mountains
  ],
  'Dark': [
    { biome: 'forest', regions: ['Whispering Woods', 'Ancient Forest', 'Goblin\'s Hill'] },
    { biome: 'ruins', regions: ['Ruined Fortress City'] },
    { biome: 'underground', regions: [''] } // Will handle separately
  ],
  'Dragon': [
    { biome: 'mountain', regions: ['Mount Obsidian', 'Astral Mountain', 'Frostbound Mountains'] },
    { biome: 'volcanic', regions: ['Volcano', 'Crater Lake'] },
    { biome: 'forest', regions: ['Ancient Forest', 'Whispering Woods'] }
  ]
};

// Special case mappings for underground
const undergroundLocations = ['']; // We'll need to define these or leave empty for now

// Function to get appropriate habitats for a Pal
function getHabitatsForPal(pal) {
  const habitats = [];

  // Get habitats for type1
  if (typeToHabitat[pal.type1]) {
    typeToHabitat[pal.type1].forEach(habitatType => {
      // Select 1-2 random regions from the available ones for variety
      const regions = habitatType.regions;
      const numRegions = Math.min(2, regions.length);
      const selectedRegions = [];

      // Simple selection: take first few regions for consistency
      for (let i = 0; i < Math.min(numRegions, regions.length); i++) {
        selectedRegions.push(regions[i]);
      }

      selectedRegions.forEach(region => {
        habitats.push({
          biome: habitatType.biome,
          regionName: region,
          commonness: Math.random() > 0.7 ? 'rare' : Math.random() > 0.4 ? 'uncommon' : 'common',
          timeOfDay: Math.random() > 0.5 ? ['day', 'night'] : Math.random() > 0.3 ? ['day'] : ['night'],
          weather: Math.random() > 0.8 ? ['rain', 'sandstorm', 'snow'] : ['clear']
        });
      });
    });
  }

  // Add some habitats for type2 if it exists and is different from type1
  if (pal.type2 && pal.type2 !== pal.type1 && typeToHabitat[pal.type2]) {
    // Add fewer habitats for secondary type
    const secondaryHabitats = typeToHabitat[pal.type2];
    if (secondaryHabitats.length > 0) {
      const habitatType = secondaryHabitats[Math.floor(Math.random() * secondaryHabitats.length)];
      if (habitatType.regions.length > 0) {
        const region = habitatType.regions[0];
        habitats.push({
          biome: habitatType.biome,
          regionName: region,
          commonness: 'uncommon', // Secondary type habitats are less common
          timeOfDay: Math.random() > 0.5 ? ['day', 'night'] : ['day'],
          weather: ['clear']
        });
      }
    }
  }

  // Ensure we have at least one habitat
  if (habitats.length === 0) {
    habitats.push({
      biome: 'grassland',
      regionName: 'East Plains',
      commonness: 'common',
      timeOfDay: ['day', 'night'],
      weather: ['clear']
    });
  }

  return habitats;
}

// Function to get notable locations for a Pal
function getNotableLocationsForPal(pal, habitats) {
  // Extract unique region names from habitats
  const regionNames = [...new Set(habitats.map(h => h.regionName))];

  // Return up to 3 notable locations
  return regionNames.slice(0, 3);
}

// Generate the map data entries
const mapDataEntries = {};

pals.forEach(pal => {
  const habitats = getHabitatsForPal(pal);
  const notableLocations = getNotableLocationsForPal(pal, habitats);

  mapDataEntries[pal.id] = {
    habitats: habitats,
    notableLocations: notableLocations
  };
});

// Read the current map data file
const mapDataFilePath = path.join(__dirname, 'data', 'mapData.ts');
let mapDataContent = fs.readFileSync(mapDataFilePath, 'utf8');

// Replace the PAL_MAP_DATA section
const newMapDataContent = mapDataContent.replace(
  /export const PAL_MAP_DATA: Partial<Record<string, { habitats: Habitat\[\]; notableLocations?: string\[\]; }>> = \{[\s\S]*?\};/,
  `export const PAL_MAP_DATA: Partial<Record<string, { habitats: Habitat[]; notableLocations?: string[] }>> = {\n${Object.entries(mapDataEntries)
    .map(([id, data]) => {
      const habitatsStr = data.habitats.map(h =>
        `      { biome: '${h.biome}', regionName: '${h.regionName}', commonness: '${h.commonness}', timeOfDay: [${h.timeOfDay.map(t => `'${t}'`).join(', ')} ], weather: [${h.weather.map(w => `'${w}'`).join(', ')} ] }`
      ).join(',\n');

      const notableLocationsStr = data.notableLocations.length > 0
        ? `,\\n      notableLocations: [${data.notableLocations.map(loc => `'${loc}'`).join(', ')}]`
        : '';

      return `  "${id}": {\\n    habitats: [\\n${habitatsStr}\\n    ],${notableLocationsStr}\\n  }`;
    })
    .join(',\\n')
  \\n};`
);

// Write the updated content back to the file
fs.writeFileSync(mapDataFilePath, newMapDataContent, 'utf8');

console.log(`Generated map data for ${Object.keys(mapDataEntries).length} Pals`);
console.log('Map data generation complete!');