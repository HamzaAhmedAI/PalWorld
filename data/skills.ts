export interface PassiveSkill {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  effect: string;
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
  { id: "10", name: "Legend", tier: 3, effect: "Attack +20%, Defense +20%, Movement Speed +15%" },
  { id: "11", name: "Lucky", tier: 3, effect: "Work Speed +15%, Attack +15%" },
];
