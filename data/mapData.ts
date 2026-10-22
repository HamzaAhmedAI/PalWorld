// Import Pal type and PALS array from pals.ts
import type { Pal } from './pals';
import { PALS } from './pals';

// Map regions and biomes for Palworld
export type Biome =
  | 'forest'
  | 'grassland'
  | 'desert'
  | 'snow'
  | 'volcanic'
  | 'river'
  | 'lake'
  | 'mountain'
  | 'canyon'
  | 'jungle'
  | 'ruins'
  | 'urban'
  | 'coastal'
  | 'underground'
  | 'ice'
  | 'ground'
  | 'sky';

export interface Habitat {
  biome: Biome;
  regionName: string;
  // Optional spawn characteristics
  commonness?: 'common' | 'uncommon' | 'rare' | 'very rare';
  timeOfDay?: ('day' | 'night' | 'both')[];
  weather?: ('clear' | 'rain' | 'sandstorm' | 'snow' | 'any')[];
}

// Extended Pal interface with map data
export interface PalWithMap extends Pal {
  habitats: Habitat[];
  // Notable locations where this Pal can be found
  notableLocations?: string[];
}

// Map coordinates for different regions (simplified - in a real app these would be actual game coordinates)
export const REGION_COORDINATES: Record<string, [number, number]> = {
  // Starting areas
  'Plateau of Beginnings': [0, 0],
  'Windswept Hills': [-10, 5],
  'Sea Breeze Archipelago': [-15, -10],

  // Forest regions
  'Whispering Woods': [-5, 0],
  'Ancient Forest': [0, -10],
  'Goblin\'s Hill': [5, -5],

  // Grassland/plains
  'East Plains': [10, 0],
  'West Plains': [-10, -15],
  'Sacred Mountain Foothills': [0, -20],

  // Desert areas
  'Desert Zone': [15, 5],
  'Sand Dunes': [20, 0],
  'Oasis': [18, 8],

  // Mountain/snow areas
  'Mount Obsidian': [5, -15],
  'Astral Mountain': [-5, -25],
  'Frostbound Mountains': [-15, -20],

  // Volcanic areas
  'Volcano': [10, -10],
  'Crater Lake': [12, -8],

  // Water areas
  'East Lake': [5, 10],
  'West Lake': [-5, 10],
  'Riverbank': [0, 5],

  // Special areas
  'Ruined Fortress City': [-8, -8],
  'Pilgrimage Church': [-3, -12],
  'Sealed Realm of the Swordmaster': [8, -18],

  // Palworld 1.0 regions
  'Sunreach': [25, -25],          // sky islands
  'World Tree': [0, -30],         // towering World Tree
  'Verdant Cradle': [12, 18],     // jungle island
  'Ember Shoals': [18, -14],      // volcanic island
  'Dune Refuge': [22, 10],        // desert island
  'Ruin Hollow': [-18, 2],        // ruined island
  'Frost Harbor': [-20, -22],     // frozen coastal island
  'Glacier Reach': [-22, -16],    // glacier island
  'Storm Cape': [-10, 22],        // coastal island
  'Wildlife Sanctuary No. 4': [16, 14],
  'Wildlife Sanctuary No. 5': [-22, 8],
};

// Biome colors for map visualization
export const BIOME_COLORS: Record<Biome, string> = {
  forest: '#22c55e',      // green
  grassland: '#84cc16',   // lime
  desert: '#eab308',      // yellow
  snow: '#38bdf8',        // light blue
  volcanic: '#ef4444',    // red
  river: '#06b6d4',       // cyan
  lake: '#0ea5e9',        // blue
  mountain: '#64748b',    // slate
  canyon: '#a855f7',      // purple
  jungle: '#10b981',      // emerald
  ruins: '#6b7280',       // gray
  urban: '#f59e0b',       // amber
  coastal: '#0891b2',     // sky
  underground: '#7c3aed', // violet
  ice: '#bae6fd',         // light sky
  ground: '#92400e',      // brown
  sky: '#818cf8',         // indigo (sky islands)
};

