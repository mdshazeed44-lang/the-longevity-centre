# CLAUDE.md — The Longevity Centre

Project context for future Claude Code sessions. Read this first before
making changes.

## Project

- **Site:** The Longevity Centre (`thelongevitycentre.co`)
- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS, with GSAP +
  Lenis for motion
- **Source:** `tac-preview/` (the app lives here; the repo root is one
  level up at `the-longevity-centre/`)
- **Hosting:** Hostinger shared (Apache). Deploy by uploading a zip of
  the built `dist/` folder into `public_html/` and extracting.
- **Domain migration:** The new TLC site is the successor to the old
  `theantiagingcentre.com` (TAC). Many of the redirects, blog routes
  and SEO landing pages exist to preserve the old domain's search
  ranking once the 301 from TAC starts pointing here.

## Quick commands

```bash
cd tac-preview
npm install              # first time
npm run dev              # local dev server on :5180
npm run build            # production build to dist/
npx tsc --noEmit         # type check (no emit)
```

## Routing — `src/routes.tsx`

The router is hand-rolled (no react-router). Three things live in this
file:

1. **`REDIRECTS`** — flat key→value map of old paths to new ones. Runs
   synchronously on module load via `applyRedirect()` so the very first
   render already sees the corrected path. Used for the legacy
   theantiagingcentre.com URL space.
2. **`ROUTES`** — ordered table of exact / prefix path matches mapped
   to lazy-loaded page components.
3. **`BLOG_SLUGS`** / **`LANDING_SLUGS`** — arrays that spread into
   `ROUTES` to give each migrated blog post / SEO landing its own
   root-level path matching the legacy URL.

When adding a blog, edit `src/lib/blogs.ts` AND add the slug to
`BLOG_SLUGS` — they must stay in lockstep.

## Content data files (`src/lib/`)

| File | What's in it |
|---|---|
| `programs.ts` | 7 flagship programmes (Metabolic, Gut, Longevity Plus, Cancer Prevention, etc.) |
| `centres.ts` | 8 clinics (Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad, Bangalore) |
| `diagnostics.ts` | 9 diagnostic tests (Blood Tests, EndoPAT, BCA, BMD, GeneticTesting, etc.) |
| `skin-treatments.ts` | 8 skin & aesthetic services (PRP, Peels, Hydrafacial, Microneedling, Laser Hair, Hair Loss, Hair Transplant, Fillers/Botox) |
| `blogs.ts` | 25 migrated blog posts. Sorted by Semrush traffic on the index page. |
| `landings.ts` | 5 SEO landing pages (best-longevity-clinic-in-india, etc.) — full content, not just redirects |
| `seo.ts` | `useDocumentMeta`, breadcrumb / Article JSON-LD helpers |
| `markdown.tsx` | In-house markdown renderer. We do **not** use react-markdown — it has an "Invalid hook call" incompatibility with React 19 in this project. |

## Build output (`dist/`)

After `npm run build`, the upload-ready output is in `tac-preview/dist/`.
It includes:

- All hashed JS/CSS chunks in `assets/`
- All public assets copied from `public/`: blog/, landings/, longevity/,
  team/, videos/, etc.
- **`.htaccess`** at the root — bundled because Vite copies `public/.htaccess`
  through to `dist/.htaccess`. This file is critical for SPA routing on
  Apache (Hostinger). See the **Deploy** section below.

## Deploy to Hostinger

```bash
cd tac-preview
npm run build
# Now zip dist/ contents. PowerShell's Compress-Archive writes Windows
# backslashes that Linux can't extract into folders, so use the Node
# script (see "Why not Compress-Archive" below).
```

To create a proper deploy zip on Windows:

```bash
npm install --no-save archiver
node make-zip.cjs   # ad-hoc script — see DEPLOY.md if it exists
```

The zip needs:
- All 238+ files from `dist/`
- Forward-slash paths (Linux compatibility)
- `.htaccess` at root (Hostinger's File Manager may hide dot files —
  enable "Show hidden files" to verify)

Upload + extract into Hostinger `public_html/` root. Hostinger's File
Manager can time out on extraction of 90+ MB zips. If that happens,
use FileZilla / FTP for direct file upload instead.

## `.htaccess` — critical config

Lives at `public/.htaccess` (bundled into `dist/.htaccess` by the build).
Two non-obvious rules in it:

