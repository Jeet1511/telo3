# Legal & Compliance Awareness

> **IMPORTANT:** This is a decision-support and engineering tool, NOT legal advice. This system helps identify potentially applicable legal/compliance considerations but does NOT replace qualified legal counsel. Always verify current legal requirements with appropriate professionals before claiming compliance.

---

## Core Principles

### 1. Identify, Don't Invent
- Identify potentially applicable laws and regulations
- Do NOT invent legal requirements
- Do NOT invent penalties or fines
- Do NOT claim universal legal rules

### 2. Distinguish Types of Requirements
- **Technical requirement:** Something that can be implemented in code
- **Legal requirement:** Something required by law (varies by jurisdiction)
- **Best practice:** Recommended but not legally required
- **Assumption:** Needs verification

### 3. Verify Before Claiming
- Do NOT claim "legally compliant" without proper verification
- Do NOT hardcode penalties that change over time
- Do NOT assume one jurisdiction's rules apply globally
- Do NOT pretend regulations are simpler than they are

### 4. Recommend Legal Review
When legal compliance matters:
- Recommend consulting qualified legal counsel
- Document what was implemented (technical)
- Note what requires legal verification
- Distinguish engineering from legal advice

---

## Legal Compliance Process

```
1. Identify Product Functionality
   └─> What does the product do?

2. Identify Potentially Regulated Features
   └─> Age gates, emails, subscriptions, user content, etc.

3. Identify Relevant Jurisdictions
   └─> Where are users located? Where is the business?

4. Research Applicable Requirements
   └─> What laws might apply? (COPPA, CAN-SPAM, etc.)

5. Distinguish Technical vs. Legal
   └─> What can code solve? What needs lawyer review?

6. Implement Technical Controls
   └─> Build required functionality

7. Document Compliance Responsibilities
   └─> What still needs legal/business verification?

8. Recommend Legal Review
   └─> Advise consulting qualified counsel
```

---

## Common Compliance Areas

### Age Restrictions & Children's Privacy

#### When Applicable
- Service can be used by children
- Service collects personal information
- Service has age-based restrictions

#### U.S. Consideration: COPPA (Children's Online Privacy Protection Act)
- **Applies when:** Service directed to children under 13, or actual knowledge of children under 13
- **Key requirements (if applicable):**
  - Privacy policy
  - Parental notice
  - Parental consent for data collection
  - Parental access to child's information
  - Data security
  - Data retention/deletion

#### Technical Controls to Consider
- Age verification or age gate
- Parental consent mechanism
- Privacy policy
- Data minimization for children
- Deletion mechanism

#### What to Document
```markdown
## Age Restrictions

**Minimum age:** [e.g., 13, 16, 18, or "No restriction"]
**Age verification:** [Implemented / Not required]
**Parental consent:** [Implemented if required / Not applicable]
**Children's data handling:** [Describe approach]

**Legal review needed:** [Yes/No]
```

#### Critical Notes
- **Do NOT hardcode "$43,280 per violation"** or any specific fine
- **Do NOT claim** COPPA requirements without verifying jurisdiction and applicability
- **Do verify** current FTC guidance if COPPA may apply
- **Do distinguish** between actual requirements and precautionary measures

---

### Marketing Emails

#### When Applicable
- Service sends promotional/marketing emails
- Service sends commercial messages

#### U.S. Consideration: CAN-SPAM Act
- **Applies when:** Commercial messages sent to U.S. recipients
- **Key requirements (if applicable):**
  - Clear sender identification
  - Accurate "From," "To," and routing information
  - Non-deceptive subject lines
  - Message identified as advertisement where required
  - Valid physical postal address
  - Clear opt-out mechanism
  - Honor opt-outs promptly (10 business days)

#### Technical Controls to Consider
- Unsubscribe link in emails
- Unsubscribe processing system
- Suppression list
- Sender identification
- Physical address in footer
- Consent tracking

#### What to Document
```markdown
## Marketing Emails

**Email types:** [Transactional / Marketing / Both]
**Unsubscribe mechanism:** [Implemented / Not applicable]
**Sender identification:** [Configured]
**Physical address:** [Required and included / Not applicable]
**Consent mechanism:** [Describe]

**Legal review needed:** [Yes/No]
```

#### Critical Notes
- **Do NOT hardcode "$46,517 per email"** or any specific penalty
- **Do NOT assume** CAN-SPAM is the only applicable email law
- **Do verify** whether GDPR, CASL (Canada), or other laws apply
- **Do distinguish** transactional from marketing emails

---

### Subscriptions & Auto-Renewals

#### When Applicable
- Recurring billing
- Subscription plans
- Automatic renewals
- Free trials that convert to paid

#### U.S. State Laws (e.g., California automatic renewal laws)
- Various U.S. states have automatic renewal disclosure requirements
- Requirements vary by state

#### Potential Requirements
- Clear disclosure of subscription terms
- Clear disclosure of automatic renewal
- Clear cancellation method
- Renewal reminders (in some jurisdictions)
- Cancellation processing

#### Technical Controls to Consider
- Prominent display of:
  - Price
  - Billing frequency
  - Renewal terms
  - Trial duration and conversion
  - Cancellation method
- Accessible cancellation mechanism
- Renewal confirmation
- Receipts

#### What to Document
```markdown
## Subscriptions

**Subscription types:** [List plans]
**Auto-renewal:** [Yes/No]
**Disclosure location:** [Where terms are shown]
**Cancellation method:** [Describe]
**Trial handling:** [Describe if applicable]

**Legal review needed:** [Yes - specific jurisdictions]
```

