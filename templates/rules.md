<!-- Lean skeleton. Engineering standards the agent must follow. Grow only as needed.
     Never put real secrets here — document that they live in env vars / a secret manager. -->

# Engineering Rules — [Project Name]

## Core Principles

- Understand before changing; inspect the actual code you will touch.
- Smallest diff that fulfills the request; reuse existing patterns and abstractions.
- No drive-by refactors, no unrequested features, no new dependencies without need.
- Verify changed behavior before claiming done; report what was and wasn't verified.

## Coding Standards

[TODO: language/style conventions, naming, file organization, error handling.]

## Validation

- Validate all external input at the boundary (type, shape, range, length).
- Reject unexpected fields; never trust client-supplied identifiers for authorization.

## Security

- Authorize every request server-side; scope queries to the owner/tenant.
- Hash passwords with argon2 or bcrypt; never store plaintext.
- Secrets come from environment variables / a secret manager — never hardcoded or committed.
- Use parameterized queries; encode output; set security headers.

## Testing

[TODO: test framework, what must be covered, how to run. Verify changed behavior; skip re-verifying unrelated unchanged code.]

## Privacy

[TODO: what data is collected, retention/deletion, third-party transfers. No invasive tracking without disclosure.]

## Git Practices

[TODO: branch/commit conventions; never commit secrets or generated artifacts.]