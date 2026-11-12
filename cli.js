#!/usr/bin/env node

/**
 * Telo3 CLI — real implementation (Node, zero dependencies).
 *
 *   telo3 init [dir] [--context-dir <name>]   Create the six context docs (never overwrites)
 *   telo3 validate [dir] [--json] [--strict]  Check sections, placeholders, secrets, staleness
 *   telo3 status [dir]                        One-line health summary per document
 *   telo3 context <task> [dir] [--measure]    Print only the docs a task needs (+ measured saving)
 *   telo3 version                             Show version (single source of truth: package.json)
 *   telo3 help                                Show this help
 *
 * Exit codes: 0 ok, 1 validation errors / usage error (validate: warnings
 * alone exit 0 unless --strict is passed).
 *
 * @author Jeet (@jeet1511)
 * @license MIT
 */

import { getVersion } from './src/version.js';
import { initContext } from './src/init.js';
import { validateContext } from './src/validate.js';
import { getStatus } from './src/status.js';
import { loadContext, TASK_MAP } from './src/context.js';
import { activate, deactivate } from './src/activate.js';
import { installSkill, AGENT_DIRS } from './src/install.js';

const ALLOWED_FLAGS = {
  install: ['--agent'], init: ['--context-dir'], validate: ['--json', '--strict'],
  status: [], context: ['--measure'], activate: ['--all', '--skill-path'], deactivate: [],
};

const HELP = `
Telo3 v${getVersion()} — AI Development Framework
Usage: telo3 <command> [options]

Commands:
  install [dir] [--agent <host>]      Install a durable project-local skill.
                                      Hosts: auto, ${Object.keys(AGENT_DIRS).join(', ')}.
                                      Then say "telo3" once in chat.
  init [dir] [--context-dir <name>]  Create the six context documents.
                                      Default location: ./project-context
                                      Never overwrites existing files.
  validate [dir] [--json] [--strict] Validate context: required sections,
                                      placeholders, secrets, staleness.
                                      Exits 1 on errors (or on warnings
                                      with --strict).
  status [dir]                        Health summary, one line per document.
  context <task> [dir] [--measure]    Load only the docs a task needs.
                                      Tasks: ${Object.keys(TASK_MAP).join(', ')}, default.
                                      --measure prints the token saving
                                      instead of the content.
  activate [dir] [--all] [--skill-path <p>]
                                      Install the always-on contract into project
                                      instruction files (AGENTS.md, CLAUDE.md, ...).
                                      Mention "telo3" once; stays active every session.
                                      --all also targets Windsurf and Cline.
  deactivate [dir]                    Remove the Telo3 contract blocks.
  version                             Show version.
  help                                Show this help.

Examples:
  telo3 init
  telo3 activate
  telo3 validate --strict
  telo3 context feature
  telo3 context security --measure

Documentation:
  https://github.com/Jeet1511/telo3

Created by Jeet (@jeet1511)
`;

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function parseFlags(args) {
  const flags = new Set();
  const positional = [];
  let contextDir = null;
  let skillPath = null;
  let agent = 'auto';
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('-') && !(ALLOWED_FLAGS[command] || []).includes(arg)) fail(`Unknown option: ${arg}`);
    if (['--context-dir', '--skill-path', '--agent'].includes(arg)) {
      const value = args[++i];
      if (!value || value.startsWith('-')) fail(`${arg} needs a value`);
      if (arg === '--context-dir') contextDir = value;
      else if (arg === '--skill-path') skillPath = value;
      else agent = value;
    } else if (arg.startsWith('--')) flags.add(arg);
    else positional.push(arg);
  }
  if (positional.length > (command === 'context' ? 2 : 1)) fail('Too many positional arguments.');
  return { flags, positional, contextDir, skillPath, agent };
}

function cmdInit(args) {
  const { positional, contextDir } = parseFlags(args);
  const dir = positional[0] || '.';
  const result = initContext(dir, contextDir ? { contextDir } : {});
  console.log(`Project context: ${result.dir}`);
  for (const doc of result.created) console.log(`  ✓ Created: ${doc}`);
  for (const doc of result.skipped) console.log(`  ⊗ Skipped (exists): ${doc}`);
  if (result.created.length === 0 && result.skipped.length > 0) {
    console.log('Nothing to do — all six documents already exist.');
  } else {
    console.log(`\nNext: fill in the documents, then run \`telo3 validate\`.`);
  }
}

function cmdValidate(args) {
  const { flags, positional } = parseFlags(args);
  const dir = positional[0] || '.';
  const result = validateContext(dir);

  if (flags.has('--json')) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Context: ${result.dir || '(not found)'}\n`);
    for (const file of result.files) {
      if (!file.exists) {
        console.log(`  ✗ ${file.file} — missing`);
        continue;
      }
      const bits = [`${file.sections} sections`];
      if (file.missingSections.length > 0) bits.push(`missing: ${file.missingSections.join(', ')}`);
      if (file.placeholders > 0) bits.push(`${file.placeholders} placeholder(s)`);
      if (file.secrets.length > 0) bits.push(`${file.secrets.length} possible secret(s)`);
      if (file.stale) bits.push(`stale by ${file.stale}d`);
      const mark = file.missingSections.length > 0 ? '✗' : '✓';
      console.log(`  ${mark} ${file.file} — ${bits.join(', ')}`);
    }
    console.log('');
    for (const e of result.errors) console.log(`  ERROR ${e.file ? `[${e.file}] ` : ''}${e.message}`);
    for (const w of result.warnings) console.log(`  WARN  ${w.file ? `[${w.file}] ` : ''}${w.message}`);
    console.log(`\n${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
  }

  const failed = result.errors.length > 0 || (flags.has('--strict') && result.warnings.length > 0);
  process.exit(failed ? 1 : 0);
}

