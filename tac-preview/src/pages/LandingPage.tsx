// LandingPage — renders a single SEO landing page from src/lib/landings.ts.
//
// Slug is read from window.location.pathname. metaTitle / description /
// h1 are preserved from the legacy theantiagingcentre.com page so any
// Google ranking transfers cleanly when the 301 from the old domain
// lands here.
//
// Body content is markdown, rendered via the in-house Markdown component.
// Shares the .blog-body CSS for typography.
import { useMemo } from 'react'
import { Markdown } from '../lib/markdown'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { getLandingBySlug } from '../lib/landings'

export function LandingPage() {
  const slug = useMemo(
    () => window.location.pathname.replace(/^\/|\/$/g, '').split('/')[0],
    []
  )
  const landing = useMemo(() => getLandingBySlug(slug), [slug])

  useDocumentMeta(
    landing
      ? {
          title: landing.metaTitle,
          description: landing.metaDescription,
          path: `/${landing.slug}`,
          ogImage: landing.heroImage,
          jsonLd: [
            breadcrumbList([
              { name: 'Home', url: '/' },
              { name: landing.h1, url: `/${landing.slug}` },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: landing.h1,
              description: landing.metaDescription,
              image: `https://thelongevitycentre.co${landing.heroImage}`,
              author: { '@type': 'Organization', name: 'The Longevity Centre' },
              publisher: {
                '@type': 'Organization',
                name: 'The Longevity Centre',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://thelongevitycentre.co/og/logo.png',
                },
              },
            },
          ],
        }
      : {
          title: 'Page Not Found · TLC',
          description: 'The page you requested could not be found.',
          path: `/${slug}`,
        }
  )

  if (!landing) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-cream px-6 pt-24">
        <div className="text-center max-w-md">
          <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-4">
            404
          </div>
          <h1 className="font-display font-bold text-[32px] leading-[1.15] text-ink mb-4">
            Page not found.
          </h1>
          <a
            href="/"
            className="inline-block px-6 py-3 text-[12px] tracking-[0.12em] uppercase font-semibold text-white bg-rust rounded-full hover:bg-rust-deep transition-colors"
          >
            Back to home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-cream">
      {/* BREADCRUMB */}
      <div className="px-6 md:px-12 max-w-[920px] mx-auto mb-8 text-[11px] tracking-[0.18em] uppercase text-graphite/60">
        <a href="/" className="hover:text-rust transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-graphite">{landing.eyebrow}</span>
      </div>

      {/* HERO */}
      <header className="px-6 md:px-12 max-w-[920px] mx-auto mb-10 md:mb-14">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mb-5">
          {landing.eyebrow}
        </div>
        <h1 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.02em] text-ink mb-6">
          {landing.h1}
        </h1>
        <p className="text-[16px] md:text-[18px] leading-[1.55] text-graphite font-light max-w-[680px]">
          {landing.intro}
        </p>
      </header>

      {/* HERO IMAGE */}
      <figure className="px-6 md:px-12 max-w-[1100px] mx-auto mb-12 md:mb-16">
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(27,26,24,0.35)]">
          <img
            src={landing.heroImage}
            alt={landing.h1}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </figure>

      {/* BODY */}
      <article className="px-6 md:px-12 max-w-[760px] mx-auto">
        <div className="blog-body">
          <Markdown source={landing.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 md:p-12 bg-ink text-white rounded-3xl text-center">
          <div className="text-[10px] tracking-[0.32em] uppercase text-rust-soft font-semibold mb-3">
            Speak with our team
          </div>
          <h3 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.015em] mb-4">
            Personalised longevity care, delivered by physicians.
          </h3>
          <p className="text-[14px] md:text-[15px] leading-[1.6] text-white/70 max-w-[520px] mx-auto mb-7">
            A 30-minute consultation with TLC's clinical team, designed around
            your biology, not a template. Six centres across India.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase font-semibold text-ink bg-white rounded-full hover:bg-cream transition-colors"
          >
            Book consultation →
          </a>
        </div>
      </article>
    </main>
  )
}
