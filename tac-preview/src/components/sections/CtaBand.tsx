/**
 * CtaBand — site signature bottom-of-page CTA surface used on every
 * page. Combines the "what ageing well looks like" Milind portrait
 * with a compact inline appointment form so visitors can request a
 * consultation without leaving the page.
 *
 * Layout
 *   - Eyebrow centred at top
 *   - 2-col grid: Milind portrait left + compact form right
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

export function CtaBand() {
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
      className="relative bg-white py-20 md:py-24 px-6 md:px-12 overflow-hidden"
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
        {/* Eyebrow centred above the 2-col grid */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
          <span className="w-7 h-px bg-rust" />
          <span className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold">
            Begin Your Programme
          </span>
          <span className="w-7 h-px bg-rust" />
        </div>

        {/* Main 2-col layout — Milind portrait LEFT, headline + form
            stack RIGHT. Mobile collapses to portrait-on-top, content-
            below. */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 lg:gap-20 items-center mb-14 md:mb-16">
          {/* Milind portrait card. Square aspect + object-position
              ~20% horizontal frames Milind's face in the centre and
              crops out the empty cream backdrop that runs down the
              right side of the source photo. */}
          <div className="relative aspect-square rounded-[18px] overflow-hidden bg-cream shadow-[0_28px_60px_-30px_rgba(27,26,24,0.25)] mx-auto w-full max-w-[520px]">
            <img
              src="/longevity/milind-soman.jpg"
              alt="Milind Soman — Indian icon of fitness and longevity"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '22% center' }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(27,26,24,0.60) 0%, rgba(27,26,24,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-5 md:px-6 pb-5 md:pb-6">
              <div className="text-[10px] tracking-[0.34em] uppercase text-white/85 font-semibold mb-1.5">
                What ageing well looks like
              </div>
              <div className="font-display italic text-white text-[16px] md:text-[20px] leading-[1.2]">
                Milind Soman
                <span className="text-white/65 not-italic font-light ml-2">
                  &middot; 58
                </span>
              </div>
            </div>
          </div>

          {/* Right column — headline + inline appointment form */}
          <div>
            <h2 className="font-display font-light text-[28px] md:text-[40px] xl:text-[48px] leading-[1.05] tracking-[-0.03em] text-ink mb-4 text-center md:text-left">
              Age should never{' '}
              <span className="font-bold italic text-rust">define you.</span>
            </h2>
            <p className="text-[13.5px] md:text-[15px] text-graphite leading-[1.6] max-w-[480px] mx-auto md:mx-0 mb-6 font-light text-center md:text-left">
              Request a 30-minute conversation with our medical team. No
              commitment. We&rsquo;ll reply within an hour.
            </p>

            {state === 'success' ? (
              <FormSuccess />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-3"
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

                {/* Name + Phone in a row on md+, stacked on mobile */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-3 text-[13.5px] text-ink placeholder:text-stone/55 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone (with country code)"
                    className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-3 text-[13.5px] text-ink placeholder:text-stone/55 font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300"
                  />
                </div>

                {/* Programme dropdown */}
                <select
                  name="programme"
                  defaultValue=""
                  className="w-full bg-white/80 border border-ink/12 rounded-full px-5 py-3 text-[13.5px] text-ink font-light focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15 transition-all duration-300 appearance-none cursor-pointer"
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
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-5 pr-3 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink disabled:opacity-60 transition-colors duration-500"
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
                <p className="text-[10.5px] tracking-[0.04em] text-stone/65 font-light leading-[1.5] pt-1">
                  Submits to our medical team via WhatsApp.{' '}
                  <span className="text-stone/50">No spam, ever.</span>
                </p>
              </form>
            )}

            {/* Alternative contact pills — for visitors who prefer
                a direct line instead of the form. */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-ink/8 justify-center md:justify-start">
              <span className="text-[10px] tracking-[0.32em] uppercase text-stone/65 font-medium">
                Or
              </span>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B918826809123&text&type=phone_number&app_absent=0"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-ink hover:text-rust transition-colors duration-300"
              >
                WhatsApp
              </a>
              <span aria-hidden className="text-ink/20">·</span>
              <a
                href="tel:+918826809123"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[11.5px] tracking-[0.22em] font-semibold uppercase text-ink hover:text-rust transition-colors duration-300"
              >
                +91 88268 09123
              </a>
            </div>
          </div>
        </div>

        {/* Stats reassurance row — full-width below the 2-col block. */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 max-w-[1080px] mx-auto rounded-2xl overflow-hidden border border-ink/10">
          {[
            { k: '8', l: 'Centres pan-India' },
            { k: '20+ years', l: 'In preventive medicine' },
            { k: '1000+', l: 'Biomarkers per patient' },
            { k: '3', l: 'Biological-age clocks' },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-white px-5 py-6 text-center"
            >
              <div className="font-display font-bold text-[22px] md:text-[30px] text-rust leading-none mb-2 tabular-nums tracking-[-0.01em]">
                {s.k}
              </div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-graphite font-semibold leading-[1.4]">
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
    <div className="bg-cream/60 border border-rust/20 rounded-[18px] p-5 md:p-6">
      <div className="text-[10.5px] tracking-[0.42em] uppercase text-rust font-semibold mb-3">
        Almost there
      </div>
      <h3 className="font-display text-ink text-[18px] md:text-[20px] leading-[1.3] mb-2 font-light">
        We&rsquo;ve opened WhatsApp with your details pre-filled.
      </h3>
      <p className="text-[13.5px] text-graphite font-light leading-[1.55] mb-4">
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
