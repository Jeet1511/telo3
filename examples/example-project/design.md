# Design System — TaskFlow

> **Last Updated:** 2024-12-20

---

## Design Philosophy

**Principle:** Clarity over cleverness. Simple, functional, accessible.

**Personality:** Professional, calm, focused.

**Priorities:**
1. Usability
2. Accessibility
3. Performance
4. Visual polish

---

## Colors

```css
/* Primary (Blue) */
--primary: 220 90% 56%;
--primary-foreground: 0 0% 100%;

/* Neutral */
--background: 0 0% 100%;
--foreground: 224 71% 4%;
--muted: 220 13% 95%;
--border: 220 13% 91%;

/* Semantic */
--success: 142 71% 45%;
--warning: 38 92% 50%;
--error: 0 84% 60%;
```

---

## Typography

**Font:** Inter (self-hosted for privacy)

**Scale:**
- text-sm (14px) — Labels, helper text
- text-base (16px) — Body text
- text-lg (18px) — Section titles
- text-xl (20px) — Page headings
- text-2xl (24px) — Hero headings

**Weights:** 400 (normal), 500 (medium), 600 (semibold)

---

## Spacing

Use Tailwind's default scale: 4, 8, 12, 16, 24, 32, 48, 64px

**Common:**
- Component padding: 16px (p-4)
- Section spacing: 32px (space-y-8)
- Card padding: 24px (p-6)

---

## Components

### Button

**Primary:**
- Background: `bg-primary`
- Text: `text-primary-foreground`
- Padding: `px-4 py-2`
- Radius: `rounded-md` (6px)
- Hover: Slightly darker

**Secondary:**
- Border: `border border-border`
- Background: Transparent
- Hover: `bg-muted`

**Sizes:** sm, md (default), lg

### Card

- Background: `bg-background`
- Border: `border border-border`
- Radius: `rounded-lg` (8px)
- Padding: `p-6`
- Shadow: `shadow-sm`

### Task Card

- Draggable
- Shows title, assignee, status
- Hover: `shadow-md`
- Click: Opens detail modal

---

## Board Layout

**Three columns:**
- To Do (left)
- In Progress (center)
- Done (right)

**Visual:**
- Column headers: `text-lg font-semibold`
- Column background: `bg-muted`
- Task cards stack vertically with `space-y-2`
- Drag-and-drop indicators on hover

---

## Responsive

**Breakpoints:**
- Mobile: < 768px (stack columns vertically)
- Tablet: 768px - 1024px
- Desktop: > 1024px (3-column layout)

**Mobile behavior:**
- Columns become tabs
- Swipe between statuses
- Touch-friendly drag-and-drop

---

## Motion

**Timing:** 150ms (fast), 300ms (normal)

**Animations:**
- Drag preview: opacity 0.8, slight rotation
- Status change: smooth transition
- Modal: fade + scale from 0.95

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}
```

---

## Accessibility

- All buttons keyboard accessible
- Focus visible (2px outline)
- Screen reader labels
- ARIA attributes on drag-and-drop
- WCAG AA contrast

---

## Things to Avoid

❌ Harsh gradients  
❌ Excessive shadows  
❌ Rainbow colors  
❌ Decorative animations  
❌ Generic "AI aesthetic"  

---

**Summary:** Keep it simple, functional, and accessible. Consistency over novelty.
