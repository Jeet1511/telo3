import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as api from '../index.js';
import { makeTempDir, REPO_ROOT } from './helpers.js';

function site(t, files) {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(dir, rel, '..'), { recursive: true });
    writeFileSync(join(dir, rel), text);
  }
  return dir;
}

// Mirrors the generic output observed in a real test project (system font,
// Flat-UI palette, stock fadeInUp, icon-font CDN, no reduced-motion).
const GENERIC = {
  'index.html': '<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></head><body><section class="hero"></section><section class="features"></section><section class="testimonials"></section><p>Lorem ipsum dolor</p></body></html>',
  'styles.css': ":root{--primary-color:#2c3e50;--secondary-color:#e74c3c;--accent-color:#3498db}body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}@keyframes fadeInUp{from{opacity:0}to{opacity:1}}.card{animation:fadeInUp .6s ease}",
};

const DISTINCT = {
  'index.html': '<html><head><link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=IBM+Plex+Sans&display=swap" rel="stylesheet"></head><body><main><h1>Night market on the river</h1></main></body></html>',
  'styles.css': ":root{--ink:#14110f;--ember:#ff5a1f}body{font-family:'IBM Plex Sans',sans-serif}h1{font-family:'Fraunces',serif;font-size:clamp(3rem,8vw,9rem)}.reveal{transition:clip-path .9s cubic-bezier(.16,1,.3,1)}@media (prefers-reduced-motion:reduce){.reveal{transition:none}}",
  'project-context/design.md': '# Design\n## Design Philosophy\nConcept: a riverside night market at dusk.\n',
};

test('design-check: flags generic template output with concrete reasons', t => {
  const dir = site(t, GENERIC);
  const r = api.checkDesign(dir);
  assert.equal(r.status, 'needs-review');
  assert.equal(r.visualVerified, false);
  assert.equal('score' in r, false);
  assert.equal('generic' in r, false);
  const font = r.findings.find(f => f.id === 'system-font');
  assert.equal(font.file, 'styles.css');
  assert.equal(font.line, 1);
  const ids = r.findings.map(f => f.id);
  for (const id of ['system-font', 'stock-palette', 'stock-motion', 'reduced-motion', 'placeholder', 'icon-font', 'no-concept']) {
    assert.ok(ids.includes(id), `missing finding ${id}`);
  }
});

test('design-check: negative control clears known signals without certifying design quality', t => {
  const dir = site(t, DISTINCT);
  const r = api.checkDesign(dir);
  assert.equal(r.status, 'no-findings', JSON.stringify(r.findings));
  assert.equal(r.visualVerified, false);
  assert.match(r.limitations.join(' '), /not.*quality|cannot.*taste/i);
});

test('design-check: CLI exits 1 on generic output and 0 on distinctive output', t => {
  const cli = join(REPO_ROOT, 'cli.js');
  const bad = spawnSync(process.execPath, [cli, 'design-check', site(t, GENERIC)], { encoding: 'utf8' });
  assert.equal(bad.status, 1, bad.stdout + bad.stderr);
  assert.match(bad.stdout, /generic/i);
  const good = spawnSync(process.execPath, [cli, 'design-check', site(t, DISTINCT)], { encoding: 'utf8' });
  assert.equal(good.status, 0, good.stdout + good.stderr);
});

test('design-check: ignores node_modules and installed skill copies', t => {
  const dir = site(t, { ...DISTINCT, 'node_modules/x/bad.css': GENERIC['styles.css'], '.agents/skills/telo3/x.css': GENERIC['styles.css'] });
  assert.equal(api.checkDesign(dir).status, 'no-findings');
});

test('install: auto detection reuses an existing managed install instead of duplicating it', t => {
  const dir = makeTempDir();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const first = api.installSkill(dir, { agent: 'auto' });
  api.activate(dir, { skillPath: first.skillPath }); // creates .cursor/rules/telo3.mdc
  const second = api.installSkill(dir, { agent: 'auto' });
  assert.equal(second.dir, first.dir, 'second auto install must not create another copy');
});

test('core: UI work must load the design engine and record a concept before code', () => {
  const core = readCore();
  assert.match(core, /design-system\.md/);
  assert.match(core, /design\.md/);
  assert.match(core, /design-check/);
});

