# Privacy & Data Protection Compliance

> Guidelines for identifying and addressing privacy considerations. This is NOT legal advice—verify requirements with qualified counsel.

---

## Core Privacy Principles

1. **Data Minimization** — Collect only what's needed
2. **Transparency** — Be clear about data practices
3. **User Control** — Give users control over their data
4. **Security** — Protect data appropriately
5. **Accountability** — Document decisions and practices

---

## Privacy Audit Framework

### Step 1: Identify Data Collection

**What data is collected?**
- Account information (email, name, password)
- Profile information
- User-generated content
- Usage data (pages visited, features used)
- Technical data (IP address, browser, device)
- Location data
- Analytics data
- Cookie data

### Step 2: Identify Purpose

**Why is each type collected?**
- Essential for service operation
- Improve user experience
- Analytics and insights
- Marketing and communication
- Legal/compliance requirements

### Step 3: Identify Third-Party Sharing

**What services receive data?**
- Authentication providers (Auth0, Clerk, etc.)
- Analytics (Google Analytics, Plausible, etc.)
- Error tracking (Sentry, etc.)
- Email services (SendGrid, Resend, etc.)
- Payment processors (Stripe, etc.)
- Hosting providers (Vercel, AWS, etc.)
- CDNs and external resources
- Session replay tools (FullStory, LogRocket, etc.)

### Step 4: Assess Privacy Sensitivity

**High sensitivity (extra care needed):**
- Children's information
- Health information
- Financial information
- Biometric data
- Precise location
- Authentication credentials
- Private communications

**Medium sensitivity:**
- Email addresses
- Names
- IP addresses
- Usage patterns
- Non-precise location

**Low sensitivity:**
- Anonymous aggregate statistics
- Public information

---

## Critical Privacy Safeguards

### A. Children's Privacy

**If children can use the service:**

✅ **Do:**
- Determine minimum age requirement
- Implement age verification if required
- Obtain parental consent where legally required
- Minimize data collection from children
- Document children's data practices

❌ **Don't:**
- Knowingly collect children's data in violation of applicable law
- Assume all users are adults
- Ignore children's privacy laws (e.g., COPPA in U.S.)

**Documentation:**
```markdown
## Children's Privacy

**Minimum age:** [Age or "No restriction"]
**Age verification:** [Implemented / Not required]
**Children's data collected:** [List or "None knowingly"]
**Parental consent:** [Required and implemented / Not applicable]
**Applicable laws:** [e.g., COPPA (U.S.) if applicable]
**Legal review needed:** Yes
```

---

### B. Third-Party Fonts & External Resources

**Privacy risk:** External fonts/resources may disclose IP addresses and referrers to third parties.

**Audit:**
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
- Adobe Fonts
- Font Awesome CDN
- External CSS/JS
- Third-party images

**Privacy-friendly approaches:**
1. **Self-host fonts** when practical
2. **Use system fonts** (no external request)
3. **Document unavoidable third-party requests**
4. **Check licensing** for self-hosting

**Documentation:**
```markdown
## External Resources

**Fonts:** [Self-hosted / System fonts / Google Fonts with disclosure]
**CDNs:** [List]
**Third-party scripts:** [List]
**Privacy implication:** [IP addresses shared with: ...]
```

✅ **Good:** "Using system font stack to avoid third-party requests"  
✅ **Good:** "Self-hosting Inter font for privacy"  
❌ **Bad:** Claiming external fonts are illegal universally  

---

### C. Session Replay & Recording Tools

**Tools:** FullStory, LogRocket, Hotjar, Microsoft Clarity, etc.

**Privacy risks:**
- Records user interactions
- May capture sensitive input
- May record across sessions
- Shares data with third-party

**Before enabling:**

✅ **Do:**
- Mask password fields
- Mask payment information
- Mask sensitive personal data (SSN, health info, etc.)
- Exclude authentication secrets
- Configure privacy settings appropriately
- Determine if consent is required
- Document in privacy policy

