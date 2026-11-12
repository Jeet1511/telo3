# Smart Skill and MCP Delegation
**Load when:** about to implement a non-trivial capability (payments, auth, design-to-code, browser automation, docs lookup, audits) and deciding whether to delegate.

Core rule: use the right tool for the job. Inspect what actually exists in the CURRENT environment; never assume a tool is available.

## Inspect Before Implementing

Before building a non-trivial capability yourself, check what is actually available:
- Skills: the environment's skill list/directory.
- MCP tools: connected MCP servers and their tool lists.
- Subagents: available agent types and their capabilities.
- Plugins/extensions: installed capability packs.

Ask: does a skill already cover this? Does an MCP tool handle it? Would a subagent do it better? Only then decide. Use real listings and tool metadata — there is no discovery API to call; inspect, then decide.

## Delegate / Don't Delegate

| Delegate when | Do it directly when |
|---|---|
| Specialized knowledge: SEO, accessibility, security, performance audits | Simple, straightforward task |
| Complex domain: legal, medical/health, financial calculations | Context already loaded; faster to do directly |
| Better tooling: design-to-code, API docs, database schemas | No relevant tool exists |
| Current library documentation needed | Setup cost exceeds implementation cost |
| Third-party integration (payments, auth, cloud) with a configured tool | Tiny change (a few minutes of work) |

Never rewrite functionality a tool already provides. Never force delegation for simple work.

## Typical Tool Fits (only if present)

| Need | Tool category (example) |
|---|---|
| Current library docs | Documentation MCP (e.g., context7) |
| Design implementation | Design integration (e.g., Figma MCP/skill) |
| Payments | Payments MCP (e.g., Stripe) |
| Authentication | Auth integration skill/MCP (e.g., provider tooling) |
| Cloud patterns | Cloud knowledge MCP (e.g., AWS) |
| Browser automation | Browser MCP (e.g., Playwright) |
| Pre-built SaaS patterns | SaaS builder skill, if installed |

Examples are illustrative — confirm availability first; fall back to manual work or web search when absent. Prefer current tool-fetched documentation over stale training data.

## Subagent Delegation (if the environment provides them)

| Agent type | Use for | Skip for |
|---|---|---|
| Context gatherer | New codebase; feature spanning many files; cross-module bug investigation; architecture understanding | Single-file changes; code you already know; quick fixes |
| Task executor | Independent subtask parallel to main work; well-defined isolated tasks | Tightly coupled work needing shared state |
| Platform documentation | AI-specific features; configuration questions; platform docs | General programming; project-specific code issues |

## Delegation Scenarios

| Request | Inspect → decide |
|---|---|
| "Implement this Figma design" | Design tool present → extract tokens/components via tool, then integrate + verify. Absent → manual from design.md. |
| "Next.js App Router with auth" | Docs MCP present → fetch current documentation, not stale training data. Absent → web search. |
| "Why is checkout failing?" | Investigation subagent present → delegate end-to-end trace, then fix root cause yourself. Absent → targeted file inspection. |

## Integrate and Verify

Delegation does not transfer accountability. After a tool/subagent returns:
1. Review the output against requirements, rules.md, and design.md.
2. Integrate it into the project yourself (imports, wiring, conventions).
3. Run/verify the changed behavior; check regressions in related features.
4. Update memory.md/tasks.md; record decisions.

## Missing Capability

If the task needs an unavailable tool:
1. State the capability the task needs.
2. Recommend the specific server/skill; show minimal real configuration (e.g., an `mcpServers` entry in the client's MCP config with command/args).
3. Note the reconnect/restart requirement.
4. Let the user choose: configure and delegate, or proceed manually.

Don't install or configure anything without authorization.

## Decision Flow

1. Core coding task? → Do it directly.
2. Specialized skill/MCP/subagent actually available? No → manual.
3. Already configured? Yes → use it.
4. Setup time < task time? Yes → recommend setup, then use. No → manual; note the opportunity for future.

## Recommendation Format

```
Better tool: <name>
Benefit: <concrete improvement>
Setup: <quick steps or "already available">
Use it? (tool vs manual — user chooses)
```

Ultra-concise variant only if the user opted into caveman mode.

## Adaptive Recommendations

- Repeated design-to-code tasks → recommend the design tool; many API integrations → docs MCP; repeated audits → matching quality skill; complex state management → architecture review skill.
- Record in memory.md: recommended skills/tools with their use cases, and MCP servers worth configuring for planned work (as pending items, not assumptions).

## Token Economics

Delegation often saves tokens: automated extraction/generation replaces manual reading of designs, docs, and components. It costs more when setup exceeds implementation, the task is trivial, full context is already loaded, or no suitable tool exists. Measure, don't assume.

## Know Your Limits

Strong: writing code, following patterns, consistency, implementing requirements, refactoring, documentation. Weaker: current library docs, design precision, deep multi-file investigation, specialized domains — recommend the better tool honestly instead of guessing.