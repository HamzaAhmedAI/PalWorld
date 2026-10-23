// Shared planner engine — graph core. Pure functions over a GamePack.
// See types.ts for the model. The Palworld calculator keeps running on
// lib/breeding.ts; this core is validated against it by
// lib/engine/palworld.test.ts before any UI migrates onto it.

import type {
  Creature,
  GamePack,
  Plan,
  PlanStep,
  TransformEdge,
} from "./types";

export function creatureById(pack: GamePack): Map<string, Creature> {
  return new Map(pack.creatures.map((c) => [c.id, c]));
}

/** All ways to produce `childId`: explicit edges plus resolver-derived pairs. */
export function producersOf(
  pack: GamePack,
  childId: string,
): TransformEdge[] {
  const out: TransformEdge[] = pack.edges.filter((e) => e.to === childId);
  if (pack.combine) {
    const ids = pack.creatures.map((c) => c.id);
    for (let i = 0; i < ids.length; i++) {
      for (let j = i; j < ids.length; j++) {
        if (pack.combine(ids[i], ids[j]) === childId) {
          out.push({ kind: "breed", from: [ids[i], ids[j]], to: childId });
        }
      }
    }
  }
  return out;
}

let _producerCache = new WeakMap<GamePack, Map<string, TransformEdge[]>>();

/** Cached producer index for resolver games (pair space can be ~45k). */
export function producerIndex(pack: GamePack): Map<string, TransformEdge[]> {
  const hit = _producerCache.get(pack);
  if (hit) return hit;
  const map = new Map<string, TransformEdge[]>();
  for (const e of pack.edges) {
    const arr = map.get(e.to) ?? [];
    arr.push(e);
    map.set(e.to, arr);
  }
  if (pack.combine) {
    const ids = pack.creatures.map((c) => c.id);
    for (let i = 0; i < ids.length; i++) {
      for (let j = i; j < ids.length; j++) {
        const child = pack.combine(ids[i], ids[j]);
        if (!child) continue;
        const arr = map.get(child) ?? [];
        arr.push({ kind: "breed", from: [ids[i], ids[j]], to: child });
        map.set(child, arr);
      }
    }
  }
  _producerCache.set(pack, map);
  return map;
}

/** Direct result of combining two creatures, when the pack has a resolver. */
export function combineResult(
  pack: GamePack,
  aId: string,
  bId: string,
): Creature | null {
  if (!pack.combine) return null;
  const childId = pack.combine(aId, bId);
  if (!childId) return null;
  return creatureById(pack).get(childId) ?? null;
}

/**
 * Find plans that produce `targetId`, shortest first. Mirrors the proven
 * semantics of the Palworld pathfinder: expand non-base parents one level
 * at a time up to maxSteps, cap the raw candidate count, dedupe by step
 * signature, return at most maxPlans.
 */
export function findPlans(
  pack: GamePack,
  targetId: string,
  opts: { maxSteps?: number; maxPlans?: number } = {},
): Plan[] {
  const maxSteps = opts.maxSteps ?? 6;
  const maxPlans = opts.maxPlans ?? 8;
  const MAX_CANDIDATES = 64;
  const byId = creatureById(pack);
  const producers = producerIndex(pack);
  const target = byId.get(targetId);
  if (!target) return [];

  const isBase = (c: Creature): boolean =>
    pack.isBaseCreature ? pack.isBaseCreature(c) : false;

  const plans: Plan[] = [];

  function expand(edge: TransformEdge, trail: PlanStep[], depth: number) {
    const inputs = edge.from
      .map((id) => byId.get(id))
      .filter((c): c is Creature => Boolean(c));
    const output = byId.get(edge.to);
    if (!output || inputs.length !== edge.from.length) return;
    const step: PlanStep = {
      kind: edge.kind,
      inputs,
      output,
      conditions: edge.conditions,
      cost: edge.cost ?? 1,
    };
    // Steps are stored in execution order: inputs are produced first, so
    // this step PREPENDS the trail of steps that depend on it. Every plan's
    // final step therefore produces the plan's target.
    const newTrail = [step, ...trail];
    plans.push({
      steps: newTrail,
      totalCost: newTrail.reduce((s, x) => s + x.cost, 0),
    });
    if (depth >= maxSteps || plans.length >= MAX_CANDIDATES) return;

    for (const input of inputs) {
      if (isBase(input)) continue;
      for (const sub of producers.get(input.id) ?? []) {
        // Skip the trivial self-production (creature + itself).
        if (sub.from.length === 1 && sub.from[0] === input.id) continue;
        if (sub.from.every((f) => f === input.id)) continue;
        expand(sub, newTrail, depth + 1);
        if (plans.length >= MAX_CANDIDATES) return;
      }
    }
  }

  for (const edge of producers.get(targetId) ?? []) {
    expand(edge, [], 1);
    if (plans.length >= MAX_CANDIDATES) break;
  }

  const unique = Array.from(
    new Map(
      plans.map((p) => {
        const key = p.steps
          .map(
            (s) =>
              `${s.inputs.map((i) => i.id).join("+")}=${s.output.id}`,
          )
          .join("->");
        return [key, p] as const;
      }),
    ).values(),
  );

  return unique
    .sort(
      (a, b) => a.steps.length - b.steps.length || a.totalCost - b.totalCost,
    )
    .slice(0, maxPlans);
}
