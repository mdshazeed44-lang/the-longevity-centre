/**
 * inject-meta.cjs
 *
 * Post-build step. Generates a per-route copy of dist/index.html with:
 *   1) the correct <title>, <meta description>, <link rel="canonical">
 *      and OG/Twitter equivalents in the raw HTML
 *   2) a <noscript> block containing the page's real content — H1,
 *      intro, key sections, internal nav links — so crawlers that
 *      don't execute JavaScript still see substantive page content
 *      instead of just an empty <div id="root">
 *
 * Why this exists:
 *   Crawlers that don't run JS (Ahrefs default plan, Bing, social-share
 *   scrapers, the slow path of Googlebot) saw "Is rendered page: false"
 *   on every URL — same homepage title, canonical pointing to /, 14
 *   words of content, no H1, no inlinks. Without per-route HTML they
 *   treat all 70+ pages as duplicates of /. The fix is to pre-bake
 *   the SEO-relevant HTML at build time. React still hydrates from
 *   the empty <div id="root"> on the client, so the visible UX stays
 *   identical.
 *
 * How it works:
 *   1. Bundle each src/lib/*.ts data file to CJS via esbuild so we
 *      can `require()` it from Node.
 *   2. Build an entries[] of { path, title, description, content } where
 *      `content` is the page-specific static HTML (see content-builder
 *      helpers below).
 *   3. Read dist/index.html as the template, swap in the per-route
 *      meta tags, append a <noscript> block with the static content
 *      right after <div id="root"></div>, then write it to
 *      dist/<path>/index.html.
 *   4. public/.htaccess is updated separately to prefer the per-route
 *      file before falling back to root index.html for SPA routes.
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

/**
 * Bundle a TS module from src/lib to a temp CJS file and require() it.
 * Lets the build script read the same data structures the React app uses
 * without duplicating them here.
 */
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
 * Very small markdown → HTML converter. Just enough to keep blog and
 * landing-page body content readable to non-JS crawlers — headings,
 * bold, italics, links, bullet lists, paragraphs. Anything more
 * exotic (tables, code blocks, blockquotes, embedded HTML) is left
 * as-is; it'll appear as plain text in <p>, which still indexes fine.
 */
