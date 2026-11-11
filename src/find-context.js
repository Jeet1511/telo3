/**
 * Telo3 — locate the project-context directory.
 * Looks in, in order: project-context/, docs/project-context/, project root.
 * Returns the absolute path of the first directory that contains at least
 * one of the six context documents, or null when none is found.
 */

import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const CONTEXT_DOCS = [
  'prd.md',
  'architecture.md',
  'rules.md',
  'design.md',
  'tasks.md',
  'memory.md',
];

const CANDIDATES = ['project-context', 'docs/project-context', '.'];

export function findContextDir(targetDir = '.') {
  const root = resolve(targetDir);
  for (const candidate of CANDIDATES) {
    const dir = join(root, candidate);
    if (CONTEXT_DOCS.some((doc) => existsSync(join(dir, doc)))) {
      return dir;
    }
  }
  return null;
}
