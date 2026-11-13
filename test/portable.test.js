import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync, mkdirSync, writeFileSync, readFileSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as api from '../index.js';
import { makeTempDir } from './helpers.js';

function fixture(t) {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function setup(dir) {
  const installed = api.installSkill(dir, { agent: 'agents' });
  api.initContext(dir);
  api.activate(dir, { skillPath: installed.skillPath });
  return installed;
}

test('portable: global install lands in the user home, not the project', t => {
  const home = fixture(t);
  const project = fixture(t);
  const result = api.installSkill(project, { agent: 'qoder', global: true, home });
  assert.ok(result.dir.startsWith(home));
  assert.ok(existsSync(join(home, '.qoder', 'skills', 'telo3', 'SKILL.md')));
  assert.equal(existsSync(join(project, '.qoder')), false);
});

test('portable: a fully set-up project passes the portability check', t => {
  const dir = fixture(t);
  setup(dir);
  const result = api.checkPortable(dir);
  assert.equal(result.portable, true, result.issues.join('; '));
});

test('portable: moving the whole project to a new path keeps context and powers', t => {
  const a = fixture(t);
  const b = join(fixture(t), 'moved');
  setup(a);
  cpSync(a, b, { recursive: true });
  const result = api.checkPortable(b);
  assert.equal(result.portable, true, result.issues.join('; '));
  assert.equal(api.loadContext(b, 'feature').docs.length, 4);
  assert.match(readFileSync(join(b, 'AGENTS.md'), 'utf8'), /\.agents\/skills\/telo3\/SKILL\.md/);
});

test('portable: machine-absolute skill path is flagged', t => {
  const dir = fixture(t);
  setup(dir);
  const p = join(dir, 'AGENTS.md');
  writeFileSync(p, readFileSync(p, 'utf8').replace(/Depth: `[^`]+`/, 'Depth: `C:/other/pc/SKILL.md`'));
  const result = api.checkPortable(dir);
  assert.equal(result.portable, false);
  assert.ok(result.issues.some(i => /absolute/i.test(i)));
});
