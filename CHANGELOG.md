# Changelog

All notable changes to **Telo3** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Created by:** [Jeet](https://github.com/Jeet1511)  
**Repository:** https://github.com/Jeet1511/telo3

---

## [6.3.0] - 2026-11-12

### Added
- `references/design-system.md`: prescriptive design decision engine for logo, SVG/icons and website (brand-derived type/palette, one real icon set, wordmark-first logo) with a mandatory render→screenshot→critique gate. Routed for design tasks.

### Changed
- Ultra-concise replies are now the automatic default for vibe coding ("caveman auto"); no keyword needed. Expand only on request.
- Always-on core now enforces brand-derived design non-negotiables and the visual gate, alongside the context handoff.

## [6.2.0] - 2026-11-12

### Added
- One short command: `npm i telo3-ai` now installs the skill and activates the contract in the current project via a safe, additive, idempotent post-install (skips global installs and `TELO3_SKIP`; never overwrites user files; never fails the install).
- Bare `npx telo3-ai` performs the same install + activate, as a script-gate-independent fallback.

### Changed
- README/SKILL install instructions lead with `npm i telo3-ai`.

## [6.1.0] - 2026-11-12

Final release preparation; publication remains a separate authorized action.

### Fixed
- Added real project skill installation for shared `.agents/skills` and native Qoder, Claude, Cursor, Gemini and Copilot layouts. Installed skills retain the full runtime and no longer depend on npm's temporary cache.
- Chat-first activation remains supported with file tools alone. One compact core lives in AGENTS.md; host files use small pointers instead of repeating the full payload.
- Corrected token comparisons: selected context and its baseline now include the same task references. Results are labeled character-based estimates, not actual model usage.
- Report missing selected context and prefer complete context over incomplete alternative locations; discover context from nested project directories.
- Redact detected env/JSON credentials and private-key bodies from context output. Improve Markdown fence, reference-link and footnote parsing.
- Preserve user rules and whitespace during activation/deactivation. Stage instruction updates, use exclusive creation and detect concurrent changes.
- Guard traversal, linked ancestors and dangling symlinks. Stage skill upgrades with whole-directory rollback; release install locks after stage errors.
- Warn when stale scanning hits its bounded traversal limit rather than claiming fully verified freshness.
- Include optional hooks in the npm archive; they do not activate unrelated projects. Remove policy/authority and approval-loop contradictions from guidance.

### Release hygiene
- Exclude examples, backups and custom metadata/registries from distribution; originals are archived locally, not destroyed.
- Declare Node 20+ and keep zero runtime dependencies.
- Add a prepublication gate that runs the regression suite and offline packed-package verification. No telemetry, postinstall side effects, automatic hook registration or publishing.

## [6.0.0] - 2026-11-12

Major rebuild: one self-activating skill, a working CLI, and lean on-demand depth.

### Added
- **Always-on activation**: `telo3 activate` / `deactivate` install a ~400-token contract block into `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/telo3.mdc`, `.github/copilot-instructions.md` (`--all` adds Windsurf/Cline). Mention "telo3" once; it persists every session. Idempotent, additive, marker-delimited — never clobbers unrelated content.
- `bootstrap/TELO3.md` core contract with the session-start ritual (memory resets between sessions → read `memory.md` first).
- `references/anti-slop.md` — language/code/design/process/token slop taxonomy, counters, rationalization table, red flags.
- Rebuilt zero-dependency CLI modules (`src/`): init, validate, status, context, tokens, find-context, version, activate.
- Full test suite + `test/helpers.js` (35 tests): context, validation, activation, version-drift guard.
- Optional deterministic `SessionStart` hook (`hooks/inject-contract.mjs`) for Claude-Code-style tools.
- Six lean templates (~50-80 lines) and the missing example `prd.md`.

### Changed
- Consolidated three overlapping skills and byte-identical duplicates into a single `SKILL.md` (~120 lines vs 696).
- Compressed 13 quality references from ~5,285 lines to ~1,376, preserving every concrete rule/threshold/law.
- Templates reduced from ~2,600 lines to ~300; they are skeletons, not questionnaires.
- Version has one source of truth (`package.json`); the drift guard checks the metadata files that carry it.
- Communication is concise by default; "caveman mode" is opt-in, never forced.

### Fixed
- CLI was broken: `cli.js`/`index.js` imported a non-existent `src/`. Rebuilt and tested.
- 12 of 13 references and all 6 templates were missing from the v5.1.0 package. Restored and compressed.
- Windows-incompatible bash scripts replaced by the cross-platform Node CLI.
- Corrected "don't test if not requested" advice: verifying changed behavior is required; only unrelated re-verification is skipped.
- Version drift across files (e.g. schema `softwareVersion`).

### Removed
- Duplicate `AI-CONTEXT.md`, `ONBOARDING-SKILL.md`, `QUICK-START-ONBOARDING.md`, and the `skills/` trio (preserved in `_backup_v5.1.0/`).
- Marketing bloat (social preview, inflated stats, keyword stuffing).

---

## [Unreleased]

### Planned
- Additional language-specific rule templates
- Framework-specific examples (React, Vue, Next.js, Django, etc.)
- Integration guides for popular AI coding assistants
- Video tutorials and documentation
- Community-contributed templates

## [5.1.0] - 2026-11-11

### Added
- Real Node CLI (`telo3 init / validate / status / context / version`) — zero dependencies, cross-platform, replaces the bash-only workflow
- Real validator: required-section checks, placeholder detection, secret scan with line numbers, staleness detection (git or mtime), `--json` and `--strict` modes, CI-ready exit codes
- `telo3 context <task>`: selective context loader with measured per-project token savings (`--measure`)
- `telo3 status`: one-line health summary per document
- Test suite (`npm test`, Node's built-in runner, zero dependencies) covering validator, init, context loader, CLI and version drift
- GitHub Actions CI (Node 20/22/24) + example-project validation on every push/PR

### Changed
- `cli.js` and `index.js` are real implementations; the CLI no longer shells out to bash
- `npm run init` / `npm run validate` now run the Node CLI

### Fixed
- Version drift: the repo claimed 5.0.0, 5.0.1, 5.0.5, 5.0.6 and 5.0.7 in different files. `package.json` is now the single source of truth; `npm test` enforces it
- Removed unmeasured claims from metadata: "80% token savings", "5x speed", five-star rating, and an invented testimonial. Token savings are now measured per project with `telo3 context --measure`

---

## [5.0.0] - 2024-09-30

### 🚀 Major Feature: Smart Onboarding System

**Added:**
- **ONBOARDING-SKILL.md** - Intelligent project discovery and planning system
  - Auto-detects empty projects and initiates smart conversation
  - 4-phase system: Discovery → Planning → Implementation → Handoff
  - Caveman-style efficient questioning (no information overload)
  - Technology recommendation engine with pre-built stack templates
  - Skill discovery system that finds existing tools/MCP servers
  - Smart task ordering and parallel execution
  - Quality gates at each milestone
  - Token-optimized status updates

- **QUICK-START-ONBOARDING.md** - Quick reference guide for onboarding feature
  - Usage examples for developers and AI assistants
  - Configuration options
  - Troubleshooting guide
  - Time estimates for common project types

**Features:**
- 🤖 AI automatically asks: "What u building?" when detecting empty project
- 🧠 Extracts requirements from conversational responses (no long forms)
- 🔍 Searches for enhancement skills (figma, stripe, auth, etc.)
- 📋 Creates all 6 Telo3 docs automatically based on conversation
- ⚡ Builds complete projects in 10-45 minutes with user approval
- 🎯 Smart delegation to specialized skills/MCP servers when available
- 📊 Technology templates for: SaaS, Mobile, API, Real-time, AI-powered apps
- 🔄 Continuous documentation updates (memory.md tracks all decisions)

**Philosophy:**
> "AI should ask smart questions, make good decisions, and build fast.  
> Not waste time asking 50 questions or building wrong thing."

**Time Savings:**
- Traditional setup: 4-5 hours (boilerplate, config, structure)
- Telo3 onboarding: 10 minutes (answer 3 questions, AI does rest)

**Updated:**
- README.md - Added smart onboarding to features table
- Installation guide - Added onboarding activation instructions

---
- Multi-language support (i18n)
- Visual documentation generator

---

## [1.0.0] - 2024-12-20

### Added

**🎉 Initial Public Release** by [Jeet (@Jeet1511)](https://github.com/Jeet1511)

#### Core System
- **Name:** Telo3 - Elite AI Development Framework
- Six core document templates (prd.md, architecture.md, rules.md, design.md, tasks.md, memory.md)
- AI-CONTEXT.md - 30-second quick reference for all AI models
- SKILL.md - Complete AI agent instructions
- SKILL-METADATA.json - AI discovery metadata with 50+ keywords

#### Quality Frameworks (11 Total)
- Token Optimization (80% savings, caveman mode)
- Smart Skill Delegation (MCP integration, adaptive learning)
- UI Quality (anti-vibe-coding framework)
- SEO Optimization (Core Web Vitals, metadata)
- Accessibility (WCAG 2.1 Level AA compliance)
- Performance (LCP, INP, CLS optimization)
- Security (audit framework, best practices)
- Privacy Compliance (GDPR, COPPA awareness)
- Legal Compliance (CAN-SPAM, DMCA guidance)
- Document Specification (detailed templates)
- Project Audit (comprehensive review procedures)
- AI Workflow (systematic coding process)
- AI Behavior (decision-making guidelines)

#### Universal Compatibility
- **Works with ANY IDE:** VS Code, JetBrains, Vim, Emacs, etc.
- **Works with ANY AI:** Kiro, Cursor, GitHub Copilot, Claude, ChatGPT, Gemini, Codeium, Tabnine, CodeWhisperer
- **Framework-agnostic:** React, Vue, Next.js, Python, Go, Rust, any stack
- **No platform lock-in:** Install anywhere, use everywhere

#### Efficiency Features
- Token optimization (80% average savings)
- Caveman mode (ultra-concise communication)
- Selective context loading (read only what's needed)
- Smart delegation (uses specialized tools automatically)
- Adaptive learning (learns project patterns)

#### Examples & Automation
- Complete example project (TaskFlow - all 6 documents)
- Initialization script (init-project-context.sh)
- Validation script (validate-project-context.sh)
- GitHub templates (issue, PR, funding)
- Contributing guidelines

#### Documentation
- Comprehensive README (SEO-optimized, badges, visual appeal)
- CONTRIBUTING.md (community guidelines)
- AI-CONTEXT.md (quick universal reference)
- SKILL.md (complete instructions)
- 13 reference documents (specialized guidance)

### Features Highlights

**🚀 Performance:**
- 80% fewer tokens
- 5x faster task completion
- Minimal context loading

**🛡️ Security & Privacy:**
- Security audit framework
- Privacy compliance guidelines (GDPR, COPPA)
- Legal awareness (CAN-SPAM, DMCA)
- No secrets committed
- Third-party service auditing

**♿ Quality Assurance:**
- WCAG 2.1 Level AA accessibility
- SEO optimization
- Core Web Vitals performance
- Anti-vibe-coding enforcement
- Design system consistency

**🤝 Community:**
- Open source (MIT License)
- Universal compatibility
- Open for contributions
- GitHub templates included
- Comprehensive contributing guide

---

## Release Notes

### 1.0.0 — Production-Ready Universal Release

**Created by [Jeet](https://github.com/Jeet1511) - December 2024**

This is the first production-ready release of Telo3, designed to work universally with any IDE and any AI coding assistant.

**Highlights:**
- ✅ Complete 6-document system for persistent project memory
- ✅ 13 specialized quality and compliance frameworks
- ✅ Universal compatibility (ANY IDE + ANY AI)
- ✅ Token optimization (80% savings, caveman mode)
- ✅ Smart delegation (uses best tools automatically)
- ✅ Safe initialization and validation scripts
- ✅ Example project with all best practices
- ✅ Comprehensive AI agent behavior guidelines
- ✅ GitHub-ready with templates and workflows
- ✅ Open source and community-driven

**Who should use Telo3:**
- Developers using ANY AI coding assistant
- Teams wanting consistent AI behavior
- Projects requiring systematic documentation
- Anyone fighting "vibe coding" and architectural drift
- Security-conscious developers
- Privacy-aware projects
- Accessibility-focused teams

**Getting started:**
1. Clone: `git clone https://github.com/Jeet1511/telo3.git`
2. Initialize: `./telo3/scripts/init-project-context.sh`
3. Tell your AI: "Use Telo3. Read AI-CONTEXT.md first."
4. Start coding systematically!

**Feedback welcome:**
- GitHub Issues: https://github.com/Jeet1511/telo3/issues
- GitHub Discussions: https://github.com/Jeet1511/telo3/discussions
- Contributions: See CONTRIBUTING.md

---

## Version History

| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0.0 | 2024-12-20 | Initial universal release | Jeet (@Jeet1511) |

---

## Upgrade Guide

### From Pre-1.0 (if applicable)

N/A - This is the first public release.

### Breaking Changes

None - This is the initial release.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

Changes that merit changelog entries:
- New features or templates
- Breaking changes
- Deprecations
- Security fixes
- Bug fixes affecting behavior
- Documentation improvements (major)
- Performance improvements
- New quality frameworks

---

## Semantic Versioning

- **MAJOR** version: Incompatible changes to document structure or behavior
- **MINOR** version: Backward-compatible new features or templates
- **PATCH** version: Backward-compatible bug fixes or documentation

---

## Links

- **Repository:** https://github.com/Jeet1511/telo3
- **Issues:** https://github.com/Jeet1511/telo3/issues
- **Discussions:** https://github.com/Jeet1511/telo3/discussions
- **Author:** [@Jeet1511](https://github.com/Jeet1511)
- **License:** MIT

---

**Made with ❤️ by [Jeet](https://github.com/Jeet1511)**

[Unreleased]: https://github.com/Jeet1511/telo3/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Jeet1511/telo3/releases/tag/v1.0.0
