import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Float, OrbitControls } from "@react-three/drei";

function Gem({ position, scale, color, speed = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.18}
          metalness={0.05}
          transmission={0.5}
          thickness={1.2}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.2}
          iridescence={0.2}
          iridescenceIOR={1.3}
        />
      </mesh>
    </Float>
  );
}

/**
 * A small cluster of three gems the visitor can drag to rotate (via
 * OrbitControls, zoom/pan disabled so it can't be knocked off-frame), with
 * a slow auto-rotation when left alone. Each gem also floats independently
 * for a bit of ambient life. No textures or HDRI are loaded — lighting is
 * procedural, keeping this cheap enough to sit right on the page.
 */
export default function CrystalClusterCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.75} color="#F3EDE3" />
      <directionalLight position={[3, 4, 3]} intensity={1.1} color="#FFF3DD" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#AEBB99" />
      <Suspense fallback={null}>
        <Gem position={[-0.9, 0.2, 0]} scale={0.85} color="#8F6C96" speed={1} />
        <Gem position={[0.75, -0.3, -0.4]} scale={0.6} color="#C9A876" speed={1.3} />
        <Gem position={[0.05, 0.65, -0.6]} scale={0.45} color="#6E7B5C" speed={0.9} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
