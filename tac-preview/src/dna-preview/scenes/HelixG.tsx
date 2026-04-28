// Option G — DNA tunnel: camera flies through the inside of a long helix.
// Cursor steers the camera direction; speed is constant + slight ease.
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RUST = '#c46e5d'
const ACCENT = '#f7c8af'

function Tunnel() {
  const group = useRef<THREE.Group>(null!)

  useFrame((state, dt) => {
    if (!group.current) return
    const m = state.mouse
    // Move the group toward camera so it feels like flying through
    group.current.position.z += dt * 1.6
    if (group.current.position.z > 4) group.current.position.z = -4
    // Cursor steers
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -m.y * 0.4, 0.06)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, m.x * 0.4, 0.06)
  })

  // Long helix along Z (depth) — camera at z=0 looking down -Z
  const turns = 22
  const segments = turns * 36
  const radius = 1.6
  const length = 38
  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 * turns
    const z = -t * length
    strand1.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    strand2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, Math.sin(angle + Math.PI) * radius, z))
  }
  const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []
  for (let i = 0; i < strand1.length; i += 5) rungs.push({ a: strand1[i], b: strand2[i] })

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand1), 280, 0.04, 10, false]} />
        <meshStandardMaterial color={RUST} emissive={ACCENT} emissiveIntensity={0.55} />
      </mesh>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand2), 280, 0.04, 10, false]} />
        <meshStandardMaterial color={RUST} emissive={ACCENT} emissiveIntensity={0.55} />
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
            <cylinderGeometry args={[0.014, 0.014, len, 6]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

export function HelixG() {
  return (
    <Canvas
      camera={{ position: [0, 0, 0.1], fov: 70 }}
      dpr={[1, 1.5]}
      style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #2c1714 0%, #050202 80%)' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, -2]} intensity={1.4} color={ACCENT} distance={20} />
      <fog attach="fog" args={['#050202', 4, 20]} />
      <Tunnel />
    </Canvas>
  )
}
