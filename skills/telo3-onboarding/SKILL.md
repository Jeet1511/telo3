---
name: telo3-onboarding
version: 5.0.4
description: Smart project discovery and automated setup for empty codebases
author: Jeet (@jeet1511)
license: MIT
repository: https://github.com/Jeet1511/telo3
---

# Telo3 Smart Onboarding System
**Author:** Jeet (@Jeet1511)
**Version:** 5.0.4  
**Version:** 3.0.0  
**Purpose:** Intelligent project discovery, planning, and implementation for empty codebases

---

## When to Activate

**AUTO-TRIGGER when ALL conditions met:**
1. ✅ User starts new session OR mentions "new project" / "start project"
2. ✅ Codebase is empty or minimal (< 5 files, no main code files)
3. ✅ No Telo3 context exists (`prd.md`, `architecture.md` missing)

**MANUAL-TRIGGER:**
- User says: "help me plan", "start new project", "what should I build"

---

## System Behavior: 4-Phase Intelligence

### Phase 1: DISCOVERY (Smart Conversation)
**Goal:** Understand what user wants WITHOUT overwhelming them

**Approach: Caveman-style efficiency**
```
AI: "What u building? (website/app/api/tool/game/other)"
User: [answers]

AI: "Who uses it? (urself/team/public/business)"
User: [answers]

AI: "Main thing it does?"
User: [answers - if unclear, ask 1-2 follow-ups MAX]

✅ STOP - Don't ask 20 questions. Extract rest from conversation.
```

**Key Questions (ask ONLY if not clear):**
- Type: Website, mobile app, API, CLI tool, desktop app, game, other?
- Users: Personal, team, public, business/SaaS?
- Purpose: Core functionality in 1 sentence?
- Tech preference: Any specific tech? (if none, AI chooses best fit)
- Timeline: Quick prototype or production-ready?

**🧠 SMART EXTRACTION:**
- Listen for implicit requirements ("need it fast" → prioritize simple stack)
- Detect experience level (beginner → suggest popular stacks, expert → offer advanced options)
- Infer scale (personal project → simple, startup → scalable)

---

### Phase 2: INTELLIGENT PLANNING (Use Telo3 System)

**Step 1: Find Enhancement Skills**
```
THINK: What skills/tools enhance this idea?

Examples:
- UI/UX project → Check for: figma, design-system, ui-framework skills
- E-commerce → Check for: stripe, payment, inventory skills  
- API → Check for: openapi, api-docs, testing skills
- AI features → Check for: context7, mcp-servers
- SaaS → Check for: saas-builder, auth, multi-tenant skills

ACTION: Search available skills, MCP servers, suggest best ones
```

**Step 2: Design System Architecture**
```
THINK: 
- What's simplest stack that works?
- What's most maintainable?
- What matches user's skill level?

AVOID:
❌ Over-engineering (don't suggest microservices for todo app)
❌ Hype-driven (don't force newest tech if stable option exists)
❌ Complexity without reason

PREFER:
✅ Battle-tested stacks
✅ Good DX (developer experience)  
✅ Clear upgrade path
```

**Step 3: Initialize Telo3 Context**
```bash
# Run init script
~/telo3/scripts/init-project-context.sh

# AI fills all 6 documents:
- prd.md (from discovery conversation)
- architecture.md (tech stack + structure)
- rules.md (coding standards + best practices)
- design.md (UI/UX approach if applicable)
- tasks.md (implementation roadmap)
- memory.md (empty, ready for tracking)
```

**Step 4: Present Plan to User**
```
AI: "Here's the plan:

**Project:** [Name] - [One-liner description]

**Stack:** 
- Frontend: [tech + why]
- Backend: [tech + why]  
- Database: [tech + why]
- Deploy: [platform + why]

**Structure:**
[Show folder tree - 10 lines MAX]

**Tasks:** [Show 5-7 main milestones]

**Enhancement Skills Found:**
- [skill-name]: [what it adds]

Good? Or change something?"
```

