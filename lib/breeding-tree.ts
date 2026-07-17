import { PALS, Pal } from "@/data/pals";
import { BreedingPath } from "@/lib/breeding";

// Pure, framework-free helpers for rendering a multi-generation breeding tree
// from a BreedingPath. Extracted so they can be unit-tested without React.

export interface TreeNode {
  pal: Pal;
  left?: TreeNode;
  right?: TreeNode;
}

export interface PositionedNode {
  key: string;
  pal: Pal;
  x: number;
  y: number;
}

export interface TreeLayout {
  nodes: PositionedNode[];
  edges: Array<{ from: string; to: string }>;
  width: number;
  height: number;
}

const NODE_W = 84;
const NODE_H = 96;
const COL_GAP = 28;
const ROW_H = 140;

/**
 * A BreedingPath is a linear chain where each step's `result` is a parent of the
 * following step's `result`. Reconstruct the comb-shaped tree: at every level one
 * parent is itself bred (decomposed in the next step) and the other is a leaf.
 */
export function buildBreedingTree(path: BreedingPath): TreeNode {
  const steps = path.steps;
  if (steps.length === 0) {
    // Degenerate path — nothing to render.
    return { pal: PALS[0] };
  }

  function build(i: number): TreeNode {
    const s = steps[i];
    const node: TreeNode = { pal: s.result };

    if (i < steps.length - 1) {
      const next = steps[i + 1];
      if (next.result.name === s.parentA.name) {
        node.left = build(i + 1); // decomposed branch
        node.right = { pal: s.parentB }; // leaf
      } else {
        node.left = { pal: s.parentA }; // leaf
        node.right = build(i + 1); // decomposed branch
      }
    } else {
      node.left = { pal: s.parentA };
      node.right = { pal: s.parentB };
    }
    return node;
  }

  return build(0);
}

/** Assign x/y coordinates (column/row layout) to every node in the tree. */
export function layoutBreedingTree(root: TreeNode): TreeLayout {
  const nodes: PositionedNode[] = [];
  const edges: Array<{ from: string; to: string }> = [];
  let leaf = 0;
  let maxGen = 0;
  let counter = 0;

  function walk(node: TreeNode, gen: number): { x: number; key: string } {
    const key = `n${counter++}`;
    maxGen = Math.max(maxGen, gen);
    let x: number;

    if (!node.left && !node.right) {
      x = leaf * (NODE_W + COL_GAP);
      leaf++;
    } else {
      const left = node.left ? walk(node.left, gen + 1) : null;
      const right = node.right ? walk(node.right, gen + 1) : null;
      const xs = [left && left.x, right && right.x].filter(
        (v): v is number => typeof v === "number",
      );
      x = xs.length
        ? (Math.min(...xs) + Math.max(...xs)) / 2
        : leaf * (NODE_W + COL_GAP);
      if (left) edges.push({ from: key, to: left.key });
      if (right) edges.push({ from: key, to: right.key });
    }

    nodes.push({ key, pal: node.pal, x, y: gen * ROW_H });
    return { x, key };
  }

  walk(root, 0);

  const width = Math.max(leaf, 1) * (NODE_W + COL_GAP);
  const height = (maxGen + 1) * ROW_H;
  return { nodes, edges, width, height };
}
