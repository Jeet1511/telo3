# Project Audit
**Load when:** starting work on an existing project, after a significant implementation phase, before a major release, when quality concerns arise, or for periodic review (quarterly or milestone-based).

Run only the dimensions that apply to the project type (matrix below) — never every audit on every project. Audits are constructive, not punitive: identify drift, technical debt, quality issues, and compliance gaps; document findings, prioritize issues, and track resolution. Goal: improvement, not perfection.

## Applicability Matrix

Y = run · C = conditional (only if the feature/data exists) · – = skip

Conditional triggers: Privacy — personal data, analytics, cookies, or third-party sharing; Legal — children's access, marketing emails, subscriptions, or user content; SEO — public indexable pages. E-commerce = web app plus payments: always run Legal (auto-renewal terms) and Privacy (payment data). Record skipped/N/A dimensions with a reason in the report.

| Dimension | Static / marketing site | Web app / SaaS | E-commerce | API / backend | Library / CLI tool | Mobile app | Internal tool |
|---|---|---|---|---|---|---|---|
| 1 Product alignment | Y | Y | Y | Y | Y | Y | Y |
| 2 Architecture consistency | Y | Y | Y | Y | Y | Y | Y |
| 3 Code quality | Y | Y | Y | Y | Y | Y | Y |
| 4 UI/UX quality | Y | Y | Y | – | – | Y | Y |
| 5 SEO | Y | C | Y | – | – | – | – |
| 6 Security | Y | Y | Y | Y | Y | Y | Y |
| 7 Privacy | C | Y | Y | C | C | Y | Y |
| 8 Legal/compliance | C | Y | Y | C | C | Y | C |
| 9 Accessibility | Y | Y | Y | – | – | Y | Y |
| 10 Performance | Y | Y | Y | Y | Y | Y | C |
| 11 Documentation | Y | Y | Y | Y | Y | Y | Y |

## Dimensions (checks + red flags)

### 1. Product Alignment — vs prd.md
- Check: implemented features match documented requirements; no scope drift from goals; non-goals respected; success criteria measurable; product decisions documented.
- Red flags: features not matching PRD, scope creep, forgotten requirements, undocumented product decisions.

### 2. Architecture Consistency — vs architecture.md
- Check: tech stack, file structure, data flow, API conventions, and external services match documentation; architectural decisions followed.
- Red flags: undocumented technology additions, inconsistent file organization, multiple patterns for the same thing, architectural drift, ignored decisions.

### 3. Code Quality — vs rules.md
- Check: consistent naming; standard code organization; appropriately sized functions; minimal duplication; error handling present; comments explain "why" not "what"; dead code removed; dependencies justified.
- Red flags: inconsistent naming, god functions/classes, copy-paste code, missing error handling, excessive complexity, unjustified dependencies.

### 4. UI/UX Quality — vs design.md + ui-quality.md
- Check: design system followed consistently; colors from documented palette; typography per type scale; spacing per documented scale; components reuse existing patterns; no generic AI aesthetic without justification; consistent interactive patterns; responsive behavior works.
- Red flags: vibe-coded patterns (harsh gradients, excessive effects), inconsistent component styles, random colors, inconsistent spacing, duplicated components. See `ui-quality.md` for anti-vibe-coding checks.

### 5. SEO (if applicable) — vs seo-quality.md
- Check: unique meta titles and descriptions on all pages; canonical URLs; Open Graph tags; current sitemap.xml; correct robots.txt; descriptive image alt text; correct heading hierarchy; clean descriptive URLs; good Core Web Vitals; mobile-friendly.
- Red flags: duplicate/missing meta tags, missing sitemap, broken internal links, poor mobile experience, slow page load, missing alt text. Full checklist: `seo-quality.md`.