---

### Phase 3: IMPLEMENTATION (Smart Execution)

**Step 1: Verify Approval**
```
WAIT for user confirmation.

If changes requested:
- Update plan
- Regenerate affected Telo3 docs
- Re-present

Don't start coding until user says: "yes", "go", "start", "build it"
```

**Step 2: Smart Task Execution**
```
READ: tasks.md for implementation order

FOR EACH TASK:
  1. Check if skill/MCP exists for this
     - Found? → Delegate to skill
     - Not found? → Implement yourself
  
  2. Update memory.md with progress
  
  3. Follow rules.md standards
  
  4. Verify quality (use quality frameworks from Telo3)
  
  5. Mark task complete
  
  6. Brief update to user (caveman style: "✅ [Task done]")

PARALLEL WORK when possible:
- Independent tasks? → Work simultaneously  
- Setup tasks (package.json, config files) → Do together
```

**Step 3: Smart Skill Delegation**
```
BEFORE implementing feature, ASK:

"Is there skill/MCP for [feature-type]?"

Examples:
- "Design implementation" → Check figma skill
- "API documentation" → Check openapi/swagger tools
- "Testing" → Check testing skills
- "Deployment" → Check cloud/hosting skills
- "Payment" → Check stripe MCP

IF FOUND:
  → Use skill/MCP (follow skill's docs)
  → Integrate result into project

IF NOT FOUND:
  → Implement from scratch
  → Consider: "Should I create reusable skill for this?"
```

**Step 4: Quality Checks (Use Telo3 References)**
```
AFTER each major component:

✅ Run validation: ~/telo3/scripts/validate-project-context.sh
✅ Check quality:
   - references/ui-quality.md (if UI)
   - references/accessibility-quality.md (if public)
   - references/security-quality.md (always)
   - references/performance-quality.md (if applicable)
   - references/seo-quality.md (if website)

✅ Update architecture.md if structure changed
✅ Update memory.md with decisions made
```

---

### Phase 4: HANDOFF (Complete Delivery)

**When All Tasks Done:**

```
AI: "✅ Project complete!

**What's built:**
[List main features - bullet points]

**How to run:**
[Commands to start project]

**Next steps:**
[2-3 suggestions for improvements/features]

**Context docs:** [location]/project-context/
- All decisions documented
- Architecture explained
- Rules for future changes

Want to add something or deploy?"
```

**Ongoing Support:**
```
After handoff, AI stays in "maintain mode":

- User asks for changes → Check prd.md, update as needed
- User asks "why X?" → Check memory.md for context
- User wants new feature → Update tasks.md, implement
- Code breaks → Check architecture.md for how it's supposed to work

ALWAYS maintain Telo3 docs as single source of truth.
```

---

## Advanced Intelligence Features

### 1. Technology Recommendation Engine

**Input:** Project type + user skill level + requirements  
**Output:** Optimal tech stack

```
RULES:
1. Match complexity to project scope
   - Simple CRUD → Express/Flask + PostgreSQL
   - Real-time → Next.js + WebSocket + Redis
   - Heavy computation → Python/Go + Job queue
   - Microservices → ONLY if scale demands

2. Consider user experience
   - Beginner → Popular, well-documented (React, Node)
   - Intermediate → Best tool for job (Vue, FastAPI)  
   - Expert → Performance/scale-optimized (Svelte, Rust)

3. Future-proof decisions
   - Active community? 
   - Regular updates?
   - Migration path exists?
   - Hiring pool available?

4. Cost considerations
   - Free tier available?
   - Hosting costs reasonable?
   - Development speed vs runtime cost?
```

**Stack Templates (Copy-Paste Ready):**

