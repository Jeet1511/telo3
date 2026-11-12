/**
 * Single source of truth for the version: package.json.
 * @license MIT
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url));

export function getVersion() {
  return JSON.parse(readFileSync(pkgPath, 'utf8')).version;
}