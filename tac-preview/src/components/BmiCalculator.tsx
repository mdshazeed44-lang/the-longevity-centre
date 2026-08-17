// BmiCalculator — reusable interactive BMI calc, premium editorial styling.
//
// Two variants:
//   - variant="selector"  — used on /programs index. Recommends WHICH
//     programme suits the user based on BMI band.
//   - variant="program"   — used on individual programme detail pages.
//     Frames the result as "here's exactly what 3 months of THIS
//     programme will change for you".
//
// Both variants share the same form, calculator logic, and editorial
// footnote (BMI is a starting point, not a verdict — TLC measures the
// real picture). Result reveals with a soft fade-in. Mobile-first.
//
// No backend, no email capture (yet). The result CTA pushes the user
// toward the consultation flow OR a specific programme detail page.

import { useState, useMemo } from 'react'

// Slugs of the 6 TLC programmes. Used by the "selector" variant to point
// the user to the right detail page based on their BMI band.
type ProgramSlug =
  | 'metabolic-weight-loss'
  | 'diabetes-fatty-liver-reversal'
  | 'pcod-correction'
  | 'longevity-plus'
  | 'advanced-metabolomics'
  | 'gut-metabolic'

type BmiBand = {
  min: number
  max: number
  label: string
  category: 'under' | 'normal' | 'over' | 'obese-1' | 'obese-2'
  // Headline shown to the user
  verdict: string
  // 1-line context
  context: string
  // Recommended programme slug (for selector variant)
  recommendedSlug: ProgramSlug
  recommendedName: string
}

// WHO + Asian-Indian adjusted bands (Asian-Indian thresholds are ~2 kg/m²
// lower than international — used by ICMR / Indian endocrinology bodies).
const BMI_BANDS: BmiBand[] = [
  {
    min: 0,
    max: 18.4,
    label: 'Underweight',
    category: 'under',
    verdict: 'Below the healthy range.',
    context:
      'Low BMI can mask hormonal, gut absorption or thyroid issues. Worth a full diagnostic baseline before assuming it\'s "just genetics".',
    recommendedSlug: 'longevity-plus',
    recommendedName: 'Longevity Plus',
  },
  {
    min: 18.5,
    max: 22.9,
    label: 'Normal',
    category: 'normal',
    verdict: 'In the healthy range.',
    context:
      'Weight is fine, but composition tells the rest of the story. Visceral fat, muscle mass and metabolic age can still be off.',
    recommendedSlug: 'longevity-plus',
    recommendedName: 'Longevity Plus',
  },
  {
    min: 23.0,
    max: 24.9,
    label: 'Overweight (Asian-Indian)',
    category: 'over',
    verdict: 'Slightly above the healthy range.',
    context:
      'For Asian-Indians, the threshold for "overweight" begins at 23, not 25. Worth investigating before the trajectory steepens.',
    recommendedSlug: 'metabolic-weight-loss',
    recommendedName: 'Metabolic & Weight Loss',
  },
  {
    min: 25.0,
    max: 29.9,
    label: 'Overweight',
    category: 'over',
    verdict: 'Above the healthy range.',
    context:
      'Often comes with insulin resistance, fatty liver, lipid imbalances and inflammation, most of it silent. Reversible with the right protocol.',
    recommendedSlug: 'metabolic-weight-loss',
    recommendedName: 'Metabolic & Weight Loss',
  },
  {
    min: 30.0,
    max: 34.9,
    label: 'Obese · Class I',
    category: 'obese-1',
    verdict: 'Significantly above the healthy range.',
    context:
      'Class I obesity carries elevated risk for diabetes, cardiovascular disease and fatty liver. A diagnostics-led reversal programme is the right next step.',
    recommendedSlug: 'diabetes-fatty-liver-reversal',
    recommendedName: 'Diabetes & Fatty Liver Reversal',
  },
  {
    min: 35.0,
    max: 100,
    label: 'Obese · Class II+',
    category: 'obese-2',
    verdict: 'Substantially above the healthy range.',
    context:
      'A comprehensive metabolic + hormonal + behavioural protocol is essential. Don\'t do this alone, clinical-grade support changes the outcome.',
    recommendedSlug: 'diabetes-fatty-liver-reversal',
    recommendedName: 'Diabetes & Fatty Liver Reversal',
  },
]

function getBand(bmi: number): BmiBand {
  return BMI_BANDS.find((b) => bmi >= b.min && bmi <= b.max) ?? BMI_BANDS[0]
}

// Brand colour per category — band-specific accent without going traffic-light.
function bandAccent(c: BmiBand['category']) {
  switch (c) {
    case 'normal':
      return { dot: 'bg-green-soft', text: 'text-green' }
    case 'under':
    case 'over':
      return { dot: 'bg-rust-soft', text: 'text-rust' }
    case 'obese-1':
    case 'obese-2':
      return { dot: 'bg-rust', text: 'text-rust' }
  }
}

