import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PALS, Pal } from "../data/pals";
import { getResultingPal } from "./breeding";

// Full-matrix regression (data fix, 2026-10-22).
//
// The oracle is the verified Palworld 1.0 breeding matrix committed at
// data/source/combos-1.0.json (298x298, child indices into
// data/source/pals-1.0.json order; see data/SOURCING.md for provenance and
// checksums). The engine must reproduce the matrix for EVERY unordered
// parent pair — this is the guard that keeps a future data refresh from
// silently breaking calculator results again.

const root = resolve(__dirname, "..");
const srcPals = JSON.parse(
  readFileSync(resolve(root, "data/source/pals-1.0.json"), "utf8"),
) as Array<{ name: string }>;
const combos = JSON.parse(
  readFileSync(resolve(root, "data/source/combos-1.0.json"), "utf8"),
) as number[][];

const byName = (name: string): Pal =>
  PALS.find((p) => p.name === name) as Pal;

describe("getResultingPal — full 1.0 matrix regression", () => {
  it(
    "reproduces the verified matrix for all 44,551 unordered pairs",
    () => {
      const mismatches: string[] = [];
      let checked = 0;
      for (let i = 0; i < srcPals.length; i++) {
        for (let j = i; j < srcPals.length; j++) {
          const a = byName(srcPals[i].name);
          const b = byName(srcPals[j].name);
          if (!a || !b) {
            mismatches.push(`missing Pal: ${srcPals[i].name} / ${srcPals[j].name}`);
            continue;
          }
          // combos value -1 marks the gender-dependent pair (Katress x
          // Wixen): the matrix has no fixed outcome. The engine must return
          // one of the two official gender-specific children.
          if (combos[i][j] === -1) {
            const got = getResultingPal(a, b).name;
            checked++;
            if (!["Katress Ignis", "Wixen Noct"].includes(got)) {
              mismatches.push(
                `${a.name} + ${b.name} -> engine: ${got}, expected a gender-dependent child`,
              );
            }
            continue;
          }
          const want = srcPals[combos[i][j]].name;
          const got = getResultingPal(a, b).name;
          checked++;
          if (got !== want && mismatches.length < 25) {
            mismatches.push(
              `${a.name} + ${b.name} -> engine: ${got}, matrix: ${want}`,
            );
          }
        }
      }
      expect(checked).toBe(44551);
      expect(mismatches).toEqual([]);
    },
    180000,
  );
});
