import { lazy, Suspense } from "react";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import CanvasErrorBoundary from "../three/CanvasErrorBoundary.jsx";
import { useDeviceCapability } from "../../hooks/useDeviceCapability.js";

// Dynamically imported so the three.js / R3F bundle is only ever downloaded
// by visitors who will actually see it (desktop, motion-friendly, WebGL
// capable) — everyone else never triggers this import at all.
const CrystalCanvas = lazy(() => import("../three/CrystalCanvas.jsx"));

export default function HeroCrystalVisual({ className = "", label = "hero-main" }) {
  const { isMobile, prefersReducedMotion, supportsWebGL } = useDeviceCapability();
  const shouldRender3D = !isMobile && !prefersReducedMotion && supportsWebGL;
  const fallback = <ImagePlaceholder label={label} className={className} iconSize={44} />;

  if (!shouldRender3D) {
    return fallback;
  }

  return (
    <div className={className}>
      <CanvasErrorBoundary fallback={fallback}>
        <Suspense fallback={<ImagePlaceholder label={label} className="h-full w-full" iconSize={44} />}>
          <CrystalCanvas color="#8F6C96" accent="#C9A876" />
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}
