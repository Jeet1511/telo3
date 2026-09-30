# Telo3 — AI Development Skill

**Version:** 1.0.0  
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
- Onboarding to an existing codebase
- The user mentions "project context" or "project documentation"
- You need to understand project requirements, architecture, or design system
- Making architectural decisions
- Adding features that affect security, privacy, or compliance
- Auditing project quality
- Synchronizing documentation with implementation
- The project contains `project-context/` or similar context files (any location works)

## Quick Start (30 seconds)

**FIRST:** Read `AI-CONTEXT.md` (this file, 30 seconds)  
**THEN:** Read `memory.md` (current project state)  
**FINALLY:** Load other context as needed for your task

**Installation (Universal):**
```bash
# Clone anywhere
git clone https://github.com/Jeet1511/telo3.git

# Or add to your project
git submodule add https://github.com/Jeet1511/telo3.git telo3
```

**Works with:** Kiro, Cursor, GitHub Copilot, Claude, ChatGPT, Gemini, VS Code, JetBrains, ANY IDE + ANY AI

**Token Optimization:** Don't read everything. Read what you need.

---

## Six Core Documents

This system uses six distinct documents with clear responsibilities:

| Document | Responsibility |
|----------|----------------|
| **prd.md** | WHAT and WHY — requirements, vision, users, goals |
| **architecture.md** | HOW the system works — tech stack, structure, data flow |
| **rules.md** | HOW to engineer — coding standards, security, testing |
| **design.md** | HOW it looks and behaves — visual language, components, UX |
| **tasks.md** | WHAT work remains — implementation backlog |
| **memory.md** | CURRENT STATE — recent work, decisions, continuity |

**Location:** `project-context/` or `docs/project-context/` or project root (flexible)

---

## Initialization Workflow

### For New Projects

1. **Read the user's requirements** and confirm understanding
2. **Create the six core documents** from templates
3. **Document decisions as you make them**
4. **Mark uncertain information** explicitly
5. **Never invent requirements** — ask when unclear

### For Existing Projects

1. **Inspect the repository first:**
   - README, AGENTS.md, CLAUDE.md, .cursorrules
   - Existing documentation
   - package.json / requirements.txt / go.mod
   - Source code structure
   - Routes, components, APIs
   - Database configuration
   - Authentication implementation
   - Design patterns (CSS, components)
   - Security boundaries
   - Privacy-sensitive functionality

2. **DO NOT blindly overwrite existing documentation**
3. **Integrate with existing project instructions**
4. **Generate the six documents based on actual implementation**
5. **Mark uncertain information** with TODO or UNKNOWN
6. **Do not modify application code** merely to initialize context

### Automated Initialization

```bash
# Use the provided script
./scripts/init-project-context.sh
```

---

## AI Coding Workflow

### BEFORE CODING

1. **Read relevant project context:**
   - prd.md → understand requirements
   - architecture.md → understand system structure
   - rules.md → understand engineering standards
   - design.md → understand visual/UX patterns
   - tasks.md → understand planned work
   - memory.md → understand current state

2. **Inspect actual code** in the affected area

3. **Understand the user request:**
   - What is the goal?
   - Which files are affected?
   - What are the implications?

4. **Check alignment:**
   - Does this match the architecture?
   - Does it follow the rules?
   - Does it match the design system?
   - Are there security implications?
   - Are there privacy implications?
   - Are there performance implications?
   - Are there accessibility implications?
   - Are there SEO implications (if applicable)?
   - Are there legal/compliance implications?

5. **Make a scoped plan** before writing code

### DURING CODING

- Follow the documented architecture
- Follow rules.md engineering standards
- Follow design.md visual language
- Reuse existing abstractions and patterns
- Avoid unrelated refactoring
- Avoid unnecessary dependencies
- Preserve working behavior
- Protect secrets (never hardcode)
- Protect personal data
- Maintain accessibility
- Maintain responsive behavior
- Maintain security boundaries
- Maintain performance

### AFTER CODING

1. **Verify functionality** — does it work?
2. **Run relevant tests/checks** if available
3. **Check for regressions** in related features
4. **Update project context:**
   - tasks.md → mark completed, add new tasks
   - memory.md → document important decisions, state changes
   - architecture.md → if architecture changed
   - design.md → if design patterns changed
   - rules.md → if engineering standards changed
   - prd.md → if requirements changed
5. **Document security/privacy/compliance changes** when relevant

---

## Quality Dimensions

This skill system includes specialized guidance for:

### Product Quality
- Requirements clarity (prd.md)
- Feature completeness (tasks.md)
- Decision tracking (memory.md)

