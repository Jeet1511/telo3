# UI Quality & Anti-Vibe-Coding

> Guidelines for maintaining design consistency and avoiding generic AI-generated aesthetics.

---

## Core Principle

**Use patterns when justified by the actual product, brand, UX, accessibility, or design system.**

Vibe-coded patterns are not absolutely prohibited. They become problems when:
- Applied without justification
- Inconsistent with established design system
- Chosen because "it looks AI-generated" rather than serving users
- Added as decoration without functional purpose

---

## The Vibe-Coding Problem

**Vibe coding** is implementing UI based on aesthetic trends or AI training patterns rather than:
- Actual design system
- Brand personality
- User needs
- Accessibility requirements
- Performance constraints

### Symptoms of Vibe Coding

- Every project looks the same
- Generic "AI aesthetic" regardless of product
- Decoration over function
- Trends over brand consistency
- Copying without adapting
- No coherent visual language

---

## Generic AI Aesthetic Patterns

### Visual Patterns to Question

#### Colors & Gradients
❓ **Question before using:**
- Harsh gradients (bright to bright)
- Arbitrary rainbow gradients
- Generic purple/black "AI" color schemes
- Arbitrary neon colors
- Generic pastel palettes
- Overly saturated colors

✅ **Use when:**
- Brand guidelines specify these colors
- Design system documents these patterns
- Product personality justifies the aesthetic
- Accessibility is maintained

#### Shadows & Depth
❓ **Question before using:**
- Excessive shadows everywhere
- Multiple strong shadows on one element
- Shadow overkill (shadow on every card)
- Inconsistent shadow usage

✅ **Use when:**
- Design system specifies elevation levels
- Shadows serve hierarchical purpose
- Consistently applied across interface

#### Borders & Radius
❓ **Question before using:**
- Excessive rounded corners (radius > 24px)
- Inconsistent border radius
- Pills for everything
- Arbitrary mix of sharp and rounded

✅ **Use when:**
- Design system documents radius scale
- Consistently applied across interface
- Serves brand personality

#### Effects
❓ **Question before using:**
- Excessive glassmorphism
- Blur effects on every surface
- Liquid/blob shapes
- Radial gradient orbs
- Dot grid backgrounds
- Mesh gradients
- Noise textures

✅ **Use when:**
- Brand aesthetic explicitly uses these
- Performance is acceptable
- Accessibility is maintained (contrast, reduced motion)

---

### Component Patterns to Question

#### Layouts
❓ **Question before using:**
- Repetitive 3-card feature sections
- Generic bento grids without purpose
- Every page uses the same card layout
- Hero section with blob background
- Alternating left-right content blocks
- Centered everything
- Generic "SaaS landing page" structure

✅ **Use when:**
- Layout serves content structure
- Consistent with design system
- Responsive behavior is well-designed
- Hierarchy is clear

#### Icons & Decoration
❓ **Question before using:**
- Inconsistent icon usage (multiple icon sets)
- Decorative emojis as UI elements
- Sparkle icons everywhere
- Animated arrows on every CTA
- Decorative icons with no meaning
- Random illustration style

✅ **Use when:**
- Icons are from consistent library
- Icons have semantic meaning
- Decoration serves brand personality
- Accessible (aria-hidden for decorative)

#### Interactive Elements
❓ **Question before using:**
- Terminal window aesthetics without purpose
- Fake code blocks as decoration
- Typing animations everywhere
- Meaningless hover animations
- Excessive micro-interactions
- Animated gradients on hover
- Morphing shapes

✅ **Use when:**
- Animation provides feedback
- Respects prefers-reduced-motion
- Performance is acceptable
- Actually enhances usability

---

### Content Patterns to Question

#### Copy
❓ **Question before using:**
- "It's not X, it's Y" formulation
- "Supercharge your workflow"
- "10x your productivity"
- Generic buzzwords without meaning
- Overpromising language

✅ **Use when:**
- Copy is specific to product
- Claims are substantiated
- Tone matches brand personality
- User-focused, not marketing-focused

