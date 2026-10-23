import { describe, it, expect } from "vitest";
import { DIGIMON_CREATURES, DIGIMON_EDGES } from "../../data/digimon";
import { digimonPack, digimonDevolveEdges, isDnaResult } from "./packs/digimon";
import { findPlans, producersOf } from "./graph";

describe("digimon pack — data integrity", () => {
  it("has the full 476 roster and expected edge mix", () => {
    expect(DIGIMON_CREATURES.length).toBe(476);
    const counts: Record<string, number> = {};
    for (const e of DIGIMON_EDGES) counts[e.kind] = (counts[e.kind] ?? 0) + 1;
    expect(counts.dna).toBe(17);
    expect(counts.digivolve).toBe(1054); // 1088 raw - 34 DNA singles
    expect(counts.dedigivolve).toBe(1054);
    expect(digimonDevolveEdges.length).toBe(1054);
  });

  it("every edge endpoint exists in the roster", () => {
    const names = new Set(DIGIMON_CREATURES.map((c) => c.name));
    for (const e of DIGIMON_EDGES) {
      for (const f of e.from) expect(names.has(f)).toBe(true);
      expect(names.has(e.to)).toBe(true);
    }
  });
});

describe("digimon pack — planner behaviour", () => {
  it("Agumon's only producer is Koromon", () => {
    const producers = producersOf(digimonPack, "Agumon");
    expect(producers.length).toBe(1);
    expect(producers[0].from).toEqual(["Koromon"]);
  });

  it("Omnimon is a DNA result of WarGreymon + MetalGarurumon — not Venusmon", () => {
    // Guards the 0-based index semantics: read as Field Guide numbers,
    // Omnimon's parents wrongly come out as Venusmon + MirageGaogamon.
    expect(isDnaResult("Omnimon")).toBe(true);
    const producers = producersOf(digimonPack, "Omnimon");
    const dna = producers.find((e) => e.from.length === 2);
    expect(dna).toBeDefined();
    expect([...dna!.from].sort()).toEqual(["MetalGarurumon", "WarGreymon"]);
    const labels = dna!.conditions?.map((c) => c.label) ?? [];
    expect(labels.some((l) => /Agent Rank 8/.test(l))).toBe(true);
    expect(labels.some((l) => /WarGreymon.*Daring/.test(l))).toBe(true);
    expect(labels.some((l) => /MetalGarurumon.*Friendly/.test(l))).toBe(true);
  });

  it("plans a full path to Omnimon ending in the two-input DNA step", () => {
    const plans = findPlans(digimonPack, "Omnimon", { maxDepth: 8 });
    expect(plans.length).toBeGreaterThan(0);
    const last = plans[0].steps[plans[0].steps.length - 1];
    expect(last.output.id).toBe("Omnimon");
    expect(last.inputs.length).toBe(2);
  });

  it("Armor evolution carries its Capsule item condition (Pegasusmon)", () => {
    const producers = producersOf(digimonPack, "Pegasusmon");
    expect(producers.length).toBeGreaterThan(0);
    const labels = producers.flatMap(
      (e) => e.conditions?.map((c) => c.label) ?? [],
    );
    expect(labels.some((l) => /Hope Capsule/.test(l))).toBe(true);
  });

  it("In-Training I Digimon are the planner roots", () => {
    // Botamon (In-Training I) has no producer; its child Koromon
    // (In-Training II) does — Botamon itself.
    expect(producersOf(digimonPack, "Botamon")).toEqual([]);
    expect(producersOf(digimonPack, "Koromon")[0].from).toEqual(["Botamon"]);
    expect(
      digimonPack.isBaseCreature?.({
        id: "Botamon",
        name: "Botamon",
        gameId: "digimon-time-stranger",
      }),
    ).toBe(true);
  });
});