❌ **Don't:**
- Enable invasive recording by default
- Record sensitive inputs
- Ignore provider privacy settings
- Assume consent is not required

**Documentation:**
```markdown
## Session Replay

**Tool:** [Name or "Not implemented"]
**What is recorded:** [Describe]
**Sensitive data handling:** [Masked / Excluded]
**User consent:** [Required / Opt-out provided / Not applicable]
**Privacy policy disclosure:** [Yes / Needed]
**Legal review needed:** Yes
```

---

### D. Analytics & Tracking

**Types:**
- Page analytics (page views, referrers)
- Event tracking (button clicks, features used)
- User identification
- Cross-site tracking
- Advertising tracking

**Privacy considerations:**

**Privacy-friendly analytics:**
- Plausible Analytics (no cookies, no personal data)
- Simple Analytics
- Fathom Analytics
- Self-hosted Matomo (configured appropriately)

**Privacy-concerning analytics:**
- Google Analytics (especially Universal Analytics)
- Facebook Pixel
- Third-party advertising trackers

**Requirements to consider:**
- Cookie consent (GDPR, ePrivacy)
- Do Not Track (optional respect)
- Opt-out mechanisms
- Data retention limits
- IP anonymization

**Documentation:**
```markdown
## Analytics

**Tools:** [List]
**Data collected:** [Describe]
**Personal data:** [Yes/No, describe]
**Cookies used:** [Yes/No, list]
**Consent mechanism:** [Implemented / Not required]
**Privacy policy disclosure:** [Yes / Needed]
```

---

### E. Cookies & Local Storage

**Audit:**
- Essential cookies (authentication, security)
- Analytics cookies
- Marketing cookies
- Third-party cookies
- LocalStorage usage
- SessionStorage usage

**Categories:**
- **Strictly necessary:** Essential for service operation
- **Functional:** Enhance user experience
- **Analytics:** Understand usage patterns
- **Advertising/Marketing:** Personalized ads

**Consent requirements:**
- EU/EEA: Consent required for non-essential cookies (GDPR/ePrivacy)
- Other jurisdictions: Varies

**Documentation:**
```markdown
## Cookies

**Essential cookies:** [List with purpose]
**Analytics cookies:** [List with purpose and consent requirement]
**Marketing cookies:** [List with purpose and consent requirement]
**Consent mechanism:** [Implemented / Not required]
**Cookie policy:** [Exists / Needed]
```

---

### F. Data Retention & Deletion

**Retention questions:**
- How long is data kept?
- Why is it kept that long?
- Is retention documented?
- Is old data automatically deleted?

**Deletion questions:**
- Can users delete their accounts?
- What happens to user data after deletion?
- Is deletion immediate or scheduled?
- Are backups also deleted (or excluded)?

**Best practices:**
- Define retention periods
- Implement automated deletion where appropriate
- Provide user-initiated deletion
- Document deletion procedures

**Documentation:**
```markdown
## Data Retention & Deletion

**Retention periods:**
- Account data: [Duration or "Until deletion"]
- Usage logs: [Duration]
- Backups: [Duration]

**User deletion:**
- Account deletion: [Available / Planned]
- Deletion process: [Describe]
- Data erasure: [Immediate / Within X days]
- Backups: [Excluded from future backups / Retained until backup expires]
```

---

### G. Data Security

**Technical controls:**
- Encryption in transit (HTTPS)
- Encryption at rest (database encryption)
- Access controls (authentication, authorization)
- Secrets management (not hardcoded)
- Secure session management
- Input validation
- Output encoding

**See `security-quality.md` for detailed security guidance.**

---

## Privacy-by-Design Checklist

