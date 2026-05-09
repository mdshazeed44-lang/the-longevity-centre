<div align="center">

# TLC — The Longevity Centre

A premium, editorial marketing site for **The Longevity Centre**, India's
doctor-led precision longevity programme with 8 clinics nationwide.

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Deploy: Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ✨ What's inside

A multi-page marketing site built around six longevity programmes, eight
physical clinics, and a documented diagnostics catalogue.

### Pages (15)

| Path                        | Component                  | Purpose |
|---                          |---                         |---      |
| `/`                         | `HomePage`                 | Hero brand-reel, benefits, programmes, science cards, method, results, editorial, video testimonials, clinics map, FAQ, final CTA |
| `/about-us`                 | `AboutPage`                | Founders, mission, specialist team, by-the-numbers |
| `/centres`                  | `CentresPage`              | Directory of all 8 clinics |
| `/centres/:slug`            | `CentreDetailPage`         | Per-clinic detail, photos, GMB reviews, map |
| `/programs`                 | `ProgramsIndexPage`        | 6 flagship programmes (editorial hero) |
| `/programs/:slug`           | `ProgramDetailPage`        | Per-programme deep dive |
| `/longevity-program`        | `LongevityProgramPage`     | Anti-Aging Blueprint long-form page |
| `/diagnostics`              | `DiagnosticsPage`          | Diagnostics catalogue |
| `/diagnostics/:slug`        | `DiagnosticDetailPage`     | Individual test detail (BMD, EndoPAT, etc.) |
| `/skin-aesthetics`          | `SkinAestheticsPage`       | Skin & aesthetics index |
| `/skin-aesthetics/:slug`    | `SkinAestheticsDetailPage` | Individual treatment detail |
| `/contact`                  | `ContactPage`              | Direct contact + booking |
| `/privacy` · `/terms`       | `PrivacyPage` · `TermsPage`| Legal |
| `/demo`                     | `BenefitsDemoPage`         | Internal benefit-card playground |

### UX & motion

- **Cinematic hero brand-reel** — 4-clip cross-fade montage (DNA · cycling · wellness · clinic), Ken Burns held tight so HD source reads sharp
- **Magazine-masthead floating header** with two-tier scroll behaviour and a fullscreen mobile menu
- **6 flagship programmes** as a smooth-glide stacking deck (signature animation)
- **5-step "TLC Method"** sticky cross-fade timeline
- **Real patient video testimonials** with viewport-fitting lightbox (no head-clipping on portrait clips)
- **3-layer animated cursor** with lerp trail and hover scaling
- **Lenis smooth scroll** + GSAP `ScrollTrigger` reveals throughout
- **Fully responsive** — iPhone, Android, tablet, desktop verified

### SEO & accessibility

- Per-page `<title>`, meta description, canonical URL via `useDocumentMeta()` hook
- Site-wide JSON-LD `MedicalBusiness` with founders, services and per-clinic locations
- Per-page JSON-LD: `WebPage`, `AboutPage` + `Person` for founders, `MedicalClinic` per centre, `MedicalProcedure` for programmes, `FAQPage` for rich snippets
- `sitemap.xml` + `robots.txt`
- Skip-to-content link, `<main>` landmark, focus-visible rings, ARIA labels on icon-only buttons, `prefers-reduced-motion` respected globally

---

## 🛠 Tech stack

| Concern        | Choice |
|---             |---     |
| Framework      | **React 19** + **Vite 7** |
| Language       | **TypeScript 5** (strict mode) |
| Styling        | **Tailwind CSS 3** with a custom design-system palette |
| Animations     | **GSAP 3** + ScrollTrigger |
| Smooth scroll  | **Lenis** |
| Routing        | Hand-rolled path router (`src/routes.tsx`) — pages lazy-loaded |
| Icons          | Inline SVG (zero icon-library dependency) |
| Hosting        | **Vercel** (primary) — `netlify.toml` retained as fallback |

---

## 📂 Project structure

