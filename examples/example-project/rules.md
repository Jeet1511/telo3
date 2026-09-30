# Engineering Rules — TaskFlow

> **Last Updated:** 2024-12-20

---

## Core Principles

1. **Server-first** — Prefer server components over client components
2. **Type-safe** — Use TypeScript strictly, avoid `any`
3. **Validate everything** — Never trust client input
4. **Team-scoped queries** — Always filter by teamId for security

---

## File Organization

- **Components:** PascalCase (`TaskCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Directories:** kebab-case (`task-board/`)
- **One component per file**

---

## Naming Conventions

- **Components:** `TaskBoard`, `UserProfile`
- **Functions:** `getUserTeams()`, `validateEmail()`
- **Constants:** `MAX_TEAM_SIZE`, `DEFAULT_STATUS`
- **Boolean:** `isLoading`, `hasAccess`

---

## TypeScript

- Use `strict: true`
- Prefer `interface` for objects
- Avoid `any` (use `unknown` if needed)
- Define props interfaces

```typescript
interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
}
```

---

## React / Next.js

- **Prefer Server Components** unless interactivity needed
- **Client components** only when using state, effects, event handlers
- Mark client components with `'use client'` directive
- Keep client components small and focused

---

## Validation

- Use Zod for all API input validation
- Validate on server (client validation is UX, not security)
- Define schemas in `lib/validations.ts`

```typescript
const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(['todo', 'in_progress', 'done']),
});
```

---

## Security

- **Never skip authorization checks**
- Always check team membership before data access
- Filter queries by teamId
- Hash passwords with bcrypt
- Use HttpOnly cookies for sessions
- Validate file uploads (when added)

```typescript
// Every protected API route:
const session = await getServerSession();
if (!session) throw new UnauthorizedError();

const isMember = await checkTeamMembership(session.user.id, teamId);
if (!isMember) throw new ForbiddenError();
```

---

## Privacy

- Collect minimal data (email, name only)
- Self-host fonts (no Google Fonts)
- Use Vercel Analytics (privacy-friendly)
- No session replay tools
- Document all third-party services

---

## Database

- Use Prisma for all queries
- Always use parameterized queries (Prisma handles this)
- Add `teamId` filter to all team-scoped queries
- Use transactions for multi-step operations

```typescript
const tasks = await prisma.task.findMany({
  where: { teamId, status },
});
```

---

## Error Handling

- Use try-catch in API routes
- Return appropriate HTTP status codes
- Log errors server-side (not client-facing)
- Don't expose stack traces to users

---

## Testing

- Write tests for business logic
- Test API authorization (team access)
- Test edge cases (empty states, max limits)
- Use Vitest for unit tests

---

## Git

- Branch naming: `feature/task-drag-drop`, `fix/auth-redirect`
- Commit messages: `feat: add task filtering`, `fix: team invite bug`
- Don't commit secrets or `.env` files
- Run `pnpm lint` before committing

---

## Performance

- Optimize images (use Next.js Image component)
- Lazy load heavy components
- Use Server Components to reduce client JS
- Avoid unnecessary re-renders (React.memo sparingly)

---

## Accessibility

- Use semantic HTML (`<button>` not `<div onClick>`)
- Keyboard navigation works
- ARIA labels for icon-only buttons
- Color contrast meets WCAG AA
- Focus indicators visible

---

## Project-Specific Rules

- **Team size limit:** 10 members (free tier)
- **Task title:** Max 200 characters
- **Task description:** Max 2000 characters
- **Status values:** `todo`, `in_progress`, `done` (lowercase snake_case)

---

**Remember:** Security and privacy are not optional. Validate input. Check authorization. Protect user data.
