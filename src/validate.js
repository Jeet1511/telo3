/**
 * Context validation: required sections, unfilled placeholders,
 * accidental secrets (reported by line, never by value), staleness.
 * @license MIT
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { CONTEXT_DOCS, findContextDir } from './find-context.js';

/**
 * Required section keys per document. Matched case-insensitively as
 * substrings of markdown headings. Templates and examples must satisfy these.
 */
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
    'architectural decisions',
  ],
  'rules.md': ['core principles', 'security', 'testing', 'validation'],
  'design.md': ['design philosophy', 'colors', 'typography', 'components', 'accessibility'],
  'tasks.md': ['current sprint', 'backlog', 'completed recently'],
  'memory.md': ['current state', 'recently completed work', 'important decisions', 'known issues'],
};

const STALE_DAYS = 30;
const CODE_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.go', '.rs', '.java',
  '.rb', '.php', '.css', '.scss', '.html', '.vue', '.svelte', '.sql', '.sh',
]);
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.nuxt', 'out', 'vendor', '__pycache__',
  '.agents', '.qoder', '.claude', '.cursor', '.gemini', '_backup_v5.1.0', 'telo3-main', 'releases',
]);

/** Remove fenced code blocks so their contents are not scanned as prose. */
function stripFences(text) {
  let fence = null;
  return text.split('\n').map(line => {
    const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (match && match[1][0] === fence.char && match[1].length >= fence.size && !match[2].trim()) fence = null;
      return '';
    }
    if (match) { fence = { char: match[1][0], size: match[1].length }; return ''; }
    return line;
  }).join('\n');
}

function headingsOf(text) {
  const stripped = stripFences(text);
  const matches = stripped.matchAll(/^#{1,6}\s+(.+)$/gm);
  return [...matches].map((m) => m[1].trim());
}

/**
 * Count unfilled placeholders: [TODO ...], [Project Name], [UNKNOWN].
 * Excludes code fences, inline code, checkboxes, links, images, footnotes.
 */
function countPlaceholders(text) {
  const stripped = stripFences(text).replace(/`[^`\n]*`/g, '')
    .replace(/^ {0,3}\[[^\]\n]+\]:[^\n]*$/gm, '')
    .replace(/\[[^\]\n]+\][ \t]*\[[^\]\n]*\]/g, '')
    .replace(/\[\^[^\]\n]+\]/g, '');
  let count = 0;
  for (const match of stripped.matchAll(/\[([^[\]\n]+)\](?!\()/g)) {
    const inner = match[1];
    if (/^\s*[xX]?\s*$/.test(inner)) continue; // checkbox
    if (/^\^\d+$/.test(inner)) continue; // footnote
    count++;
  }
  return count;
}

const SECRET_PATTERNS = [
  { label: 'credential assignment', re: /\b(?:api[_-]?key|apikey|[a-z0-9_]*(?:secret|token|password|passwd|pwd|access[_-]?key))["']?\s*[:=]\s*(?:['"][^'"\n]{8,}['"]|(?!\[|<|\$\{|process\.env\.|os\.environ|z\.)[^\s'",;}]{8,})/i },
  { label: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { label: 'private key', re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/ },
  { label: 'connection string with password', re: /\b(?:postgres|postgresql|mysql|mongodb|redis|amqp):\/\/[^\s:'"]+:[^\s'"]+@/i },
  { label: 'GitHub token', re: /\bghp_[A-Za-z0-9]{36}\b/ },
  { label: 'API secret key', re: /\bsk-[A-Za-z0-9]{20,}\b/ },
];

/** Redact detected credential lines and complete private-key blocks before context output. */
export function redactSecrets(text) {
  const withoutKeys = text.replace(/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]*?(?:-----END (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----|$)/g, '[REDACTED: private key]');
  return withoutKeys.split('\n').map(line => SECRET_PATTERNS.some(({ re }) => re.test(line)) ? '[REDACTED: possible credential]' : line).join('\n');
}

/** Scan every line (including code blocks) for accidental secrets. */
function findSecrets(text) {
  const found = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const { label, re } of SECRET_PATTERNS) {
      if (re.test(lines[i])) {
        found.push({ line: i + 1, pattern: label });
        break; // one finding per line is enough
      }
    }
  }
  return found;
}

/** Newest mtime among source-code files under root (bounded walk). */
function newestCodeMtime(root, contextDir) {
  let newest = null;
  let visited = 0;
  let incomplete = false;
  const walk = (dir, depth) => {
    if (depth > 8 || visited > 4000) { incomplete = true; return; }
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      incomplete = true;
      return;
    }
    for (const entry of entries) {
      if (visited > 4000) { incomplete = true; return; }
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name) || full === contextDir) continue;
        walk(full, depth + 1);
      } else if (entry.isFile()) {
        visited++;
        const dot = entry.name.lastIndexOf('.');
        if (dot === -1 || !CODE_EXTENSIONS.has(entry.name.slice(dot))) continue;
        try {
          const mtime = statSync(full).mtimeMs;
          if (newest === null || mtime > newest) newest = mtime;
        } catch { incomplete = true; }
      }
    }
  };
  walk(root, 0);
  return { mtime: newest, incomplete };
}

export function validateContext(dir) {
  const root = resolve(dir);
  const contextDir = findContextDir(root);
  if (!contextDir) {
    return {
      valid: false,
      dir: null,
      files: [],
      errors: [{ message: 'No project context found. Run `telo3 init` to create it.' }],
      warnings: [],
    };
  }

  const errors = [];
  const warnings = [];
  const files = [];
  const scan = newestCodeMtime(root, contextDir);
  const codeMtime = scan.mtime;
  if (scan.incomplete) warnings.push({ message: 'Stale scan incomplete: traversal budget or inaccessible files; freshness is not fully verified.' });

  for (const file of CONTEXT_DOCS) {
    const path = join(contextDir, file);
    if (!existsSync(path)) {
      files.push({
        file, exists: false, sections: 0,
        missingSections: [...REQUIRED_SECTIONS[file]],
        placeholders: 0, secrets: [], stale: null,
      });
      errors.push({ file, message: `Missing required document: ${file}` });
      continue;
    }

    const content = readFileSync(path, 'utf8');
    const headings = headingsOf(content);
    const lower = headings.map((h) => h.toLowerCase());
    const missingSections = REQUIRED_SECTIONS[file].filter(
      (key) => !lower.some((h) => h.includes(key)),
    );
    const placeholders = countPlaceholders(content);
    const secrets = findSecrets(content);

    let stale = null;
    if (codeMtime !== null) {
      const docMtime = statSync(path).mtimeMs;
      const diffDays = Math.floor((codeMtime - docMtime) / 86400000);
      if (diffDays >= STALE_DAYS) stale = diffDays;
    }

    files.push({
      file, exists: true, sections: headings.length,
      missingSections, placeholders, secrets, stale,
    });

    for (const section of missingSections) {
      errors.push({ file, message: `Missing required section: "${section}"` });
    }
    if (placeholders > 0) {
      warnings.push({ file, message: `${placeholders} unfilled placeholder(s) — replace with real content` });
    }
    for (const secret of secrets) {
      warnings.push({
        file,
        message: `Possible secret (${secret.pattern}) at line ${secret.line} — remove it; configure secrets via environment variables`,
      });
    }
    if (stale !== null) {
      warnings.push({ file, message: `Stale: last update predates recent code changes by ${stale} days` });
    }
  }

  return { valid: errors.length === 0, dir: contextDir, files, errors, warnings, scanIncomplete: scan.incomplete };
}