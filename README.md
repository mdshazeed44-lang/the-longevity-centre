<div align="center">

# The Anti-Aging Centre — Premium Longevity Medicine

A cinematic, editorial-style marketing website for **TAC**, India's leading
preventive medicine and anti-aging clinic with five centres nationwide.

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Deploy: Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com)

</div>

---

## ✨ What's inside

A premium single-page marketing site featuring:

- **Cinematic full-bleed hero** with autoplay video background, custom scroll indicator and floating contact pill
- **Magazine-masthead floating header** with two-tier scroll behaviour, real-time scroll-progress bar, animated active-section indicator and a fullscreen mobile menu
- **5 flagship programmes** (Longevity Plus · Metabolic & Diabetes · Gut Correction · Medical Weight Loss · Skin & Aesthetics) showcased as a smooth-glide stacking deck
- **5-step "TAC Method" timeline** with a sticky cross-fading image and progress rail
- **Real patient video testimonials** in an Infinite Cinema Marquee with sweeping projector lights and a fullscreen lightbox modal
- **Compact 5-clinic directory** with featured Online card for pan-India consultations
- **Premium dark footer** with social links and a big brand statement
- **3-layer animated cursor** with shadow glow, lerp trail and hover scaling
- **Lenis smooth scroll** + GSAP scroll-triggered reveals throughout
- **Fully responsive** — mobile, tablet, and desktop verified

---

## 🛠 Tech Stack

| Concern        | Choice |
|---             |---     |
| Framework      | **React 19** + **Vite 7** |
| Language       | **TypeScript 5** (strict mode) |
| Styling        | **Tailwind CSS 3** with a custom design-system palette |
| Animations     | **GSAP 3** + ScrollTrigger |
| Smooth scroll  | **Lenis** (ex-Studio Freight) |
| Icons          | Inline SVG (zero icon-library dependency) |
| Fonts          | **Cabinet Grotesk** (Fontshare) for everything · **Alex Brush** kept as legacy script |
| Hosting        | **Netlify** (SPA + edge cache headers) |

---

## 📂 Project structure

```
.
├── README.md                       ← you are here
├── netlify.toml                    ← build & deploy config + cache headers
├── .gitignore
└── tac-preview/                    ← the Vite app
    ├── index.html                  ← entry HTML, font preconnects
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    ├── tsconfig.{json,app,node}
    ├── public/
    │   ├── favicon.svg
    │   ├── new-logo-white.webp     ← official TAC logo
    │   └── videos/
    │       ├── hero.mp4            ← 13 MB cinematic hero background
    │       └── testimonials/
    │           ├── *.mp4           ← 4 compressed patient videos (60 MB total)
    │           └── posters/        ← custom thumbnails for each
    └── src/
        ├── App.tsx                 ← section composition + Header + Footer + body styling
        ├── main.tsx                ← React root
        ├── index.css               ← Tailwind directives + global type rules
        ├── lib/
        │   └── motion.ts           ← reduced-motion helper
        └── components/
            ├── Cursor.tsx          ← 3-layer custom cursor with shadow glow
            ├── Hero.tsx            ← cinematic video hero with masked-text reveal
            ├── Logo.tsx            ← TAC brand mark wrapper
            ├── Method.tsx          ← 5-step sticky cross-fade timeline
            ├── Preloader.tsx       ← branded curtain loader
            ├── Programs.tsx        ← 5-card stacking-deck animation
            └── VideoTestimonials.tsx  ← Infinite Cinema Marquee
```

---

## 🚀 Local development

```bash
cd tac-preview
npm install
npm run dev          # → http://localhost:5180
```

The dev server uses Vite's HMR — saves reload in milliseconds.

---

## 📦 Production build

```bash
cd tac-preview
npm run build        # → tac-preview/dist/
npm run preview      # serve the built dist/ locally
```

**Output stats:**

| Asset           | Size  |
|---              |---    |
| `index.html`    | ~4 KB |
| JS (gzipped)    | ~126 KB |
| CSS             | ~36 KB |
| Videos (total)  | 72 MB (98% of bundle) |

---

## ☁️ Deploying to Netlify

The repo includes a `netlify.toml` at the root with the correct settings,
SPA-fallback redirect, and aggressive cache headers for static assets.

**One-click deploy via GitHub:**

1. Sign in at [app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project**
3. Authorize GitHub and pick this repo
4. All settings auto-fill from `netlify.toml` — just click **Deploy site**
5. Site goes live at `https://<random>.netlify.app` in ~3 minutes

**Drag-and-drop deploy:**

1. Run `npm run build` locally inside `tac-preview/`
2. Drag the resulting `tac-preview/dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🎨 Design system

Custom colour tokens (defined in `tailwind.config.js`):

| Token         | Value     | Use |
|---            |---        |---  |
| `ink`         | `#1B1A18` | primary text · dark backgrounds |
| `cream`       | `#FAF6EF` | warm light background |
| `rust`        | `#945455` | brand accent · CTAs · active states |
| `rust-soft`   | `#B27A7B` | hover states · ambient glows |
| `mist`        | `#E0DAD0` | borders · subtle dividers |
| `graphite`    | `#3A3833` | body text on light bg |
| `stone`       | `#7C7569` | secondary text · captions |
| `green-soft`  | `#4A5648` | "live" indicator dot |

**Type:** Cabinet Grotesk for everything — display headings (700/800), body
(300/400/500), buttons (600). Loaded once via `<link rel="preconnect">` to
Fontshare in `index.html`.

---

## 📄 Content source

All copy, patient names, programme descriptions and clinic data are sourced
verbatim from the official client website at
**[theantiagingcentre.com](https://theantiagingcentre.com)**.

Patient testimonial videos are downloaded from the source site and locally
re-encoded with Intel QSV + libx264 (premium quality preserved):

| Patient            | Original | Compressed | Saved |
|---                 |---       |---         |---    |
| Mr. Abhinav Saxena | 445 MB   | 24.5 MB    | 94.5% |
| Mr. Bhushan Kamble | 100 MB   | 11.2 MB    | 88.8% |
| Mr. Shaun Gomez    | 152 MB   | 13.2 MB    | 91.4% |
| Mrs. Sadhna Gupta  |  12 MB   | 11.8 MB    | (kept raw) |

Raw uncompressed source files are excluded from the repo via `.gitignore`
(`*_raw.{mp4,webm,mov}`).

---

## 🧹 Code quality

- Clean separation: 7 focused per-section components inside `src/components/`
- Strict TypeScript build (`tsc -b && vite build`)
- Every GSAP `ScrollTrigger` is properly killed in `useEffect` cleanups
- Lenis instance is destroyed on unmount
- Body-scroll lock is released when modals/menus close
- All decorative SVGs marked `aria-hidden`; interactive elements have `aria-label`
- `prefers-reduced-motion` respected by the GSAP timelines

---

## 📝 Licence

Built privately for **The Anti-Aging Centre**.

> _Practising medicine, not marketing._
