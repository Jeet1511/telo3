/**
 * Telo3 — token estimation.
 * Approximation used for measuring selective-context savings: ~4 chars/token.
 * This is a measurement aid, not a tokenizer. Reported numbers are estimates.
 */

export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}
