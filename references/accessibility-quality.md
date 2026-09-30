# Accessibility Quality Standards

> WCAG-based accessibility audit framework.

---

## Core Principles (POUR)

1. **Perceivable** — Information must be presentable to users
2. **Operable** — UI components must be operable
3. **Understandable** — Information and operation must be understandable
4. **Robust** — Content must work with assistive technologies

---

## Accessibility Audit Checklist

### 1. Semantic HTML
- [ ] Use appropriate HTML elements (`<button>`, not `<div>` for buttons)
- [ ] Use `<nav>` for navigation
- [ ] Use `<main>` for main content
- [ ] Use `<header>` and `<footer>`
- [ ] Use `<article>`, `<section>`, `<aside>` appropriately
- [ ] Use headings (`<h1>`-`<h6>`) for structure
- [ ] Use `<ul>`/`<ol>` for lists
- [ ] Use `<table>` only for tabular data

### 2. Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Logical tab order (matches visual flow)
- [ ] Visible focus indicators (not removed with `outline: none` without replacement)
- [ ] No keyboard traps
- [ ] Skip to main content link provided
- [ ] Modal focus trapped appropriately
- [ ] Escape closes dialogs/modals

### 3. Focus Management
- [ ] Visible focus states on all interactive elements
- [ ] Focus outline: minimum 2px, sufficient contrast
- [ ] Focus moved appropriately (e.g., to modal when opened)
- [ ] Focus returned after modal closes
- [ ] No `:focus { outline: none }` without accessible alternative

### 4. Forms & Labels
- [ ] All inputs have associated `<label>`
- [ ] Use `<label for="id">` or wrap input in `<label>`
- [ ] Required fields indicated (not just with color)
- [ ] Error messages associated with inputs (`aria-describedby`)
- [ ] Error messages are clear and actionable
- [ ] Placeholder is not the only label
- [ ] Form validation errors announced to screen readers

### 5. Images & Alt Text
- [ ] All images have `alt` attribute
- [ ] Informative images: Descriptive alt text
- [ ] Decorative images: `alt=""` (empty)
- [ ] Complex images: Longer description via `aria-describedby`
- [ ] Icons have text alternatives (`aria-label` or sr-only text)
- [ ] Image of text avoided (use actual text)

### 6. Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (normal text, WCAG AA)
- [ ] Large text contrast ratio ≥ 3:1 (18pt+ or 14pt+ bold, WCAG AA)
- [ ] Interactive element contrast ≥ 3:1
- [ ] Color is not the only way to convey information
- [ ] Links distinguishable from surrounding text (underline or sufficient contrast)

### 7. Heading Hierarchy
- [ ] One `<h1>` per page
- [ ] Headings in logical order (h1 → h2 → h3, don't skip levels)
- [ ] Headings describe content structure
- [ ] Headings not used just for styling

### 8. Links
- [ ] Link text is descriptive ("Read our guide" not "Click here")
- [ ] Links are visually distinct from text
- [ ] Link purpose clear from text or context
- [ ] External links indicated if appropriate
- [ ] Skip navigation link provided

### 9. Buttons
- [ ] Use `<button>` for actions (not `<div>` or `<span>`)
- [ ] Use `<a>` for navigation
- [ ] Button text is descriptive
- [ ] Icons-only buttons have `aria-label`
- [ ] Disabled buttons explained (not just greyed out)

### 10. ARIA Attributes
- [ ] Use ARIA when semantic HTML isn't sufficient
- [ ] `role` attribute where needed (e.g., `role="dialog"`)
- [ ] `aria-label` for unlabeled elements
- [ ] `aria-labelledby` for complex labels
- [ ] `aria-describedby` for descriptions
- [ ] `aria-hidden="true"` for decorative elements
- [ ] `aria-live` for dynamic content updates
- [ ] `aria-expanded`, `aria-pressed`, `aria-selected` for state
- [ ] Don't overuse ARIA (semantic HTML is better)

### 11. Dynamic Content
- [ ] Screen reader announcements for status messages
- [ ] Loading states announced
- [ ] Error messages announced
- [ ] Success messages announced
- [ ] Use `aria-live` for dynamic updates
- [ ] Use `role="alert"` for important messages

### 12. Modals & Dialogs
- [ ] Focus trapped inside modal
- [ ] Escape key closes modal
- [ ] Focus moved to modal when opened
- [ ] Focus returned to trigger when closed
- [ ] `role="dialog"` or `role="alertdialog"`
- [ ] `aria-modal="true"`
- [ ] `aria-labelledby` for modal title
- [ ] Background content inert when modal open

### 13. Tables
- [ ] Use `<table>` for tabular data (not layout)
- [ ] Use `<th>` for headers
- [ ] Use `<caption>` for table title
- [ ] Complex tables use `scope` attribute
- [ ] Data cells use `<td>`

### 14. Media
- [ ] Videos have captions
- [ ] Audio has transcripts
- [ ] No auto-play (or easily stopped)
- [ ] Media controls are keyboard accessible

### 15. Touch Targets
- [ ] Touch targets ≥ 44x44px on mobile (WCAG AAA: 44px, AA: 24px minimum)
- [ ] Adequate spacing between touch targets
- [ ] Buttons are easy to tap

### 16. Motion & Animation
- [ ] Respect `prefers-reduced-motion`
- [ ] Essential motion only
- [ ] No flashing content (seizure risk: <3 flashes/sec)
- [ ] Animations can be paused

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 17. Language
- [ ] `<html lang="en">` or appropriate language
- [ ] Language changes marked: `<span lang="es">Hola</span>`

### 18. Responsive & Zoom
- [ ] Content reflows at 400% zoom without horizontal scrolling
- [ ] No viewport meta tag disabling zoom
- [ ] Text resizes without loss of functionality
- [ ] Layout adapts to different screen sizes

---

## WCAG Conformance Levels

- **Level A:** Minimum (must have)
- **Level AA:** Mid-range (should have) — **recommended target**
- **Level AAA:** Highest (nice to have)

**Aim for WCAG 2.1 Level AA compliance as a baseline.**

---

## Screen Reader Testing

### Test With:
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS, iOS, built-in)
- **TalkBack** (Android, built-in)

