# Design System

> **Purpose:** Define HOW the product looks and behaves — visual language, components, and UX patterns.  
> **Last Updated:** [Date]

---

## Design Philosophy

### Core Principles
[What drives design decisions in this product?]

- **[Principle 1]:** [e.g., "Clarity over cleverness"]
- **[Principle 2]:** [e.g., "Consistency creates trust"]
- **[Principle 3]:** [e.g., "Performance is a feature"]

### Brand Personality
[How should the product feel?]

- **[Trait 1]:** [e.g., "Professional but approachable"]
- **[Trait 2]:** [e.g., "Modern without being trendy"]
- **[Trait 3]:** [e.g., "Calm and confident"]

### Design Priorities
1. [Priority 1: e.g., "Accessibility"]
2. [Priority 2: e.g., "Performance"]
3. [Priority 3: e.g., "Visual consistency"]

---

## Color System

### Primary Colors
[Main brand colors used for primary actions and branding]

```css
--color-primary: #[HEX];          /* Primary brand color */
--color-primary-hover: #[HEX];    /* Hover state */
--color-primary-active: #[HEX];   /* Active/pressed state */
--color-primary-foreground: #[HEX]; /* Text on primary */
```

**Usage:** Primary buttons, links, key actions, brand elements

### Secondary Colors
```css
--color-secondary: #[HEX];
--color-secondary-hover: #[HEX];
--color-secondary-foreground: #[HEX];
```

**Usage:** Secondary actions, supporting elements

### Neutral Colors
[Grays for text, borders, backgrounds]

```css
--color-background: #[HEX];       /* Page background */
--color-foreground: #[HEX];       /* Primary text */
--color-muted: #[HEX];            /* Muted background */
--color-muted-foreground: #[HEX]; /* Muted text */
--color-border: #[HEX];           /* Borders, dividers */
```

### Semantic Colors
[Colors that convey meaning]

```css
--color-success: #[HEX];          /* Success states, positive */
--color-warning: #[HEX];          /* Warning, caution */
--color-error: #[HEX];            /* Error, destructive */
--color-info: #[HEX];             /* Informational */
```

### Color Accessibility
- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Primary actions meet WCAG AAA when possible (7:1)
- Color is never the only way to convey information

---

## Typography

### Font Families

**Primary Font (UI):**
```css
--font-sans: [Font name], system-ui, sans-serif;
```
**Usage:** Body text, UI elements, most content

**Secondary Font (Headings):** [Optional]
```css
--font-display: [Font name], serif;
```
**Usage:** Headings, hero sections, emphasis

**Monospace Font (Code):**
```css
--font-mono: [Font name], 'Courier New', monospace;
```
**Usage:** Code blocks, technical content

### Font Loading
- **Method:** [e.g., Next.js font optimization, self-hosted, Google Fonts]
- **Privacy consideration:** [e.g., "Self-hosted to avoid third-party requests"]

### Type Scale
[Font sizes with purpose]

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Fine print, labels |
| `text-sm` | 0.875rem (14px) | 1.25rem | Small body text |
| `text-base` | 1rem (16px) | 1.5rem | Body text |
| `text-lg` | 1.125rem (18px) | 1.75rem | Lead paragraphs |
| `text-xl` | 1.25rem (20px) | 1.75rem | Section headings |
| `text-2xl` | 1.5rem (24px) | 2rem | Page headings |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Major headings |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Hero headings |

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Text Hierarchy
- **H1:** Page title, used once per page
- **H2:** Major section headings
- **H3:** Subsection headings
- **H4-H6:** Nested content hierarchy
- **Body:** Standard paragraph text
- **Small:** Secondary information, captions

---

## Spacing System

### Spacing Scale
[Consistent spacing creates rhythm]

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### Spacing Usage
- **Component padding:** Use spacing-4 (16px) as base
- **Section spacing:** Use spacing-12 to spacing-24
- **Element gaps:** Use spacing-2 to spacing-6
- **Maintain vertical rhythm**

---

## Layout & Grid

### Container
```css
--container-max-width: 1280px;
--container-padding: 1rem; /* Mobile */
--container-padding-lg: 2rem; /* Desktop */
```

### Grid System
[If using a grid system]

- **Columns:** 12-column grid
- **Gap:** 1rem (16px) on mobile, 1.5rem (24px) on desktop
- **Responsive:** Mobile-first, stacks on small screens

### Content Width
- **Prose content:** Max 65ch for readability
- **Form inputs:** Max 500px width
- **Cards:** Flexible width with max-width constraints

---

## Breakpoints

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

### Responsive Strategy
- **Mobile-first:** Design for mobile, enhance for larger screens
- **Touch targets:** Minimum 44x44px on mobile
- **Readable text:** Minimum 16px font size on mobile

---

## Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - subtle rounding */
--radius-md: 0.375rem;  /* 6px - default rounding */
--radius-lg: 0.5rem;    /* 8px - cards, modals */
--radius-xl: 0.75rem;   /* 12px - larger elements */
--radius-2xl: 1rem;     /* 16px - images, hero sections */
--radius-full: 9999px;  /* Pills, avatars */
```

**Usage:** [e.g., "Use radius-md for most UI elements, radius-lg for cards"]

---

## Borders

```css
--border-width: 1px;
--border-width-thick: 2px;
--border-color: var(--color-border);
```

**Usage:** Borders for separation, not decoration

---

## Shadows

### Shadow Scale
[Elevation through shadows]

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

**Usage:**
- `shadow-sm` — Subtle elevation (cards in list)
- `shadow-md` — Default elevation (cards, dropdowns)
- `shadow-lg` — Emphasized elevation (modals, popovers)
- `shadow-xl` — Maximum elevation (alerts, notifications)

**Avoid:** Excessive shadows, multiple strong shadows on one screen

---

## Components

### Buttons

#### Primary Button
- **Background:** Primary color
- **Text:** Primary foreground
- **Hover:** Primary hover
- **Padding:** 0.5rem 1rem (8px 16px)
- **Border radius:** radius-md
- **Font weight:** medium
- **Usage:** Primary action on each screen

#### Secondary Button
- **Background:** Secondary color or transparent
- **Border:** 1px solid border color
- **Hover:** Background muted
- **Usage:** Secondary actions

#### Destructive Button
- **Background:** Error color
- **Usage:** Irreversible actions (delete, remove)

#### Ghost Button
- **Background:** Transparent
- **Hover:** Subtle background
- **Usage:** Tertiary actions, navigation

#### Button Sizes
- `sm` — Compact: 0.375rem 0.75rem
- `md` — Default: 0.5rem 1rem
- `lg` — Large: 0.75rem 1.5rem

#### Button States
- **Hover:** Slightly darker/lighter background
- **Active:** More pronounced color change
- **Disabled:** Reduced opacity (0.5), cursor not-allowed
- **Loading:** Show spinner, disable interaction

---

### Forms

#### Input Fields
- **Border:** 1px solid border color
- **Border radius:** radius-md
- **Padding:** 0.5rem 0.75rem
- **Focus:** Ring outline (2px offset, primary color)
- **Error:** Red border, error message below
- **Disabled:** Reduced opacity, different background

#### Labels
- **Font size:** text-sm
- **Font weight:** medium
- **Position:** Above input
- **Required indicator:** Red asterisk

#### Error Messages
- **Color:** Error color
- **Font size:** text-sm
- **Icon:** Optional error icon

#### Helper Text
- **Color:** Muted foreground
- **Font size:** text-sm
- **Position:** Below input

---

### Cards

#### Standard Card
- **Background:** Background color or muted
- **Border:** 1px solid border color (optional)
- **Border radius:** radius-lg
- **Padding:** 1rem to 1.5rem
- **Shadow:** shadow-sm to shadow-md
- **Hover:** Subtle shadow increase (if interactive)

#### Card Variants
- **Flat:** No shadow, just border
- **Elevated:** More prominent shadow
- **Interactive:** Hover state with shadow/scale

---

### Navigation

#### Header/Navigation Bar
- **Height:** [e.g., 64px]
- **Background:** [e.g., Background color with border bottom]
- **Sticky:** [Yes/No]
- **Logo position:** [Left]
- **Nav links:** [Right or center]

#### Navigation Links
- **Default:** Muted foreground
- **Hover:** Foreground
- **Active:** Primary color or underline
- **Font weight:** Medium

---

### Modals/Dialogs

#### Modal Container
- **Background:** Background color
- **Border radius:** radius-lg
- **Padding:** 1.5rem
- **Max width:** 500px (adjustable)
- **Shadow:** shadow-xl

#### Modal Overlay
- **Background:** Black with opacity (0.5)
- **Blur:** Optional backdrop blur

#### Modal Behavior
- **Close on:** Escape key, overlay click, close button
- **Focus trap:** Yes, trap focus inside modal
- **Scroll:** Lock body scroll when open

---

### Tables

#### Table Structure
- **Border:** 1px solid border color
- **Header:** Background muted, font weight medium
- **Rows:** Alternating background (optional)
- **Row hover:** Subtle background change
- **Cell padding:** 0.75rem 1rem

#### Responsive Tables
- **Mobile:** Horizontal scroll or card-based layout

---

### Notifications/Toast

#### Toast Container
- **Position:** [e.g., Top right, bottom right]
- **Width:** Max 400px
- **Shadow:** shadow-lg
- **Border radius:** radius-md

#### Toast Variants
- **Success:** Green accent
- **Error:** Red accent
- **Warning:** Yellow/orange accent
- **Info:** Blue accent

#### Toast Behavior
- **Duration:** 3-5 seconds (adjustable)
- **Dismissible:** Yes, with close button
- **Animation:** Slide in, fade out

---

### Loading States

#### Spinner
- **Size:** Small (16px), Medium (24px), Large (48px)
- **Color:** Primary or muted foreground
- **Usage:** Buttons, inline loading, full-page

#### Skeleton
- **Background:** Muted with subtle animation
- **Usage:** Content placeholders while loading

#### Progress Bar
- **Height:** 4px to 8px
- **Color:** Primary
- **Usage:** File uploads, multi-step processes

---

### Empty States

#### Empty State Design
- **Icon:** Relevant, subtle icon
- **Heading:** "No [items] yet"
- **Description:** Explain why it's empty
- **Action:** Primary action button (if applicable)
- **Illustration:** Optional simple illustration

---

### Error States

#### Error Display
- **Icon:** Error icon
- **Heading:** What went wrong
- **Description:** Why it happened (if known)
- **Action:** "Try again" button, "Go back" link
- **Avoid:** Technical jargon, blame language

---

## Icons

### Icon Library
- **Library:** [e.g., Lucide, Heroicons, custom]
- **Style:** [e.g., Outline, solid]
- **Size:** 16px (sm), 20px (md), 24px (lg)

### Icon Usage
- **Consistent library:** Use one icon set throughout
- **Meaningful icons:** Use icons that users recognize
- **Accessible:** Include aria-label or sr-only text
- **Decorative:** Mark decorative icons as aria-hidden

---

## Images

### Image Guidelines
- **Aspect ratios:** Maintain consistent ratios (16:9, 4:3, 1:1)
- **Optimization:** WebP/AVIF with JPEG fallback
- **Loading:** Lazy load below the fold
- **Alt text:** Descriptive alt text for all images
- **Placeholder:** Use blur placeholder or skeleton

### Image Sizing
- **Thumbnails:** 64x64 to 128x128
- **Cards:** 300x200 (adjustable)
- **Hero:** 1920x1080 (adjustable)

---

## Motion & Animation

### Animation Principles
- **Purposeful:** Animations should have a reason (guide attention, provide feedback)
- **Performant:** Use CSS transforms and opacity (GPU-accelerated)
- **Respectful:** Respect `prefers-reduced-motion`
- **Subtle:** Animations should enhance, not distract

### Animation Timing
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

--easing-in: cubic-bezier(0.4, 0, 1, 1);
--easing-out: cubic-bezier(0, 0, 0.2, 1);
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Common Animations
- **Fade in:** Opacity 0 to 1
- **Slide in:** Transform translateY/X
- **Scale:** Scale 0.95 to 1 (modals, popovers)
- **Hover:** Subtle scale (1.02) or brightness change

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode

[If supporting dark mode]

### Dark Mode Strategy
- **Implementation:** [e.g., CSS custom properties with data-theme attribute]
- **Default:** [Light, dark, or system preference]
- **Toggle:** [Location of theme toggle]

### Dark Mode Colors
```css
[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-muted: #1a1a1a;
  /* ... other color overrides */
}
```

### Dark Mode Considerations
- Adjust shadows (lighter in dark mode)
- Reduce contrast slightly
- Test readability
- Adjust image brightness if needed

---

## Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order
- Visible focus indicators (2px outline, primary color)
- Skip to main content link

### Screen Reader Support
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Form labels properly associated
- Error messages announced

### Color & Contrast
- Text meets WCAG AA (4.5:1)
- Large text meets WCAG AA (3:1)
- Interactive elements meet WCAG AA
- Color never the only indicator

---

## Responsive Design

### Mobile Considerations
- Touch targets: Minimum 44x44px
- Font size: Minimum 16px (prevents zoom on iOS)
- Spacing: Adequate spacing for touch
- Navigation: Mobile-friendly menu (hamburger if needed)

### Tablet Considerations
- Hybrid touch/mouse design
- Optimize for portrait and landscape
- Adjust grid for medium screens

### Desktop Considerations
- Hover states
- Keyboard shortcuts
- Larger content width
- Multi-column layouts

---

## Things to Avoid

[Project-specific anti-patterns or banned patterns]

### Visual Anti-Patterns
- ❌ Harsh gradients without purpose
- ❌ Excessive shadows (depth overkill)
- ❌ Inconsistent border radius
- ❌ Too many font sizes
- ❌ Rainbow color schemes without brand justification
- ❌ Generic AI aesthetics (unless brand-appropriate)
- ❌ Decorative animations that slow interaction

### UX Anti-Patterns
- ❌ Disabled buttons without explanation
- ❌ Fake form fields (visual only)
- ❌ Hidden required fields
- ❌ Unclear error messages
- ❌ Slow animations blocking interaction
- ❌ Modals within modals

---

## Design Tokens (Optional)

[If using a design token system like Style Dictionary]

**Location:** [e.g., `/tokens/`]  
**Format:** [e.g., JSON, YAML]  
**Build command:** [e.g., `npm run tokens:build`]

---

## Figma / Design Files

[If using Figma or other design tools]

**Figma file:** [Link]  
**Component library:** [Link]  
**Access:** [Who has access, how to request]

---

## Future Design Considerations

[Planned improvements or explorations]

- [ ] [Consideration 1: e.g., "Explore more playful micro-interactions"]
- [ ] [Consideration 2: e.g., "Refine illustration style"]

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial version |
