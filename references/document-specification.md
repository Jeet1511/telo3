# Document Specification
**Load when:** creating, updating, validating, or locating the six project-context documents.

Six documents, non-overlapping responsibilities. The validator (`src/validate.js`) checks required sections by case-insensitive substring match against markdown headings: each required key must appear inside some heading; extra words and any casing are allowed.
Example: heading "## Recently Completed Work" satisfies key "recently completed work"; "## Security Practices" satisfies "security". Run `telo3 validate [dir] [--json] [--strict]` after edits.

## Ownership

| Doc | Single responsibility | Temporal scope |
|---|---|---|
| prd.md | WHAT the product is and WHY it exists | Stable, strategic |
| architecture.md | HOW the system is built | Stable with evolution |
| rules.md | HOW to engineer the project | Stable, principles-based |
| design.md | HOW the product looks and behaves | Stable with refinement |
| tasks.md | WHAT implementation work remains | Dynamic, short-term |
| memory.md | CURRENT STATE and continuity | Dynamic |

Information flows prd → architecture → rules → design → tasks → memory. Reference upstream docs; don't restate them.

## Required Sections and Per-Document Rules

### prd.md
- Required headings: Project Overview; Problem Statement; Target Users; Goals; Functional Requirements; Success Criteria.
- Holds: vision/strategy; users and use cases; functional requirements; goals and success criteria; scope boundaries (goals/non-goals); product decisions and rationale.
- Excludes: implementation (architecture.md); coding standards (rules.md); visual design (design.md); status (tasks.md, memory.md).
- Update when: requirements change/clarify; scope changes; product decisions; success criteria defined/changed; new user insights.
- Avoid: inventing requirements without user input; technical detail; temporary notes (memory.md); duplicating architecture/design.

### architecture.md
- Required headings: Architecture Overview; Technology Stack; Project Structure; Architectural Decisions.
- Holds: stack and dependencies; system structure; data models/relationships; API architecture/conventions; auth flow; external integrations; deployment/infrastructure; decisions and rationale.
- Excludes: requirements (prd.md); coding standards (rules.md); visual design (design.md); task lists (tasks.md); temporary notes (memory.md).
- Update when: stack changes; new external services; significant schema changes; API changes; deployment changes; major refactoring; architectural decisions.
- Avoid: documenting what should exist instead of what does; implementation TODOs (tasks.md); duplicating package-file dependency lists (reference them); coding standards (rules.md).

### rules.md
- Required headings: Core Principles; Security; Testing; Validation.
- Holds: coding standards/conventions; file organization; security practices; privacy guidelines; testing requirements; git practices; performance guidelines; accessibility standards; compliance awareness; refactoring principles.
- Excludes: requirements (prd.md); architecture (architecture.md); visual design (design.md); tasks (tasks.md); current violations/debt (memory.md).
- Update when: standards established/changed; security practices evolve; new compliance considerations; team quality agreements; accessibility/performance standards change.
- Avoid: rules nobody follows; over-prescription blocking judgment; duplicating conventions documented elsewhere; implementation-specific notes.

### design.md
- Required headings: Design Philosophy; Colors; Typography; Components; Accessibility.
- Holds: philosophy/principles; color system; typography; spacing/layout; component specs; interaction patterns; accessibility guidelines; responsive behavior; animation/motion; anti-patterns.
- Excludes: features (prd.md); implementation (architecture.md); code organization (rules.md); design tasks (tasks.md); current inconsistencies (memory.md).
- Update when: brand changes; components standardized; tokens modified; accessibility requirements change; breakpoints change; new anti-patterns identified.
- Avoid: every component variant; implementation code (reference components); one-off designs; style guide without UX guidance.

### tasks.md
- Required headings: Current Sprint; Backlog; Completed Recently.
- Holds: feature backlog; bug list; technical debt; implementation phases; work in progress; recently completed work; blocked tasks.
- Excludes: requirements (prd.md); architecture (architecture.md); standards (rules.md); design system (design.md); decisions/context (memory.md).
- Update when: meaningful work completed; backlog additions; reprioritization; bugs found/fixed; debt identified/addressed.
- Avoid: tracking every tiny change; keeping completed tasks forever (archive); decision rationale (memory.md); duplicating an external bug tracker.

### memory.md
- Required headings: Current State; Recently Completed Work; Important Decisions; Known Issues.
- Holds: current status; recent work summaries; decisions that must persist; known bugs/limitations; temporary workarounds; debt context; discoveries; pending questions; project preferences; security/privacy/compliance considerations.
- Excludes: stable requirements/architecture/rules/design (their docs); detailed task breakdowns (tasks.md); conversation transcripts; secrets/credentials.
- Update when: significant work done; important decisions; workarounds introduced; bugs/limitations discovered; architecture changes in progress; important context emerges.
- Avoid: conversation-log format; stable info belonging elsewhere; secrets/sensitive data; outdated entries kept indefinitely; long prose — keep concise and scannable.

## Global Anti-Patterns

- memory.md is NOT a conversation transcript.
- No duplication across docs: choose the primary home by responsibility and reference it; brief context summaries are acceptable (architecture.md owns "database is PostgreSQL"; rules.md says "see architecture.md; all queries parameterized").
- No secrets or credentials in any context doc — record that a secret is needed, never its value.
- Mark unknowns as [UNKNOWN] or [TODO: clarify]; never invent requirements or facts.

## Location

All six files share one location; any of:
- `project-context/` — dedicated directory.
- `docs/project-context/` — inside general docs.
- Project root — simple projects.

Existing docs: don't replace unnecessarily; complement with structure; consolidate only for clear benefit. Reference them, e.g.:

```
## Additional Documentation
- API docs: /docs/api/README.md
- Schema: /docs/schema.md
- Deploy guide: DEPLOY.md
```

## Templates and Lifecycle

- Templates are lean starting skeletons (~50–80 lines), not 400-line questionnaires. Grow sections only as the project needs.
- Create: start from template → inspect actual implementation → fill known information → mark unknowns → never invent.
- Maintain: update after meaningful changes; keep current; remove stale info; archive history when appropriate; keep docs synchronized with code.
- Archive: completed tasks → "Completed Recently" or remove; superseded decisions → historical section or status note; remove workarounds once fixed; keep what explains current state.

## Update Cadence

| Doc | Typical frequency |
|---|---|
| prd.md | Quarterly or when requirements change |
| architecture.md | When architecture changes |
| rules.md | When standards evolve |
| design.md | When design patterns change |
| tasks.md | Weekly or after significant work |
| memory.md | After important work or decisions |

## Cross-References and Quality

- Cross-reference when needed: prd↔architecture (constraints/requirements); rules→architecture (tech-specific standards); design→rules (accessibility); tasks→any doc; memory→any doc.
- Each doc must be: clear, current (matches code), concise, complete for its responsibility, consistent with other docs, actionable.
- Common failures:
  - Stale info — doc says X, code does Y.
  - Missing info — key decisions undocumented.
  - Duplicated info — same content in multiple docs.
  - Wrong doc — info outside its responsibility.
  - Too detailed — every implementation detail captured.
  - Too vague — no useful guidance.
- System works when: agents understand the project before coding; newcomers can onboard from docs; decisions persist; architectural drift and design inconsistency are prevented; context is never lost; docs stay synchronized with code.