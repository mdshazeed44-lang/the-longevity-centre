/**
 * inject-meta.cjs
 *
 * Post-build step. Generates a per-route copy of dist/index.html with
 * the correct <title>, <meta name="description">, canonical URL and the
 * OG/Twitter equivalents baked into the raw HTML.
 *
 * Why this exists:
 *   Crawlers that don't execute JavaScript (Ahrefs default plan, Bing,
 *   social-share scrapers, the slow path of Googlebot) see the same
 *   homepage title + canonical on every page because useDocumentMeta
 *   only runs after React hydrates. Ahrefs reported every URL with
 *   identical title and `canonical = https://thelongevitycentre.co/`,
 *   which would cause Google to dedupe 70+ pages into one. Pre-baking
 *   the meta tags into the static HTML fixes that without server-side
 *   rendering the entire page.
 *
 * How it works:
 *   1. Bundle each lib/*.ts data file to CJS with esbuild (already a
 *      Vite transitive dep, no new install).
 *   2. Build a URL → { title, description } map from BLOGS, LANDINGS,
 *      PROGRAMS, CENTRES, DIAGNOSTICS, SKIN_TREATMENTS, plus a hand-
 *      written list for the static top-level pages.
 *   3. For each entry, take dist/index.html as template, swap in the
 *      route-specific meta tags + canonical, and write it to
 *      dist/<route>/index.html.
 *   4. .htaccess (public/.htaccess) is updated separately to prefer the
 *      per-route file before falling back to root index.html for SPA.
 *
 * Body remains <div id="root"></div> in every file — React still
 * hydrates from scratch on the client.
 */

const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const LIB = path.join(ROOT, 'src', 'lib')
const SITE = 'https://thelongevitycentre.co'

// ── Helpers ────────────────────────────────────────────────────────────

function htmlEscape(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function loadLibModule(relPath) {
  const tempOut = path.join(__dirname, '_temp_' + path.basename(relPath, '.ts') + '.cjs')
  esbuild.buildSync({
    entryPoints: [path.join(LIB, relPath)],
    outfile: tempOut,
    format: 'cjs',
    platform: 'node',
    bundle: true,
    target: 'node18',
    logLevel: 'silent',
  })
  delete require.cache[require.resolve(tempOut)]
  const mod = require(tempOut)
  fs.unlinkSync(tempOut)
  return mod
}

/**
 * Replace a single tag in the template HTML. Uses a permissive regex
 * that survives multi-line attribute formatting (the source index.html
 * wraps long description content="..." across several lines).
 */
function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement)
}

// ── 1. Load all data sources ───────────────────────────────────────────

const blogs = loadLibModule('blogs.ts')
const landings = loadLibModule('landings.ts')
const programs = loadLibModule('programs.ts')
const centres = loadLibModule('centres.ts')
const diagnostics = loadLibModule('diagnostics.ts')
const skin = loadLibModule('skin-treatments.ts')

// ── 2. Build the URL → meta map ────────────────────────────────────────

/** @type {{ path: string, title: string, description: string }[]} */
const entries = []

// Static top-level pages (handwritten — these have unique titles set in
// each page component via useDocumentMeta; we mirror them here so the
// raw HTML matches what the React client will set after hydration).
entries.push(
  { path: '/about-us', title: 'About TLC · Founders, Vision & Specialist Team', description: 'Meet the founders of The Longevity Centre — 20+ years of preventive medicine, longevity science and aesthetic expertise across 8 Indian cities.' },
  { path: '/about', title: 'About TLC · Founders, Vision & Specialist Team', description: 'Meet the founders of The Longevity Centre — 20+ years of preventive medicine, longevity science and aesthetic expertise across 8 Indian cities.' },
  { path: '/centres', title: 'Our Centres · TLC Clinics Across 8 Indian Cities', description: 'TLC operates 8 clinics — Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad, Bangalore. Diagnostics-led, physician-guided preventive medicine, one record.' },
  { path: '/contact', title: 'Contact TLC — Book a 30-Minute Consultation', description: 'Book a consultation with the TLC clinical team across 8 Indian cities. Phone, email and address details for each centre.' },
  { path: '/privacy', title: 'Privacy Policy · TLC — The Longevity Centre', description: 'How The Longevity Centre handles personal and medical information across our clinics and digital products.' },
  { path: '/terms', title: 'Terms of Service · TLC — The Longevity Centre', description: 'Terms governing your use of The Longevity Centre website and clinical services.' },
  { path: '/programs', title: 'Programmes · TLC — Diagnostics-Led Longevity & Metabolic Care', description: 'Seven flagship programmes — metabolic & weight, gut & microbiome, longevity-plus, cancer prevention, PCOD, diabetes reversal and advanced metabolomics.' },
  { path: '/diagnostics', title: 'Diagnostics · TLC — Gold-Standard Longevity Testing', description: 'Comprehensive longevity diagnostics — biological age clocks, genomic testing, whole-genome gut microbiome, advanced blood panels, EndoPAT, BCA, BMD.' },
  { path: '/skin-aesthetics', title: 'Skin & Aesthetics · TLC — The Longevity Centre', description: 'Eight evidence-led skin and aesthetic treatments — PRP, microneedling, hydrafacial, laser hair reduction, hair-loss solutions, fillers & botox.' },
  { path: '/blog', title: 'TLC Insights — Longevity, Wellness & Anti-Aging Articles', description: 'Evidence-led articles on longevity, gut health, hormones, skin, weight and preventive medicine — written by the TLC clinical team.' },
  { path: '/longevity-program', title: 'Longevity Programme · The 12-Month Flagship · TLC', description: 'TLC\'s flagship 12-month longevity programme — three biological age clocks tracked, full genomic + microbiome sequencing, end-to-end physician care.' },
)

