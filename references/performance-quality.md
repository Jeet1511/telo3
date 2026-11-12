# Performance Quality
**Load when:** any page/app speed work, Core Web Vitals issues, image/font/JS optimization, or performance review.

Measure first: profile before optimizing; never micro-optimize unmeasured code. Optimize where it matters most to users, then re-measure. Performance is a feature, not an afterthought.

## Core Web Vitals targets
| Metric | Measures | Good | Needs improvement | Poor |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | Loading | < 2.5s | 2.5-4s | > 4s |
| INP (Interaction to Next Paint; replaces FID) | Responsiveness | < 200ms | 200-500ms | > 500ms |
| CLS (Cumulative Layout Shift) | Visual stability | < 0.1 | 0.1-0.25 | > 0.25 |

### LCP fixes
- Optimize images (WebP/AVIF, proper sizing).
- Reduce server response time (TTFB).
- Remove render-blocking resources.
- Use CDN; implement caching.
- Preload critical resources.

### INP fixes
- Minimize JavaScript execution; break up long tasks.
- Optimize event handlers; debounce/throttle frequent events.
- Web workers for heavy computation.
- Code-split large bundles.

### CLS fixes
- Set image dimensions; set dimensions for ads/embeds.
- Never insert content above existing content.
- CSS transforms for animations; preload fonts.
- Reserve space for dynamic content.

## Images
- Compress all images; correct sizing — no giant images scaled down.
- AVIF: best compression (~85%+ support; use with fallback).
- WebP: good balance (~95%+ support).
- JPEG fallback for photos; PNG fallback for transparency; SVG for icons/logos.
- Responsive images: `srcset` + `sizes` (e.g. 320w/640w/1280w variants).
- Set width/height attributes (prevents CLS).
- `loading="lazy"` below the fold; preload critical/above-fold images.
- Next.js: `next/image` with width/height, `loading="lazy"` (eager above fold), `placeholder="blur"` + blurDataURL.

## JavaScript
- Minimize bundle size; remove unused code; tree shaking enabled.
- Code splitting: React.lazy + dynamic `import()` for components.
- Lazy-import heavy libraries on interaction (e.g. inside a click handler).
- Next.js code-splits per route automatically.
- Minimize third-party scripts; async/defer where appropriate; no render-blocking JS.
- Lazy components: React.lazy + Suspense fallback; IntersectionObserver for custom lazy loading.

## CSS
- Inline critical CSS; remove unused CSS; minify.
- Eliminate or minimize render-blocking stylesheets.

## Fonts
- System fonts fastest: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`.
- Self-host optimized woff2 via `@font-face`; `font-display: swap`.
- Preload fonts; subset when applicable.
- Next.js: `next/font` (e.g. `Inter({ subsets: ['latin'], display: 'swap' })`).

## Caching
- Long cache lifetimes for static assets; set Cache-Control headers.
- Service worker if applicable; CDN for static assets.

## Server
- TTFB < 200ms; HTTP/2 or HTTP/3 enabled.
- gzip/brotli compression enabled.
- Optimize database queries; cache API responses where appropriate.

## Rendering & Third Parties
- SSR or static generation for public content.
- Avoid layout shifts; minimize reflows/repaints.
- CSS transforms for animations (GPU-accelerated).
- Minimize third-party scripts; load async; consider self-hosting.
- Facade technique for embeds (YouTube, etc.): lightweight placeholder until interaction.

## Performance Budget (example limits — set and enforce to prevent regression)
| Resource / metric | Budget |
|---|---|
| Script | 300 KB |
| Image | 500 KB |
| Total | 1000 KB |
| Time to interactive | 3000 ms |
| First contentful paint | 1500 ms |

## Measure & Monitor
- Tools: Lighthouse (Chrome DevTools), PageSpeed Insights, WebPageTest.
- Chrome DevTools Performance tab for profiling; Real User Monitoring (RUM) for actual user data.
- Track: LCP, INP, CLS, TTFB, FCP, Total Blocking Time (TBT), bundle size, page load time.
- Re-measure on every deploy.

## Common Mistakes
- Unoptimized images; no lazy loading; missing image dimensions (CLS).
- Large JavaScript bundles; no code splitting; render-blocking resources.
- Too many third-party scripts; synchronous loading of everything.
- No caching strategy; unminified assets.

## Record in project docs
- Current LCP/INP/CLS scores and status; optimization status (images, splitting, lazy loading, caching, fonts).
- JS/CSS bundle sizes vs budget; budget defined/enforced.
- Monitoring tool and frequency; known issues; next steps.