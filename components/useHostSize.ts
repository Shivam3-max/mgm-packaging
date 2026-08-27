"use client";

import { useEffect, useState, type RefObject } from "react";

/* ============================================================================
   R3F measures its own container and will not mount the scene until that
   measurement is non-zero. When the Canvas arrives through a dynamic import
   that first observation can be missed, and since the scene never mounts,
   nothing inside the Canvas can repair it — a deadlock that leaves the drawing
   buffer stuck at its 300×150 default.

   So we do not ask R3F to measure. We measure the host ourselves and hand the
   Canvas explicit pixel dimensions, which removes the ambiguity entirely.
   ========================================================================== */

export default function useHostSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w > 0 && h > 0) {
        setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };

    apply();
    const raf = requestAnimationFrame(apply);
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [ref]);

  return size;
}
