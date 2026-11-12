import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { REPO_ROOT, makeTempDir } from './helpers.js';

const SCRIPT = join(REPO_ROOT, 'scripts', 'postinstall.mjs');

function run(env, cwd = REPO_ROOT) {
  return spawnSync(process.execPath, [SCRIPT], { cwd, encoding: 'utf8', env: { ...process.env, ...env } });
}

test('postinstall: npm i telo3-ai sets up the skill in the invoking project', t => {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const out = run({ INIT_CWD: dir, npm_config_global: 'false' });
  assert.equal(out.status, 0, out.stderr);
  assert.ok(existsSync(join(dir, '.agents', 'skills', 'telo3', 'SKILL.md')));
  assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /TELO3:BEGIN/);
  assert.doesNotMatch(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /\{\{/);
});

test('postinstall: second install is idempotent and preserves user content', t => {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  writeFileSync(join(dir, 'AGENTS.md'), '# My rules\n\nKeep me.\n');
  run({ INIT_CWD: dir, npm_config_global: 'false' });
  const second = run({ INIT_CWD: dir, npm_config_global: 'false' });
  assert.equal(second.status, 0, second.stderr);
  const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.match(agents, /Keep me\./);
  assert.equal(agents.match(/TELO3:BEGIN/g).length, 1);
});

test('postinstall: global install does not write into a random project', t => {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const out = run({ INIT_CWD: dir, npm_config_global: 'true' });
  assert.equal(out.status, 0, out.stderr);
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
});

test('postinstall: never fails the npm install even on an unusable target', t => {
  const out = run({ INIT_CWD: join(REPO_ROOT, 'does-not-exist-xyz'), npm_config_global: 'false' });
  assert.equal(out.status, 0, out.stderr);
});

test('postinstall: opt-out env skips setup', t => {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const out = run({ INIT_CWD: dir, npm_config_global: 'false', TELO3_SKIP: '1' });
  assert.equal(out.status, 0, out.stderr);
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
});

test('postinstall: package declares the safe setup hook', () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.postinstall, 'node scripts/postinstall.mjs');
});
