import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { validateContext } from '../src/validate.js';
import { makeProject, makeTemplateProject, makeTempDir, minimalDoc } from './helpers.js';

test('validate: no context directory found -> invalid with a helpful error', () => {
  const dir = makeTempDir();
  const result = validateContext(dir);
  assert.equal(result.valid, false);
  assert.equal(result.dir, null);
  assert.match(result.errors[0].message, /telo3 init/);
  rmSync(dir, { recursive: true, force: true });
});

test('validate: minimal valid docs -> valid, no errors', () => {
  const dir = makeProject();
  const result = validateContext(dir);
  assert.equal(result.valid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.files.length, 6);
  rmSync(dir, { recursive: true, force: true });
});

test('validate: blank templates -> valid (sections present) but placeholders warned', () => {
  const dir = makeTemplateProject();
  const result = validateContext(dir);
  assert.equal(result.valid, true);
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.length > 0, 'expected placeholder warnings');
  assert.ok(result.files.every((f) => f.placeholders > 0));
  rmSync(dir, { recursive: true, force: true });
});

test('validate: missing document -> error naming the file', () => {
  const dir = makeProject();
  rmSync(join(dir, 'project-context', 'tasks.md'));
  const result = validateContext(dir);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.file === 'tasks.md' && /Missing required document/.test(e.message)));
  rmSync(dir, { recursive: true, force: true });
});

test('validate: missing required section -> error naming the section', () => {
  const dir = makeProject({
    'prd.md': '# Product Requirements Document (PRD)\n\n## Project Overview\n\nContent.\n',
  });
  const result = validateContext(dir);
  assert.equal(result.valid, false);
  const prd = result.files.find((f) => f.file === 'prd.md');
  assert.ok(prd.missingSections.includes('problem statement'));
  assert.ok(result.errors.some((e) => e.file === 'prd.md' && /problem statement/.test(e.message)));
  rmSync(dir, { recursive: true, force: true });
});

test('validate: code blocks and inline code are not placeholders', () => {
  const dir = makeProject({
    'rules.md': `${minimalDoc('rules.md')}\n\n\`\`\`js\nconst s = z.enum(['todo', 'in_progress', 'done']);\nconst arr = [1, 2, 3];\n\`\`\`\n\nUse \`[bracket]\` in code.\n`,
  });
  const result = validateContext(dir);
  const rules = result.files.find((f) => f.file === 'rules.md');
  assert.equal(rules.placeholders, 0);
  rmSync(dir, { recursive: true, force: true });
});

test('validate: checkboxes and markdown links are not placeholders', () => {
  const dir = makeProject({
    'tasks.md': `${minimalDoc('tasks.md')}\n\n- [ ] Open task\n- [x] Done task\n- [Link text](https://example.com)\n`,
  });
  const result = validateContext(dir);
  const tasks = result.files.find((f) => f.file === 'tasks.md');
  assert.equal(tasks.placeholders, 0);
  rmSync(dir, { recursive: true, force: true });
});

test('validate: placeholders and TODOs -> warnings with counts', () => {
  const dir = makeProject({
    'memory.md': `${minimalDoc('memory.md')}\n\n[TODO: fill this in]\n[Project Name]\n`,
  });
  const result = validateContext(dir);
  assert.equal(result.valid, true);
  const memory = result.files.find((f) => f.file === 'memory.md');
  assert.ok(memory.placeholders >= 2);
  assert.ok(result.warnings.some((w) => w.file === 'memory.md' && /placeholder/.test(w.message)));
  rmSync(dir, { recursive: true, force: true });
});

test('validate: accidental secret -> warning with file and line, never the value', () => {
  const dir = makeProject({
    'rules.md': `${minimalDoc('rules.md')}\n\napi_key = "FAKEKEY12345678"\n`,
  });
  const result = validateContext(dir);
  assert.equal(result.valid, true);
  const warning = result.warnings.find((w) => w.file === 'rules.md' && /secret/.test(w.message));
  assert.ok(warning, 'expected a secret warning');
  assert.match(warning.message, /line \d+/);
  assert.doesNotMatch(warning.message, /FAKEKEY/);
  rmSync(dir, { recursive: true, force: true });
});

test('validate: fresh docs are not flagged stale', () => {
  const dir = makeProject();
  const result = validateContext(dir);
  assert.ok(result.files.every((f) => f.stale === null));
  rmSync(dir, { recursive: true, force: true });
});
