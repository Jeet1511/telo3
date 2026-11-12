/**
 * Version-drift guard: every file that intentionally carries a version string
 * must match package.json (the single source of truth). The CLI and index.js
 * read the version at runtime so they cannot drift; SKILL.md deliberately
 * carries no version. The metadata files and bootstrap frontmatter are checked here.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REPO_ROOT } from './helpers.js';

const VERSIONED_FILES = ['bootstrap/TELO3.md'];

const PATTERNS = [
  /(?:^|\n)version:\s*v?(\d+\.\d+\.\d+)/g, // YAML frontmatter
  /"version":\s*"(\d+\.\d+\.\d+)"/g, // JSON
  /\*\*Version:\*\*\s*v?(\d+\.\d+\.\d+)/g, // Markdown body
  /^Version:\s*v?(\d+\.\d+\.\d+)/gm, // Plain "Version: x.y.z"
];

test('version: all version strings match package.json', () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
  const expected = pkg.version;

  for (const file of VERSIONED_FILES) {
    const content = readFileSync(join(REPO_ROOT, file), 'utf8');
    const found = new Set();
    for (const pattern of PATTERNS) {
      for (const match of content.matchAll(pattern)) found.add(match[1]);
    }
    assert.ok(found.size > 0, `${file} contains no version string to check`);
    for (const version of found) {
      assert.equal(version, expected, `${file} says ${version}, package.json says ${expected}`);
    }
  }
});