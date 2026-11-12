# Accessibility Quality
**Load when:** building or reviewing any interactive UI, forms, or media, or auditing WCAG compliance.

Baseline: WCAG 2.1 Level AA (A = minimum, AA = recommended target, AAA = highest). POUR: Perceivable, Operable, Understandable, Robust (works with assistive tech). Build accessibility in from the start; it is not optional.

## Semantic HTML first (ARIA only when HTML is insufficient)
- `<button>` for actions; `<a>` for navigation.
- Never use `<div>`/`<span>` as buttons.
- `<nav>` for navigation; `<main>` for main content; `<header>` and `<footer>`.
- `<article>`, `<section>`, `<aside>` used appropriately.
- Headings `<h1>`-`<h6>` for structure; `<ul>`/`<ol>` for lists.
- `<table>` only for tabular data, never layout.

## Keyboard & Focus
- All interactive elements keyboard accessible.
- Logical tab order matching visual flow; no keyboard traps.
- Skip-to-main-content link provided.
- Visible focus on every interactive element; focus outline minimum 2px with sufficient contrast.
- Never `outline: none` / `:focus { outline: none }` without an accessible replacement.
- Modals: trap focus inside; move focus to modal on open.
- Return focus to trigger on close; Escape closes dialogs/modals.

## Forms & Labels
- Every input has an associated `<label>` (`for="id"` or wrapping).
- Placeholder is never the only label.
- Required fields indicated by more than color alone.
- Errors clear and actionable; associated with inputs via `aria-describedby`.
- Form validation errors announced to screen readers.

## Images & Alt Text
- Every image has `alt`: descriptive for informative images, `alt=""` for decorative.
- Complex images: longer description via `aria-describedby`.
- Icons/icon-only buttons: `aria-label` or sr-only text.
- Avoid images of text — use real text.

## Color & Contrast (WCAG AA)
| Element | Minimum ratio |
|---|---|
| Normal text | 4.5:1 |
| Large text (18pt+, or 14pt+ bold) | 3:1 |
| Interactive elements / UI components | 3:1 |
- Color is never the only way to convey information.
- Links distinguishable from surrounding text (underline or sufficient contrast).

## Headings, Links, Buttons
- One `<h1>` per page; logical order h1→h2→h3; no skipped levels.
- Headings describe content structure, not used just for styling.
- Descriptive link text ("Read our guide", not "Click here"); purpose clear from text or context.
- Links visually distinct from text; indicate external links when appropriate.
- Button text descriptive; icon-only buttons get `aria-label`.
- Explain disabled buttons (not just greyed out).

## ARIA (only when semantic HTML can't do it)
- `role` where needed (e.g. `role="dialog"`).
- `aria-label` for unlabeled elements; `aria-labelledby` for complex labels; `aria-describedby` for descriptions.
- `aria-hidden="true"` on decorative elements.
- `aria-live` for dynamic updates; `role="alert"` for important messages.
- State: `aria-expanded`, `aria-pressed`, `aria-selected`.
- Don't overuse ARIA — native semantics are better.

## Dynamic Content & Modals
- Announce status, loading, error, and success messages to screen readers (`aria-live`).
- `role="alert"` for urgent messages.
- Modals: `role="dialog"` or `"alertdialog"`, `aria-modal="true"`, `aria-labelledby` for the title.
- Background content inert while modal open.

## Tables & Media
- Tables: `<th>` headers, `<caption>` title, `<td>` data cells; `scope` attribute for complex tables.
- Videos have captions; audio has transcripts.
- No autoplay (or easily stopped); media controls keyboard accessible.

## Touch, Motion, Language, Zoom
- Touch targets ≥ 44x44px on mobile (WCAG AAA: 44px; AA minimum: 24px).
- Adequate spacing between targets; buttons easy to tap.
- Respect `prefers-reduced-motion`; essential motion only; animations can be paused.
- No flashing content (seizure risk: keep < 3 flashes/sec).
- `<html lang="...">` set; mark language changes (`<span lang="es">Hola</span>`).
- Content reflows at 400% zoom without horizontal scrolling.
- Never disable zoom via viewport meta; text resizes without loss of functionality.
- Layout adapts to different screen sizes.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## Testing
- Automated: Lighthouse (Chrome DevTools), axe DevTools, WAVE, Color Contrast Analyzer.
- Automated tools catch only ~30% of issues — manual testing is essential.
- Manual keyboard-only pass (no mouse): focus visibility, tab order, traps, Escape behavior, skip link.
- Screen readers: NVDA (Windows, free), JAWS (Windows, paid), VoiceOver (macOS/iOS, built-in), TalkBack (Android, built-in).
- SR test coverage: heading/landmark navigation, form labels/errors, buttons/links, dynamic announcements, alt text.
- Test with real users of assistive technologies.

## Record in project docs
- Target level and audit status/date; semantic HTML, keyboard, forms, alt text, contrast status.
- Screen readers tested; reduced-motion support; known issues; next steps.