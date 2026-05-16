/**
 * CtaBand — site signature bottom-of-page CTA surface used on every
 * page. A compact, presentable appointment surface so visitors can
 * request a consultation without leaving the page.
 *
 * Layout
 *   - Eyebrow centred at top
 *   - Default: single centred column (form only) — used on all
 *     non-home pages, which already carry their own Milind section.
 *   - withPortrait (Home only): 2-col grid — Milind portrait left
 *     + compact form right. Kept off other pages to avoid showing
 *     two Milind images on the same page.
 *   - Alternative contact pills (WhatsApp / phone) below the form
 *   - Stats grid (8 / 20+ / 1000+ / 3) full-width at the bottom
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
    <section
      id="cta"
      className="relative bg-white py-14 md:py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Soft ambient warmth — barely-there rust + nougat wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 18% 25%, rgba(148,84,85,0.05), transparent 60%), radial-gradient(800px 500px at 85% 75%, rgba(238,230,219,0.55), transparent 60%)',
        }}
      />
      {/* Hairline top + bottom rules — editorial framing */}
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-ink/8" />
      <div aria-hidden className="absolute inset-x-6 md:inset-x-12 bottom-0 h-px bg-ink/8" />

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Eyebrow centred above the grid */}
        <div className="flex items-center justify-center gap-3 mb-7 md:mb-9">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[10px] md:text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        <div
          className={
            withPortrait
              ? 'grid md:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-14 items-center max-w-[1060px] mx-auto mb-11 md:mb-14'
              : 'max-w-[560px] mx-auto mb-11 md:mb-14'
          }
        >
          {/* Milind portrait — Home only. Carries the mandatory
              attribution badge so it doubles as this page's single
              Brand-Ambassador surface. */}
          {withPortrait && (
            <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[4/5] rounded-[18px] overflow-hidden bg-white shadow-[0_24px_55px_-28px_rgba(27,26,24,0.32)]">
              <img
                src="/longevity/milind-skin.webp"
                alt="Milind Soman — Brand Ambassador, The Longevity Centre"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 bg-rust text-white px-3 py-1.5 rounded-full shadow-[0_8px_22px_-10px_rgba(27,26,24,0.45)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-[9px] md:text-[9.5px] tracking-[0.26em] uppercase font-semibold">
                  Brand Ambassador &middot; TLC
                </span>
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(27,26,24,0.55) 0%, rgba(27,26,24,0) 100%)',
                }}
              />
              <div className="absolute bottom-3.5 left-4 right-4">
                <div className="font-display italic text-white text-[16px] md:text-[19px] leading-[1.15]">
                  Milind Soman
                </div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/75 font-semibold mt-1">
                  Actor &middot; Supermodel &middot; Ironman
                </div>
              </div>
            </div>
          )}

          <div>
            <div className={withPortrait ? 'md:text-left text-center' : 'text-center'}>
              <h2 className="font-display font-light text-[25px] md:text-[36px] xl:text-[42px] leading-[1.06] tracking-[-0.03em] text-ink mb-3">
                Age should never{' '}
                <span className="font-bold italic text-rust">define you.</span>
              </h2>
              <p
                className={`text-[13px] md:text-[14.5px] text-graphite leading-[1.6] mb-7 font-light ${
                  withPortrait ? 'md:mx-0 max-w-[440px] mx-auto' : 'max-w-[440px] mx-auto'
                }`}
              >
                Request a 30-minute conversation with our medical team. No
                commitment. We&rsquo;ll reply within an hour.
              </p>
            </div>

            <div>
              {state === 'success' ? (
                <FormSuccess />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-2.5"
                >
                  {/* Honeypot — invisible to humans, bots fill it. */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] opacity-0 pointer-events-none"
                  />

                  {/* Name + Phone in a row on sm+, stacked on mobile */}
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-2.5 text-[13px] text-ink placeholder:text-stone/55 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone (with country code)"
                      className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-2.5 text-[13px] text-ink placeholder:text-stone/55 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300"
                    />
                  </div>

                  {/* Programme dropdown */}
                  <select
                    name="programme"
                    defaultValue=""
                    className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-2.5 text-[13px] text-ink font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23945455' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 20px center',
                    }}
                  >
                    <option value="">Programme of interest (optional)</option>
                    {PROGRAMS.map((p) => (
                      <option key={p.slug} value={p.shortTitle}>
                        {p.shortTitle}
                      </option>
                    ))}
                    <option value="Not sure yet">Not sure yet — advise me</option>
                  </select>

                  {/* Submit */}
                  <button
                    type="submit"
                    data-cursor="hover"
                    data-magnetic
                    disabled={state === 'submitting'}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-5 pr-3 py-3 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink disabled:opacity-60 transition-colors duration-500"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    {state === 'submitting' ? 'Sending…' : 'Request Consultation'}
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-rust group-hover:bg-rust group-hover:text-white transition-colors duration-500"
                    >
                      →
                    </span>
                  </button>

                  {/* Tiny privacy note */}
                  <p className="text-[10px] tracking-[0.04em] text-stone/65 font-light leading-[1.5] pt-0.5">
                    Submits to our medical team via WhatsApp.{' '}
                    <span className="text-stone/50">No spam, ever.</span>
                  </p>
                </form>
              )}

              {/* Alternative contact pills — for visitors who prefer
                  a direct line instead of the form. */}
              <div
                className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-5 pt-4 border-t border-ink/8 ${
                  withPortrait ? 'md:justify-start justify-center' : 'justify-center'
                }`}
              >
                <span className="text-[10px] tracking-[0.32em] uppercase text-stone/65 font-medium">
                  Or
                </span>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-ink hover:text-rust transition-colors duration-300 whitespace-nowrap"
                >
                  WhatsApp
                </a>
                <span aria-hidden className="hidden sm:inline text-ink/20">·</span>
                <a
                  href="tel:+918826809123"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-ink hover:text-rust transition-colors duration-300 whitespace-nowrap"
                >
                  +91 88268 09123
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats reassurance row — full-width below the block. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 max-w-[1000px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '20+ years', l: 'In preventive medicine' },
            { k: '1000+', l: 'Biomarkers per patient' },
            { k: '3', l: 'Biological-age clocks' },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white px-5 py-5 text-center"
            >
              <div className="font-display font-bold text-[20px] md:text-[27px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[9.5px] tracking-[0.26em] uppercase text-graphite font-semibold leading-[1.4]">
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
    <div className="bg-cream/60 border border-rust/20 rounded-[18px] p-5">
      <div className="text-[10px] tracking-[0.42em] uppercase text-rust font-semibold mb-2.5">
        Almost there
      </div>
      <h3 className="font-display text-ink text-[17px] md:text-[19px] leading-[1.3] mb-2 font-light">
        We&rsquo;ve opened WhatsApp with your details pre-filled.
      </h3>
      <p className="text-[13px] text-graphite font-light leading-[1.55] mb-4">
        Just hit <em>send</em> and our medical team will reply — usually
        within an hour. If WhatsApp didn&rsquo;t open in a new tab, tap
        below.
      </p>
      <a
        href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-rust transition-colors duration-500"
      >
        Open WhatsApp
      </a>
    </div>
  )
}
