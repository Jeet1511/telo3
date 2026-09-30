# Project Memory

> **Purpose:** Track CURRENT STATE — recent work, important decisions, continuity information, and project-specific knowledge.  
> **Last Updated:** [Date]

---

## Current State

### Project Status
**Overall status:** [Not Started / Active Development / MVP Complete / Production / Maintenance]

**Current phase:** [e.g., Phase 2 — Core Features]

**Active work:**
- [What is currently being worked on]
- [Current focus areas]

**Last deployed:** [Date or N/A]

---

## Recently Completed Work

### [Date Range: e.g., Last 2 Weeks]

- **[Date]:** [Completed work item]
  - **Details:** [Brief description of what was done]
  - **Impact:** [How this affects the product]
  - **Files changed:** [Key files if relevant]

- **[Date]:** [Completed work item]

---

## Important Decisions

[Decisions that should not be reversed without careful consideration]

### [Date]: [Decision Title]
**Decision:** [What was decided]  
**Rationale:** [Why this decision was made]  
**Context:** [What was the situation that led to this decision]  
**Alternatives considered:** [What else was considered]  
**Trade-offs:** [What are the downsides]  
**Status:** [Active / Under Review / Superseded]  
**DO NOT reverse without:** [Criteria for reconsidering]

---

## Architectural Decisions

### Current Architecture Choices

- **[Technology/Pattern choice]:** [Why chosen]
  - **Reason:** [Detailed rationale]
  - **Alternatives:** [What was not chosen and why]

---

## Known Issues & Bugs

### Critical
- **[Issue description]**
  - **Impact:** [How this affects users]
  - **Workaround:** [Temporary solution if available]
  - **Plan:** [How/when will this be fixed]

### Non-Critical
- **[Issue description]**
  - **Impact:** 
  - **Priority:** [When this might be addressed]

---

## Known Limitations

[Documented limitations of the current implementation]

- **[Limitation 1]:** [Description]
  - **Reason:** [Why this limitation exists]
  - **Future plan:** [If/when this might be addressed]

- **[Limitation 2]:** [Description]

---

## Technical Debt

[Technical debt that has been explicitly accepted, with context]

- **[Debt item]:**
  - **Introduced:** [When and why was this shortcut taken]
  - **Impact:** [What is the cost of this debt]
  - **Plan:** [When/how should this be addressed]

---

## Temporary Workarounds

[Temporary solutions that should be revisited]

- **[Workaround description]:**
  - **Location:** [Where in code]
  - **Reason:** [Why was this necessary]
  - **Replace with:** [What is the proper solution]
  - **Timeline:** [When should this be addressed]

---

## Important Discoveries

[Findings, insights, or lessons learned during development]

### Technical Discoveries
- **[Discovery]:** [What was learned]
  - **Implication:** [How this affects the project]

### User Insights
- **[Insight]:** [What was learned about users]
  - **Action:** [How this influences design/development]

---

## Security Considerations

[Security-related information that must remain known]

### Implemented Security Controls
- [Control 1: e.g., "Rate limiting on auth endpoints"]
- [Control 2]

### Security Decisions
- **[Decision]:** [e.g., "Using bcrypt for password hashing"]
  - **Reason:** [Why this approach]

### Security TODOs
- [ ] [Security improvement needed]

**IMPORTANT:** Never store secrets, API keys, or credentials in this document.

---

## Privacy Considerations

[Privacy-sensitive functionality and decisions]

### Data Collection
- **Personal data collected:** [Types of data]
- **Purpose:** [Why each type is collected]
- **Retention:** [How long data is kept]

### Third-Party Services
- **[Service name]:** [What data is shared]
  - **Purpose:** [Why this service is used]
  - **Privacy policy:** [Link]

### Privacy Decisions
- **[Decision]:** [e.g., "Self-hosting fonts instead of Google Fonts"]
  - **Reason:** [Why this was chosen]

---

## Legal & Compliance Considerations

> **Note:** This section documents engineering decisions related to legal/compliance considerations, not legal advice.

