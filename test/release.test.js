import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, rmSync, mkdirSync, symlinkSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as api from '../index.js';
import { makeProject, makeTempDir, REPO_ROOT, minimalDoc } from './helpers.js';

function fixture(t, create = makeTempDir) {
  const dir = create();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function cli(args, cwd = REPO_ROOT) {
  return spawnSync(process.execPath, [join(REPO_ROOT, 'cli.js'), ...args], { cwd, encoding: 'utf8' });
}

test('release: reference-inclusive comparison uses the same task references in its baseline', t => {
  const dir = fixture(t, makeProject);
  const allDocs = api.loadContext(dir, 'all');
  for (const task of Object.keys(api.TASK_MAP)) {
    const result = api.loadContext(dir, task);
    const refs = result.docs.filter(d => d.source === 'reference').reduce((n, d) => n + d.tokens, 0);
    assert.equal(result.referenceTokens, refs, task);
    assert.equal(result.totalTokens, allDocs.tokens + refs, task);
    assert.ok(result.tokens <= result.totalTokens, task);
    assert.ok(result.savingsPct >= 0 && result.savingsPct <= 100, task);
  }
});

test('release: context output redacts detected credentials, including code fences and PEM bodies', t => {
  const sample = 'api_key = "SYNTHETIC_CREDENTIAL_12345"';
  const dir = fixture(t, () => makeProject({
    'memory.md': `${minimalDoc('memory.md')}\n${sample}\n\n\`\`\`\n-----BEGIN PRIVATE KEY-----\nSYNTHETIC_PEM_BODY\n-----END PRIVATE KEY-----\n\`\`\`\n`,
  }));
  const result = api.loadContext(dir);
  const text = JSON.stringify(result);
  assert.doesNotMatch(text, /SYNTHETIC_CREDENTIAL|SYNTHETIC_PEM_BODY/);
  assert.match(result.docs[0].content, /REDACTED/);
});

test('release: missing selected context is reported, not silently omitted', t => {
  const dir = fixture(t, makeProject);
  rmSync(join(dir, 'project-context', 'memory.md'));
  const result = api.loadContext(dir, 'feature');
  assert.ok(result.missing.includes('memory.md'));
  const out = cli(['context', 'feature', dir, '--measure']);
  assert.match(out.stderr, /missing.*memory\.md/i);
});

test('release: token CLI labels estimates and a like-for-like baseline', t => {
  const dir = fixture(t, makeProject);
  const out = cli(['context', 'security', dir, '--measure']);
  assert.equal(out.status, 0);
  assert.match(out.stdout, /same task references/i);
  assert.match(out.stdout, /estimate/i);
  assert.doesNotMatch(out.stdout, /saving: -\d/);
});

test('release: install command places a complete durable skill in the project', t => {
  const dir = fixture(t);
  const out = cli(['install', dir, '--agent', 'qoder']);
  assert.equal(out.status, 0, out.stderr);
  const skill = join(dir, '.qoder', 'skills', 'telo3');
  for (const file of ['SKILL.md', 'package.json', 'cli.js', 'src/context.js', 'bootstrap/TELO3.md', 'templates/memory.md', 'references/security-quality.md', 'hooks/inject-contract.mjs']) {
    assert.ok(existsSync(join(skill, file)), file);
  }
  const stored = JSON.parse(readFileSync(join(skill, 'package.json'), 'utf8'));
  assert.equal(stored.version, api.version);
  assert.ok(!existsSync(join(skill, 'examples')));
  assert.ok(!existsSync(join(skill, '_backup_v5.1.0')));
  assert.match(out.stdout, /telo3.*chat/i);
});

test('release: installer supports standard and native project skill directories', t => {
  assert.equal(typeof api.installSkill, 'function');
  for (const [agent, path] of Object.entries({ agents: '.agents', qoder: '.qoder', claude: '.claude', cursor: '.cursor', gemini: '.gemini', copilot: '.github' })) {
    const dir = fixture(t);
    const result = api.installSkill(dir, { agent });
    assert.equal(result.dir, join(dir, path, 'skills', 'telo3'));
    assert.ok(existsSync(join(result.dir, 'SKILL.md')));
  }
});

test('release: installation auto-detects a native host and is idempotent', t => {
  const dir = fixture(t);
  mkdirSync(join(dir, '.qoder'));
  const first = cli(['install', dir]);
  assert.equal(first.status, 0, first.stderr);
  assert.ok(existsSync(join(dir, '.qoder', 'skills', 'telo3', 'SKILL.md')));
  const second = cli(['install', dir]);
  assert.equal(second.status, 0, second.stderr);
  assert.match(second.stdout, /unchanged/i);
});

test('release: a manually installed skill can activate from its own native directory without an ownership marker', t => {
  const dir = fixture(t);
  const installed = api.installSkill(dir, { agent: 'qoder' });
  rmSync(join(installed.dir, '.telo3-install.json'));
  const out = spawnSync(process.execPath, [join(installed.dir, 'cli.js'), 'activate', dir], { encoding: 'utf8' });
  assert.equal(out.status, 0, out.stderr);
  assert.match(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), /\.qoder\/skills\/telo3\/SKILL\.md/);
  assert.equal(existsSync(join(installed.dir, '.telo3-install.json')), false, 'do not claim ownership over a manual skill');
});

