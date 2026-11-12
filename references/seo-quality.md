# SEO Quality
**Load when:** building or reviewing public, indexable pages — marketing sites, portfolios, blogs, docs, e-commerce, content platforms.

Apply to: marketing websites, portfolios, blogs/documentation, e-commerce sites, public-facing applications, content platforms.
Skip SEO for private dashboards, internal tools, authenticated-only pages, APIs, and intentionally non-indexable pages. Assess applicability from the actual project purpose.

## Metadata
| Item | Rule |
|---|---|
| `<title>` | Unique per page; 50-60 characters; primary keyword near the beginning; format `Page Title \| Site Name` |
| Meta description | Unique per page; 150-160 characters; compelling, actionable copy; target keywords naturally |
| Canonical | `<link rel="canonical">` pointing to the preferred URL version; prevents duplicate content |
| Open Graph | `og:title`, `og:description`, `og:image` (1200x630px recommended), `og:url` (canonical), `og:type` (website, article, etc.) |
| Twitter Card | `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image` |

## Structured Data
- Schema.org structured data in JSON-LD format where applicable.
- Common schemas: Organization, Person (portfolios), Article (blog posts).
- Also: Product (e-commerce), FAQ, Breadcrumbs.
- Mark up only real content — never fabricate schema claims (fake reviews, ratings, offers, facts).
- Validate with Google Rich Results Test and the Schema.org validator.

## Content & HTML
- One `<h1>` per page; logical hierarchy h1→h2→h3; no skipped levels.
- Headings describe content structure.
- Semantic elements: `<article>`, `<nav>`, `<main>`, `<aside>`, proper `<header>`/`<footer>`.
- Lists via `<ul>`/`<ol>`/`<li>`.
- Images: descriptive `alt` text; decorative images `alt=""`.
- Images optimized (WebP/AVIF with fallbacks); width/height attributes set.
- Links: descriptive text (not "click here"); internal linking strategy.
- External links: `rel="noopener"` when appropriate; find and fix broken links.
- URLs: clean, descriptive, kebab-case; keywords in URLs.
- No unnecessary URL parameters; consistent URL structure.
- Substantive content: no thin pages, no keyword stuffing.
- No cloaking or hidden text; no duplicate content.

## Indexing & Crawlability
- robots.txt exists, configured correctly: allow search engines.
- Disallow admin/private areas (e.g. `/api/`, `/admin/`); reference the sitemap.
- XML sitemap (`sitemap.xml`): all important pages; updated automatically.
- Submit sitemap to Google Search Console.
- Robots meta: `index, follow` for indexable pages.
- `noindex, nofollow` for private/admin/non-indexable pages.
- Pages crawlable: no JavaScript-only rendering of critical info.
- SSR or static generation for public pages.
- No infinite scroll blocking access to content.
- Verify robots.txt isn't accidentally blocking pages that should rank.

Example robots.txt:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
```

## Performance (Core Web Vitals — details: performance-quality.md)
- LCP < 2.5s: optimize images; reduce server response time.
- FID < 100ms or INP < 200ms: minimize JavaScript; break up long tasks.
- CLS < 0.1: set image dimensions; avoid layout shifts.
- Fast server response; optimized images; minimized CSS/JS.
- Leverage browser caching; use CDN if appropriate.

## Mobile & HTTPS
- Mobile-responsive design; passes mobile-friendly test.
- Touch targets ≥ 44x44px; text readable without zooming; no horizontal scrolling.
- HTTPS everywhere; mixed content resolved; HTTP redirects to HTTPS.

## Next.js (App Router)
- Static metadata: `export const metadata: Metadata` (title, description, openGraph, twitter, `alternates.canonical`).
- Dynamic metadata: `export async function generateMetadata({ params })` per route (e.g. post title/excerpt).
- `app/sitemap.ts`: entries with url, lastModified, changeFrequency, priority.
- `app/robots.ts`: rules (userAgent, allow, disallow) plus sitemap URL.

## Audit Tools
- Google Search Console; Google PageSpeed Insights; Lighthouse (Chrome DevTools).
- Screaming Frog SEO Spider; Ahrefs / SEMrush / Moz.
- Schema.org validator; Google Rich Results Test.

## Common Mistakes
- Duplicate title tags; missing meta descriptions; weak/generic or thin content.
- Broken internal links; slow page load; non-mobile-friendly design; missing alt text.
- Keyword stuffing; cloaking/hidden text; duplicate content.
- Missing sitemap; accidental robots.txt blocks.

## Record in project docs
- Meta/social sharing status; sitemap, robots.txt, canonical config.
- Schema types and validation result; Core Web Vitals and mobile status.
- Search Console setup; indexable vs non-indexable pages.
- Heading hierarchy, alt text, internal linking status; next steps.