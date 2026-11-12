import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync, rmSync, copyFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import * as api from '../index.js';
import { makeTempDir, makeProject, minimalDoc, REPO_ROOT } from './helpers.js';

function fixture(t, factory = makeTempDir) {
  const dir = factory();
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function fault(t, source, args = []) {
  const out = spawnSync(process.execPath, ['--input-type=module', '-e', source, ...args], { cwd: REPO_ROOT, encoding: 'utf8' });
  assert.equal(out.status, 0, out.stderr || out.stdout);
}

test('safety: validator detects unquoted env and JSON credential assignments without returning values', t => {
  const dir = fixture(t, () => makeProject({ 'memory.md': `${minimalDoc('memory.md')}\nJWT_SECRET=SYNTHETIC_ENV_123456\n{"api_key": "SYNTHETIC_JSON_123456"}\n` }));
  const result = api.validateContext(dir);
  assert.ok(result.warnings.filter(w => /secret/i.test(w.message)).length >= 2);
  assert.doesNotMatch(JSON.stringify(result), /SYNTHETIC_ENV|SYNTHETIC_JSON/);
  assert.doesNotMatch(JSON.stringify(api.loadContext(dir)), /SYNTHETIC_ENV|SYNTHETIC_JSON/);
});

test('safety: reference links and named footnotes are not placeholders', t => {
  const dir = fixture(t, () => makeProject({ 'rules.md': `${minimalDoc('rules.md')}\n[Guide][ref]\n\n[ref]: https://example.com\n\nNote[^named].\n\n[^named]: Footnote\n` }));
  assert.equal(api.validateContext(dir).files.find(f => f.file === 'rules.md').placeholders, 0);
});

test('safety: indented and long code fences do not leak headings or placeholders into prose validation', t => {
  const dir = fixture(t, () => makeProject({ 'rules.md': `${minimalDoc('rules.md')}\n  \`\`\`\`js\n[not-a-placeholder]\n## Not Prose\n  \`\`\`\`\n` }));
  const doc = api.validateContext(dir).files.find(f => f.file === 'rules.md');
  assert.equal(doc.placeholders, 0);
  assert.equal(doc.sections, 5);
});

test('safety: an unclosed fenced block cannot satisfy required prose headings', t => {
  const dir = fixture(t, () => makeProject({ 'rules.md': `# Rules\n\n\`\`\`js\n## Core Principles\n## Security\n## Validation\n## Testing\n` }));
  const result = api.validateContext(dir);
  assert.equal(result.valid, false);
  assert.equal(result.files.find(f => f.file === 'rules.md').missingSections.length, 4);
});

test('safety: full context wins over a partial context at another conventional path', t => {
  const dir = fixture(t);
  api.initContext(dir, { contextDir: 'docs/project-context' });
  mkdirSync(join(dir, 'project-context'));
  writeFileSync(join(dir, 'project-context', 'memory.md'), minimalDoc('memory.md'));
  assert.equal(api.findContextDir(dir), join(dir, 'docs', 'project-context'));
  assert.equal(api.loadContext(dir, 'feature').docs.length, 4);
});

test('safety: a nested working directory discovers parent project context', t => {
  const dir = fixture(t);
  api.initContext(dir);
  const nested = join(dir, 'src', 'module');
  mkdirSync(nested, { recursive: true });
  assert.equal(api.findContextDir(nested), join(dir, 'project-context'));
});

test('safety: init rejects context-dir traversal without writing outside project', t => {
  const dir = fixture(t);
  const contextDir = `../${basename(dir)}-escape`;
  t.after(() => rmSync(join(dir, contextDir), { recursive: true, force: true }));
  assert.throws(() => api.initContext(dir, { contextDir }), /inside|project|destination/i);
});

test('safety: init uses exclusive creation and does not overwrite a file appearing concurrently', t => {
  const dir = fixture(t);
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';import {join} from 'node:path';
  const original=fs.writeFileSync; let once=false;
  fs.writeFileSync=(path,data,opts)=>{if(!once&&String(path).endsWith('prd.md')){once=true;original(path,'CONCURRENT USER CONTENT');}return original(path,data,opts);};syncBuiltinESMExports();
  const {initContext}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/init.js')).href)}); const result=initContext(process.argv[1]);
  assert.equal(fs.readFileSync(join(result.dir,'prd.md'),'utf8'),'CONCURRENT USER CONTENT');assert.ok(result.skipped.includes('prd.md'));`, [dir]);
});

test('safety: installer rolls back the whole update if the staged swap fails', t => {
  const dir = fixture(t);
  const installed = api.installSkill(dir, { agent: 'agents' });
  const manifestPath = join(installed.dir, '.telo3-install.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const old = readFileSync(join(installed.dir, 'SKILL.md'), 'utf8');
  // Emulate a valid owned older release, not a user edit.
  const previous = `${old}\nprevious managed release\n`;
  writeFileSync(join(installed.dir, 'SKILL.md'), previous);
  manifest.files['SKILL.md'] = createHash('sha256').update(previous).digest('hex');
  writeFileSync(manifestPath, JSON.stringify(manifest));
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';import {join} from 'node:path';
  const target=process.argv[2];const before=fs.readFileSync(join(target,'SKILL.md'),'utf8');const original=fs.renameSync;let once=false;
  fs.renameSync=(from,to)=>{if(!once&&String(from).includes('.telo3-stage-')&&String(to)===target){once=true;const err=new Error('Injected swap failure');err.code='EACCES';throw err;}return original(from,to);};syncBuiltinESMExports();
  const {installSkill}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/install.js')).href)});
  assert.throws(()=>installSkill(process.argv[1],{agent:'agents'}));assert.ok(once,'swap fault did not run');assert.equal(fs.readFileSync(join(target,'SKILL.md'),'utf8'),before);
  fs.renameSync=original;syncBuiltinESMExports();assert.equal(installSkill(process.argv[1],{agent:'agents'}).action,'updated');`, [dir, installed.dir]);
});