```
.
├── README.md
├── LICENSE
├── netlify.toml                     ← fallback build config (Vercel is primary)
├── .gitignore
└── tac-preview/                     ← the Vite app
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    ├── vercel.json                  ← primary deploy config + cache headers
    ├── tsconfig.{json,app,node}.json
    │
    ├── public/                      ← static assets, served at site root
    │   ├── favicon.ico, favicon-16/32, apple-touch-icon, icon-192/512
    │   ├── tlc-logo.png
    │   ├── main-map.webp            ← India map for the clinics band
    │   ├── robots.txt · sitemap.xml · site.webmanifest
    │   │
    │   ├── clinic-photos/           ← per-clinic real photography
    │   ├── team/                    ← founders + specialist headshots
    │   ├── diagnostics/             ← imagery for diagnostic detail pages
    │   ├── skin-aesthetics/         ← imagery for treatment detail pages
    │   ├── longevity/               ← editorial imagery for marketing cards
    │   │   └── brand/               ← brand mood/campaign imagery
    │   ├── og/                      ← per-page Open Graph share images
    │   └── videos/
    │       ├── hero-poster.jpg      ← LCP poster for the homepage hero
    │       ├── hero-clips/          ← 4-clip brand-reel (DNA, cycling, wellness, clinic)
    │       ├── about-candidates/    ← clip used on the About page
    │       ├── centres-clips/       ← clips used on the Centres index
    │       └── testimonials/        ← 4 patient stories + custom posters
    │
    └── src/
        ├── main.tsx                 ← React root
        ├── App.tsx                  ← chrome shell: Cursor + Header + <Router/> + Footer + Lenis
        ├── routes.tsx               ← path → page map (lazy-loaded)
        ├── index.css                ← Tailwind directives + global type rules
        │
        ├── pages/                   ← one component per route (HomePage, CentresPage, …)
        │
        ├── components/              ← header / footer / hero / programs deck etc.
        │   └── sections/            ← composable homepage sections (PressStrip, Faq, CtaBand, …)
        │
        ├── lib/
        │   ├── seo.ts               ← useDocumentMeta hook + JSON-LD helpers
        │   ├── motion.ts            ← prefers-reduced-motion helper
        │   ├── gsap.ts              ← shared GSAP plugin registration
        │   ├── centres.ts           ← per-clinic data (address, hours, GMB, photos)
        │   ├── programs.ts          ← per-programme data
        │   ├── diagnostics.ts       ← per-diagnostic data
        │   ├── skin-treatments.ts   ← per-treatment data
        │   └── contact.ts           ← phone / email / WhatsApp constants
        │
        └── types/
            └── globals.d.ts
```

---

## 🚀 Local development

```bash
cd tac-preview
npm install
npm run dev          # → http://localhost:5173
```

Vite HMR — saves reload in milliseconds.

---

## 📦 Production build

```bash
cd tac-preview
npm run build        # → tac-preview/dist/
npm run preview      # serve the built dist/ locally
npm run lint         # ESLint check
```

---

## ☁️ Deploying to Vercel

`tac-preview/vercel.json` declares the framework, build command, output dir and
cache headers. To wire up a new project:

1. Sign in at [vercel.com](https://vercel.com)
2. **Add new project → Import** and pick this GitHub repo
3. Set **root directory** to `tac-preview/`
4. Vercel reads `vercel.json` and auto-fills the rest. Click **Deploy**

For Netlify, point at the repo root and `netlify.toml` will pick up the build.

---

## 🎨 Design system

Custom colour tokens (defined in `tailwind.config.js`):

| Token         | Value     | Use |
|---            |---        |---  |
| `ink`         | `#1B1A18` | primary text · dark backgrounds |
| `cream`       | `#FAF6EF` | warm light background |
| `rust`        | `#945455` | brand accent · CTAs · active states |
| `rust-soft`   | `#B27A7B` | hover states · ambient glows |
| `iguana`      | `#7C8B5F` | secondary brand accent |
| `mist`        | `#E0DAD0` | borders · subtle dividers |
| `graphite`    | `#3A3833` | body text on light bg |
| `stone`       | `#7C7569` | secondary text · captions |

**Type:** Cabinet Grotesk for everything — display headings (700/800), body
(300/400/500), buttons (600). Loaded via `<link rel="preconnect">` to Fontshare
in `index.html`.

---

## 🧹 Code quality

- Strict TypeScript build (`tsc -b && vite build`)
- Every GSAP `ScrollTrigger` killed in `useEffect` cleanups
- Lenis instance destroyed on unmount
- Body-scroll lock released when modals / menus close
- All decorative SVGs marked `aria-hidden`; interactive elements have `aria-label`
- `prefers-reduced-motion` respected by the GSAP timelines
- Pages lazy-loaded via `React.lazy` so the first paint stays small

---

## 📝 Licence

Built privately for **The Longevity Centre**.

> _Practising medicine, not marketing._
