/**
 * One-line health summary per document, built on the real validator.
 * @license MIT
 */
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { validateContext } from './validate.js';

export function getStatus(dir) {
  const result = validateContext(dir);
  if (!result.dir) {
    return { dir: null, valid: false, errors: result.errors.length, warnings: result.warnings.length, docs: [] };
  }
  return {
    dir: result.dir,
    valid: result.valid,
    errors: result.errors.length,
    warnings: result.warnings.length,
    docs: result.files.map((f) => ({
      file: f.file,
      exists: f.exists,
      sections: f.sections,
      missingSections: f.missingSections,
      placeholders: f.placeholders,
      secrets: f.secrets.length,
      staleDays: f.stale,
      lastUpdated: f.exists ? statSync(join(result.dir, f.file)).mtime.toISOString().slice(0, 10) : null,
    })),
  };
}