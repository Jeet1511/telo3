# Engineering Rules

> **Purpose:** Define HOW the project must be engineered — coding standards, security practices, and engineering discipline.  
> **Last Updated:** [Date]

---

## Core Engineering Principles

1. **Understand before changing** — Read relevant code and documentation before making modifications
2. **Preserve existing patterns** — Follow established conventions unless there's a strong reason to diverge
3. **Scope changes narrowly** — Do not modify unrelated code
4. **Favor composition over duplication** — Reuse existing abstractions
5. **Justify dependencies** — Do not introduce new dependencies without clear benefit
6. **Protect working systems** — Do not replace working architecture without validated reasoning
7. **Be truthful** — Never fabricate functionality, statistics, testimonials, or compliance claims

---

## General Coding Rules

### Code Organization
- One component/function per file (exceptions for tightly coupled helpers)
- Group related functionality in directories
- Keep file length reasonable (prefer <300 lines; split when exceeding ~500)
- Extract complex logic into named functions
- Colocate related code (components, styles, tests)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (Components) | PascalCase | `UserProfile.tsx` |
| Files (Utilities) | camelCase or kebab-case | `formatDate.ts` or `format-date.ts` |
| Directories | kebab-case | `user-profile/` |
| Functions | camelCase | `getUserById()` |
| Classes | PascalCase | `UserService` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Boolean variables | is/has/should prefix | `isLoading`, `hasPermission` |

### Code Style
- Use descriptive, meaningful names (avoid abbreviations unless widely understood)
- Prefer explicit over clever
- Keep functions small and focused (single responsibility)
- Use early returns to reduce nesting
- Limit function parameters (prefer <4; use objects for more)
- Comment WHY, not WHAT (code should be self-documenting)
- Remove dead code and commented-out code

### Formatting
[Adjust based on your tooling]

- **Indentation:** 2 spaces (or 4 spaces for Python)
- **Line Length:** 80-120 characters (soft limit)
- **Quotes:** Single quotes for strings (or follow language conventions)
- **Semicolons:** [Required / Not required based on language/config]
- **Trailing Commas:** Yes (for multi-line)
- **Formatting Tool:** [Prettier, Biome, Black, etc.]
- **Linting Tool:** [ESLint, Biome, pylint, etc.]

---

## Component Architecture

### Component Organization (Frontend)

```typescript
// Component structure example
components/
├── ui/                    # Base UI primitives (buttons, inputs)
├── features/              # Feature-specific components
└── layouts/               # Layout components (header, footer)
```

### Component Guidelines
- **Keep components focused** — Single responsibility
- **Prefer composition** — Build complex UI from simple components
- **Lift state judiciously** — Keep state as local as possible
- **Avoid prop drilling** — Use context or composition for deep props
- **Name components clearly** — `UserProfileCard` not `Card2`
- **Extract reusable logic** — Use custom hooks or utility functions

### Component File Structure

```typescript
// PreferredStructure.tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface Props {
  userId: string;
}

// 3. Component
export function PreferredStructure({ userId }: Props) {
  // Hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
}
```

---

## TypeScript / JavaScript

### TypeScript Usage
- **Use TypeScript** for type safety
- **Prefer types over any** — Use `unknown` if type is truly unknown
- **Define interfaces for props and data models**
- **Use type inference** where obvious
- **Avoid type assertions** unless necessary (prefer type narrowing)
- **Use strict mode** — Enable `strict: true` in tsconfig.json

### Modern JavaScript
- Use `const` by default, `let` when reassignment needed, avoid `var`
- Prefer arrow functions for inline functions and callbacks
- Use destructuring for objects and arrays
- Use template literals for string interpolation
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Use async/await over raw promises

### Avoid
- Mutating function parameters
- Global variables
- Magic numbers (use named constants)
- Deep nesting (flatten with early returns)
- Callback hell (use async/await)

---

## Backend Development

### API Design
- **Use consistent naming** — RESTful conventions or GraphQL schema conventions
- **Version APIs** when necessary (`/api/v1/...`)
- **Return appropriate HTTP status codes**
- **Provide clear error messages** (without exposing sensitive details)
- **Document APIs** — OpenAPI/Swagger or GraphQL introspection

### Request Handling
1. **Validate input** — Never trust client input
2. **Authenticate** — Verify user identity if required
3. **Authorize** — Check permissions before data access
4. **Process request** — Execute business logic
5. **Handle errors gracefully** — Log and return appropriate response
6. **Return structured response** — Consistent format

