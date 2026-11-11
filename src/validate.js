/**
 * Telo3 — real project-context validator.
 *
 * Checks, for each of the six context documents:
 *   1. The file exists (error when missing).
 *   2. Required `##` sections are present (error when a section is missing).
 *   3. Unfilled placeholders remain, e.g. [TODO ...], [Project Name] (warning).
 *   4. Accidental secrets, e.g. API keys, private keys, tokens (warning, with line).
 *   5. Staleness: the doc's last update predates recent code changes (warning).
 *
 * Exit-code contract: errors > 0 -> invalid (exit 1). Warnings only -> valid
 * with warnings (exit 0, or exit 1 with --strict).
 */

import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { CONTEXT_DOCS, findContextDir } from './find-context.js';

// Required `##` sections per document (matched case-insensitively).
// These are the sections every project should have filled in; the templates
// contain more optional sections.
export const REQUIRED_SECTIONS = {
  'prd.md': [
    'project overview',
    'problem statement',
    'target users',
    'goals',
    'functional requirements',
    'success criteria',
  ],
  'architecture.md': [
    'architecture overview',
    'technology stack',
    'project structure',
    'data architecture',
  ],
  'rules.md': [
    'core engineering principles',
    'general coding rules',
    'security',
    'testing',
  ],
  'design.md': [
    'design philosophy',
    'color system',
    'typography',
    'components',
    'accessibility',
  ],
  'tasks.md': [
    'current sprint / active work',
    'product backlog',
    'completed recently',
  ],
  'memory.md': [
    'current state',
    'important decisions',
    'known issues & bugs',
  ],
};

// Placeholder markers: bracketed fill-ins and TODO/TBD/FIXME notes.
// A bracketed segment followed by `(` is a Markdown link, not a placeholder.
// `[ ]` and `[x]` are task-list checkboxes, not placeholders.
const BRACKET_PLACEHOLDER = /\[([^\]\n]{1,80})\](?!\()/g;
const WORD_PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX)\b/g;

function countPlaceholders(content) {
  // Code is not prose: array literals, enum values and code examples look
  // like placeholders but aren't. Strip fenced blocks and inline spans
  // before counting.
  const prose = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '');
  let count = 0;
  for (const match of prose.matchAll(BRACKET_PLACEHOLDER)) {
    const inner = match[1].trim();
    if (inner === '' || inner.toLowerCase() === 'x') continue; // checkbox
    count++;
  }
  count += (prose.match(WORD_PLACEHOLDER) || []).length;
  return count;
}

// Secret patterns. Each entry: [name, regex]. Only used to warn, never to
// print the matched secret value itself.
export const SECRET_PATTERNS = [
  ['private key block', /-----BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/],
  ['api key assignment', /(api[_-]?key|apikey|secret[_-]?key)\s*[:=]\s*['"][^'"]{8,}['"]/i],
  ['token assignment', /(access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*['"][^'"]{8,}['"]/i],
  ['password assignment', /password\s*[:=]\s*['"][^'"]+['"]/i],
  ['github token', /(ghp|gho|ghu|ghs|ghr|github_pat)_[A-Za-z0-9_]{20,}/],
  ['aws access key', /AKIA[0-9A-Z]{16}/],
  ['slack token', /xox[baprs]-[A-Za-z0-9-]{10,}/],
  ['stripe key', /s[kr]_(live|test)_[A-Za-z0-9]{10,}/],
];

const STALE_DAYS = 30;

function normalizeHeading(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function extractHeadings(markdown) {
  const headings = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) headings.push(normalizeHeading(match[1]));
  }
  return headings;
}

function checkSecrets(file, lines) {
  const findings = [];
  lines.forEach((line, index) => {
    for (const [name, pattern] of SECRET_PATTERNS) {
      if (pattern.test(line)) {
        findings.push({ file, line: index + 1, pattern: name });
        break; // one finding per line is enough
      }
    }
  });
  return findings;
}