// Sample map data - assigning habitats to some Pals for demonstration
// In a full implementation, this would be expanded to cover all 137 Pals
export const PAL_MAP_DATA: Partial<Record<string, { habitats: Habitat[]; notableLocations?: string[] }>> = {
  // Lamball - Plains areas
  "Lamball": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Plains', 'West Plains']
  },

  // Cattiva - Forest areas
  "Cattiva": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest']
  },

  // Chikipi - Plains and farm areas
  "Chikipi": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Lifmunk - Forest areas
  "Lifmunk": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Foxparks - Grassland and volcanic areas
  "Foxparks": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Sacred Mountain Foothills', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'Volcano', 'Sacred Mountain Foothills']
  },

  // Fuack - Water areas
  "Fuack": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },

  // Sparkit - Plains and urban areas
  "Sparkit": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['night'] },
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Tanzee - Jungle and forest areas
  "Tanzee": {
    habitats: [
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Southern Jungle', 'Ancient Forest', 'Whispering Woods']
  },

  // Rooby - Grassland areas (rarity 2)
  "Rooby": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'Sacred Mountain Foothills', commonness: 'rare', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'West Plains', 'Sacred Mountain Foothills']
  },

  // Vanwyrm - Forest and mountain areas (example flying Pal)
  "Vanwyrm": {
    habitats: [
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day'] },
    ],
    notableLocations: ['Ancient Forest', 'Mount Obsidian', 'Astral Mountain']
  },

  // Ice Kingpal - Snow areas (example ice Pal)
  "Necromus": {
    habitats: [
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'ruins', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'World Tree']
  },

  // Blazehowl - Volcanic areas (example fire Pal)
  "Blazehowl": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone']
  },

  // Add more sample data for demonstration...
  // In a full implementation, all 137 Pals would have habitat data

  // Pengullet (10) - Water/Ice areas
  "Pengullet": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Frostbound Mountains']
  },

  // Penking (11) - Water/Ice areas (rarity 6)
  "Penking": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Frostbound Mountains', 'Astral Mountain']
  },

  // Jolthog (12) - Electric areas
  "Jolthog": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Gumoss (13) - Grass/Ground areas
  "Gumoss": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Desert Zone']
  },

  // Vixy (14) - Neutral areas
  "Vixy": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Ancient Forest']
  },

  // Hoocrates (15) - Dark areas
  "Hoocrates": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Teafant (16) - Water areas
  "Teafant": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },

  // Depresso (17) - Dark areas
  "Depresso": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Plateau of Beginnings']
  },

  // Daedream (19) - Dark areas
  "Daedream": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Rushoar (20) - Ground areas
  "Rushoar": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'desert', regionName: 'Sand Dunes', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Sand Dunes']
  },

  // Nox (21) - Dark areas (rarity 6)
  "Nox": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'rare', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'underground', regionName: 'Caverns', commonness: 'rare', timeOfDay: ['night'] } // Special case
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Fuddler (22) - Ground areas
  "Fuddler": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Mount Obsidian']
  },

  // Killamari (23) - Dark areas
  "Killamari": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Mau (24) - Dark areas
  "Mau": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Direhowl (26) - Neutral areas
  "Direhowl": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Tocotoco (27) - Neutral areas
  "Tocotoco": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Flopie (28) - Grass areas
  "Flopie": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Southern Jungle']
  },

  // Mozzarina (29) - Neutral areas
  "Mozzarina": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Bristla (30) - Grass areas
  "Bristla": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Gobfin (31) - Water areas
  "Gobfin": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },

  // Hangyu (32) - Ground areas
  "Hangyu": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Mount Obsidian']
  },

  // Mossanda (33) - Grass areas (rarity 6)
  "Mossanda": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Woolipop (34) - Neutral areas
  "Woolipop": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Plateau of Beginnings']
  },

  // Melpaca (36) - Neutral areas
  "Melpaca": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Eikthyrdeer (37) - Neutral areas
  "Eikthyrdeer": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Mount Obsidian']
  },

  // Nitewing (38) - Neutral areas
  "Nitewing": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Ribbuny (39) - Neutral areas
  "Ribbuny": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Incineram (40) - Fire/Dark areas
  "Incineram": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Ancient Forest', 'East Plains']
  },

  // Cinnamoth (41) - Grass areas
  "Cinnamoth": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Southern Jungle']
  },

  // Arsox (42) - Fire areas
  "Arsox": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Dumud (43) - Ground areas
  "Dumud": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Mount Obsidian']
  },

  // Cawgnito (44) - Dark areas
  "Cawgnito": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Loupmoon (46) - Dark areas
  "Loupmoon": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Galeclaw (47) - Neutral areas
  "Galeclaw": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Robinquill (48) - Grass areas
  "Robinquill": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ground', regionName: 'Sacred Mountain Foothills', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Sacred Mountain Foothills']
  },

  // Gorirat (49) - Neutral areas
  "Gorirat": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Plateau of Beginnings']
  },

  // Beegarde (50) - Grass areas
  "Beegarde": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Southern Jungle']
  },

  // Elizabee (51) - Grass areas (rarity 8)
  "Elizabee": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Grintale (52) - Neutral areas (rarity 6)
  "Grintale": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Swee (53) - Ice areas
  "Swee": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Sweepa (54) - Ice areas (rarity 6)
  "Sweepa": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Univolt (56) - Electric areas
  "Univolt": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Foxcicle (57) - Ice areas
  "Foxcicle": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Pyrin (58) - Fire areas (rarity 6)
  "Pyrin": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Reindrix (59) - Ice areas
  "Reindrix": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Rayhound (60) - Electric areas
  "Rayhound": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Kitsun (61) - Fire areas (rarity 6)
  "Kitsun": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Dazzi (62) - Electric areas

  // Lunaris (63) - Neutral areas (rarity 6)

  // Dinossom (64) - Grass/Dragon areas
  "Dinossom": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Mount Obsidian']
  },

  // Maraith (66) - Dark areas (rarity 6)
  "Maraith": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'rare', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Digtoise (67) - Ground areas
  "Digtoise": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Mount Obsidian']
  },

  // Tombat (68) - Dark areas
  "Tombat": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Lovander (69) - Neutral areas
  "Lovander": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Flambelle (70) - Fire areas
  "Flambelle": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Vanwyrm (71) - Fire/Dark areas

  // Bushi (72) - Fire areas (rarity 7)
  "Bushi": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Beakon (73) - Electric areas (rarity 6)
  "Beakon": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Ragnahawk (74) - Fire areas (rarity 7)
  "Ragnahawk": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Wixen (76) - Fire areas
  "Wixen": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Verdash (77) - Grass areas (rarity 8)
  "Verdash": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Vaelet (78) - Grass areas (rarity 8)
  "Vaelet": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Sibelyx (79) - Ice areas (rarity 7)
  "Sibelyx": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Elphidran (80) - Dragon areas (rarity 7)
  "Elphidran": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'Volcano', 'Ancient Forest']
  },

  // Kelpsea (81) - Water areas
  "Kelpsea": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },

  // Azurobe (82) - Water/Dragon areas (rarity 7)
  "Azurobe": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Lake', 'West Lake', 'Mount Obsidian', 'Astral Mountain']
  },

  // Cryolinx (83) - Ice areas (rarity 7)
  "Cryolinx": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Blazehowl (84) - Fire areas (rarity 7)

  // Broncherry (86) - Grass areas (rarity 7)
  "Broncherry": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Petallia (87) - Grass areas (rarity 8)
  "Petallia": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Reptyro (88) - Fire/Ground areas (rarity 6)
  "Reptyro": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Kingpaca (89) - Neutral areas (rarity 8)
  "Kingpaca": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Mammorest (90) - Grass areas (rarity 8)
  "Mammorest": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Wumpo (91) - Ice areas (rarity 7)
  "Wumpo": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Warsect (92) - Grass/Ground areas (rarity 8)
  "Warsect": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Fenglope (93) - Neutral areas
  "Fenglope": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Felbat (94) - Dark areas (rarity 6)
  "Felbat": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Blazamut (96) - Fire areas (rarity 9)
  "Blazamut": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Helzephyr (97) - Dark areas (rarity 7)
  "Helzephyr": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'rare', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Astegon (98) - Dragon/Dark areas (rarity 9)
  "Astegon": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'Volcano', 'Ancient Forest']
  },

  // Menasting (99) - Dark/Ground areas (rarity 9)
  "Menasting": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City', 'Mount Obsidian']
  },

  // Anubis (100) - Ground areas (rarity 10)
  "Anubis": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'desert', regionName: 'Desert Zone', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Desert Zone', 'Mount Obsidian']
  },

  // Jormuntide (101) - Dragon/Water areas (rarity 8)
  "Jormuntide": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'East Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'East Lake', 'West Lake', 'World Tree']
  },

  // Suzaku (102) - Fire areas (rarity 8)
  "Suzaku": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Lyleen (104) - Grass areas (rarity 9)
  "Lyleen": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Orserk (106) - Dragon/Electric areas (rarity 9)
  "Orserk": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'East Plains', 'West Plains']
  },

  // Shadowbeak (107) - Dark areas (rarity 10)
  "Shadowbeak": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'ruins', regionName: 'Ruined Fortress City', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Ruined Fortress City']
  },

  // Paladius (108) - Neutral areas (rarity 20)
  "Paladius": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Frostallion (110) - Ice areas (rarity 20)
  "Frostallion": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Additional pals with habitat data
  "Cremis": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Plains', 'West Plains']
  },
  "Celaray": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },
  "Caprity": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },
  "Leezpunk": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest']
  },
  "Chillet": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain']
  },
  "Surfent": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },
  "Katress": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest']
  },
  "Relaxaurus": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },
  "Quivern": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'Ancient Forest']
  },
  "Faleris": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone']
  },
  "Hangyu Cryst": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'West Plains']
  },
  "Elphidran Aqua": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },
  "Suzaku Aqua": {
    habitats: [
      { biome: 'lake', regionName: 'East Lake', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'lake', regionName: 'West Lake', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'river', regionName: 'Riverbank', commonness: 'uncommon', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Lake', 'West Lake', 'Riverbank']
  },

  // Jolthog Cryst (112) - Ice areas (based on Jolthog)
  "Jolthog Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Mau Cryst (113) - Ice areas (based on Mau)
  "Mau Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Gobfin Ignis (114) - Fire areas (based on Gobfin)
  "Gobfin Ignis": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Mossanda Lux (116) - Electric areas (based on Mossanda)
  "Mossanda Lux": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'urban', regionName: 'Plateau of Beginnings', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Plateau of Beginnings']
  },

  // Eikthyrdeer Terra (117) - Ground areas (based on Eikthyrdeer)
  "Eikthyrdeer Terra": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Mount Obsidian']
  },

  // Incineram Noct (118) - Dark areas (based on Incineram)
  "Incineram Noct": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Leezpunk Ignis (119) - Fire areas (based on Leezpunk)
  "Leezpunk Ignis": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
    ],
    notableLocations: ['East Plains', 'West Plains']
  },

  // Robinquill Terra (120) - Grass/Ground areas (based on Robinquill)
  "Robinquill Terra": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'ground', regionName: 'Sacred Mountain Foothills', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Sacred Mountain Foothills']
  },

  // Pyrin Noct (121) - Dark areas (based on Pyrin)
  "Pyrin Noct": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Dinossom Lux (122) - Electric/Dragon areas (based on Dinossom)
  "Dinossom Lux": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Mount Obsidian']
  },

  // Surfent Terra (123) - Ground areas (based on Surfent)
  "Surfent Terra": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Vanwyrm Cryst (124) - Ice/Dark areas (based on Vanwyrm)
  "Vanwyrm Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Kelpsea Ignis (126) - Fire areas (based on Kelpsea)
  "Kelpsea Ignis": {
    habitats: [
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'Desert Zone', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Volcano', 'Crater Lake', 'Desert Zone', 'East Plains']
  },

  // Blazehowl Noct (127) - Dark areas (based on Blazehowl)
  "Blazehowl Noct": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'common', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'jungle', regionName: 'Southern Jungle', commonness: 'rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'Southern Jungle']
  },

  // Relaxaurus Lux (128) - Dragon/Electric areas (based on Relaxaurus)
  "Relaxaurus Lux": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'East Plains', 'West Plains']
  },

  // Broncherry Aqua (129) - Grass/Water areas (based on Broncherry)
  "Broncherry Aqua": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'uncommon', timeOfDay: ['day'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods']
  },

  // Reptyro Cryst (130) - Ice/Ground areas (based on Reptyro)
  "Reptyro Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'common', timeOfDay: ['day', 'night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Kingpaca Cryst (131) - Ice areas (based on Kingpaca)
  "Kingpaca Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Mammorest Cryst (132) - Ice areas (based on Mammorest)
  "Mammorest Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // Wumpo Botan (133) - Grass areas (based on Wumpo)
  "Wumpo Botan": {
    habitats: [
      { biome: 'grassland', regionName: 'East Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'grassland', regionName: 'West Plains', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] }
    ],
    notableLocations: ['East Plains', 'West Plains', 'Whispering Woods', 'Ancient Forest']
  },

  // Jormuntide Ignis (134) - Dragon/Fire areas (based on Jormuntide)
  "Jormuntide Ignis": {
    habitats: [
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'mountain', regionName: 'Astral Mountain', commonness: 'rare', timeOfDay: ['day', 'night'] },
      { biome: 'volcanic', regionName: 'Volcano', commonness: 'uncommon', timeOfDay: ['day'] },
      { biome: 'volcanic', regionName: 'Crater Lake', commonness: 'rare', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['Mount Obsidian', 'Astral Mountain', 'Volcano', 'Crater Lake']
  },

  // Lyleen Noct (136) - Dark areas (based on Lyleen)
  "Lyleen Noct": {
    habitats: [
      { biome: 'forest', regionName: 'Whispering Woods', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'Ancient Forest', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'forest', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] }
    ],
    notableLocations: ['Whispering Woods', 'Ancient Forest', 'World Tree']
  },

  // Frostallion Noct (137) - Dark areas (based on Frostallion)
  "Frostallion Noct": {
    habitats: [
      { biome: 'ice', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['day'] },
      { biome: 'ice', regionName: 'Astral Mountain', commonness: 'very rare', timeOfDay: ['day', 'night'] },
      { biome: 'snow', regionName: 'Frostbound Mountains', commonness: 'very rare', timeOfDay: ['night'] },
      { biome: 'mountain', regionName: 'Mount Obsidian', commonness: 'very rare', timeOfDay: ['day'] }
    ],
    notableLocations: ['Frostbound Mountains', 'Astral Mountain', 'Mount Obsidian']
  },

  // --- Palworld 1.0 regions (Sunreach sky islands) ---
  "Lunaris": {
    habitats: [
      { biome: 'sky', regionName: 'Sunreach', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Sunreach']
  },
  "Loomen": {
    habitats: [
      { biome: 'sky', regionName: 'Sunreach', commonness: 'rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Sunreach']
  },
  "Wistella": {
    habitats: [
      { biome: 'sky', regionName: 'Sunreach', commonness: 'rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Sunreach']
  },
  "Dazzi": {
    habitats: [
      { biome: 'sky', regionName: 'Sunreach', commonness: 'rare', timeOfDay: ['day'] },
    ],
    notableLocations: ['Sunreach']
  },
  "Solenne": {
    habitats: [
      { biome: 'sky', regionName: 'Sunreach', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Sunreach']
  },

  // --- Palworld 1.0 — World Tree (pals.ts habitats are ignored by getPalMapData) ---
  // 101/109/136 already have sample entries above; their World Tree spawn was appended there.
  "Panthalus": {
    habitats: [
      { biome: 'river', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Astralym": {
    habitats: [
      { biome: 'mountain', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Tetroise Primo": {
    habitats: [
      { biome: 'mountain', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Nitemary Botan": {
    habitats: [
      { biome: 'forest', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Celesdir Noct": {
    habitats: [
      { biome: 'ruins', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Knocklem Ignis": {
    habitats: [
      { biome: 'volcanic', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Solmora Lux": {
    habitats: [
      { biome: 'mountain', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },
  "Eidrolon Ignis": {
    habitats: [
      { biome: 'volcanic', regionName: 'World Tree', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['World Tree']
  },

  // --- Palworld 1.0 new islands ---
  "Gloopie Primo": {
    habitats: [
      { biome: 'jungle', regionName: 'Verdant Cradle', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Verdant Cradle']
  },
  "Skutlass Ignis": {
    habitats: [
      { biome: 'volcanic', regionName: 'Ember Shoals', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Ember Shoals']
  },
  "Polapup Terra": {
    habitats: [
      { biome: 'desert', regionName: 'Dune Refuge', commonness: 'common', timeOfDay: ['day'] },
    ],
    notableLocations: ['Dune Refuge']
  },
  "Needoll Noct": {
    habitats: [
      { biome: 'ruins', regionName: 'Ruin Hollow', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Ruin Hollow']
  },
  "Pierdon Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Frost Harbor', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Frost Harbor']
  },
  "Moldron Cryst": {
    habitats: [
      { biome: 'ice', regionName: 'Glacier Reach', commonness: 'uncommon', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Glacier Reach']
  },
  "Prixter Lux": {
    habitats: [
      { biome: 'coastal', regionName: 'Storm Cape', commonness: 'common', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Storm Cape']
  },

  // --- Reworked Wildlife Sanctuaries ---
  "Starryon Primo": {
    habitats: [
      { biome: 'mountain', regionName: 'Wildlife Sanctuary No. 4', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Wildlife Sanctuary No. 4']
  },
  "Snock Terra": {
    habitats: [
      { biome: 'mountain', regionName: 'Wildlife Sanctuary No. 5', commonness: 'very rare', timeOfDay: ['day', 'night'] },
    ],
    notableLocations: ['Wildlife Sanctuary No. 5']
  }
};

// Helper function to get map data for a Pal.
// PAL_MAP_DATA is keyed by Pal NAME (stable across data regenerations);
// positional pals.ts ids change whenever the roster is re-sorted, which is
// how this table silently drifted onto the wrong Pals before the 1.0 fix.
export function getPalMapData(palId: string): PalWithMap | undefined {
  const baseData = PALS.find(pal => pal.id === palId);
  const mapData = baseData ? PAL_MAP_DATA[baseData.name] : undefined;

  if (!baseData) {
    return undefined;
  }

  // If we don't have specific map data for this Pal, return base data with empty habitats
  if (!mapData) {
    return {
      ...baseData,
      habitats: [],
      notableLocations: []
    };
  }

  // Merge base Pal data with map-specific data
  return {
    ...baseData,
    ...mapData
  };
}

// Helper function to get all Pals that spawn in a specific habitat
export function getPalsByHabitat(biome: Biome, regionName: string): Pal[] {
  return PALS.filter(pal => {
    const mapData = getPalMapData(pal.id);
    return mapData?.habitats.some(h =>
      h.biome === biome && h.regionName === regionName
    ) || false;
  });
}

// Helper function to get all unique habitats
export function getAllHabitats(): { biome: Biome; regionName: string }[] {
  const habitats = new Set<string>();
  const result: { biome: Biome; regionName: string }[] = [];

  PALS.forEach(pal => {
    const mapData = getPalMapData(pal.id);
    if (mapData) {
      mapData.habitats.forEach(habitat => {
        const key = `${habitat.biome}:${habitat.regionName}`;
        if (!habitats.has(key)) {
          habitats.add(key);
          result.push({ biome: habitat.biome, regionName: habitat.regionName });
        }
      });
    }
  });

  return result;
}