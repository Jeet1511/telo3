# Privacy & Data Protection
**Load when:** collecting personal data, or adding analytics, cookies, fonts/CDNs, third-party services, session replay, children's access, retention/deletion, or privacy-policy work.

Engineering guidance, not legal advice. Privacy laws vary by jurisdiction and change over time; verify current requirements with qualified legal/privacy counsel. Never fabricate compliance claims.

## Principles

1. Data minimization — collect only what's needed
2. Transparency — be clear about data practices
3. User control — give users control over their data
4. Security — protect data appropriately
5. Accountability — document decisions and practices

## Data-Mapping Audit

1. **Inventory collection:** account info (email, name, password), profiles, user-generated content, usage data (pages/features), technical data (IP, browser, device), location, analytics, cookies.
2. **Record purpose per type:** service operation, UX improvement, analytics/insights, marketing/communication, legal/compliance.
3. **List third-party recipients:** auth (Auth0, Clerk), analytics (Google Analytics, Plausible), error tracking (Sentry), email (SendGrid, Resend), payments (Stripe), hosting (Vercel, AWS), CDNs/external resources, session replay (FullStory, LogRocket).
4. **Classify sensitivity:**
   - High (extra care): children's, health, financial, biometric, precise location, authentication credentials, private communications.
   - Medium: email addresses, names, IP addresses, usage patterns, non-precise location.
   - Low: anonymous aggregate statistics, public information.

## Safeguards

### Children's Privacy (e.g., COPPA, U.S.)
- Determine minimum age; implement age verification and parental consent where legally required; minimize and document children's data.
- Never knowingly collect children's data in violation of applicable law; never assume all users are adults; never ignore children's privacy laws.
- Record: minimum age (or "no restriction"), age verification, children's data collected (or "none knowingly"), parental consent status, applicable laws. Legal review needed.

### External Fonts & Resources
- Risk: third-party requests disclose visitor IP addresses and referrers. Audit Google Fonts (fonts.googleapis.com, fonts.gstatic.com), Adobe Fonts, Font Awesome CDN, external CSS/JS, third-party images.
- Prefer self-hosting (check licensing for self-hosting) or system font stacks (no external request).
- Document unavoidable third-party requests: CDNs, scripts, and who receives IP addresses.
- Never claim external fonts are universally illegal.

### Session Replay (FullStory, LogRocket, Hotjar, Microsoft Clarity)
- Risks: records user interactions, may capture sensitive input, may record across sessions, shares data with the provider.
- Mask password fields, payment information, sensitive personal data (SSN, health info); exclude authentication secrets; configure provider privacy settings appropriately.
- Never enable invasive recording by default, record sensitive inputs, ignore provider privacy settings, or assume consent is not required.
- Determine whether consent is required; disclose in privacy policy.
- Record: tool, what is recorded, masking/exclusions, consent status, policy disclosure. Legal review needed.

### Analytics & Tracking
- Scope: page analytics (views, referrers), event tracking, user identification, cross-site tracking, advertising tracking.
- Prefer privacy-friendly: Plausible (no cookies, no personal data), Simple Analytics, Fathom, self-hosted Matomo (configured appropriately).
- Higher risk: Google Analytics (especially Universal Analytics), Facebook Pixel, third-party advertising trackers.
- Apply: cookie consent (GDPR, ePrivacy), optional Do Not Track respect, opt-out mechanisms, data retention limits, IP anonymization.
- Record: tools, data collected, personal data (yes/no), cookies used, consent mechanism, policy disclosure.

### Cookies & Local Storage
- Audit: essential cookies (authentication, security), analytics cookies, marketing cookies, third-party cookies, LocalStorage, SessionStorage.
- Categories: strictly necessary / functional / analytics / advertising-marketing.
- EU/EEA: consent required for non-essential cookies (GDPR/ePrivacy); other jurisdictions vary — verify.
- Record: each cookie/storage item with purpose and consent requirement; consent mechanism; cookie policy status.

### Retention & Deletion
- Define and document retention periods (account data, usage logs, backups); justify each duration; auto-delete old data where appropriate.
- Provide user-initiated account deletion; document the process and what happens to data.
- State whether erasure is immediate or scheduled (within X days) and how backups are handled (excluded from future backups or retained until backup expiry).

### Data Security
- HTTPS in transit; encryption at rest (database); access controls (authentication, authorization); no hardcoded secrets; secure session management; input validation; output encoding.
- Detailed controls: see `security-quality.md`.

## Consent

- May be required for: non-essential cookies (GDPR), marketing emails (various laws), sensitive data processing, children's data (parental consent), some cross-border transfers.
- Must be informed (clear explanation), specific (not bundled), freely given (not forced), easily withdrawn.
- Mechanisms: cookie consent banner, email opt-in checkboxes, granular privacy settings, account settings toggles.

## Cross-Border Transfers

- Know where data is stored and processed (US, EU, etc.); consider GDPR; use adequate protection mechanisms (e.g., Standard Contractual Clauses).

## Privacy Policy

- Disclose: what is collected, why, how used, third-party recipients, retention, user rights (access, deletion), privacy contact, how the policy may change.
- Must reflect actual practices; never copy-paste a generic policy.

## Checklist

**Data mapping**
- [ ] All data identified; purpose documented per type; third-party recipients listed; sensitivity assessed

**Technical controls**
- [ ] Security controls implemented; sensitive data masked in logs and analytics
- [ ] Third-party services configured for privacy; resources self-hosted where practical

**User control**
- [ ] Privacy policy accurate; consent obtained where required; user privacy preferences respected
- [ ] Retention limits implemented; user data access and deletion supported where required

**Documentation**
- [ ] Practices, third parties, retention periods, and security controls documented

**Legal review**
- [ ] Applicable laws identified (e.g., GDPR, CCPA, COPPA); jurisdiction-specific requirements verified
- [ ] Privacy policy and consent mechanisms reviewed with counsel

**Verification**
- [ ] Changed collection/tracking/consent behavior verified (network requests, storage, consent flows); skip re-verification only for unrelated areas

## Documentation Template

```markdown
## Privacy & Data Protection
- Personal data collected: [type → purpose]
- Third-party services: [service → data shared → purpose]
- High-sensitivity data: [none / list]; special handling: [describe]
- Children: minimum age [age / no restriction]; data [not knowingly collected / describe]
- Retention: account data [duration]; logs [duration]; backups [duration]
- Deletion: user can delete account [Yes/No]; process [describe]; erasure [immediate / within X days]; backups [excluded / retained until expiry]
- Security controls: [HTTPS, database encryption, others]
- Privacy policy: [Exists / Draft / Needed]; last reviewed [date]
- Consent: cookies [banner implemented / not required]; marketing emails [opt-in / not applicable]
- Legal: applicable laws [GDPR, CCPA, etc.]; review needed [Yes/No]; status [Not started / In progress / Complete]
```