# AI Coding Workflow
**Load when:** planning complex work or resolving lifecycle/verification uncertainty; routine tasks use the small core.

Core loop: read context → inspect code → plan → implement → verify → update context. Understand before changing; follow before innovating; document after completing.

## Before Coding

1. Load task-relevant context via the selective-loading map (token-optimization.md). memory.md first; skip docs the task doesn't need.
2. Inspect actual code: target files; related files (imports, types, utilities); similar implemented features; existing tests; build/env/deploy config. Use read, search, grep, file tree — never code against assumptions.
3. Extract: abstractions to reuse, established patterns, naming conventions, error-handling patterns, security boundaries. Flag code smells, debt, and doc/code inconsistencies.
4. Check alignment before planning:

| Check | Questions |
|---|---|
| Product (prd.md) | Aligns with requirements? In scope or scope change? Target user? |
| Technical (architecture.md) | Architecture suitable? Constraints/limitations? Dependencies? |
| Standards (rules.md) | Coding standards? Required security? Accessibility? Privacy implications? |
| Design (design.md) | Patterns/components to reuse? Consistent with visual language? |
| Status (tasks.md, memory.md) | Already started? Related work in progress? Historical context? |

5. For non-trivial work, write a scoped plan:

| Plan field | Content |
|---|---|
| Goal | One clear statement of what must be done |
| Files to change | Each file + what changes |
| New files | Each file + purpose |
| Approach | Ordered steps |
| Considerations | Security, privacy, performance, accessibility |
| Risks | Each risk + mitigation |

Reading method: skim structure → deep-read relevant sections → note unknowns → check for conflicts. Red flags — vague/incomplete docs, docs conflicting with code, undocumented decisions, unclear security/privacy implications — resolve by inspecting code or asking the user before proceeding.

### Task Size

| Size | Read | Plan |
|---|---|---|
| Tiny (1 file, obvious) | Affected file only | None |
| Medium (few files, clear pattern) | memory.md + relevant doc + affected files | Brief outline |
| Large/complex | Relevant context subset + affected code | Scoped plan; clarify only consequential missing decisions |

New to the project? Read the short current memory first; discover only context relevant to the request. Use all six only for an explicit comprehensive onboarding/audit.

## During Implementation

- Make surgical diffs; change only what the task requires.
- Follow existing patterns; reuse existing abstractions — consistency over cleverness, DRY.
- No drive-by refactors, no unrequested features, no new dependencies without demonstrated need.
- Protect secrets and data: validate input, enforce authorization, no hardcoded secrets or environment-specific values. Document that a secret is needed, never its value.
- Accessible by default: semantic HTML, keyboard navigation, ARIA.
- Privacy-conscious: minimize data collection; document third-party sharing.
- Performance-aware: optimize images, lazy load, minimize JavaScript.
- Handle errors appropriately; meaningful names; small focused functions; comments explain why, not what.

## After Implementation

1. Verify changed behavior: run/execute it; check edge cases and graceful error handling.
2. Check regressions in related features; run existing unit/integration/E2E tests if available.
3. Security: input validated, secrets protected, authorization enforced.
4. UI: keyboard and screen-reader accessible, sufficient contrast. Privacy: collection documented, third-party requests justified, consent where required. Performance: images optimized, lazy loading, no unnecessary re-renders.
5. Update context (below), then report result → changes → verification.
6. On failure: diagnose → fix → re-verify. After 2–3 failed attempts, switch approach or ask the user.

### Context Updates

| Doc | When |
|---|---|
| tasks.md | Always after meaningful work — mark complete, add discovered tasks |
| memory.md | Always — decisions, state changes, key files changed, workarounds |
| architecture.md / design.md / rules.md / prd.md | Only if architecture / design patterns / standards / requirements actually changed |

Skip updates for trivial changes, already-documented planned refactors, and bug fixes that add no context. Entry formats:
- tasks.md "Completed Recently": `[x] Feature — date, brief summary`.
- memory.md recent work: date, what was done, key decision, files changed.
- architecture.md decision record: decision, rationale, status.

## Quality Gates (all pass before "done")

- [ ] Works — executed/tested, not merely written
- [ ] Follows rules.md
- [ ] Matches architecture.md and design.md
- [ ] Security considered; privacy, accessibility (UI), performance as applicable
- [ ] No regressions in related features
- [ ] memory.md + tasks.md updated; other docs updated if changed
- [ ] No secrets committed; no unrelated changes

## Quality Signals

- High: follows patterns; reuses abstractions; clear names; proper error handling; secure and accessible by default; documented decisions; current context.
- Low: ignores patterns; duplicates code; unrelated edits; magic numbers/unclear names; missing error handling; vulnerabilities; inaccessible UI; undocumented decisions; stale context.

## Verification Ladder

Code written ≠ runs ≠ tested ≠ verified in the user's actual environment. Claim only the level actually reached; label anything unverified.

## Task Playbooks

| Task | Sequence |
|---|---|
| Feature | prd scope → tasks planned? → architecture fit → design components → rules → implement → verify → update tasks+memory |
| Bugfix | memory known issue? → architecture → inspect code for root cause → rules → fix → verify no regressions → add regression test if possible → update tasks+memory |
| Refactor | memory debt → architecture intent → rules → ensure tests exist first → incremental changes, verify each → update architecture if structure changed → memory |
| Security/privacy | rules → memory → architecture boundaries → prd privacy requirements → implement → security/privacy verification → memory decisions → rules if new patterns |

## Documentation Conflicts

Inspect actual implementation (code is truth for current state) → identify the discrepancy → code correct: update the stale doc; doc correct: ask user before changing code; unclear: ask user → record important resolutions in memory.md.

## Common Mistakes

- Coding before understanding — read context, inspect code, plan first.
- Inventing requirements — check prd.md; ask if unclear.
- Ignoring existing patterns — follow established codebase conventions.
- Modifying unrelated code — stay scoped; no "clean up while here".
- Forgetting context updates — always update tasks.md and memory.md.
- Fabricating features, statistics, or compliance claims — document only what exists or is planned.
- Storing secrets in context docs — document that secrets are needed, never their values.
- Assuming security/privacy is handled elsewhere — validate input, protect data, check permissions.