### Applicable Considerations
- **[Area: e.g., "Age restrictions"]:** [Status and implementation]
- **[Area: e.g., "Email unsubscribe"]:** [Status and implementation]

### Compliance TODOs
- [ ] [Compliance-related task]

**IMPORTANT:** Verify current legal requirements with qualified counsel before claiming compliance.

---

## Pending Questions

[Open questions that need to be resolved]

- [ ] **[Question]:** [What needs to be clarified]
  - **Impact:** [Why this matters]
  - **Owner:** [Who should answer this]

---

## Recent Architectural Changes

[Significant changes to architecture or patterns]

### [Date]: [Change description]
**What changed:** [Description]  
**Why:** [Rationale]  
**Migration status:** [Complete / In Progress / Not Started]  
**Follow-up needed:** [Any remaining work]

---

## Project-Specific Preferences

[Preferences established for this project that differ from defaults or are important to remember]

### Code Preferences
- **[Preference]:** [e.g., "Prefer server components over client components in Next.js"]
  - **Reason:** [Why this preference exists]

### Design Preferences
- **[Preference]:** [e.g., "Avoid shadows on buttons"]
  - **Reason:** [Why this is preferred]

### Process Preferences
- **[Preference]:** [e.g., "Always include tests with new features"]
  - **Reason:** [Why this is important]

---

## Stakeholder Context

[Important context about stakeholders, if applicable]

- **Primary stakeholder:** [Name/Role]
  - **Priorities:** [What matters most to them]
  - **Communication preference:** [How they prefer updates]

---

## Environment-Specific Notes

### Development
- [Important information about dev environment]

### Staging
- [Important information about staging environment]

### Production
- [Important information about production environment]

---

## Integration-Specific Notes

[Notes about external service integrations]

### [Service Name]
- **Account:** [Account information (not credentials)]
- **Configuration:** [Important configuration details]
- **Gotchas:** [Things to watch out for]
- **Docs:** [Link to service documentation]

---

## Performance Notes

[Performance-related observations and decisions]

- **[Observation]:** [Performance finding]
  - **Impact:** [Effect on user experience]
  - **Action taken:** [What was done about it]

---

## Onboarding Notes

[Information helpful for new developers joining the project]

### Getting Started
- [Key information for new team members]

### Common Pitfalls
- **[Pitfall]:** [Common mistake]
  - **Solution:** [How to avoid it]

### Useful Commands
```bash
# [Command description]
npm run [command]
```

---

## Team Agreements

[Agreements the team has made about how to work]

- **[Agreement]:** [e.g., "Always update tasks.md after completing work"]
- **[Agreement]:** [e.g., "Run tests before opening PR"]

---

## Deferred Decisions

[Decisions that have been explicitly deferred]

- **[Decision topic]:**
  - **Why deferred:** [Reason for waiting]
  - **Revisit when:** [Criteria or timeline]

---

## Migration Notes

[If migrating from another system or undergoing significant changes]

### Migration Status
- **From:** [Old system]
- **To:** [New system]
- **Progress:** [X% complete or status]
- **Remaining work:** [What's left]

---

## Monitoring & Observability

[Important information about monitoring and debugging]

### Key Metrics
- **[Metric]:** [Where to find it, what it means]

### Debugging Tips
- **[Tip]:** [Useful debugging information]

---

## Seasonal / Time-Based Notes

[Information that applies at specific times]

- **[Period]:** [Special considerations]

---

## Important Don'ts

[Explicit prohibitions or things to avoid based on past experience]

- ❌ **[Don't do this]:** [Why not]
- ❌ **[Don't do this]:** [Why not]

---

## Context for AI Agents

[Specific guidance for AI coding assistants working on this project]

### Preferred Patterns
- [Pattern AI should follow]

### Avoid
- [Pattern AI should avoid]

### Always Check
- [Files AI should always reference before making changes]

---

## Notes

[Miscellaneous important information that doesn't fit elsewhere]

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| [Date] | [Name] | Initial version |
