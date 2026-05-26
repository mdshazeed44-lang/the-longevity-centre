// BlogDetailPage — full reading view for a single migrated blog post.
//
// Slug is read from the URL pathname (e.g. /10-tips-for-good-health).
// Blog data comes from src/lib/blogs.ts. metaTitle / metaDescription
// are kept identical to the legacy theantiagingcentre.com page so
// Google sees no semantic change when the 301 from the old domain
// lands here.
//
// Body content is markdown and rendered via our in-house Markdown
// component (src/lib/markdown.tsx) which avoids the React 19
// incompatibility issues seen with react-markdown 10.x.
import { useMemo } from 'react'
import { Markdown } from '../lib/markdown'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { getBlogBySlug, getBlogsByTraffic } from '../lib/blogs'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogDetailPage() {
  // Derive slug from pathname — first segment after '/'.
  const slug = useMemo(
    () => window.location.pathname.replace(/^\/|\/$/g, '').split('/')[0],
    []
  )
  const blog = useMemo(() => getBlogBySlug(slug), [slug])
  const related = useMemo(
    () => getBlogsByTraffic().filter((b) => b.slug !== slug).slice(0, 3),
    [slug]
  )

  useDocumentMeta(
    blog
      ? {
          title: blog.metaTitle,
          description: blog.metaDescription,
          path: `/${blog.slug}`,
          ogImage: blog.heroImage,
          jsonLd: [
            breadcrumbList([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: blog.title, url: `/${blog.slug}` },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: blog.h1,
              description: blog.metaDescription,
              image: `https://thelongevitycentre.co${blog.heroImage}`,
              datePublished: blog.publishDate,
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
          title: 'Article Not Found · TLC',
          description: 'The article you requested could not be found.',
          path: `/${slug}`,
        }
  )

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-cream px-6 pt-24">
        <div className="text-center max-w-md">
          <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-4">
            — 404 —
          </div>
          <h1 className="font-display font-bold text-[32px] leading-[1.15] text-ink mb-4">
            Article not found.
          </h1>
          <p className="text-graphite mb-6">
            The article you requested may have moved or no longer exists.
          </p>
          <a
            href="/blog"
            className="inline-block px-6 py-3 text-[12px] tracking-[0.12em] uppercase font-semibold text-white bg-rust rounded-full hover:bg-rust-deep transition-colors"
          >
            Browse all articles
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
        <a href="/blog" className="hover:text-rust transition-colors">
          Blog
        </a>
        <span className="mx-2">/</span>
        <span className="text-graphite">{blog.category}</span>
      </div>

      {/* HERO */}
      <header className="px-6 md:px-12 max-w-[920px] mx-auto mb-10 md:mb-14">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mb-5">
          — {blog.category} —
        </div>
        <h1 className="font-display font-bold text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.02em] text-ink mb-6">
          {blog.h1}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-[12.5px] text-graphite/80">
          <span className="font-medium text-graphite">{blog.author}</span>
          <span className="w-1 h-1 rounded-full bg-graphite/30" />
          <span>{formatDate(blog.publishDate)}</span>
          <span className="w-1 h-1 rounded-full bg-graphite/30" />
          <span>{blog.readingTime}</span>
        </div>
      </header>

      {/* HERO IMAGE */}
      <figure className="px-6 md:px-12 max-w-[1100px] mx-auto mb-12 md:mb-16">
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(27,26,24,0.35)]">
          <img
            src={blog.heroImage}
            alt={blog.h1}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </figure>

      {/* BODY */}
      <article className="px-6 md:px-12 max-w-[760px] mx-auto">
        <div className="blog-body">
          <Markdown source={blog.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 md:p-12 bg-ink text-white rounded-3xl text-center">
          <div className="text-[10px] tracking-[0.32em] uppercase text-rust-soft font-semibold mb-3">
            — Ready to act —
          </div>
          <h3 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.015em] mb-4">
            Build your own longevity blueprint.
          </h3>
          <p className="text-[14px] md:text-[15px] leading-[1.6] text-white/70 max-w-[520px] mx-auto mb-7">
            A 30-minute consultation with our clinical team — designed around
            your biology, not a template.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase font-semibold text-ink bg-white rounded-full hover:bg-cream transition-colors"
          >
            Book consultation →
          </a>
        </div>
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-20 md:mt-28 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
              — Continue reading —
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[36px] leading-[1.15] text-ink">
              More from TLC.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/${r.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-mist/60 hover:shadow-[0_24px_60px_-30px_rgba(148,84,85,0.3)] transition-all duration-500"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={r.heroImage}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-rust font-semibold mb-2">
                    {r.category}
                  </div>
                  <h3 className="font-display font-bold text-[17px] leading-[1.25] text-ink group-hover:text-rust transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
