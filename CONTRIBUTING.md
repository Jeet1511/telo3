# Contributing to Telo3

First off, **thank you** for considering contributing to Telo3! 🎉

Telo3 is a community-driven project, and contributions from developers like you make it better for everyone.

---

## 🌟 How You Can Contribute

### 1. **Code Contributions**
- Bug fixes
- New quality frameworks
- Framework-specific templates
- Performance improvements
- Documentation updates

### 2. **Documentation**
- Improve existing docs
- Add examples
- Write tutorials
- Translate to other languages
- Create video guides

### 3. **Templates & Examples**
- Language-specific templates (Python, Go, Rust, etc.)
- Framework-specific examples (Django, Rails, Laravel, etc.)
- Industry-specific templates (Healthcare, Finance, E-commerce)

### 4. **Quality Frameworks**
- New audit frameworks
- Compliance guidelines for other jurisdictions
- Industry-specific quality standards

### 5. **Community Support**
- Answer questions in Discussions
- Help others in Issues
- Share your Telo3 setup
- Write blog posts

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of [github.com/Jeet1511/telo3](https://github.com/Jeet1511/telo3)

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/telo3.git
cd telo3
```

### 3. Create a Branch

```bash
git checkout -b feature/your-amazing-feature
# or
git checkout -b fix/bug-description
```

### 4. Make Your Changes

Follow the guidelines below for your type of contribution.

### 5. Test Your Changes

```bash
# Run validation script
./scripts/validate-project-context.sh

# Test initialization
./scripts/init-project-context.sh
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "Add: Brief description of your changes"
```

**Commit message format:**
- `Add: ...` for new features
- `Fix: ...` for bug fixes
- `Update: ...` for improvements
- `Docs: ...` for documentation
- `Refactor: ...` for code refactoring

### 7. Push to Your Fork

```bash
git push origin feature/your-amazing-feature
```

### 8. Open a Pull Request

1. Go to [github.com/Jeet1511/telo3](https://github.com/Jeet1511/telo3)
2. Click **Pull Requests** → **New Pull Request**
3. Select your fork and branch
4. Fill in the PR template
5. Submit!

---

## 📝 Contribution Guidelines

### Code Style

**Markdown files:**
- Use clear headings hierarchy
- Keep lines under 120 characters
- Use tables for structured data
- Include examples where helpful

**Scripts:**
- Use bash for shell scripts
- Include comments for complex logic
- Make scripts idempotent (safe to run multiple times)
- Handle errors gracefully

**Templates:**
- Use `[placeholders]` for user input
- Include helpful comments
- Provide examples
- Keep structure consistent

### Documentation Standards

- **Be clear and concise**
- **Use examples** to illustrate concepts
- **Link to related docs** where appropriate
- **Update README** if adding new features
- **Keep AI-CONTEXT.md** concise (30-second read)

### Quality Frameworks

When adding new quality frameworks:

1. **Create a new file** in `references/`
2. **Follow existing format:**
   - Introduction
   - Audit checklist
   - Best practices
   - Common mistakes
   - Documentation template
   - Examples

3. **Link from README** and relevant docs
4. **Add to SKILL.md** if it's core guidance

### Templates

When adding new templates:

1. **Use existing templates** as a starting point
2. **Keep placeholder format** consistent `[placeholder]`
3. **Include comments** explaining sections
4. **Provide examples** where helpful
5. **Test with actual projects**

---

## 🎯 Priority Areas

We especially welcome contributions in:

### High Priority
- [ ] Python-specific templates (Django, FastAPI, Flask)
- [ ] Go-specific templates
- [ ] Rust-specific templates
- [ ] Healthcare compliance framework
- [ ] Financial services compliance framework
- [ ] Translation to other languages

### Medium Priority
- [ ] Ruby on Rails templates
- [ ] PHP/Laravel templates
- [ ] Java/Spring templates
- [ ] More examples for different project types
- [ ] Video tutorials
- [ ] Integration guides for specific IDEs

### Low Priority
- [ ] Visual theme improvements
- [ ] Additional automation scripts
- [ ] Community skill registry
- [ ] Cloud sync features

---

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** from main branch
3. **Gather information:**
   - Operating system
   - Shell/terminal
   - AI tool used
   - Error messages
   - Steps to reproduce

### Bug Report Template

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., macOS 14, Ubuntu 22.04, Windows 11]
- Shell: [e.g., bash, zsh, PowerShell]
- AI Tool: [e.g., Cursor, Claude, ChatGPT]
- Telo3 Version: [e.g., v1.0.0]

**Additional Context:**
Screenshots, error logs, etc.
```

---

## 💡 Feature Requests

We love new ideas! Before requesting:

1. **Check existing issues** and discussions
2. **Consider if it fits** Telo3's philosophy
3. **Think about scope** - should it be core or an extension?

### Feature Request Template

```markdown
**Feature Description:**
Brief description

**Problem It Solves:**
What user problem does this address?

**Proposed Solution:**
How would you implement this?

**Alternatives Considered:**
Other approaches you thought about

**Additional Context:**
Examples, mockups, references
```

---

## 🎨 Design Philosophy

When contributing, keep Telo3's core principles in mind:

### Core Principles

1. **Systematic over Vibe** - No random decisions
2. **Universal over Specific** - Works with any tool
3. **Quality over Features** - Do fewer things well
4. **Efficiency over Verbosity** - Token optimization matters
5. **Security by Default** - Never compromise on security
6. **Open over Proprietary** - No vendor lock-in

### What We Accept

✅ Improvements to core system  
✅ New quality frameworks  
✅ Better documentation  
✅ Framework-specific templates  
✅ Bug fixes  
✅ Performance improvements  
✅ Accessibility improvements  

### What We Don't Accept

❌ Proprietary/closed features  
❌ Platform-specific lock-in  
❌ Breaking changes without discussion  
❌ Features that compromise security  
❌ Bloat without clear benefit  
❌ Copy-paste from other projects without attribution  

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior:**
- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on what's best for the community
- Show empathy

**Unacceptable behavior:**
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Unprofessional conduct

### Enforcement

Violations may result in temporary or permanent ban from the project.

Report issues to: [Create an issue](https://github.com/Jeet1511/telo3/issues) or contact [@Jeet1511](https://github.com/Jeet1511)

---

## 🏆 Recognition

### Contributors

All contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Listed in the README (for significant contributions)

### Types of Recognition

- **🌟 Core Contributor** - Multiple significant contributions
- **🔧 Bug Hunter** - Found and fixed important bugs
- **📚 Documentation Hero** - Major documentation improvements
- **🎨 Designer** - Visual/UX improvements
- **🌍 Translator** - Translated documentation
- **🎓 Educator** - Created tutorials or guides

---

## 📞 Communication

### Where to Ask Questions

- **GitHub Discussions:** [Ask questions](https://github.com/Jeet1511/telo3/discussions)
- **GitHub Issues:** [Report bugs, request features](https://github.com/Jeet1511/telo3/issues)
- **Discord:** [Join community](https://discord.gg/telo3) (coming soon)

### Response Time

- We aim to respond to issues within 48 hours
- PRs reviewed within 1 week
- Be patient - this is maintained by volunteers!

---

## 🔄 Development Process

### Branching Strategy

- `main` - Stable, production-ready
- `develop` - Latest changes, may be unstable
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Release Process

1. Changes merged to `develop`
2. Testing and validation
3. Version bump in CHANGELOG.md
4. Merge to `main`
5. Create GitHub release
6. Announce in community

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes

---

## 📚 Resources for Contributors

### Helpful Links

- [Markdown Guide](https://www.markdownguide.org/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [How to Write a Good Commit Message](https://chris.beams.io/posts/git-commit/)

### Example Contributions

Look at existing PRs for examples:
- [Pull Requests](https://github.com/Jeet1511/telo3/pulls)

---

## 🎉 Thank You!

Every contribution, no matter how small, makes Telo3 better.

**Ways to contribute beyond code:**
- ⭐ Star the repository
- 📢 Share with your team
- 📝 Write a blog post
- 🐦 Tweet about it
- 📺 Create a video tutorial
- 💬 Answer questions in Discussions

**Together, we're transforming AI coding from vibe-based to systematic!**

---

Made with ❤️ by [Jeet](https://github.com/Jeet1511) and [contributors](https://github.com/Jeet1511/telo3/graphs/contributors)

[Back to README](README.md) | [View License](LICENSE) | [Report Issue](https://github.com/Jeet1511/telo3/issues)
