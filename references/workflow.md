# AI Coding Workflow

> Detailed workflow for AI agents working with the project context system.

---

## Core Workflow: Read → Plan → Code → Update

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUEST RECEIVED                     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 1: READ PROJECT CONTEXT                                │
│  • prd.md → Requirements                                     │
│  • architecture.md → System structure                        │
│  • rules.md → Engineering standards                          │
│  • design.md → Visual patterns                               │
│  • tasks.md → Planned work                                   │
│  • memory.md → Current state                                 │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 2: INSPECT ACTUAL CODE                                 │
│  • Affected files and surrounding context                    │
│  • Existing patterns and abstractions                        │
│  • Related components                                        │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 3: ANALYZE & PLAN                                      │
│  • What is the goal?                                         │
│  • Which files need to change?                               │
│  • What are the implications?                                │
│  • Does this align with architecture?                        │
│  • Does this follow rules?                                   │
│  • Does this match design?                                   │
│  • Security/privacy/performance/legal concerns?              │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 4: IMPLEMENT                                           │
│  • Follow existing patterns                                  │
│  • Reuse existing abstractions                               │
│  • Stay scoped (no unrelated changes)                        │
│  • Maintain security, privacy, accessibility                 │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 5: VERIFY                                              │
│  • Does it work?                                             │
│  • Are there regressions?                                    │
│  • Do tests pass?                                            │
└──────────────────────┬───────────────────────────────────────┘
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 6: UPDATE PROJECT CONTEXT                              │
│  • tasks.md → Mark complete, add new tasks                   │
│  • memory.md → Document decisions, state changes             │
│  • Other docs → If architecture/rules/design changed         │
└───────────────────────────────────────────────────────────────┘
```

---

## Step 1: Read Project Context

### What to Read

| Scenario | Read |
|----------|------|
| **New to project** | All six documents |
| **Adding feature** | prd.md, architecture.md, design.md, tasks.md, memory.md |
| **Fixing bug** | architecture.md, rules.md, memory.md, tasks.md |
| **Refactoring** | architecture.md, rules.md, memory.md |
| **UI work** | design.md, architecture.md, rules.md, memory.md |
| **Security/privacy** | rules.md, memory.md, architecture.md, prd.md |

### How to Read

1. **Skim first** to understand structure
2. **Deep read** relevant sections
3. **Note unknowns** — what's unclear or missing?
4. **Check for conflicts** — does documentation match your understanding?

### Red Flags

- 🚩 Documentation is vague or incomplete
- 🚩 Documentation conflicts with code
- 🚩 Important decisions are not documented
- 🚩 Security/privacy implications are unclear

**Action:** Ask user or inspect code to clarify before proceeding.

---

## Step 2: Inspect Actual Code

### What to Inspect

1. **Target files** — Files that need to change
2. **Related files** — Components, utilities, types used by target files
3. **Pattern examples** — Similar features already implemented
4. **Tests** — Existing test patterns
5. **Configuration** — Build, environment, deployment configs

### Inspection Tools

- **Read files** — Understand current implementation
- **Search codebase** — Find patterns, similar features
- **Grep** — Find usage of functions, components, patterns
- **File tree** — Understand organization

### What to Look For

- ✅ Existing abstractions to reuse
- ✅ Established patterns to follow
- ✅ Naming conventions in use
- ✅ Error handling patterns
- ✅ Security boundaries
- ⚠️ Code smells or technical debt
- ⚠️ Inconsistencies with documentation

---

## Step 3: Analyze & Plan

### Key Questions

#### Product Alignment
- Does this request align with documented requirements? (prd.md)
- Is this in scope or a scope change?
- Who is the target user for this feature?

#### Technical Feasibility
- Is the current architecture suitable for this? (architecture.md)
- Are there technical constraints or limitations?
- What are the dependencies?

#### Engineering Standards
- What coding standards apply? (rules.md)
- What security measures are required?
- What accessibility requirements exist?
- What privacy implications exist?

#### Design Consistency
- What design patterns apply? (design.md)
- What components should be reused?
- Is this consistent with visual language?

#### Implementation Status
- Has this been started? (tasks.md)
- Are there related tasks in progress?
- Is there historical context? (memory.md)

### Planning Template

```
GOAL: [Clear statement of what needs to be done]