test('design-check: empty, backend-only and missing directories are inconclusive', t => {
  for (const dir of [site(t, {}), site(t, { 'main.js': 'console.log("Hello")' }), join(site(t, {}), 'missing')]) {
    const r = api.checkDesign(dir);
    assert.equal(r.status, 'inconclusive');
    assert.equal(r.visualVerified, false);
    assert.equal('score' in r, false);
  }
});

test('design-check: JSON output and inconclusive exit code are usable by agents', t => {
  const cli = join(REPO_ROOT, 'cli.js');
  const bad = spawnSync(process.execPath, [cli, 'design-check', site(t, GENERIC), '--json'], { encoding: 'utf8' });
  assert.equal(bad.status, 1);
  assert.equal(JSON.parse(bad.stdout).status, 'needs-review');
  const empty = spawnSync(process.execPath, [cli, 'design-check', site(t, {})], { encoding: 'utf8' });
  assert.equal(empty.status, 2);
  assert.match(empty.stdout, /inconclusive/i);
});

test('design-check: remote font URL alone cannot hide an actual system-font declaration', t => {
  const dir = site(t, { ...GENERIC, 'font.html': '<link href="https://fonts.googleapis.com/css2?family=Fraunces" rel="stylesheet">' });
  assert.ok(api.checkDesign(dir).findings.some(f => f.id === 'system-font'));
});

test('design-check: color-only transitions need no forced movement fallback', t => {
  const dir = site(t, { ...DISTINCT, 'styles.css': 'button{transition:color 200ms ease,opacity 200ms ease}' });
  assert.ok(!api.checkDesign(dir).findings.some(f => f.id === 'reduced-motion'));
});

test('design-check: comments are not signals and no source bytes are changed', t => {
  const dir = site(t, { ...DISTINCT, 'notes.css': '/* font-family:Arial; #2c3e50 #e74c3c @keyframes fadeInUp */' });
  const before = readFileSync(join(dir, 'styles.css'));
  assert.equal(api.checkDesign(dir).status, 'no-findings');
  assert.deepEqual(readFileSync(join(dir, 'styles.css')), before);
});

test('design-check: placeholder concepts and a parent context cannot satisfy the local brief', t => {
  const parent = site(t, DISTINCT);
  const dir = join(parent, 'nested');
  mkdirSync(dir);
  writeFileSync(join(dir, 'index.html'), DISTINCT['index.html']);
  assert.ok(api.checkDesign(dir).findings.some(f => f.id === 'no-concept'));
  mkdirSync(join(dir, 'project-context'));
  writeFileSync(join(dir, 'project-context/design.md'), '# Concept\n[TODO: choose a concept]\n');
  assert.ok(api.checkDesign(dir).findings.some(f => f.id === 'no-concept'));
});

test('design-check: oversized input makes coverage explicitly incomplete', t => {
  const result = api.checkDesign(site(t, { ...DISTINCT, 'large.css': ' '.repeat(300000) }));
  assert.equal(result.status, 'inconclusive');
  assert.equal(result.coverage.complete, false);
  assert.ok(result.coverage.skipped.some(f => f.file === 'large.css'));
});

test('design-check: findings are bounded on repetitive input', t => {
  const files = { ...GENERIC };
  for (let i = 0; i < 40; i++) files[`section-${i}.css`] = GENERIC['styles.css'];
  const result = api.checkDesign(site(t, files));
  assert.ok(result.findings.length <= 30);
  assert.ok(result.omittedFindings > 0);
});

test('install: active managed copy is reused when there are two existing installs', t => {
  const dir = site(t, {});
  const first = api.installSkill(dir, { agent: 'agents' });
  const second = api.installSkill(dir, { agent: 'cursor' });
  api.activate(dir, { skillPath: second.skillPath });
  assert.equal(api.installSkill(dir).dir, second.dir);
  assert.ok(readFileSync(first.skillPath, 'utf8').length > 0);
});

test('install: auto does not switch away from active copy when a new host folder appears', t => {
  const dir = site(t, {});
  const first = api.installSkill(dir);
  api.activate(dir, { skillPath: first.skillPath });
  mkdirSync(join(dir, '.qoder'));
  assert.equal(api.installSkill(dir).dir, first.dir);
});

import { readFileSync } from 'node:fs';
function readCore() {
  return readFileSync(join(REPO_ROOT, 'bootstrap', 'TELO3.md'), 'utf8');
}
