import { useEffect, useRef } from "react";

/**
 * Tracks pointer position within the attached element and exposes it as the
 * CSS custom properties --parallax-x / --parallax-y, which the
 * `.parallax-layer` / `.parallax-layer-reverse` utility classes (see
 * index.css) read to produce a subtle depth effect. Pure CSS transforms —
 * no animation library required. Disabled on touch/mobile and when the user
 * prefers reduced motion.
 */
export function usePointerParallax(strength = 14) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.matchMedia("(max-width: 1023px)").matches) return undefined;

    let frame = null;

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--parallax-x", `${(x * strength).toFixed(2)}px`);
        node.style.setProperty("--parallax-y", `${(y * strength).toFixed(2)}px`);
      });
    };

    const handleLeave = () => {
      node.style.setProperty("--parallax-x", "0px");
      node.style.setProperty("--parallax-y", "0px");
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}
