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
  assert.ok(existsSync(join(REPO_ROOT, 'references', 'creative-stack.md')));
  assert.ok(TASK_MAP.design.refs.includes('creative-stack.md'));
  assert.equal(references.creativeStack, './references/creative-stack.md');
  const stack = readFileSync(join(REPO_ROOT, 'references', 'creative-stack.md'), 'utf8');
  for (const s of ['Vite', 'GSAP', 'Lenis', 'Three.js', 'single-file', 'prefers-reduced-motion']) {
    assert.ok(stack.includes(s), `creative-stack missing ${s}`);
  }
  const text = readFileSync(join(REPO_ROOT, 'references', 'design-system.md'), 'utf8');
  for (const rule of ['Lucide', 'wordmark', 'palette', 'screenshot', 'Inter', 'photo cards', 'imagery']) {
    assert.ok(text.includes(rule), `design engine missing ${rule}`);
  }
  assert.match(text, /anti-generic ≠ minimal/);
  for (const type of ['Portfolio', 'SaaS', 'E-commerce', 'Restaurant', 'Editorial', 'Docs']) {
    assert.ok(text.includes(type), `missing site type ${type}`);
  }
  for (const tech of ['clamp(', 'cubic-bezier(.16,1,.3,1)', 'Three.js']) {
    assert.ok(text.includes(tech), `missing reverse-engineered technique ${tech}`);
  }
  assert.match(text, /Taste algorithm/);
  assert.match(text, /Genericness reject gate/);
  assert.match(text, /design-check/);
  const core = readFileSync(join(REPO_ROOT, 'bootstrap', 'TELO3.md'), 'utf8');
  assert.match(core, /design-system\.md/);
  assert.match(core, /design-check/);
});

test('design: always-on core keeps concise replies but not reduced implementation quality', () => {
  const core = readFileSync(join(REPO_ROOT, 'bootstrap', 'TELO3.md'), 'utf8');
  assert.match(core, /ultra-concise by default/);
  assert.match(core, /NOT implementation quality/);
  assert.match(core, /render \+ screenshot \+ critique/);
});

test('design: SKILL routes design work to the engine and visual gate', () => {
  const skill = readFileSync(join(REPO_ROOT, 'SKILL.md'), 'utf8');
  assert.match(skill, /design-system/);
  assert.match(skill, /render→screenshot→critique/);
  assert.match(skill, /ultra-concise by default/);
});
