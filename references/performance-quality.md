# Performance Quality Standards

> Performance optimization framework focusing on Core Web Vitals and user experience.

---

## Core Web Vitals

### 1. LCP (Largest Contentful Paint)
**Measures:** Loading performance  
**Target:** < 2.5 seconds  
**Good:** < 2.5s | **Needs Improvement:** 2.5-4s | **Poor:** > 4s

**How to improve:**
- Optimize images (WebP/AVIF, proper sizing)
- Reduce server response time (TTFB)
- Remove render-blocking resources
- Use CDN
- Implement caching
- Preload critical resources

### 2. INP (Interaction to Next Paint)
**Replaces:** FID (First Input Delay)  
**Measures:** Responsiveness  
**Target:** < 200ms  
**Good:** < 200ms | **Needs Improvement:** 200-500ms | **Poor:** > 500ms

**How to improve:**
- Minimize JavaScript execution
- Break up long tasks
- Optimize event handlers
- Use web workers for heavy computation
- Debounce/throttle frequent events
- Code split large bundles

### 3. CLS (Cumulative Layout Shift)
**Measures:** Visual stability  
**Target:** < 0.1  
**Good:** < 0.1 | **Needs Improvement:** 0.1-0.25 | **Poor:** > 0.25

**How to improve:**
- Set image dimensions (width/height)
- Set dimensions for ads/embeds
- Avoid inserting content above existing content
- Use CSS transforms for animations
- Preload fonts
- Reserve space for dynamic content

---

## Performance Audit Checklist

### Images
- [ ] Images optimized (compressed)
- [ ] Modern formats (WebP, AVIF with fallbacks)
- [ ] Appropriate sizing (no giant images scaled down)
- [ ] Lazy loading for below-the-fold images
- [ ] Responsive images (`srcset`, `sizes`)
- [ ] Image dimensions set (prevent CLS)
- [ ] Critical images preloaded

### JavaScript
- [ ] Minimize JavaScript bundle size
- [ ] Code splitting implemented
- [ ] Tree shaking enabled
- [ ] Unused code removed
- [ ] Third-party scripts minimized
- [ ] Scripts loaded async/defer where appropriate
- [ ] No render-blocking JavaScript

### CSS
- [ ] Critical CSS inlined
- [ ] Unused CSS removed
- [ ] CSS minified
- [ ] No render-blocking stylesheets (or minimal)

### Fonts
- [ ] Font files optimized (woff2)
- [ ] Fonts preloaded
- [ ] `font-display: swap` used
- [ ] System fonts considered (fastest)
- [ ] Subsetting used if applicable

### Caching
- [ ] Static assets cached (long cache lifetime)
- [ ] Cache-Control headers set
- [ ] Service worker implemented (if applicable)
- [ ] CDN used for static assets

### Server
- [ ] Fast server response time (TTFB < 200ms)
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] Compression enabled (gzip/brotli)
- [ ] Database queries optimized
- [ ] API responses cached where appropriate

### Rendering
- [ ] Server-side rendering or static generation (for public content)
- [ ] Avoid layout shifts
- [ ] Minimize reflows/repaints
- [ ] Use CSS transforms for animations (GPU-accelerated)

### Third-Party Resources
- [ ] Minimize third-party scripts
- [ ] Load third-party scripts async
- [ ] Consider self-hosting third-party resources
- [ ] Use facade technique for embeds (YouTube, etc.)

---

## Image Optimization

### Format Selection
- **WebP:** Good balance (support: 95%+)
- **AVIF:** Best compression (support: 85%+, use with fallback)
- **JPEG:** Fallback for photos
- **PNG:** Fallback for graphics with transparency
- **SVG:** Vector graphics (icons, logos)

### Responsive Images

```html
<img
  src="/image.jpg"
  srcset="
    /image-320w.jpg 320w,
    /image-640w.jpg 640w,
    /image-1280w.jpg 1280w
  "
  sizes="(max-width: 640px) 100vw, 640px"
  alt="Description"
  width="640"
  height="480"
  loading="lazy"
/>
```

