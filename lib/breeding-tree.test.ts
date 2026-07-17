import { describe, it, expect } from "vitest";
import { PALS, type Pal } from "../data/pals";
import type { BreedingPath } from "./breeding";
import { buildBreedingTree, layoutBreedingTree } from "./breeding-tree";

const byName = (name: string): Pal =>
  PALS.find((p) => p.name === name) as Pal;

function makePath(steps: BreedingPath["steps"]): BreedingPath {
  return { steps };
}

describe("buildBreedingTree", () => {
  it("uses the last step's result as the target (root) of the tree", () => {
    const anubis = byName("Anubis");
    const path = makePath([
      { parentA: byName("Lamball"), parentB: byName("Chikipi"), result: anubis },
      { parentA: byName("Foxparks"), parentB: byName("Lamball"), result: byName("Lamball") },
    ]);
    const root = buildBreedingTree(path);
    expect(root.pal.name).toBe("Anubis");
  });

  it("builds a comb tree: one decomposed branch + one leaf per level", () => {
    const path = makePath([
      { parentA: byName("Lamball"), parentB: byName("Chikipi"), result: byName("Anubis") },
      { parentA: byName("Foxparks"), parentB: byName("Lamball"), result: byName("Lamball") },
    ]);
    const root = buildBreedingTree(path);
    // Anubis <- (Lamball decomposed, Chikipi leaf)
    expect(root.right?.pal.name).toBe("Chikipi");
    expect(root.left?.pal.name).toBe("Lamball");
    // Lamball <- (Foxparks, Lamball leaf)
    expect(root.left?.left?.pal.name).toBe("Foxparks");
    expect(root.left?.right?.pal.name).toBe("Lamball");
  });

  it("handles a single-step path as a root with two leaf children", () => {
    const path = makePath([
      { parentA: byName("Lamball"), parentB: byName("Chikipi"), result: byName("Anubis") },
    ]);
    const root = buildBreedingTree(path);
    expect(root.left?.pal.name).toBe("Lamball");
    expect(root.right?.pal.name).toBe("Chikipi");
  });
});

describe("layoutBreedingTree", () => {
  it("produces a connected tree (nodes = edges + 1) with positive bounds", () => {
    const path = makePath([
      { parentA: byName("Lamball"), parentB: byName("Chikipi"), result: byName("Anubis") },
      { parentA: byName("Foxparks"), parentB: byName("Lamball"), result: byName("Lamball") },
    ]);
    const { nodes, edges, width, height } = layoutBreedingTree(
      buildBreedingTree(path),
    );
    expect(nodes.length).toBe(5);
    expect(edges.length).toBe(nodes.length - 1);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  it("assigns every node a unique key", () => {
    const path = makePath([
      { parentA: byName("Lamball"), parentB: byName("Chikipi"), result: byName("Anubis") },
      { parentA: byName("Foxparks"), parentB: byName("Lamball"), result: byName("Lamball") },
    ]);
    const { nodes } = layoutBreedingTree(buildBreedingTree(path));
    expect(new Set(nodes.map((n) => n.key)).size).toBe(nodes.length);
  });
});