#### Feature Lists
❓ **Question before using:**
- Checkmark-heavy feature lists
- Generic feature names
- Every feature as a card
- Repetitive structure

✅ **Use when:**
- Features are actual product features
- Structure serves comprehension
- Visual hierarchy is clear

#### Pricing
❓ **Question before using:**
- Unnecessary three-tier pricing
- Generic plan names (Starter, Pro, Enterprise)
- "Most popular" badge
- Arbitrary feature differentiation

✅ **Use when:**
- Multiple tiers are actually needed
- Pricing structure is clear
- Features genuinely differ between tiers
- Accessible comparison

#### Testimonials & Social Proof
❓ **Question before using:**
- Fake testimonials
- Generic profile pictures
- Made-up statistics
- Fake product demonstrations
- Fabricated company logos

✅ **Use when:**
- Testimonials are real
- Statistics are factual
- Demonstrations are actual product
- Logos represent real integrations/customers

---

## Design Consistency Checklist

### Before Implementing UI

- [ ] Have I checked the design system? (design.md)
- [ ] Am I following existing component patterns?
- [ ] Is this consistent with the brand personality?
- [ ] Does this pattern already exist in the codebase?
- [ ] Am I reusing existing components?
- [ ] Is this decoration or does it serve a purpose?

### Color Usage

- [ ] Using colors from design system
- [ ] Maintaining color contrast (WCAG AA minimum)
- [ ] Not using color as only indicator
- [ ] Consistent use of semantic colors

### Typography

- [ ] Using fonts from design system
- [ ] Following type scale
- [ ] Maintaining heading hierarchy
- [ ] Consistent font weights

### Spacing

- [ ] Using spacing scale from design system
- [ ] Consistent spacing between similar elements
- [ ] Maintaining vertical rhythm

### Components

- [ ] Reusing existing components
- [ ] Not creating near-duplicates
- [ ] Following established patterns
- [ ] Consistent component variants

---

## Red Flags

### 🚩 Visual Red Flags

- Multiple font families without justification
- Inconsistent border radius
- Random color choices outside design system
- Excessive effects (shadows, gradients, blur)
- Decoration without purpose
- Inconsistent icon style
- Random spacing values

### 🚩 Content Red Flags

- Generic marketing copy
- Fake statistics or testimonials
- Made-up features or integrations
- Overpromising language
- Buzzwords without meaning

### 🚩 Pattern Red Flags

- Copy-pasting without adapting
- Every page looks the same
- No coherent visual language
- Random component choices
- Inconsistent interaction patterns

---

## Decision Framework

### When Choosing a Visual Pattern

**Ask:**

1. **Does the design system document this?**
   - Yes → Follow it
   - No → Proceed with caution

2. **Does this serve the user?**
   - Yes → Consider it
   - No → Don't use it

3. **Is this consistent with existing UI?**
   - Yes → Use it
   - No → Justify deviation

4. **Does this fit brand personality?**
   - Yes → Consider it
   - No → Look for alternatives

5. **Is this accessible and performant?**
   - Yes → Consider it
   - No → Find accessible/performant alternative

### When in Doubt

1. **Check existing implementation** — How is similar UI handled?
2. **Check design.md** — What does the design system say?
3. **Ask user** — Is this the right direction?
4. **Prefer simplicity** — Simple, accessible UI over trendy effects

---

## Acceptable Patterns

### These are NOT automatically bad:

- **Gradients** — If brand uses them consistently
- **Rounded corners** — If design system documents radius scale
- **Shadows** — If used for elevation hierarchy
- **Cards** — If appropriate for content structure
- **Bento grids** — If they serve content organization
- **Icons** — If from consistent library with semantic meaning
- **Animations** — If they provide feedback and respect reduced motion
- **Dark mode** — If implemented consistently
- **Three-tier pricing** — If business model genuinely needs it

### The key is JUSTIFICATION:

✅ **Good:** "Using bento grid because design system documents this layout for dashboard widgets"

