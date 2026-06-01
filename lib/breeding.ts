import { PALS, UNIQUE_COMBOS, Pal } from "../data/pals";

export function getResultingPal(parentA: Pal, parentB: Pal): Pal {
  // Check unique combos first
  const key1 = `${parentA.name}+${parentB.name}`;
  const key2 = `${parentB.name}+${parentA.name}`;
  const uniqueName = UNIQUE_COMBOS[key1] || UNIQUE_COMBOS[key2];

  if (uniqueName) {
    const found = PALS.find(p => p.name === uniqueName);
    if (found) return found;
  }

  // Common rule: same species breed same species
  if (parentA.name === parentB.name) return parentA;

  // Power rule
  const targetPower = Math.floor((parentA.breedingPower + parentB.breedingPower + 1) / 2);
  
  // Find Pal with closest breeding power
  let closestPal = PALS[0];
  let minDiff = Math.abs(PALS[0].breedingPower - targetPower);

  for (const pal of PALS) {
    const diff = Math.abs(pal.breedingPower - targetPower);
    if (diff < minDiff) {
      minDiff = diff;
      closestPal = pal;
    } else if (diff === minDiff) {
      // Tie breaker: lexicographical order of name
      if (pal.name < closestPal.name) {
        closestPal = pal;
      }
    }
  }

  return closestPal;
}

export interface BreedingPath {
  steps: {
    parentA: Pal;
    parentB: Pal;
    result: Pal;
  }[];
}

export function findBreedingPaths(targetPal: Pal, maxSteps: number = 2): BreedingPath[] {
  const paths: BreedingPath[] = [];

  // Direct combinations (1-step)
  const oneStepPaths: BreedingPath[] = [];
  for (let i = 0; i < PALS.length; i++) {
    for (let j = i; j < PALS.length; j++) {
      const parentA = PALS[i];
      const parentB = PALS[j];
      const result = getResultingPal(parentA, parentB);
      if (result.name === targetPal.name) {
        oneStepPaths.push({
          steps: [{ parentA, parentB, result }]
        });
      }
    }
  }
  
  paths.push(...oneStepPaths);

  if (maxSteps >= 2) {
    // For each 1-step path, try to break down parentA into two other pals
    for (const path of oneStepPaths) {
      const targetA = path.steps[0].parentA;
      for (let i = 0; i < PALS.length; i++) {
        for (let j = i; j < PALS.length; j++) {
          const grandParentA = PALS[i];
          const grandParentB = PALS[j];
          const resultA = getResultingPal(grandParentA, grandParentB);
          
          if (resultA.name === targetA.name && 
              grandParentA.name !== targetA.name && 
              grandParentB.name !== targetA.name) {
            paths.push({
              steps: [
                { parentA: grandParentA, parentB: grandParentB, result: resultA },
                { parentA: resultA, parentB: path.steps[0].parentB, result: targetPal }
              ]
            });
          }
        }
      }
    }
  }

  // Remove duplicates based on resulting names
  const uniquePaths = Array.from(new Map(paths.map(p => {
    const key = p.steps.map(s => `${s.parentA.name}+${s.parentB.name}=${s.result.name}`).join('->');
    return [key, p];
  })).values());

  return uniquePaths.sort((a, b) => a.steps.length - b.steps.length).slice(0, 8);
}