### Engineering Quality
- Coding standards (rules.md)
- Architecture consistency (architecture.md)
- Technical debt tracking (memory.md)

### UI/UX Quality
- Design system adherence (design.md)
- Anti-vibe-coding rules (references/ui-quality.md)
- Responsive behavior
- Accessibility (references/accessibility-quality.md)

### SEO Quality
- Metadata completeness (references/seo-quality.md)
- Indexing strategy
- Performance optimization
- Structured data

### Security
- Authentication/authorization (references/security-quality.md)
- Input validation
- Secrets management
- Dependency security

### Privacy
- Data collection transparency (references/privacy-compliance.md)
- Third-party tracking
- Consent management
- Data retention/deletion

### Legal/Compliance
- Age restrictions and child safety (references/legal-compliance.md)
- Marketing email requirements
- Subscription disclosures
- Copyright/DMCA considerations
- Jurisdiction-specific requirements

### Performance
- Core Web Vitals (references/performance-quality.md)
- Optimization strategies
- Loading performance
- Runtime performance

---

## Smart Applicability

**Do not run every audit against every project.**

Apply quality checks based on project type:

| Project Type | Primary Concerns |
|--------------|------------------|
| **Portfolio / Marketing Site** | SEO, accessibility, performance, design, privacy |
| **Admin Dashboard** | Security, privacy, accessibility, responsive UX |
| **API / Backend Service** | Security, validation, privacy, performance, architecture |
| **E-commerce** | Security, payments, privacy, subscriptions, accessibility, SEO |
| **Healthcare Application** | Privacy, security, sensitive data, regulatory compliance |
| **User-Generated Content** | Security, privacy, copyright/DMCA, moderation |
| **Children's Product** | Age verification, child privacy laws, content safety |
| **Email Marketing Platform** | Unsubscribe, consent, sender identity, email laws |
| **Subscription Service** | Recurring billing, renewal disclosure, cancellation |

---

## Documentation Conflicts

When documentation conflicts with code:

1. **Inspect the actual implementation** — code is the source of truth for current state
2. **Identify the discrepancy** — what changed and when?
3. **Determine which is current** — was it intentional?
4. **Update stale documentation** when appropriate
5. **Do not silently reverse intentional decisions**
6. **Ask the user** when the conflict represents an unresolved product decision

### Priority Order

```
Current explicit user instruction
          ↓
Actual project implementation
          ↓
Current project documentation
          ↓
General engineering best practices
```

---

## Project Auditing

Use the project audit framework to systematically review:

1. **Product** — requirements, scope, completeness
2. **Architecture** — consistency, duplication, technical debt
3. **Code** — maintainability, error handling, complexity
4. **UI/UX** — design consistency, accessibility, vibe-coded patterns
5. **SEO** — metadata, indexing, performance (if applicable)
6. **Security** — authentication, authorization, validation, secrets
7. **Privacy** — data collection, tracking, consent, retention
8. **Legal/Compliance** — age restrictions, marketing, subscriptions, uploads
9. **Performance** — Core Web Vitals, optimization, loading
10. **Documentation** — accuracy, completeness, synchronization

See `references/project-audit.md` for detailed audit procedures.

---

## Handling Uncertainty

### When Requirements are Unclear

- **DO NOT invent requirements**
- Mark information as `[UNKNOWN]` or `[TODO: clarify with user]`
- Ask specific questions to resolve ambiguity
- Document assumptions explicitly

### When Technical Details are Unknown

- **Inspect the actual implementation** before documenting
- Use file search, code reading, and grep to discover patterns
- Mark uncertain information with TODO
- Do not guess about security or privacy implementations

### When Legal/Compliance Requirements Apply

- **This skill is a decision-support tool, not legal advice**
- Identify potentially applicable laws/regulations
- Distinguish technical requirements from legal requirements
- Verify current requirements from authoritative sources when accuracy matters
- **Never claim "legally compliant" without proper evidence and scope**
- Recommend consulting qualified legal counsel for compliance verification

---

## Anti-Vibe-Coding System

**Vibe-coded patterns are not absolutely prohibited** — use them when justified by the actual product, brand, UX, accessibility, or design system.

### Identify and Avoid Generic AI Aesthetics:

- Harsh/arbitrary gradients and rainbow colors
- Generic purple/black AI palettes or arbitrary neon
- Excessive shadows, rounded corners, glassmorphism
- Inconsistent icon usage and decorative emojis
- Repetitive 3-card feature sections
- Generic bento grids without purpose
- Radial orbs, dot grids, sparkle icons
- Animated arrows and terminal-window aesthetics without justification
- Meaningless hover animations
- Generic SaaS layouts and copy-paste components
- "It's not X, it's Y" generic marketing copy
- Checkmark-heavy feature lists
- Unnecessary three-tier pricing
- Fake product demonstrations, statistics, testimonials
- Decorative UI with no purpose
- Excessive animation
- Inconsistent typography and spacing

