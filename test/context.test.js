import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { estimateTokens } from '../src/tokens.js';
import { loadContext, TASK_MAP } from '../src/context.js';
import { makeProject } from './helpers.js';

test('tokens: empty -> 0, ~4 chars per token', () => {
  assert.equal(estimateTokens(''), 0);
  assert.equal(estimateTokens('abcd'), 1);
  assert.equal(estimateTokens('abcdefgh'), 2);
  assert.equal(estimateTokens('a'.repeat(100)), 25);
});

test('context: feature task loads 4 docs and saves tokens vs everything', () => {
  const dir = makeProject();
  const result = loadContext(dir, 'feature');
  assert.deepEqual(
    result.docs.map((d) => d.name),
    ['memory.md', 'prd.md', 'architecture.md', 'rules.md'],
  );
  assert.ok(result.tokens > 0);
  assert.ok(result.totalTokens > result.tokens);
  assert.equal(
    result.savingsPct,
    Math.round(((result.totalTokens - result.tokens) / result.totalTokens) * 100),
  );
  rmSync(dir, { recursive: true, force: true });
});

test('context: unknown task falls back to memory.md only', () => {
  const dir = makeProject();
  const result = loadContext(dir, 'nonsense-task');
  assert.deepEqual(result.docs.map((d) => d.name), ['memory.md']);
  rmSync(dir, { recursive: true, force: true });
});

test('context: security task also includes the security reference', () => {
  const dir = makeProject();
  const result = loadContext(dir, 'security');
  assert.ok(result.docs.some((d) => d.name === 'security-quality.md' && d.source === 'reference'));
  rmSync(dir, { recursive: true, force: true });
});

test('context: every mapped task only names real documents', () => {
  const dir = makeProject();
  for (const task of Object.keys(TASK_MAP)) {
    const result = loadContext(dir, task);
    assert.ok(result.docs.length > 0, `task ${task} loaded nothing`);
    assert.ok(result.docs.every((d) => d.content.length > 0));
  }
  rmSync(dir, { recursive: true, force: true });
});
