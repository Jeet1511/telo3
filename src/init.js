/**
 * Telo3 — initialise project context.
 * Copies the six templates into the target project. Never overwrites an
 * existing file. Non-interactive: safe to run in CI and scripts.
 */

import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTEXT_DOCS } from './find-context.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

/**
 * @param {string} targetDir - project directory (default: current dir)
 * @param {object} opts - { contextDir?: 'project-context' | 'docs/project-context' | '.' }
 * @returns {{ dir: string, created: string[], skipped: string[] }}
 */
export function initContext(targetDir = '.', opts = {}) {
  const root = resolve(targetDir);
  const contextName = opts.contextDir || 'project-context';
  const dir = contextName === '.' ? root : join(root, contextName);

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const created = [];
  const skipped = [];

  for (const doc of CONTEXT_DOCS) {
    const source = join(TEMPLATES_DIR, doc);
    const dest = join(dir, doc);
    if (existsSync(dest)) {
      skipped.push(doc);
    } else if (existsSync(source)) {
      copyFileSync(source, dest);
      created.push(doc);
    }
  }

  return { dir, created, skipped };
}