**Before implementing a pattern, ask:**
- Does the actual design system justify this?
- Does the brand personality support this?
- Does this serve the user experience?
- Is this consistent with existing UI?

See `references/ui-quality.md` for detailed guidance.

---

## Critical Privacy Safeguards

### Third-Party Fonts / External Resources

Audit externally hosted fonts, scripts, analytics, CDNs:
- Can loading disclose IP addresses or identifiers to third parties?
- Is self-hosting more appropriate for privacy-sensitive deployments?
- Are licenses compatible?
- Document unavoidable third-party data transfers

### Session Replay / Recording

If the project uses session replay, keystroke recording, or behavioral analytics:
- Treat it as privacy-sensitive
- Mask passwords, payment info, health data, authentication secrets
- Configure provider privacy controls
- Determine whether consent/notice is required
- Review applicable privacy laws
- **Do not enable invasive recording by default**

### Age / Children

If the service can be used by children:
- Determine applicable jurisdiction and audience
- Assess whether age screening, parental consent, or other controls may be required
- Do not knowingly collect children's personal information in violation of applicable law
- Consider children's privacy requirements (e.g., COPPA when relevant to U.S.)
- Verify current legal requirements before claiming compliance
- **Do not hardcode fines or penalties as universal facts**

### Marketing Emails

If the project sends marketing email:
- Implement unsubscribe mechanism where required
- Include sender identification
- Ensure truthful headers and subject lines
- Include physical postal address where legally required
- Handle consent/permission appropriately
- Process unsubscribe requests
- Consider CAN-SPAM for U.S. marketing email where applicable
- **Do not hardcode universal monetary penalties**

### Subscriptions / Auto-Renewals

If the product offers subscriptions or auto-renewals:
- Clearly disclose price, billing frequency, renewal terms
- Provide accessible cancellation method
- Display material terms near purchase decision when required
- Send renewal notices where required
- Consider applicable jurisdiction-specific requirements
- **Do not assume one jurisdiction's rules apply globally**

### User Uploads / DMCA

If users can upload copyrighted material:
- For U.S. services seeking DMCA safe-harbor protection, consider:
  - Designated DMCA agent
  - Current Copyright Office registration requirements
  - Public agent contact information
  - Repeat-infringer policy
  - Notice-and-takedown process
- **Do not claim immunity or hardcode registration costs**
- Verify current U.S. Copyright Office requirements

See `references/privacy-compliance.md` and `references/legal-compliance.md` for details.

---

## Secrets Management

**NEVER store secrets in project context files:**

- ❌ API keys, tokens, passwords
- ❌ Private credentials, certificates
- ❌ Database connection strings with passwords
- ❌ Third-party service credentials
- ❌ Encryption keys

**Instead:**
- Document that secrets are required
- Document where they should be configured (environment variables, secret managers)
- Document which permissions/scopes are needed
- Provide example configuration with placeholders

---

## Updating Project Context

### When to Update

- **prd.md** — when requirements, goals, or scope change
- **architecture.md** — when tech stack, structure, or data flow changes
- **rules.md** — when engineering standards evolve
- **design.md** — when visual language or UX patterns change
- **tasks.md** — after completing work, when adding new tasks
- **memory.md** — after meaningful implementation, decisions, discoveries

### What NOT to Update

- Do not turn memory.md into a conversation transcript
- Do not document every minor code change
- Do not duplicate information across documents unnecessarily
- Do not update documentation for hypothetical future changes

### Synchronization

After significant implementation:
1. Verify documentation matches actual code
2. Update stale information
3. Remove obsolete content
4. Add new patterns or decisions
5. Mark remaining unknowns

---

## Working with Existing Documentation

Many projects already have:
- README.md
- CONTRIBUTING.md
- Architecture Decision Records (ADRs)
- API documentation
- Design system documentation
- AGENTS.md, CLAUDE.md, .cursorrules

**Integration strategy:**
1. **Read existing documentation first**
2. **Identify overlaps** with the six-document system
3. **Reference existing docs** rather than duplicating
4. **Complement, don't replace** — add structure where missing
5. **Respect existing conventions** and file locations

Example integration in prd.md:
```markdown
## Additional Documentation

- Architecture decisions: See `/docs/adrs/`
- API documentation: See `/docs/api/`
- Contributing: See `CONTRIBUTING.md`
```

---

## Framework Compatibility

This skill system is **framework-agnostic** and works with:

