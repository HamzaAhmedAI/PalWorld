export interface PassiveSkill {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  effect: string;
  // True for 1.0 rainbow passives that are only obtainable via mutation breeding
  // (the 4 cakes). They are NOT inherited from parents the normal way — see spec §1.5.
  mutationOnly?: boolean;
}

export const PASSIVE_SKILLS: PassiveSkill[] = [
  { id: "1", name: "Artisan", tier: 3, effect: "Work Speed +50%" },
  { id: "2", name: "Work Slave", tier: 1, effect: "Work Speed +30%, Attack -30%" },
  { id: "3", name: "Serious", tier: 2, effect: "Work Speed +20%" },
  { id: "4", name: "Swift", tier: 3, effect: "Movement Speed +30%" },
  { id: "5", name: "Runner", tier: 2, effect: "Movement Speed +20%" },
  { id: "6", name: "Nimble", tier: 1, effect: "Movement Speed +10%" },
  { id: "7", name: "Musclehead", tier: 3, effect: "Attack +30%, Work Speed -50%" },
  { id: "8", name: "Ferocious", tier: 3, effect: "Attack +20%" },
  { id: "9", name: "Burly Body", tier: 3, effect: "Defense +20%" },
  {
    id: "10",
    name: "Legend",
    tier: 3,
    effect: "Attack +20%, Defense +20%, Movement Speed +15%",
  },
  { id: "11", name: "Lucky", tier: 3, effect: "Work Speed +15%, Attack +15%" },

  // --- 1.0 mutation rainbow passives (spec §1.5). mutationOnly = bred via cakes. ---
  {
    id: "m1",
    name: "Immortality",
    tier: 3,
    effect:
      "Life Steal +5%, Auto HP Regen +100%, Attack +15% (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m2",
    name: "Idiosyncratic",
    tier: 3,
    effect:
      "Auto HP Regen +50%, Defense +25%, immune to Poison and Burn (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m3",
    name: "Heavily Armored",
    tier: 3,
    effect: "Immune to Explosion damage (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m4",
    name: "Babysitter",
    tier: 3,
    effect: "Egg production +30%, incubation time +30% (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m5",
    name: "Lavish Hospitality",
    tier: 3,
    effect:
      "Dropped items +100% when summoned during butchering (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m6",
    name: "Ranch Master",
    tier: 3,
    effect: "Farming work suitability +2 (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m7",
    name: "Lightfooted",
    tier: 3,
    effect: "Mounted jump height +1 (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m8",
    name: "Skymarcher",
    tier: 3,
    effect: "Mounted jump height +2 (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m9",
    name: "Skirmisher",
    tier: 3,
    effect: "Improved evasive combat mobility (mutation rainbow passive)",
    mutationOnly: true,
  },
  {
    id: "m10",
    name: "Demon God",
    tier: 3,
    effect: "Attack +20% (mutation rainbow passive, pool 2)",
    mutationOnly: true,
  },
  {
    id: "m11",
    name: "Eternal Engine",
    tier: 3,
    effect: "Reduces SAN drain while working (mutation rainbow passive, pool 2)",
    mutationOnly: true,
  },
  {
    id: "m12",
    name: "Diamond Body",
    tier: 3,
    effect: "Defense +20% (mutation rainbow passive, pool 2)",
    mutationOnly: true,
  },
];
