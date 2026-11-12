#!/usr/bin/env node
/**
 * Optional SessionStart hook for Claude-Code-style tools.
 * Emits the always-on Telo3 contract as additionalContext so it is injected
 * deterministically every session (the tool runs this, not the model).
 *
 * Register via hooks/session-start.example.json. The AGENTS.md block installed
 * by `telo3 activate` remains the portable primary; this is belt-and-suspenders.
 * @license MIT
 */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

try {
  // Optional, host-specific. Do not activate unrelated projects or inject full docs.
  const instructions = readFileSync(join(resolve(process.cwd()), 'AGENTS.md'), 'utf8');
  const block = instructions.match(/<!-- TELO3:BEGIN[^>]*-->[\s\S]*?<!-- TELO3:END -->/)?.[0];
  process.stdout.write(JSON.stringify(block ? {
    hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: block },
  } : {}));
} catch {
  process.stdout.write('{}');
}