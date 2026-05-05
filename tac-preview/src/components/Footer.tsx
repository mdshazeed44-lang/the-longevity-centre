// Footer — white canvas with rust accents, brand statement, contact directory,
// programmes / clinics / company columns, and copyright row.
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
// (Blog + Careers temporarily removed — to be added back when content is ready.)
const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: 'About', href: '/about' },
  { label: 'Diagnostics', href: '/diagnostics' },
  { label: 'Centres', href: '/centres' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function Footer() {
  return (
    <footer role="contentinfo" className="relative bg-white text-ink overflow-hidden">
      {/* Soft warm wash — rust + nougat, barely-there */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(900px 500px at 18% 0%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(700px 400px at 92% 100%, rgba(238,230,219,0.5), transparent 60%)',
        }}
      />
      {/* Hairline top rule — editorial separation from page */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/10" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-14 md:pt-20 pb-8">
        {/* Top — brand statement + CTA */}
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 md:gap-14 items-end pb-10 md:pb-12 border-b border-ink/10">
          <div>
            <div className="mb-5">
              <Logo variant="dark" size={64} />
            </div>
            <h3 className="font-display font-light text-[26px] md:text-[34px] lg:text-[40px] leading-[1.05] tracking-[-0.025em] text-ink max-w-[640px]">
              Premium preventive medicine for the{' '}
              <span className="font-bold text-rust">long view.</span>
            </h3>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <a
              href="/contact"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.2em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Arrange a Consultation
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-[12px] text-graphite hover:text-rust transition-colors duration-300"
            >
              or chat on WhatsApp →
            </a>
          </div>
        </div>

        {/* Mid — directory: 1col phone, 2col tablet, 4col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.25fr_1fr_1fr_1fr] gap-8 md:gap-12 py-10 md:py-14">
          {/* Contact column */}
          <div>
            <div className="text-[10.5px] tracking-[0.42em] text-rust font-semibold uppercase mb-4">
              Get in Touch
            </div>
            <ul className="space-y-3 text-[13.5px]">
              <li>
                <a
                  href="tel:+918826809123"
                  data-cursor="hover"
                  aria-label="Call +91 88268 09123"
                  className="group inline-flex items-center gap-2.5 text-graphite hover:text-rust transition-colors duration-300"
                >
                  <span aria-hidden="true" className="w-7 h-7 rounded-full border border-ink/15 group-hover:border-rust flex items-center justify-center text-rust transition-colors duration-300">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  +91 88268 09123
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thelongevitycentre.com"
                  data-cursor="hover"
                  aria-label="Email info@thelongevitycentre.com"
                  className="group inline-flex items-center gap-2.5 text-graphite hover:text-rust transition-colors duration-300"
                >
                  <span aria-hidden="true" className="w-7 h-7 rounded-full border border-ink/15 group-hover:border-rust flex items-center justify-center text-rust transition-colors duration-300">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  info@thelongevitycentre.com
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                  data-cursor="hover"
                  aria-label="Chat on WhatsApp"
                  className="group inline-flex items-center gap-2.5 text-graphite hover:text-rust transition-colors duration-300"
                >
                  <span aria-hidden="true" className="w-7 h-7 rounded-full border border-ink/15 group-hover:border-rust flex items-center justify-center text-rust transition-colors duration-300">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" focusable="false">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.71.3 1.262.48 1.694.629.712.227 1.36.195 1.871.121.571-.091 1.758-.721 2.006-1.413.255-.69.255-1.29.18-1.414-.074-.124-.27-.21-.57-.345m-5.446 7.443h-.016a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
                    </svg>
                  </span>
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
                    className="text-graphite hover:text-rust hover:translate-x-0.5 inline-block transition-all duration-300"
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
                    className="text-graphite hover:text-rust hover:translate-x-0.5 inline-block transition-all duration-300"
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
                    className="text-graphite hover:text-rust hover:translate-x-0.5 inline-block transition-all duration-300"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom — social + copyright + designed-by, all in one row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pt-6 border-t border-ink/10">
          {/* Left — copyright + legal links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-graphite tracking-tight">
            <p>© {new Date().getFullYear()} TLC — The Longevity Centre.</p>
            <a href="/privacy" data-cursor="hover" className="hover:text-rust transition-colors">
              Privacy
            </a>
            <a href="/terms" data-cursor="hover" className="hover:text-rust transition-colors">
              Terms
            </a>
            <span className="text-stone hidden md:inline">Practising medicine, not marketing.</span>
          </div>
          {/* Right — social icons */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`The Longevity Centre on ${s.label}`}
                data-cursor="hover"
                className="group w-11 h-11 rounded-full border border-ink/15 hover:border-rust flex items-center justify-center text-graphite hover:text-rust hover:bg-rust/5 transition-all duration-500"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
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
