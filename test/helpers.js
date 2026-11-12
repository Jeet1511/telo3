/**
 * Shared test fixtures. minimalDoc() satisfies REQUIRED_SECTIONS so tests
 * exercise the real validator contract, not a parallel fantasy contract.
 * @license MIT
 */
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REQUIRED_SECTIONS } from '../src/validate.js';
import { CONTEXT_DOCS } from '../src/find-context.js';

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function makeTempDir() {
  return mkdtempSync(join(tmpdir(), 'telo3-test-'));
}

function titleCase(key) {
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function minimalDoc(file) {
  const sections = REQUIRED_SECTIONS[file];
  const body = sections.map((s) => `## ${titleCase(s)}\n\nContent.\n`).join('\n');
  return `# ${titleCase(file.replace('.md', ''))}\n\n${body}`;
}

export function makeProject(overrides = {}) {
  const dir = makeTempDir();
  const ctx = join(dir, 'project-context');
  mkdirSync(ctx, { recursive: true });
  for (const doc of CONTEXT_DOCS) {
    writeFileSync(join(ctx, doc), overrides[doc] ?? minimalDoc(doc));
  }
  return dir;
}

export function makeTemplateProject() {
  const dir = makeTempDir();
  const ctx = join(dir, 'project-context');
  mkdirSync(ctx, { recursive: true });
  for (const doc of CONTEXT_DOCS) {
    copyFileSync(join(REPO_ROOT, 'templates', doc), join(ctx, doc));
  }
  return dir;
}