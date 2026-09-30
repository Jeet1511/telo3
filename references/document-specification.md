# Document Specification

> Detailed specifications for each of the six core project context documents.

---

## Overview

The project context system uses six distinct documents with non-overlapping responsibilities:

| Document | Focus | Temporal Scope |
|----------|-------|----------------|
| **prd.md** | Requirements & Product | Stable, strategic |
| **architecture.md** | Technical Structure | Stable with evolution |
| **rules.md** | Engineering Standards | Stable, principles-based |
| **design.md** | Visual & UX Patterns | Stable with refinement |
| **tasks.md** | Implementation Work | Dynamic, short-term |
| **memory.md** | Current State & Context | Dynamic, continuity |

---

## prd.md — Product Requirements Document

### Purpose
Define **WHAT** the product is and **WHY** it exists.

### Responsibilities
- Product vision and strategy
- Target users and use cases
- Functional requirements
- Goals and success criteria
- Scope boundaries (goals and non-goals)
- Product decisions and rationale

### What NOT to Include
- ❌ How the system is implemented (that's architecture.md)
- ❌ Coding standards (that's rules.md)
- ❌ Visual design (that's design.md)
- ❌ Current implementation status (that's tasks.md and memory.md)

### When to Update
- Requirements change or are clarified
- Scope changes (new goals or non-goals)
- Important product decisions are made
- Success criteria are defined or changed
- New user insights emerge

### Anti-Patterns
- Inventing requirements without user input
- Documenting technical implementation details
- Including temporary notes that belong in memory.md
- Duplicating architecture or design information

---

## architecture.md — Architecture Documentation

### Purpose
Define **HOW** the system works technically.

### Responsibilities
- Technology stack and dependencies
- System structure and organization
- Data models and relationships
- API architecture and conventions
- Authentication and authorization flow
- External service integrations
- Deployment and infrastructure
- Architectural decisions and rationale

### What NOT to Include
- ❌ Product requirements (that's prd.md)
- ❌ Coding standards (that's rules.md)
- ❌ Visual design system (that's design.md)
- ❌ Implementation task list (that's tasks.md)
- ❌ Temporary implementation notes (that's memory.md)

### When to Update
- Technology stack changes
- New external services are integrated
- Database schema changes significantly
- API structure changes
- Deployment process changes
- Major architectural refactoring occurs
- Architectural decisions are made

### Anti-Patterns
- Documenting what should exist rather than what does exist
- Including implementation TODOs (use tasks.md)
- Duplicating dependency lists from package files (reference them instead)
- Documenting coding standards (use rules.md)

---

## rules.md — Engineering Rules

### Purpose
Define **HOW** the project must be engineered.

### Responsibilities
- Coding standards and conventions
- File organization patterns
- Security practices
- Privacy guidelines
- Testing requirements
- Git and version control practices
- Performance guidelines
- Accessibility standards
- Compliance awareness
- Refactoring principles

### What NOT to Include
- ❌ Product requirements (that's prd.md)
- ❌ System architecture (that's architecture.md)
- ❌ Visual design standards (that's design.md)
- ❌ Specific implementation tasks (that's tasks.md)
- ❌ Current violations or technical debt (that's memory.md)

### When to Update
- Engineering standards are established or changed
- Security practices evolve
- New compliance considerations are identified
- Team agreements about code quality are made
- Accessibility or performance standards change

### Anti-Patterns
- Writing rules that are not actually followed
- Creating overly prescriptive rules that prevent good judgment
- Duplicating technology-specific conventions that are documented elsewhere
- Including implementation-specific notes

---

## design.md — Design System

### Purpose
Define **HOW** the product looks and behaves.

### Responsibilities
- Design philosophy and principles
- Color system
- Typography
- Spacing and layout
- Component specifications
- Interaction patterns
- Accessibility guidelines
- Responsive behavior
- Animation and motion
- Anti-patterns to avoid

### What NOT to Include
- ❌ Product features (that's prd.md)
- ❌ Technical implementation (that's architecture.md)
- ❌ Code organization (that's rules.md)
- ❌ Design tasks (that's tasks.md)
- ❌ Current design inconsistencies (that's memory.md)

### When to Update
- Brand identity changes
- New components are standardized
- Design tokens are modified
- Accessibility requirements change
- Responsive breakpoints change
- Design anti-patterns are identified

### Anti-Patterns
- Documenting every possible component variant
- Including implementation code (reference components instead)
- Documenting one-off designs that aren't patterns
- Making it a visual style guide without UX guidance

---

## tasks.md — Tasks & Implementation Backlog

### Purpose
Track **WHAT** implementation work remains.

### Responsibilities
- Feature backlog
- Bug list
- Technical debt tracking
- Implementation phases
- Active work in progress
- Recently completed work
- Blocked tasks

### What NOT to Include
- ❌ Product requirements (that's prd.md)
- ❌ Architectural design (that's architecture.md)
- ❌ Coding standards (that's rules.md)
- ❌ Design system (that's design.md)
- ❌ Decisions and context (that's memory.md)

### When to Update
- After completing meaningful work
- When adding new features to the backlog
- When prioritization changes
- When bugs are discovered or fixed
- When technical debt is identified or addressed

### Anti-Patterns
- Tracking every tiny code change
- Keeping completed tasks indefinitely (archive them)
- Including decision rationale (use memory.md)
- Duplicating bug tracker content

---

## memory.md — Project Memory

### Purpose
Track **CURRENT STATE** and important continuity information.

### Responsibilities
- Current project status
- Recently completed work (summary)
- Important decisions that must be preserved
- Known bugs and limitations
- Temporary workarounds
- Technical debt context
- Important discoveries
- Pending questions
- Project-specific preferences
- Security/privacy/compliance considerations

### What NOT to Include
- ❌ Stable product requirements (that's prd.md)
- ❌ Stable architecture (that's architecture.md)
- ❌ Established engineering rules (that's rules.md)
- ❌ Established design patterns (that's design.md)
- ❌ Detailed task breakdowns (that's tasks.md)
- ❌ Conversation transcripts
- ❌ Secrets or credentials

### When to Update
- After significant implementation work
- When important decisions are made
- When temporary workarounds are introduced
- When new bugs or limitations are discovered
- When architectural changes are in progress
- When important context emerges

### Anti-Patterns
- Turning it into a conversation log
- Documenting stable information that belongs elsewhere
- Including secrets or sensitive data
- Keeping outdated information indefinitely
- Writing novels (keep it concise and scannable)

---

## Document Relationships

### Information Flow

```
Product Strategy (prd.md)
          ↓
Technical Design (architecture.md)
          ↓
Engineering Standards (rules.md)
          ↓
Visual Design (design.md)
          ↓
Implementation (tasks.md)
          ↓
Current State (memory.md)
```

### Cross-References

Documents should reference each other when necessary:

- **prd.md** might reference architecture.md for technical constraints
- **architecture.md** might reference prd.md for product requirements
- **rules.md** might reference architecture.md for technology-specific standards
- **design.md** might reference rules.md for accessibility standards
- **tasks.md** should reference all documents for implementation context
- **memory.md** might reference any document for context

### Avoiding Duplication

When information logically belongs in multiple documents:

1. **Choose the primary home** based on responsibility
2. **Reference, don't duplicate** — Link to the primary source
3. **Exception:** Brief summaries are acceptable for context

Example:
- **Primary:** architecture.md documents the database is PostgreSQL
- **Reference:** rules.md might say "See architecture.md for database choice; all queries must use parameterized statements"

---

## Document Lifecycle

### Creation
1. Start with templates
2. Inspect actual project implementation
3. Fill in known information
4. Mark unknowns explicitly
5. Never invent information

### Maintenance
1. Update after meaningful changes
2. Keep information current
3. Remove outdated information
4. Archive historical information when appropriate
5. Maintain clear document history

### Archival
1. Move completed tasks to "Recently Completed" or remove
2. Move superseded decisions to "Historical Decisions" or note status
3. Remove temporary workarounds after they're fixed
4. Keep information needed for understanding current state

---

## Document Location

### Recommended Locations

**Option 1: Dedicated directory**
```
project-context/
├── prd.md
├── architecture.md
├── rules.md
├── design.md
├── tasks.md
└── memory.md
```

**Option 2: General documentation directory**
```
docs/project-context/
├── prd.md
├── architecture.md
├── rules.md
├── design.md
├── tasks.md
└── memory.md
```

**Option 3: Project root** (for simple projects)
```
PROJECT_ROOT/
├── prd.md
├── architecture.md
├── rules.md
├── design.md
├── tasks.md
└── memory.md
```

### Integration with Existing Documentation

If the project already has documentation:
- **Don't replace** existing docs unnecessarily
- **Reference** existing docs from context documents
- **Complement** existing docs with structure
- **Consolidate** only if there's clear benefit

Example integration in architecture.md:
```markdown
## Additional Documentation

- API documentation: See `/docs/api/README.md`
- Database schema: See `/docs/schema.md`
- Deployment guide: See `DEPLOY.md`
```

---

## Validation

### Quality Checks

Each document should be:
- ✅ **Clear:** Easy to understand
- ✅ **Current:** Reflects actual state
- ✅ **Concise:** No unnecessary verbosity
- ✅ **Complete:** Covers its responsibilities
- ✅ **Consistent:** Aligned with other documents
- ✅ **Actionable:** Provides useful guidance

### Common Issues

- ❌ **Stale information:** Document says X, code does Y
- ❌ **Missing information:** Key decisions not documented
- ❌ **Duplicated information:** Same thing in multiple places
- ❌ **Wrong document:** Information in the wrong place
- ❌ **Too detailed:** Documenting every implementation detail
- ❌ **Too vague:** Not providing useful guidance

---

## Success Criteria

The six-document system is working well when:

✅ AI agents understand the project before coding  
✅ New developers can onboard from the documents  
✅ Decisions are documented and preserved  
✅ Architectural drift is prevented  
✅ Design consistency is maintained  
✅ Important context is not lost  
✅ Documentation stays synchronized with code  
✅ Team members reference the docs regularly  

---

## Summary

| Document | Question | Update Frequency |
|----------|----------|------------------|
| prd.md | What & Why? | Quarterly or when requirements change |
| architecture.md | How is it built? | When architecture changes |
| rules.md | How should we code? | When standards evolve |
| design.md | How should it look? | When design patterns change |
| tasks.md | What needs to be done? | Weekly or after significant work |
| memory.md | What's the current state? | After important work or decisions |

**Remember:** These are living documents. Keep them current, concise, and useful.
