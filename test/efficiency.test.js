import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from './helpers.js';
import { TASK_MAP } from '../src/context.js';
import { estimateTokens } from '../src/tokens.js';

test('efficiency: always-on core carries the capability fallback and anti-loop rules', () => {
  const core = readFileSync(join(REPO_ROOT, 'bootstrap', 'TELO3.md'), 'utf8');
  assert.match(core, /if absent, web-search or use built-ins, else build minimally/);
  assert.match(core, /2 failed tries → change approach/);
  assert.match(core, /Never re-read unchanged files/);
  const block = core.match(/<!-- TELO3:BEGIN[\s\S]*?<!-- TELO3:END -->/)[0];
  assert.ok(estimateTokens(block) <= 320, 'core over token budget');
});

test('efficiency: delegation is a routed task with the fallback ladder', () => {
  assert.ok(TASK_MAP.delegation.refs.includes('smart-skill-delegation.md'));
  const del = readFileSync(join(REPO_ROOT, 'references', 'smart-skill-delegation.md'), 'utf8');
  assert.match(del, /Fallback Ladder/);
  const tok = readFileSync(join(REPO_ROOT, 'references', 'token-optimization.md'), 'utf8');
  assert.match(tok, /2-strike rule/);
  const skill = readFileSync(join(REPO_ROOT, 'SKILL.md'), 'utf8');
  assert.match(skill, /Capability fallback & anti-loop/);
});
