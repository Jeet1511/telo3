#!/usr/bin/env node
/** Local-only release gate. No registry writes, auth lookup or network installs. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const npmCli = process.env.npm_execpath;
let temp;

function run(command, args, cwd = root) {
  const out = spawnSync(command, args, { cwd, encoding: 'utf8', timeout: 120000 });
  if (out.status !== 0) throw new Error(`Local verification command failed (${out.status ?? out.error?.code}).`);
  return out.stdout;
}
const npm = (args, cwd) => run(process.execPath, [npmCli, ...args], cwd);

try {
  if (!npmCli || !existsSync(npmCli)) throw new Error('Run this gate with npm run verify:release.');
  temp = mkdtempSync(join(root, '.npm-verification-'));
  const [packed] = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', temp]));
  const paths = new Set(packed.files.map(file => file.path));
  const required = ['package.json', 'README.md', 'LICENSE', 'SKILL.md', 'cli.js', 'index.js', 'bootstrap/TELO3.md', 'src/install.js', 'src/paths.js', 'hooks/inject-contract.mjs', 'hooks/session-start.example.json'];
  for (const file of required) assert.ok(paths.has(file), `Missing archive asset: ${file}`);
  for (const file of paths) {
    assert.ok(!/(^|\/)(?:_backup[^/]*|test|tests|examples|releases|node_modules|\.env|\.github)(?:\/|$)/.test(file), `Unnecessary archive file: ${file}`);
    assert.ok(!file.includes('..') && !file.includes('\\') && !file.includes(':'), 'Unsafe archive path');
    assert.ok(!['SKILL-METADATA.json', 'skill.json'].includes(file), 'Custom registry metadata must not ship');
    assert.ok(pkg.files.some(entry => entry.endsWith('/') ? file.startsWith(entry) : file === entry) || file === 'package.json', `File outside release allowlist: ${file}`);
  }
  assert.equal([...paths].filter(file => file.startsWith('references/')).length, 14);
  assert.equal([...paths].filter(file => file.startsWith('templates/')).length, 6);
  assert.equal(packed.version, pkg.version);
  assert.ok(packed.size < 100000, 'Archive exceeds lightweight 100KB budget');

  const fixture = join(temp, 'npm fixture with spaces');
  const project = join(temp, 'project with spaces');
  mkdirSync(fixture);
  mkdirSync(project);
  const archive = join(temp, packed.filename);
  npm(['install', '--prefix', fixture, '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', archive]);
  const installed = join(fixture, 'node_modules', pkg.name);
  const version = npm(['exec', '--prefix', fixture, '--offline', '--', 'telo3', 'version'], fixture);
  assert.ok(version.includes(pkg.version), 'Installed npm executable failed');
  const api = await import(pathToFileURL(join(installed, 'index.js')));
  for (const file of [...Object.values(api.templates), ...Object.values(api.references), ...Object.values(api.skills)]) {
    assert.ok(existsSync(resolve(installed, file)), `Broken public asset path: ${file}`);
  }
  mkdirSync(join(project, '.qoder'));
  const installedCli = join(installed, 'cli.js');
  run(process.execPath, [installedCli, 'install', project]);
  const durable = join(project, '.qoder', 'skills', 'telo3');
  assert.ok(existsSync(join(durable, 'SKILL.md')), 'Native Qoder skill discovery layout is missing');
  assert.match(run(process.execPath, [installedCli, 'install', project]), /unchanged/);

  // Remove the original npm package to prove activation does not depend on cache/global paths.
  rmSync(installed, { recursive: true, force: true });
  const durableApi = await import(pathToFileURL(join(durable, 'index.js')));
  durableApi.initContext(project);
  const originalInstructions = '# Project instructions\n\nKeep custom behavior.\n';
  writeFileSync(join(project, 'AGENTS.md'), originalInstructions);
  durableApi.activate(project);
  const instructions = readFileSync(join(project, 'AGENTS.md'), 'utf8');
  assert.ok(instructions.includes(`TELO3:BEGIN v${pkg.version}`));
  assert.doesNotMatch(instructions, /\{\{/);
  assert.ok(instructions.includes('.qoder/skills/telo3/SKILL.md'));
  assert.ok(durableApi.activate(project).targets.every(t => t.action === 'unchanged'));
  assert.equal(durableApi.validateContext(project).errors.length, 0);
  for (const task of Object.keys(durableApi.TASK_MAP)) {
    const context = durableApi.loadContext(project, task);
    assert.ok(context.tokens <= context.totalTokens, `Invalid baseline for ${task}`);
    assert.ok(context.savingsPct >= 0 && context.savingsPct <= 100);
    assert.deepEqual(context.missing, []);
  }
  const measurement = run(process.execPath, [join(durable, 'cli.js'), 'context', 'security', project, '--measure']);
  assert.match(measurement, /same task references/);
  const hook = JSON.parse(run(process.execPath, [join(durable, 'hooks', 'inject-contract.mjs')], project));
  assert.ok(hook.hookSpecificOutput.additionalContext.includes('TELO3:BEGIN'));
  durableApi.deactivate(project);
  assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), originalInstructions);
  // Manual ZIP copies have no installer ownership marker; their own CLI must still work.
  rmSync(join(durable, '.telo3-install.json'));
  run(process.execPath, [join(durable, 'cli.js'), 'activate', project]);
  assert.ok(readFileSync(join(project, 'AGENTS.md'), 'utf8').includes('.qoder/skills/telo3/SKILL.md'));
  durableApi.deactivate(project);
  assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), originalInstructions);

  console.log(`Release verified: ${pkg.name}@${pkg.version}`);
  console.log(`Archive: ${paths.size} files, ${packed.size} compressed bytes; no examples, backups or custom registries.`);
  console.log('Offline npm install/bin, native skill layout, cache-independent activation, assets, hooks, baseline and lossless deactivate passed.');
} catch (error) {
  console.error(`Release verification failed: ${error.path ? error.code || 'File access error' : error.message}`);
  process.exitCode = 1;
} finally {
  if (temp) rmSync(temp, { recursive: true, force: true });
}