FILES TO CHANGE:
- [file1]: [what changes]
- [file2]: [what changes]

NEW FILES NEEDED:
- [file1]: [purpose]

APPROACH:
1. [Step 1]
2. [Step 2]
3. [Step 3]

CONSIDERATIONS:
- Security: [concerns]
- Privacy: [concerns]
- Performance: [concerns]
- Accessibility: [concerns]

RISKS:
- [Risk 1]: [mitigation]
```

---

## Step 4: Implement

### Implementation Principles

1. **Follow existing patterns** — Consistency over cleverness
2. **Reuse abstractions** — DRY (Don't Repeat Yourself)
3. **Stay scoped** — Change only what's necessary
4. **No surprises** — Follow documented architecture and rules
5. **Security first** — Validate input, protect secrets, check authorization
6. **Accessible by default** — Semantic HTML, keyboard navigation, ARIA
7. **Privacy-conscious** — Minimize data collection, document third-party sharing
8. **Performance-aware** — Optimize images, lazy load, minimize JavaScript

### Implementation Checklist

#### Before Writing Code
- [ ] I've read relevant project context
- [ ] I've inspected existing code
- [ ] I understand the goal
- [ ] I have a clear plan

#### While Writing Code
- [ ] Following existing patterns
- [ ] Reusing existing abstractions
- [ ] Not modifying unrelated code
- [ ] Validating user input
- [ ] Handling errors appropriately
- [ ] Adding accessibility attributes
- [ ] Optimizing for performance
- [ ] Protecting sensitive data
- [ ] Following design system

#### Code Quality
- [ ] Meaningful variable/function names
- [ ] Small, focused functions
- [ ] Appropriate comments (why, not what)
- [ ] No hardcoded secrets
- [ ] No hardcoded environment-specific values

---

## Step 5: Verify

### Verification Steps

1. **Functional verification**
   - Does it work as intended?
   - Does it handle edge cases?
   - Does it handle errors gracefully?

2. **Regression check**
   - Did I break existing functionality?
   - Do related features still work?

3. **Run tests** (if available)
   - Do unit tests pass?
   - Do integration tests pass?
   - Do E2E tests pass?

4. **Security check**
   - Is user input validated?
   - Are secrets protected?
   - Is authorization enforced?

5. **Accessibility check**
   - Is it keyboard accessible?
   - Does it work with screen readers?
   - Is color contrast sufficient?

6. **Privacy check**
   - Is data collection documented?
   - Are third-party requests justified?
   - Is consent obtained where required?

7. **Performance check**
   - Are images optimized?
   - Is lazy loading implemented?
   - Are there unnecessary re-renders?

### When Verification Fails

1. **Diagnose** the issue
2. **Fix** the problem
3. **Re-verify** thoroughly
4. **If stuck** after 2-3 attempts, try a different approach or ask user

---

## Step 6: Update Project Context

### When to Update

✅ **Always update:**
- tasks.md — Mark completed work
- memory.md — Document important decisions

✅ **Update if changed:**
- architecture.md — If architecture changed
- rules.md — If engineering standards changed
- design.md — If design patterns changed
- prd.md — If requirements changed

❌ **Don't update for:**
- Trivial changes
- Planned refactoring (already documented)
- Bug fixes that don't add context

### What to Update

#### tasks.md
```markdown
## Recently Completed
- [x] **Feature name** — Completed [Date]
  - Brief summary of what was implemented
```

#### memory.md
```markdown
## Recent Work
- **[Date]:** Implemented [feature]
  - Details: [Brief description]
  - Decision: [Important decision made]
  - Files changed: [Key files]
