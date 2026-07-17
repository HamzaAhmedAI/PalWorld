"use client";

import { BreedingPath } from "@/lib/breeding";
import { buildBreedingTree, layoutBreedingTree } from "@/lib/breeding-tree";
import { getPalSlug } from "@/lib/palSlug";

const NODE_W = 84;
const NODE_H = 96;
const PAD = 12;

interface BreedingTreeSVGProps {
  path: BreedingPath;
  className?: string;
}

/**
 * Inline SVG breeding tree. Each node links to the Pal's page; the whole SVG
 * scrolls horizontally on narrow viewports so it stays readable on mobile.
 */
export function BreedingTreeSVG({ path, className = "" }: BreedingTreeSVGProps) {
  const root = buildBreedingTree(path);
  const { nodes, edges, width, height } = layoutBreedingTree(root);
  const vbW = width + PAD * 2;
  const vbH = height + PAD * 2;

  const nodeById = new Map(nodes.map((n) => [n.key, n]));

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        width={vbW}
        height={vbH}
        className="mx-auto block min-w-full"
        role="img"
        aria-label="Multi-generation breeding tree"
      >
        <g
          className="text-indigo-300/60 dark:text-indigo-400/40"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          {edges.map((e, i) => {
            const from = nodeById.get(e.from);
            const to = nodeById.get(e.to);
            if (!from || !to) return null;
            const x1 = from.x + NODE_W / 2 + PAD;
            const y1 = from.y + NODE_H + PAD;
            const x2 = to.x + NODE_W / 2 + PAD;
            const y2 = to.y + PAD;
            const my = (y1 + y2) / 2;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`}
              />
            );
          })}
        </g>

        {nodes.map((n) => {
          const x = n.x + PAD;
          const y = n.y + PAD;
          const slug = getPalSlug(n.pal);
          return (
            <a key={n.key} href={`/pals/${slug}`} className="group">
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={14}
                className="fill-white stroke-slate-200 transition-colors group-hover:stroke-indigo-500 dark:fill-white/5 dark:stroke-white/10"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <image
                href={n.pal.image}
                x={x + NODE_W / 2 - 28}
                y={y + 8}
                width={56}
                height={56}
                preserveAspectRatio="xMidYMid meet"
                className="pointer-events-none"
              />
              <text
                x={x + NODE_W / 2}
                y={y + NODE_H - 10}
                textAnchor="middle"
                className="fill-slate-700 text-[9px] font-bold dark:fill-slate-200"
              >
                {n.pal.name}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
