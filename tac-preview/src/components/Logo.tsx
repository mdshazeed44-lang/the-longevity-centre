// Logo — TLC brand mark: original DNA icon + refined CSS wordmark.
// The icon is cropped from the existing /tlc-logo.png asset (the leading
// square block); the wordmark text is re-rendered with Cabinet Grotesk so
// we control weight and tracking precisely. Used by Header and Footer.

type Variant = 'light' | 'dark'

const SRC = '/tlc-logo.png'
const ACCESSIBLE_NAME = 'The Longevity Centre'

interface LogoProps {
  /** 'light' = on dark background (renders white); 'dark' = on light background (renders rust). */
  variant?: Variant
  /** Icon height in pixels. The wordmark scales relative to this. */
  size?: number
  className?: string
}

/**
 * Renders the TLC logo: cropped icon + 3-line stacked wordmark.
 * One source of truth for header / footer / any consumer.
 */
export function Logo({ variant = 'light', size = 56, className = '' }: LogoProps) {
  const onDarkBg = variant === 'light'
  const wordmarkColor = onDarkBg ? 'text-white' : 'text-rust'
  const iconFilter = onDarkBg ? 'brightness(0) invert(1)' : 'none'

  return (
    <span
      role="img"
      aria-label={ACCESSIBLE_NAME}
      className={`inline-flex items-center gap-2.5 align-middle ${className}`}
    >
      {/* Icon — cropped to a square from the leading portion of the asset.
          Wrapper width = size; inner img keeps intrinsic aspect so only the
          icon block is visible. */}
      <span
        aria-hidden
        style={{ width: size, height: size }}
        className="inline-block overflow-hidden shrink-0"
      >
        <img
          src={SRC}
          alt=""
          decoding="async"
          style={{
            height: size,
            width: 'auto',
            maxWidth: 'none',
            filter: iconFilter,
          }}
          className="object-contain"
        />
      </span>

      {/* Wordmark — refined stacked treatment ("Option A").
          Compact 3-line uppercase, medium weight, generous tracking. */}
      <span
        aria-hidden
        className={`font-display text-[10px] tracking-[0.24em] leading-[1.25] uppercase font-medium ${wordmarkColor}`}
      >
        <span className="block">The</span>
        <span className="block">Longevity</span>
        <span className="block">Centre</span>
      </span>
    </span>
  )
}
