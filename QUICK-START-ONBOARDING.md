# 🚀 Quick Start: Telo3 Smart Onboarding

**For empty projects - AI automatically helps you plan & build**

---

## For AI Assistants

When you detect an empty codebase:

1. **Read this file:** `ONBOARDING-SKILL.md`
2. **Activate conversation:** Ask user what they want to build
3. **Follow 4-phase system:**
   - Discovery (understand project)
   - Planning (create Telo3 docs)
   - Implementation (build with quality)
   - Handoff (deliver & document)

**One-liner activation:**
```
"Use Telo3 onboarding skill from ./telo3/ONBOARDING-SKILL.md for empty project setup"
```

---

## For Developers

### Automatic Activation

When you start with empty project:
```bash
# 1. Clone Telo3
git clone https://github.com/jeet1511/telo3.git ~/telo3

# 2. Open your AI assistant (Claude, Cursor, Copilot, etc.)

# 3. Say to AI:
"Use Telo3 from ~/telo3/ - this is an empty project"

# 4. AI will automatically start discovery conversation
```

### Manual Activation

In existing session:
```bash
# Tell your AI:
"Activate Telo3 onboarding skill"

# Or:
"Help me plan this project using Telo3"
```

---

## What Happens Next?

```
AI: "What u building? (website/app/api/tool/game/other)"
You: [answer]

AI: "Who uses it?"
You: [answer]

AI: "Main thing it does?"
You: [answer]

AI: [Suggests tech stack, shows plan]
"Good? Or change something?"

You: "Go!"

AI: [Builds entire project, updates you with quick status]

AI: "✅ Project complete! [Shows what's built and how to run]"
```

**Time saved:** 2-4 hours of setup, planning, and configuration

---

## Features You Get

✅ **Smart conversation** - AI asks only what it needs  
✅ **Skill discovery** - Finds existing tools to enhance your project  
✅ **Tech recommendations** - Best stack for your needs  
✅ **Auto documentation** - All decisions tracked in Telo3 docs  
✅ **Quality built-in** - Security, accessibility, performance checks  
✅ **Fast iteration** - Token-optimized, efficient communication

---

## Example Projects

**Personal Blog** → 10 minutes  
**Team Task Manager** → 30 minutes  
**SaaS Landing Page** → 20 minutes  
**REST API** → 15 minutes  
**E-commerce Store** → 45 minutes

*Times assume AI working autonomously with your approval*

---

## Customization

Create `telo3-onboarding-config.json` in project root:

```json
{
  "conversationStyle": "caveman",     // or "verbose"
  "techStackPreference": "popular",    // or "cutting-edge" or "stable"
  "qualityChecks": "always",           // or "production-only"
  "skillDiscovery": "aggressive"       // or "conservative"
}
```

---

## Philosophy

> **"Start smart, build fast, maintain easy"**

Traditional approach:
```
❌ 2 hours: Setup boilerplate
❌ 1 hour: Figure out folder structure  
❌ 30 min: Install dependencies
❌ 1 hour: Configure tools
= 4.5 hours before writing first feature
```

Telo3 onboarding:
```
✅ 2 min: Answer 3 questions
✅ 8 min: AI sets up everything
= 10 minutes, start building features
```

---

## Troubleshooting

**AI not auto-detecting empty project?**
```
Manually say: "This is a new project, use Telo3 onboarding"
```

**Want different tech stack?**
```
Say: "I prefer [your-tech]" during planning phase
```

**AI asking too many questions?**
```
Say: "Quick mode - you decide" (AI will make opinionated choices)
```

**Want to skip planning?**
```
Say: "Use [tech-stack], start building"
(AI will create minimal Telo3 docs and start coding)
```

---

## What Gets Created

```
your-project/
├── project-context/          # Telo3 documentation
│   ├── prd.md               # What & why
│   ├── architecture.md      # How it's built
│   ├── rules.md             # Code standards
│   ├── design.md            # UI/UX approach
│   ├── tasks.md             # Implementation roadmap
│   └── memory.md            # Decisions & progress
├── src/                     # Your code
├── tests/                   # Tests (if requested)
├── package.json             # Dependencies
├── README.md                # Project docs
└── [other files based on stack]
```

All decisions documented. All context preserved. Ready for future changes.

---

## Learn More

- **Full system:** `ONBOARDING-SKILL.md`
- **Telo3 core:** `SKILL.md`
- **Quick reference:** `AI-CONTEXT.md`
- **Examples:** `examples/example-project/`

---

**Made by:** Jeet (@Jeet1511)  
**Repository:** https://github.com/Jeet1511/telo3  
**License:** MIT - Free to use, modify, share

---

**Ready?** Open your AI and say:
```
"Use Telo3 onboarding from ~/telo3/ for this new project"
```

Let's build something awesome! 🚀