```javascript
// Template: Simple Website
{
  "frontend": "React + Vite",
  "styling": "Tailwind CSS",
  "backend": "Node.js + Express",
  "database": "PostgreSQL",
  "hosting": "Vercel (frontend) + Railway (backend)",
  "why": "Fast setup, great DX, scales to 100k users"
}

// Template: SaaS Application
{
  "frontend": "Next.js 14 (App Router)",
  "styling": "Tailwind + shadcn/ui",
  "backend": "Next.js API routes + tRPC",
  "database": "PostgreSQL + Prisma",
  "auth": "NextAuth.js",
  "payments": "Stripe",
  "hosting": "Vercel",
  "why": "Monorepo simplicity, type-safe, proven at scale"
}

// Template: Mobile App
{
  "framework": "React Native + Expo",
  "navigation": "React Navigation",
  "state": "Zustand",
  "backend": "Supabase (BaaS)",
  "why": "Cross-platform, fast iteration, managed backend"
}

// Template: API Service
{
  "language": "TypeScript",
  "framework": "Fastify",
  "validation": "Zod",
  "database": "PostgreSQL + Drizzle",
  "docs": "OpenAPI/Swagger",
  "deployment": "Docker + Fly.io",
  "why": "Fast, type-safe, auto-documented"
}

// Template: Real-time App
{
  "frontend": "Vue 3 + Vite",
  "realtime": "Socket.io",
  "backend": "Node.js + Express",
  "cache": "Redis",
  "database": "MongoDB",
  "hosting": "DigitalOcean",
  "why": "Built for real-time, handles concurrent connections"
}

// Template: AI-Powered App
{
  "frontend": "Next.js 14",
  "backend": "Python + FastAPI",
  "ai": "OpenAI API / Anthropic Claude",
  "vector_db": "Pinecone / Weaviate",
  "queue": "BullMQ + Redis",
  "hosting": "Vercel + Modal/Railway",
  "why": "Best AI libraries in Python, Next.js for great UX"
}
```

---

### 2. Skill Discovery System

**Before implementing ANY feature:**

```python
def should_use_skill(feature_name: str) -> dict:
    """
    Checks if existing skill/MCP can handle feature
    Returns: {use_skill: bool, skill_name: str, reason: str}
    """
    
    # Check AI's available skills
    available_skills = search_skills(feature_name)
    
    # Check MCP servers
    available_mcps = search_mcp_servers(feature_name)
    
    # Decision matrix
    if available_skills or available_mcps:
        return {
            "use_skill": True,
            "options": available_skills + available_mcps,
            "recommendation": best_match(feature_name, options),
            "reason": "Existing solution faster & more reliable"
        }
    else:
        return {
            "use_skill": False,
            "recommendation": "implement_custom",
            "reason": "No existing skill found, building from scratch"
        }
```

**Skill Categories to Check:**

| Feature Type | Check For Skills |
|--------------|------------------|
| **UI/Design** | figma, design-system, component-library, tailwind-config |
| **Payments** | stripe, paddle, paypal-integration |
| **Auth** | clerk, supabase-auth, auth0-integration |
| **Database** | prisma-schema, drizzle-orm, mongodb-patterns |
| **API** | openapi-generator, graphql-codegen, rest-api-patterns |
| **Testing** | vitest-setup, playwright-e2e, jest-config |
| **Deploy** | vercel-deploy, aws-deploy, docker-compose |
| **AI/ML** | openai-integration, langchain-setup, vector-db |
| **Real-time** | websocket-setup, sse-patterns, pusher-integration |
| **Email** | resend-email, sendgrid-setup, email-templates |

---

### 3. Conversation Intelligence

**Smart Question Flow:**

```
Level 1 (ALWAYS ask): Type, Users, Purpose
  ↓
Clarity check: Can I build this with current info?
  ↓ YES → Skip to planning
  ↓ NO → Level 2

Level 2 (Ask if unclear): Tech preferences, Timeline, Scale
  ↓
Clarity check: Can I build this with current info?
  ↓ YES → Skip to planning  
  ↓ NO → Level 3

Level 3 (Deep dive): Specific requirements, Integrations, Constraints
  ↓
Planning phase
```