### Business Logic
- Keep controllers thin (orchestration only)
- Extract business logic into service functions
- Make services testable (pure functions when possible)
- Separate concerns (data access, business logic, presentation)

---

## Database

### Query Practices
- **Use parameterized queries** — Prevent SQL injection
- **Use ORM features correctly** — Understand N+1 query problems
- **Index frequently queried fields**
- **Avoid SELECT \*** — Request only needed columns
- **Use transactions** for multi-step writes
- **Handle connection errors gracefully**

### Schema Design
- Use appropriate data types
- Define constraints (NOT NULL, UNIQUE, FOREIGN KEY)
- Create indexes strategically (read patterns vs. write performance)
- Document schema changes in migrations
- Use UUIDs or auto-increment for IDs (decide and be consistent)

### Migrations
- **Never edit applied migrations**
- **Test migrations** before applying to production
- **Write rollback migrations** where possible
- **Document breaking changes**

---

## Validation

### Input Validation
- **Validate all user input** — Client and server side
- **Use schema validation** — Zod, Yup, Joi, or similar
- **Validate types and formats** — Email, URL, phone, etc.
- **Validate bounds** — String length, number ranges
- **Sanitize input** — Strip/escape dangerous characters when necessary
- **Provide clear error messages** — Help users fix issues

### Example (Zod)
```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
  name: z.string().min(1).max(100),
});

// Validate
const result = userSchema.safeParse(input);
if (!result.success) {
  // Handle validation errors
}
```

---

## Error Handling

### General Principles
- **Expect errors** — Don't assume everything works
- **Handle errors explicitly** — Don't swallow errors silently
- **Log errors appropriately** — Include context, exclude secrets
- **Show user-friendly messages** — Don't expose stack traces to users
- **Use error boundaries** (React) or global error handlers

### Error Levels
- **User-facing errors** — Form validation, 404, permissions
- **Recoverable errors** — Network issues, rate limits (retry)
- **Fatal errors** — Database down, critical service unavailable (alert)

### Logging
- **Log errors with context** — User ID, request ID, timestamp
- **Do not log secrets** — Passwords, tokens, API keys
- **Do not log PII unnecessarily** — Personal data, health info
- **Use structured logging** — JSON format for parsing
- **Use appropriate log levels** — Error, warn, info, debug

---

## Authentication & Authorization

### Authentication
- **Use established libraries** — NextAuth.js, Auth0, Passport, etc.
- **Hash passwords** — Use bcrypt, scrypt, or Argon2
- **Never store plaintext passwords**
- **Use secure session management** — HttpOnly cookies or secure JWT storage
- **Implement rate limiting** on auth endpoints
- **Support password reset** securely

