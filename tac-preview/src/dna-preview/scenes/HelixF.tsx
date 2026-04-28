// Option F — Wide particle wave field across the hero.
// Particles arranged in a wide grid forming subtle DNA double-strand pattern.
// Mouse causes a ripple wave through the field.
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 180
const ROWS = 28
const COUNT = COLS * ROWS

function Field() {
  const ref = useRef<THREE.Points>(null!)
  const rest = useRef<Float32Array>(new Float32Array(COUNT * 3))

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const restArr = rest.current
    const c1 = new THREE.Color('#c46e5d')
    const c2 = new THREE.Color('#f1cdb8')

    const width = 14
    const height = 3.6
    for (let i = 0; i < COUNT; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const tx = col / (COLS - 1)
      const ty = row / (ROWS - 1)
      const x = (tx - 0.5) * width
      // Two sine envelopes phase-shifted = looks like double helix flat projection
      const phase = tx * Math.PI * 2 * 8
      const strand = row < ROWS / 2 ? 0 : Math.PI
      const env = Math.sin(phase + strand) * (height * 0.45)
      const y = env + (ty - 0.5) * 0.3
      const z = Math.cos(phase + strand) * 0.6
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      restArr[i * 3] = x
      restArr[i * 3 + 1] = y
      restArr[i * 3 + 2] = z
      const mix = c1.clone().lerp(c2, Math.random())
      colors[i * 3] = mix.r
      colors[i * 3 + 1] = mix.g
      colors[i * 3 + 2] = mix.b
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return { geometry: geo, material: mat }
  }, [])

  useFrame((state, dt) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const m = state.mouse
    const cursor = new THREE.Vector3(m.x * 7, m.y * 1.8, 0)
    const restArr = rest.current
    const posArr = (ref.current.geometry.attributes.position as THREE.BufferAttribute)
      .array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const rx = restArr[ix]
      const ry = restArr[ix + 1]
      const rz = restArr[ix + 2]
      // ambient breathing
      const breath = Math.sin(t * 1.4 + rx * 0.6) * 0.06
      // cursor ripple
      const dx = rx - cursor.x
      const dy = ry - cursor.y
      const d = Math.sqrt(dx * dx + dy * dy)
      const ripple = Math.exp(-d * 0.6) * Math.sin(d * 3 - t * 4) * 0.55
      const targetY = ry + breath + ripple
      const targetZ = rz + ripple * 0.4
      posArr[ix] = rx
      posArr[ix + 1] += (targetY - posArr[ix + 1]) * 0.18
      posArr[ix + 2] += (targetZ - posArr[ix + 2]) * 0.18
    }
    ;(ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    ref.current.rotation.x = -0.05
    // small drift
    ref.current.position.y = Math.sin(t * 0.4) * 0.05
    ref.current.dispatchEvent({ type: 'tick' } as any)
    void dt
  })

  return <points ref={ref} geometry={geometry} material={material} />
}

export function HelixF() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1c1110 0%, #050303 80%)' }}
    >
      <ambientLight intensity={0.5} />
      <Field />
    </Canvas>
  )
}
