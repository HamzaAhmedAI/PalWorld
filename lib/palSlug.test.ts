import { describe, it, expect } from "vitest";
import { PALS } from "../data/pals";
import { slugify, getPalBySlug, allPalSlugs } from "./palSlug";

describe("slugify", () => {
  it("lowercases and replaces non-alphanumeric runs with a single dash", () => {
    expect(slugify("Tanzee Ignis")).toBe("tanzee-ignis");
    expect(slugify("Woolipop Terra")).toBe("woolipop-terra");
    expect(slugify("Celesdir Noct")).toBe("celesdir-noct");
  });

  it("strips leading/trailing separators", () => {
    expect(slugify(" Lamball ")).toBe("lamball");
    expect(slugify("---Jormuntide---")).toBe("jormuntide");
  });
});

describe("getPalBySlug", () => {
  it("resolves a known Pal by slug", () => {
    expect(getPalBySlug("lamball")?.name).toBe("Lamball");
    expect(getPalBySlug("tanzee-ignis")?.name).toBe("Tanzee Ignis");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPalBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("slug uniqueness", () => {
  it("every Pal produces a distinct slug (no route collisions)", () => {
    const slugs = allPalSlugs();
    expect(slugs.length).toBe(PALS.length);
    const set = new Set(slugs);
    expect(set.size).toBe(PALS.length);
  });
});
