/**
 * Telo3 — selective context loader.
 *
 * Instead of reading all six documents for every task, load only the ones
 * a task type needs. The token saving is measured (estimated ~4 chars/token)
 * against loading everything, so the number is real for this project —
 * not a marketing claim.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTEXT_DOCS, findContextDir } from './find-context.js';
import { estimateTokens } from './tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REFERENCES_DIR = join(__dirname, '..', 'references');

// Task type -> project docs to load. memory.md is always first: it is the
// current state and every task needs it.
export const TASK_MAP = {
  feature: ['memory.md', 'prd.md', 'architecture.md', 'rules.md'],
  bugfix: ['memory.md', 'tasks.md', 'architecture.md', 'rules.md'],
  design: ['memory.md', 'design.md'],
  security: ['memory.md', 'rules.md', 'architecture.md'],
  privacy: ['memory.md', 'rules.md', 'architecture.md'],
  legal: ['memory.md', 'rules.md'],
  accessibility: ['memory.md', 'design.md', 'rules.md'],
  seo: ['memory.md', 'design.md', 'rules.md'],
  performance: ['memory.md', 'architecture.md', 'rules.md'],
  docs: ['memory.md'],
  audit: [...CONTEXT_DOCS],
  all: [...CONTEXT_DOCS],
};

// Task type -> reference framework to include alongside the project docs.
export const TASK_REFS = {
  security: ['security-quality.md'],
  privacy: ['privacy-compliance.md'],
  legal: ['legal-compliance.md'],
  accessibility: ['accessibility-quality.md'],
  seo: ['seo-quality.md'],
  performance: ['performance-quality.md'],
  design: ['ui-quality.md'],
  audit: ['project-audit.md'],
};

function readIfExists(path) {
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}

/**
 * Load the context for a task type.
 * Returns { task, dir, docs: [{ name, source, tokens, content }], tokens,
 * totalTokens, savingsPct }.
 * `totalTokens` is the estimate for all six project docs; `savingsPct` is
 * the measured saving of the selection vs. loading everything.
 */
export function loadContext(targetDir = '.', task = 'default') {
  const dir = findContextDir(targetDir);
  const selected = TASK_MAP[task] || ['memory.md'];
  const docs = [];
  let totalTokens = 0;

  // Total = all six project docs (the "read everything" baseline).
  if (dir) {
    for (const doc of CONTEXT_DOCS) {
      const content = readIfExists(join(dir, doc));
      if (content !== null) totalTokens += estimateTokens(content);
    }
    for (const doc of selected) {
      const content = readIfExists(join(dir, doc));
      if (content !== null) {
        docs.push({ name: doc, source: 'project', tokens: estimateTokens(content), content });
      }
    }
  }

  // Reference frameworks for the task type.
  for (const ref of TASK_REFS[task] || []) {
    const content = readIfExists(join(REFERENCES_DIR, ref));
    if (content !== null) {
      docs.push({ name: ref, source: 'reference', tokens: estimateTokens(content), content });
    }
  }

  const tokens = docs.reduce((sum, d) => sum + d.tokens, 0);
  const savingsPct =
    totalTokens > 0 ? Math.round(((totalTokens - tokens) / totalTokens) * 100) : 0;

  return { task, dir, docs, tokens, totalTokens, savingsPct };
}