// Blogs — 25 migrated posts at root-level slugs
;(blogs.BLOGS || []).forEach((b) => {
  entries.push({
    path: '/' + b.slug,
    title: b.metaTitle,
    description: b.metaDescription,
  })
})

// SEO landing pages — 5 evergreen guides at root-level slugs
;(landings.LANDINGS || []).forEach((l) => {
  entries.push({
    path: '/' + l.slug,
    title: l.metaTitle,
    description: l.metaDescription,
  })
})

// Programmes — 7 detail pages
;(programs.PROGRAMS || []).forEach((p) => {
  entries.push({
    path: '/programs/' + p.slug,
    title: `${p.shortTitle} · TLC Programme`,
    description: (p.focus || p.desc || '').slice(0, 200),
  })
})

// Centres — 8 city detail pages
;(centres.CENTRES || []).forEach((c) => {
  entries.push({
    path: '/centres/' + c.slug,
    title: `Longevity Clinic in ${c.city} · ${c.area || ''} · TLC`.replace(/\s+·\s+·/, ' ·'),
    description: `The Longevity Centre in ${c.city}${c.area ? ', ' + c.area : ''} — diagnostics-led, physician-guided preventive medicine, metabolic and longevity care.`,
  })
})

// Diagnostics — 9 detail pages
;(diagnostics.DIAGNOSTICS || []).forEach((d) => {
  entries.push({
    path: '/diagnostics/' + d.slug,
    title: `${d.name} · TLC Diagnostics`,
    description: (d.tagline || d.intro || '').slice(0, 200),
  })
})

// Skin Treatments — 8 detail pages
;(skin.SKIN_TREATMENTS || []).forEach((s) => {
  entries.push({
    path: '/skin-aesthetics/' + s.slug,
    title: `${s.title} · TLC Skin & Aesthetics`,
    description: (s.description || '').slice(0, 200),
  })
})

// ── 3. Generate per-route index.html ──────────────────────────────────

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('inject-meta: dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')

let count = 0
for (const item of entries) {
  const canonical = SITE + item.path
  const title = htmlEscape(item.title)
  const description = htmlEscape(item.description)

  let html = baseHtml
    // <title>
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${title}</title>`
    )
    // <meta name="description" ...> — may be multi-line
    .replace(
      /<meta\s+name="description"[\s\S]*?\/?>/,
      `<meta name="description" content="${description}" />`
    )
    // <link rel="canonical" ...>
    .replace(
      /<link\s+rel="canonical"[\s\S]*?\/?>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    // <meta property="og:title" ...>
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    // <meta property="og:description" ...> — may be multi-line
    .replace(
      /<meta[\s\S]{0,40}?property="og:description"[\s\S]*?\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    // <meta property="og:url" ...>
    .replace(
      /<meta\s+property="og:url"[\s\S]*?\/?>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    // <meta name="twitter:title" ...>
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    // <meta name="twitter:description" ...> — may be multi-line
    .replace(
      /<meta[\s\S]{0,40}?name="twitter:description"[\s\S]*?\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    )

  // dist/<route>/index.html
  const outDir = path.join(DIST, item.path.replace(/^\//, ''))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')
  count++
}

console.log(`inject-meta: generated ${count} per-route index.html files`)
