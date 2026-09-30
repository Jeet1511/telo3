# Smart Skill & MCP Delegation

> Intelligent use of other skills, MCP tools, and external capabilities.

---

## Core Principle

**Use the right tool for the job. Delegate when specialized skills exist.**

---

## Skill Discovery & Usage

### Before Implementing Yourself

**Ask:**
1. Does a skill already exist for this?
2. Is there an MCP tool that handles this?
3. Would another AI agent do this better?

**Check:**
- Your AI's skills directory
- Available MCP servers
- Your AI's plugin/extension system
- Sub-agent capabilities

---

## When to Use Other Skills

### Use Existing Skills When:

✅ **Specialized knowledge needed:**
- SEO optimization → SEO skill
- Accessibility audit → A11y skill
- Security review → Security skill
- Performance analysis → Performance skill

✅ **Complex domain:**
- Legal compliance → Legal skill (if available)
- Medical/health → Health skill (if available)
- Financial calculations → Finance skill (if available)

✅ **Better tooling:**
- Design implementation → Figma skill
- API documentation → OpenAPI skill
- Database schema → Database skill

### Don't Use Other Skills When:
- Simple, straightforward tasks
- Already have context loaded
- Faster to do directly
- No relevant skill exists

---

## MCP Server Usage

### Check Available MCP Servers

**Before starting complex tasks:**
```
Available MCP servers:
- context7: Library documentation lookup
- figma: Design implementation
- stripe: Payment integration
- aws-knowledge: AWS best practices
- playwright: Browser automation
```

**Use MCP when:**
- Need current documentation (context7)
- Implementing from designs (figma)
- Integrating third-party services (stripe, aws)
- Need specialized tooling (playwright)

### Recommend MCP Configuration

**If task needs unavailable MCP:**
```
This task needs [X] capability.

Recommend: Install [MCP-server-name]

Setup:
1. Add to your AI's MCP configuration (e.g., mcp.json):
{
  "mcpServers": {
    "server-name": {
      "command": "uvx",
      "args": ["package-name@latest"]
    }
  }
}

2. Restart Kiro or reconnect MCP servers

Then I can use [specific capability] to complete this efficiently.
```

---

## Kiro Powers Usage

### Check Powers Before Implementation

**For common integrations:**

| Task | Check Power | Why |
|------|-------------|-----|
| Design to code | figma power | Connect Figma → code |
| API docs lookup | context7 power | Current library docs |
| SaaS features | saas-builder power | Pre-built patterns |
| Payment integration | (via saas-builder) | Stripe integration |
| Cloud deployment | (via saas-builder) | AWS patterns |

**Usage:**
```
Task: Implement Stripe checkout

Check: saas-builder power (includes Stripe MCP)
Use: Built-in Stripe patterns + MCP tools
Result: Faster, tested, secure implementation
```

---

## Sub-Agent Delegation

### Use context-gatherer When:
- New to codebase (understand before changing)
- Complex feature spanning many files
- Investigating bugs across modules
- Understanding architecture patterns

**Don't use for:**
- Simple single-file changes
- Code you already understand
- Quick fixes

### Use general-task-execution When:
- Independent subtask while you work on main task
- Parallel work streams
- Well-defined isolated task

### Use documentation When:
- User asks about AI-specific features
- Questions about configuration
- Platform-specific documentation needed

**Never use for:**
- General programming questions
- Project-specific code issues

---

## Smart Delegation Examples

### Example 1: Design Implementation

**Scenario:** "Implement this Figma design"

**Smart approach:**
```
Checking for figma power... Found.

Using figma power:
- Extract design tokens
- Map components
- Generate code with design system

More accurate than manual implementation.
```

**Dumb approach:**
```
Let me manually inspect the Figma link and guess the colors...
```

### Example 2: Library Documentation

**Scenario:** "How do I use Next.js App Router with authentication?"

**Smart approach:**
```
Using context7 MCP (via context7 power):
- Query: "Next.js App Router authentication patterns"
- Get current documentation
- Implement with latest best practices
```

**Dumb approach:**
```
Based on my training data from 2023...
```

### Example 3: Complex Investigation

**Scenario:** "Why is the checkout flow failing?"

**Smart approach:**
```
Delegating to context-gatherer:
- Investigate checkout flow end-to-end
- Trace data flow
- Identify failure points

Will implement fix after understanding root cause.
```

**Dumb approach:**
```
Let me read every file in the codebase...
```

---

## Skill Recommendation Framework

### When Task Starts

**Mental checklist:**
1. Is this my core competency? (code, architecture, docs)
2. Or specialized domain? (design, payments, cloud, SEO)
3. Does skill/MCP exist for specialized domain?
4. Would it be faster/better to use that?

### Recommendation Template