export type BmiCalculatorProps = {
  /** Visual variant — controls headline / CTA framing only. */
  variant?: 'selector' | 'program'
  /** Display name of the current programme (used in `variant="program"` CTAs). */
  currentProgramName?: string
  /** Section eyebrow override. */
  eyebrow?: string
  /** Headline override (otherwise the variant-default is used). */
  headline?: string
  /** Sub-copy override. */
  subcopy?: string
  /** Hide the Gender selector (e.g. on female-only PCOD programme page). */
  hideGender?: boolean
}

export function BmiCalculator({
  variant = 'selector',
  currentProgramName,
  eyebrow,
  headline,
  subcopy,
  hideGender = false,
}: BmiCalculatorProps) {
  const [height, setHeight] = useState<string>('170')
  const [weight, setWeight] = useState<string>('70')
  const [age, setAge] = useState<string>('35')
  const [gender, setGender] = useState<'male' | 'female'>(hideGender ? 'female' : 'male')
  const [submitted, setSubmitted] = useState(false)

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (!h || !w || h <= 0) return null
    return Number((w / (h * h)).toFixed(1))
  }, [height, weight])

  const band = bmi ? getBand(bmi) : null
  const accent = band ? bandAccent(band.category) : null

  const defaultEyebrow =
    variant === 'selector' ? 'Find Your Programme' : 'Where Do You Stand'
  const defaultHeadline =
    variant === 'selector'
      ? 'Calculate your starting point.'
      : 'Calculate where you stand.'
  const defaultSubcopy =
    variant === 'selector'
      ? 'BMI is the first conversation, not the last. Enter your numbers, we\'ll match you to the right programme.'
      : 'A quick reality check before you begin. Your BMI tells us where to start; the full diagnostic baseline tells us how far we can go.'

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-white overflow-hidden">
      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-end mb-12 md:mb-16">
          <div>
            <div className="text-[10.5px] md:text-[11px] tracking-[0.42em] uppercase text-rust font-semibold mb-6">
              {eyebrow ?? defaultEyebrow}
            </div>
            <h2 className="font-display font-light text-[30px] md:text-[44px] xl:text-[52px] leading-[1.05] tracking-[-0.025em] text-ink">
              {headline ?? defaultHeadline}
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-graphite font-light max-w-[440px] md:pb-3">
            {subcopy ?? defaultSubcopy}
          </p>
        </div>

        {/* Calculator card — 2-col grid: form left, result right */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-px bg-ink/10 border border-ink/10 rounded-[20px] overflow-hidden">
          {/* FORM SIDE */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="bg-white p-6 md:p-10 flex flex-col gap-6"
          >
            <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold">
              Your Numbers
            </div>

            {/* Height + Weight row */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Height"
                unit="cm"
                value={height}
                onChange={setHeight}
                min={120}
                max={220}
              />
              <Field
                label="Weight"
                unit="kg"
                value={weight}
                onChange={setWeight}
                min={30}
                max={200}
              />
            </div>

            {/* Age (+ optional Gender) row */}
            <div className={hideGender ? '' : 'grid grid-cols-[1fr_1.4fr] gap-4'}>
              <Field
                label="Age"
                unit="yrs"
                value={age}
                onChange={setAge}
                min={18}
                max={90}
              />
              {!hideGender && (
                <div>
                  <label className="block text-[10.5px] tracking-[0.28em] uppercase text-graphite font-semibold mb-2">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['male', 'female'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-3 px-3 rounded-full border text-[11.5px] tracking-[0.18em] uppercase font-semibold transition-colors duration-300 ${
                          gender === g
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white text-ink border-ink/15 hover:border-rust'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              data-cursor="hover"
              data-magnetic
              className="group inline-flex items-center justify-center gap-3 mt-2 pl-5 pr-6 py-4 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
            >
              Calculate My BMI
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Honest disclaimer */}
            <p className="text-[12px] leading-[1.6] text-stone font-light pt-4 border-t border-mist">
              BMI is a screening tool, not a diagnosis. It misreads athletes
              (high muscle mass) and the elderly (low muscle, retained fat).
              At TLC we measure body composition, visceral fat, hormone
              profile and biological age, the real picture.
            </p>
          </form>

          {/* RESULT SIDE */}
          <div
            aria-live="polite"
            className="bg-cream/40 p-6 md:p-10 flex flex-col justify-center min-h-[420px] relative"
          >
            {!submitted || !bmi || !band || !accent ? (
              // EMPTY STATE — pre-calc placeholder
              <div className="text-center max-w-[360px] mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rust/10 border border-rust/20 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust">
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                    <line x1="10" y1="3" x2="8" y2="21" />
                    <line x1="16" y1="3" x2="14" y2="21" />
                  </svg>
                </div>
                <div className="text-[10.5px] tracking-[0.32em] uppercase text-rust font-semibold mb-3">
                  Awaiting Your Numbers
                </div>
                <p className="text-[14px] leading-[1.6] text-graphite font-light">
                  {hideGender
                    ? "Enter height, weight and age, we'll calculate your BMI and recommend the next step."
                    : "Enter height, weight, age and gender, we'll calculate your BMI and recommend the next step."}
                </p>
              </div>
            ) : (
              // RESULT STATE
              <div className="result-fade">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
                  <span className="text-[10px] tracking-[0.32em] uppercase text-graphite font-semibold">
                    Your BMI
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className={`font-display font-bold text-[58px] md:text-[72px] leading-none tabular-nums tracking-[-0.02em] ${accent.text}`}>
                    {bmi}
                  </span>
                  <span className="text-[12px] tracking-[0.18em] uppercase text-graphite font-semibold">
                    kg/m²
                  </span>
                </div>
                <div className="text-[16px] md:text-[18px] font-display font-bold text-ink mb-4 tracking-[-0.01em]">
                  {band.label}
                </div>
                <span aria-hidden className="block h-px w-10 bg-rust mb-5" />
                <p className="text-[13.5px] md:text-[14.5px] leading-[1.65] text-graphite font-light mb-6">
                  <span className="text-ink font-medium">{band.verdict}</span>{' '}
                  {band.context}
                </p>

                {/* Recommendation block — variant-specific */}
                {variant === 'selector' && (
                  <div className="bg-white border border-mist rounded-[14px] p-5 md:p-6">
                    <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1.5">
                      We Recommend
                    </div>
                    <h4 className="font-display font-bold text-[18px] md:text-[20px] tracking-[-0.015em] text-ink mb-4">
                      {band.recommendedName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`/programs/${band.recommendedSlug}`}
                        data-cursor="hover"
                        className="group inline-flex items-center gap-2 px-5 py-3 bg-rust text-white text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
                      >
                        Explore Programme
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                      <a
                        href="/contact"
                        data-cursor="hover"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-ink/15 text-ink text-[11px] tracking-[0.22em] font-semibold uppercase rounded-full hover:border-rust hover:text-rust transition-colors duration-500"
                      >
                        Talk to a Doctor
                      </a>
                    </div>
                  </div>
                )}

                {variant === 'program' && (
                  <div className="bg-white border border-mist rounded-[14px] p-5 md:p-6">
                    <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-1.5">
                      Your Next Step
                    </div>
                    <h4 className="font-display font-bold text-[16px] md:text-[18px] leading-[1.35] tracking-[-0.01em] text-ink mb-4">
                      {currentProgramName
                        ? `See exactly what ${currentProgramName} changes in 3 months, for someone with your numbers.`
                        : 'Book a 30-minute consultation, we\'ll review your numbers in clinical depth.'}
                    </h4>
                    <a
                      href="/contact"
                      data-cursor="hover"
                      data-magnetic
                      className="group inline-flex items-center gap-3 pl-5 pr-6 py-3.5 bg-rust text-white text-[11.5px] tracking-[0.22em] font-semibold uppercase rounded-full hover:bg-ink transition-colors duration-500"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      Arrange a Consultation
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footnote — what TLC measures beyond BMI.
            Single eyebrow at the section top (was repeated per card). */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-ink/10">
          <div className="text-[10px] tracking-[0.32em] uppercase text-rust font-semibold mb-6">
            Beyond BMI
          </div>
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                k: 'Body composition',
                v: 'Fat / muscle / visceral / hydration measured per limb',
              },
              {
                k: 'Metabolic age',
                v: 'Blood biological age measured with your blood biomarkers',
              },
              {
                k: 'Hormone profile',
                v: 'Thyroid, sex hormones, insulin and inflammation, fully decoded',
              },
            ].map((m) => (
              <div key={m.k}>
                <div className="font-display font-bold text-[15px] md:text-[16px] tracking-[-0.01em] text-ink mb-1.5">
                  {m.k}
                </div>
                <p className="text-[13px] leading-[1.55] text-graphite font-light">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .result-fade {
          animation: bmiFadeIn 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes bmiFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .result-fade { animation: none; }
        }
      `}</style>
    </section>
  )
}

// ---------- Sub-component: numeric field with stepper buttons ----------
function Field({
  label,
  unit,
  value,
  onChange,
  min,
  max,
}: {
  label: string
  unit: string
  value: string
  onChange: (v: string) => void
  min: number
  max: number
}) {
  const num = parseFloat(value) || 0
  const step = (delta: number) => {
    const next = Math.max(min, Math.min(max, num + delta))
    onChange(String(next))
  }
  return (
    <div>
      <label className="block text-[10.5px] tracking-[0.28em] uppercase text-graphite font-semibold mb-2">
        {label} <span className="text-stone font-normal">({unit})</span>
      </label>
      <div className="flex items-center bg-white border border-ink/15 rounded-full overflow-hidden focus-within:border-rust transition-colors duration-300">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="shrink-0 w-11 h-12 flex items-center justify-center text-graphite hover:text-rust transition-colors text-[18px] leading-none"
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="w-full text-center bg-transparent text-[18px] font-display font-bold text-ink tabular-nums focus:outline-none py-3"
        />
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={`Increase ${label.toLowerCase()}`}
          className="shrink-0 w-11 h-12 flex items-center justify-center text-graphite hover:text-rust transition-colors text-[18px] leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}
