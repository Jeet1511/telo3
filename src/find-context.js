/**
 * Locate the project-context directory.
 * Accepted locations: <root>/project-context, <root>/docs/project-context,
 * or the six documents directly at <root>.
 * @license MIT
 */
import { existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

export const CONTEXT_DOCS = [
  'prd.md',
  'architecture.md',
  'rules.md',
  'design.md',
  'tasks.md',
  'memory.md',
];

export function findContextDir(dir) {
  let root = resolve(dir);
  // Prefer the most complete conventional context at the nearest project level.
  // Ascend only within the repository; never scan recursively or load personal stores.
  for (let level = 0; level < 12; level++) {
    const candidates = [join(root, 'project-context'), join(root, 'docs', 'project-context'), root];
    let best = null;
    let count = 0;
    for (const candidate of candidates) {
      if (!existsSync(candidate) || !statSync(candidate).isDirectory()) continue;
      const score = CONTEXT_DOCS.filter(doc => {
        const file = join(candidate, doc);
        return existsSync(file) && statSync(file).isFile();
      }).length;
      if (score > count) { best = candidate; count = score; }
    }
    if (best) return best;
    const parent = dirname(root);
    if (parent === root || existsSync(join(root, '.git'))) return null;
    root = parent;
  }
  return null;
}