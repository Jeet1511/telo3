---
name: telo3-quick-reference
version: 5.0.4
description: 30-second quick reference guide for AI assistants
author: Jeet (@jeet1511)
license: MIT
repository: https://github.com/Jeet1511/telo3
---

# AI Context — Quick Reference

> **Ultra-concise project context for AI agents. Read this FIRST (30 seconds).**

---

## What This Is

**Project Context System** = 6 documents + quality frameworks for systematic AI coding.

Prevents: vibe coding, architectural drift, forgotten decisions, security mistakes.

---

## Core Documents (Read Selectively)

| File | When to Read | Time |
|------|--------------|------|
| **memory.md** | ALWAYS (current state) | 30s |
| **prd.md** | Changing requirements | 2min |
| **architecture.md** | Adding features, structure changes | 3min |
| **rules.md** | Unsure about standards | 2min |
| **design.md** | Building UI | 2min |
| **tasks.md** | Planning work | 1min |

**Default:** Read memory.md only. Load others if relevant.

---

## Quick Decision Framework

```
Tiny task (< 5min)?
    → Read affected file only → Code → Update memory.md

Medium task (5-15min)?
    → Read memory.md + relevant doc → Code → Update 2 docs

Large task (15min+)?
    → Read context subset → Plan → Code → Update all affected
```

---

## Critical Rules

### Security (Non-Negotiable)
- Validate ALL user input
- Check authorization on EVERY request
- Never commit secrets
- Hash passwords (bcrypt/argon2)
- Filter queries by teamId/userId (if multi-tenant)

### Privacy (Required)
- Document data collection
- Self-host fonts (no Google Fonts by default)
- No invasive tracking without disclosure
- Support data deletion

### Legal (Awareness)
- Age restrictions if children can use service
- Unsubscribe for marketing emails
- Clear subscription terms
- DMCA agent for user content (U.S.)
- **This is engineering guidance, not legal advice**

### Quality (Standards)
- Follow existing patterns (inspect before creating)
- Reuse components (don't duplicate)
- Accessible by default (semantic HTML, ARIA, contrast)
- Responsive (mobile-first)

---

## Token Optimization

### Read Minimum
- memory.md (always)
- Affected files only
- Skip unrelated code

### Skip Unnecessary
- Don't test if not requested
- Don't verify unchanged code
- Don't inspect unrelated files
- Don't re-read files from this conversation

### Communicate Concisely
**Normal mode:** Brief, clear updates
**Caveman mode:** Ultra-short, no fluff

---

## Smart Delegation

**Before implementing, check:**
- Does skill exist for this? (check your AI's skills directory)
- Is there MCP tool? (figma, context7, stripe, etc.)
- Would sub-agent do better? (if your AI supports delegation)

**Use specialized tools for specialized tasks.**

---

## Update Pattern

**After EVERY meaningful change:**

✅ Update **memory.md** (current state, decisions)
✅ Update **tasks.md** (mark complete, add new)
✅ Update other docs ONLY if they changed

❌ Don't update unrelated docs
❌ Don't duplicate info across docs
❌ Don't turn memory.md into conversation log

---

## Quality Checks (Mental)

Before marking complete:
- [ ] Follows existing patterns?
- [ ] Security considered?
- [ ] Accessible (if UI)?
- [ ] Documentation updated?
- [ ] No secrets committed?

---

## Caveman Mode

**User says:** "caveman mode" or "be concise"

**You respond:**
```
Caveman mode ON.
Short responses.
Ready.
```

**Format:**
- Short sentences
- No fluff
- Facts only
- Action → Result → Done

---

## Response Templates

### Standard Update
```
Task: [X]

Changed:
- file.ts (added Y)
- file2.ts (updated Z)

Updated:
- memory.md
- tasks.md

Done.
```

### Caveman Update
```
Done.

Changed:
- file.ts (Y)
- file2.ts (Z)

Docs current.
```

### Bug Fix
```
Fixed [issue].

Root cause: [X]
Changed: [file:line]
Verified: Works now.
```

---

## When to Ask User

**Ask when:**
- Requirements unclear
- Multiple valid approaches
- Breaking change needed
- Security/privacy decision
- Scope change

**Don't ask when:**
- Obvious implementation
- Following existing pattern
- Standard practice
- Documented in context

---

## Common Patterns (Auto-Apply)

| User Request | Auto Action |
|--------------|-------------|
| "Fix typo" | Fix → No test → Update memory.md |
| "Change color" | Check design.md → Update → Done |
| "Add form field" | Add with validation → Test if critical |
| "Update docs" | Update → No code verification |
| "Refactor" | Read code → Plan → Confirm → Refactor |

---

## Reference Docs (Load as Needed)

**Quality frameworks in `references/`:**
- `ui-quality.md` — Anti-vibe-coding
- `seo-quality.md` — SEO audit
- `accessibility-quality.md` — WCAG standards
- `performance-quality.md` — Core Web Vitals
- `security-quality.md` — Security audit
- `privacy-compliance.md` — Privacy guidelines
- `legal-compliance.md` — Compliance awareness
- `token-optimization.md` — Efficiency rules
- `smart-skill-delegation.md` — Use other tools

**Load only when doing that type of work.**

---

## Skill Location

This skill: Anywhere you cloned Telo3 (universal)

Main instruction: `SKILL.md`
Templates: `templates/`
References: `references/`
Scripts: `scripts/`

---

## Summary (10 seconds)

1. **Read memory.md first** (30s)
2. **Load relevant context only**
3. **Follow existing patterns**
4. **Code with security/privacy/quality**
5. **Update memory.md + tasks.md**
6. **Communicate concisely**
7. **Use specialized tools when better**

**Goal:** Systematic engineering. Minimal tokens. Maximum quality.

---

**Now check memory.md for current project state.**

---

**Telo3 by [Jeet](https://github.com/Jeet1511)** | [Full Docs](https://github.com/Jeet1511/telo3) | [Contribute](https://github.com/Jeet1511/telo3/blob/main/CONTRIBUTING.md)