- [ ] Minimize data collection (collect only what's needed)
- [ ] Document data collection purpose
- [ ] Identify all third-party data recipients
- [ ] Assess data sensitivity
- [ ] Implement appropriate security controls
- [ ] Provide transparency (privacy policy)
- [ ] Obtain consent where required
- [ ] Implement data retention limits
- [ ] Support user data deletion
- [ ] Mask sensitive data in logs and analytics
- [ ] Self-host resources when practical for privacy
- [ ] Configure third-party services for privacy
- [ ] Respect user privacy preferences

---

## Privacy Policy Requirements

**A privacy policy should disclose:**
- What information is collected
- Why it's collected
- How it's used
- Who it's shared with (third parties)
- How long it's retained
- User rights (access, deletion, etc.)
- How to contact about privacy
- How the policy may change

**Important:** The privacy policy must reflect actual practices. Don't copy-paste a generic policy.

---

## Cross-Border Data Transfers

**If users are in different countries:**
- Understand where data is stored (US, EU, etc.)
- Understand where data is processed
- Consider GDPR (EU data protection)
- Consider adequate protection mechanisms (Standard Contractual Clauses, etc.)

---

## Consent Mechanisms

**When consent may be required:**
- Non-essential cookies (GDPR)
- Marketing emails (various laws)
- Sensitive data processing
- Children's data (parental consent)
- Cross-border transfers (some cases)

**Consent should be:**
- Informed (clear explanation)
- Specific (not bundled)
- Freely given (not forced)
- Easily withdrawn

**Consent mechanisms:**
- Cookie consent banner
- Email opt-in checkboxes
- Granular privacy settings
- Account settings toggles

---

## Privacy Compliance Checklist

### Data Mapping
- [ ] Identify all data collected
- [ ] Document purpose for each data type
- [ ] Identify third-party recipients
- [ ] Assess sensitivity

### Technical Controls
- [ ] Implement appropriate security
- [ ] Mask sensitive data in logs
- [ ] Configure third-party privacy settings
- [ ] Self-host privacy-sensitive resources when practical

### User Control
- [ ] Provide privacy policy
- [ ] Implement consent mechanisms where required
- [ ] Provide data access (where required)
- [ ] Provide data deletion

### Documentation
- [ ] Document data practices
- [ ] Document third-party services
- [ ] Document retention periods
- [ ] Document security controls

### Legal Review
- [ ] Identify applicable privacy laws
- [ ] Verify jurisdiction-specific requirements
- [ ] Review privacy policy with counsel
- [ ] Verify consent mechanisms

---

## Privacy Documentation Template

```markdown
## Privacy & Data Protection

### Data Collection

**Personal data collected:**
- Email address (account creation)
- Name (optional profile)
- [Other]

**Purpose:** [Why each type is collected]

### Third-Party Services

**Services that receive data:**
- [Service name]: [Data shared] — [Purpose]
- [Service name]: [Data shared] — [Purpose]

### Sensitive Data

**High-sensitivity data:** [None / List]
**Special handling:** [Describe]

### Children

**Minimum age:** [Age or "No restriction"]
**Children's data:** [Not knowingly collected / Describe if applicable]

### Data Retention

**Retention periods:**
- Account data: [Duration]
- Logs: [Duration]

**Deletion:** [User can delete account: Yes/No]

### Security

**Controls:**
- HTTPS (encryption in transit)
- Database encryption (encryption at rest)
- [Other controls]

### Privacy Policy

**Status:** [Exists / Draft / Needed]
**Last reviewed:** [Date]

### Consent Mechanisms

**Cookies:** [Consent banner implemented / Not required]
**Marketing emails:** [Opt-in required / Not applicable]

### Legal Review

**Applicable laws:** [GDPR, CCPA, etc. if known]
**Legal review needed:** [Yes/No]
**Status:** [Not started / In progress / Complete]
```

---

## Summary

**Privacy is not just legal compliance—it's user trust.**

**Key principles:**
1. Collect only what you need
2. Be transparent about data practices
3. Protect data appropriately
4. Give users control
5. Document your approach

**Remember:**
- This is engineering guidance, not legal advice
- Privacy laws vary by jurisdiction
- Requirements change over time
- Verify with qualified legal/privacy counsel
- Never fabricate compliance claims

**Goal:** Build privacy-respectful products that earn user trust and minimize legal risk.
