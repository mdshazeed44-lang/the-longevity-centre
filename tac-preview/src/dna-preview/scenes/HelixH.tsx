// Option H — Liquid DNA wave undulating across hero like a river.
// Cursor distorts the wave; the strand morphs in shape.
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const RUST = '#a85a4a'
const ACCENT = '#ed9c7c'

function LiquidWave() {
  const group = useRef<THREE.Group>(null!)
  const tubeARef = useRef<THREE.Mesh>(null!)
  const tubeBRef = useRef<THREE.Mesh>(null!)
  const cursor = useRef(new THREE.Vector2(0, 0))

  const turns = 5
  const segments = turns * 70
  const length = 13
  const radius = 0.55

  const baseT = useMemo(() => {
    const arr = new Float32Array(segments)
    for (let i = 0; i < segments; i++) arr[i] = i / segments
    return arr
  }, [])

  function buildPoints(time: number, mx: number, my: number) {
    const a: THREE.Vector3[] = []
    const b: THREE.Vector3[] = []
    for (let i = 0; i < segments; i++) {
      const t = baseT[i]
      const x = (t - 0.5) * length
      const phase = t * Math.PI * 2 * turns + time * 0.7
      // Wave envelope along x — bigger toward middle
      const envelope = Math.cos((t - 0.5) * Math.PI) * 0.65 + 0.4
      // Cursor distortion — gaussian centered at mouseX
      const dist = Math.exp(-Math.pow((x - mx * 6.5) / 1.8, 2))
      const lift = my * 1.4 * dist
      const wobble = Math.sin(time * 1.2 + t * 6) * 0.05
      const cy = Math.sin(phase) * radius * envelope + lift + wobble
      const cz = Math.cos(phase) * radius * envelope
      a.push(new THREE.Vector3(x, cy, cz))
      b.push(new THREE.Vector3(x, -cy, -cz))
    }
    return { a, b }
  }

  useFrame((state, dt) => {
    const m = state.mouse
    cursor.current.lerp(new THREE.Vector2(m.x, m.y), 0.08)
    const { a, b } = buildPoints(state.clock.elapsedTime, cursor.current.x, cursor.current.y)
    const curveA = new THREE.CatmullRomCurve3(a)
    const curveB = new THREE.CatmullRomCurve3(b)
    if (tubeARef.current) {
      tubeARef.current.geometry.dispose()
      tubeARef.current.geometry = new THREE.TubeGeometry(curveA, 280, 0.06, 14, false)
    }
    if (tubeBRef.current) {
      tubeBRef.current.geometry.dispose()
      tubeBRef.current.geometry = new THREE.TubeGeometry(curveB, 280, 0.06, 14, false)
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, m.y * 0.12, 0.05)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, m.x * 0.12, 0.05)
    }
    void dt
  })

  return (
    <group ref={group}>
      <mesh ref={tubeARef}>
        <tubeGeometry />
        <meshPhysicalMaterial
          color={RUST}
          emissive={ACCENT}
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh ref={tubeBRef}>
        <tubeGeometry />
        <meshPhysicalMaterial
          color={RUST}
          emissive={ACCENT}
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  )
}

export function HelixH() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1f1311 0%, #050303 80%)' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <Environment preset="warehouse" />
      <LiquidWave />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.45} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
