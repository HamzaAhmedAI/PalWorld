#!/usr/bin/env node
// Phase 1.0 image backfill — downloads 1.0 Pal art into /public/paldex/.
//
// Source: Palworld Fandom wiki (static.wikia.nocookie.net CDN, hotlink-friendly).
// The mlg404 paldeck repo only hosts the original ~137 Pals, so new 1.0 Pals
// (ids 138-210) have no image there. We fetch them ONCE, validate each is a real
// PNG (untrusted external data -> vet before storing), and serve them locally so
// the production site has no fragile hotlink dependency.
//
// Output filename is sanitized to <alnum>.png to keep local URLs clean; the
// build script references the same sanitized name via localPalImage().

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "public/paldex");
mkdirSync(outDir, { recursive: true });

// Pull the exact new-Pal display names from the build script (single source of truth).
const src = readFileSync(resolve(root, "scripts/build-pals.mjs"), "utf8");
const block = src.split("const NEW_PALS_1_0 = [")[1].split("];")[0];
const newNames = [...block.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);

// Also pull the 137 base Pal names from the normalized cache so the ENTIRE
// Paldeck uses consistent complete-character Fandom art (the mlg404 paldeck
// only has zoomed-face art for the base Pals). Same sanitization + output dir.
const baseCache = JSON.parse(
  readFileSync(resolve(root, "scripts/_cache/normalized-137.json"), "utf8"),
);
const baseNames = baseCache.map((p) => p.name);

// Combine, de-dupe (preserve order — new first so new wins any rare collision).
const seen = new Set();
const names = [...newNames, ...baseNames].filter((n) => {
  if (seen.has(n)) return false;
  seen.add(n);
  return true;
});

// Fandom serves WebP (RIFF/WEBP magic). We accept WebP or PNG and store as .webp.
const localPalImage = (name) => `/paldex/${name.replace(/[^A-Za-z0-9]/g, "")}.webp`;
const localFile = (name) => resolve(outDir, `${name.replace(/[^A-Za-z0-9]/g, "")}.webp`);

const UA = "Mozilla/5.0 (PalBreedAI build script)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sanitizeTitle(name) {
  // Fandom File: pages normalize spaces/underscores; keep display name.
  return encodeURIComponent(name);
}

async function fetchImageUrl(name) {
  const api = `https://palworld.fandom.com/api.php?action=query&titles=File:${sanitizeTitle(
    name,
  )}.png&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(api, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`api ${res.status}`);
  const j = await res.json();
  const pages = j.query?.pages ?? {};
  const key = Object.keys(pages)[0];
  if (!key || key === "-1") return null;
  return pages[key]?.imageinfo?.[0]?.url ?? null;
}

async function download(name) {
  const url = await fetchImageUrl(name);
  if (!url) return { name, ok: false, reason: "no-fandom-file" };
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return { name, ok: false, reason: `img ${res.status}` };
  const buf = Buffer.from(await res.arrayBuffer());
  // Validate image magic bytes (untrusted external data): PNG or WebP.
  const isPng =
    buf.length > 8 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isWebp =
    buf.length > 12 &&
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
  if (!isPng && !isWebp) return { name, ok: false, reason: "not-image" };
  writeFileSync(localFile(name), buf);
  return { name, ok: true, bytes: buf.length };
}

let ok = 0;
let fail = 0;
const failed = [];
for (const name of names) {
  // Skip if already downloaded (idempotent re-runs).
  if (existsSync(localFile(name))) {
    ok++;
    continue;
  }
  try {
    const r = await download(name);
    if (r.ok) {
      ok++;
      console.log(`OK   ${name} -> ${localPalImage(name)} (${r.bytes}b)`);
    } else {
      fail++;
      failed.push(r);
      console.log(`FAIL ${name}: ${r.reason}`);
    }
  } catch (e) {
    fail++;
    failed.push({ name, ok: false, reason: e.message });
    console.log(`ERR  ${name}: ${e.message}`);
  }
  await sleep(150); // be polite to the wiki API
}

console.log(`\nDone. ok=${ok} fail=${fail} total=${names.length}`);
if (failed.length) {
  console.log("Failed:", failed.map((f) => f.name).join(", "));
  process.exitCode = 1;
}
