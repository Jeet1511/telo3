import { lstatSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep, join } from 'node:path';

/** Reject traversal and linked ancestors before a write can escape its project. */
export function assertSafePath(root, target) {
  const base = resolve(root);
  const rel = relative(base, resolve(target));
  if (isAbsolute(rel) || rel === '..' || rel.startsWith(`..${sep}`)) {
    throw new Error('Destination must stay inside the project.');
  }
  let current = base;
  for (const part of ['', ...rel.split(sep).filter(Boolean)]) {
    current = part ? join(current, part) : current;
    // existsSync follows links and misses dangling ones; lstat does not.
    let stat;
    try { stat = lstatSync(current); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (stat?.isSymbolicLink()) throw new Error('Refusing a symlink/junction in the destination path.');
  }
  return resolve(target);
}
