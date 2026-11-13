import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { activate, deactivate } from '../src/activate.js';
import { makeTempDir } from './helpers.js';

const BEGIN = /<!-- TELO3:BEGIN/;

test('activate: installs the contract into AGENTS.md and tool files', () => {
  const dir = makeTempDir();
  const result = activate(dir);
  const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.match(agents, BEGIN);
  assert.match(agents, /always-on engineering contract/);
  assert.match(agents, /memory resets between sessions/i);
  assert.ok(existsSync(join(dir, 'CLAUDE.md')));
  assert.ok(existsSync(join(dir, '.cursor', 'rules', 'telo3.mdc')));
  const mdc = readFileSync(join(dir, '.cursor', 'rules', 'telo3.mdc'), 'utf8');
  assert.match(mdc, /alwaysApply: true/);
  assert.ok(result.targets.every((t) => t.action === 'created'));
  rmSync(dir, { recursive: true, force: true });
});

test('activate: is idempotent (second run changes nothing)', () => {
  const dir = makeTempDir();
  activate(dir);
  const second = activate(dir);
  assert.ok(second.targets.every((t) => t.action === 'unchanged'));
  rmSync(dir, { recursive: true, force: true });
});

test('activate: preserves unrelated content and replaces only its block', () => {
  const dir = makeTempDir();
  writeFileSync(join(dir, 'AGENTS.md'), '# My Project\n\nExisting rules the user wrote.\n');
  activate(dir);
  const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.match(agents, /Existing rules the user wrote\./);
  assert.match(agents, BEGIN);
  // exactly one block
  assert.equal(agents.match(/TELO3:BEGIN/g).length, 1);
  rmSync(dir, { recursive: true, force: true });
});

test('activate: never clobbers a dedicated rule file it does not manage', () => {
  const dir = makeTempDir();
  mkdirSync(join(dir, '.cursor', 'rules'), { recursive: true });
  writeFileSync(join(dir, '.cursor', 'rules', 'telo3.mdc'), 'user-owned, no telo3 marker');
  const result = activate(dir);
  const t = result.targets.find((x) => x.file.includes('telo3.mdc'));
  assert.equal(t.action, 'skipped');
  assert.equal(readFileSync(join(dir, '.cursor', 'rules', 'telo3.mdc'), 'utf8'), 'user-owned, no telo3 marker');
  rmSync(dir, { recursive: true, force: true });
});

test('activate: --all adds windsurf and cline targets', () => {
  const dir = makeTempDir();
  activate(dir, { all: true });
  assert.ok(existsSync(join(dir, '.windsurf', 'rules', 'telo3.md')));
  assert.ok(existsSync(join(dir, '.clinerules', 'telo3.md')));
  rmSync(dir, { recursive: true, force: true });
});

test('activate: skill path is relative (no absolute machine paths leaked)', () => {
  const dir = makeTempDir();
  const result = activate(dir);
  assert.ok(!result.skillPath.includes(':\\'), 'skill path should be relative');
  assert.match(result.skillPath, /SKILL\.md$/);
  rmSync(dir, { recursive: true, force: true });
});

test('deactivate: removes blocks, keeps unrelated content, deletes managed rule files', () => {
  const dir = makeTempDir();
  writeFileSync(join(dir, 'AGENTS.md'), '# My Project\n\nKeep me.\n');
  activate(dir, { all: true });
  const result = deactivate(dir);
  const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.doesNotMatch(agents, BEGIN);
  assert.match(agents, /Keep me\./);
  assert.ok(!existsSync(join(dir, '.cursor', 'rules', 'telo3.mdc')));
  assert.ok(!existsSync(join(dir, '.clinerules', 'telo3.md')));
  assert.ok(result.targets.some((t) => t.action === 'removed'));
  rmSync(dir, { recursive: true, force: true });
});

test('deactivate: is safe on a project that was never activated', () => {
  const dir = makeTempDir();
  const result = deactivate(dir);
  assert.ok(result.targets.every((t) => t.action === 'absent' || t.action === 'skipped'));
  rmSync(dir, { recursive: true, force: true });
});