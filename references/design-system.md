# Design Decision Engine

**Load when:** any logo, icon/SVG, or website/UI work. Forces brand-derived, product-appropriate choices and a visual verification gate.

Principle: **anti-generic ≠ minimal.** Avoid the tired AI defaults, but match richness to the product. A shopping mall, store, restaurant or portfolio needs real imagery, photo/content cards and a vibrant hero — never a plain text-only list. Record choices in `design.md`.

## Decision procedure

1. Read `design.md` / brand assets; follow an existing system exactly.
2. If absent, choose and RECORD: type pairing, cohesive palette, radius, spacing scale, icon set, and imagery plan.
3. Implement with those tokens; use real (or clearly-labeled placeholder) photography for visual products.
4. Verify visually (gate below); fix; re-verify.
5. Update `memory.md`.

## Richness (match the product)

- Commerce / mall / food / portfolio: hero with real imagery + overlay, product/store/dish **photo cards in grids**, galleries, ratings, vibrant accents.
- Utility / dashboard / docs: calmer, denser, fewer images — clarity over decoration.
- Never ship a text-only page for an image-rich brief. Cards and grids are GOOD when they present content; avoid only *pointless* nested cards.

## Typography

- Don't default everything to Inter/Roboto/system-ui. Pick a distinctive display + readable text face.
- Pairings (justify): display `Space Grotesk`/`Sora`/`Fraunces` + text `Public Sans`/`IBM Plex Sans`/`Source Sans 3`. Inter for body only if utilitarian.
- Scale ~1.25; body line-height 1.5; ≤2 families, 3 weights; self-host when practical.

## Color

- Derive a cohesive palette from the brand: a primary + 1-2 harmonious accents. Vibrant is fine; ensure text contrast ≥ 4.5:1 (AA).
- Avoid the generic defaults: purple/indigo gradient hero, rainbow accents, glassmorphism everywhere, arbitrary neon.
- Record tokens in `design.md`; reuse them.

## Layout & spacing

- 4px spacing scale; one radius; a single subtle shadow source.
- Use cards/grids for content; hero may use imagery + gradient overlay. Avoid shadows-on-everything and decorative-only sections.
- Prose max-width ~65ch; real copy; no fake stats/logos/testimonials.

## Icons & SVG

- One consistent open set: Lucide, Tabler, or Phosphor; 24 grid; single stroke (1.5/2); `currentColor`.
- Never emoji as icons; never mix sets; no decorative sparkles/orbs. Use real photos for content imagery (not icons).
- Inline SVG `aria-hidden` (decorative) or `<title>` (meaningful).

## Logo

- Prefer a wordmark-first logo; a mark, if needed, is a simple geometric form from the brand noun — not a swoosh, gradient blob, or emoji. One/two colors, legible at 16px.

## Verification gate (mandatory before "done")

1. Render in a real browser; screenshot desktop AND mobile.
2. Check overflow, contrast, keyboard focus, reduced-motion, broken/missing images.
3. Critique against every rule above — especially "does it look as rich as the product demands?" Fix; re-screenshot.
4. Only then claim done. Use `visual-qa` when available.

A design never rendered and critiqued is unverified — say so.
