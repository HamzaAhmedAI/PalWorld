#!/usr/bin/env node
// fetch-1-0-data.mjs — refresh the canonical Palworld 1.0 dataset.
//
// Downloads pals.json / combos.json / special.json from palworldcalc.com's
// published dataset (see data/SOURCING.md for provenance and upstream repos)
// into data/source/, verifying SHA-256 against the pinned checksums for
// dataset `palworldcalc-20260730-298` (game 1.0, build 24575149).
//
// If a checksum does NOT match, the upstream dataset has changed: the files
// are still written, but this script exits non-zero so a human reviews the
// new dataset before `npm run build-pals` regenerates the site data.

import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "data", "source");
mkdirSync(outDir, { recursive: true });

const FILES = [
  {
    url: "https://palworldcalc.com/data/pals.json",
    out: "pals-1.0.json",
    sha256: "a8556fe78d2c82e4ab3039345c41ccf2ff28c05752a36e6f38b76918e2d74835",
  },
  {
    url: "https://palworldcalc.com/data/combos.json",
    out: "combos-1.0.json",
    sha256: "aab14cb783ff89a43448525edf3223809d5d66d70626f39997bf29469fce8c0b",
  },
  {
    url: "https://palworldcalc.com/data/special.json",
    out: "special-1.0.json",
    sha256: "027724c0f443d45a9279b5aaf335148451789258f698063928f865f3f5a7ddd6",
  },
];

let changed = false;
for (const f of FILES) {
  const res = await fetch(f.url);
  if (!res.ok) {
    console.error(`[fetch-pals] ${f.url} -> HTTP ${res.status}`);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const sha = createHash("sha256").update(buf).digest("hex");
  writeFileSync(resolve(outDir, f.out), buf);
  if (sha === f.sha256) {
    console.log(`[fetch-pals] ${f.out} OK (sha256 verified)`);
  } else {
    changed = true;
    console.warn(
      `[fetch-pals] ${f.out} CHECKSUM CHANGED\n  expected ${f.sha256}\n  got      ${sha}\n  -> upstream dataset updated; review before building.`,
    );
  }
}
if (changed) process.exit(2);
console.log("[fetch-pals] dataset palworldcalc-20260730-298 verified.");