❌ **Bad:** "Using bento grid because it looks modern"

---

## Maintaining Consistency

### Consistency Checks

After implementing UI, verify:

1. **Color consistency**
   - Are all colors from the design system?
   - Is color usage consistent with similar elements?

2. **Typography consistency**
   - Are font families, sizes, weights consistent?
   - Is heading hierarchy maintained?

3. **Spacing consistency**
   - Are spacing values from the design system?
   - Is spacing consistent between similar elements?

4. **Component consistency**
   - Are existing components reused?
   - Are new components needed or can existing be adapted?

5. **Pattern consistency**
   - Do interactions match existing patterns?
   - Is navigation consistent?

### Creating New Patterns

When creating new patterns:

1. **Check if pattern already exists**
2. **Document in design.md** if it's reusable
3. **Make it consistent** with existing patterns
4. **Ensure accessibility**
5. **Test across breakpoints**

---

## Accessibility & Quality Standards

### All UI Must:

- [ ] Use semantic HTML
- [ ] Be keyboard accessible
- [ ] Have visible focus states
- [ ] Meet color contrast requirements
- [ ] Work with screen readers
- [ ] Support reduced motion preference
- [ ] Be responsive across devices
- [ ] Have touch targets ≥44x44px on mobile

See `accessibility-quality.md` for detailed standards.

---

## Performance Considerations

### All UI Should:

- [ ] Use optimized images (WebP/AVIF)
- [ ] Lazy load non-critical resources
- [ ] Avoid layout shifts
- [ ] Use CSS transforms for animations (GPU-accelerated)
- [ ] Respect prefers-reduced-motion
- [ ] Minimize JavaScript for interactions

See `performance-quality.md` for detailed standards.

---

## Audit Questions

### When Reviewing UI Implementation

1. **Is this consistent with the design system?**
2. **Does this pattern already exist in the codebase?**
3. **Could I reuse an existing component instead?**
4. **Is this decoration or does it serve a purpose?**
5. **Is this accessible?**
6. **Is this performant?**
7. **Does this fit the brand personality?**
8. **Would I recognize this as generic AI-generated UI?**

If you answer "no" to 1-3 or "yes" to 8, reconsider the implementation.

---

## Examples

### ❌ Vibe-Coded UI

```jsx
// Generic AI aesthetic without justification
<div className="rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 shadow-2xl backdrop-blur-xl">
  <h2 className="text-4xl font-bold text-white animate-pulse">
    ✨ Supercharge Your Workflow
  </h2>
  <div className="grid grid-cols-3 gap-8 mt-8">
    {/* Three generic feature cards */}
  </div>
</div>
```

**Problems:**
- Arbitrary harsh gradient
- Excessive border radius
- Excessive shadow
- Decorative emoji
- Generic marketing copy
- Repetitive structure without justification

### ✅ Design-System-Driven UI

```jsx
// Follows documented design system
<Card className="bg-background border border-border rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-foreground mb-4">
    Recent Activity
  </h2>
  <ActivityList items={activities} />
</Card>
```

**Good:**
- Uses design tokens (bg-background, border-border)
- Documented border radius (rounded-lg)
- Appropriate shadow (shadow-md)
- Semantic HTML
- Clear purpose

---

## Summary

**Vibe coding is not about prohibiting patterns.**

**It's about ensuring patterns are:**
- ✅ Justified by design system, brand, or user needs
- ✅ Consistently applied
- ✅ Accessible and performant
- ✅ Purposeful, not decorative
- ✅ Adapted to the product, not copy-pasted

**Before implementing any UI pattern, ask:**
1. Does the design system document this?
2. Does this serve the user?
3. Is this consistent with existing UI?
4. Does this fit brand personality?
5. Is this accessible and performant?

**When in doubt, prefer:**
- Simplicity over complexity
- Function over decoration
- Consistency over novelty
- Accessibility over aesthetics
- Performance over effects

**The goal:** Maintainable, accessible, performant UI that serves users and reflects the actual brand—not generic AI trends.
