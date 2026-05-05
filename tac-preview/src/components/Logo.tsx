// Logo — official TLC ("The Longevity Centre") wordmark.
// Source asset: /tlc-logo.png (rust on transparent — works on light bg).
// For dark backgrounds, the CSS filter inverts the asset to render white.

type Variant = 'light' | 'dark'

const SRC = '/tlc-logo.png'
const ALT = 'The Longevity Centre'

interface LogoProps {
  /** 'light' = on dark background (renders white); 'dark' = on light background (renders rust). */
  variant?: Variant
  /** Logo height in pixels. Width auto-scales to maintain aspect. */
  size?: number
  className?: string
}

/**
 * Renders the TLC logo. Used in `Header` and `Footer` so all consumers
 * share one source of truth for the brand mark.
 */
export function Logo({ variant = 'light', size = 56, className = '' }: LogoProps) {
  const onDarkBg = variant === 'light'
  return (
    <img
      src={SRC}
      alt={ALT}
      className={`object-contain w-auto ${className}`}
      style={{
        height: size,
        filter: onDarkBg ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  )
}