### What to Test:
- Navigation (headings, landmarks)
- Forms (labels, errors)
- Interactive elements (buttons, links)
- Dynamic content (announcements)
- Images (alt text)

---

## Common Accessibility Mistakes

❌ `<div>` or `<span>` used as buttons  
❌ Missing alt text  
❌ Poor color contrast  
❌ Form inputs without labels  
❌ Keyboard inaccessible controls  
❌ No visible focus indicators  
❌ Skipped heading levels  
❌ "Click here" link text  
❌ Color as only indicator  
❌ Auto-playing media  
❌ Removing `outline` without replacement  
❌ Non-descriptive ARIA labels  

---

## Accessibility Documentation Template

```markdown
## Accessibility

### WCAG Compliance
- **Target level:** WCAG 2.1 Level AA
- **Current status:** [In progress / Needs audit / Compliant]
- **Last audit:** [Date or "Not performed"]

### Semantic HTML
- **Status:** [Implemented / Partial]

### Keyboard Navigation
- **All interactive elements accessible:** [Yes/No]
- **Focus indicators:** [Visible]
- **Tab order:** [Logical]

### Forms
- **Labels:** [All inputs labeled]
- **Error handling:** [Accessible]

### Images
- **Alt text:** [Complete / Partial]

### Color Contrast
- **Status:** [WCAG AA compliant / Needs improvement]

### Screen Readers
- **Tested with:** [NVDA, VoiceOver, etc. or "Not tested"]

### Motion
- **Respects prefers-reduced-motion:** [Yes/No]

### Known Issues
- [List accessibility issues or "None known"]

### Next Steps
- [ ] [Accessibility task 1]
- [ ] [Accessibility task 2]
```

---

## Tools for Accessibility Audit

- **Lighthouse** (Chrome DevTools) — Automated audit
- **axe DevTools** (browser extension) — Comprehensive testing
- **WAVE** (browser extension) — Visual feedback
- **Color Contrast Analyzer** — Check contrast ratios
- **Screen readers** — Manual testing (NVDA, VoiceOver)
- **Keyboard only** — Test without mouse

---

## Quick Wins

1. Add alt text to all images
2. Ensure keyboard navigation works
3. Make focus visible
4. Use semantic HTML
5. Label all form inputs
6. Check color contrast
7. Add skip link
8. Test with keyboard only
9. Respect prefers-reduced-motion

---

**Summary:** Accessibility is not optional. Build it in from the start. Use semantic HTML, ensure keyboard navigation, maintain color contrast, provide text alternatives, and test with real users and assistive technologies.

**Remember:** Automated tools catch ~30% of issues. Manual testing and user testing with people using assistive technologies are essential for true accessibility.
