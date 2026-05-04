// Logo — official TLC ("The Longevity Centre") logo with DNA helix mark.
// Source asset: /tlc-logo.png (rust on transparent — works on light bg).
// For dark backgrounds, CSS filter inverts to render the logo white.

type Variant = 'light' | 'dark'

const SRC = '/tlc-logo.png'
const ALT = 'The Longevity Centre'

// Compact mark-only variant
export function LogoMark({
  className = '',
  size = 52,
  variant = 'light',
}: {
  className?: string
  size?: number
  variant?: Variant
}) {
  // variant 'light' = used on a DARK background -> render the logo WHITE
  //                   (the source asset is rust, so brightness(0)+invert(1) = white)
  // variant 'dark'  = used on a LIGHT background -> render the asset as-is (rust)
  const onDarkBg = variant === 'light'
  return (
    <img
      src={SRC}
      alt={ALT}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{
        height: size,
        width: 'auto',
        filter: onDarkBg ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  )
}

// Full logo lockup — supports a size prop so consumers (Header / Footer)
// can use different scales while sharing one source of truth.
export function Logo({
  variant = 'light',
  showTagline: _showTagline = true,
  size = 56,
  className = '',
}: {
  variant?: Variant
  showTagline?: boolean
  size?: number
  className?: string
}) {
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