### Next.js Image Optimization

```jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={640}
  height={480}
  loading="lazy" // or "eager" for above-fold
  placeholder="blur"
  blurDataURL="..."
/>
```

---

## Code Splitting

### Dynamic Imports

```javascript
// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Lazy load library
button.addEventListener('click', async () => {
  const {default: library} = await import('heavy-library');
  library.doSomething();
});
```

### Route-Based Splitting
Next.js automatically code-splits by page.

---

## Font Loading Strategy

### Option 1: System Fonts (Fastest)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Option 2: Self-Hosted Fonts
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

### Option 3: next/font (Next.js)
```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

---

## Lazy Loading

### Images
```html
<img src="image.jpg" alt="Description" loading="lazy">
```

### Components (React)
```javascript
const LazyComponent = React.lazy(() => import('./Component'));

<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

### Intersection Observer (Custom)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load resource
    }
  });
});

observer.observe(element);
```

---

## Measuring Performance

### Tools
- **Lighthouse** (Chrome DevTools) — Comprehensive audit
- **PageSpeed Insights** — Google's tool
- **WebPageTest** — Detailed analysis
- **Chrome DevTools Performance tab** — Profiling
- **Real User Monitoring (RUM)** — Actual user data

### Metrics to Track
- Largest Contentful Paint (LCP)
- Interaction to Next Paint (INP)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Bundle size
- Page load time

---

## Performance Budget

Set limits to prevent regression:

```json
{
  "budgets": [
    {
      "resourceSizes": [
        {"resourceType": "script", "budget": 300},
        {"resourceType": "image", "budget": 500},
        {"resourceType": "total", "budget": 1000}
      ],
      "timings": [
        {"metric": "interactive", "budget": 3000},
        {"metric": "first-contentful-paint", "budget": 1500}
      ]
    }
  ]
}
```

---

## Common Performance Mistakes

❌ Unoptimized images  
❌ No lazy loading  
❌ Large JavaScript bundles  
❌ Render-blocking resources  
❌ Missing image dimensions (CLS)  
❌ Too many third-party scripts  
❌ No caching strategy  
❌ Unminified assets  
❌ Synchronous loading of everything  
❌ No code splitting  

---

## Performance Documentation Template

```markdown
## Performance

### Core Web Vitals
- **LCP:** [Current score]
- **INP:** [Current score]
- **CLS:** [Current score]
- **Status:** [Good / Needs improvement]

### Optimization Status
- **Images:** [Optimized (WebP/AVIF) / Needs work]
- **Code splitting:** [Implemented / Not implemented]
- **Lazy loading:** [Implemented / Partial]
- **Caching:** [Configured / Needs configuration]
- **Fonts:** [Optimized / Using system fonts]

### Bundle Size
- **Total JavaScript:** [Size] KB
- **Total CSS:** [Size] KB
- **Budget:** [Target sizes]

### Performance Budget
- **Defined:** [Yes/No]
- **Enforced:** [Yes/No]

### Monitoring
- **Tool:** [e.g., Lighthouse, Web Vitals, RUM]
- **Frequency:** [e.g., On every deploy]

### Known Issues
- [List performance issues or "None known"]

### Next Steps
- [ ] [Performance task 1]
- [ ] [Performance task 2]
```

---

## Quick Wins

1. Optimize images (WebP + lazy load)
2. Add image dimensions (prevent CLS)
3. Remove unused JavaScript/CSS
4. Enable compression (gzip/brotli)
5. Use CDN for static assets
6. Preload critical resources
7. Lazy load below-the-fold content
8. Minimize third-party scripts
9. Use `font-display: swap`
10. Set performance budget

---

**Summary:** Performance is a feature, not an afterthought. Focus on Core Web Vitals. Optimize images, minimize JavaScript, prevent layout shifts, and measure continuously.

**Remember:** Don't optimize prematurely—measure first, then optimize where it matters most to users.