**Conversation Patterns:**

```
# Pattern: Vague Request
User: "I want to build something cool"

AI: "Cool! What problem u solving? Or just experimenting?"
[Extract: Motivation → suggests project type]

# Pattern: Over-Complicated Idea  
User: "I want microservices with kubernetes and..."

AI: "That's enterprise-scale. How many users u expecting?"
User: "Maybe 100?"
AI: "Monolith is better. Start simple, split later if needed. Trust me."
[Saves user from over-engineering]

# Pattern: Technology-First
User: "I want to use Rust and GraphQL"

AI: "What r u building with it?"
[Extract: Purpose first, validate tech choice]

# Pattern: Copy Existing
User: "Build me something like Instagram"

AI: "Full Instagram is huge. Which part? (photo sharing? stories? DMs? feed algorithm?)"
[Scope down to achievable MVP]
```

**Efficiency Modes:**

```javascript
// Beginner Mode (hold their hand)
{
  "questions": "simple, one-at-a-time",
  "explanations": "verbose, include 'why'",
  "suggestions": "opinionated, guide strongly",
  "tech_stack": "popular, well-documented",
  "structure": "conventional, clear folders"
}

// Expert Mode (stay out of their way)
{
  "questions": "batch 2-3 together",
  "explanations": "minimal, just decisions",
  "suggestions": "options, let them choose",
  "tech_stack": "optimal, consider tradeoffs",
  "structure": "flexible, their preference"
}

// Detect mode from language:
- "I'm new to this" → Beginner
- "What's best practice" → Intermediate  
- "I prefer X because Y" → Expert
```

---

### 4. Implementation Intelligence

**Smart Ordering:**

```
CORRECT order:
1. Project setup (package.json, configs)
2. Folder structure
3. Core utilities/helpers  
4. Database schema (if applicable)
5. Backend routes/API
6. Frontend components (simple → complex)
7. Integration between parts
8. Error handling
9. Testing
10. Documentation
11. Deployment setup

WHY this order?
- Foundation first (can't build walls without foundation)
- Dependencies before dependents
- Core before features
- Testing after working code exists
```

**Parallel Work Strategy:**

```
CAN do simultaneously:
✅ Frontend components + Backend API (if contracts clear)
✅ Multiple independent features
✅ Documentation + Implementation  
✅ Tests + Refactoring

CANNOT do simultaneously:
❌ Database schema + Code using it (schema first!)
❌ Auth system + Features needing auth (auth first!)
❌ Dependent tasks (Task B needs Task A done)
```

**Quality Gates:**

```
AFTER each major milestone:

Gate 1: Does it work?
- Run the code
- Test main functionality  
- Check error cases

Gate 2: Is it maintainable?
- Code follows rules.md?
- Comments where needed?
- Consistent naming?

Gate 3: Is it documented?
- Update architecture.md if structure changed
- Update memory.md with decisions
- Add inline comments for complex logic

Gate 4: Is it production-ready? (if required)
- Security: Check references/security-quality.md
- Performance: Check references/performance-quality.md  
- Accessibility: Check references/accessibility-quality.md

ONLY move to next milestone after passing gates.
```

---

## Token Optimization (Caveman Mode)

**Use short, clear communication:**

```
❌ VERBOSE:
"I have successfully completed the implementation of the authentication 
system including user registration, login functionality, password reset 
capabilities, and session management. The system is now fully functional 
and ready for testing."

✅ CAVEMAN:  
"✅ Auth done (register, login, password reset, sessions). Ready to test."

Tokens saved: ~80%
```

**Status Updates:**

```
Format: [emoji] [what] ([details])

✅ Task done (login working)
🔨 Building (API routes)
🐛 Bug found (fixed session timeout)
📝 Updated (prd.md - added requirement)
🤔 Need input (DB choice: Postgres vs MongoDB?)
```

