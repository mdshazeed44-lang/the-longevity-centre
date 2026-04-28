export const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  emphasized: [0.22, 1, 0.36, 1] as const,
}

export const gsapEase = {
  out: 'power4.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
}
