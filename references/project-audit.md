# Project Audit Framework

> Comprehensive audit procedures for systematic project review.

---

## When to Run an Audit

- Starting work on an existing project
- After significant implementation phase
- Before major release
- When quality concerns arise
- Periodically (quarterly or milestone-based)

---

## Audit Categories

### 1. Product Alignment
### 2. Architecture Consistency
### 3. Code Quality
### 4. UI/UX Quality
### 5. SEO (if applicable)
### 6. Security
### 7. Privacy
### 8. Legal/Compliance
### 9. Accessibility
### 10. Performance
### 11. Documentation

---

## 1. Product Alignment Audit

**Check against prd.md:**

- [ ] Implemented features match documented requirements
- [ ] Scope hasn't drifted from documented goals
- [ ] Non-goals are still respected
- [ ] Success criteria are measurable
- [ ] Product decisions are documented

**Red flags:**
- Features that don't match PRD
- Scope creep
- Forgotten requirements
- Undocumented product decisions

---

## 2. Architecture Consistency Audit

**Check against architecture.md:**

- [ ] Tech stack matches documentation
- [ ] File structure follows documented organization
- [ ] Data flow matches documented patterns
- [ ] APIs follow documented conventions
- [ ] External services match documentation
- [ ] Architectural decisions are followed

**Red flags:**
- Undocumented technology additions
- Inconsistent file organization
- Multiple patterns for the same thing
- Architectural drift
- Ignored architectural decisions

---

## 3. Code Quality Audit

**Check against rules.md:**

- [ ] Naming conventions are consistent
- [ ] Code organization follows standards
- [ ] Functions are appropriately sized
- [ ] Duplication is minimal
- [ ] Error handling is present
- [ ] Comments explain "why" not "what"
- [ ] Dead code is removed
- [ ] Dependencies are justified

**Red flags:**
- Inconsistent naming
- God functions/classes
- Copy-paste code
- Missing error handling
- Excessive complexity
- Unjustified dependencies

---

## 4. UI/UX Quality Audit

**Check against design.md and ui-quality.md:**

- [ ] Design system is followed consistently
- [ ] Colors are from documented palette
- [ ] Typography follows type scale
- [ ] Spacing uses documented scale
- [ ] Components reuse existing patterns
- [ ] No generic AI aesthetic without justification
- [ ] Interactive patterns are consistent
- [ ] Responsive behavior works

**Red flags:**
- Vibe-coded patterns (harsh gradients, excessive effects)
- Inconsistent component styles
- Random color choices
- Inconsistent spacing
- Duplicated components
- Generic "AI aesthetic" without purpose

**See `ui-quality.md` for detailed anti-vibe-coding checks.**

---

## 5. SEO Audit (if applicable)

**Check against seo-quality.md:**

- [ ] Unique meta titles on all pages
- [ ] Unique meta descriptions on all pages
- [ ] Canonical URLs set
- [ ] Open Graph tags present
- [ ] Sitemap.xml exists and is current
- [ ] robots.txt configured correctly
- [ ] Images have descriptive alt text
- [ ] Heading hierarchy is correct
- [ ] URLs are clean and descriptive
- [ ] Core Web Vitals are good
- [ ] Mobile-friendly

**Red flags:**
- Duplicate or missing meta tags
- Missing sitemap
- Broken internal links
- Poor mobile experience
- Slow page load
- Missing alt text

**See `seo-quality.md` for complete checklist.**

---

## 6. Security Audit

**Check against security-quality.md:**

- [ ] Passwords are hashed properly
- [ ] Authorization is enforced on all endpoints
- [ ] Input validation is comprehensive
- [ ] SQL/NoSQL injection is prevented
- [ ] XSS is prevented
- [ ] CSRF protection is implemented
- [ ] Secrets are not exposed
- [ ] Security headers are set
- [ ] HTTPS is enforced
- [ ] Dependencies are audited

**Red flags:**
- Hardcoded secrets
- Missing authorization checks
- SQL queries with string interpolation
- Unvalidated user input
- Missing security headers
- Vulnerable dependencies

**See `security-quality.md` for detailed security checks.**

---

## 7. Privacy Audit

**Check against privacy-compliance.md:**

- [ ] Data collection is documented
- [ ] Third-party services are documented
- [ ] Cookies are documented
- [ ] Privacy policy exists and is accurate
- [ ] Consent mechanisms where required
- [ ] Data deletion is supported where required
- [ ] Sensitive data is protected
- [ ] External resources reviewed (fonts, CDNs)
- [ ] Session replay configured appropriately
- [ ] Children's privacy considered if applicable

**Red flags:**
- Undocumented data collection
- Undocumented third-party sharing
- Missing or inaccurate privacy policy
- Invasive tracking without disclosure
- External fonts without privacy consideration
- Children's data collected without safeguards