function md2html(md) {
  if (!md) return ''
  // Normalise newlines
  let text = String(md).replace(/\r\n/g, '\n')

  // Split into blocks separated by blank lines
  const blocks = text.split(/\n{2,}/)
  const out = []
  for (let block of blocks) {
    block = block.trim()
    if (!block) continue

    // Headings
    if (/^####\s/.test(block)) { out.push('<h4>' + inlineMd(block.replace(/^####\s+/, '')) + '</h4>'); continue }
    if (/^###\s/.test(block))  { out.push('<h3>' + inlineMd(block.replace(/^###\s+/, '')) + '</h3>'); continue }
    if (/^##\s/.test(block))   { out.push('<h2>' + inlineMd(block.replace(/^##\s+/, '')) + '</h2>'); continue }
    if (/^#\s/.test(block))    { out.push('<h2>' + inlineMd(block.replace(/^#\s+/, '')) + '</h2>'); continue }

    // Horizontal rule
    if (/^---+$/.test(block))  { out.push('<hr />'); continue }

    // Ordered list (1. 2. ...)
    if (/^\d+\.\s/.test(block)) {
      const items = block.split('\n').filter(l => /^\d+\.\s/.test(l)).map(l => '<li>' + inlineMd(l.replace(/^\d+\.\s+/, '')) + '</li>').join('')
      out.push('<ol>' + items + '</ol>')
      continue
    }

    // Bullet list (- or *)
    if (/^[-*]\s/.test(block)) {
      const items = block.split('\n').filter(l => /^[-*]\s/.test(l)).map(l => '<li>' + inlineMd(l.replace(/^[-*]\s+/, '')) + '</li>').join('')
      out.push('<ul>' + items + '</ul>')
      continue
    }

    // Blockquote
    if (/^>\s/.test(block)) {
      out.push('<blockquote>' + inlineMd(block.replace(/^>\s+/gm, '').replace(/\n/g, ' ')) + '</blockquote>')
      continue
    }

    // Default — paragraph
    out.push('<p>' + inlineMd(block.replace(/\n/g, ' ')) + '</p>')
  }
  return out.join('\n')
}

function inlineMd(s) {
  return s
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic (avoid matching bold's ** by using non-** boundary)
    .replace(/(^|[^*])\*([^*\n]+)\*([^*]|$)/g, '$1<em>$2</em>$3')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

/**
 * Common site-wide nav rendered on every per-route page. Helps crawlers
 * discover that all the other URLs exist and that this page is connected
 * to the rest of the site.
 */
function siteNav() {
  return `
<nav aria-label="Primary">
  <a href="/">Home</a> ·
  <a href="/about-us">About TLC</a> ·
  <a href="/programs">Programmes</a> ·
  <a href="/diagnostics">Diagnostics</a> ·
  <a href="/skin-aesthetics">Skin &amp; Aesthetics</a> ·
  <a href="/centres">Our Centres</a> ·
  <a href="/blog">Blog</a> ·
  <a href="/contact">Contact</a>
</nav>`.trim()
}

function siteFooter() {
  return `
<footer>
  <p><strong>The Longevity Centre (TLC)</strong> — India's first doctor-led personalised longevity programme. Diagnostics-led, physician-guided care across longevity, metabolic, gut, weight loss and biological-age reversal. Eight centres across India: Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Bangalore and Hyderabad.</p>
  <p><a href="tel:+918826809123">+91 88268 09123</a> · <a href="mailto:info@thelongevitycentre.co">info@thelongevitycentre.co</a></p>
  <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/sitemap">Sitemap</a></p>
  <p><small>Designed by <a href="https://www.incrementors.com/" rel="noopener">Incrementors</a></small></p>
</footer>`.trim()
}

// ── 1. Load all data sources ───────────────────────────────────────────

const blogs = loadLibModule('blogs.ts')
const landings = loadLibModule('landings.ts')
const programs = loadLibModule('programs.ts')
const centres = loadLibModule('centres.ts')
const diagnostics = loadLibModule('diagnostics.ts')
const skin = loadLibModule('skin-treatments.ts')

// ── 2. Build the URL → meta + content map ─────────────────────────────

/** @type {{ path: string, title: string, description: string, content: string }[]} */
const entries = []

// ── HTML Sitemap body — built dynamically from every data module so
//    every blog, landing, programme, diagnostic, skin treatment and
//    centre URL gets a real internal inlink in static HTML. This is
//    what fixes the Ahrefs "orphan pages" report — without this
//    section, blogs + landings have 0 href inlinks because no other
//    page lists them in its <noscript> body, only nav links.
const sitemapSections = [
  {
    heading: 'Top-level pages',
    items: [
      { href: '/', label: 'Home' },
      { href: '/about-us', label: 'About TLC' },
      { href: '/longevity-program', label: 'Longevity Programme — Flagship' },
      { href: '/programs', label: 'All Programmes' },
      { href: '/diagnostics', label: 'Diagnostics' },
      { href: '/skin-aesthetics', label: 'Skin & Aesthetics' },
      { href: '/centres', label: 'Our Centres' },
      { href: '/blog', label: 'Journal · Blog' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
  {
    heading: 'TLC Flagship Programmes',
    items: (programs.PROGRAMS || []).map((p) => ({
      href: `/programs/${p.slug}`,
      label: p.shortTitle || p.title,
    })),
  },
  {
    heading: 'Precision Diagnostics',
    items: (diagnostics.DIAGNOSTICS || []).map((d) => ({
      href: `/diagnostics/${d.slug}`,
      label: d.name,
    })),
  },
  {
    heading: 'Skin & Aesthetics Treatments',
    items: (skin.SKIN_TREATMENTS || []).map((s) => ({
      href: `/skin-aesthetics/${s.slug}`,
      label: s.title,
    })),
  },
  {
    heading: 'Our Centres Across India',
    items: (centres.CENTRES || [])
      .filter((c) => c.status === 'open')
      .map((c) => ({
        href: `/centres/${c.slug}`,
        label: `Centre · ${c.city}`,
      })),
  },
  {
    heading: 'Longevity & Anti-Aging Guides',
    items: (landings.LANDINGS || []).map((l) => ({
      href: `/${l.slug}`,
      label: l.h1 || l.title,
    })),
  },
  {
    heading: 'Blog Articles',
    items: (blogs.BLOGS || []).map((b) => ({
      href: `/${b.slug}`,
      label: b.title,
    })),
  },
]
const sitemapBody = sitemapSections
  .map((sec) => {
    const lis = sec.items
      .map(
        (it) =>
          `  <li><a href="${it.href}">${htmlEscape(it.label)}</a></li>`
      )
      .join('\n')
    return `<h2>${htmlEscape(sec.heading)}</h2>\n<ul>\n${lis}\n</ul>`
  })
  .join('\n')

// ── Static top-level pages ────────────────────────────────────────────
const staticPages = [
  {
    path: '/sitemap',
    title: 'Sitemap · The Longevity Centre',
    description:
      'Full index of every public page on The Longevity Centre — programmes, diagnostics, skin & aesthetics treatments, clinics, journal and resource pages.',
    h1: 'Every page on The Longevity Centre',
    body: `
<p>A complete index of programmes, diagnostics, skin and aesthetics treatments, clinics, journal articles and resource pages on TLC.</p>
${sitemapBody}`.trim(),
  },
  {
    path: '/longevity-programme-india-LP',
    title: 'Longevity Programme in India · Live Longer, Live Better · TLC',
    description:
      "Doctor-led 12-month longevity programme. 1000+ biomarkers, three biological-age clocks, eight centres across India. Get the e-brochure.",
    h1: 'Live longer. Live measurably better.',
    body: `
<p><strong>India's first doctor-led longevity programme.</strong> A 12-month, physician-guided protocol that measures your biology with 1000+ diagnostics, corrects what's drifting and verifies progress with three validated biological-age clocks.</p>
<h2>What&rsquo;s inside the programme</h2>
<ul>
  <li>Three validated epigenetic clocks (Horvath, GrimAge, PhenoAge) tracked over 12 months</li>
  <li>Whole-genomic sequencing — 9 million CpG methylation sites + full DNA</li>
  <li>Gut microbiome mapping — shotgun sequencing, bacterial diversity, inflammation markers</li>
  <li>Hormonal optimisation — thyroid, cortisol, sex hormones, growth markers</li>
  <li>Metabolic correction — weight, insulin resistance, fatty liver, lipid profile</li>
  <li>Continuous physician care from a multidisciplinary panel</li>
</ul>
<h2>How it works — four phases</h2>
<ol>
  <li><strong>Assessment</strong> — Blood, genomic, body composition, microbiome and biological-age tests in one visit.</li>
  <li><strong>Analysis</strong> — Your specialist panel reads every marker against your goals.</li>
  <li><strong>Intervention</strong> — Personalised nutrition, supplementation, hormone correction, lifestyle and therapeutics.</li>
  <li><strong>Verification</strong> — Re-tested at completion. Progress made measurable, not promised.</li>
</ol>
<h2>Founders &amp; team</h2>
<p>Co-founded by <a href="/about-us">Dr. Abhinav Sharma</a> (MBBS, MS, 11,000+ surgeries) and Dr. Bhavna Sharma (IVF specialist, 8,000+ pregnancies), with a multidisciplinary panel of longevity physicians, endocrinologists and metabolic specialists.</p>
<h2>Our eight centres across India</h2>
<ul>
  <li><a href="/centres/delhi">Delhi</a> (flagship)</li>
  <li><a href="/centres/gurgaon">Gurgaon</a></li>
  <li><a href="/centres/mumbai">Mumbai</a></li>
  <li><a href="/centres/pune">Pune</a></li>
  <li><a href="/centres/nagpur">Nagpur</a></li>
  <li><a href="/centres/goa">Goa</a></li>
  <li><a href="/centres/bangalore">Bangalore</a></li>
  <li><a href="/centres/hyderabad">Hyderabad</a></li>
</ul>
<p><strong>Brand Ambassador:</strong> Milind Soman, Ironman finisher, Mr. India 1995.</p>
<p>For full programme details and pricing, request the <a href="/contact">brochure</a> or call +91 88268 09123.</p>`.trim(),
  },
  {
    path: '/',
    title: 'TLC — The Longevity Centre · Precision Longevity Medicine, India',
    description: 'India\'s first doctor-led longevity programme. Genomic diagnostics, hormonal optimisation, biological-age testing & aesthetics across 8 cities.',
    h1: 'The Longevity Centre · Age should never define you',
    body: `
<p>The Longevity Centre (TLC) is India's first doctor-led longevity programme — built on twenty-plus years of preventive medicine and aesthetic expertise. We combine genomic diagnostics, hormonal optimisation, biological-age testing and advanced skin and hair science under one continuous care record.</p>
<h2>What we do</h2>
<ul>
  <li><a href="/longevity-program">Longevity Programme</a> — 12-month physician-guided plan with whole-body diagnostics and lifestyle therapeutics.</li>
  <li><a href="/diagnostics">Precision Diagnostics</a> — 1000+ biomarkers including DNA methylation (GrimAge, PhenoAge), genomics, gut microbiome, hormones.</li>
  <li><a href="/skin-aesthetics">Skin &amp; Aesthetics</a> — physician-led PRP, fillers, lasers, peels and longevity-grade skincare.</li>
  <li><a href="/cancer-prevention">Cancer Prevention</a> — early-detection screening across 1000+ biomarkers and genetic risk panels.</li>
  <li><a href="/about-us">Founders &amp; team</a> — Dr. Abhinav Sharma, Dr. Bhavna Sharma and a multidisciplinary panel of longevity physicians.</li>
</ul>
<h2>Our 8 centres across India</h2>
<ul>
  <li><a href="/centres/delhi">Delhi (flagship)</a></li>
  <li><a href="/centres/gurgaon">Gurgaon</a></li>
  <li><a href="/centres/mumbai">Mumbai</a></li>
  <li><a href="/centres/pune">Pune</a></li>
  <li><a href="/centres/nagpur">Nagpur</a></li>
  <li><a href="/centres/goa">Goa</a></li>
  <li><a href="/centres/hyderabad">Hyderabad</a></li>
  <li><a href="/centres/bangalore">Bangalore</a></li>
</ul>
<h2>Read the journal</h2>
<p>Explore <a href="/blog">our blog</a> — evidence-led pieces on longevity, hormone health, metabolic dysfunction, gut microbiome and skin science.</p>`.trim(),
  },
  {
    path: '/about-us',
    title: 'About TLC · Founders, Vision & Specialist Team',
    description: 'Meet the founders of The Longevity Centre — 20+ years of preventive medicine, longevity science and aesthetic expertise across 8 Indian cities.',
    h1: 'About The Longevity Centre',
    body: `
<p>The Longevity Centre is India's first doctor-led longevity programme — built on twenty-plus years of preventive medicine and aesthetic expertise. Founded by Dr. Abhinav Sharma and Dr. Bhavna Sharma, TLC blends diagnostics, genomics, hormonal optimisation and skin-and-hair science under one continuous care record.</p>
<h2>Our specialists</h2>
<p>A multidisciplinary panel of longevity physicians, endocrinologists, metabolic specialists and consultants. Every patient is cared for by a team — not a single doctor — that holds your complete biological picture.</p>
<h2>What we treat</h2>
<ul>
  <li>Metabolic dysfunction · weight, insulin resistance, fatty liver</li>
  <li>Gut microbiome correction · whole-genomic sequencing</li>
  <li>Hormonal imbalance · thyroid, cortisol, sex hormones</li>
  <li>Biological aging · DNA methylation, GrimAge, PhenoAge</li>
  <li>Skin and aesthetic concerns · PRP, fillers, laser, peels</li>
</ul>`.trim(),
  },
  {
    path: '/about',
    title: 'About TLC · Founders, Vision & Specialist Team',
    description: 'Meet the founders of The Longevity Centre — 20+ years of preventive medicine, longevity science and aesthetic expertise across 8 Indian cities.',
    h1: 'About The Longevity Centre',
    body: `<p>See <a href="/about-us">our full About page</a> for founder bios, the specialist team and our preventive medicine approach.</p>`,
  },
  {
    path: '/centres',
    title: 'Our Centres · TLC Clinics Across 8 Indian Cities',
    description: 'TLC operates 8 clinics — Delhi, Gurgaon, Mumbai, Pune, Nagpur, Goa, Hyderabad, Bangalore. Diagnostics-led, physician-guided preventive medicine, one record.',
    h1: 'Our Centres',
    body: `
<p>Eight TLC clinics across India, all running the same diagnostic protocol and shared medical record. Pick a city to see address, phone, email and on-site facilities.</p>
<ul>
  <li><a href="/centres/delhi">TLC Delhi</a></li>
  <li><a href="/centres/gurgaon">TLC Gurgaon</a></li>
  <li><a href="/centres/mumbai">TLC Mumbai</a></li>
  <li><a href="/centres/pune">TLC Pune</a></li>
  <li><a href="/centres/nagpur">TLC Nagpur</a></li>
  <li><a href="/centres/goa">TLC Goa</a></li>
  <li><a href="/centres/hyderabad">TLC Hyderabad</a></li>
  <li><a href="/centres/bangalore">TLC Bangalore</a></li>
</ul>`.trim(),
  },
  {
    path: '/contact',
    title: 'Contact TLC — Book a 30-Minute Consultation',
    description: 'Book a consultation with the TLC clinical team across 8 Indian cities. Phone, email and address details for each centre.',
    h1: 'Contact The Longevity Centre',
    body: `
<p>Book a 30-minute consultation with our clinical team. Available across 8 Indian cities.</p>
<ul>
  <li>Phone: <a href="tel:+918826809123">+91 88268 09123</a></li>
  <li>Email: <a href="mailto:info@thelongevitycentre.co">info@thelongevitycentre.co</a></li>
</ul>
<p>City-wise contact details: <a href="/centres">Our Centres</a>.</p>`.trim(),
  },
  {
    path: '/privacy',
    title: 'Privacy Policy · TLC — The Longevity Centre',
    description: 'How The Longevity Centre handles personal and medical information across our clinics and digital products.',
    h1: 'Privacy Policy',
    body: `<p>How The Longevity Centre collects, stores and uses personal and medical information across our clinics, programmes and digital products. Read the full policy on the page.</p>`,
  },
  {
    path: '/terms',
    title: 'Terms of Service · TLC — The Longevity Centre',
    description: 'Terms governing your use of The Longevity Centre website and clinical services.',
    h1: 'Terms of Service',
    body: `<p>Terms governing your use of The Longevity Centre website, clinical services and programmes.</p>`,
  },
  {
    path: '/programs',
    title: 'Programmes · TLC — Diagnostics-Led Longevity & Metabolic Care',
    description: 'Seven flagship programmes — metabolic & weight, gut & microbiome, longevity-plus, cancer prevention, PCOD, diabetes reversal and advanced metabolomics.',
    h1: 'Programmes — Diagnostics-Led, Physician-Guided',
    body: `
<p>Seven flagship programmes. Every one runs on the same shared medical record — diagnostics-led, physician-guided, continuously refined.</p>
<ul>
  <li><a href="/programs/metabolic-weight-loss">Metabolic &amp; Weight Loss</a></li>
  <li><a href="/programs/gut-metabolic">Gut &amp; Metabolic</a></li>
  <li><a href="/programs/longevity-plus">Longevity Plus</a> — flagship 12-month protocol</li>
  <li><a href="/programs/advanced-metabolomics">Advanced Metabolomics</a></li>
  <li><a href="/programs/diabetes-fatty-liver-reversal">Diabetes &amp; Fatty Liver Reversal</a></li>
  <li><a href="/programs/pcod-correction">PCOD Correction</a></li>
  <li><a href="/programs/cancer-prevention">Cancer Detection &amp; Prevention</a></li>
</ul>`.trim(),
  },
  {
    path: '/diagnostics',
    title: 'Diagnostics · TLC — Gold-Standard Longevity Testing',
    description: 'Comprehensive longevity diagnostics — biological age clocks, genomic testing, whole-genome gut microbiome, advanced blood panels, EndoPAT, BCA, BMD.',
    h1: 'Diagnostics — Gold-Standard Longevity Testing',
    body: `
<p>Nine diagnostic tests run from the world's finest labs. Biological age, genomics, microbiome, vascular function, body composition and more — every result reviewed by a TLC physician.</p>
<ul>
  <li><a href="/diagnostics/biological-clock">Biological Clock (DNA methylation)</a></li>
  <li><a href="/diagnostics/genetic-testing">Genetic Testing — 323 Genes</a></li>
  <li><a href="/diagnostics/gut-microbiota">Gut Microbiome — Whole Genomic Sequencing</a></li>
  <li><a href="/diagnostics/blood-tests">Blood Tests — 160+ Biomarkers</a></li>
  <li><a href="/diagnostics/body-composition">Body Composition Analysis (BCA)</a></li>
  <li><a href="/diagnostics/bone-mineral-density">Bone Mineral Density (Ultrasound BMD)</a></li>
  <li><a href="/diagnostics/endopat">EndoPAT — Vascular Function</a></li>
  <li><a href="/diagnostics/face-scan">Face Scan — Skin Analysis</a></li>
  <li><a href="/diagnostics/oligoscan">Oligoscan — Mineral &amp; Toxin Profile</a></li>
</ul>`.trim(),
  },
  {
    path: '/skin-aesthetics',
    title: 'Skin & Aesthetics · TLC — The Longevity Centre',
    description: 'Eight evidence-led skin and aesthetic treatments — PRP, microneedling, hydrafacial, laser hair reduction, hair-loss solutions, fillers & botox.',
    h1: 'Skin &amp; Aesthetics — Evidence-Led Treatments',
    body: `
<p>Eight evidence-led skin and aesthetic treatments, delivered by trained physicians across 8 Indian cities.</p>
<ul>
  <li><a href="/skin-aesthetics/skin-prp">Skin PRP — Platelet-Rich Plasma</a></li>
  <li><a href="/skin-aesthetics/chemical-peels">Chemical Peels</a></li>
  <li><a href="/skin-aesthetics/hydrafacial">Hydrafacial</a></li>
  <li><a href="/skin-aesthetics/microneedling-with-dermapen">Microneedling with Dermapen</a></li>
  <li><a href="/skin-aesthetics/laser-hair-reduction">Laser Hair Reduction</a></li>
  <li><a href="/skin-aesthetics/hair-loss-solutions">Hair Loss Solutions</a></li>
  <li><a href="/skin-aesthetics/hair-transplant">Hair Transplant</a></li>
  <li><a href="/skin-aesthetics/fillers-botox-skin-boosters">Fillers, Botox &amp; Skin Boosters</a></li>
</ul>`.trim(),
  },
  {
    path: '/blog',
    title: 'TLC Insights — Longevity, Wellness & Anti-Aging Articles',
    description: 'Evidence-led articles on longevity, gut health, hormones, skin, weight and preventive medicine — written by the TLC clinical team.',
    h1: 'TLC Insights — Evidence-Led Articles',
    body: `<p>Evidence-led articles on longevity, gut health, hormones, skin, weight and preventive medicine — written by the TLC clinical team. Browse all <a href="/blog">articles</a>.</p>`,
  },
  {
    path: '/longevity-program',
    title: 'Longevity Programme · The 12-Month Flagship · TLC',
    description: "TLC's flagship 12-month longevity programme — three biological age clocks tracked, full genomic + microbiome sequencing, end-to-end physician care.",
    h1: 'Longevity Plus — The 12-Month Flagship Programme',
    body: `<p>TLC's flagship 12-month protocol. Three biological age clocks tracked, 323 genes decoded, GrimAge + PhenoAge epigenetic analysis, whole-genomic gut sequencing — every measurable pillar of aging, addressed together. Continue to <a href="/programs/longevity-plus">programme details</a>.</p>`,
  },
]

for (const p of staticPages) {
  entries.push({
    path: p.path,
    title: p.title,
    description: p.description,
    content: `<h1>${p.h1}</h1>\n<p>${htmlEscape(p.description)}</p>\n${p.body}`,
  })
}

// ── Blogs — 25 migrated posts at root-level slugs ─────────────────────
;(blogs.BLOGS || []).forEach((b) => {
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>${htmlEscape(b.category || 'Blog')} · ${htmlEscape(b.publishDate || '')} · ${htmlEscape(b.readingTime || '')}</small></div>`,
    `<h1>${htmlEscape(b.h1 || b.title)}</h1>`,
    `<p><em>${htmlEscape(b.excerpt || '')}</em></p>`,
    `</header>`,
    md2html(b.content || ''),
    `<p>Author: ${htmlEscape(b.author || 'TLC Editorial')}</p>`,
    `</article>`,
  ].join('\n')
  entries.push({
    path: '/' + b.slug,
    title: b.metaTitle,
    description: b.metaDescription,
    content,
  })
})

// ── SEO landing pages — 5 evergreen guides at root-level slugs ────────
;(landings.LANDINGS || []).forEach((l) => {
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>${htmlEscape(l.eyebrow || '')}</small></div>`,
    `<h1>${htmlEscape(l.h1 || '')}</h1>`,
    `<p><em>${htmlEscape(l.intro || '')}</em></p>`,
    `</header>`,
    md2html(l.content || ''),
    `</article>`,
  ].join('\n')
  entries.push({
    path: '/' + l.slug,
    title: l.metaTitle,
    description: l.metaDescription,
    content,
  })
})

// ── Programmes — 7 detail pages ───────────────────────────────────────
;(programs.PROGRAMS || []).forEach((p) => {
  const list = (arr, label) => arr && arr.length
    ? `<h2>${label}</h2><ul>${arr.map(x => `<li>${htmlEscape(x)}</li>`).join('')}</ul>`
    : ''
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>Programme · ${htmlEscape(p.tag || '')} · ${htmlEscape(p.duration || '')}</small></div>`,
    `<h1>${htmlEscape(p.title || p.shortTitle)}</h1>`,
    `<p><strong>${htmlEscape(p.focus || '')}</strong></p>`,
    `<p>${htmlEscape(p.desc || '')}</p>`,
    `</header>`,
    list(p.designedFor, 'Designed For'),
    list(p.diagnostics, 'Diagnostics Included'),
    list(p.careModel, 'Care Model'),
    list(p.outcomes, 'Outcomes'),
    p.difference ? `<h2>The TLC Difference</h2><p>${htmlEscape(p.difference)}</p>` : '',
    p.price ? `<p><strong>Price:</strong> ${htmlEscape(p.price)}${p.priceNote ? ' — ' + htmlEscape(p.priceNote) : ''}</p>` : '',
    `</article>`,
  ].filter(Boolean).join('\n')
  entries.push({
    path: '/programs/' + p.slug,
    title: `${p.shortTitle} · TLC Programme`,
    description: (p.focus || p.desc || '').slice(0, 200),
    content,
  })
})

// ── Centres — 8 city detail pages ─────────────────────────────────────
;(centres.CENTRES || []).forEach((c) => {
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>TLC Centre</small></div>`,
    `<h1>Longevity Clinic in ${htmlEscape(c.city)}${c.area ? ' · ' + htmlEscape(c.area) : ''}</h1>`,
    `<p>The Longevity Centre at ${htmlEscape(c.area || c.city)}, ${htmlEscape(c.city)} — diagnostics-led, physician-guided preventive medicine and longevity care.</p>`,
    `</header>`,
    c.address ? `<h2>Address</h2><p>${htmlEscape(c.address)}</p>` : '',
    c.phone ? `<p><strong>Phone:</strong> <a href="tel:${String(c.phone).replace(/\s+/g, '')}">${htmlEscape(c.phone)}</a></p>` : '',
    c.email ? `<p><strong>Email:</strong> <a href="mailto:${htmlEscape(c.email)}">${htmlEscape(c.email)}</a></p>` : '',
    c.highlights && c.highlights.length
      ? `<h2>On-site capabilities</h2><ul>${c.highlights.map(h => `<li>${htmlEscape(h)}</li>`).join('')}</ul>`
      : '',
    `</article>`,
  ].filter(Boolean).join('\n')
  entries.push({
    path: '/centres/' + c.slug,
    title: `Longevity Clinic in ${c.city}${c.area ? ' · ' + c.area : ''} · TLC`,
    description: `The Longevity Centre in ${c.city}${c.area ? ', ' + c.area : ''} — diagnostics-led, physician-guided preventive medicine, metabolic and longevity care.`,
    content,
  })
})

// ── Diagnostics — 9 detail pages ──────────────────────────────────────
;(diagnostics.DIAGNOSTICS || []).forEach((d) => {
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>Diagnostic Test</small></div>`,
    `<h1>${htmlEscape(d.name || '')}</h1>`,
    d.tagline ? `<p><strong>${htmlEscape(d.tagline)}</strong></p>` : '',
    d.intro ? `<p>${htmlEscape(d.intro)}</p>` : '',
    `</header>`,
    d.keyFacts && d.keyFacts.points && d.keyFacts.points.length
      ? `<h2>${htmlEscape(d.keyFacts.title || 'Key facts')}</h2><ul>${d.keyFacts.points.map(p => `<li>${htmlEscape(p)}</li>`).join('')}</ul>`
      : '',
    d.specs && d.specs.length
      ? `<h2>Specifications</h2><ul>${d.specs.map(s => `<li><strong>${htmlEscape(s.k)}:</strong> ${htmlEscape(s.v)}</li>`).join('')}</ul>`
      : '',
    `</article>`,
  ].filter(Boolean).join('\n')
  entries.push({
    path: '/diagnostics/' + d.slug,
    title: `${d.name} · TLC Diagnostics`,
    description: (d.tagline || d.intro || '').slice(0, 200),
    content,
  })
})

// ── Skin Treatments — 8 detail pages ──────────────────────────────────
;(skin.SKIN_TREATMENTS || []).forEach((s) => {
  const list = (arr, label) => arr && arr.length
    ? `<h2>${label}</h2><ul>${arr.map(x => `<li>${htmlEscape(x)}</li>`).join('')}</ul>`
    : ''
  const content = [
    `<article>`,
    `<header>`,
    `<div><small>${htmlEscape(s.eyebrow || s.category || 'Skin &amp; Aesthetics')}</small></div>`,
    `<h1>${htmlEscape(s.title || '')}</h1>`,
    s.description ? `<p>${htmlEscape(s.description)}</p>` : '',
    `</header>`,
    list(s.treats, 'What it treats'),
    list(s.benefits, 'Key benefits'),
    s.duration ? `<p><strong>Duration:</strong> ${htmlEscape(s.duration)}</p>` : '',
    s.note ? `<p><em>${htmlEscape(s.note)}</em></p>` : '',
    s.process && s.process.length
      ? `<h2>How it works</h2><ol>${s.process.map(p => `<li><strong>${htmlEscape(p.title)}:</strong> ${htmlEscape(p.body)}</li>`).join('')}</ol>`
      : '',
    `</article>`,
  ].filter(Boolean).join('\n')
  entries.push({
    path: '/skin-aesthetics/' + s.slug,
    title: `${s.title} · TLC Skin & Aesthetics`,
    description: (s.description || '').slice(0, 200),
    content,
  })
})

// ── 3. Generate per-route index.html ──────────────────────────────────

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('inject-meta: dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')
const NAV_HTML = siteNav()
const FOOTER_HTML = siteFooter()

let count = 0
for (const item of entries) {
  const canonical = SITE + item.path
  const title = htmlEscape(item.title)
  const description = htmlEscape(item.description)
  const breadcrumb = `<p><small><a href="/">Home</a> · ${title}</small></p>`

  // Wrap the per-route content in a <noscript>. The block is invisible
  // to JS-enabled browsers (no flash for real users) but rendered as
  // normal HTML by JS-disabled crawlers (Ahrefs default, Bing, social
  // share scrapers, the slow path of Googlebot). React still owns the
  // empty <div id="root"> below it and hydrates as before.
  const noscriptBlock =
    `<noscript>\n` +
    `<main>\n` +
    NAV_HTML + '\n' +
    breadcrumb + '\n' +
    (item.content || `<h1>${title}</h1>\n<p>${description}</p>`) + '\n' +
    FOOTER_HTML + '\n' +
    `</main>\n` +
    `</noscript>`

  let html = baseHtml
    // <title>
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${title}</title>`
    )
    // <meta name="description"> — may be multi-line
    .replace(
      /<meta\s+name="description"[\s\S]*?\/?>/,
      `<meta name="description" content="${description}" />`
    )
    // <link rel="canonical">
    .replace(
      /<link\s+rel="canonical"[\s\S]*?\/?>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    // <meta property="og:title">
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    // <meta property="og:description"> — may be multi-line
    .replace(
      /<meta[\s\S]{0,40}?property="og:description"[\s\S]*?\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    // <meta property="og:url">
    .replace(
      /<meta\s+property="og:url"[\s\S]*?\/?>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    // <meta name="twitter:title">
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/?>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    // <meta name="twitter:description"> — may be multi-line
    .replace(
      /<meta[\s\S]{0,40}?name="twitter:description"[\s\S]*?\/?>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    // Inject the noscript block right after the empty <div id="root">
    .replace(
      /<div id="root"><\/div>/,
      `<div id="root"></div>\n    ${noscriptBlock}`
    )

  // dist/<route>/index.html
  const outDir = path.join(DIST, item.path.replace(/^\//, ''))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')
  count++
}

console.log(`inject-meta: generated ${count} per-route index.html files with noscript content`)
