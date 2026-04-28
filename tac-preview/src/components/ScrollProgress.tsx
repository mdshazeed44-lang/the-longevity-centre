import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'science', label: 'Science' },
  { id: 'results', label: 'Outcomes' },
  { id: 'programs', label: 'Programs' },
  { id: 'method', label: 'Method' },
  { id: 'editorial', label: 'Diagnostics' },
  { id: 'clinics', label: 'Clinics' },
  { id: 'cta', label: 'Begin' },
]

export function ScrollProgress() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[]
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.35) {
            setActive(e.target.id)
          }
        })
      },
      { threshold: [0.35, 0.6] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      aria-hidden="true"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor="hover"
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className={`text-[10px] tracking-[0.25em] uppercase transition-all duration-500 ${
                isActive
                  ? 'opacity-100 translate-x-0 text-ink'
                  : 'opacity-0 translate-x-2 text-stone group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive ? 'w-8 bg-rust' : 'w-4 bg-mist group-hover:bg-stone'
              }`}
            />
          </a>
        )
      })}
    </div>
  )
}
