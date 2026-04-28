import { Canvas, useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { reduceMotion } from '../lib/motion'

const CFG = {
  turns: 4.5,
  height: 9,
  radius: 1.2,
  segments: 90,
  rungs: 22,
  strandTubeRadius: 0.045,
  strandRadial: 6,
  rungRadius: 0.018,
  nucleotideRadius: 0.085,
}

const COLORS = {
  strandA: '#945455',
  strandB: '#3A3833',
  rung: '#7A4344',
  nucleoA: '#B27A7B',
  nucleoB: '#3A3833',
}

function makeHelixGeom(phase: number) {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= CFG.segments; i++) {
    const t = i / CFG.segments
    const angle = CFG.turns * Math.PI * 2 * t + phase
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * CFG.radius,
        (t - 0.5) * CFG.height,
        Math.sin(angle) * CFG.radius
      )
    )
  }
  const curve = new THREE.CatmullRomCurve3(points)
  return new THREE.TubeGeometry(
    curve,
    CFG.segments,
    CFG.strandTubeRadius,
    CFG.strandRadial,
    false
  )
}

function RungInstances({
  positions,
}: {
  positions: { mid: THREE.Vector3; quat: THREE.Quaternion; len: number }[]
}) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const m = new THREE.Matrix4()
    const scale = new THREE.Vector3()
    positions.forEach((p, i) => {
      scale.set(1, p.len, 1)
      m.compose(p.mid, p.quat, scale)
      ref.current!.setMatrixAt(i, m)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [positions])

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, positions.length]}
      frustumCulled={false}
    >
      <cylinderGeometry args={[CFG.rungRadius, CFG.rungRadius, 1, 6]} />
      <meshLambertMaterial color={COLORS.rung} transparent opacity={0.7} />
    </instancedMesh>
  )
}

function NucleoInstances({
  positions,
  color,
}: {
  positions: THREE.Vector3[]
  color: string
}) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const m = new THREE.Matrix4()
    positions.forEach((p, i) => {
      m.makeTranslation(p.x, p.y, p.z)
      ref.current!.setMatrixAt(i, m)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [positions])

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, positions.length]}
      frustumCulled={false}
    >
      <sphereGeometry args={[CFG.nucleotideRadius, 12, 12]} />
      <meshLambertMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.18}
      />
    </instancedMesh>
  )
}

function HelixGroup() {
  const ref = useRef<THREE.Group>(null)
  const reduce = reduceMotion()

  useFrame((_, delta) => {
    if (!ref.current || reduce) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.x =
      Math.sin(performance.now() * 0.00018) * 0.05
  })

  const geomA = useMemo(() => makeHelixGeom(0), [])
  const geomB = useMemo(() => makeHelixGeom(Math.PI), [])

  const { rungs, strandAPoints, strandBPoints } = useMemo(() => {
    const rungs: {
      mid: THREE.Vector3
      quat: THREE.Quaternion
      len: number
    }[] = []
    const strandAPoints: THREE.Vector3[] = []
    const strandBPoints: THREE.Vector3[] = []
    const yUp = new THREE.Vector3(0, 1, 0)
    for (let i = 0; i < CFG.rungs; i++) {
      const t = (i + 0.5) / CFG.rungs
      const angle = CFG.turns * Math.PI * 2 * t
      const r = CFG.radius
      const y = (t - 0.5) * CFG.height
      const a = new THREE.Vector3(
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r
      )
      const b = new THREE.Vector3(
        Math.cos(angle + Math.PI) * r,
        y,
        Math.sin(angle + Math.PI) * r
      )
      const mid = a.clone().add(b).multiplyScalar(0.5)
      const dir = b.clone().sub(a).normalize()
      const quat = new THREE.Quaternion().setFromUnitVectors(yUp, dir)
      rungs.push({ mid, quat, len: a.distanceTo(b) })
      strandAPoints.push(a)
      strandBPoints.push(b)
    }
    return { rungs, strandAPoints, strandBPoints }
  }, [])

  return (
    <group ref={ref}>
      <mesh geometry={geomA}>
        <meshLambertMaterial color={COLORS.strandA} />
      </mesh>
      <mesh geometry={geomB}>
        <meshLambertMaterial color={COLORS.strandB} />
      </mesh>
      <RungInstances positions={rungs} />
      <NucleoInstances positions={strandAPoints} color={COLORS.nucleoA} />
      <NucleoInstances positions={strandBPoints} color={COLORS.nucleoB} />
    </group>
  )
}

export function HeroDnaScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.6], fov: 35 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 2, 4]} intensity={0.95} color="#FFFFFF" />
      <directionalLight position={[-3, -1, 2]} intensity={0.35} color="#FAF6EF" />
      <HelixGroup />
    </Canvas>
  )
}
