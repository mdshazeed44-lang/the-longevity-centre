type Variant = 'light' | 'dark'

export function LogoMark({
  className = '',
  size = 22,
  variant = 'dark',
}: {
  className?: string
  size?: number
  variant?: Variant
}) {
  const stroke = variant === 'light' ? '#EEE6DB' : '#945455'
  const fill = variant === 'light' ? '#EEE6DB' : '#945455'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.6" stroke={stroke} strokeWidth="0.7" />
      <circle cx="12" cy="12" r="6.2" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <circle cx="12" cy="12" r="1.8" fill={fill} />
    </svg>
  )
}

export function Logo({
  variant = 'dark',
  showTagline = true,
  className = '',
}: {
  variant?: Variant
  showTagline?: boolean
  className?: string
}) {
  const wordColor = variant === 'light' ? 'text-pearl' : 'text-ink'
  const tagColor = variant === 'light' ? 'text-pearl/55' : 'text-stone'
  const ruleColor = variant === 'light' ? 'bg-pearl/30' : 'bg-mist'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark variant={variant} />
      <span
        className={`font-display font-medium text-[14px] tracking-[0.32em] uppercase ${wordColor}`}
      >
        TLC
      </span>
      {showTagline && (
        <>
          <span
            className={`hidden md:inline-block w-px h-3 ${ruleColor} mx-1`}
          />
          <span
            className={`hidden md:inline-block text-[10px] tracking-[0.28em] uppercase ${tagColor}`}
          >
            The Longevity Centre
          </span>
        </>
      )}
    </div>
  )
}