function lastCommitDate(cwd, file) {
  try {
    const out = execSync(`git log -1 --format=%cI -- ${JSON.stringify(file)}`, {
      cwd,
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).toString().trim();
    return out ? new Date(out) : null;
  } catch {
    return null;
  }
}

function latestCodeCommitDate(cwd) {
  try {
    // Latest commit touching anything that is not a markdown file.
    const out = execSync(`git log -1 --format=%cI -- . ':!*.md'`, {
      cwd,
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).toString().trim();
    return out ? new Date(out) : null;
  } catch {
    return null;
  }
}

function newestNonDocMtime(dir) {
  let newest = null;
  const walk = (current) => {
    let entries;
    try {
      entries = readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      const full = join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!entry.name.endsWith('.md')) {
        try {
          const mtime = statSync(full).mtime;
          if (!newest || mtime > newest) newest = mtime;
        } catch { /* ignore unreadable files */ }
      }
    }
  };
  walk(dir);
  return newest;
}

/**
 * Validate the project context in `targetDir`.
 * Returns { dir, files: [{ file, exists, sections, missingSections,
 * placeholders, secrets, stale, lastUpdated }], errors, warnings, valid }.
 * `errors`/`warnings` are flat lists of { file, message }.
 */
export function validateContext(targetDir = '.') {
  const root = resolve(targetDir);
  const dir = findContextDir(root);
  const errors = [];
  const warnings = [];
  const files = [];

  if (!dir) {
    errors.push({
      file: null,
      message:
        'No project context found. Looked for project-context/, docs/project-context/ and the project root. Run `telo3 init` to create it.',
    });
    return { dir: null, files, errors, warnings, valid: false };
  }

  const latestCode = latestCodeCommitDate(root);
  const newestCodeMtime = latestCode ? null : newestNonDocMtime(root);

  for (const doc of CONTEXT_DOCS) {
    const path = join(dir, doc);
    const info = {
      file: doc,
      exists: existsSync(path),
      sections: 0,
      missingSections: [],
      placeholders: 0,
      secrets: [],
      stale: null,
      lastUpdated: null,
    };
    files.push(info);

    if (!info.exists) {
      errors.push({ file: doc, message: `Missing required document: ${doc}` });
      continue;
    }

    const content = readFileSync(path, 'utf8');
    const lines = content.split('\n');

    // 1. Required sections.
    const headings = extractHeadings(content);
    info.sections = headings.length;
    for (const required of REQUIRED_SECTIONS[doc]) {
      if (!headings.includes(required)) {
        info.missingSections.push(required);
        errors.push({ file: doc, message: `Missing required section: ## ${required}` });
      }
    }

    // 2. Placeholders.
    info.placeholders = countPlaceholders(content);
    if (info.placeholders > 0) {
      warnings.push({
        file: doc,
        message: `${info.placeholders} unfilled placeholder(s) — fill in or remove them`,
      });
    }

    // 3. Secrets.
    info.secrets = checkSecrets(doc, lines);
    for (const secret of info.secrets) {
      warnings.push({
        file: doc,
        message: `Possible secret on line ${secret.line} (${secret.pattern}) — move it to env vars or a secret manager`,
      });
    }

    // 4. Staleness.
    let docDate = lastCommitDate(root, path);
    let codeDate = latestCode;
    if (!docDate) {
      try {
        docDate = statSync(path).mtime;
      } catch { /* ignore */ }
      codeDate = newestCodeMtime;
    }
    if (docDate) info.lastUpdated = docDate.toISOString().slice(0, 10);
    if (docDate && codeDate && codeDate > docDate) {
      const gapDays = Math.floor((codeDate - docDate) / 86400000);
      if (gapDays > STALE_DAYS) {
        info.stale = gapDays;
        warnings.push({
          file: doc,
          message: `Possibly stale: code changed ${gapDays} days after this doc was last updated (${info.lastUpdated})`,
        });
      }
    }
  }

  return { dir, files, errors, warnings, valid: errors.length === 0 };
}
