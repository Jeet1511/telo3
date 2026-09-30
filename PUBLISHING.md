# Publishing Telo3 to npm

**Internal guide for publishing Telo3 package**

## Prerequisites

1. npm account (npmjs.com)
2. npm CLI installed
3. Logged in: `npm login`

## Publishing Steps

### 1. Verify Package

```bash
cd telo3
npm pack --dry-run
```

This shows what will be published.

### 2. Test Package Locally

```bash
npm pack
npm install -g ./telo3-5.0.0.tgz
telo3 --version
```

### 3. Publish to npm

```bash
npm publish
```

### 4. Verify Publication

```bash
npm view telo3
npm info telo3
```

### 5. Test Installation

```bash
npm install -g telo3
telo3 init
```

## Updating Version

When releasing new version:

```bash
# Update version
npm version patch   # 5.0.0 -> 5.0.1
npm version minor   # 5.0.0 -> 5.1.0
npm version major   # 5.0.0 -> 6.0.0

# Publish
npm publish

# Push tags
git push origin main --tags
```

## Package Info

- **Name:** telo3
- **Current Version:** 5.0.0
- **Registry:** https://www.npmjs.com/package/telo3
- **Author:** Jeet (@jeet1511)

## Unpublishing (Emergency Only)

```bash
npm unpublish telo3@5.0.0
```

**Note:** Can only unpublish within 72 hours.

---

**Created by Jeet (@jeet1511)**
