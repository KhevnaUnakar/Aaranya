import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * A faceted, glass-like gem built from primitive geometry (no external
 * model files to fetch, keeping this fully self-contained and offline-safe).
 * Motion is intentionally slow and calm:
 *  - a gentle vertical bob (sine wave)
 *  - a slow constant spin
 *  - a soft, heavily-damped tilt toward the cursor, so it drifts rather
 *    than snaps toward the pointer.
 */
export default function CrystalMesh({ color = "#8F6C96", accent = "#C9A876", scale = 1 }) {
  const groupRef = useRef(null);
  const gemRef = useRef(null);
  const shardRef = useRef(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(elapsed * 0.6) * 0.15;
    }

    if (gemRef.current) {
      gemRef.current.rotation.y += delta * 0.16;

      const targetTiltX = state.pointer.y * 0.16;
      const targetTiltZ = -state.pointer.x * 0.16;
      gemRef.current.rotation.x += (targetTiltX - gemRef.current.rotation.x) * 0.035;
      gemRef.current.rotation.z += (targetTiltZ - gemRef.current.rotation.z) * 0.035;
    }

    if (shardRef.current) {
      shardRef.current.rotation.y -= delta * 0.22;
      shardRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh ref={gemRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.05}
          transmission={0.55}
          thickness={1.4}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={0.25}
          iridescenceIOR={1.3}
          attenuationColor={accent}
          attenuationDistance={0.6}
        />
      </mesh>

      {/* A small companion shard, orbiting independently for a touch of extra depth */}
      <mesh ref={shardRef} position={[0.95, -0.55, -0.35]} scale={0.32}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={accent}
          roughness={0.2}
          metalness={0.08}
          transmission={0.4}
          thickness={1}
          ior={1.4}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </group>
  );
}
