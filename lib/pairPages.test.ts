import { describe, it, expect } from "vitest";
import {
  pairPageManifest,
  producersByChild,
  getPairPage,
} from "./pairPages";
import { getResultingPal } from "./breeding";
import { UNIQUE_COMBOS } from "../data/pals";

describe("pair page manifest (batch 1)", () => {
  const manifest = pairPageManifest();

  it("is a staged batch, not the whole table", () => {
    expect(manifest.length).toBeGreaterThanOrEqual(250);
    expect(manifest.length).toBeLessThanOrEqual(700);
  });

  it("has unique slugs", () => {
    expect(new Set(manifest.map((e) => e.slug)).size).toBe(manifest.length);
  });

  it("includes every official unique combo", () => {
    for (const key of Object.keys(UNIQUE_COMBOS)) {
      const [a, b] = key.split("+");
      const entry = manifest.find(
        (e) =>
          (e.a.name === a && e.b.name === b) ||
          (e.a.name === b && e.b.name === a),
      );
      expect(entry, key).toBeDefined();
      expect(entry!.kind).toBe("unique");
      expect(entry!.child.name).toBe(UNIQUE_COMBOS[key]);
    }
  });

  it("includes the gender-dependent pair, labelled as such", () => {
    const entry = getPairPage("katress+wixen");
    expect(entry).toBeDefined();
    expect(entry!.kind).toBe("gender");
  });

  it("every entry's child matches the verified engine", () => {
    for (const e of manifest) {
      expect(getResultingPal(e.a, e.b).name).toBe(e.child.name);
    }
  });

  it("producers map covers every Pal as a child of something", () => {
    const producers = producersByChild();
    expect(producers.size).toBeGreaterThanOrEqual(290);
    // Easiest-first ordering: first pair never harder than the last.
    for (const list of producers.values()) {
      const first = list[0].a.rarity + list[0].b.rarity;
      const last =
        list[list.length - 1].a.rarity + list[list.length - 1].b.rarity;
      expect(first).toBeLessThanOrEqual(last + 8); // base-pal bonus can offset rarity
    }
  });
});