function cmdStatus(args) {
  const { positional } = parseFlags(args);
  const status = getStatus(positional[0] || '.');
  if (!status.dir) {
    console.log('No project context found. Run `telo3 init` to create it.');
    process.exit(1);
  }
  console.log(`Context: ${status.dir} — ${status.valid ? 'valid' : 'INVALID'} (${status.errors} errors, ${status.warnings} warnings)`);
  for (const doc of status.docs) {
    if (!doc.exists) {
      console.log(`  ✗ ${doc.file} — missing`);
      continue;
    }
    const notes = [];
    if (doc.missingSections.length > 0) notes.push(`missing sections: ${doc.missingSections.join(', ')}`);
    if (doc.placeholders > 0) notes.push(`${doc.placeholders} placeholder(s)`);
    if (doc.secrets > 0) notes.push(`${doc.secrets} possible secret(s)`);
    if (doc.staleDays) notes.push(`stale ${doc.staleDays}d`);
    if (doc.lastUpdated) notes.push(`updated ${doc.lastUpdated}`);
    console.log(`  ${doc.missingSections.length > 0 ? '✗' : '✓'} ${doc.file} — ${doc.sections} sections${notes.length ? ` — ${notes.join('; ')}` : ''}`);
  }
}

function cmdContext(args) {
  const { flags, positional } = parseFlags(args);
  const task = positional[0] || 'default';
  const dir = positional[1] || '.';
  if (task !== 'default' && !TASK_MAP[task]) {
    fail(`Unknown task "${task}". Known tasks: ${Object.keys(TASK_MAP).join(', ')}, default.`);
  }
  const result = loadContext(dir, task);
  if (!result.dir) {
    console.log('No project context found. Run `telo3 init` to create it.');
    process.exit(1);
  }
  if (result.missing.length) console.error(`Warning: missing selected context: ${result.missing.join(', ')}`);
  if (flags.has('--measure')) {
    console.log(`Task: ${task}`);
    console.log(`Selected: ${result.docs.map((d) => d.name).join(', ')}`);
    console.log(`Tokens (estimate): ${result.tokens}; baseline ${result.totalTokens} (all six docs + same task references)`);
    console.log(`References: ${result.referenceTokens} estimated tokens, included in both totals`);
    console.log(`Measured saving: ${result.savingsPct}% (estimated context-loading reduction, not API usage)`);
    return;
  }
  for (const doc of result.docs) {
    console.log(`\n<!-- ===== ${doc.name} (${doc.source}, ~${doc.tokens} tokens) ===== -->\n`);
    console.log(doc.content);
  }
  console.log(`\n<!-- Loaded ${result.docs.length} doc(s), ~${result.tokens} tokens; baseline: all six docs + same task references, ~${result.totalTokens}; estimated reduction ${result.savingsPct}% -->`);
}

function cmdInstall(args) {
  const { positional, agent } = parseFlags(args);
  const result = installSkill(positional[0] || '.', { agent });
  console.log(`Telo3 skill ${result.action} for ${result.agent}. Say "telo3" once in chat.`);
  console.log('The project-local copy does not depend on npm cache or global installation.');
}

function cmdActivate(args) {
  const { flags, positional, skillPath } = parseFlags(args);
  const dir = positional[0] || '.';
  const stableSkillPath = skillPath || installSkill(dir).skillPath;
  const result = activate(dir, { all: flags.has('--all'), skillPath: stableSkillPath });
  console.log(`Telo3 activated for: ${result.dir}`);
  console.log(`Contract points to: ${result.skillPath}`);
  for (const t of result.targets) console.log(`  ${t.action === 'skipped' ? '⊗' : '✓'} ${t.file} — ${t.action}`);
  console.log('\nActive every session via your AI\'s instruction files. Mention "telo3" once — no need to repeat.');
}

function cmdDeactivate(args) {
  const { positional } = parseFlags(args);
  const result = deactivate(positional[0] || '.');
  console.log(`Telo3 deactivated for: ${result.dir}`);
  for (const t of result.targets) console.log(`  ${t.file} — ${t.action}`);
}

const [command, ...rest] = process.argv.slice(2);

try {
switch (command) {
  case 'install':
    cmdInstall(rest);
    break;
  case 'init':
    cmdInit(rest);
    break;
  case 'validate':
    cmdValidate(rest);
    break;
  case 'status':
    cmdStatus(rest);
    break;
  case 'context':
    cmdContext(rest);
    break;
  case 'activate':
    cmdActivate(rest);
    break;
  case 'deactivate':
    cmdDeactivate(rest);
    break;
  case 'version':
    console.log(`Telo3 v${getVersion()}`);
    break;
  case 'help':
  case undefined:
    console.log(HELP);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error('Run "telo3 help" for usage information');
    process.exit(1);
}
} catch (error) {
  fail(error.path ? `File operation failed (${error.code || 'IO'}); check project paths and permissions.` : error.message);
}
