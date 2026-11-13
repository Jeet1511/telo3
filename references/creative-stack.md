# Creative Stack & Motion — the award execution bar

**Load when:** building ANY website or UI. This is the DEFAULT execution bar for websites, not only when the brief says "award". A concept alone is not enough — the stack and motion decide whether it reads as award-level or as a template. Plain single-file HTML is only for trivial/utility pages.

Principle: **match the stack to the ambition, and default high for websites.** A single hand-written `index.html` with fade-ins cannot reach the award bar. Use a real toolchain and a motion system, and implement the signature motion with the recipes below (do not approximate with IntersectionObserver fade-ins). Record the chosen stack in `design.md` and `architecture.md`.

## Stack decision

| Ambition | Stack |
|---|---|
| Award / immersive / 3D / creative | Vite + TypeScript (React or vanilla ES modules) + GSAP/ScrollTrigger + Lenis smooth scroll + Three.js **or** ogl + postprocessing; @react-three/fiber + drei if React |
| Product / SaaS / dashboard | Next.js or Vite + React + Tailwind + a motion lib (motion/Framer); crisp, fast, restrained |
| Content / editorial / docs | Astro or Next + MDX; typography-first, minimal JS |
| Simple / utility / prototype | Plain HTML/CSS/JS is fine — do not over-engineer |

Never ship a single-file HTML for an "extraordinary" brief. Scaffold with `npm create vite@latest` (or the framework's CLI), install real deps, and run a dev server. Commit the toolchain, not a CDN-only page.

## Motion & presentation playbook (pick ONE signature, support with micro-interactions)

- **Preloader** with real progress that reveals the hero (counter / curtain / clip-path).
- **Smooth scroll** (Lenis) synced to GSAP ScrollTrigger; scrub, don't just trigger.
- **Scroll-scrubbed 3D camera** or object (Three.js/ogl) — the signature moment for immersive sites.
- **Split-text stagger** on headings (chars/words/lines) with expo easing `cubic-bezier(.16,1,.3,1)`.
- **Clip-path / mask image reveals** and parallax layers tied to scroll.
- **Pinned sections** and horizontal-scroll galleries for case studies / products.
- **Custom cursor** (dot + ring, magnetic on hover) and magnetic buttons.
- **Marquee** strips for credits / keywords; hover-distortion on images (WebGL shader).
- **Postprocessing**: subtle bloom / film grain / chromatic aberration for depth (not on everything).
- **View()/scroll-timeline CSS** where supported as a zero-dep fallback.
- Optional **sound design** on key interactions, muted by default.

Restraint: one signature moment + coherent micro-interactions beats ten effects. 60fps; `prefers-reduced-motion` fallback; lazy-load heavy assets; dispose WebGL on unmount.

## UI/UX taste

- Oversized expressive display type + readable text; fluid `clamp()` scale; one oversized hero moment.
- Editorial/asymmetric grid with a deliberate break and a clear focal point; whitespace as an element.
- Cohesive palette: primary + one signature accent; texture/depth (grain/duotone) over flat white.
- Real, art-directed imagery and copy integrated into the layout; no lorem/fake stats.
- Nav findable <3s; keyboard/focus/contrast AA; mobile designed in parallel.

## Study real shipped work (remix techniques, never templates)

- Libs: github.com/greensock/GSAP, mrdoob/three.js, pmndrs/react-three-fiber + drei, pmndrs/postprocessing, darkroomengineering/lenis, oframe/ogl.
- Galleries: awwwards.com, godly.website, lapa.ninja, siteinspire.com, curations.supply.
- Techniques/learning: tympanus.net/codrops, threejs-journey.com, gsap.com/docs.
- Reference builds: github.com/Ali-Sanati/awwwards-portfolio (React+GSAP+Three), lusion.co, cuberto.com.

## Implementation recipes (copy, adapt, combine — real code, not names)

Install: `npm i gsap lenis three` (add `@react-three/fiber @react-three/drei` for React). Scaffold with `npm create vite@latest`.

**Smooth scroll + scrub (the backbone):**
```js
import Lenis from 'lenis'; import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ lerp: 0.1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
```

**Split-text stagger hero:**
```js
const el = document.querySelector('[data-split]');
el.innerHTML = el.textContent.split(' ').map(w => `<span class="w"><span class="i">${w}</span></span>`).join(' ');
gsap.from('.i', { yPercent: 110, rotate: 4, stagger: 0.06, duration: 1, ease: 'expo.out', delay: 0.2 });
```

**Scroll-scrubbed reveal / parallax:**
```js
gsap.to('.hero-img', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: true } });
gsap.from('.card', { y: 60, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: '.grid', start: 'top 80%' } });
```

**Clip-path image reveal:**
```js
gsap.fromTo('.reveal', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: '.reveal', start: 'top 75%' } });
```

**Pinned horizontal gallery:**
```js
const track = document.querySelector('.track');
gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: '.gallery', pin: true, scrub: 1, end: () => '+=' + (track.scrollWidth - innerWidth) } });
```

**Custom cursor + magnetic button:**
```js
const cur = document.querySelector('.cursor');
addEventListener('pointermove', e => gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'expo.out' }));
document.querySelectorAll('[data-magnet]').forEach(b => b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width/2)*0.3, y: (e.clientY - r.top - r.height/2)*0.3 }); }));
```

**Preloader → hero reveal:**
```js
const tl = gsap.timeline();
tl.to('.loader-count', { textContent: 100, snap: { textContent: 1 }, duration: 1.2 })
  .to('.loader', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' })
  .from('.hero .i', { yPercent: 110, stagger: 0.06, ease: 'expo.out' }, '-=0.4');
```

**Three.js hero (signature 3D):**
```js
import * as THREE from 'three';
const r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); r.setSize(innerWidth, innerHeight);
document.querySelector('.webgl').appendChild(r.domElement);
const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, .1, 100); cam.position.z = 5;
const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 32), new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: .25, metalness: .6 }));
scene.add(mesh, new THREE.DirectionalLight(0xffffff, 2), new THREE.AmbientLight(0xffffff, .4));
gsap.ticker.add(() => { mesh.rotation.y += 0.003; r.render(scene, cam); });
// scrub camera on scroll: gsap.to(cam.position, { z: 2.5, scrollTrigger: { scrub: true } });
```

Always add `@media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }` and gate Lenis/scrub behind `matchMedia('(prefers-reduced-motion: no-preference)')`. Dispose WebGL on unmount; lazy-load heavy assets.

## Verification gate

1. `telo3 design-check` for source signals (not taste).
2. Run the dev server; render + screenshot desktop AND mobile; confirm the signature motion actually runs at 60fps and reduced-motion works.
3. Critique against the rubric (Design 40 / Usability 30 / Creativity 20 / Content 10); if it reads as a template, redo the art direction and motion.
4. Only then claim done. Use `visual-qa` when available.
