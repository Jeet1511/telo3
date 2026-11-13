import { existsSync, lstatSync, readFileSync, readdirSync, mkdirSync, writeFileSync, renameSync, rmSync, mkdtempSync, cpSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { assertSafePath } from './paths.js';

const SOURCE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MARKER = '.telo3-install.json';
export const AGENT_DIRS = {
  agents: '.agents/skills/telo3',
  codex: '.agents/skills/telo3',
  qoder: '.qoder/skills/telo3',
  claude: '.claude/skills/telo3',
  cursor: '.cursor/skills/telo3',
  gemini: '.gemini/skills/telo3',
  copilot: '.github/skills/telo3',
};
const FILES = ['SKILL.md', 'LICENSE', 'cli.js', 'index.js'];
const DIRS = ['bootstrap', 'src', 'templates', 'references', 'hooks'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

function collect(source, rel, output) {
  const path = join(source, rel);
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) throw new Error('Skill payload must not contain symlinks.');
  if (stat.isDirectory()) {
    for (const child of readdirSync(path)) collect(source, `${rel ? `${rel}/` : ''}${child}`, output);
  } else if (stat.isFile()) output[rel] = readFileSync(path);
}

function detectAgent(root) {
  // Activation creates .cursor/rules itself. That directory alone must not
  // cause the next auto install to switch hosts and duplicate the payload.
  const managed = [];
  for (const agent of ['agents', 'qoder', 'claude', 'gemini', 'cursor', 'copilot']) {
    const target = join(root, AGENT_DIRS[agent]);
    const markerPath = assertSafePath(root, join(target, MARKER));
    if (!existsSync(markerPath)) continue;
    try {
      const marker = JSON.parse(readFileSync(markerPath, 'utf8'));
      if (marker.schema === 1 && marker.name === 'telo3' && marker.files?.['SKILL.md']) managed.push(agent);
    } catch { throw new Error('Invalid existing skill ownership record; inspect it before installing another copy.'); }
  }
  const instructions = assertSafePath(root, join(root, 'AGENTS.md'));
  if (managed.length && existsSync(instructions)) {
    const block = readFileSync(instructions, 'utf8').match(/<!-- TELO3:BEGIN[^>]*-->[\s\S]*?<!-- TELO3:END -->/)?.[0];
    const linked = block?.match(/Depth: `([^`]+)`/)?.[1];
    const active = linked && managed.find(agent => resolve(root, linked) === join(root, AGENT_DIRS[agent], 'SKILL.md'));
    if (active) return active;
  }
  if (managed.length) return managed[0];
  for (const agent of ['qoder', 'claude', 'gemini', 'cursor']) {
    if (existsSync(join(root, `.${agent}`))) return agent;
  }
  return 'agents';
}

/** Install a self-contained project skill, never dependent on the npx cache. */
export function installSkill(dir = '.', opts = {}) {
  const root = resolve(dir);
  if (!existsSync(root) || !lstatSync(root).isDirectory()) throw new Error('Project directory must exist.');
  const agent = !opts.agent || opts.agent === 'auto' ? (opts.global ? 'agents' : detectAgent(root)) : opts.agent;
  if (!Object.hasOwn(AGENT_DIRS, agent)) throw new Error(`Unknown agent. Choose auto, ${Object.keys(AGENT_DIRS).join(', ')}.`);
  // Global = user-level, shared by every project on this machine. Project-local (default)
  // travels with the repo so context + powers survive moving to another PC or AI.
  const base = opts.global ? resolve(opts.home || homedir()) : root;
  const target = assertSafePath(base, join(base, AGENT_DIRS[agent]));
  // A manual/ZIP install can use its own runtime without copying over itself
  // or inventing an ownership record. External installers still refuse unmanaged copies.
  if (target === SOURCE) return { dir: target, agent, action: 'unchanged', skillPath: join(target, 'SKILL.md') };
  const payload = {};
  for (const rel of [...FILES, ...DIRS]) collect(SOURCE, rel, payload);
  const pkg = JSON.parse(readFileSync(join(SOURCE, 'package.json'), 'utf8'));
  // Installed skills need runtime metadata, not publishing scripts or marketing.
  payload['package.json'] = Buffer.from(`${JSON.stringify({ name: pkg.name, version: pkg.version, type: 'module', main: 'index.js', bin: { telo3: './cli.js' }, engines: pkg.engines, license: pkg.license }, null, 2)}\n`);
  const hashes = Object.fromEntries(Object.entries(payload).map(([path, bytes]) => [path, hash(bytes)]));
  const marker = Buffer.from(`${JSON.stringify({ schema: 1, name: 'telo3', version: pkg.version, files: hashes }, null, 2)}\n`);

  let owned = null;
  if (existsSync(target)) {
    const manifest = assertSafePath(base, join(target, MARKER));
    if (!existsSync(manifest)) throw new Error('Unmanaged/user-owned skill directory; refusing to overwrite it.');
    try { owned = JSON.parse(readFileSync(manifest, 'utf8')); } catch { throw new Error('Invalid install ownership record; refusing to overwrite.'); }
    if (owned.schema !== 1 || owned.name !== 'telo3' || !owned.files) throw new Error('Unmanaged skill ownership record.');
    for (const [rel, expected] of Object.entries(owned.files)) {
      const path = assertSafePath(target, join(target, rel));
      if (!existsSync(path) || !lstatSync(path).isFile() || hash(readFileSync(path)) !== expected) {
        throw new Error(`Installed skill was modified (${rel}); preserve your customizations before updating.`);
      }
    }
    if (Object.entries(hashes).every(([rel, expected]) => owned.files[rel] === expected) && Object.keys(owned.files).length === Object.keys(hashes).length) {
      return { dir: target, agent, action: 'unchanged', skillPath: join(target, 'SKILL.md') };
    }
  }

  const parent = dirname(target);
  mkdirSync(parent, { recursive: true });
  const lock = `${target}.install-lock`;
  assertSafePath(base, lock);
  try { mkdirSync(lock); } catch (error) {
    if (error.code === 'EEXIST') throw new Error('Another skill installation is active; no files changed.');
    throw error;
  }
  let stage;
  let backup;
  try {
    stage = mkdtempSync(join(parent, '.telo3-stage-'));
    let existing = null;
    if (owned) {
      existing = {};
      collect(target, '', existing); // Reject links and preserve every user-owned extra file.
      for (const [rel, expected] of Object.entries(owned.files)) {
        if (!existing[rel] || hash(existing[rel]) !== expected) throw new Error('Installed skill changed during update.');
      }
      for (const rel of Object.keys(payload)) {
        if (existing[rel] && !Object.hasOwn(owned.files, rel)) throw new Error(`User file conflicts with update: ${rel}`);
      }
      cpSync(target, stage, { recursive: true });
      // Remove only obsolete, unchanged files that this installer owned.
      for (const rel of Object.keys(owned.files)) {
        if (!Object.hasOwn(payload, rel)) rmSync(join(stage, rel));
      }
    }
    for (const [rel, bytes] of Object.entries({ ...payload, [MARKER]: marker })) {
      const dest = join(stage, rel);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, bytes);
    }
    if (owned) {
      const latest = {};
      collect(target, '', latest);
      if (Object.keys(latest).length !== Object.keys(existing).length || Object.keys(existing).some(rel => !latest[rel] || hash(latest[rel]) !== hash(existing[rel]))) {
        throw new Error('Skill files changed while staging; no update committed.');
      }
      backup = `${stage}.previous`;
      renameSync(target, backup);
    } else if (existsSync(target)) throw new Error('Destination appeared during installation; no files overwritten.');
    try {
      renameSync(stage, target);
    } catch (error) {
      if (backup) { renameSync(backup, target); backup = null; }
      throw error;
    }
    if (backup) { rmSync(backup, { recursive: true, force: true }); backup = null; }
    return { dir: target, agent, action: owned ? 'updated' : 'created', skillPath: join(target, 'SKILL.md') };
  } finally {
    if (stage) rmSync(stage, { recursive: true, force: true });
    // If rollback itself fails, keep the backup intact for recovery.
    rmSync(lock, { recursive: true, force: true });
  }
}
