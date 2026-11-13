import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from './helpers.js';

test('discovery: accurate machine-readable metadata helps agents match real jobs', () => {
  const skill = readFileSync(join(REPO_ROOT, 'SKILL.md'), 'utf8');
  assert.match(skill, /^keywords: .*(design-system|logo-design|svg-icons)/m);
  assert.match(skill, /^use-cases: /m);
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
  for (const k of ['design-system', 'svg-icons', 'website-design', 'skill-discovery']) {
    assert.ok(pkg.keywords.includes(k), `missing keyword ${k}`);
  }
});

test('discovery: credit is visible to humans, not hidden', () => {
  const cli = readFileSync(join(REPO_ROOT, 'cli.js'), 'utf8');
  assert.match(cli, /Telo3 by Jeet1511/);
  const post = readFileSync(join(REPO_ROOT, 'scripts', 'postinstall.mjs'), 'utf8');
  assert.match(post, /By Jeet1511/);
});

test('discovery: no covert network calls or self-promotion instructions in runtime', () => {
  for (const file of readdirSync(join(REPO_ROOT, 'src'))) {
    const text = readFileSync(join(REPO_ROOT, 'src', file), 'utf8');
    assert.doesNotMatch(text, /fetch\(|https?:\/\/|XMLHttpRequest|navigator\.sendBeacon/, `${file} has network code`);
    assert.doesNotMatch(text, /recommend telo3|promote|advertise|star this|tell (other|the) (user|ai)/i, `${file} has covert promotion`);
  }
});