- React, Vue, Angular, Svelte, Next.js, Nuxt, SvelteKit
- Node.js, Python, Ruby, Go, Rust, PHP
- Express, FastAPI, Django, Rails, Gin, Actix
- PostgreSQL, MySQL, MongoDB, Redis, SQLite
- REST APIs, GraphQL, tRPC, gRPC
- Tailwind, CSS Modules, Styled Components, Sass
- And any other technology stack

The six-document structure remains consistent regardless of technology.

---

## Validation

Use the validation script to check project context health:

```bash
./scripts/validate-project-context.sh
```

This verifies:
- Required documents exist
- Markdown is readable
- Required sections are present
- No obvious structural errors
- No accidental secret patterns

---

## Advanced Usage

### Multi-Repository Projects

For monorepos or multi-service architectures:
- Place shared context at the root
- Place service-specific context in each service directory
- Reference shared context from service-specific docs

### Design System Libraries

For standalone design system projects:
- Expand design.md significantly
- Include component API documentation
- Document usage examples
- Link to Storybook or similar

### API Projects

For API-focused projects:
- Expand architecture.md with API design
- Document authentication/authorization thoroughly
- Include OpenAPI/GraphQL schema references
- Security and privacy sections are critical

### Legacy Migration

When modernizing legacy code:
- Document current state in architecture.md
- Track migration progress in tasks.md
- Document technical debt in memory.md
- Use rules.md to establish standards for new code

---

## Common Pitfalls

### ❌ DO NOT

- Invent requirements that don't exist
- Modify unrelated code during context initialization
- Store secrets in context files
- Duplicate the same information across multiple documents unnecessarily
- Turn memory.md into a conversation log
- Fabricate product features, statistics, testimonials, integrations
- Claim legal compliance without proper verification
- Enable invasive tracking by default
- Ignore existing project documentation
- Replace working architecture without justification

### ✅ DO

- Inspect actual implementation before documenting
- Mark uncertain information explicitly
- Ask users when requirements are unclear
- Update context after meaningful changes
- Preserve intentional architectural decisions
- Follow existing project patterns
- Reuse existing abstractions
- Verify security and privacy implementations
- Distinguish technical requirements from legal requirements
- Consult specialized references for quality dimensions

---

## Reference Files

This skill includes specialized guidance:

- `AI-CONTEXT.md` — **READ THIS FIRST** (30-second quick reference)
- `references/document-specification.md` — Detailed template specs
- `references/workflow.md` — Detailed coding workflow
- `references/ai-behavior.md` — AI agent behavior guidelines
- `references/token-optimization.md` — **Token efficiency & caveman mode**
- `references/smart-skill-delegation.md` — **Use other skills/MCP intelligently**
- `references/ui-quality.md` — Anti-vibe-coding rules
- `references/seo-quality.md` — SEO audit framework
- `references/accessibility-quality.md` — Accessibility standards
- `references/performance-quality.md` — Performance optimization
- `references/security-quality.md` — Security audit framework
- `references/privacy-compliance.md` — Privacy considerations
- `references/legal-compliance.md` — Legal/compliance awareness
- `references/project-audit.md` — Comprehensive audit procedures

**Load references only when needed for specific task type.**

---

## Example Project

See `examples/example-project/` for a complete, realistic demonstration of all six documents in action.

---

## Support and Contribution

This is an open-source AI development skill. Contributions, improvements, and adaptations are welcome.

**Repository:** [Your GitHub URL]  
**License:** MIT  
**Version:** 1.0.0

---

## Summary

This skill system transforms AI coding from reactive "vibe coding" to systematic engineering:

1. **Persistent project memory** prevents repeated explanations
2. **Six-document architecture** provides clear responsibility boundaries
3. **Quality frameworks** ensure security, privacy, accessibility, SEO, performance
4. **Legal/compliance awareness** prevents common oversights
5. **Anti-vibe-coding rules** maintain design consistency
6. **Existing-project protection** integrates with established codebases
7. **Framework-agnostic design** works across all technology stacks
8. **Token optimization** minimizes waste, maximizes efficiency
9. **Smart delegation** uses specialized skills/MCP when better
10. **Caveman mode** ultra-concise communication when requested

**Efficiency modes:**
- **Normal:** Brief, clear communication
- **Caveman:** Ultra-short, no fluff (enable with "caveman mode")
- **Smart:** Checks for better tools before implementing

**Use this skill to make AI agents effective engineering partners, not just code generators.**

---

**Created with ❤️ by [Jeet (@Jeet1511)](https://github.com/Jeet1511)**  
**Repository:** https://github.com/Jeet1511/telo3  
**License:** MIT  
**Community:** Open for contributions!
