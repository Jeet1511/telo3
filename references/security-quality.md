# Security Quality Standards

> Security audit framework and best practices for AI agents.

---

## Security Audit Framework

### 1. Authentication
- [ ] Passwords are hashed (bcrypt, scrypt, Argon2)
- [ ] Never store plaintext passwords
- [ ] Session management is secure
- [ ] Rate limiting on auth endpoints
- [ ] Password reset is secure (token expiration, one-time use)
- [ ] MFA available if appropriate

### 2. Authorization
- [ ] Permissions checked on every request
- [ ] Authorization at API level (not just UI)
- [ ] Principle of least privilege
- [ ] Resource ownership validated
- [ ] Role-based access control if applicable

### 3. Input Validation
- [ ] All user input is validated
- [ ] Server-side validation (don't trust client)
- [ ] Type validation
- [ ] Length/bounds validation
- [ ] Format validation (email, URL, etc.)
- [ ] Use schema validation libraries (Zod, Yup, Joi)

### 4. Injection Prevention
- [ ] SQL injection: Use parameterized queries or ORM
- [ ] NoSQL injection: Validate and sanitize
- [ ] Command injection: Avoid shell execution with user input
- [ ] XSS: Encode output, use CSP headers
- [ ] Path traversal: Validate file paths

### 5. Secrets Management
- [ ] No secrets in code
- [ ] Use environment variables
- [ ] Use secret managers for production
- [ ] No secrets in logs
- [ ] No secrets in error messages
- [ ] Rotate secrets regularly

### 6. Session Security
- [ ] HttpOnly flag on cookies
- [ ] Secure flag on cookies (HTTPS)
- [ ] SameSite attribute for CSRF protection
- [ ] Reasonable session expiration
- [ ] Session invalidation on logout

### 7. API Security
- [ ] HTTPS everywhere
- [ ] Rate limiting
- [ ] CORS configured correctly
- [ ] Security headers (CSP, X-Frame-Options, etc.)
- [ ] Content-Type validation
- [ ] Authentication required where appropriate

### 8. Data Security
- [ ] Sensitive data encrypted at rest
- [ ] Sensitive data encrypted in transit
- [ ] PII handled appropriately
- [ ] No sensitive data in logs
- [ ] Secure file uploads
- [ ] Access controls on data

### 9. Dependencies
- [ ] Dependencies kept updated
- [ ] Regular security audits (`npm audit`, Dependabot)
- [ ] Minimize dependencies
- [ ] Review new dependencies
- [ ] Use lock files

### 10. Error Handling
- [ ] Don't expose stack traces to users
- [ ] Don't expose system details
- [ ] Log errors with context
- [ ] Don't log secrets or PII

---

## Common Vulnerabilities

### SQL Injection
❌ **Vulnerable:**
```javascript
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
```

✅ **Secure:**
```javascript
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [req.params.id]);
```

### XSS (Cross-Site Scripting)
❌ **Vulnerable:**
```jsx
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

✅ **Secure:**
```jsx
<div>{userInput}</div> {/* React escapes by default */}
```

### CSRF (Cross-Site Request Forgery)
✅ **Mitigations:**
- CSRF tokens
- SameSite cookie attribute
- Check Origin/Referer headers

### Insecure Direct Object References
❌ **Vulnerable:**
```javascript
// No ownership check
const doc = await getDocument(req.params.id);
return doc;
```

✅ **Secure:**
```javascript
const doc = await getDocument(req.params.id);
if (doc.userId !== req.user.id) {
  throw new UnauthorizedError();
}
return doc;
```

---

## Secrets Management Rules

### Never Commit:
- API keys
- Passwords
- Private keys/certificates
- OAuth client secrets
- Database credentials
- Encryption keys
- Third-party service credentials

### Store Securely:
- Environment variables (development)
- Secret managers (production: AWS Secrets Manager, HashiCorp Vault, etc.)
- .env files (gitignored)

### Document Requirements:
```markdown
## Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT signing (generate random 32+ chars)
- `STRIPE_SECRET_KEY`: Stripe API key from dashboard
```

---

## Security Headers

```javascript
// Example security headers
{
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## Security Checklist

- [ ] Authentication is secure
- [ ] Authorization is enforced
- [ ] Input is validated (server-side)
- [ ] Injection attacks prevented
- [ ] Secrets are not exposed
- [ ] Sessions are secure
- [ ] APIs are protected
- [ ] Data is encrypted
- [ ] Dependencies are audited
- [ ] Errors don't leak information
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] HTTPS enforced
- [ ] CORS configured correctly

---

## Security Documentation Template

```markdown
## Security

### Authentication
- **Method:** [e.g., JWT with bcrypt password hashing]
- **Session management:** [e.g., HttpOnly cookies]
- **Rate limiting:** [Implemented on /api/auth/*]

### Authorization
- **Model:** [e.g., RBAC with roles: user, admin]
- **Enforcement:** [API middleware checks permissions]

### Input Validation
- **Library:** [e.g., Zod for schema validation]
- **Coverage:** [All API endpoints]

### Secrets Management
- **Storage:** [Environment variables]
- **Production:** [AWS Secrets Manager]

### Data Security
- **Encryption at rest:** [Database encryption enabled]
- **Encryption in transit:** [HTTPS enforced]

### Security Headers
- **CSP:** [Configured]
- **Other headers:** [HSTS, X-Frame-Options, etc.]

### Dependencies
- **Audit frequency:** [Monthly via npm audit]
- **Update policy:** [Critical updates within 48h]

### Known Security Issues
- [None currently / List issues]

### Security Review
- **Last security review:** [Date or "Not performed"]
- **Penetration testing:** [Date or "Not performed"]
```

---

## When to Escalate

Consult security professionals for:
- Payment processing implementation
- Healthcare data handling
- Authentication system design
- Encryption implementation
- High-risk applications
- Compliance requirements (PCI-DSS, HIPAA, etc.)
- Incident response

---

**Summary:** Security is not an afterthought. Build it in from the start. Validate input, protect secrets, enforce authorization, encrypt data.
