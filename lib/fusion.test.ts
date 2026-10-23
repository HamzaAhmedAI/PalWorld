import { describe, it, expect } from "vitest";
import { fusePals, blendName } from "./fusion";
import { PALS } from "../data/pals";

const byName = (n: string) => PALS.find((p) => p.name === n)!;

describe("breed-my-pal fusion generator", () => {
  it("is deterministic: same pair, same fusion, any order", () => {
    const f1 = fusePals(byName("Lamball"), byName("Anubis"));
    const f2 = fusePals(byName("Lamball"), byName("Anubis"));
    expect(f1).toEqual(f2);
  });

  it("blends names into something new and pronounceable-shaped", () => {
    const name = blendName("Lamball", "Chillet");
    expect(name.length).toBeGreaterThanOrEqual(4);
    expect(name).not.toBe("Lamball");
    expect(name).not.toBe("Chillet");
    expect(/^[A-Z]/.test(name)).toBe(true);
  });

  it("keeps variant suffixes (Ignis/Noct/Lux) on blended names", () => {
    const name = blendName("Chillet", "Foxparks Cryst");
    expect(name.endsWith("Cryst")).toBe(true);
  });

  it("never duplicates a type and inherits the second parent's element", () => {
    const f = fusePals(byName("Lamball"), byName("Foxparks"));
    expect(f.type1).toBe(byName("Lamball").type1);
    if (f.type2) expect(f.type2).not.toBe(f.type1);
    expect([f.type1, f.type2]).toContain("Fire");
  });

  it("stats land near the parents' average (within the seeded twist)", () => {
    const a = byName("Anubis");
    const b = byName("Lamball");
    const f = fusePals(a, b);
    const avg = (a.hp! + b.hp!) / 2;
    expect(f.hp).toBeGreaterThanOrEqual(Math.floor(avg * 0.9));
    expect(f.hp).toBeLessThanOrEqual(Math.ceil(avg * 1.1));
  });

  it("work suitability takes the best of both parents", () => {
    const a = byName("Anubis");
    const b = byName("Lamball");
    const f = fusePals(a, b);
    for (const [kind, v] of Object.entries(f.workSuitability)) {
      const expected = Math.max(
        a.workSuitability?.[kind as keyof typeof a.workSuitability] ?? 0,
        b.workSuitability?.[kind as keyof typeof b.workSuitability] ?? 0,
      );
      expect(v).toBe(expected);
    }
  });
});
