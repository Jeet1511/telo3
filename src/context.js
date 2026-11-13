/**
 * Task-scoped context loading: read only what the task needs.
 * memory.md is always first. Savings are measured, never claimed.
 * @license MIT
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTEXT_DOCS, findContextDir } from './find-context.js';
import { estimateTokens } from './tokens.js';
import { redactSecrets } from './validate.js';

const REFERENCE_DIR = new URL('../references/', import.meta.url);

const ALL_DOCS = ['memory.md', 'prd.md', 'architecture.md', 'rules.md', 'design.md', 'tasks.md'];

export const TASK_MAP = {
  feature: { docs: ['memory.md', 'prd.md', 'architecture.md', 'rules.md'], refs: [] },
  bugfix: { docs: ['memory.md', 'architecture.md', 'rules.md'], refs: [] },
  design: { docs: ['memory.md', 'design.md', 'rules.md'], refs: ['ui-quality.md', 'design-system.md', 'creative-stack.md'] },
  security: { docs: ['memory.md', 'architecture.md', 'rules.md'], refs: ['security-quality.md', 'privacy-compliance.md'] },
  privacy: { docs: ['memory.md', 'architecture.md'], refs: ['privacy-compliance.md', 'legal-compliance.md'] },
  legal: { docs: ['memory.md', 'prd.md'], refs: ['legal-compliance.md'] },
  accessibility: { docs: ['memory.md', 'design.md'], refs: ['accessibility-quality.md'] },
  seo: { docs: ['memory.md', 'design.md'], refs: ['seo-quality.md', 'performance-quality.md'] },
  performance: { docs: ['memory.md', 'architecture.md'], refs: ['performance-quality.md'] },
  docs: { docs: ['memory.md'], refs: ['document-specification.md'] },
  delegation: { docs: ['memory.md'], refs: ['smart-skill-delegation.md', 'token-optimization.md'] },
  audit: { docs: [...ALL_DOCS], refs: ['project-audit.md'] },
  all: { docs: [...ALL_DOCS], refs: [] },
};

function readIfPresent(path) {
  return existsSync(path) ? redactSecrets(readFileSync(path, 'utf8')) : null;
}

export function loadContext(dir, task = 'default') {
  const contextDir = findContextDir(dir);
  if (!contextDir) {
    return { dir: null, docs: [], tokens: 0, totalTokens: 0, savingsPct: 0, referenceTokens: 0, contextTokens: 0, missing: ['project-context'] };
  }

  const entry = TASK_MAP[task] || { docs: ['memory.md'], refs: [] };
  const docs = [];
  const missing = [];

  for (const name of entry.docs) {
    const content = readIfPresent(join(contextDir, name));
    if (content === null) { missing.push(name); continue; }
    docs.push({ name, source: 'context', content, tokens: estimateTokens(content) });
  }
  for (const name of entry.refs) {
    const content = readIfPresent(fileURLToPath(new URL(name, REFERENCE_DIR)));
    if (content === null) { missing.push(`references/${name}`); continue; }
    docs.push({ name, source: 'reference', content, tokens: estimateTokens(content) });
  }

  let totalTokens = 0;
  for (const name of CONTEXT_DOCS) {
    const content = readIfPresent(join(contextDir, name));
    if (content !== null) totalTokens += estimateTokens(content);
  }

  const referenceTokens = docs.filter(d => d.source === 'reference').reduce((sum, d) => sum + d.tokens, 0);
  const tokens = docs.reduce((sum, d) => sum + d.tokens, 0);
  const contextTokens = tokens - referenceTokens;
  // Compare selective docs + required refs with ALL docs + the SAME refs.
  // This is an estimated loading reduction, not observed API token usage.
  totalTokens += referenceTokens;
  const savingsPct = totalTokens > 0 ? Math.round(((totalTokens - tokens) / totalTokens) * 100) : 0;

  return { dir: contextDir, docs, tokens, totalTokens, savingsPct, referenceTokens, contextTokens, missing };
}