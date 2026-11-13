import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, isAbsolute } from 'node:path';
import { findContextDir } from './find-context.js';

/**
 * Prove the project carries its context + powers with only relative paths,
 * so copying it to another PC or AI loses nothing.
 */
export function checkPortable(dir = '.') {
  const root = resolve(dir);
  const issues = [];
  const agentsPath = join(root, 'AGENTS.md');
  if (!existsSync(agentsPath)) {
    issues.push('AGENTS.md missing — run activate first.');
    return { portable: false, issues };
  }
  const text = readFileSync(agentsPath, 'utf8');
  const block = text.match(/<!-- TELO3:BEGIN[\s\S]*?<!-- TELO3:END -->/)?.[0];
  if (!block) issues.push('No Telo3 contract block in AGENTS.md.');
  else {
    if (block.includes('{{')) issues.push('Unresolved template placeholders in contract.');
    const skill = block.match(/Depth: `([^`]+)`/)?.[1];
    if (!skill) issues.push('Contract has no skill path.');
    else if (isAbsolute(skill) || /^[A-Za-z]:[\\/]/.test(skill)) issues.push(`Skill path is machine-absolute: ${skill}`);
    else if (!existsSync(join(root, skill))) issues.push(`Skill path does not resolve inside the project: ${skill}`);
  }
  if (!findContextDir(root)) issues.push('No project-context found — context would not travel.');
  return { portable: issues.length === 0, issues };
}
