/**
 * SitemapPage — HTML sitemap at /sitemap.
 *
 * Purpose: solve the Ahrefs "orphan pages" finding. Blog posts and
 * SEO landing pages were not linked from any other page's static
 * HTML (only reachable via the /blog index for blogs, or external
 * search for landings), so crawlers reported 0 internal inlinks for
 * each — they appeared "orphan" even though they were in sitemap.xml.
 *
 * This page lists every public URL on the site, grouped by section.
 * scripts/inject-meta.cjs also pre-bakes the same list into the
 * <noscript> body of dist/sitemap/index.html so non-JS crawlers
 * (Ahrefs default plan, Bing) see every URL as a real inlink target.
 *
 * One tertiary link in the footer points here — visitors will not
 * generally land on this page, but Ahrefs / Googlebot will, and
 * every orphan URL gains a real internal inlink as a result.
 */
import { useDocumentMeta } from '../lib/seo'
import { BLOGS } from '../lib/blogs'
import { LANDINGS } from '../lib/landings'
import { PROGRAMS } from '../lib/programs'
import { DIAGNOSTICS } from '../lib/diagnostics'
import { SKIN_TREATMENTS } from '../lib/skin-treatments'
import { CENTRES } from '../lib/centres'

const META = {
  title: 'Sitemap · The Longevity Centre',
  description:
    "Full index of every public page on The Longevity Centre, programmes, diagnostics, skin & aesthetics treatments, clinics, journal and resource pages.",
  path: '/sitemap',
  ogImage: '/og/home.jpg',
}

const TOP_LEVEL: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About TLC' },
  { href: '/longevity-program', label: 'Longevity Programme, Flagship' },
  { href: '/programs', label: 'All Programmes' },
  { href: '/diagnostics', label: 'Diagnostics' },
  { href: '/skin-aesthetics', label: 'Skin & Aesthetics' },
  { href: '/centres', label: 'Our Centres' },
  { href: '/blog', label: 'Journal · Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

interface SectionProps {
  eyebrow: string
  heading: string
  items: { href: string; label: string }[]
}

function Section({ eyebrow, heading, items }: SectionProps) {
  return (
    <section className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-px bg-rust" />
        <span className="text-[10px] md:text-[10.5px] tracking-[0.4em] uppercase text-rust font-semibold">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display font-light text-[22px] md:text-[28px] leading-[1.15] tracking-[-0.02em] text-ink mb-6">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              data-cursor="hover"
              className="group inline-flex items-baseline gap-2 text-[14px] md:text-[14.5px] text-graphite hover:text-rust font-light transition-colors duration-300"
            >
              <span aria-hidden className="text-rust/50 group-hover:text-rust">›</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SitemapPage() {
  useDocumentMeta(META)

  const programmes = PROGRAMS.map((p) => ({
    href: `/programs/${p.slug}`,
    label: p.shortTitle,
  }))
  const diagnostics = DIAGNOSTICS.map((d) => ({
    href: `/diagnostics/${d.slug}`,
    label: d.name,
  }))
  const skin = SKIN_TREATMENTS.map((s) => ({
    href: `/skin-aesthetics/${s.slug}`,
    label: s.title,
  }))
  const centres = CENTRES.filter((c) => c.status === 'open').map((c) => ({
    href: `/centres/${c.slug}`,
    label: `Centre · ${c.city}`,
  }))
  const blogs = BLOGS.map((b) => ({
    href: `/${b.slug}`,
    label: b.title,
  }))
  const landings = LANDINGS.map((l) => ({
    href: `/${l.slug}`,
    label: l.h1,
  }))

  return (
    <main className="bg-cream min-h-screen">
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-rust" />
            <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
              Site Map
            </span>
          </div>
          <h1 className="font-display font-light text-[34px] md:text-[52px] xl:text-[60px] leading-[1.04] tracking-[-0.03em] text-ink mb-5 max-w-[820px]">
            Every page on{' '}
            <span className="font-bold italic text-rust">
              The Longevity Centre.
            </span>
          </h1>
          <p className="text-[14.5px] md:text-[16px] leading-[1.65] text-graphite font-light max-w-[620px]">
            A complete index of programmes, diagnostics, skin &amp; aesthetics
            treatments, clinics, journal articles and resource pages.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[1180px] mx-auto">
          <Section eyebrow="Main" heading="Top-level pages" items={TOP_LEVEL} />
          <Section
            eyebrow="Programmes"
            heading="TLC Flagship Programmes"
            items={programmes}
          />
          <Section
            eyebrow="Diagnostics"
            heading="Precision Diagnostics"
            items={diagnostics}
          />
          <Section
            eyebrow="Aesthetics"
            heading="Skin &amp; Aesthetics Treatments"
            items={skin}
          />
          <Section
            eyebrow="Clinics"
            heading="Our Centres Across India"
            items={centres}
          />
          <Section
            eyebrow="Resources"
            heading="Longevity &amp; Anti-Aging Guides"
            items={landings}
          />
          <Section
            eyebrow="Journal"
            heading="Blog Articles"
            items={blogs}
          />
        </div>
      </section>
    </main>
  )
}
