/**
 * CtaBand — site signature bottom-of-page CTA surface used on every
 * page. "Split Editorial" design: a portrait column beside a dark
 * ink form panel, with a full-width stat strip beneath.
 *
 * Layout
 *   - withPortrait (Home only): 2-col grid — Milind portrait left
 *     + dark ink form panel right. The portrait carries the
 *     mandatory "Brand Ambassador · TLC" attribution, so it doubles
 *     as Home's single Brand-Ambassador surface.
 *   - default (all other pages): the dark ink form panel full-width
 *     and centred — no portrait, since those pages already carry
 *     their own dedicated Milind section (avoids two per page).
 *   - Stat strip (8 / 20+ / 1000+ / 3) full-width at the bottom.
 *
 * Form submission mirrors the ContactPage pattern — the values are
 * packaged into a pre-formatted WhatsApp message and opened in a new
 * tab so the clinic team can reply from their WhatsApp business
 * inbox. No backend / email setup needed.
 */
import { useState } from 'react'
import { PROGRAMS } from '../../lib/programs'

type FormState = 'idle' | 'submitting' | 'success'

const WHATSAPP_NUMBER = '%2B918826809123'

const STATS = [
  { k: '8', l: 'Centres pan-India' },
  { k: '20+ years', l: 'In preventive medicine' },
  { k: '1000+', l: 'Biomarkers per patient' },
  { k: '3', l: 'Biological-age clocks' },
]