**If better tool exists:**
```
Task: [X]

Better approach: Use [skill/MCP/power]

Reason: [Why it's better]

Setup needed: [If any]

Recommend proceeding with [tool] instead of manual implementation?
```

### User Decision Point

**Let user choose:**
- Proceed with specialized tool (better)
- Proceed manually (faster if already set up)

---

## Configuration Recommendations

### Proactive Setup Suggestions

**When you notice opportunity:**
```
Note: This project could benefit from [X] MCP server.

Use case: [Specific benefit]

Setup:
[Exact configuration]

Worth configuring? Can improve [Y] tasks by [Z]%.
```

### Project-Specific Optimization

**After understanding project:**
```
Project Optimization Recommendations:

1. Figma Power: You have Figma designs
   - Auto-sync design tokens
   - Component generation
   - Setup: [instructions]

2. Context7: Multiple external libraries
   - Always current docs
   - Faster API lookup
   - Setup: Already available in Kiro

3. Custom Skill: [Domain-specific]
   - Create skill for [repeated pattern]
   - Saves time on [X] type tasks
```

---

## Adaptive Behavior

### Learn from Project Patterns

**If you notice:**
- Frequent Figma → code tasks → Recommend figma power
- Many API integrations → Recommend context7
- Repeated security audits → Recommend security skill
- Complex state management → Recommend architecture review skill

### Build Skill Recommendation Memory

**In memory.md:**
```markdown
## Recommended Skills/Tools

- **Figma Power:** Design implementation tasks (50% of UI work)
- **Context7:** Library docs lookup (saves ~5 min per lookup)
- **Custom SEO Skill:** Frequent SEO audits needed

## MCP Servers to Configure

- [ ] Stripe MCP: Payment features planned (Phase 2)
- [ ] AWS Knowledge: Deployment optimization needed
```

---

## Token Efficiency with Delegation

### Delegation Saves Tokens

**Example: Design implementation**

**Manual (High Tokens):**
- Read design.md thoroughly
- Inspect existing components
- Extract colors, spacing, patterns manually
- Implement component
- Verify against design
- **Tokens:** ~2000

**Delegated (Low Tokens):**
- Use figma power
- Extract design automatically
- Generate component
- Review output
- **Tokens:** ~300

### When Delegation Costs More

**Don't delegate if:**
- Setup time > implementation time
- Simple task (< 5 min)
- Already have full context
- No suitable tool exists

---

## Smart Tool Selection Matrix

| Task Type | Primary Tool | Fallback | Skip Delegation |
|-----------|--------------|----------|-----------------|
| Code changes | Direct implementation | - | Always do directly |
| Design → Code | Figma power | Manual | If no Figma file |
| Library docs | Context7 MCP | Web search | If simple/known |
| Architecture investigation | context-gatherer | Manual inspection | If < 3 files |
| SEO audit | SEO skill | Manual checklist | If not applicable |
| Security audit | Security skill | Manual review | For tiny changes |
| Payment integration | Stripe MCP | Manual API | If simple endpoint |
| Complex investigation | context-gatherer | Read files | If already know area |

---

## Efficiency Decision Tree

```
New Task
    ↓
Is it core coding task?
    YES → Do it directly
    NO ↓
    
Is there specialized skill/MCP?
    NO → Do it manually
    YES ↓
    
Is tool already configured?
    YES → Use tool (faster + better)
    NO ↓
    
Is setup time < task time?
    YES → Recommend setup → Use tool
    NO → Do manually, note for future
```

---

## Communication: Tool Recommendations

### Concise Format

**When recommending tool:**
```
Better tool exists: [name]

Benefit: [X] faster, [Y] more accurate

Setup: [Quick instructions or "already available"]

Use it? [Y/n]
```

**Caveman mode:**
```
[Tool name] better for this.
Setup: [1 line]
Use? 
```

---

## Self-Awareness: Know Your Limits

### You're Best At:
- Writing code
- Following patterns
- Maintaining consistency
- Implementing requirements
- Refactoring
- Documentation

### You're Not Best At:
- Current library docs (use context7)
- Design precision (use figma power)
- Deep architecture investigation (use context-gatherer)
- Specialized domains (use domain skills)

**Be honest:** Recommend better tools when they exist.

---

## Summary

**Smart AI behavior:**

1. **Check available skills/MCP before implementing**
2. **Delegate specialized tasks to specialized tools**
3. **Recommend configuration for repeated patterns**
4. **Be token-efficient: delegation often saves tokens**
5. **Know your strengths: code well, delegate smartly**

**Dumb AI behavior:**

1. Do everything manually
2. Ignore available tools
3. Never recommend optimization
4. Waste tokens on duplicate work
5. Pretend to know everything

**Goal:** Use right tool for each job. Maximize efficiency. Deliver better results faster.