```

#### architecture.md (if architecture changed)
```markdown
## Architectural Decisions
### [Date]: [Decision Title]
**Decision:** [What changed]
**Rationale:** [Why]
**Status:** Accepted
```

---

## Special Workflows

### Workflow: Adding a New Feature

1. **Check prd.md** — Is this in scope?
2. **Check tasks.md** — Is it already planned?
3. **Read architecture.md** — How does it fit?
4. **Read design.md** — What components/patterns apply?
5. **Read rules.md** — What standards apply?
6. **Implement** following existing patterns
7. **Verify** functionality and quality
8. **Update tasks.md** and **memory.md**

### Workflow: Fixing a Bug

1. **Check memory.md** — Is this a known bug?
2. **Read architecture.md** — Understand the system
3. **Inspect code** — Find the root cause
4. **Read rules.md** — Follow standards for the fix
5. **Implement** the fix
6. **Verify** the fix doesn't cause regressions
7. **Add tests** (if possible) to prevent regression
8. **Update tasks.md** (remove from bug list) and **memory.md**

### Workflow: Refactoring Code

1. **Check memory.md** — Are there known issues or technical debt?
2. **Read architecture.md** — Understand the intended structure
3. **Read rules.md** — Follow refactoring guidelines
4. **Ensure tests exist** before refactoring
5. **Refactor incrementally** — Small changes
6. **Verify after each change** — Tests still pass
7. **Update architecture.md** if structure changed significantly
8. **Update memory.md** — Document technical debt addressed

### Workflow: Security/Privacy Changes

1. **Read rules.md** — Security and privacy guidelines
2. **Read memory.md** — Existing security/privacy context
3. **Read architecture.md** — Security boundaries
4. **Read prd.md** — Privacy requirements
5. **Implement** with security/privacy best practices
6. **Verify** — Security check, privacy check
7. **Update memory.md** — Document security/privacy decisions
8. **Update rules.md** if new security patterns established

### Workflow: Handling Documentation Conflicts

**When documentation and code disagree:**

1. **Inspect actual implementation** — Code is truth for current state
2. **Identify discrepancy** — What's different and why?
3. **Determine which is correct:**
   - If code is correct → Update documentation
   - If documentation is correct → Ask user before changing code
   - If neither is clear → Ask user
4. **Update** the incorrect source
5. **Document in memory.md** if it's an important change

---

## Quality Gates

### Before Marking Work Complete

- [ ] Functionality verified
- [ ] No regressions
- [ ] Tests pass (if applicable)
- [ ] Security checked
- [ ] Privacy checked
- [ ] Accessibility checked (if UI change)
- [ ] Performance checked (if applicable)
- [ ] Project context updated
- [ ] No secrets committed
- [ ] No unrelated changes

### Signs of High-Quality Work

✅ Follows existing patterns  
✅ Reuses existing abstractions  
✅ Clear, meaningful names  
✅ Appropriate error handling  
✅ Secure by default  
✅ Accessible by default  
✅ Well-documented decisions  
✅ Updated project context  

### Signs of Low-Quality Work

❌ Ignores existing patterns  
❌ Duplicates existing code  
❌ Modifies unrelated code  
❌ Magic numbers and unclear names  
❌ Missing error handling  
❌ Security vulnerabilities  
❌ Inaccessible UI  
❌ Undocumented decisions  
❌ Stale project context  

---

## Common Mistakes to Avoid

### 1. Coding Before Understanding
❌ **Wrong:** Jump directly to writing code  
✅ **Right:** Read context → Inspect code → Plan → Code

### 2. Inventing Requirements
❌ **Wrong:** Assume what the user wants  
✅ **Right:** Check prd.md, ask if unclear

### 3. Ignoring Existing Patterns
❌ **Wrong:** Implement a feature your own way  
✅ **Right:** Follow established patterns from codebase

### 4. Modifying Unrelated Code
❌ **Wrong:** Refactor unrelated code "while you're there"  
✅ **Right:** Stay scoped to the current task

### 5. Forgetting to Update Context
❌ **Wrong:** Complete work without updating docs  
✅ **Right:** Always update tasks.md and memory.md

### 6. Fabricating Information
❌ **Wrong:** Invent features, statistics, or compliance claims  
✅ **Right:** Document only what exists or is planned

### 7. Storing Secrets
❌ **Wrong:** Add API keys to project context  
✅ **Right:** Document that secrets are needed, not the secrets themselves

### 8. Ignoring Security/Privacy
❌ **Wrong:** Assume it's handled elsewhere  
✅ **Right:** Proactively validate input, protect data, check permissions

---

## Summary

**The workflow is simple:**

1. **Read** project context
2. **Inspect** actual code
3. **Plan** the implementation
4. **Code** following patterns and standards
5. **Verify** quality and correctness
6. **Update** project context

**The goal is simple:**

**Understand before changing. Follow before innovating. Document after completing.**

This workflow transforms AI agents from code generators into effective engineering partners.
