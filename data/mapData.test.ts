import { describe, it, expect } from "vitest";
import { PALS } from "./pals";
import { getAllHabitats, getPalsByHabitat, getPalMapData } from "./mapData";

describe("mapData — Palworld 1.0 regions", () => {
  const habitats = getAllHabitats();
  const regionNames = habitats.map((h) => h.regionName);

  it("exposes the Sunreach sky-island region added in 1.0", () => {
    expect(regionNames).toContain("Sunreach");
    const sunreach = habitats.find((h) => h.regionName === "Sunreach");
    expect(sunreach?.biome).toBe("sky");
  });

  it("exposes the new 1.0 island and sanctuary regions", () => {
    for (const region of [
      "World Tree",
      "Verdant Cradle",
      "Ember Shoals",
      "Dune Refuge",
      "Ruin Hollow",
      "Frost Harbor",
      "Glacier Reach",
      "Storm Cape",
      "Wildlife Sanctuary No. 4",
      "Wildlife Sanctuary No. 5",
    ]) {
      expect(regionNames).toContain(region);
    }
  });

  it("returns sky Pals when filtering by the Sunreach region", () => {
    const sunreachPals = getPalsByHabitat("sky", "Sunreach");
    expect(sunreachPals.length).toBeGreaterThan(0);
    expect(sunreachPals.some((p) => p.name === "Lunaris")).toBe(true);
  });

  it("replaced placeholder habitats with the real Sunreach region for overridden Pals", () => {
    const lunaris = PALS.find((p) => p.name === "Lunaris");
    const mapData = getPalMapData(lunaris!.id);
    expect(mapData?.habitats).toEqual([
      { biome: "sky", regionName: "Sunreach", commonness: "very rare", timeOfDay: ["day", "night"] },
    ]);
  });

  it("reflects the Lovander → Dark 1.0 type correction", () => {
    const lovander = PALS.find((p) => p.name === "Lovander");
    expect(lovander?.type1).toBe("Dark");
  });
});