test('safety: stale scan reports its bounded traversal limit instead of silently claiming fresh docs', t => {
  const dir = fixture(t, makeProject);
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';
  const root=process.argv[1];const original=fs.readdirSync;
  fs.readdirSync=(path,opts)=>String(path)===root?Array.from({length:4002},(_,i)=>({name:'unrelated-'+i,isDirectory:()=>false,isFile:()=>true})):original(path,opts);syncBuiltinESMExports();
  const {validateContext}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/validate.js')).href)});const result=validateContext(root);
  assert.equal(result.scanIncomplete,true);assert.ok(result.warnings.some(w=>/scan.*incomplete/i.test(w.message)));`, [dir]);
});

test('safety: activation retains user edits made while an instruction update is staged', t => {
  const dir = fixture(t);
  api.activate(dir);
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';import {join} from 'node:path';
  const root=process.argv[1],target=join(root,'AGENTS.md');const initial=fs.readFileSync(target,'utf8');fs.writeFileSync(target,initial.replace('Depth:', 'OUTDATED Depth:'));
  const original=fs.writeFileSync;let once=false;
  fs.writeFileSync=(path,data,opts)=>{if(!once&&String(path)!==target){once=true;fs.appendFileSync(target,'\\nUSER EDIT DURING UPDATE\\n');}return original(path,data,opts);};syncBuiltinESMExports();
  const {activate}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/activate.js')).href)});activate(root);
  assert.ok(once,'staged write fault did not run');assert.match(fs.readFileSync(target,'utf8'),/USER EDIT DURING UPDATE/);`, [dir]);
});

import { createHash } from 'node:crypto';

test('safety: a stage-creation error releases the installer lock', t => {
  const dir = fixture(t);
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';
  const original=fs.mkdtempSync;fs.mkdtempSync=()=>{const e=new Error('Injected ENOSPC');e.code='ENOSPC';throw e;};syncBuiltinESMExports();
  const {installSkill}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/install.js')).href)});assert.throws(()=>installSkill(process.argv[1],{agent:'agents'}));
  fs.mkdtempSync=original;syncBuiltinESMExports();assert.equal(installSkill(process.argv[1],{agent:'agents'}).action,'created');`, [dir]);
});

test('safety: dangling linked destination is rejected before any write', t => {
  const dir = fixture(t);
  const outside = fixture(t);
  fault(t, `import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';import assert from 'node:assert/strict';import {join} from 'node:path';
  const target=join(process.argv[1],'AGENTS.md');const originalExists=fs.existsSync;const originalStat=fs.lstatSync;
  fs.existsSync=p=>String(p)===target?false:originalExists(p);
  fs.lstatSync=p=>String(p)===target?{isSymbolicLink:()=>true}:originalStat(p);syncBuiltinESMExports();
  const {activate}=await import(${JSON.stringify(pathToFileURL(join(REPO_ROOT, 'src/activate.js')).href)});assert.throws(()=>activate(process.argv[1]),/link|symlink/i);assert.equal(originalExists(target),false);`, [dir, outside]);
});
