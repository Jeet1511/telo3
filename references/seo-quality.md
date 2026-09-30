# SEO Quality Standards

> SEO audit framework for public websites, portfolios, documentation, marketing sites, and indexable applications.

---

## When SEO Applies

✅ **Apply SEO to:**
- Marketing websites
- Portfolios
- Blogs and documentation
- E-commerce sites
- Public-facing applications
- Content platforms

❌ **SEO may NOT apply to:**
- Private dashboards
- Internal tools
- Authenticated-only pages
- APIs
- Intentionally non-indexable pages

**Assess applicability based on actual project purpose.**

---

## SEO Audit Checklist

### 1. Meta Tags

#### Title Tags
- [ ] Every page has unique `<title>`
- [ ] Title length: 50-60 characters
- [ ] Primary keyword near the beginning
- [ ] Format: `Page Title | Site Name`

#### Meta Descriptions
- [ ] Every page has unique `<meta name="description">`
- [ ] Description length: 150-160 characters
- [ ] Compelling, actionable copy
- [ ] Includes target keywords naturally

#### Canonical URLs
- [ ] Canonical URLs set (`<link rel="canonical">`)
- [ ] Prevents duplicate content issues
- [ ] Points to preferred URL version

### 2. Open Graph & Social

#### Open Graph Tags
- [ ] `og:title` — Page title
- [ ] `og:description` — Page description
- [ ] `og:image` — Social share image (1200x630px recommended)
- [ ] `og:url` — Canonical URL
- [ ] `og:type` — Content type (website, article, etc.)

#### Twitter Cards
- [ ] `twitter:card` — Card type (summary_large_image)
- [ ] `twitter:title` — Page title
- [ ] `twitter:description` — Page description
- [ ] `twitter:image` — Social share image

### 3. Structured Data

- [ ] Schema.org structured data where applicable
- [ ] JSON-LD format
- [ ] Common schemas:
  - Organization
  - Person (for portfolios)
  - Article (for blog posts)
  - Product (for e-commerce)
  - FAQ
  - Breadcrumbs
- [ ] Validate with Google Rich Results Test

### 4. Content & HTML

#### Heading Hierarchy
- [ ] One `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] Headings describe content structure
- [ ] No skipped heading levels

#### Semantic HTML
- [ ] Use semantic elements (`<article>`, `<nav>`, `<main>`, `<aside>`)
- [ ] Proper `<header>` and `<footer>`
- [ ] Lists use `<ul>`, `<ol>`, `<li>`

#### Images
- [ ] All images have descriptive `alt` text
- [ ] Alt text describes image content
- [ ] Decorative images: `alt=""`
- [ ] Images optimized (WebP/AVIF with fallbacks)
- [ ] Images have width/height attributes

#### Links
- [ ] Descriptive link text (not "click here")
- [ ] Internal linking strategy
- [ ] External links use `rel="noopener"` when appropriate
- [ ] Broken links identified and fixed

#### URLs
- [ ] Clean, descriptive URLs (kebab-case)
- [ ] Keywords in URLs
- [ ] No unnecessary parameters
- [ ] Consistent URL structure

### 5. Technical SEO

#### robots.txt
- [ ] robots.txt file exists
- [ ] Configured correctly
- [ ] Allows search engines
- [ ] Disallows admin/private areas
- [ ] References sitemap.xml

Example:
```
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
```

#### Sitemap
- [ ] XML sitemap exists (`sitemap.xml`)
- [ ] Lists all important pages
- [ ] Updated automatically
- [ ] Submitted to Google Search Console

#### robots Meta Tag
- [ ] Indexable pages: `<meta name="robots" content="index, follow">`
- [ ] Non-indexable pages: `<meta name="robots" content="noindex, nofollow">`
- [ ] Appropriate use of `noindex` for private/admin pages

### 6. Performance (Core Web Vitals)

See `performance-quality.md` for detailed performance optimization.

#### LCP (Largest Contentful Paint)
- [ ] LCP < 2.5 seconds
- [ ] Optimize images
- [ ] Reduce server response time

#### FID/INP (First Input Delay / Interaction to Next Paint)
- [ ] FID < 100ms or INP < 200ms
- [ ] Minimize JavaScript
- [ ] Break up long tasks

#### CLS (Cumulative Layout Shift)
- [ ] CLS < 0.1
- [ ] Set image dimensions
- [ ] Avoid layout shifts

### 7. Mobile Optimization

- [ ] Mobile-responsive design
- [ ] Mobile-friendly test passes
- [ ] Touch targets ≥44x44px
- [ ] Text readable without zooming
- [ ] No horizontal scrolling

### 8. Page Speed

- [ ] Fast server response time
- [ ] Optimized images
- [ ] Minimized CSS/JS
- [ ] Leverage browser caching
- [ ] Use CDN if appropriate

### 9. HTTPS

- [ ] Site uses HTTPS
- [ ] Mixed content issues resolved
- [ ] HTTP redirects to HTTPS

### 10. Indexability

- [ ] Pages are crawlable
- [ ] No JavaScript-only content for critical info
- [ ] Server-side rendering or static generation for public pages
- [ ] No infinite scroll blocking content

---

## Next.js SEO Implementation

### Metadata API (App Router)

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Page description 150-160 characters',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
    url: 'https://example.com/page',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://example.com/page',
  },
};
```

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    // ...
  };
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

### robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

---

## Common SEO Mistakes

❌ Duplicate title tags  
❌ Missing meta descriptions  
❌ Weak or generic content  
❌ Broken internal links  
❌ Slow page load  
❌ Non-mobile-friendly design  
❌ Missing alt text  
❌ Thin content pages  
❌ Keyword stuffing  
❌ Cloaking or hidden text  
❌ Duplicate content  
❌ Missing sitemap  
❌ Blocked by robots.txt accidentally  

---

## SEO Documentation Template

```markdown
## SEO Configuration

### Meta Tags
- **Status:** [Configured / Partial / Needed]
- **Unique titles:** [Yes/No]
- **Unique descriptions:** [Yes/No]

### Social Sharing
- **Open Graph:** [Configured]
- **Twitter Cards:** [Configured]
- **Social images:** [Created / Needed]

### Technical SEO
- **Sitemap:** [Generated / Static / Needed]
- **robots.txt:** [Configured]
- **Canonical URLs:** [Set]

### Structured Data
- **Schema types:** [List or "Not implemented"]
- **Validation:** [Passed / Not tested]

### Performance
- **Core Web Vitals:** [Good / Needs improvement]
- **Mobile-friendly:** [Yes/No]

### Indexing
- **Search Console:** [Set up / Needed]
- **Indexable pages:** [List or count]
- **Non-indexable pages:** [List or count]

### Content
- **Heading hierarchy:** [Correct / Needs review]
- **Alt text:** [Complete / Partial]
- **Internal linking:** [Implemented / Needs improvement]

### Next Steps
- [ ] [SEO task 1]
- [ ] [SEO task 2]
```

---

## Tools for SEO Audit

- Google Search Console
- Google PageSpeed Insights
- Lighthouse (built into Chrome DevTools)
- Screaming Frog SEO Spider
- Ahrefs / SEMrush / Moz (professional tools)
- Schema.org validator
- Google Rich Results Test

---

**Summary:** Good SEO is about making great content discoverable. Focus on: unique metadata, semantic HTML, fast performance, mobile-friendliness, and quality content.
