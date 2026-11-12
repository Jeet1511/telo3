# Legal & Compliance Awareness
**Load when:** building age gates, marketing emails, subscriptions/auto-renewals, user-generated content, or any feature touching personal data or regulated industries.

Engineering guidance and decision support, not legal advice. Identify potentially applicable laws; never replace qualified counsel. Laws vary by jurisdiction and change over time — verify current requirements before claiming compliance.

## Core Rules

- Identify, don't invent: no invented legal requirements, no invented penalties/fines, no claimed universal legal rules.
- Classify every requirement: **technical** (implementable in code) / **legal** (required by law, jurisdiction-dependent) / **best practice** (recommended, not legally required) / **assumption** (needs verification).
- Never claim "legally compliant" without proper verification and evidence.
- Never hardcode penalties, fines, or fees as permanent facts (they change); verify current figures from authoritative sources (e.g., FTC, U.S. Copyright Office) when accuracy matters.
- Never assume one jurisdiction's rules apply globally; never pretend regulations are simpler than they are.
- Never pose as a lawyer or law firm, give legal advice, or make definitive legal conclusions.
- Recommend qualified counsel when compliance matters; document what was implemented (technical) vs. what still needs legal verification.

## Process

1. Identify product functionality.
2. Flag potentially regulated features (age gates, emails, subscriptions, user content).
3. Identify jurisdictions: where users are located, where the business is.
4. Research potentially applicable laws (COPPA, CAN-SPAM, etc.).
5. Distinguish technical requirements from legal requirements.
6. Implement technical controls.
7. Document remaining compliance responsibilities (legal/business verification).
8. Recommend legal review.

## Compliance Areas

### Children / Age Restrictions — COPPA (U.S.)
- Applies when: service directed to children under 13, or actual knowledge of users under 13. Verify jurisdiction and applicability; check current FTC guidance if COPPA may apply.
- Requirements if applicable: privacy policy; parental notice; parental consent for data collection; parental access to child's information; data security; data retention/deletion.
- Technical controls: age gate/verification; parental consent mechanism; privacy policy; data minimization for children; deletion mechanism.
- Distinguish actual requirements from precautionary measures; never hardcode per-violation fines.
- Record: minimum age (e.g., 13/16/18 or "no restriction"), age verification, parental consent, children's data handling, legal review needed.

### Marketing Emails — CAN-SPAM (U.S.)
- Applies when: commercial messages sent to U.S. recipients. Not the only email law — verify whether GDPR, CASL (Canada), or others apply. Distinguish transactional from marketing emails.
- Requirements if applicable: clear sender identification; accurate From/To/routing information; non-deceptive subject lines; message identified as advertisement where required.
- Also required: valid physical postal address; clear opt-out mechanism; honor opt-outs promptly (within 10 business days).
- Technical controls: unsubscribe link; unsubscribe processing system; suppression list; sender identification; physical address in footer; consent tracking.
- Never hardcode per-email penalties.
- Record: email types (transactional/marketing/both), unsubscribe mechanism, sender ID, address inclusion, consent mechanism, legal review needed.

### Subscriptions & Auto-Renewals — U.S. state laws (e.g., California)
- Applies when: recurring billing, subscription plans, automatic renewals, free trials converting to paid. Requirements vary by state/country; never treat California law as universal or hardcode state requirements as global.
- Potential requirements: clear disclosure of subscription terms, automatic renewal, and cancellation method; renewal reminders (some jurisdictions); cancellation processing. Material terms clear at signup.
- Technical controls: prominent display of price, billing frequency, renewal terms, trial duration/conversion, cancellation method; accessible cancellation mechanism; renewal confirmations; receipts.
- Record: plans, auto-renewal (Yes/No), disclosure location, cancellation method, trial handling, jurisdictions needing legal review.

### User-Generated Content — DMCA Safe Harbor (17 U.S.C. § 512, U.S. only)
- Conditional liability protection for online service providers; never claim automatic safe harbor. Safe harbor has specific technical and procedural requirements.
- Conditions: designated DMCA agent registered with the U.S. Copyright Office; publicly available agent contact information; notice-and-takedown process; counter-notice process; repeat infringer policy; no actual knowledge of infringement; no financial benefit from infringement.
- Technical controls: copyright policy; DMCA agent designation; takedown request form; content flagging system; repeat infringer tracking; user content licensing terms.
- Verify current U.S. Copyright Office requirements; never hardcode registration fees (they change); DMCA does not apply outside the U.S.
- Record: content types, copyright policy status, DMCA agent status, takedown process, repeat infringer policy, legal review needed.

### Privacy & Data Protection
- See `privacy-compliance.md`: collection transparency, third-party sharing, cookie/tracking consent, retention/deletion, cross-border transfers, privacy policy.

## Jurisdictions (verify applicability; never assume universal rules)

| Region | Laws to consider |
|---|---|
| U.S. federal | COPPA, CAN-SPAM, DMCA |
| U.S. states | California, Virginia, Colorado privacy laws; state auto-renewal laws |
| U.S. industry-specific | HIPAA, GLBA |
| EU | GDPR, ePrivacy Directive, Digital Services Act, AI Act (emerging) |
| Canada | PIPEDA, CASL |
| UK | UK GDPR, DPA 2018 |
| Australia | Privacy Act |
| Brazil | LGPD |

## Checklist — Any Regulated Feature

- [ ] Feature type identified (age restriction, email, subscription, user content, etc.)
- [ ] Potentially applicable laws researched; relevant jurisdictions identified
- [ ] Technical requirements distinguished from legal requirements
- [ ] Technical controls implemented; changed behavior verified
- [ ] Implemented controls documented; remaining legal/business verification documented
- [ ] Legal review recommended to user
- [ ] No "compliant" claim without proper verification

## Documentation Template (per compliance area)

- Feature description: what the product does
- Potentially applicable laws (e.g., CAN-SPAM U.S.; GDPR EU if applicable) — verify applicability with counsel
- Technical controls implemented (e.g., unsubscribe link in all marketing emails, suppression list processing)
- Remaining responsibilities: jurisdiction-specific requirements, consent review with counsel, physical address confirmation, transactional vs. marketing classification
- Legal review status: Not started / In progress / Complete
- Notes: additional context

## Escalate to Legal Counsel When

- Service collects children's information
- Service sends marketing emails at scale
- Service has recurring billing or subscriptions
- Service hosts user-generated content
- Service collects sensitive personal data (health, financial, biometric)
- Service operates in regulated industries (healthcare, finance)
- Service has cross-border data transfers
- Compliance requirements are unclear
- Penalties for non-compliance are significant
- Business risk tolerance is low