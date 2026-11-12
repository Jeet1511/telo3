#!/usr/bin/env node
/**
 * Safe, additive setup so `npm i telo3-ai` is the only command a user types.
 * Installs the durable project skill and activates the always-on contract in
 * the invoking project. Never clobbers user content, never fails the install.
 * Skips global installs, opt-out, and the package's own directory.
 * @license MIT
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { installSkill } from '../src/install.js';
import { activate } from '../src/activate.js';

const SOURCE = resolve(dirname(fileURLToPath(import.meta.url)), '..');

try {
  const global = process.env.npm_config_global === 'true';
  const target = resolve(process.env.INIT_CWD || process.cwd());
  if (!global && !process.env.TELO3_SKIP && target !== SOURCE) {
    const installed = installSkill(target, { agent: 'auto' });
    activate(target, { skillPath: installed.skillPath });
    process.stdout.write('Telo3 ready. Say "telo3" once in your AI chat.\n');
  }
} catch {
  // Additive convenience only — never break `npm install`.
  process.stdout.write('Telo3 installed. Run "npx telo3-ai" in your project to finish setup.\n');
}
