// Option B — Particle DNA cloud with cursor gravity
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 4000

function ParticleHelix() {
  const ref = useRef<THREE.Points>(null!)
  const rest = useRef<Float32Array>(new Float32Array(COUNT * 3))
  const pos = useRef<Float32Array>(new Float32Array(COUNT * 3))

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const colors = new Float32Array(COUNT * 3)
    const restArr = rest.current
    const posArr = pos.current

    const turns = 6
    const radius = 1.0
    const height = 6.5
    const c1 = new THREE.Color('#c46e5d')
    const c2 = new THREE.Color('#e9b8a4')
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT
      const angle = t * Math.PI * 2 * turns
      const strand = i % 2 === 0 ? 0 : Math.PI
      const r = radius + (Math.random() - 0.5) * 0.04
      const x = Math.cos(angle + strand) * r
      const y = (t - 0.5) * height
      const z = Math.sin(angle + strand) * r
      restArr[i * 3] = x
      restArr[i * 3 + 1] = y
      restArr[i * 3 + 2] = z
      posArr[i * 3] = x
      posArr[i * 3 + 1] = y
      posArr[i * 3 + 2] = z
      const mix = c1.clone().lerp(c2, Math.random())
      colors[i * 3] = mix.r
      colors[i * 3 + 1] = mix.g
      colors[i * 3 + 2] = mix.b
    }
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return { geometry: geo, material: mat }
  }, [])

  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.12
    const m = state.mouse
    // Project mouse to world space at z=0 plane
    const cursor = new THREE.Vector3(m.x * 2.2, m.y * 2.2, 0)
    const restArr = rest.current
    const posArr = (ref.current.geometry.attributes.position as THREE.BufferAttribute)
      .array as Float32Array
    const inv = ref.current.matrixWorld.clone().invert()
    cursor.applyMatrix4(inv)
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const rx = restArr[ix]
      const ry = restArr[ix + 1]
      const rz = restArr[ix + 2]
      const dx = rx - cursor.x
      const dy = ry - cursor.y
      const dz = rz - cursor.z
      const d2 = dx * dx + dy * dy + dz * dz + 0.001
      const force = Math.min(0.6, 0.3 / d2)
      const tx = rx + (dx / Math.sqrt(d2)) * force
      const ty = ry + (dy / Math.sqrt(d2)) * force
      const tz = rz + (dz / Math.sqrt(d2)) * force
      posArr[ix] += (tx - posArr[ix]) * 0.08
      posArr[ix + 1] += (ty - posArr[ix + 1]) * 0.08
      posArr[ix + 2] += (tz - posArr[ix + 2]) * 0.08
    }
    ;(ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
  })

  return <points ref={ref} geometry={geometry} material={material} />
}

export function HelixB() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 35 }}
      dpr={[1, 1.5]}
      style={{ background: 'radial-gradient(circle at 50% 50%, #1a0e0c 0%, #050303 75%)' }}
    >
      <ambientLight intensity={0.5} />
      <ParticleHelix />
    </Canvas>
  )
}
