# Design Decision Engine

**Load when:** any logo, icon/SVG, or website/UI work. This replaces vague "avoid slop" with forced, brand-derived choices and a visual verification gate.

Principle: derive every choice from the brand and the product, never from AI defaults. Record choices in `design.md` so they persist and stay consistent.

## Decision procedure

1. Read `design.md` / brand assets. If a system exists, follow it exactly.
2. If absent, choose and RECORD: one type pairing, one brand hue + derived palette, one radius, one spacing scale, one icon set. Do not skip this step.
3. Implement with those tokens only.
4. Verify visually (gate below). Fix, re-verify.
5. Update `memory.md` with the chosen system.

## Typography

- Do NOT default everything to Inter/Roboto/system-ui. Pick a distinctive display face + a readable text face.
- Approved pairings (pick one, justify): display `Space Grotesk`/`Sora`/`Fraunces` + text `Public Sans`/`IBM Plex Sans`/`Source Sans 3`. Use Inter for body only if the brand is utilitarian.
- Modular scale ~1.25; body line-height 1.5; max 2 families, 3 weights. Self-host fonts when practical.

## Color

- Derive from ONE brand hue in OKLCH. Neutrals = same hue, low chroma. One accent. Text contrast ≥ 4.5:1 (AA).
- Forbidden defaults: purple/indigo gradient hero, rainbow accents, glassmorphism everywhere, arbitrary neon.
- Record hex/oklch tokens in `design.md`; reuse them, never hardcode one-off colors.

## Layout & spacing

- 4px base spacing scale; one radius value (e.g. 10px), not mixed; a single subtle shadow source.
- No nested cards, no default drop-shadows on everything, no hero→3-card-features→testimonial→CTA template unless the product story truly needs it.
- Prose max-width ~65ch; real imagery or clearly-labeled placeholders; no fake stats, logos, or testimonials.

## Icons & SVG

- Use ONE consistent open set: Lucide, Tabler, or Phosphor. 24×24 grid, a single stroke width (1.5 or 2), `currentColor`.
- Never use emoji as icons; never mix icon sets; no decorative sparkles/orbs/dot-grids.
- Inline SVG with `aria-hidden="true"` (decorative) or a `<title>` (meaningful).

## Logo

- Prefer a wordmark-first logo. If a mark is needed, make it a simple geometric form derived from the brand noun — not a generic swoosh, gradient blob, or emoji.
- One or two colors, `currentColor`-friendly SVG, legible at 16px. Generate 2-3 concept directions, pick one, record it.

## Verification gate (mandatory before "done")

1. Render in a real browser; screenshot desktop AND mobile.
2. Check: horizontal overflow, contrast, keyboard focus, reduced-motion, broken images.
3. Critique the result against every rule above; fix violations; re-screenshot.
4. Only then claim done. Use the `visual-qa` skill when available.

A design that was never rendered and critiqued is unverified — say so.
