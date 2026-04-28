type Variant = 'light' | 'dark'

// Compact mark-only variant — uses the white logo asset (works on dark bg)
export function LogoMark({
  className = '',
  size = 44,
  variant = 'light',
}: {
  className?: string
  size?: number
  variant?: Variant
}) {
  // For dark backgrounds (footer, header) — use white logo as-is.
  // For light backgrounds — invert via CSS filter.
  const inverted = variant === 'dark'
  return (
    <img
      src="/new-logo-white.webp"
      alt="The Anti-Aging Centre"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{
        height: size,
        width: 'auto',
        filter: inverted ? 'invert(1)' : 'none',
      }}
    />
  )
}

// Full logo lockup — uses the official client logo asset
export function Logo({
  variant = 'light',
  showTagline: _showTagline = true,
  className = '',
}: {
  variant?: Variant
  showTagline?: boolean
  className?: string
}) {
  // The official asset already contains the wordmark, so we ignore showTagline
  // and just render the asset at an appropriate size.
  const inverted = variant === 'dark'
  return (
    <img
      src="/new-logo-white.webp"
      alt="The Anti-Aging Centre"
      className={`object-contain h-[44px] w-auto ${className}`}
      style={{ filter: inverted ? 'invert(1)' : 'none' }}
    />
  )
}
