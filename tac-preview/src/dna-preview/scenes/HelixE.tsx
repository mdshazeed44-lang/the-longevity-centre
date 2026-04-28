// Option E — Wide horizontal DNA strand laying across the hero.
// Slowly drifts left-to-right; cursor tilts the strand and shifts the camera.
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RUST = '#c46e5d'
const ACCENT = '#ecbba6'

function HorizontalHelix() {
  const group = useRef<THREE.Group>(null!)
  const drift = useRef(0)

  useFrame((state, dt) => {
    if (!group.current) return
    drift.current += dt * 0.2
    // Slow drift along X (gives the "river" feel)
    group.current.position.x = Math.sin(drift.current * 0.5) * 0.4
    // Cursor parallax
    const m = state.mouse
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -m.y * 0.25,
      0.05
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      m.x * 0.18,
      0.05
    )
    // Slow z-axis rotation (since helix is laying horizontally)
    group.current.rotation.z += dt * 0.15
  })

  // Build helix laying along X axis (long horizontal)
  const turns = 9
  const segments = turns * 50
  const radius = 0.55
  const length = 12
  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 * turns
    const x = (t - 0.5) * length
    strand1.push(new THREE.Vector3(x, Math.cos(angle) * radius, Math.sin(angle) * radius))
    strand2.push(new THREE.Vector3(x, Math.cos(angle + Math.PI) * radius, Math.sin(angle + Math.PI) * radius))
  }
  const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []
  for (let i = 0; i < strand1.length; i += 6) {
    rungs.push({ a: strand1[i], b: strand2[i] })
  }

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand1), 280, 0.05, 12, false]} />
        <meshPhysicalMaterial
          color={RUST}
          emissive={ACCENT}
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand2), 280, 0.05, 12, false]} />
        <meshPhysicalMaterial
          color={RUST}
          emissive={ACCENT}
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
      {rungs.map((r, i) => {
        const dir = new THREE.Vector3().subVectors(r.b, r.a)
        const mid = new THREE.Vector3().addVectors(r.a, r.b).multiplyScalar(0.5)
        const len = dir.length()
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        )
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.018, 0.018, len, 8]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} />
          </mesh>
        )
      })}
    </group>
  )
}

export function HelixE() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #2a1815 0%, #060303 80%)' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 4, 5]} intensity={1.2} />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color={ACCENT} />
      <HorizontalHelix />
    </Canvas>
  )
}
