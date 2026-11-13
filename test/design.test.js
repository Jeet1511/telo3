import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from './helpers.js';
import { TASK_MAP } from '../src/context.js';
import { references } from '../index.js';

test('design: prescriptive design engine ships and is routed for design tasks', () => {
  assert.ok(existsSync(join(REPO_ROOT, 'references', 'design-system.md')));
  assert.ok(TASK_MAP.design.refs.includes('design-system.md'));
  assert.equal(references.designSystem, './references/design-system.md');
  const text = readFileSync(join(REPO_ROOT, 'references', 'design-system.md'), 'utf8');
  for (const rule of ['Lucide', 'wordmark', 'OKLCH', 'screenshot', 'Inter']) {
    assert.ok(text.includes(rule), `design engine missing ${rule}`);
  }
});

test('design: always-on core enforces auto-concise and brand-derived design', () => {
  const core = readFileSync(join(REPO_ROOT, 'bootstrap', 'TELO3.md'), 'utf8');
  assert.match(core, /ultra-concise by default/);
  assert.match(core, /no emoji icons/);
  assert.match(core, /wordmark logo/);
  assert.match(core, /screenshot \+ critique/);
});

test('design: SKILL routes design work to the engine and visual gate', () => {
  const skill = readFileSync(join(REPO_ROOT, 'SKILL.md'), 'utf8');
  assert.match(skill, /design-system/);
  assert.match(skill, /render→screenshot→critique/);
  assert.match(skill, /ultra-concise by default/);
});