### Authorization
- **Check permissions on every request**
- **Implement authorization at the API level** (don't rely on UI hiding)
- **Use principle of least privilege** — Grant minimum necessary permissions
- **Validate resource ownership** — Ensure user can access the resource
- **Document permission model** clearly

### Session Security
- Set `HttpOnly` flag on cookies
- Set `Secure` flag on cookies (HTTPS only)
- Set `SameSite` attribute (CSRF protection)
- Use reasonable session expiration
- Implement session invalidation on logout

---

## Security

### Input Security
- ✅ **DO:** Validate and sanitize all user input
- ✅ **DO:** Use parameterized queries (SQL injection prevention)
- ✅ **DO:** Encode output (XSS prevention)
- ✅ **DO:** Implement CSRF protection
- ❌ **DON'T:** Trust client-side validation alone
- ❌ **DON'T:** Use `eval()` or similar with user input

### Secrets Management
- **Never commit secrets** to version control
- **Use environment variables** for configuration
- **Use secret managers** for production (AWS Secrets Manager, etc.)
- **Rotate secrets regularly**
- **Limit secret access** (principle of least privilege)
- **Never log secrets**

### API Security
- Use HTTPS everywhere
- Implement rate limiting
- Validate `Content-Type` headers
- Set security headers (CSP, X-Frame-Options, etc.)
- Implement CORS correctly
- Use API keys or OAuth for third-party access

### Dependencies
- **Keep dependencies updated** — Regular security patches
- **Audit dependencies** — `npm audit`, Dependabot, Snyk
- **Minimize dependencies** — Fewer dependencies = smaller attack surface
- **Use lock files** — package-lock.json, yarn.lock, poetry.lock
- **Review new dependencies** — Check maintainership, license, activity

---

## Privacy

### Data Collection
- **Collect only necessary data** — Minimize data collection
- **Document what data is collected** — In privacy policy and code comments
- **Obtain consent** where required by law
- **Provide opt-out mechanisms** where required

### Data Storage
- **Encrypt sensitive data at rest** — PII, health data, financial data
- **Use appropriate retention periods** — Delete data when no longer needed
- **Implement data deletion** — Support user deletion requests
- **Limit data access** — Only authorized personnel/services

### Third-Party Services
- **Audit third-party data sharing** — Know what data is sent where
- **Use privacy-friendly alternatives** when possible
- **Self-host resources** when appropriate (fonts, analytics)
- **Document third-party services** — In privacy policy and architecture docs

### Logging & Analytics
- **Do not log sensitive data** — Passwords, tokens, PII
- **Anonymize analytics** when possible
- **Mask sensitive form fields** in session replay
- **Respect Do Not Track** when appropriate

---

## Dependencies

### Adding Dependencies
- **Ask: Is this dependency necessary?**
- **Check: Is the package actively maintained?**
- **Check: Does it have known vulnerabilities?**
- **Check: Is the license compatible?**
- **Check: Is it well-documented?**
- **Consider: Bundle size impact** (for frontend)

### Dependency Hygiene
- Use exact or pinned versions for critical dependencies
- Update dependencies regularly (monthly or quarterly)
- Test after updating dependencies
- Remove unused dependencies
- Prefer well-established packages over new/unknown

---

## Git Practices

### Commits
- **Write clear commit messages** — Describe what and why
- **Use conventional commits** (optional but recommended)
  ```
  feat: add user profile page
  fix: resolve login redirect issue
  docs: update API documentation
  refactor: simplify auth logic
  ```
- **Make atomic commits** — One logical change per commit
- **Avoid committing sensitive data** — Use `.gitignore`

### Branches
- Use feature branches for new work
- Keep branches short-lived
- Name branches descriptively (`feature/user-profile`, `fix/login-bug`)
- Don't commit directly to main/master

### Pull Requests
- Write descriptive PR titles and descriptions
- Request reviews from appropriate team members
- Address review feedback
- Ensure CI passes before merging
- Delete branches after merging

---

## Testing

[Adjust based on your testing strategy]

### Testing Strategy
- **Unit tests** — Test individual functions/components
- **Integration tests** — Test component/service interactions
- **E2E tests** — Test critical user flows

### Testing Guidelines
- Write tests for business logic
- Write tests for bug fixes (prevent regression)
- Mock external dependencies (APIs, databases)
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for meaningful coverage (not 100% at all costs)

### Test Organization
```
src/
  components/
    Button.tsx
    Button.test.tsx
  lib/
    formatDate.ts
    formatDate.test.ts
```

---

## Performance

### Frontend Performance
- **Optimize images** — Use modern formats (WebP, AVIF), appropriate sizes
- **Lazy load** non-critical resources
- **Code split** large bundles
- **Minimize JavaScript** — Remove unused code
- **Use production builds** for deployment
- **Implement caching strategies**

### Backend Performance
- **Optimize database queries** — Use indexes, avoid N+1
- **Implement caching** where appropriate (Redis, in-memory)
- **Use pagination** for large datasets
- **Implement rate limiting** to protect resources
- **Profile slow endpoints** and optimize

### Measure First
- Don't optimize prematurely
- Use performance profiling tools
- Set performance budgets
- Monitor production performance

---

## Accessibility

### Semantic HTML
- Use appropriate HTML elements (`<button>`, `<nav>`, `<article>`)
- Use heading hierarchy (`<h1>` to `<h6>`)
- Use `<label>` for form inputs
- Use `<main>`, `<header>`, `<footer>` landmarks

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Maintain logical tab order
- Show visible focus states
- Support Escape to close modals

### Screen Readers
- Provide `alt` text for images
- Use `aria-label` when visual labels are insufficient
- Use `aria-describedby` for additional context
- Mark decorative images with `alt=""`

### Color & Contrast
- Ensure sufficient color contrast (WCAG AA: 4.5:1 for normal text)
- Don't rely on color alone to convey information
- Support high contrast mode
- Test with color blindness simulators

---

## SEO (for applicable projects)

### Meta Tags
- Unique `<title>` per page (50-60 characters)
- Unique `meta description` per page (150-160 characters)
- Canonical URLs to prevent duplicate content
- Open Graph tags for social sharing
- Twitter Card tags

### Content
- Use semantic HTML and heading hierarchy
- Write descriptive alt text for images
- Use descriptive link text (avoid "click here")
- Create meaningful URLs (kebab-case, descriptive)

### Technical SEO
- Generate `sitemap.xml`
- Configure `robots.txt`
- Implement structured data (Schema.org)
- Ensure fast page loads (Core Web Vitals)
- Ensure mobile responsiveness

---

## Legal & Compliance Awareness

> **Important:** This section is a decision-support tool, not legal advice. Verify applicable legal requirements with qualified counsel before claiming compliance.

### General Principles
- **Identify regulated functionality** — Know what might have legal implications
- **Determine applicable jurisdictions** — Laws vary by location
- **Distinguish technical from legal requirements**
- **Verify current law** — Regulations change
- **Document compliance efforts** — For audit trail
- **Never fabricate compliance claims**

### Common Considerations

#### Age Restrictions / Children
- If children may use the service, assess child privacy requirements
- Implement age verification if required
- Obtain parental consent where required by law
- Do not collect children's personal data in violation of applicable law

#### Marketing Emails
- Provide clear unsubscribe mechanism
- Honor unsubscribe requests promptly
- Include sender identification
- Include physical postal address where legally required
- Ensure truthful subject lines

#### Subscriptions / Auto-Renewals
- Clearly disclose price, billing frequency, renewal terms
- Display material terms near purchase decision
- Provide accessible cancellation mechanism
- Send renewal reminders where required by law

#### User-Generated Content / Copyright
- For U.S. services, consider DMCA compliance (designated agent, takedown process)
- Implement content moderation policies
- Respect copyright and intellectual property

#### Privacy & Data Protection
- Understand what data is collected and why
- Implement appropriate security controls
- Provide transparency (privacy policy)
- Support data deletion where required
- Obtain consent where required

See `references/legal-compliance.md` for detailed guidance.

---

## Documentation

### Code Documentation
- Document public APIs (JSDoc, docstrings)
- Explain complex algorithms
- Document non-obvious behavior
- Keep documentation in sync with code

### Project Documentation
- **README** — Project overview, setup, usage
- **Architecture docs** — System design and tech stack
- **API docs** — Endpoint documentation
- **Contributing guide** — How to contribute

### Context Documents
After meaningful changes, update relevant project context:
- `prd.md` — If requirements changed
- `architecture.md` — If architecture changed
- `rules.md` — If engineering standards changed
- `design.md` — If design patterns changed
- `tasks.md` — Mark completed tasks, add new ones
- `memory.md` — Document important decisions

---

## Refactoring

### When to Refactor
- When adding features to poorly structured code
- When fixing bugs caused by code complexity
- When code duplication hinders maintenance
- When performance is measurably inadequate

### When NOT to Refactor
- When code works and doesn't need to change
- As part of an unrelated feature
- Without tests to verify behavior preservation
- Without clear improvement goal

### Refactoring Guidelines
- Make small, incremental changes
- Test after each change
- Don't change behavior and refactor simultaneously
- Use version control to revert if needed

---

## Anti-Patterns to Avoid

### Code Anti-Patterns
- ❌ God objects / God functions (too much responsibility)
- ❌ Copy-paste programming (duplication without abstraction)
- ❌ Magic numbers (unnamed constants)
- ❌ Deep nesting (arrow code)
- ❌ Premature optimization
- ❌ Reinventing the wheel (ignoring established patterns)

### Architecture Anti-Patterns
- ❌ Big ball of mud (no structure)
- ❌ Golden hammer (using one pattern for everything)
- ❌ Lava flow (dead code nobody dares to remove)
- ❌ Tight coupling (components can't be separated)

### Team Anti-Patterns
- ❌ Not reading documentation before coding
- ❌ Ignoring existing patterns
- ❌ Modifying unrelated code in the same PR
- ❌ Committing secrets or sensitive data
- ❌ Breaking builds with untested changes

---

## Context-Specific Overrides

[Document any project-specific rules that override or extend these general guidelines]

- [Override 1]
- [Override 2]

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial version |
