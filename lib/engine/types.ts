// Shared planner engine — game-agnostic core types (multi-game pivot).
//
// Every creature-collector game reduces to the same shape: creatures are
// nodes; breeding / evolution / fusion / synthesis are typed, conditional
// edges; the product is the shortest, cheapest path from what the player
// has to what they want. A game ships as a GamePack: its roster, its edge
// vocabulary, and either an explicit edge list (evolution games) or a
// combine() resolver (formula breeding games). Nothing game-specific
// belongs in the core (graph.ts) — it lives in packs/<game>.ts.

export type EdgeKind =
  | "breed"
  | "evolve"
  | "fuse"
  | "synthesise"
  | "digivolve"
  | "dedigivolve";

export interface EdgeCondition {
  /** Machine key, e.g. "gender" | "level" | "item" | "stat" | "cake" | "personality" | "rank". */
  kind: string;
  /** Human-readable requirement shown on the path step, e.g. "♂ Katress + ♀ Wixen". */
  label: string;
  value?: string | number;
}

export interface Creature {
  /** Stable within the pack — Palworld uses the display name; other packs may use slugs. */
  id: string;
  name: string;
  gameId: string;
}

export interface TransformEdge {
  kind: EdgeKind;
  /** Input creature ids: 1 for evolution, 2 for breeding/fusion. */
  from: string[];
  /** Output creature id. */
  to: string;
  conditions?: EdgeCondition[];
  /** Planner cost of taking this edge; default 1. */
  cost?: number;
}

export interface PlanStep {
  kind: EdgeKind;
  inputs: Creature[];
  output: Creature;
  conditions?: EdgeCondition[];
  cost: number;
}

export interface Plan {
  steps: PlanStep[];
  totalCost: number;
}

export interface GamePack {
  gameId: string;
  gameName: string;
  /** Dataset version stamp shown on every generated page, e.g. "1.0 · build 24575149". */
  dataVersion: string;
  creatures: Creature[];
  /** Explicit transformation edges (evolution/fusion games). May be empty for resolver games. */
  edges: TransformEdge[];
  /**
   * Resolver for formula games (breeding): given two creature ids, return
   * the resulting creature id, or null if the pair produces nothing.
   * Order-independent. When present, pair edges are derived from it.
   */
  combine?: (aId: string, bId: string) => string | null;
  /**
   * True for creatures treated as directly obtainable (caught/found), so
   * the pathfinder does not decompose them further. Keeps search bounded.
   */
  isBaseCreature?: (c: Creature) => boolean;
  /** Display vocabulary for the game's mechanics. */
  terms: { combine: string; creature: string; creatures: string };
}
