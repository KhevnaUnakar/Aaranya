import { useEffect, useState } from "react";

// Kept in sync with Tailwind's `lg` breakpoint (1024px) used elsewhere in the
// app (e.g. the Navbar's mobile menu), so "mobile" means the same thing
// everywhere in the codebase.
const MOBILE_QUERY = "(max-width: 1023px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function computeState() {
  return {
    isMobile: window.matchMedia(MOBILE_QUERY).matches,
    prefersReducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    supportsWebGL: detectWebGL(),
  };
}

/**
 * Reports whether the current device/browser should receive the heavier 3D
 * experience. Computed synchronously on first render (no flash of the wrong
 * variant), then kept live via matchMedia listeners for viewport/setting
 * changes (e.g. resizing past the breakpoint, toggling OS reduced-motion).
 */
export function useDeviceCapability() {
  const [state, setState] = useState(computeState);

  useEffect(() => {
    const mediaMobile = window.matchMedia(MOBILE_QUERY);
    const mediaReduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setState(computeState());

    mediaMobile.addEventListener("change", update);
    mediaReduced.addEventListener("change", update);
    return () => {
      mediaMobile.removeEventListener("change", update);
      mediaReduced.removeEventListener("change", update);
    };
  }, []);

  return state;
}