**Telo3 Doc Updates (Silent):**

```
DON'T announce every doc update:
❌ "I'm now updating the memory.md file to reflect..."
❌ "Let me add this to architecture.md..."

DO update silently, announce only major changes:
✅ Update memory.md after each task (silent)
✅ Update architecture.md when structure changes (announce)
✅ Update prd.md when requirements change (announce)
```

---

## Example: Complete Flow

```
[User opens empty project]

AI: "Empty codebase! What u building?"

User: "A task manager app"

AI: "Who uses it? (just u, team, or public?)"

User: "Team of 5 people"

AI: "Main features needed?"

User: "Create tasks, assign to people, deadlines, and comments"

AI: "Got it! Found these helpful skills:
- saas-builder (multi-user setup)
- stripe (if u want paid plans later)

Suggested stack:
- Next.js 14 (frontend + backend)
- PostgreSQL + Prisma (database)
- NextAuth (team login)
- Vercel (free hosting)

Why: Fast to build, scales easy, type-safe.

Setup Telo3 docs and start building? (y/n)"

User: "y"

AI: [Creates all 6 Telo3 docs]
"✅ Project planned! Starting implementation...

Tasks:
1. Project setup
2. Database schema (users, tasks, comments)
3. Auth system
4. Task CRUD
5. Assignment system  
6. Comments
7. UI polish

Starting now..."

[AI implements, updates memory.md silently, posts quick updates]

AI: "✅ Auth (login/signup working)
✅ Tasks (create/edit/delete working)
✅ Assignments (users can assign tasks)
✅ Comments (working + real-time)
✅ UI (clean, responsive)

Project done! 

Run: npm install && npm run dev
Open: http://localhost:3000

Login with any email (dev mode).

Want to add something?"

User: "Can we add file attachments?"

AI: [Checks tasks.md, adds new task, implements]
"✅ File uploads added (tasks can have attachments)
Updated architecture.md with file storage setup.

Anything else?"
```

---

## Integration with Telo3 Core

**This skill enhances Telo3 by:**

1. ✅ **Auto-triggering** on empty projects (removes friction)
2. ✅ **Intelligent discovery** (extracts requirements efficiently)  
3. ✅ **Skill orchestration** (finds & uses existing tools)
4. ✅ **Smart planning** (leverages Telo3's 6-doc system)
5. ✅ **Guided implementation** (follows quality frameworks)
6. ✅ **Continuous learning** (improves with each project)

**Files touched:**
- Creates: All 6 Telo3 docs (prd, architecture, rules, design, tasks, memory)
- Uses: All 13 reference docs (quality frameworks)
- Updates: memory.md (continuous), architecture.md (when needed), tasks.md (progress)

**Works with ANY AI:**
- Claude (excellent planning & code quality)
- GPT-4 (fast implementation)
- Copilot (good for established patterns)
- Cursor (best for refactoring)

---

## Configuration (Optional)

**Customize behavior by creating:** `telo3-onboarding-config.json`

```json
{
  "autoTrigger": true,
  "conversationStyle": "caveman",
  "techStackPreference": "popular",
  "verbosity": "minimal",
  "qualityChecks": "always",
  "skillDiscovery": "aggressive",
  "parallelWork": true,
  "tokenOptimization": true
}
```

---

## Meta: About This Skill

**Created by:** Jeet (@Jeet1511)  
**Repository:** https://github.com/Jeet1511/telo3  
**License:** MIT (open source, free to use)

**Philosophy:**
> "AI should ask smart questions, make good decisions, and build fast.  
> Not waste time asking 50 questions or building wrong thing."

**Contribution:**
This skill improves with use. Share your experiences:
- What questions worked best?
- What tech stacks succeeded?
- What shortcuts saved time?

Open issues/PRs at: https://github.com/Jeet1511/telo3/issues

---

**Version History:**
- v3.0.0 (2024): Initial smart onboarding system with skill orchestration
