// Option A — Frosted DNA double-helix with mouse parallax tilt
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RUST = '#b65956'
const GLOW = '#e89488'

function Helix() {
  const group = useRef<THREE.Group>(null!)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, dt) => {
    const { mouse } = state
    target.current.x = mouse.x * 0.4
    target.current.y = mouse.y * 0.3
    if (!group.current) return
    group.current.rotation.y += dt * 0.18
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target.current.y,
      0.05
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      target.current.x * 0.5,
      0.05
    )
  })

  // Build helix points
  const turns = 5
  const pointsPerTurn = 60
  const total = turns * pointsPerTurn
  const radius = 0.9
  const height = 6
  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []

  for (let i = 0; i < total; i++) {
    const t = i / total
    const angle = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height
    const a = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
    const b = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius)
    strand1.push(a)
    strand2.push(b)
    if (i % 6 === 0) rungs.push({ a, b })
  }

  return (
    <group ref={group}>
      {/* Strand 1 — tube */}
      <mesh>
        <tubeGeometry
          args={[new THREE.CatmullRomCurve3(strand1), 240, 0.045, 12, false]}
        />
        <meshPhysicalMaterial
          color={RUST}
          emissive={GLOW}
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.3}
          transmission={0.2}
          thickness={0.4}
        />
      </mesh>

      {/* Strand 2 */}
      <mesh>
        <tubeGeometry
          args={[new THREE.CatmullRomCurve3(strand2), 240, 0.045, 12, false]}
        />
        <meshPhysicalMaterial
          color={RUST}
          emissive={GLOW}
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.3}
          transmission={0.2}
          thickness={0.4}
        />
      </mesh>

      {/* Rungs */}
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
            <meshStandardMaterial color={RUST} emissive={GLOW} emissiveIntensity={0.25} />
          </mesh>
        )
      })}
    </group>
  )
}

export function HelixA() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 35 }}
      dpr={[1, 1.5]}
      style={{ background: 'radial-gradient(circle at 50% 50%, #2a1f1d 0%, #0d0a0a 70%)' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -3, 2]} intensity={0.5} color={GLOW} />
      <Helix />
    </Canvas>
  )
}
