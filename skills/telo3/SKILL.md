---
name: telo3
version: 5.0.5
description: AI development framework with project-context system, quality frameworks, and systematic engineering practices
author: Jeet (@jeet1511)
license: MIT
repository: https://github.com/Jeet1511/telo3
---

# Telo3 — AI Development Skill

**Version:** 5.0.5  
**Purpose:** Make AI coding agents understand, build, maintain, audit, secure, optimize, and document software projects systematically instead of "vibe coding."  
**Created by:** [Jeet (@Jeet1511)](https://github.com/Jeet1511)  
**Repository:** https://github.com/Jeet1511/telo3

---

## Core Principle

**Understand the project BEFORE making meaningful changes.**

This skill system provides AI agents with persistent project memory, engineering rules, quality standards, and governance frameworks to prevent:

- AI hallucination
- Vibe coding and architectural drift
- Inconsistent UI and random technology choices
- Accidental breaking changes
- Security, privacy, and compliance oversights
- Forgotten decisions and stale context
- Unnecessary rewrites and duplicated features

---

## When to Activate

Activate this skill when:

- Starting work on a new project
- Onboarding to an existing project
- Auditing project quality
- Synchronizing documentation with implementation
- The project contains `project-context/` or similar context files (any location works)

## Quick Start (30 seconds)

**Read in this order:**

1. `AI-CONTEXT.md` — 30-second overview (you're reading it now)
2. `project-context/prd.md` — What & why
3. `project-context/architecture.md` — How it's built
4. `project-context/memory.md` — Recent context

Then proceed with coding systematically.

---

## The 6-Document Context System

| Document | Purpose | When to Read | When to Update |
|----------|---------|--------------|----------------|
| **prd.md** | WHAT & WHY — Requirements, vision, users | Always first | When requirements change |
| **architecture.md** | HOW it's built — Tech stack, structure | Before changing structure | When architecture changes |
| **rules.md** | HOW to code — Standards, security, testing | Before coding | When standards evolve |
| **design.md** | WHAT it looks like — UI/UX, brand, components | Before UI work | When design system changes |
| **tasks.md** | WHAT to do — Current sprint, backlog, done | Daily | When tasks change |
| **memory.md** | CURRENT STATE — Recent work, decisions, continuity | Every session | After significant changes |

**Location:** `project-context/` or `docs/project-context/` or project root (flexible)

---

## Quality Frameworks (11 Dimensions)

Before implementing features, check relevant frameworks:

| Framework | What It Covers | Reference File |
|-----------|----------------|----------------|
| **Security** | OWASP, auth, validation, secrets | `references/security-quality.md` |
| **Privacy** | GDPR, COPPA, data collection, tracking | `references/privacy-compliance.md` |
| **Legal** | CAN-SPAM, DMCA, age restrictions, terms | `references/legal-compliance.md` |
| **Accessibility** | WCAG 2.1 AA, screen readers, keyboard nav | `references/accessibility-quality.md` |
| **SEO** | Meta tags, semantic markup, sitemaps, Core Web Vitals | `references/seo-quality.md` |
| **Performance** | LCP, INP, CLS, image optimization | `references/performance-quality.md` |
| **UI Quality** | Anti-vibe-coding, design consistency | `references/ui-quality.md` |
| **Token Efficiency** | Selective loading, caveman mode | `references/token-optimization.md` |
| **Smart Delegation** | MCP integration, skill discovery | `references/smart-skill-delegation.md` |
| **Documentation** | Systematic specifications | `references/document-specification.md` |
| **Workflow** | AI behavior patterns | `references/workflow.md` |

---

## Token Optimization (80% Savings)

### Selective Context Loading

**Don't read everything.** Load documents based on task:

| Task Type | Read These |
|-----------|------------|
| **New feature** | prd.md, architecture.md, rules.md, tasks.md |
| **Bug fix** | memory.md, architecture.md, rules.md |
| **UI change** | design.md, rules.md, ui-quality.md |
| **Security audit** | security-quality.md, privacy-compliance.md, legal-compliance.md |
| **Onboarding** | AI-CONTEXT.md → prd.md → architecture.md |

### Caveman Mode (Ultra-Concise Communication)

**Status updates:** `✅ Task done` not "I have successfully completed..."  
**Questions:** `DB choice: Postgres vs MongoDB?` not verbose explanations  
**Changes:** Update `memory.md` silently, announce only major changes  

**Token savings: 80%**

---

## Smart Skill Delegation

**Before implementing, check:**
- Does skill exist for this? (check your AI's skills directory)
- Is there MCP tool? (figma, context7, stripe, etc.)
- Would sub-agent do better? (if your AI supports delegation)

**Common delegations:**
- UI/Design → figma skill
- Payments → stripe MCP
- Auth → authentication skills
- API docs → openapi tools
- Testing → testing frameworks

See `references/smart-skill-delegation.md` for complete guide.

---

## Anti-Vibe-Coding Framework

**What is vibe coding?**  
Generic AI aesthetics: purple/black themes, excessive gradients, arbitrary shadows, decorative-only UI, fake statistics, random tech choices.

**Telo3 prevents this:**

❌ **Don't:**
- Use generic "AI aesthetics" (purple/black, harsh gradients)
- Make arbitrary design choices
- Ignore existing design system
- Create fake data/testimonials
- Add features not in prd.md
- Change architecture without updating docs

✅ **Do:**
- Follow design.md system
- Reuse existing components
- Match brand guidelines
- Use real data or clearly labeled placeholders
- Check prd.md before adding features
- Update architecture.md when structure changes

See `references/ui-quality.md` for complete guidelines.

---

## Workflow Patterns

### 1. Session Start

```
1. Read AI-CONTEXT.md (this file)
2. Read project-context/memory.md (recent context)
3. Read project-context/prd.md (current goals)
4. Review project-context/tasks.md (current work)
5. Proceed with development
```

### 2. Before Coding

```
1. Check project-context/rules.md (standards)
2. Check project-context/architecture.md (patterns)
3. Check project-context/design.md (if UI work)
4. Check relevant quality frameworks
5. Code following established patterns
```

### 3. After Significant Changes

```
1. Update project-context/memory.md (decisions made)
2. Update project-context/architecture.md (if structure changed)
3. Update project-context/tasks.md (mark tasks done)
4. Run validation (if available)
```

### 4. Quality Checks

**Before marking work complete:**

- ✅ Follows rules.md standards
- ✅ Matches architecture.md patterns
- ✅ Follows design.md (if UI)
- ✅ Security framework checked
- ✅ Accessibility verified (if public-facing)
- ✅ Performance acceptable
- ✅ Documentation updated

---

## Installation & Setup

### For Developers

**Install Telo3:**
```bash
# Via npm
npm install -g telo3-ai

# Via skillpm
npx skillpm install telo3-ai

# Via git
git clone https://github.com/Jeet1511/telo3.git ~/telo3
```

**Initialize project context:**
```bash
cd your-project
telo3 init
# Or: ~/telo3/scripts/init-project-context.sh
```

**Activate with AI:**
```
Use Telo3 from ~/telo3/ - Read AI-CONTEXT.md first
```

### For AI Agents

**Auto-detection files:**
- `.cursorrules` — Cursor IDE
- `.windsurfrules` — Windsurf IDE
- `skill.json` — Universal skill manifest
- `.github/skill-registry.json` — Platform registry

**Manual activation:**
```
Use Telo3 systematic engineering framework.
Read ~/telo3/AI-CONTEXT.md for quick start.
Follow project-context/ documents before making changes.
```

---

## Repository Structure

```
telo3/
├── skills/                      # skillpm-compatible skills
│   ├── telo3/                  # Main framework skill
│   ├── telo3-onboarding/       # Smart onboarding
│   └── telo3-quick-reference/  # Quick reference
├── templates/                   # 6-document templates
│   ├── prd.md
│   ├── architecture.md
│   ├── rules.md
│   ├── design.md
│   ├── tasks.md
│   └── memory.md
├── references/                  # Quality frameworks
│   ├── security-quality.md
│   ├── privacy-compliance.md
│   ├── legal-compliance.md
│   ├── accessibility-quality.md
│   ├── seo-quality.md
│   ├── performance-quality.md
│   ├── ui-quality.md
│   ├── token-optimization.md
│   ├── smart-skill-delegation.md
│   ├── document-specification.md
│   ├── workflow.md
│   ├── ai-behavior.md
│   └── project-audit.md
├── scripts/
│   ├── init-project-context.sh
│   └── validate-project-context.sh
├── examples/
│   └── example-project/        # Complete example
├── SKILL.md                     # This file
├── AI-CONTEXT.md               # Quick reference
├── ONBOARDING-SKILL.md         # Smart onboarding system
└── README.md                    # Full documentation
```

---

## Links

- **GitHub:** https://github.com/Jeet1511/telo3
- **npm:** https://www.npmjs.com/package/telo3-ai
- **skillpm:** Auto-indexed from npm
- **Author:** [Jeet (@jeet1511)](https://github.com/jeet1511)
- **License:** MIT

---

## Support & Contributing

- **Issues:** https://github.com/Jeet1511/telo3/issues
- **Discussions:** https://github.com/Jeet1511/telo3/discussions
- **Contributing:** See CONTRIBUTING.md
- **Changelog:** See CHANGELOG.md

---

**Version:** 5.0.5  
**Created by:** [Jeet (@jeet1511)](https://github.com/jeet1511)  
**License:** MIT
