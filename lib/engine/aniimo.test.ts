import { describe, it, expect } from "vitest";
import { ANIIMO_CREATURES, ANIIMO_EDGES } from "../../data/aniimo";
import { aniimoPack } from "./packs/aniimo";
import { findPlans, producersOf } from "./graph";

describe("aniimo pack — data integrity", () => {
  it("has the full roster and edge set from the joined sources", () => {
    expect(ANIIMO_CREATURES.length).toBe(97); // 94 wiki entries + 3 tools-only species
    expect(ANIIMO_EDGES.length).toBe(59); // 56 wiki-tree edges + 3 tools-source edges
    expect(aniimoPack.creatures.length).toBe(97);
    expect(aniimoPack.edges.length).toBe(59);
  });

  it("every edge endpoint exists in the roster", () => {
    const names = new Set(ANIIMO_CREATURES.map((c) => c.name));
    for (const e of ANIIMO_EDGES) {
      expect(names.has(e.from)).toBe(true);
      expect(names.has(e.to)).toBe(true);
    }
  });

  it("only the six documented forms have unverified conditions", () => {
    const unverified = ANIIMO_EDGES.filter((e) => !e.conditionsVerified)
      .map((e) => e.to)
      .sort();
    expect(unverified).toEqual([
      "Coraliz",
      "Gachapus",
      "Glameep",
      "Malevsera",
      "Wavwal",
      "Witchin",
    ]);
    for (const e of ANIIMO_EDGES) {
      if (e.conditionsVerified) expect(e.conditions.length).toBeGreaterThan(0);
    }
  });
});

describe("aniimo pack — planner behaviour", () => {
  it("plans the Emberpup chain: Emberpup -> Flameruff -> Scorchhowl", () => {
    const plans = findPlans(aniimoPack, "Scorchhowl");
    expect(plans.length).toBeGreaterThan(0);
    const chain = plans.find((p) => p.steps.length === 2);
    expect(chain).toBeDefined();
    expect(chain!.steps.map((s) => s.output.id)).toEqual([
      "Flameruff",
      "Scorchhowl",
    ]);
    // Level gate survives into the plan, and the cross-checked Alpha deed
    // (missing from the primary conditions source) is present.
    const labels = chain!.steps.flatMap(
      (s) => s.conditions?.map((c) => c.label) ?? [],
    );
    expect(labels.some((l) => /level/i.test(l))).toBe(true);
    expect(labels).toContain("Defeat the Alpha Scorchhowl");
  });

  it("handles stage-skipping branches: Baleetle -> Waleetle directly", () => {
    const plans = findPlans(aniimoPack, "Waleetle");
    expect(plans.length).toBeGreaterThan(0);
    expect(plans[0].steps.length).toBe(1);
    expect(plans[0].steps[0].inputs[0].id).toBe("Baleetle");
    // Sibling branch exists too.
    expect(producersOf(aniimoPack, "Bouldus")[0].from).toEqual(["Baleetle"]);
  });

  it("includes the tools-source line: Squarrel -> Squashel with its stone", () => {
    const plans = findPlans(aniimoPack, "Squashel");
    expect(plans.length).toBeGreaterThan(0);
    const labels = plans[0].steps.flatMap(
      (s) => s.conditions?.map((c) => c.label) ?? [],
    );
    expect(labels).toContain("Blaze Stone");
  });

  it("base creatures (Lumin stage) have no producers", () => {
    expect(producersOf(aniimoPack, "Emberpup")).toEqual([]);
    expect(aniimoPack.isBaseCreature?.({ id: "Emberpup", name: "Emberpup", gameId: "aniimo" })).toBe(true);
  });
});
