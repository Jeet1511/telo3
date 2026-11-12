import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT, makeProject, makeTempDir } from './helpers.js';

const CLI = join(REPO_ROOT, 'cli.js');

function runCli(args, cwd = REPO_ROOT) {
  return spawnSync('node', [CLI, ...args], { cwd, encoding: 'utf8' });
}

test('cli: version prints the package.json version', () => {
  const out = runCli(['version']);
  assert.equal(out.status, 0);
  assert.match(out.stdout, /^Telo3 v\d+\.\d+\.\d+\n?$/);
});

test('cli: help lists all commands', () => {
  const out = runCli(['help']);
  assert.equal(out.status, 0);
  for (const cmd of ['init', 'validate', 'status', 'context', 'version']) {
    assert.ok(out.stdout.includes(cmd), `help missing ${cmd}`);
  }
});

test('cli: unknown command exits 1', () => {
  const out = runCli(['explode']);
  assert.equal(out.status, 1);
  assert.match(out.stderr, /Unknown command/);
});

test('cli: validate exits 0 on a valid project, 1 on a broken one', () => {
  const good = makeProject();
  assert.equal(runCli(['validate', good]).status, 0);
  rmSync(good, { recursive: true, force: true });

  const empty = makeTempDir();
  const bad = runCli(['validate', empty]);
  assert.equal(bad.status, 1);
  assert.match(bad.stdout + bad.stderr, /No project context found/);
  rmSync(empty, { recursive: true, force: true });
});

test('cli: validate --json outputs parseable results', () => {
  const dir = makeProject();
  const out = runCli(['validate', dir, '--json']);
  assert.equal(out.status, 0);
  const parsed = JSON.parse(out.stdout);
  assert.equal(parsed.valid, true);
  assert.equal(parsed.files.length, 6);
  rmSync(dir, { recursive: true, force: true });
});

test('cli: context --measure reports a measured saving', () => {
  const dir = makeProject();
  const out = runCli(['context', 'feature', dir, '--measure']);
  assert.equal(out.status, 0);
  assert.match(out.stdout, /Measured saving: \d+%/);
  rmSync(dir, { recursive: true, force: true });
});

test('cli: context with an unknown task exits 1', () => {
  const dir = makeProject();
  const out = runCli(['context', 'nonsense-task', dir]);
  assert.equal(out.status, 1);
  assert.match(out.stderr, /Unknown task/);
  rmSync(dir, { recursive: true, force: true });
});

test('cli: status reports valid on a good project', () => {
  const dir = makeProject();
  const out = runCli(['status', dir]);
  assert.equal(out.status, 0);
  assert.match(out.stdout, /valid/);
  rmSync(dir, { recursive: true, force: true });
});
