import { describe, it, expect } from "vitest";
import {
  chanceAtLeastOne,
  expectedAttempts,
  attemptsForConfidence,
  inheritanceBoost,
  godRollOdds,
} from "./odds";

describe("hatch odds maths", () => {
  it("chanceAtLeastOne matches the geometric model", () => {
    expect(chanceAtLeastOne(0.01, 100)).toBeCloseTo(0.634, 3);
    expect(chanceAtLeastOne(0.03, 100)).toBeCloseTo(0.952, 3);
    expect(chanceAtLeastOne(0.5, 1)).toBe(0.5);
    expect(chanceAtLeastOne(0.01, 0)).toBe(0);
  });

  it("expectedAttempts is the reciprocal", () => {
    expect(expectedAttempts(0.01)).toBe(100);
    expect(expectedAttempts(0.03)).toBeCloseTo(33.33, 2);
  });

  it("attemptsForConfidence: ~69 eggs for a 50% shot at a 1% mutation", () => {
    expect(attemptsForConfidence(0.01, 0.5)).toBe(69);
    expect(attemptsForConfidence(0.01, 0.9)).toBe(230);
  });

  it("inheritanceBoost is null (not 0) for cakes with no defined boost", () => {
    expect(inheritanceBoost("special")).toBe(0.9);
    expect(inheritanceBoost("deluxe")).toBe(0.2);
    expect(inheritanceBoost("none")).toBeNull();
    expect(inheritanceBoost("vegetable")).toBeNull();
  });

  it("godRollOdds multiplies defined components only", () => {
    const special = godRollOdds("special", true);
    expect(special.perEgg).toBeCloseTo(0.9 * 0.01, 6); // boost x baseline mutation
    const deluxeNoMut = godRollOdds("deluxe", false);
    expect(deluxeNoMut.perEgg).toBe(0.2);
    const plain = godRollOdds("none", true);
    expect(plain.perEgg).toBeNull(); // no boost defined — no invented number
    expect(plain.mutationP).toBe(0.01);
  });
});
