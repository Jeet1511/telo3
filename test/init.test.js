import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { initContext } from '../src/init.js';
import { makeTempDir } from './helpers.js';

test('init: creates all six documents in project-context/', () => {
  const dir = makeTempDir();
  const result = initContext(dir);
  assert.equal(result.created.length, 6);
  assert.equal(result.skipped.length, 0);
  assert.equal(readFileSync(join(result.dir, 'prd.md'), 'utf8').includes('Product Requirements'), true);
  rmSync(dir, { recursive: true, force: true });
});

test('init: never overwrites existing files', () => {
  const dir = makeTempDir();
  initContext(dir);
  const memoryPath = join(dir, 'project-context', 'memory.md');
  writeFileSync(memoryPath, 'MY CUSTOM CONTENT — do not touch');
  const second = initContext(dir);
  assert.equal(second.created.length, 0);
  assert.equal(second.skipped.length, 6);
  assert.equal(readFileSync(memoryPath, 'utf8'), 'MY CUSTOM CONTENT — do not touch');
  rmSync(dir, { recursive: true, force: true });
});

test('init: supports context at the project root', () => {
  const dir = makeTempDir();
  const result = initContext(dir, { contextDir: '.' });
  assert.equal(result.dir, dir);
  assert.equal(result.created.length, 6);
  rmSync(dir, { recursive: true, force: true });
});
