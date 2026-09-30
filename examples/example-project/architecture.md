# Architecture Documentation — TaskFlow

> **Purpose:** System architecture for TaskFlow task management platform  
> **Last Updated:** 2024-12-20

---

## Architecture Overview

### System Summary
TaskFlow is a full-stack web application built on Next.js with server-side rendering, PostgreSQL database, and real-time updates via Server-Sent Events.

### Architecture Diagram
```
┌──────────────┐      ┌─────────────────┐      ┌────────────────┐
│   Browser    │─────▶│   Next.js App   │─────▶│   PostgreSQL   │
│   (Client)   │◀─────│   (SSR + API)   │◀─────│   (Neon)       │
└──────────────┘      └─────────────────┘      └────────────────┘
                              │
                              ▼
                      ┌─────────────────┐
                      │  Vercel Hosting │
                      └─────────────────┘
```

### Core Principles
- Server-side rendering for SEO and performance
- API routes for data mutations
- Real-time updates for collaboration
- Team-based data isolation (security)

---

## Technology Stack

### Runtime & Language
- **Language:** TypeScript
- **Runtime:** Node.js 20
- **Package Manager:** pnpm

### Frontend
- **Framework:** React 18
- **Meta-framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui (Radix primitives)
- **State Management:** React Context + Server State (Next.js)
- **Form Handling:** React Hook Form + Zod validation

### Backend
- **Framework:** Next.js API Routes
- **API Style:** REST
- **Validation:** Zod schemas

### Database
- **Primary Database:** PostgreSQL 16 (hosted on Neon)
- **ORM:** Prisma
- **Migrations:** Prisma Migrate

### Authentication
- **Provider:** NextAuth.js v5
- **Methods:** Email/password (bcrypt), Google OAuth
- **Session:** JWT stored in HttpOnly cookies

### External Services
- **Email:** Resend (transactional emails)
- **Hosting:** Vercel
- **Database:** Neon (serverless Postgres)
- **Analytics:** Vercel Analytics (privacy-friendly)

### Development Tools
- **TypeScript:** Yes
- **Linting:** ESLint
- **Formatting:** Prettier
- **Testing:** Vitest (unit), Playwright (E2E planned)

---

## Project Structure

```
taskflow/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, signup)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components (shadcn)
│   │   ├── tasks/            # Task-related components
│   │   └── teams/            # Team-related components
│   ├── lib/                   # Shared utilities
│   │   ├── db.ts             # Prisma client
│   │   ├── auth.ts           # Auth utilities
│   │   └── validations.ts    # Zod schemas
│   └── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
└── project-context/           # Project documentation (Telo3)
```

---

## Data Model

```
User ──< TeamMember >── Team ──< Task
```

### Key Entities

#### User
- **Fields:** id, email, passwordHash, name, createdAt
- **Relationships:** Many TeamMembers
- **Access Control:** Users see only their own profile

#### Team
- **Fields:** id, name, createdAt
- **Relationships:** Many TeamMembers, Many Tasks
- **Access Control:** Team members can access team data

#### TeamMember
- **Fields:** id, userId, teamId, role (admin/member), joinedAt
- **Relationships:** Belongs to User and Team
- **Access Control:** Determines team access

#### Task
- **Fields:** id, teamId, title, description, assigneeId, status, createdAt, updatedAt
- **Relationships:** Belongs to Team, optionally assigned to User
- **Access Control:** Team members can CRUD team tasks

---

## API Structure

### REST Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/auth/signup` | POST | Create account | No |
| `/api/auth/login` | POST | Login | No |
| `/api/teams` | GET | List user's teams | Yes |
| `/api/teams` | POST | Create team | Yes |
| `/api/teams/:id/members` | POST | Invite member | Yes (admin) |
| `/api/tasks` | GET | List team tasks | Yes |
| `/api/tasks` | POST | Create task | Yes |
| `/api/tasks/:id` | PATCH | Update task | Yes |
| `/api/tasks/:id` | DELETE | Delete task | Yes |

### Authorization

All `/api/tasks/*` and `/api/teams/*` routes check:
1. User is authenticated
2. User is member of the team
3. For admin actions: User has admin role

---

## Security Architecture

### Authentication Flow
1. User submits credentials
2. Server validates with bcrypt (or OAuth)
3. Server generates JWT
4. JWT stored in HttpOnly cookie
5. Subsequent requests include JWT automatically

### Authorization
- Middleware checks JWT on protected routes
- API handlers validate team membership
- Database queries filter by teamId (prevents cross-team access)

### Security Boundaries
- **Public:** Landing page, login, signup
- **Authenticated:** Dashboard, teams, tasks
- **Admin:** Team management, member invites

---

## Deployment

### Build Process
```bash
pnpm install
pnpm run build
```

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth.js session secret |
| `NEXTAUTH_URL` | Application URL |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `RESEND_API_KEY` | Email service |

### Deployment Strategy
- **Platform:** Vercel (Git-based deployment)
- **Environments:** Preview (PR), Production (main branch)
- **Rollback:** Revert Git commit, redeploy

### Database Migrations
```bash
# Create migration
pnpm prisma migrate dev --name migration_name

# Apply to production
pnpm prisma migrate deploy
```

---

## Architectural Decisions

### 2024-12-01: Next.js App Router
**Decision:** Use Next.js 14 App Router (not Pages Router)  
**Rationale:** Server components, improved performance, future-forward  
**Alternatives:** Pages Router (more mature ecosystem)  
**Status:** Accepted

### 2024-11-20: Team-Scoped Data Access
**Decision:** All queries filter by teamId at database level  
**Rationale:** Security by default, prevents accidental cross-team data exposure  
**Alternatives:** Application-level checks only (riskier)  
**Status:** Accepted

---

## Technical Debt

- [ ] **No real-time updates yet** — Using polling every 30s; need Server-Sent Events or WebSockets
- [ ] **Limited error handling** — Need better error boundaries and user-facing messages
- [ ] **No caching strategy** — Could benefit from React Query or SWR

---

## Known Limitations

- **No offline support** — Requires internet connection
- **Limited scalability** — Current architecture suitable for <1000 teams

---

## Document History

| Date | Author | Changes |
|------|--------|---------|
| 2024-12-20 | Alex | Updated with current implementation |
| 2024-11-15 | Alex | Initial version |
