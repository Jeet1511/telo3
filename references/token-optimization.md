# Token Optimization
**Load when:** diagnosing context bloat, inefficient reads, or interpreting token-loading estimates.

Do what's needed. Skip what's not. Communicate concisely. Fewer tokens, same quality — measure, don't assume.

## Two-Layer Architecture

| Layer | What | When loaded | Cost |
|---|---|---|---|
| Core + host bridges | One compact core in AGENTS.md, tiny pointers in other host files; installed by chat file tools or activate | Host loads at session start/resume | Character-estimated core budget: 320 tokens for tested paths; long paths can add overhead |
| Skill + references | Full SKILL.md and reference docs | On demand, per task, via the map below | Only what the task needs |

`telo3 deactivate` removes the bootstrap block. Keep the bootstrap lean; push detail into on-demand references.

## CLI

| Command | Purpose |
|---|---|
| `telo3 install [dir] [--agent <host>]` | Copy a durable, discoverable project skill; no cache dependency |
| `telo3 init [dir] [--context-dir <name>]` | Scaffold the six context documents |
| `telo3 validate [dir] [--json] [--strict]` | Check required sections/structure |
| `telo3 status [dir]` | Show context-system state |
| `telo3 context <task> [dir] [--measure]` | Select task-relevant docs; `--measure` reports token counts |
| `telo3 activate [dir]` | Install the bootstrap block into instruction files |
| `telo3 deactivate [dir]` | Remove the bootstrap block |
| `telo3 version` | Print CLI version |

`context <task> --measure` estimates tokens as ceil(characters / 4). Compare selective docs + required refs with ALL six docs + those SAME refs. It measures input length, not actual model/API usage; do not call estimates observed token savings. Missing selected context is reported and detected secrets are redacted.

## Selective Loading Map (memory.md always first)

| Task | Context docs | Extra references (references/<name>.md) |
|---|---|---|
| feature | memory, prd, architecture, rules | — |
| bugfix | memory, architecture, rules | — |
| design | memory, design, rules | ui-quality |
| security | memory, architecture, rules | security-quality, privacy-compliance |
| privacy | memory, architecture | privacy-compliance, legal-compliance |
| legal | memory, prd | legal-compliance |
| accessibility | memory, design | accessibility-quality |
| seo | memory, design | seo-quality, performance-quality |
| performance | memory, architecture | performance-quality |
| docs | memory | document-specification |
| audit | all six | project-audit |
| all | all six | — |
| default/unknown | memory only | — |

## Reading Discipline

- Don't re-read unchanged files already in context.
- Read only affected code: files you will modify + their imports/dependencies.
- Skip unrelated files: other features, tests (unless testing), config (unless changing it), docs (unless updating them).
- Locate with grep/file search; read specific line ranges instead of whole files when only one function is needed.
- Skim structure first; deep-read only relevant sections.

## Verification (corrected rule)

Verifying changed behavior before claiming done is REQUIRED — run/execute the change, check edge cases and related-feature regressions. What you skip is re-verifying unrelated, unchanged code.

| Situation | Verification |
|---|---|
| Any behavior change | Verify the change before claiming done |
| Bug fix | Reproduce → fix → verify fix + no regressions |
| Critical code (auth, payments, security) | Thorough checks; run relevant tests |
| User requests tests, or a failure is mentioned | Run the relevant suite |
| Trivial change (typo, comment, styling) | Quick check of the change itself; no full suite |
| Unchanged, unrelated code | Skip — trust existing working code |

## Task Size

| Size | Read | Plan | Verify | Update | Response |
|---|---|---|---|---|---|
| Tiny (1 file, obvious) | Affected file | None | The change | memory.md | 2–3 sentences |
| Small/medium (few files) | memory + relevant doc + affected files | Brief outline | Change + critical paths | memory + tasks (+ changed docs) | Brief structured summary |
| Large/complex | Context subset per map + affected code | Scoped plan; clarify missing consequential decisions | Relevant critical paths | Affected docs only | Result + evidence + gap |

## Communication Contract

Concise by default: result → changes → verification. No filler, no restating the request, no narrating tool calls, no excessive apologies or flowery language, no long explanations of obvious things.

Default report:

```
Login redirect fixed.
Changed: auth.ts (null check).
Verified: login + redirect executed; works.
Docs: memory.md, tasks.md updated.
```

Spend tokens on: relevant code, clear concise updates, decisions/tradeoffs, error explanations, security/privacy considerations, clarification when truly unclear.

### Concise by default (auto)

Ultra-concise is the DEFAULT for vibe coding — no keyword required. Short sentences, facts only, result → evidence → gap ("Done. Tested. Works."). No filler, no restating, no narrating tools. Expand to full explanation only when the user asks or the task is genuinely complex. "Caveman mode" is simply this default made explicit; it no longer needs to be requested.

## Tool Selection

Tiny change → read exact file. Pattern/similar code → grep. Unknown location → file search. Single edit → string replace; related edits → multiple edits; full rewrite → write file.

## Pattern Shortcuts

| Request | Flow |
|---|---|
| Fix typo | Read file → fix → check change → done |
| Update button color | design.md → update → verify rendering |
| Add form field | Read form → add with validation → verify |
| Fix bug | Read → fix → verify → memory.md |
| Refactor | Read → plan → confirm with user → refactor incrementally, verifying |

## Anti-Loop & Stop Conditions

Dumb loops are the biggest token sink. Enforce:
- **2-strike rule:** after 2 failed attempts at the same approach, change approach or escalate — never retry identically a 3rd time.
- **No re-reads:** don't re-read unchanged files or re-run unchanged checks; reuse prior results from context/memory.
- **Bounded discovery:** one targeted search/read per question; stop when the answer is found; don't crawl.
- **Cache:** record discovered tools/facts/decisions in memory.md so future sessions skip re-discovery.
- **Exit criteria:** define "done" before starting; stop when met, not when exhausted.

## Self-Check

- Read only necessary files? Skipped redundant (not required) verification?
- Response short unless complex? Only changed docs updated? No redundant explanations?
- Estimate context-loading cost with `telo3 context <task> --measure`; report actual API usage only if the host exposes it.
