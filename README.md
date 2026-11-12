# Telo3

A chat-first skill for less AI slop, less wasted context, and continuity between coding sessions. Install in your project, say **telo3** once, then work normally. No mandatory CLI use after installation.

## Install

Requires Node.js 20+ for the installer; chat activation uses the AI's file tools, not Node.

```bash
npx telo3-ai@6.1.0 install
```

This copies the complete skill into your project, independent of npm's temporary cache. It detects existing Qoder, Claude, Gemini or Cursor project folders; otherwise uses the shared `.agents/skills/telo3` directory.

For a specific host:

```bash
npx telo3-ai@6.1.0 install --agent qoder
# alternatives: claude, cursor, gemini, copilot, codex, agents
```

Then type **telo3** in your AI chat. Refresh the host's skill list if it caches discovery. The AI installs a small project instruction block using its file tools, preserves existing instructions, and confirms once. Future sessions resume from project instructions and the short memory summary.

For manual/no-terminal installation, copy this package into the appropriate project's skill directory as `telo3/`, with `SKILL.md`, references, templates and runtime assets intact. Then say **telo3**. Plain web chat without project-file access cannot persist activation by itself.

Optional direct activation: `npx telo3-ai@6.1.0 activate`. This also creates a durable project skill first.

## Small core, on-demand depth

One compact contract in `AGENTS.md`; other host files contain small pointers, not duplicate full instructions. Domain references load only when needed. The skill is opt-in, not a prompt that hijacks every unrelated project.

Six context documents have separate roles: requirements (`prd.md`), structure (`architecture.md`), engineering (`rules.md`), UI/UX (`design.md`), work (`tasks.md`), handoff (`memory.md`). Reuse existing docs; create only missing context appropriate to substantial work. Memory is a rolling summary, not a transcript or personal memory store.

Keep security/privacy, purposeful design, accessibility and performance checks relevant to the actual change. The 14 references retain detailed guidance without loading every audit every turn. Host permissions and current user scope remain authoritative; the skill cannot override them or guarantee model compliance.

## Optional commands

| Command | Result |
|---|---|
| `install [dir] --agent <host>` | Durable skill installation; preserves user edits |
| `activate [dir] [--all]` | Persistent core + host pointers; repeat-safe |
| `deactivate [dir]` | Remove only Telo3 instruction blocks; keep custom content |
| `init [dir] --context-dir <relative-path>` | Six skeletons; never overwrite existing docs |
| `validate [dir] [--json] [--strict]` | Sections, placeholders, likely secrets and bounded stale scan |
| `status [dir]` | Context health |
| `context <task> [dir] --measure` | Character-based estimate of context-loading reduction |
| `version` | Package version |

Token comparison uses selected docs + task references versus **all six docs + the same references**. It is not an actual model/API token counter. Missing selected docs are reported. Detected credentials are redacted from context output; this is heuristic protection, not complete data-loss prevention.

Installation refuses unmanaged directories or modified installer-owned files. Updates are staged with rollback; backups survive if recovery itself fails. Do not edit skill files concurrently during an update.

## Optional Claude Code hook

`hooks/session-start.example.json` shows opt-in registration. Adjust the command to the installed skill's location. The hook returns only the core from an already-activated project's `AGENTS.md`; it does not silently activate unrelated projects or load all memory. No hooks/settings are installed without user authorization. Host project instructions remain the primary persistence mechanism.

## Release verification (source repository)

```bash
npm test
npm run verify:release
```

The second command packs locally, checks the allowlist, installs the archive offline, and tests the installed CLI, durable skills, hooks, links, idempotency and token baseline. `prepublishOnly` runs both checks. It never publishes or queries credentials.

MIT © Jeet ([@jeet1511](https://github.com/jeet1511)).
