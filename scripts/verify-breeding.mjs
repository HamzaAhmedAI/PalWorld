#!/usr/bin/env node
// Verification harness for Palworld 1.0 breeding corrections (spec §P0.4).
// Runs the breeding unit tests (lib/breeding.test.ts), which assert the
// known-good 1.0 combos (Penking+Bushi -> Sibelyx, Orserk true-breed, etc.).
// Exits non-zero if any assertion breaks, so it can gate CI / pre-commit.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const result = spawnSync(
  "npx",
  [
    "vitest",
    "run",
    "lib/breeding.test.ts",
    "lib/breeding-matrix.test.ts",
    "--reporter=dot",
  ],
  { cwd: root, stdio: "inherit", shell: true },
);

if (result.status !== 0) {
  console.error("[verify-breeding] Breeding assertions FAILED.");
  process.exit(result.status ?? 1);
}

console.log("[verify-breeding] All breeding assertions passed.");
