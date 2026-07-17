import { describe, it, expect } from "vitest";
import { PALS, UNIQUE_COMBOS, Pal } from "../data/pals";
import {
  getResultingPal,
  findBreedingPaths,
  mutationChance,
  passiveInheritanceChance,
  CakeType,
} from "./breeding";

const byName = (name: string): Pal =>
  PALS.find((p) => p.name === name) as Pal;

describe("getResultingPal — floor formula", () => {
  it("returns the same species when both parents are identical", () => {
    const lamball = byName("Lamball");
    expect(getResultingPal(lamball, lamball).name).toBe("Lamball");
  });

  it("Chikipi + Chikipi is a true-breed base case", () => {
    const chikipi = byName("Chikipi");
    expect(getResultingPal(chikipi, chikipi).name).toBe("Chikipi");
  });

  it("uses the UNIQUE_COMBOS override before the power rule", () => {
    const nitewing = byName("Nitewing");
    const vanwyrm = byName("Vanwyrm");
    expect(getResultingPal(nitewing, vanwyrm).name).toBe(
      UNIQUE_COMBOS["Nitewing+Vanwyrm"],
    );
  });

  // Regression guard for the 1.0 breeding-power reshuffle (spec §2 D1).
  it("Penking + Bushi resolves to Sibelyx (1.0 reshuffle)", () => {
    const penking = byName("Penking");
    const bushi = byName("Bushi");
    expect(getResultingPal(penking, bushi).name).toBe("Sibelyx");
  });

  // Regression guard for true-breeding tower bosses (spec §2 D2).
  it("Orserk is only produced by Orserk + Orserk (true-breed group)", () => {
    const orserk = byName("Orserk");
    expect(getResultingPal(orserk, orserk).name).toBe("Orserk");
    // No mixed (non-Orserk) pair may yield Orserk.
    let mixedHits = 0;
    for (const a of PALS) {
      for (const b of PALS) {
        if (a.name === "Orserk" || b.name === "Orserk") continue;
        if (a.name === b.name) continue;
        if (getResultingPal(a, b).name === "Orserk") mixedHits++;
      }
    }
    expect(mixedHits).toBe(0);
  });
});

describe("mutationChance (1.0)", () => {
  const cases: Array<[CakeType, number]> = [
    ["none", 0.01],
    ["deluxe", 0.03],
    ["mushroom", 0],
    ["vegetable", 0],
    ["special", 0],
  ];
  it.each(cases)("cake=%s returns %s", (cake, expected) => {
    expect(mutationChance(cake)).toBe(expected);
  });
});

describe("passiveInheritanceChance (1.0)", () => {
  it("Special Cake gives a high multi-passive chance", () => {
    expect(passiveInheritanceChance("special")).toBeGreaterThan(0.5);
  });
  it("Deluxe Vegetable Cake gives a moderate boost", () => {
    expect(passiveInheritanceChance("deluxe")).toBeGreaterThan(0);
    expect(passiveInheritanceChance("deluxe")).toBeLessThan(
      passiveInheritanceChance("special"),
    );
  });
  it("Mushroom/Vegetable cakes give no multi-passive boost", () => {
    expect(passiveInheritanceChance("mushroom")).toBe(0);
    expect(passiveInheritanceChance("vegetable")).toBe(0);
  });
});

describe("findBreedingPaths", () => {
  // NOTE: findBreedingPaths is an O(n^4) brute-force search (lib/breeding.ts).
  // With 137 Pals it runs several seconds; bump timeout accordingly. This
  // perf is tracked for optimization in Phase 2.4 (precompute a result map).
  it(
    "finds at least one path for a known breedable Pal",
    () => {
      const anubis = byName("Anubis");
      const paths = findBreedingPaths(anubis);
      expect(paths.length).toBeGreaterThan(0);
      // every returned path must actually resolve to the target
      for (const path of paths) {
        const last = path.steps[path.steps.length - 1];
        expect(last.result.name).toBe("Anubis");
      }
    },
    30000,
  );
});
