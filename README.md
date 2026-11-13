# Telo3

A chat-first skill for less AI slop, less wasted context, and continuity between coding sessions. Install in your project, say **telo3** once, then work normally. No mandatory CLI use after installation.

## Install

In your project, run one short command:

```bash
npm i telo3-ai
```

That's it. The install adds the skill to your project and activates the always-on contract automatically (additive, idempotent, never overwrites your files; skips global installs). Then say **telo3** once in your AI chat.

Prefer npx, or a specific builder? `npx telo3-ai` does the same; `npx telo3-ai install --agent qoder` targets a host (`claude`, `cursor`, `gemini`, `copilot`, `codex`, `agents`). Requires Node.js 20+.

The skill is copied into your project, independent of npm's cache. It detects existing Qoder, Claude, Gemini or Cursor folders; otherwise uses the shared `.agents/skills/telo3` directory. Refresh the builder's skill list if it caches discovery. Future sessions resume from project instructions and the short memory summary.

No terminal at all? Copy this package into the project's skill directory as `telo3/` (with `SKILL.md`, references, templates and runtime assets), then say **telo3**. Plain web chat without project-file access cannot persist activation by itself.

## Move to any PC or AI

Everything lives inside your project with relative paths: the skill (`.agents/skills/telo3/` or your host's dir), the contract (`AGENTS.md`), and the context (`project-context/`). Commit those and copy/clone the project to another machine or AI — context and powers travel with it. Verify with `npx telo3-ai check`. On a fresh machine you can also just run `npm i telo3-ai` again.

Prefer one install for every project on a machine? `npx telo3-ai install --global` puts the skill in your user-level skills dir. (Global is per-machine; project-local is what travels.)

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
