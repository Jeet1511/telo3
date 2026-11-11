/**
 * Shared fixtures for Telo3 tests.
 */
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, '..');

export function makeTempDir() {
  return mkdtempSync(join(tmpdir(), 'telo3-test-'));
}

const DOCS = ['prd.md', 'architecture.md', 'rules.md', 'design.md', 'tasks.md', 'memory.md'];

/** A minimal valid document: all required sections present, no placeholders. */
export function minimalDoc(name) {
  const sections = {
    'prd.md': ['Project Overview', 'Problem Statement', 'Target Users', 'Goals', 'Functional Requirements', 'Success Criteria'],
    'architecture.md': ['Architecture Overview', 'Technology Stack', 'Project Structure', 'Data Architecture'],
    'rules.md': ['Core Engineering Principles', 'General Coding Rules', 'Security', 'Testing'],
    'design.md': ['Design Philosophy', 'Color System', 'Typography', 'Components', 'Accessibility'],
    'tasks.md': ['Current Sprint / Active Work', 'Product Backlog', 'Completed Recently'],
    'memory.md': ['Current State', 'Important Decisions', 'Known Issues & Bugs'],
  };
  const lines = [`# ${name}`, ''];
  for (const section of sections[name]) lines.push(`## ${section}`, '', 'Content here.', '');
  return lines.join('\n');
}

/** Create a project dir with a project-context/ holding the given docs. */
export function makeProject(docs = {}) {
  const dir = makeTempDir();
  const contextDir = join(dir, 'project-context');
  mkdirSync(contextDir, { recursive: true });
  for (const name of DOCS) {
    writeFileSync(join(contextDir, name), docs[name] ?? minimalDoc(name));
  }
  return dir;
}

/** Create a project dir whose context docs are the real blank templates. */
export function makeTemplateProject() {
  const dir = makeTempDir();
  const contextDir = join(dir, 'project-context');
  mkdirSync(contextDir, { recursive: true });
  for (const name of readdirSync(join(REPO_ROOT, 'templates'))) {
    copyFileSync(join(REPO_ROOT, 'templates', name), join(contextDir, name));
  }
  return dir;
}
