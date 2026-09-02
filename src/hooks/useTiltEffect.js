import { useEffect, useRef } from "react";

/**
 * Applies a gentle perspective tilt to an element as the cursor moves over
 * it — a cheap CSS 3D transform rather than a WebGL effect, used to add a
 * touch of depth to card surfaces that sit alongside (or instead of) the
 * Three.js crystal. Disabled on touch/mobile and reduced-motion.
 */
export function useTiltEffect({ max = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.matchMedia("(max-width: 1023px)").matches) return undefined;

    let frame = null;

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });
    };

    const reset = () => {
      node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", reset);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}
