import { lazy, Suspense } from "react";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import CanvasErrorBoundary from "../three/CanvasErrorBoundary.jsx";
import { useDeviceCapability } from "../../hooks/useDeviceCapability.js";

const CrystalClusterCanvas = lazy(() => import("../three/CrystalClusterCanvas.jsx"));

export default function CrystalClusterVisual({ className = "" }) {
  const { isMobile, prefersReducedMotion, supportsWebGL } = useDeviceCapability();
  const shouldRender3D = !isMobile && !prefersReducedMotion && supportsWebGL;
  const fallback = <ImagePlaceholder label="crystal-cluster" className={className} iconSize={40} />;

  if (!shouldRender3D) {
    return fallback;
  }

  return (
    <div className={`relative ${className}`}>
      <CanvasErrorBoundary fallback={fallback}>
        <Suspense fallback={<ImagePlaceholder label="crystal-cluster" className="h-full w-full" iconSize={40} />}>
          <CrystalClusterCanvas />
        </Suspense>
      </CanvasErrorBoundary>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint/50">
        Drag to explore
      </p>
    </div>
  );
}