### 6. Security — vs security-quality.md
- Check: passwords hashed properly; authorization enforced on all endpoints; comprehensive input validation; SQL/NoSQL injection and XSS prevented; CSRF protection; secrets not exposed; security headers set; HTTPS enforced; dependencies audited.
- Red flags: hardcoded secrets, missing authorization checks, string-interpolated SQL, unvalidated user input, missing security headers, vulnerable dependencies.

### 7. Privacy — vs privacy-compliance.md
- Check: data collection, third-party services, and cookies documented; privacy policy exists and is accurate; consent mechanisms where required; data deletion supported where required; sensitive data protected; external resources (fonts, CDNs) reviewed; session replay configured appropriately; children's privacy considered if applicable.
- Red flags: undocumented data collection or third-party sharing, missing/inaccurate privacy policy, invasive tracking without disclosure, external fonts without privacy consideration, children's data without safeguards.

### 8. Legal/Compliance — vs legal-compliance.md
- Check: age restrictions implemented if required; marketing emails have unsubscribe; subscription terms clear; copyright/DMCA considered for user content; applicable legal requirements identified; technical controls implemented; legal review recommended. Never claim legally compliant without evidence.
- Red flags: children can use service without age gate, marketing emails without unsubscribe, hidden subscription terms, user content without copyright policy, fabricated compliance claims.

### 9. Accessibility — vs accessibility-quality.md (WCAG)
- Check: semantic HTML; keyboard navigation works; visible focus indicators; form labels; image alt text; color contrast meets WCAG AA; logical heading hierarchy; appropriate ARIA; respects prefers-reduced-motion; adequate touch targets.
- Red flags: `<div>` used as buttons, missing alt text, poor contrast, keyboard-inaccessible controls, no focus indicators, missing form labels.

### 10. Performance — vs performance-quality.md
- Check: good Core Web Vitals (LCP, INP, CLS); optimized images; lazy loading; code splitting; reasonable bundle size; caching configured; fonts optimized; third-party scripts minimized.
- Red flags: unoptimized images, large JavaScript bundles, no lazy loading, poor Core Web Vitals scores, no caching strategy, too many third-party scripts.

### 11. Documentation — all project context docs
- Check: prd.md current and accurate; architecture.md matches implementation; rules.md followed; design.md matches actual design; tasks.md up to date; memory.md contains relevant context; no secrets in documentation; no stale information.
- Red flags: documentation out of sync with code, stale decisions, missing important context, secrets in documentation.

## Severity Classification

| Severity | Criteria | Action |
|---|---|---|
| Critical | Exploitable security hole, data loss/exposure, legal violation risk, broken core flow | Immediate action required; block release |
| High | Major feature, privacy, or accessibility gap; significant architectural drift | Fix before release |
| Medium | Quality debt, inconsistency, missing documentation | Schedule short-term (1–4 weeks) |
| Low | Polish and minor improvements | Backlog |

Per-dimension status: Good / Needs Attention / Critical Issues / N/A.

## Report Format (compact)

```markdown
# Project Audit Report — [project] — [date] — [auditor or "AI Agent"]
Summary: [overall health; critical issues; key recommendations]
| Dimension | Status | Findings |
|---|---|---|
| [name] | Good / Needs Attention / Critical / N/A | [positive findings; issues] |
Critical issues (immediate action): [issue] — impact: [risk] — recommendation: [fix]
Other issues: [High / Medium / Low] [issue] — impact — recommendation
Positive findings: [what works well; good practices observed]
Actions: immediate [...] / short-term 1–4 weeks [...] / long-term [...]
Next audit: [date or milestone]
```

## Tooling

- Automated: Lighthouse (performance, accessibility, SEO); axe DevTools and WAVE (accessibility).
- Automated: ESLint (code quality); npm audit / yarn audit (dependencies).
- Manual review required: product alignment, architecture consistency, design consistency, privacy practices, legal compliance, security logic, business logic.

## Resolution

- Verify the changed behavior after every fix; skip re-verification only for unrelated areas.
- Track each issue to resolution; re-audit at the recommended date or milestone.