// Footer — clean premium directory: brand mark, contact + nav columns,
// copyright + social row.
import { Logo } from './Logo'
import { PROGRAMS } from '../lib/programs'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    d: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.95c-3.15 0-3.5.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.83-1.27a3.43 3.43 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.24-.06-1.59-.07-4.74-.07zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94zm5.81-7.72a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    d: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/',
    d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    d: 'M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76S5.53 3.21 6.5 3.21s1.75.79 1.75 1.76S7.47 6.73 6.5 6.73zM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.76c1.4-2.58 7-2.78 7 2.47V19z',
  },
]

const CLINICS = [
  'Delhi',
  'Gurgaon',
  'Mumbai',
  'Pune',
  'Nagpur',
  'Goa',
  'Hyderabad',
  'Bangalore',
]

// Company column — only links to pages that actually exist.
const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Diagnostics', href: '/diagnostics' },
  { label: 'Centres', href: '/centres' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function Footer() {
  return (
    <footer role="contentinfo" className="relative bg-white text-ink overflow-hidden">
      {/* Hairline top rule — editorial separation from page */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/10" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8">
        {/* ============== DIRECTORY: brand + 3 link columns ============== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12 pb-10 md:pb-12">
          {/* Brand + contact */}
          <div>
            <div className="mb-5">
              <Logo variant="dark" size={32} />
            </div>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>
                <a
                  href="tel:+918826809123"
                  data-cursor="hover"
                  className="text-graphite hover:text-rust transition-colors duration-300"
                >
                  +91 88268 09123
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thelongevitycentre.com"
                  data-cursor="hover"
                  className="text-graphite hover:text-rust transition-colors duration-300"
                >
                  info@thelongevitycentre.com
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                  data-cursor="hover"
                  className="text-graphite hover:text-rust transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <div className="text-[10.5px] tracking-[0.42em] text-rust font-semibold uppercase mb-4">
              Programmes
            </div>
            <ul className="space-y-2.5 text-[13.5px]">
              {PROGRAMS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/programs/${p.slug}`}
                    data-cursor="hover"
                    className="text-graphite hover:text-rust transition-colors duration-300"
                  >
                    {p.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinics */}
          <div>
            <div className="text-[10.5px] tracking-[0.42em] text-rust font-semibold uppercase mb-4">
              Clinics
            </div>
            <ul className="space-y-2.5 text-[13.5px]">
              {CLINICS.map((c) => (
                <li key={c}>
                  <a
                    href={`/centres/${c.toLowerCase()}`}
                    data-cursor="hover"
                    className="text-graphite hover:text-rust transition-colors duration-300"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-[10.5px] tracking-[0.42em] text-rust font-semibold uppercase mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-[13.5px]">
              {COMPANY_LINKS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    data-cursor="hover"
                    className="text-graphite hover:text-rust transition-colors duration-300"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============== BOTTOM — copyright + social ============== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-ink/10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-graphite tracking-tight">
            <p>© {new Date().getFullYear()} TLC — The Longevity Centre.</p>
            <p>
              Designed by{' '}
              <a
                href="https://www.incrementors.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="hover:text-rust transition-colors"
              >
                Incrementors
              </a>
            </p>
            <a href="/privacy" data-cursor="hover" className="hover:text-rust transition-colors">
              Privacy
            </a>
            <a href="/terms" data-cursor="hover" className="hover:text-rust transition-colors">
              Terms
            </a>
            <a href="/sitemap" data-cursor="hover" className="hover:text-rust transition-colors">
              Sitemap
            </a>
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`The Longevity Centre on ${s.label}`}
                data-cursor="hover"
                className="group w-9 h-9 rounded-full border border-ink/15 hover:border-rust flex items-center justify-center text-graphite hover:text-rust transition-colors duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