**See `privacy-compliance.md` for detailed privacy checks.**

---

## 8. Legal/Compliance Audit

**Check against legal-compliance.md:**

- [ ] Age restrictions implemented if required
- [ ] Marketing emails have unsubscribe if applicable
- [ ] Subscription terms are clear if applicable
- [ ] Copyright/DMCA considered for user content
- [ ] Applicable legal requirements identified
- [ ] Technical controls implemented
- [ ] Legal review recommended where appropriate

**Red flags:**
- Children can use service without age gate
- Marketing emails without unsubscribe
- Hidden subscription terms
- User content without copyright policy
- Fabricated compliance claims

**See `legal-compliance.md` for detailed compliance checks.**

---

## 9. Accessibility Audit

**Check against accessibility-quality.md:**

- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Forms have labels
- [ ] Images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Heading hierarchy is logical
- [ ] ARIA used appropriately
- [ ] Respects prefers-reduced-motion
- [ ] Touch targets are adequate

**Red flags:**
- `<div>` used as buttons
- Missing alt text
- Poor color contrast
- Keyboard inaccessible controls
- No focus indicators
- Missing form labels

**See `accessibility-quality.md` for complete WCAG checklist.**

---

## 10. Performance Audit

**Check against performance-quality.md:**

- [ ] Core Web Vitals are good (LCP, INP, CLS)
- [ ] Images are optimized
- [ ] Lazy loading implemented
- [ ] Code splitting used
- [ ] Bundle size is reasonable
- [ ] Caching configured
- [ ] Fonts optimized
- [ ] Third-party scripts minimized

**Red flags:**
- Unoptimized images
- Large JavaScript bundles
- No lazy loading
- Poor Core Web Vitals scores
- No caching strategy
- Too many third-party scripts

**See `performance-quality.md` for detailed performance optimization.**

---

## 11. Documentation Audit

**Check all project context documents:**

- [ ] prd.md is current and accurate
- [ ] architecture.md matches implementation
- [ ] rules.md is followed
- [ ] design.md matches actual design
- [ ] tasks.md is up to date
- [ ] memory.md contains relevant context
- [ ] No secrets in documentation
- [ ] No stale information

**Red flags:**
- Documentation out of sync with code
- Stale decisions
- Missing important context
- Secrets in documentation

---

## Audit Report Template

```markdown
# Project Audit Report

**Date:** [Date]  
**Auditor:** [Name or "AI Agent"]  
**Project:** [Project name]

---

## Executive Summary

[Brief overview of audit findings: overall health, critical issues, recommendations]

---

## Findings by Category

### 1. Product Alignment
**Status:** 🟢 Good / 🟡 Needs Attention / 🔴 Critical Issues

**Findings:**
- ✅ [Positive finding]
- ⚠️ [Issue requiring attention]
- ❌ [Critical issue]

### 2. Architecture Consistency
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 3. Code Quality
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 4. UI/UX Quality
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 5. SEO (if applicable)
**Status:** 🟢 / 🟡 / 🔴 / N/A

**Findings:**
- ...

### 6. Security
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 7. Privacy
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 8. Legal/Compliance
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 9. Accessibility
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 10. Performance
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

### 11. Documentation
**Status:** 🟢 / 🟡 / 🔴

**Findings:**
- ...

---

## Critical Issues (Immediate Action Required)

1. **[Issue]:** [Description]
   - **Impact:** [What's the risk?]
   - **Recommendation:** [How to fix]

---

## High Priority Issues

1. **[Issue]:** [Description]
   - **Impact:**
   - **Recommendation:**

---

## Medium Priority Issues

1. **[Issue]:** [Description]
   - **Impact:**
   - **Recommendation:**

---

## Low Priority Improvements

1. **[Improvement]:** [Description]

---

## Positive Findings

- [What's working well]
- [Good practices observed]

---

## Recommendations

### Immediate Actions
1. [Action 1]
2. [Action 2]

### Short-Term (1-4 weeks)
1. [Action 1]
2. [Action 2]

### Long-Term
1. [Action 1]
2. [Action 2]

---

## Next Audit

**Recommended:** [Date or milestone]
```

---

## Audit Automation

### Automated Tools
- Lighthouse (performance, accessibility, SEO)
- ESLint (code quality)
- npm audit / yarn audit (dependencies)
- axe DevTools (accessibility)
- WAVE (accessibility)

### Manual Review Required
- Product alignment
- Architecture consistency
- Design consistency
- Privacy practices
- Legal compliance
- Security logic
- Business logic

---

**Summary:** Audits identify drift, technical debt, quality issues, and compliance gaps. Run audits regularly, document findings, prioritize issues, and track resolution.

**Remember:** Audits should be constructive, not punitive. The goal is improvement, not perfection.
