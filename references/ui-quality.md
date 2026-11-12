# UI Quality & Anti-Vibe-Coding
**Load when:** any UI/component/styling work, landing or marketing pages, or design review.

## Core Rule

No pattern below is banned outright. Avoid each UNLESS the project's design system, brand, UX, accessibility, or performance needs justify it. Vibe coding = choosing aesthetics from AI trends instead of the actual product. Symptoms: every project looks the same, decoration over function, trends over brand consistency, copy-pasting without adapting, no coherent visual language.

## Justification Test — run before adopting any visual pattern

1. Does design.md / the design system document it? Yes → follow it; no → proceed with caution.
2. Does it serve the user? No → don't use it.
3. Is it consistent with existing UI? No → justify the deviation.
4. Does it fit brand personality? No → look for alternatives.
5. Is it accessible and performant? No → find an accessible/performant alternative.

When in doubt:
- Check how similar UI is already implemented in the codebase.
- Check design.md.
- Ask the user whether the direction is right.
- Prefer simple, accessible UI over trendy effects.

## Generic AI Aesthetics — avoid unless justified

| Category | Question before using | Acceptable only when |
|---|---|---|
| Color & gradients | Harsh bright-to-bright gradients; arbitrary rainbow gradients; purple/black "AI" palettes; arbitrary neon colors; generic pastel palettes; over-saturated colors | Brand/design system specifies them; product personality justifies; accessibility (contrast) maintained |
| Shadows & depth | Shadows everywhere; multiple strong shadows on one element; shadow on every card; inconsistent shadow usage | Design system defines elevation levels; shadows encode hierarchy; applied consistently |
| Borders & radius | Excessive rounding (radius > 24px); inconsistent border radius; pills for everything; arbitrary sharp/rounded mix | Design system documents a radius scale; consistent application; serves brand |
| Effects | Excessive glassmorphism; blur on every surface; liquid/blob shapes; radial gradient orbs; dot-grid backgrounds; mesh gradients; noise textures | Brand aesthetic explicitly uses them; performance acceptable; contrast and reduced motion maintained |
| Layouts | Repetitive 3-card feature sections; purposeless bento grids; same card layout on every page; hero with blob background; alternating left-right blocks; centered everything; generic SaaS landing structure | Layout serves content structure; matches design system; responsive behavior designed; clear hierarchy |
| Icons & decoration | Multiple icon sets; decorative emoji as UI elements; sparkle icons everywhere; animated arrows on every CTA; meaningless decorative icons; random illustration styles | One consistent library; semantic meaning; decorative icons aria-hidden; serves brand |
| Interactive | Terminal-window aesthetics without purpose; fake code blocks as decoration; typing animations everywhere; meaningless hover animations; excessive micro-interactions; animated gradients on hover; morphing shapes | Animation provides feedback or usability; respects prefers-reduced-motion; performant |
| Copy | "It's not X, it's Y"; "Supercharge your workflow"; "10x your productivity"; empty buzzwords; overpromising language | Specific to the product; claims substantiated; tone matches brand; user-focused, not marketing-focused |
| Feature lists | Checkmark-heavy lists; generic feature names; every feature as a card; repetitive structure | Real product features; structure aids comprehension; clear visual hierarchy |
| Pricing | Unnecessary three-tier pricing; generic Starter/Pro/Enterprise names; "Most popular" badge; arbitrary tier differentiation | Tiers genuinely needed; clear structure; features truly differ; accessible comparison |
| Social proof | Fake testimonials; generic profile pictures; made-up statistics; fake product demos; fabricated company logos | Testimonials, statistics, demos, and logos are real (actual customers/integrations) |

Not automatically bad: gradients, rounded corners, shadows, cards, bento grids, icons, animations, dark mode, three-tier pricing. Justification is the difference: "design system documents this layout for dashboard widgets" (good) vs "it looks modern" (bad).

## Design-System-First Checklist (before implementing)

- [ ] Checked design.md; does this pattern already exist in the codebase? Reuse it.
- [ ] Reusing existing components; no near-duplicates; consistent component variants.
- [ ] Colors from the design system; WCAG AA contrast; color never the only indicator; semantic colors consistent.
- [ ] Fonts from the design system; follow the type scale; maintain heading hierarchy; consistent weights.
- [ ] Spacing scale from the design system; consistent between similar elements; vertical rhythm.
- [ ] Real content or clearly-labeled placeholders; never invent product claims, features, integrations, statistics, or testimonials.
- [ ] Decoration serves a purpose; fits brand personality.

## Red Flags

Visual:
- Multiple font families without justification.
- Inconsistent border radius; random spacing values.
- Colors chosen outside the design system.
- Excessive shadows/gradients/blur; decoration without purpose.
- Inconsistent icon style.

Content:
- Generic marketing copy; overpromising; buzzwords without meaning.
- Fake statistics or testimonials.
- Made-up features or integrations.

Pattern:
- Copy-pasting without adapting; every page looks the same.
- No coherent visual language.
- Random component choices; inconsistent interaction patterns.

## After Implementing — verify consistency

1. Color: all from the design system; usage matches similar elements.
2. Typography: families/sizes/weights consistent; heading hierarchy intact.
3. Spacing: values from the scale; consistent between similar elements.
4. Components: existing ones reused or adapted before creating new.
5. Patterns: interactions and navigation match existing behavior.

Creating a new pattern:
1. Check it doesn't already exist.
2. Document it in design.md if reusable.
3. Keep it consistent with existing patterns.
4. Ensure accessibility.
5. Test across breakpoints.

## Hard Requirements (all UI)

Accessibility (details: accessibility-quality.md):
- [ ] Semantic HTML; keyboard accessible; visible focus states.
- [ ] WCAG AA color contrast; works with screen readers.
- [ ] Supports prefers-reduced-motion; responsive across devices.
- [ ] Touch targets ≥ 44x44px on mobile.

Performance (details: performance-quality.md):
- [ ] Optimized images (WebP/AVIF); lazy-load non-critical resources.
- [ ] No layout shifts; CSS transforms for animations (GPU-accelerated).
- [ ] Respect prefers-reduced-motion; minimize JavaScript for interactions.

## Audit Questions

1. Consistent with the design system?
2. Does the pattern already exist in the codebase?
3. Could an existing component be reused instead?
4. Decoration or purpose?
5. Accessible?
6. Performant?
7. Fits brand personality?
8. Would I recognize this as generic AI-generated UI?

Answer "no" to 1-3 or "yes" to 8 → reconsider the implementation.

## When in Doubt, Prefer

- Simplicity over complexity.
- Function over decoration.
- Consistency over novelty.
- Accessibility over aesthetics.
- Performance over effects.