test('release: skill installation refuses user-owned directories and user edits', t => {
  assert.equal(typeof api.installSkill, 'function');
  const dir = fixture(t);
  const dest = join(dir, '.agents', 'skills', 'telo3');
  mkdirSync(dest, { recursive: true });
  writeFileSync(join(dest, 'SKILL.md'), 'User-owned skill');
  assert.throws(() => api.installSkill(dir, { agent: 'agents' }), /owned|unmanaged|conflict/i);
  assert.equal(readFileSync(join(dest, 'SKILL.md'), 'utf8'), 'User-owned skill');
  rmSync(dest, { recursive: true });
  api.installSkill(dir, { agent: 'agents' });
  writeFileSync(join(dest, 'SKILL.md'), 'User customization');
  assert.throws(() => api.installSkill(dir, { agent: 'agents' }), /modified|changed|custom/i);
  assert.equal(readFileSync(join(dest, 'SKILL.md'), 'utf8'), 'User customization');
});

test('release: install rejects linked destination parents before writing outside project', t => {
  assert.equal(typeof api.installSkill, 'function');
  const dir = fixture(t);
  const outside = fixture(t);
  symlinkSync(outside, join(dir, '.agents'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => api.installSkill(dir, { agent: 'agents' }), /link|symlink/i);
  assert.equal(existsSync(join(outside, 'skills')), false);
});

test('release: bad CLI flags and malformed values fail before side effects', t => {
  const dir = fixture(t);
  for (const args of [['install', dir, '--agent', 'unknown'], ['activate', dir, '--skill-path', '--all'], ['init', dir, '--oops']]) {
    const out = cli(args);
    assert.equal(out.status, 1);
    assert.doesNotMatch(out.stderr, /\n\s+at\s/);
  }
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
  assert.equal(existsSync(join(dir, 'project-context')), false);
});

test('release: activation references the existing context directory and compresses host bridges', t => {
  const dir = fixture(t);
  api.initContext(dir, { contextDir: 'docs/project-context' });
  const inst = api.installSkill(dir, { agent: 'agents' });
  api.activate(dir, { skillPath: inst.skillPath });
  const agents = readFileSync(join(dir, 'AGENTS.md'), 'utf8');
  assert.match(agents, /docs\/project-context\/memory\.md/);
  assert.ok(api.estimateTokens(agents) <= 320, 'always-on core exceeded budget');
  for (const rel of ['CLAUDE.md', 'GEMINI.md', '.github/copilot-instructions.md', '.cursor/rules/telo3.mdc']) {
    const bridge = readFileSync(join(dir, rel), 'utf8');
    assert.match(bridge, /AGENTS\.md/);
    assert.ok(api.estimateTokens(bridge) <= 110, rel);
  }
});

test('release: activation updates/deactivation preserve custom material in dedicated rules byte-for-byte', t => {
  const dir = fixture(t);
  api.activate(dir, { all: true });
  const rule = join(dir, '.cursor', 'rules', 'telo3.mdc');
  writeFileSync(rule, `${readFileSync(rule, 'utf8')}\nCUSTOM RULE\n`);
  api.activate(dir, { all: true });
  assert.match(readFileSync(rule, 'utf8'), /CUSTOM RULE/);
  api.deactivate(dir);
  assert.ok(existsSync(rule));
  assert.match(readFileSync(rule, 'utf8'), /CUSTOM RULE/);
});

test('release: shared instructions survive deactivate without trimming unrelated whitespace', t => {
  const dir = fixture(t);
  const original = '\n# Project\n\n\nKeep spacing.\n\n';
  writeFileSync(join(dir, 'AGENTS.md'), original);
  api.activate(dir);
  api.deactivate(dir);
  assert.equal(readFileSync(join(dir, 'AGENTS.md'), 'utf8'), original);
});

test('release: activation rejects an unresolved skill link before creating instruction files', t => {
  const dir = fixture(t);
  assert.throws(() => api.activate(dir, { skillPath: join(dir, 'missing', 'SKILL.md') }), /skill|missing|exist/i);
  assert.equal(existsSync(join(dir, 'AGENTS.md')), false);
});

test('release: runtime assets including hooks are explicitly publishable, without examples or custom registries', () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
  assert.ok(pkg.files.includes('hooks/'));
  assert.ok(!pkg.files.includes('examples/'));
  assert.ok(!pkg.files.includes('SKILL-METADATA.json'));
  assert.ok(!('skillpm' in pkg));
  assert.equal(pkg.scripts.postinstall, 'node scripts/postinstall.mjs', 'safe additive setup hook');
  assert.ok(pkg.files.includes('scripts/postinstall.mjs'));
  assert.match(pkg.engines.node, /20/);
});

