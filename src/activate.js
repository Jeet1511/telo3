/**
 * Activation: install the always-on Telo3 contract into project instruction
 * files so any AI auto-loads it every session — mention "telo3" once, stays on.
 *
 * Portable primary: AGENTS.md (auto-read by Cursor, Copilot, Codex, Gemini CLI,
 * Windsurf, Aider, RooCode, ...). Tool-specific files are belt-and-suspenders.
 * Idempotent, additive, marker-delimited; never clobbers unrelated content.
 * @license MIT
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, lstatSync, renameSync, mkdtempSync } from 'node:fs';
import { join, resolve, relative, dirname, isAbsolute } from 'node:path';
import { findContextDir } from './find-context.js';
import { assertSafePath } from './paths.js';
import { fileURLToPath } from 'node:url';
import { getVersion } from './version.js';

const SKILL_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BOOTSTRAP_PATH = join(SKILL_ROOT, 'bootstrap', 'TELO3.md');

const BEGIN_RE = /<!-- TELO3:BEGIN[\s\S]*?<!-- TELO3:END -->/g;

/** Shared instruction files: replace our marked block or append; keep everything else. */
const SHARED_TARGETS = [
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  join('.github', 'copilot-instructions.md'),
];

/** Dedicated rule files: wholly Telo3-managed, with tool-specific frontmatter. */
const DEDICATED_TARGETS = {
  [join('.cursor', 'rules', 'telo3.mdc')]: '---\ndescription: Telo3 always-on engineering contract\nalwaysApply: true\n---\n',
  [join('.windsurf', 'rules', 'telo3.md')]: '---\ntrigger: always_on\n---\n',
  [join('.clinerules', 'telo3.md')]: '',
};

const DEFAULT_EXTRA = [join('.cursor', 'rules', 'telo3.mdc')];
const ALL_EXTRA = Object.keys(DEDICATED_TARGETS);

export function renderContract(projectRoot, skillFile = join(SKILL_ROOT, 'SKILL.md')) {
  const root = resolve(projectRoot);
  if (!existsSync(skillFile) || !lstatSync(skillFile).isFile()) throw new Error('Skill entry is missing; install the skill first.');
  const relSkill = relative(root, skillFile);
  if (isAbsolute(relSkill)) throw new Error('Skill must be on the same drive; install it inside the project.');
  const context = findContextDir(root) || join(root, 'project-context');
  const contextPath = toPosix(relative(root, context)) || '.';
  const raw = readFileSync(BOOTSTRAP_PATH, 'utf8');
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trimEnd();
  const skillPath = toPosix(relSkill) || 'SKILL.md';
  const block = body.replace(/\{\{VERSION\}\}/g, getVersion()).replace(/\{\{SKILL_PATH\}\}/g, skillPath).replace(/\{\{CONTEXT_PATH\}\}/g, contextPath);
  return { skillPath, contextPath, block };
}

function toPosix(p) {
  return p.split('\\').join('/');
}

function updateInstruction(path, block, frontmatter = null) {
  for (let attempt = 0; attempt < 3; attempt++) {
    assertSafePath(dirname(path), path);
    const existed = existsSync(path);
    const current = existed ? readFileSync(path, 'utf8') : '';
    const managed = BEGIN_RE.test(current);
    BEGIN_RE.lastIndex = 0;
    if (frontmatter !== null && existed && !managed) return 'skipped';
    const next = managed ? current.replace(BEGIN_RE, block) : `${frontmatter || ''}${block}\n${current}`;
    BEGIN_RE.lastIndex = 0;
    if (existed && next === current) return 'unchanged';
    mkdirSync(dirname(path), { recursive: true });
    if (!existed) {
      try { writeFileSync(path, next, { flag: 'wx' }); return 'created'; }
      catch (error) { if (error.code === 'EEXIST') continue; throw error; }
    }
    const stage = mkdtempSync(join(dirname(path), '.telo3-write-'));
    try {
      const staged = join(stage, 'instructions');
      writeFileSync(staged, next);
      // If an editor changed the file while staging, rebuild from the new text.
      if (readFileSync(path, 'utf8') !== current) continue;
      assertSafePath(dirname(path), path);
      renameSync(staged, path);
      return 'updated';
    } finally { rmSync(stage, { recursive: true, force: true }); }
  }
  throw new Error('Instructions changed concurrently; retry after other edits finish.');
}

