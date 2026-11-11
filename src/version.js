/**
 * Telo3 — single source of truth for the version.
 * Every version string in this repo must match package.json.
 * `npm test` enforces it (see test/version.test.js).
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');

let cached = null;

export function getVersion() {
  if (cached) return cached;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  cached = pkg.version;
  return cached;
}
