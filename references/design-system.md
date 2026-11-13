# Design Decision Engine — universal, award bar

**Load when:** any logo, icon/SVG, or website/UI work, for ANY topic or site type. Target Awwwards-level, not template-level. Self-score rubric: **Design 40 / Usability 30 / Creativity 20 / Content 10.**

Principle: **anti-generic ≠ minimal; rich ≠ award.** Every site gets ONE strong art-direction concept matched to its type and brand, expressive type, editorial layout, custom graphics, and ONE signature motion moment. Record the concept in `design.md`. For every website, also load `creative-stack.md` and build with a real toolchain + its motion recipes (preloader, smooth scroll, split-text, clip-path reveals, pinned sections, WebGL where it fits) — plain HTML with IntersectionObserver fade-ins cannot reach the award bar.

## Universal award principles

- **Concept first.** Derive a metaphor from the brand/topic; every choice serves it. No default hero→3-card→testimonial→CTA template.
- **Type.** Distinctive display + readable text; fluid scale via `clamp()` (e.g. `clamp(1rem,1vw+0.5rem,2rem)`); oversized confident hero (3–8rem). Grotesk + mono accent is a proven pairing (Aeonik/Space Grotesk + IBM Plex Mono). Avoid Inter/Roboto-everything.
- **Layout.** Editorial/asymmetric; intentional whitespace; break the grid on purpose; bento only when it organizes content.
- **Color.** Cohesive primary + 1 signature accent; texture/depth (grain, duotone, layered shadow) over flat white; contrast AA.
- **Motion.** ONE signature moment at 60fps with `prefers-reduced-motion` fallback. Proven easings: `cubic-bezier(.16,1,.3,1)` / `(.19,1,.22,1)` (expo-out). Scroll-driven reveal (GSAP ScrollTrigger), clip-path image reveal, marquee, staggered hover, or a Three.js/WebGL hero.
- **Content.** Real copy + art-directed imagery integrated into layout; storytelling; no lorem/fake stats.
- **Usability.** Sub-3s load, green CWV, mobile in parallel, nav <3s, keyboard/focus/contrast.

## Type → art direction (universal matrix)

| Site type | Direction |
|---|---|
| Portfolio / agency / studio | Bold editorial, oversized type, case-study grids, WebGL/3D or clip-path hero, marquee credits |
| SaaS / product | Clear value hero, product UI screenshots, feature bento, pricing, trust logos, subtle scroll reveals |
| E-commerce / retail / mall | Vibrant hero imagery, product/photo cards, galleries, ratings, quick-buy, seasonal accents |
| Restaurant / food | Full-bleed dish photography, menu typography, warm palette, reservation CTA, hours/map |
| Editorial / blog / news | Strong masthead, readable measure (~65ch), pull quotes, article grids, category color-coding |
| Event / conference | Countdown, speaker cards, schedule timeline, ticket CTA, bold date typography |
| Nonprofit / cause | Human photography, impact stats, story sections, donate CTA, accessible contrast |
| Docs / dashboard | Calm density, clear hierarchy, side nav, code blocks, search, minimal motion |
| Travel / real-estate | Immersive imagery, map/list split, filter chips, booking cards, location storytelling |

## Reverse-engineered techniques (study real shipped code)

- github.com/Ali-Sanati/awwwards-portfolio — React+GSAP+Three.js: 3D hero, clip-path reveals, marquee, staggered hovers.
- lusion.co — custom grotesk+mono, fluid clamp() scale, expo easings, Three.js hero.
- cuberto.com — signature expo easing, smooth scroll storytelling.
- Resources: github.com/hqasmei/awesome-design-resources, github.com/SHSFWork/awesome-inspiration; galleries awwwards.com / mobbin.com / siteinspire.com; techniques codrops.

## Taste algorithm (run in order, every design)

1. **Brief → concept.** Write one sentence: "This is a ___ that feels ___." Pick a metaphor; reject the first obvious idea.
2. **Study & remix.** Open 2-3 award references for THIS topic (matrix + study list). Borrow their *techniques* (type scale, easing, layout tension), never their template. Combine into a new concept.
3. **Type.** Choose a distinctive display + text pairing; set a modular scale (1.25–1.5) and fluid `clamp()` hero. Commit to one oversized moment.
4. **Color.** Derive primary + signature accent from the brand via a harmony (complementary/analogous); add depth (grain/duotone). Reject default purple/indigo.
5. **Layout.** Sketch an asymmetric grid with one deliberate break; place a focal point; use whitespace as a element. Reject centered-hero+3-cards.
6. **Motion.** Pick ONE signature interaction; use expo easing; add reduced-motion fallback.
7. **Critique.** Score against the rubric AND the genericness gate below; if generic, return to step 1.

## Genericness reject gate (any hit = redo)

- Centered hero + 3 equal feature cards + testimonial + CTA, unchanged.
- Inter/Roboto everywhere; default purple/indigo gradient; glassmorphism; emoji icons.
- Stock-photo clichés or lorem ipsum; fake stats/logos.
- Uniform border-radius + shadow on every box; no focal point; no whitespace rhythm.
- Looks like a Bootstrap/Tailwind template or a generic AI landing page.

Taste = contrast + hierarchy + rhythm + restraint + one signature. If a stranger can't name what makes it distinct, it's generic — redo.

## Tokens & icons

- 4px spacing scale; one radius; single shadow source; record tokens in design.md.
- One real icon set (Lucide/Tabler/Phosphor), 24 grid, single stroke, currentColor; never emoji icons; inline SVG aria-hidden/title.
- Prefer a wordmark-first logo; a mark, if needed, is geometric from the brand noun; legible at 16px.

## Verification gate (mandatory before "done")

1. Run `telo3 design-check [dir]` (or `node <skill>/cli.js design-check`). It is a read-only source linter: it flags concrete generic-pattern signals with file/line evidence, but it cannot judge taste or certify originality. Treat findings as review prompts, not a quality score. Empty/incomplete scans are inconclusive.
2. Render in a real browser; screenshot desktop AND mobile.
3. Self-score the rubric; ask "distinctive or template?" If template, redo art direction for this site type.
4. Check overflow, contrast, keyboard, reduced-motion, broken images, load, 60fps.
5. Fix and re-screenshot; only then claim done. Use `visual-qa` when available.

Never ship a design you have not rendered and critiqued. If no terminal/browser is available, run the supported checks and state the gap.
