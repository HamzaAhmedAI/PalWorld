import { describe, it, expect } from "vitest";
import { PALS } from "../../data/pals";
import { getResultingPal, findBreedingPaths } from "../breeding";
import { palworldPack } from "./packs/palworld";
import { combineResult, findPlans, producersOf } from "./graph";
import type { GamePack } from "./types";

const byName = (n: string) => PALS.find((p) => p.name === n)!;

describe("palworld pack — adapter equivalence with lib/breeding", () => {
  it("exposes the full 298-Pal roster with a version stamp", () => {
    expect(palworldPack.creatures.length).toBe(298);
    expect(palworldPack.dataVersion).toContain("1.0");
  });

  it("combine() matches getResultingPal on known and sampled pairs", () => {
    const known: Array<[string, string, string]> = [
      ["Penking", "Bushi", "Sibelyx"],
      ["Lamball", "Lamball", "Lamball"],
      ["Arsox", "Chillet", "Chillet Ignis"],
      ["Katress", "Wixen", "Katress Ignis"],
    ];
    for (const [a, b, want] of known) {
      expect(combineResult(palworldPack, a, b)?.name).toBe(want);
    }
    // Deterministic sample across the roster (every 37th Pal x every 53rd).
    for (let i = 0; i < PALS.length; i += 37) {
      for (let j = 0; j < PALS.length; j += 53) {
        const a = PALS[i];
        const b = PALS[j];
        expect(combineResult(palworldPack, a.name, b.name)?.name).toBe(
          getResultingPal(a, b).name,
        );
      }
    }
  });

  it("producersOf(Anubis) matches the legacy result map membership", () => {
    const producers = producersOf(palworldPack, "Anubis");
    expect(producers.length).toBeGreaterThan(0);
    for (const e of producers) {
      expect(e.from.length).toBe(2);
      const [a, b] = e.from.map((n) => byName(n));
      expect(getResultingPal(a, b).name).toBe("Anubis");
    }
  });

  it("findPlans produces valid Anubis plans (every step verified)", () => {
    const plans = findPlans(palworldPack, "Anubis");
    const legacy = findBreedingPaths(byName("Anubis"));
    expect(plans.length).toBeGreaterThan(0);
    expect(plans.length).toBeLessThanOrEqual(legacy.length + 8);
    for (const plan of plans) {
      const last = plan.steps[plan.steps.length - 1];
      expect(last.output.name).toBe("Anubis");
      for (const step of plan.steps) {
        const [a, b] = step.inputs.map((c) => byName(c.name));
        expect(getResultingPal(a, b).name).toBe(step.output.name);
      }
    }
  });
});

describe("graph core — generic over non-breeding packs", () => {
  // Minimal evolution pack (Aniimo-shaped): single-input edges with
  // conditions, branching, and a reversible edge. Proves the core is not
  // secretly Palworld-shaped.
  const toy: GamePack = {
    gameId: "toy",
    gameName: "Toy",
    dataVersion: "test",
    creatures: ["Embit", "Flamara", "Pyrovex", "Embit Frost"].map((n) => ({
      id: n,
      name: n,
      gameId: "toy",
    })),
    edges: [
      {
        kind: "evolve",
        from: ["Embit"],
        to: "Flamara",
        conditions: [{ kind: "level", label: "Reach level 16", value: 16 }],
      },
      {
        kind: "evolve",
        from: ["Flamara"],
        to: "Pyrovex",
        conditions: [{ kind: "item", label: "Use a Fire Stone" }],
      },
      { kind: "evolve", from: ["Embit"], to: "Embit Frost" },
      { kind: "dedigivolve", from: ["Flamara"], to: "Embit" },
    ],
    isBaseCreature: (c) => c.id === "Embit",
    terms: { combine: "evolve", creature: "Creature", creatures: "Creatures" },
  };

  it("finds the evolution path with conditions intact", () => {
    const plans = findPlans(toy, "Pyrovex");
    expect(plans.length).toBeGreaterThan(0);
    // Shortest plan: the direct edge (assumes you already have Flamara).
    expect(plans[0].steps.map((s) => s.output.id)).toEqual(["Pyrovex"]);
    // Full chain from the base creature, in execution order, conditions kept.
    const chain = plans.find((p) => p.steps.length === 2);
    expect(chain).toBeDefined();
    expect(chain!.steps.map((s) => s.output.id)).toEqual([
      "Flamara",
      "Pyrovex",
    ]);
    expect(chain!.steps[0].conditions?.[0].kind).toBe("level");
    expect(chain!.steps[1].conditions?.[0].kind).toBe("item");
  });

  it("resolver-less packs return null from combineResult", () => {
    expect(combineResult(toy, "Embit", "Flamara")).toBeNull();
  });
});
