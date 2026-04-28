// Option C — Liquid metal DNA with bloom + slow follow-cursor turn
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function LiquidHelix() {
  const group = useRef<THREE.Group>(null!)
  const target = useRef({ x: 0 })

  useFrame((state, dt) => {
    if (!group.current) return
    target.current.x = state.mouse.x * 0.6
    group.current.rotation.y += dt * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.mouse.y * 0.25,
      0.04
    )
  })

  const turns = 5
  const segments = turns * 80
  const radius = 0.85
  const height = 6
  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height
    strand1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
    strand2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius))
  }

  const baseRungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = []
  for (let i = 0; i < strand1.length; i += 8) {
    baseRungs.push({ a: strand1[i], b: strand2[i] })
  }

  return (
    <group ref={group}>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand1), 280, 0.07, 16, false]} />
        <meshPhysicalMaterial
          color="#a35a4a"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(strand2), 280, 0.07, 16, false]} />
        <meshPhysicalMaterial
          color="#a35a4a"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>
      {baseRungs.map((r, i) => {
        const dir = new THREE.Vector3().subVectors(r.b, r.a)
        const mid = new THREE.Vector3().addVectors(r.a, r.b).multiplyScalar(0.5)
        const len = dir.length()
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        )
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.025, 0.025, len, 12]} />
            <meshPhysicalMaterial
              color="#c97257"
              metalness={1}
              roughness={0.1}
              envMapIntensity={1.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function HelixC() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: 'radial-gradient(circle at 30% 30%, #2c1614 0%, #0a0606 80%)' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Environment preset="warehouse" />
      <LiquidHelix />
      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.4} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
