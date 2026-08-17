// BlogListPage — paginated index of all migrated blog posts.
//
// Posts are loaded from src/lib/blogs.ts and sorted by Semrush
// organic traffic (highest first) so SEO leaders surface at the top.
// Pagination is client-side, 10 posts per page, controlled by a
// ?page= query string so each page is independently shareable.
import { useEffect, useMemo, useState } from 'react'
import { useDocumentMeta, breadcrumbList } from '../lib/seo'
import { getBlogsByTraffic } from '../lib/blogs'

const PAGE_SIZE = 10

const BLOG_META = {
  title: 'TLC Insights, Longevity, Wellness & Anti-Aging Blogs',
  description:
    'Evidence-led articles on longevity, gut health, hormones, skin, weight and preventive medicine, written by the TLC clinical team.',
  path: '/blog',
  ogImage: '/og/centres.jpg',
  jsonLd: [
    breadcrumbList([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
  ],
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getPageFromUrl(): number {
  const params = new URLSearchParams(window.location.search)
  const n = parseInt(params.get('page') || '1', 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}

function setPageInUrl(page: number) {
  const url = new URL(window.location.href)
  if (page === 1) url.searchParams.delete('page')
  else url.searchParams.set('page', String(page))
  window.history.pushState(null, '', url.toString())
}

export function BlogListPage() {
  useDocumentMeta(BLOG_META)
  const blogs = useMemo(() => getBlogsByTraffic(), [])
  const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE))
  const [page, setPage] = useState<number>(() => getPageFromUrl())

  useEffect(() => {
    const onPop = () => setPage(getPageFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const start = (page - 1) * PAGE_SIZE
  const visible = blogs.slice(start, start + PAGE_SIZE)

  function goToPage(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages)
    setPage(clamped)
    setPageInUrl(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-cream">
      {/* HERO */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto mb-14 md:mb-20 text-center">
        <div className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-rust font-semibold mb-5">
          TLC Insights
        </div>
        <h1 className="font-display font-bold text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-ink mb-6">
          Evidence-led writing
          <br className="hidden md:block" />
          <span className="text-rust"> on longer, healthier living.</span>
        </h1>
        <p className="text-[15px] md:text-[17px] leading-[1.6] text-graphite max-w-[680px] mx-auto">
          Articles on longevity, gut health, hormones, skin, weight management
          and preventive medicine, written by the TLC clinical team and edited
          for clarity over hype.
        </p>
      </section>

      {/* CARD GRID */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
          {visible.map((b) => (
            <a
              key={b.slug}
              href={`/${b.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-mist/60 hover:shadow-[0_30px_70px_-30px_rgba(148,84,85,0.35)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Cover image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-mist">
                <img
                  src={b.heroImage}
                  alt={b.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4 bg-cream/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] tracking-[0.22em] uppercase text-rust font-semibold">
                  {b.category}
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex items-center gap-3 text-[11px] text-graphite/70 mb-3">
                  <span>{formatDate(b.publishDate)}</span>
                  <span className="w-1 h-1 rounded-full bg-graphite/30" />
                  <span>{b.readingTime}</span>
                </div>

                <h2 className="font-display font-bold text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.015em] text-ink group-hover:text-rust transition-colors duration-500 mb-3">
                  {b.title}
                </h2>

                <p className="text-[14.5px] leading-[1.6] text-graphite font-light line-clamp-3 mb-5 flex-1">
                  {b.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-rust font-semibold mt-auto">
                  <span>Read article</span>
                  <span
                    className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-2 mt-16"
            aria-label="Pagination"
          >
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase font-semibold text-graphite border border-mist rounded-full hover:border-rust hover:text-rust disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-mist disabled:hover:text-graphite transition-colors"
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                aria-current={p === page ? 'page' : undefined}
                className={
                  p === page
                    ? 'w-10 h-10 rounded-full bg-rust text-white text-[13px] font-semibold'
                    : 'w-10 h-10 rounded-full text-graphite text-[13px] font-semibold hover:bg-mist/50 transition-colors'
                }
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase font-semibold text-graphite border border-mist rounded-full hover:border-rust hover:text-rust disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-mist disabled:hover:text-graphite transition-colors"
            >
              Next →
            </button>
          </nav>
        )}
      </section>
    </main>
  )
}