test('release: on-demand skill stays short and respects opt-in/host permission boundaries', () => {
  const text = readFileSync(join(REPO_ROOT, 'SKILL.md'), 'utf8');
  assert.ok(text.trim().split(/\s+/).length <= 850, 'entry skill too verbose');
  const desc = text.match(/^description:\s*(.+)$/m)[1];
  assert.ok(desc.length <= 500);
  assert.doesNotMatch(desc, /or when starting, onboarding, building/);
  assert.match(text, /permission|host|system/i);
  assert.match(text, /file tools/i);
  assert.doesNotMatch(text, /get a yes|before approval/);
});

test('release: optional session hook emits nothing on inactive project, core only after activation', t => {
  const dir = fixture(t);
  const hook = join(REPO_ROOT, 'hooks', 'inject-contract.mjs');
  const inactive = spawnSync(process.execPath, [hook], { cwd: dir, encoding: 'utf8' });
  assert.equal(inactive.status, 0);
  assert.deepEqual(JSON.parse(inactive.stdout), {});
  const inst = api.installSkill(dir, { agent: 'agents' });
  api.activate(dir, { skillPath: inst.skillPath });
  const active = spawnSync(process.execPath, [hook], { cwd: dir, encoding: 'utf8' });
  const output = JSON.parse(active.stdout);
  assert.equal(output.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(output.hookSpecificOutput.additionalContext, /TELO3:BEGIN/);
  assert.doesNotMatch(output.hookSpecificOutput.additionalContext, /\{\{/);
  assert.ok(api.estimateTokens(output.hookSpecificOutput.additionalContext) <= 320);
});
