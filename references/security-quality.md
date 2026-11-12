# Security Quality
**Load when:** any auth, session, input handling, secrets, API, data-storage, or dependency work.

Build security in from the start: validate input, protect secrets, enforce authorization, encrypt data. Verify changed behavior after every security-relevant fix; skip re-verification only for unrelated areas.

## Audit Checklist

### 1. Authentication
- [ ] Hash passwords (bcrypt, scrypt, Argon2); never store plaintext
- [ ] Secure session management
- [ ] Rate limiting on auth endpoints
- [ ] Password reset is secure: token expiration, one-time use
- [ ] MFA available where appropriate

### 2. Authorization
- [ ] Permissions checked on every request, at API level (not just UI)
- [ ] Principle of least privilege
- [ ] Resource ownership validated
- [ ] Role-based access control where applicable

### 3. Input Validation
- [ ] All user input validated server-side; never trust the client
- [ ] Type, length/bounds, and format validation (email, URL, etc.)
- [ ] Use schema validation libraries (Zod, Yup, Joi)

### 4. Injection Prevention
- [ ] SQL injection: parameterized queries or ORM
- [ ] NoSQL injection: validate and sanitize
- [ ] Command injection: no shell execution with user input
- [ ] XSS: encode output; use CSP headers
- [ ] Path traversal: validate file paths

### 5. Secrets Management
- [ ] No secrets in code, logs, or error messages
- [ ] Environment variables; secret managers for production
- [ ] Rotate secrets regularly

### 6. Session Security
- [ ] Cookies: HttpOnly flag, Secure flag (HTTPS), SameSite attribute (CSRF protection)
- [ ] Reasonable session expiration
- [ ] Session invalidation on logout

### 7. API Security
- [ ] HTTPS everywhere; rate limiting; CORS configured correctly
- [ ] Security headers (CSP, X-Frame-Options, etc.); Content-Type validation
- [ ] Authentication required where appropriate

### 8. Data Security
- [ ] Sensitive data encrypted at rest and in transit
- [ ] PII handled appropriately; no sensitive data in logs
- [ ] Secure file uploads; access controls on data

### 9. Dependencies
- [ ] Keep updated; run regular security audits (npm audit, Dependabot)
- [ ] Minimize dependencies; review new dependencies
- [ ] Use lock files

### 10. Error Handling
- [ ] Never expose stack traces or system details to users
- [ ] Log errors with context; never log secrets or PII

## Vulnerable Patterns and Fixes

| Vulnerability | Vulnerable pattern | Required fix |
|---|---|---|
| SQL injection | Interpolated SQL: `SELECT ... WHERE id = ${req.params.id}` | Parameterized query (`WHERE id = ?` + params array) or ORM |
| XSS | `dangerouslySetInnerHTML={{__html: userInput}}` | Render as text (`{userInput}`); React escapes by default |
| CSRF | Unprotected cookie-authenticated state changes | CSRF tokens; SameSite cookies; check Origin/Referer headers |
| IDOR | `getDocument(req.params.id)` returned with no ownership check | Reject when `doc.userId !== req.user.id` (UnauthorizedError) |

## Secrets Rules

- Never commit: API keys, passwords, private keys/certificates, OAuth client secrets, database credentials, encryption keys, third-party service credentials.
- Store securely: environment variables (development), gitignored `.env` files, secret managers in production (AWS Secrets Manager, HashiCorp Vault).
- Document required env vars with purpose, e.g. `DATABASE_URL` (PostgreSQL connection string), `JWT_SECRET` (generate random 32+ chars), `STRIPE_SECRET_KEY` (from provider dashboard).

## Security Headers

| Header | Value |
|---|---|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| X-XSS-Protection | `1; mode=block` |
| Content-Security-Policy | `default-src 'self'` |
| Referrer-Policy | `strict-origin-when-cross-origin` |

## Security Documentation (record per project)

- Authentication: method (e.g., JWT + bcrypt), session management (e.g., HttpOnly cookies), rate-limited routes (e.g., /api/auth/*)
- Authorization: model (e.g., RBAC roles user/admin), enforcement point (API middleware)
- Input validation: library (e.g., Zod), coverage (all API endpoints)
- Secrets: storage (env vars), production manager (e.g., AWS Secrets Manager)
- Data: encryption at rest (database) and in transit (HTTPS) status
- Headers: CSP and others (HSTS, X-Frame-Options) configured
- Dependencies: audit frequency (default monthly via npm audit); critical updates within 48h
- Known security issues: list or "none"
- Last security review and penetration testing: date or "Not performed"

## Escalate to Security Professionals

Consult experts for: payment processing implementation, healthcare data handling, authentication system design, encryption implementation, high-risk applications, compliance requirements (PCI-DSS, HIPAA), incident response.