function activateShared(path, block) { return updateInstruction(path, block); }
function activateDedicated(path, frontmatter, block) { return updateInstruction(path, block, frontmatter); }

export function activate(dir = '.', opts = {}) {
  const projectRoot = resolve(dir);
  const skillFile = opts.skillPath
    ? resolve(opts.skillPath)
    : join(SKILL_ROOT, 'SKILL.md');
  const rendered = renderContract(projectRoot, skillFile);
  const extras = opts.all ? ALL_EXTRA : DEFAULT_EXTRA;
  const targets = [];
  // Preflight every target before the first write, including linked parents.
  for (const rel of [...SHARED_TARGETS, ...extras]) {
    const path = assertSafePath(projectRoot, join(projectRoot, rel));
    if (existsSync(path) && !lstatSync(path).isFile()) throw new Error('Instruction target must be a regular file.');
  }
  const bridge = rel => {
    const link = toPosix(relative(dirname(join(projectRoot, rel)), join(projectRoot, 'AGENTS.md')));
    return `<!-- TELO3:BEGIN v${getVersion()} -->\nApply the Telo3 block in project-root instructions: \`${link}\`. Read once per session/resume, not once per task.\n<!-- TELO3:END -->`;
  };
  for (const rel of SHARED_TARGETS) {
    targets.push({ file: toPosix(rel), action: activateShared(join(projectRoot, rel), rel === 'AGENTS.md' ? rendered.block : bridge(rel)) });
  }
  for (const rel of extras) {
    targets.push({ file: toPosix(rel), action: activateDedicated(join(projectRoot, rel), DEDICATED_TARGETS[rel], bridge(rel)) });
  }
  return { dir: projectRoot, ...rendered, targets };
}

export function deactivate(dir = '.') {
  const projectRoot = resolve(dir);
  const targets = [];

  for (const rel of SHARED_TARGETS) {
    const path = assertSafePath(projectRoot, join(projectRoot, rel));
    if (!existsSync(path)) {
      targets.push({ file: toPosix(rel), action: 'absent' });
      continue;
    }
    const current = readFileSync(path, 'utf8');
    if (!BEGIN_RE.test(current)) {
      BEGIN_RE.lastIndex = 0;
      targets.push({ file: toPosix(rel), action: 'absent' });
      continue;
    }
    BEGIN_RE.lastIndex = 0;
    const next = current.replace(/<!-- TELO3:BEGIN[^>]*-->[\s\S]*?<!-- TELO3:END -->\r?\n?/g, '');
    writeFileSync(path, next);
    targets.push({ file: toPosix(rel), action: 'removed' });
  }

  for (const rel of Object.keys(DEDICATED_TARGETS)) {
    const path = assertSafePath(projectRoot, join(projectRoot, rel));
    if (!existsSync(path)) {
      targets.push({ file: toPosix(rel), action: 'absent' });
      continue;
    }
    const current = readFileSync(path, 'utf8');
    const managed = BEGIN_RE.test(current);
    BEGIN_RE.lastIndex = 0;
    if (!managed) {
      targets.push({ file: toPosix(rel), action: 'skipped' });
      continue;
    }
    const next = current.replace(/<!-- TELO3:BEGIN[^>]*-->[\s\S]*?<!-- TELO3:END -->\r?\n?/g, '');
    if (next === '' || next === DEDICATED_TARGETS[rel]) rmSync(path);
    else writeFileSync(path, next);
    targets.push({ file: toPosix(rel), action: 'removed' });
  }

  return { dir: projectRoot, targets };
}