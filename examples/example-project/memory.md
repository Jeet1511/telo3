# Project Memory — TaskFlow

> **Last Updated:** 2024-12-20

---

## Current State

**Project status:** MVP nearing completion (90%)  
**Current phase:** Polish & launch prep  
**Active work:** Email notifications, UI polish  
**Last deployed:** Production v0.9.0 (2024-12-15)

---

## Recently Completed Work

### 2024-12-15: Team Member Management
- Added ability to remove team members
- Implemented admin/member roles
- Added team settings page
- **Impact:** Teams can now manage membership

### 2024-12-10: Google OAuth
- Integrated NextAuth.js with Google provider
- Simplified signup flow
- **Impact:** 60% of new users choose Google OAuth

### 2024-12-08: Mobile Responsive Design
- Implemented mobile-friendly board layout
- Added touch-friendly interactions
- **Impact:** Usable on mobile devices

---

## Important Decisions

### 2024-12-01: Three Fixed Columns
**Decision:** MVP uses To Do, In Progress, Done (fixed)  
**Rationale:** Simplicity for small teams; custom columns add complexity  
**DO NOT reverse without:** User research showing clear demand  
**Status:** Active

### 2024-11-20: Team-Scoped Data Access
**Decision:** All database queries must filter by teamId  
**Rationale:** Security by default; prevents accidental cross-team data leaks  
**DO NOT reverse without:** Architectural redesign  
**Status:** Active — Critical security pattern

### 2024-11-15: No File Storage (MVP)
**Decision:** No file attachments in MVP  
**Rationale:** Storage costs, security complexity, MVP focus  
**Plan:** Add post-MVP if users request  
**Status:** Active

---

## Known Issues

### Critical
- **Touch drag-and-drop broken on mobile Safari**
  - Impact: Mobile users can't drag tasks
  - Workaround: Use dropdown to change status
  - Plan: Fix using touch event library (Week of 2024-12-22)

### Non-Critical
- Task titles >50 chars overflow cards (need truncation)
- Modal doesn't close on Escape in Safari
- Invite emails sometimes flagged as spam

---

## Known Limitations

- **No real-time updates** — Using 30-second polling; Server-Sent Events planned
- **10-member team limit** — Free tier constraint
- **No offline support** — Requires internet connection

---

## Technical Debt

- **Real-time updates:** Polling works but inefficient; need SSE or WebSocket
- **Error handling:** Need error boundaries and better user messages
- **API rate limiting:** Not implemented yet (risk of abuse)

---

## Security Considerations

### Implemented Controls
- Password hashing with bcrypt (rounds: 10)
- Team-scoped authorization on all API routes
- HttpOnly cookies for sessions
- Input validation with Zod
- HTTPS enforced (Vercel)

### Security Decisions
- **Session storage:** JWT in HttpOnly cookies (XSS protection)
- **Team access:** Middleware checks membership on every API call
- **Google OAuth:** Trusted provider, reduces password management risk

### Security TODOs
- [ ] Add rate limiting (especially auth endpoints)
- [ ] Audit dependency vulnerabilities monthly
- [ ] Add CSRF tokens (if moving beyond cookies)

---

## Privacy Considerations

### Data Collection
- Email, name (required for account)
- Task data (owned by team)
- Analytics: Vercel Analytics (privacy-friendly, no cookies)

### Third-Party Services
- **Google:** OAuth provider (email, name, profile picture)
- **Resend:** Email service (recipient email for transactional emails)
- **Neon:** Database hosting (all data encrypted at rest)
- **Vercel:** Hosting (logs, analytics)

### Privacy Decisions
- **Self-hosted fonts (Inter)** — No Google Fonts to avoid third-party requests
- **No session replay tools** — Invasive for simple task app
- **Privacy-friendly analytics** — Vercel Analytics (no personal data tracking)

---

## Legal & Compliance

### Minimum Age
**Age:** 16+  
**Enforcement:** Terms of service, no age gate currently  
**Rationale:** Not targeting children; small teams are typically adults

### Privacy Policy
**Status:** Draft complete, needs legal review  
**Content:** Data collection, third-parties, retention, deletion

### Terms of Service
**Status:** Draft complete, needs legal review

### Data Deletion
**Implemented:** Users can delete account in settings  
**Behavior:** Account and all personal data deleted within 30 days

---

## Pending Questions

- [ ] Should we add task priorities (High/Medium/Low)?
- [ ] What's the right pricing for paid tier? ($10/month/team?)
- [ ] Should email notifications be real-time or daily digest?

---

## Temporary Workarounds

- **Mobile drag-and-drop:** Users can use status dropdown instead (until touch events fixed)
- **No real-time:** 30-second polling for updates (until SSE implemented)

---

## Project-Specific Preferences

### Code Preferences
- Prefer Server Components over Client Components
- Always validate input with Zod
- Always filter database queries by teamId

### Design Preferences
- Simple, functional design over trendy aesthetics
- No unnecessary animations
- Consistent spacing using Tailwind scale

### Process Preferences
- Test authorization logic for every API route
- Review security implications before merging auth changes
- Update tasks.md weekly

---

## Important Discoveries

### User Behavior
- Users prefer Google OAuth over email/password (60% vs 40%)
- Most teams have 3-5 members (not hitting 10-member limit)
- Mobile usage: 30% of sessions (higher than expected)

### Technical Insights
- Server Components significantly reduced client JS bundle
- Prisma middleware great for enforcing teamId filter globally
- NextAuth.js v5 has learning curve but powerful

---

## Onboarding Notes

### Getting Started
```bash
pnpm install
cp .env.example .env.local
# Fill in environment variables
pnpm prisma migrate dev
pnpm dev
```

### Common Pitfalls
- Don't forget to filter by teamId in new API routes
- Always use HttpOnly cookies (security)
- Test drag-and-drop on actual touch devices (not just DevTools)

---

## Important Don'ts

❌ **Don't remove teamId filter** — Critical security boundary  
❌ **Don't add features without PRD update** — Prevents scope creep  
❌ **Don't commit `.env` files** — Contains secrets  
❌ **Don't store passwords in plaintext** — Always use bcrypt  

---

## Context for AI Agents

### Always Check
- authorization.ts — Team access patterns
- validations.ts — Input validation schemas
- Project context docs before making changes

### Preferred Patterns
- Server Components by default
- Zod validation for all API input
- Prisma for all database queries

### Avoid
- Client-side authorization checks only
- Unvalidated user input
- Direct SQL queries (use Prisma)

---

**Summary:** TaskFlow is a simple, security-focused task manager for small teams. Prioritize security, simplicity, and user experience over features.
