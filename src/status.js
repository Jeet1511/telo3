/**
 * Telo3 — one-line health summary of the project context.
 * Built on the validator: reports per-document existence, section coverage,
 * placeholders, secrets and staleness.
 */

import { validateContext } from './validate.js';

export function getStatus(targetDir = '.') {
  const result = validateContext(targetDir);
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
      lastUpdated: f.lastUpdated,
    })),
  };
}
