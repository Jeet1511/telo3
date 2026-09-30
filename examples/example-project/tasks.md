# Tasks & Implementation Backlog — TaskFlow

> **Last Updated:** 2024-12-20

---

## Current Sprint

### In Progress
- [ ] **Email notifications for task assignments**
  - Priority: High
  - Started: 2024-12-18

---

## MVP Completion (90%)

### Phase 1 — Core Features ✅

- [x] User authentication (email/password)
- [x] Google OAuth integration
- [x] Team creation
- [x] Team member invites
- [x] Task CRUD operations
- [x] Kanban board view
- [x] Drag-and-drop task status
- [x] Task assignment
- [x] Basic responsive design

---

### Phase 2 — Polish & Launch Prep

#### Email Notifications
- [ ] Send email when task assigned
- [ ] Daily digest option
- [ ] Email preferences in settings

#### UI Polish
- [ ] Loading states for all actions
- [ ] Better error messages
- [ ] Empty states (no tasks, no teams)
- [ ] Toast notifications for actions
- [ ] Improve mobile layout

#### Performance
- [ ] Optimize images
- [ ] Add lazy loading
- [ ] Implement caching strategy

#### Testing
- [ ] Unit tests for API routes
- [ ] E2E tests for critical flows
- [ ] Test error handling

#### Documentation
- [ ] User guide
- [ ] Privacy policy
- [ ] Terms of service
- [ ] API documentation (future public API)

#### SEO (landing page)
- [ ] Meta tags
- [ ] Open Graph images
- [ ] Sitemap
- [ ] robots.txt

---

## Post-MVP Features

### High Priority
- [ ] **Task labels/tags** — Categorize tasks
- [ ] **Due dates** — Add deadlines
- [ ] **Task filtering** — Filter by assignee, label, status
- [ ] **Task search** — Full-text search
- [ ] **Activity log** — See who changed what

### Medium Priority
- [ ] **Real-time updates** — Server-Sent Events instead of polling
- [ ] **Task comments** — Discussion threads
- [ ] **File attachments** — Small files (<5MB)
- [ ] **Dark mode** — UI theme toggle
- [ ] **Keyboard shortcuts** — Power user features

### Low Priority
- [ ] **Custom columns** — More than 3 statuses
- [ ] **Task templates** — Reusable task structures
- [ ] **Recurring tasks** — Repeat weekly/monthly
- [ ] **Calendar view** — See tasks by due date
- [ ] **Integrations** — Slack, GitHub webhooks

---

## Known Bugs

### High Priority
- [ ] **Drag-and-drop doesn't work on touch devices** — Need touch event handlers

### Medium Priority
- [ ] **Task modal doesn't close on Escape in Safari** — Browser-specific issue
- [ ] **Long task titles overflow card** — Need text truncation

### Low Priority
- [ ] **Email invite sometimes goes to spam** — SPF/DKIM configuration

---

## Technical Debt

### High Priority
- [ ] **Implement real-time updates** — Currently polling every 30s
- [ ] **Add error boundaries** — Better crash recovery
- [ ] **Improve loading states** — Consistent skeleton UIs

### Medium Priority
- [ ] **Add API rate limiting** — Prevent abuse
- [ ] **Refactor task status logic** — Consolidate in shared utility
- [ ] **Add database indexes** — Optimize common queries

---

## Completed Recently

- [x] **Team member management** — Completed 2024-12-15
- [x] **Google OAuth integration** — Completed 2024-12-10
- [x] **Responsive design for mobile** — Completed 2024-12-08

---

**Focus:** Complete email notifications → Polish UI → Launch MVP
