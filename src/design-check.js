/** Read-only source heuristics. Findings prompt review; they do not measure taste. */
import { readdirSync, readFileSync, lstatSync } from 'node:fs';
import { join, resolve, relative, extname } from 'node:path';

const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.agents', '.qoder', '.claude', '.cursor', '.gemini', '.github', 'project-context', 'test', 'tests', '__tests__', 'releases', '_backup_v5.1.0']);
const EXT = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro']);
const LIMITS = Object.freeze({ files: 200, entries: 2000, bytes: 4000000, fileBytes: 262144, depth: 6, findings: 30 });
const FONTS = /font-family\s*:\s*['"]?(segoe ui|tahoma|verdana|arial|helvetica|roboto|inter|system-ui|-apple-system|sans-serif)\b/i;
const STOCK_HEX = new Set(['#2c3e50', '#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6', '#34495e', '#ecf0f1', '#6366f1', '#8b5cf6', '#7c3aed', '#4f46e5', '#667eea', '#764ba2']);
const STOCK_MOTION = /@keyframes\s+(fadeInUp|fadeIn|slideUp|fadeInDown|bounce|pulse)\b/i;
const UI = /<\s*(?:html|main|section|div|header|nav|body|button|h[1-6])\b|font-family\s*:|@keyframes|[.#][\w-]+\s*\{/i;
const maskComments = text => text.replace(/<!--[\s\S]*?(?:-->|$)|\/\*[\s\S]*?(?:\*\/|$)/g, s => s.replace(/[^\r\n]/g, ' '));

export function checkDesign(dir = '.') {
  const root = resolve(dir);
  const records = [];
  const coverage = { complete: true, files: 0, entries: 0, bytes: 0, skipped: [], limits: LIMITS };
  const short = path => relative(root, path).split('\\').join('/') || '.';
  function skip(path, reason) {
    coverage.complete = false;
    if (coverage.skipped.length < 20) coverage.skipped.push({ file: short(path), reason });
  }
  function walk(path, depth) {
    if (depth > LIMITS.depth) { skip(path, 'depth-limit'); return; }
    try {
      const info = lstatSync(path);
      if (!info.isDirectory() || info.isSymbolicLink()) { skip(path, 'not-a-local-directory'); return; }
      const entries = readdirSync(path, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
      for (const entry of entries) {
        if (++coverage.entries > LIMITS.entries || coverage.files >= LIMITS.files) { skip(path, 'scan-limit'); return; }
        const full = join(path, entry.name);
        if (entry.isSymbolicLink()) { skip(full, 'symlink-not-followed'); continue; }
        if (entry.isDirectory()) { if (!SKIP.has(entry.name)) walk(full, depth + 1); continue; }
        if (!entry.isFile() || !EXT.has(extname(entry.name).toLowerCase()) || /\.(?:test|spec|min)\./i.test(entry.name)) continue;
        try {
          const stat = lstatSync(full);
          if (stat.isSymbolicLink()) { skip(full, 'symlink-not-followed'); continue; }
          if (stat.size > LIMITS.fileBytes || coverage.bytes + stat.size > LIMITS.bytes) { skip(full, 'byte-limit'); continue; }
          const text = maskComments(readFileSync(full, 'utf8'));
          records.push({ file: short(full), text });
          coverage.files++;
          coverage.bytes += stat.size;
        } catch { skip(full, 'unreadable-file'); }
      }
    } catch { skip(path, 'unreadable-directory'); }
  }
  walk(root, 0);
  const findings = [];
  let omittedFindings = 0;
  function add(id, message, record, index = 0) {
    if (findings.length >= LIMITS.findings) { omittedFindings++; return; }
    findings.push({ id, level: 'review', message, file: record?.file || null,
      line: record ? record.text.slice(0, index).split('\n').length : null });
  }
  function match(record, pattern, id, message) {
    const found = pattern.exec(record.text);
    if (found) add(id, message, record, found.index);
    return found;
  }
  const uiPresent = records.some(r => UI.test(r.text));
  const reducedMotionMentioned = records.some(r => /prefers-reduced-motion|useReducedMotion/i.test(r.text));
  if (uiPresent) {
    for (const record of records) {
      match(record, FONTS, 'system-font', 'A default/system font leads a declaration. Review hierarchy and brand fit; system fonts are not inherently bad.');
      const colors = [...record.text.matchAll(/#[0-9a-f]{6}\b/gi)].filter(m => STOCK_HEX.has(m[0].toLowerCase()));
      if (new Set(colors.map(m => m[0].toLowerCase())).size >= 2) {
        add('stock-palette', 'Multiple common palette colors occur together. Check that the combination is intentional, not a template default.', record, colors[0].index);
      }
      match(record, STOCK_MOTION, 'stock-motion', 'A common animation name occurs. Inspect the actual choreography; renaming it or adding easing does not improve design.');
      const motion = /@keyframes\b|\banimation(?:-name)?\s*:|\btransition\s*:[^;}\n]*\b(?:all|transform|translate|scale|rotate|clip-path|width|height|left|top)\b/i.exec(record.text);
      if (motion && !reducedMotionMentioned) add('reduced-motion', 'Motion declarations found, but no reduced-motion handling was found in scanned source. Verify behavior; external code is unknown.', record, motion.index);
      match(record, /lorem ipsum|via\.placeholder\.com|placehold\.co|placeholder\.com\//i, 'placeholder', 'Placeholder copy/image source found. Confirm it is visibly marked as demo content; do not invent real claims to replace it.');
      match(record, /font-awesome|fontawesome|class=["']fa[sbr]? fa-/i, 'icon-font', 'Icon-font usage found. Review consistency and loading cost; do not replace solely to satisfy this check.');
      if (/class(?:Name)?=["'][^"']*\bfeatures?\b/i.test(record.text)) {
        match(record, /class(?:Name)?=["'][^"']*\btestimonials?\b/i, 'template-structure', 'Feature and testimonial sections appear together. Review content-specific composition rather than assuming this structure is wrong.');
      }
    }
    // Only the selected project's conventional docs, never a parent's context.
    let concept = false;
    for (const rel of ['project-context/design.md', 'docs/project-context/design.md', 'design.md']) {
      try {
        const path = join(root, rel);
        const parts = rel.split('/');
        let current = root;
        for (const part of parts) {
          current = join(current, part);
          if (lstatSync(current).isSymbolicLink()) throw new Error('linked-context');
        }
        if (lstatSync(path).size > LIMITS.fileBytes) { skip(path, 'context-byte-limit'); continue; }
        const text = maskComments(readFileSync(path, 'utf8'));
        concept ||= /(?:concept|metaphor|art[- ]direction)\s*:\s*[^\n]*[a-z][^\n]*/i.test(text) && !/\[(?:TODO|UNKNOWN)|\bTBD\b/i.test(text);
      } catch (error) { if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') skip(join(root, rel), 'unreadable-context'); }
    }
    if (!concept) add('no-concept', 'No filled Concept:/Metaphor:/Art direction: entry found in this project\'s design.md. Record the intended visual direction before coding.');
  } else add('no-ui', 'No recognizable UI source found within the scan boundary.');
  return {
    status: !uiPresent || !coverage.complete ? 'inconclusive' : findings.length ? 'needs-review' : 'no-findings',
    visualVerified: false, findings, omittedFindings, coverage,
    limitations: ['Static heuristics are not a quality score and cannot judge taste or certify originality.',
      'No browser rendering, asset loading, computed styles, interaction, contrast or performance was verified.',
      'String matches may include examples or unused code; CSS variables, runtime styling and imported libraries may be missed.'],
  };
}
