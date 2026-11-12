/**
 * Token estimation — deliberately simple and honest (~4 chars/token).
 * Used for measured per-project savings, never marketing claims.
 * @license MIT
 */

export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}