1. **`DirectorySlash Off`** — mod_dir would otherwise 301-redirect
   `/skin-aesthetics` → `/skin-aesthetics/` because that path is a
   real folder on disk (containing skin treatment images). The redirect
   happens before our SPA rewrite, so we lose the chance to send the
   request to React Router.
2. **`RewriteCond %{REQUEST_FILENAME} !-f`** only (no `!-d`) — we
   deliberately **do not** skip the rewrite for directories. The build
   contains folders whose names collide with React routes (`blog/`,
   `diagnostics/`, `skin-aesthetics/`). With `!-d` those folder requests
   land on Apache's directory handler, find no `index.html`, and return
   `403 Forbidden`. By only checking for real files, we correctly
   rewrite folder-name requests to `index.html` so React Router resolves
   them client-side, while individual asset files
   (`/skin-aesthetics/01-prp-acp.jpg`) still serve directly because
   they ARE real files.

## React 19 gotchas

- **react-markdown 10.x does not work** with React 19 in this project
  (Invalid hook call errors fire globally, breaking every lazy page).
  We ship our own `src/lib/markdown.tsx` instead — a minimal renderer
  for the markdown subset the migrated blog content uses (headings,
  lists, links, **bold**, *italic*, `code`, blockquotes, `---`).
- **Vite dev cache header** is set to `no-cache, no-store, must-revalidate`
  in `vite.config.ts` `server.headers`. The default `max-age=3600` once
  made an "Invalid hook call" survive on disk long after the fix was
  shipped — debugging took hours. Don't re-enable dev caching.

## SEO migration from theantiagingcentre.com

The old TAC site had ~155 indexed URLs. Coverage on the new site:

- **25 blog posts** migrated as full content at the same root-level
  URLs (`/10-tips-for-good-health` etc.). See `BLOG_SLUGS` in
  `routes.tsx` and `BLOGS` in `lib/blogs.ts`.
- **5 SEO landing pages** migrated as full content (`LANDING_SLUGS`
  + `LANDINGS` in `lib/landings.ts`).
- **~110 legacy URLs** mapped via `REDIRECTS` in `routes.tsx`. Grouped
  by category in the file with comments — programmes, diagnostics
  (slug renames like `bca` → `body-composition`), skin-aesthetics root
  → nested, location-targeted SEO pages, intent-targeted SEO pages,
  and zero-traffic topical blog redirects.

When adding NEW redirects: append to the `REDIRECTS` map. When changing
a migrated blog's slug: don't — keep the slug stable to preserve the
ranking the old domain has.

## What NOT to add

- ❌ `react-markdown` (breaks React 19 — see above)
- ❌ `react-router` (we have a 50-line router that works fine)
- ❌ Heavy dev cache headers (broke debugging once, will again)
- ❌ Three skin treatments that briefly existed and were removed per
  client: `cool-sculpting`, `viora-rf`, `wonder-muscle`. Their legacy
  redirects now point to `/skin-aesthetics` index.

## Recent session summary (2026-05-26)

Worked in one long session through these in order:

1. Removed Dr. Vaibhav Bhisikar from the specialists list
2. Removed the Optional Add-ons section from Cancer Prevention
3. Bumped Cancer Prevention biomarker count from 160+ to 1000+
4. Added Dr. Rizwan; updated Dr. Rahul & Dr. Pooja photos
5. Fixed face cropping for new portraits
6. Set up legacy URL redirects (initially 3, eventually 110+)
7. Built the blog system: BlogListPage + BlogDetailPage + 25 migrated
   posts. Also fixed the react-markdown / React 19 incompatibility by
   shipping our own markdown component.
8. Added 5 SEO landing pages (best-longevity-clinic, anti-aging-cost,
   etc.) as full content pages instead of redirects.
9. Replaced AI/cartoon hero images on landings with real TLC clinical
   photos from `clinic-photos/` and `skin-aesthetics/`.
10. Built proper Linux-compatible deploy zip using `archiver` (not
    PowerShell Compress-Archive).
11. Fixed `.htaccess` to handle folder-route name collisions
    (skin-aesthetics, diagnostics, blog).
12. Removed cool-sculpting / viora-rf / wonder-muscle pages per
    client; redirected their old URLs to `/skin-aesthetics`.

The last green-light test ran 97 URLs against the live site and all
returned HTTP 200.
