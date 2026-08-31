"use client";

import { useEffect, useState, type RefObject } from "react";

/* ============================================================================
   Is this element anywhere near the viewport right now?

   The WebGL scenes render a continuous animation loop. Left unchecked that
   loop keeps running while the canvas is scrolled far out of view, burning
   battery for nothing. Feeding this into a Canvas `frameloop` prop parks the
   loop when the scene is off-screen and resumes it when it comes back.
   ========================================================================== */

export default function useInView(
  ref: RefObject<HTMLElement | null>,
  { rootMargin = "240px" }: { rootMargin?: string } = {}
) {
  // Default to visible so first paint always renders, even if the observer
  // is unavailable or slow to fire.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