#### Critical Notes
- **Do NOT assume** California law applies everywhere
- **Do NOT hardcode** specific state requirements as universal
- **Do verify** applicable state/country requirements
- **Do ensure** material terms are clear at signup

---

### User-Generated Content & Copyright

#### When Applicable
- Users can upload files (images, videos, documents, code)
- Users can post content
- Platform hosts third-party content

#### U.S. Consideration: DMCA Safe Harbor (17 U.S.C. § 512)
- Provides liability protection for online service providers under specific conditions

#### Potential Requirements for DMCA Safe Harbor
- Designated DMCA agent
- Agent registration with U.S. Copyright Office
- Public availability of agent contact information
- Notice-and-takedown process
- Counter-notice process
- Repeat infringer policy
- No actual knowledge of infringement
- No financial benefit from infringement

#### Technical Controls to Consider
- Copyright policy
- DMCA agent designation
- Takedown request form
- Content flagging system
- Repeat infringer tracking
- User content licensing terms

#### What to Document
```markdown
## User-Generated Content

**Content types:** [Images, videos, text, etc.]
**Copyright policy:** [Exists / Needed]
**DMCA agent:** [Designated / Required / Not applicable]
**Takedown process:** [Implemented / Planned]
**Repeat infringer policy:** [Implemented / Planned]

**Legal review needed:** [Yes]
```

#### Critical Notes
- **Do NOT claim** automatic safe harbor protection
- **Do NOT hardcode** "$6 registration fee" (fees change)
- **Do verify** current U.S. Copyright Office requirements
- **Do NOT assume** DMCA applies outside the U.S.
- **Do understand** safe harbor has specific technical and procedural requirements

---

### Privacy & Data Protection

See `privacy-compliance.md` for detailed privacy considerations.

Key areas:
- Personal data collection transparency
- Third-party data sharing
- Cookie/tracking consent
- Data retention and deletion
- Cross-border data transfers
- Privacy policy

---

## Implementation Checklist

### For ANY Regulated Feature

- [ ] Identify the feature type (age restriction, email, subscription, user content, etc.)
- [ ] Research potentially applicable laws
- [ ] Identify relevant jurisdictions
- [ ] Distinguish technical requirements from legal requirements
- [ ] Implement necessary technical controls
- [ ] Document what was implemented
- [ ] Document what requires legal verification
- [ ] Recommend legal review to user
- [ ] Never claim "compliant" without proper verification

---

## Documentation Template

When documenting compliance considerations:

```markdown
## [Compliance Area: e.g., Marketing Emails]

### Feature Description
[What the product does]

### Potentially Applicable Laws
- [Law 1: e.g., CAN-SPAM (U.S.)]
- [Law 2: e.g., GDPR (EU) if applicable]
- [Note: Verify applicability with legal counsel]

### Technical Controls Implemented
- [Control 1: e.g., Unsubscribe link in all marketing emails]
- [Control 2: e.g., Suppression list processing]

### Remaining Compliance Responsibilities
- [ ] Verify applicable jurisdiction-specific requirements
- [ ] Review consent mechanisms with legal counsel
- [ ] Confirm physical address requirement
- [ ] Verify transactional vs. marketing classification

### Legal Review Status
- [ ] Not started
- [ ] In progress
- [ ] Complete

### Notes
[Additional context]
```

---

## Critical Guardrails

### What AI Agents MUST DO

✅ Identify regulated functionality  
✅ Research potentially applicable laws  
✅ Implement technical controls where appropriate  
✅ Document compliance considerations  
✅ Distinguish technical from legal requirements  
✅ Recommend legal counsel when compliance matters  
✅ Verify current requirements from authoritative sources when accuracy matters  

### What AI Agents MUST NOT DO

❌ Claim "legally compliant" without verification  
❌ Invent legal requirements  
❌ Hardcode penalties or fines as permanent facts  
❌ Assume one jurisdiction's rules apply globally  
❌ Pretend to be a lawyer or law firm  
❌ Make definitive legal conclusions  
❌ Give legal advice  

---

## Jurisdiction Considerations

### United States
- Federal laws (COPPA, CAN-SPAM, DMCA, etc.)
- State laws (California, Virginia, Colorado privacy laws, etc.)
- Industry-specific regulations (HIPAA, GLBA, etc.)

### European Union
- GDPR (General Data Protection Regulation)
- ePrivacy Directive
- Digital Services Act
- AI Act (emerging)

### Other Jurisdictions
- Canada: PIPEDA, CASL
- UK: UK GDPR, DPA 2018
- Australia: Privacy Act
- Brazil: LGPD
- Many others

**Key point:** Requirements vary by jurisdiction. Never assume universal rules.

---

## When to Escalate to Legal Counsel

Recommend legal review when:

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

---

## Summary

This skill system helps AI agents:

1. **Identify** potentially applicable legal/compliance considerations
2. **Implement** appropriate technical controls
3. **Document** compliance efforts
4. **Recommend** legal review when appropriate
5. **Never pretend** to be a lawyer

**Remember:**
- This is engineering guidance, not legal advice
- Laws vary by jurisdiction
- Requirements change over time
- Verify with qualified legal counsel
- Document what you implement
- Don't fabricate compliance claims

**Goal:** Prevent common legal oversights while acknowledging the limits of AI legal knowledge.
