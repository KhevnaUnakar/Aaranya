import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CrystalMesh from "./CrystalMesh.jsx";

/**
 * Sets up a small, cheap WebGL scene for the hero crystal: capped pixel
 * ratio, no shadow maps, no post-processing, and only procedural lighting
 * (no HDRI/environment textures to download). This keeps the effect subtle
 * and light on the GPU rather than a showcase render.
 */
export default function CrystalCanvas({ color, accent, scale = 1.4 }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} color="#F3EDE3" />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#FFF3DD" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#C6A8CB" />
      <Suspense fallback={null}>
        <CrystalMesh color={color} accent={accent} scale={scale} />
      </Suspense>
    </Canvas>
  );
}