export function CtaBand({ withPortrait = false }: { withPortrait?: boolean }) {
  const [state, setState] = useState<FormState>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill `botcheck`; drop silently.
    if (data.get('botcheck')) {
      setState('success')
      return
    }

    const name = (data.get('name') as string) || ''
    const phone = (data.get('phone') as string) || ''
    const programme =
      (data.get('programme') as string) || 'Not specified'

    const lines = [
      'Hello TLC team — new consultation request from the website.',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Programme of interest:* ${programme}`,
    ]

    const text = encodeURIComponent(lines.join('\n'))
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${text}&type=phone_number&app_absent=0`

    window.open(url, '_blank', 'noopener,noreferrer')
    setState('success')
    form.reset()
  }

  return (
    <section id="cta" className="relative bg-white overflow-hidden">
      <div
        className={
          withPortrait
            ? 'w-full grid lg:grid-cols-2 min-h-[540px]'
            : 'w-full grid grid-cols-1'
        }
      >
        {/* Milind portrait — Home only. Carries the mandatory
            attribution badge so it doubles as this page's single
            Brand-Ambassador surface. */}
        {withPortrait && (
          <div className="relative flex flex-col bg-gradient-to-b from-white to-[#efe7dd] min-h-[360px] lg:min-h-full">
            <div className="relative flex-1 min-h-[300px] overflow-hidden">
              <img
                src="/longevity/milind-skin.webp?v=3"
                width={1000}
                height={660}
                alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-rust text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold">
                  Brand Ambassador &middot; TLC
                </span>
              </div>
            </div>
            {/* Solid caption band — clean, no gradient over white */}
            <div className="flex items-center gap-4 bg-ink px-6 py-4 md:py-5 border-t border-white/10">
              <span aria-hidden className="w-8 h-px bg-rust-soft shrink-0" />
              <div>
                <div className="font-display italic text-white text-[17px] md:text-[21px] leading-[1.15]">
                  Milind Soman
                </div>
                <div className="text-[9px] md:text-[9.5px] tracking-[0.3em] uppercase text-white/55 font-semibold mt-1.5">
                  Actor &middot; Supermodel &middot; Ironman
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dark form panel */}
        <div className="relative bg-ink text-white px-7 md:px-12 lg:px-14 py-14 md:py-16 flex flex-col justify-center overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(700px 480px at 85% 18%, rgba(148,84,85,0.20), transparent 60%)',
            }}
          />
          <div
            className={`relative w-full ${
              withPortrait
                ? 'max-w-[520px] lg:mx-auto'
                : 'max-w-[1240px] mx-auto lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-center'
            }`}
          >
            {/* Text block — sits left of the form on wide screens so
                the dark panel reads full-width instead of a narrow
                centred column with empty space beside it. */}
            <div className={withPortrait ? '' : 'mb-9 lg:mb-0'}>
              <div className="flex items-center gap-3">
                <span className="w-7 h-px bg-white/40" />
                <span className="text-[10px] tracking-[0.42em] uppercase text-white/70 font-semibold">
                  Begin Your Programme
                </span>
              </div>
              <h2 className="font-display font-light text-[30px] md:text-[42px] xl:text-[48px] leading-[1.05] tracking-[-0.03em] mt-5 mb-3">
                Age should never{' '}
                <span className="font-bold italic text-rust">define you.</span>
              </h2>
              <p className="text-[13.5px] md:text-[14.5px] text-white/60 font-light leading-[1.65] max-w-[440px]">
                Request a 30-minute conversation with our medical team. No
                commitment — we&rsquo;ll be in touch to schedule.
              </p>
            </div>

            {/* Form + alternative contacts block */}
            <div>
            {state === 'success' ? (
              <FormSuccess />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                {/* Honeypot — invisible to humans, bots fill it. */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                />

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-white/10 border border-white/15 rounded-full px-5 py-3 text-[13px] text-white placeholder:text-white/40 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all duration-300"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone (with country code)"
                    className="w-full bg-white/10 border border-white/15 rounded-full px-5 py-3 text-[13px] text-white placeholder:text-white/40 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all duration-300"
                  />
                </div>

                <select
                  name="programme"
                  defaultValue=""
                  className="w-full bg-white/10 border border-white/15 rounded-full px-5 py-3 text-[13px] text-white font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23ffffff' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 20px center',
                  }}
                >
                  <option value="" className="text-ink">
                    Programme of interest (optional)
                  </option>
                  {PROGRAMS.map((p) => (
                    <option key={p.slug} value={p.shortTitle} className="text-ink">
                      {p.shortTitle}
                    </option>
                  ))}
                  <option value="Not sure yet" className="text-ink">
                    Not sure yet — advise me
                  </option>
                </select>

                <button
                  type="submit"
                  data-cursor="hover"
                  data-magnetic
                  disabled={state === 'submitting'}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-5 pr-3 py-3.5 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white hover:text-ink disabled:opacity-60 transition-colors duration-500"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping group-hover:bg-rust/60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white group-hover:bg-rust" />
                  </span>
                  {state === 'submitting' ? 'Sending…' : 'Request Consultation'}
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-rust group-hover:bg-rust group-hover:text-white transition-colors duration-500"
                  >
                    →
                  </span>
                </button>

                <p className="text-[10px] tracking-[0.04em] text-white/35 font-light leading-[1.5] pt-1">
                  Submits to our medical team via WhatsApp.{' '}
                  <span className="text-white/25">No spam, ever.</span>
                </p>
              </form>
            )}

            {/* Alternative contact pills */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-6 pt-5 border-t border-white/10">
              <span className="text-[10px] tracking-[0.32em] uppercase text-white/40 font-medium">
                Or
              </span>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-white hover:text-rust transition-colors duration-300 whitespace-nowrap"
              >
                WhatsApp
              </a>
              <span aria-hidden className="hidden sm:inline text-white/20">·</span>
              <a
                href="tel:+918826809123"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-white hover:text-rust transition-colors duration-300 whitespace-nowrap"
              >
                +91 88268 09123
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip — full-width below the split. */}
      <div className="bg-white border-t border-ink/8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.l}
              className="px-5 py-6 text-center border-r border-b md:border-b-0 border-ink/8 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
            >
              <div className="font-display font-bold text-[20px] md:text-[27px] text-rust leading-none mb-1.5 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[9px] md:text-[9.5px] tracking-[0.24em] uppercase text-graphite font-semibold leading-[1.4]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Success state — shown after the form opens WhatsApp. Tells the
 * user what just happened and gives them a way to do it again or
 * jump to the dedicated /contact page if WhatsApp didn't open.
 */
function FormSuccess() {
  return (
    <div className="bg-white/[0.06] border border-rust/30 rounded-[18px] p-5">
      <div className="text-[10px] tracking-[0.42em] uppercase text-rust font-semibold mb-2.5">
        Almost there
      </div>
      <h3 className="font-display text-white text-[17px] md:text-[19px] leading-[1.3] mb-2 font-light">
        We&rsquo;ve opened WhatsApp with your details pre-filled.
      </h3>
      <p className="text-[13px] text-white/60 font-light leading-[1.55] mb-4">
        Just hit <em>send</em> and our medical team will reply — usually
        within an hour. If WhatsApp didn&rsquo;t open in a new tab, tap
        below.
      </p>
      <a
        href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-white hover:text-ink transition-colors duration-500"
      >
        Open WhatsApp
      </a>
    </div>
  )
}
