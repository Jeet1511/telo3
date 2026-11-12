/**
 * Initialize the six context documents from lean templates.
 * Never overwrites existing files.
 * @license MIT
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTEXT_DOCS } from './find-context.js';
import { assertSafePath } from './paths.js';

const TEMPLATE_DIR = new URL('../templates/', import.meta.url);

export function initContext(dir, opts = {}) {
  const root = resolve(dir);
  const contextDir = opts.contextDir ?? 'project-context';
  const target = assertSafePath(root, contextDir === '.' ? root : resolve(root, contextDir));
  mkdirSync(target, { recursive: true });

  const created = [];
  const skipped = [];
  for (const doc of CONTEXT_DOCS) {
    const dest = assertSafePath(root, join(target, doc));
    if (existsSync(dest)) {
      skipped.push(doc);
      continue;
    }
    const template = readFileSync(fileURLToPath(new URL(doc, TEMPLATE_DIR)), 'utf8');
    try {
      writeFileSync(dest, template, { flag: 'wx' });
      created.push(doc);
    } catch (error) {
      if (error.code === 'EEXIST') skipped.push(doc);
      else throw error;
    }
  }
  return { dir: target, created, skipped };
}