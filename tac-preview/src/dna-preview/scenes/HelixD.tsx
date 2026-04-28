// Option D — Scroll-driven unwinding DNA. In the preview cell, we simulate
// scroll using vertical mouse position so user can feel the effect.
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RUST = '#b85a4d'
const ACCENT = '#f1b89e'

function UnwindingHelix({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_state, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.18
  })

  // progress 0 → tightly wound (10 turns), progress 1 → unwound (1.5 turns)
  const turns = THREE.MathUtils.lerp(10, 1.5, progress)
  const radius = THREE.MathUtils.lerp(0.45, 1.4, progress)
  const height = THREE.MathUtils.lerp(3, 7, progress)

  const segments = 320
  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height
    strand1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
    strand2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius))
  }

  const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []
  for (let i = 0; i < strand1.length; i += 8) {
    rungs.push({ a: strand1[i], b: strand2[i] })
  }

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand1), 240, 0.05, 12, false]} />
        <meshStandardMaterial color={RUST} emissive={ACCENT} emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand2), 240, 0.05, 12, false]} />
        <meshStandardMaterial color={RUST} emissive={ACCENT} emissiveIntensity={0.3} />
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
            <cylinderGeometry args={[0.02, 0.02, len, 8]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

export function HelixD() {
  const [progress, setProgress] = useState(0.4)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Drive progress from vertical mouse position inside this preview cell
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const y = (e.clientY - r.top) / r.height
      setProgress(Math.max(0, Math.min(1, y)))
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 35 }}
        dpr={[1, 1.5]}
        style={{ background: 'radial-gradient(circle at 50% 50%, #1f1411 0%, #080503 75%)' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.0} />
        <directionalLight position={[-3, -2, 2]} intensity={0.4} color={ACCENT} />
        <UnwindingHelix progress={progress} />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-[10px] text-white/55 tracking-[0.2em] uppercase font-medium">
        ← move cursor up/down inside cell to unwind
      </div>
    </div>
  )
}
