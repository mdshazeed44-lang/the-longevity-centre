import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// ---------------- Helix geometry ----------------
function buildStrand(turns: number, points: number, radius: number, height: number, phaseOffset: number) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= points; i++) {
    const t = i / points
    const angle = t * Math.PI * 2 * turns + phaseOffset
    const y = (t - 0.5) * height
    pts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5)
}

function HelixCore({
  scrollRef,
  pointer,
}: {
  scrollRef: React.MutableRefObject<number>
  pointer: React.MutableRefObject<{ x: number; y: number }>
}) {
  const group = useRef<THREE.Group>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const turns = 4
  const radius = 1.55
  const height = 12
  const basePairs = isMobile ? 36 : 64

  const curveA = useMemo(() => buildStrand(turns, 256, radius, height, 0), [])
  const curveB = useMemo(() => buildStrand(turns, 256, radius, height, Math.PI), [])

  const pairs = useMemo(() => {
    const arr: { x1: number; z1: number; x2: number; z2: number; y: number; angle: number }[] = []
    for (let i = 0; i < basePairs; i++) {
      const t = i / (basePairs - 1)
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      arr.push({ x1, z1, x2, z2, y, angle })
    }
    return arr
  }, [basePairs])

  useFrame((state, dt) => {
    if (!group.current) return
    const scroll = scrollRef.current

    if (reduce) {
      group.current.rotation.y += dt * 0.15
      return
    }

    // Continuous rotation + scroll boost
    group.current.rotation.y += dt * (0.35 + scroll * 1.2)

    // Pointer-driven tilt — damped lerp toward target
    const targetX = pointer.current.y * 0.35
    const targetZ = -pointer.current.x * 0.25
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 3)
    group.current.rotation.z += (targetZ - group.current.rotation.z) * Math.min(1, dt * 3)

    // Vertical breathing + scroll drift
    const breathe = Math.sin(state.clock.elapsedTime * 0.55) * 0.25
    group.current.position.y = breathe + scroll * 5
  })

  return (
    <group ref={group}>
      {/* Strand A — polished rust copper */}
      <mesh>
        <tubeGeometry args={[curveA, 600, 0.085, 16, false]} />
        <meshPhysicalMaterial
          color="#945455"
          metalness={1}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Strand B — warm Paarl orange-rust */}
      <mesh>
        <tubeGeometry args={[curveB, 600, 0.085, 16, false]} />
        <meshPhysicalMaterial
          color="#AB542E"
          metalness={1}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Base-pair beads on each strand + connecting rungs */}
      {pairs.map((p, i) => (
        <group key={i}>
          <mesh position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshPhysicalMaterial
              color="#EEE6DB"
              metalness={0.6}
              roughness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.6}
              emissive="#2a1410"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshPhysicalMaterial
              color="#EEE6DB"
              metalness={0.6}
              roughness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.6}
              emissive="#2a1410"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh
            position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]}
            rotation={[0, -p.angle, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.022, 0.022, radius * 2, 10]} />
            <meshPhysicalMaterial
              color="#A19B7B"
              metalness={0.7}
              roughness={0.4}
              envMapIntensity={1.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ---------------- Floating gold ambient sparkles ----------------
function Sparkles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 12
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.05
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += dt * 0.12 * (0.5 + Math.sin(i) * 0.5)
      if (arr[i * 3 + 1] > 6.5) arr[i * 3 + 1] = -6.5
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        color="#EEE6DB"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ---------------- Pointer tracker ----------------
function PointerTracker({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { mouse } = useThree()
  useFrame(() => {
    pointer.current.x = mouse.x
    pointer.current.y = mouse.y
  })
  return null
}

// ---------------- Public DNA component ----------------
export function DnaHelix({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const pointer = useRef({ x: 0, y: 0 })
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      style={{ background: 'transparent', pointerEvents: 'auto' }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      {/* Studio lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 6, 6]} intensity={1.4} color="#FFFFFF" castShadow={false} />
      <directionalLight position={[-5, -2, 4]} intensity={0.85} color="#EEE6DB" />
      <directionalLight position={[0, -6, -4]} intensity={0.45} color="#945455" />
      <pointLight position={[3, 0, 5]} intensity={0.9} color="#FAEFE0" distance={20} />

      <Suspense fallback={null}>
        <Environment preset="apartment" />
      </Suspense>

      {/* Floating element wraps helix for subtle drift */}
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <HelixCore scrollRef={scrollRef} pointer={pointer} />
      </Float>

      <Sparkles count={isMobile ? 30 : 70} />
      <PointerTracker pointer={pointer} />

      {/* Optional drag-to-rotate (low damping) */}
      {!reduce && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          rotateSpeed={0.4}
          dampingFactor={0.08}
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
        />
      )}

      <EffectComposer>
        <Bloom intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.35} mipmapBlur />
        <ChromaticAberration
          offset={[0.0006, 0.0008] as unknown as [number, number]}
          radialModulation={false}
          modulationOffset={0}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  )
}

// ---------------- CTA band particle field (re-exported) ----------------
function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  useFrame((_, dt) => {
    if (!ref.current || reduce) return
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += dt * 0.32
      if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        color="#B27A7B"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  )
}
