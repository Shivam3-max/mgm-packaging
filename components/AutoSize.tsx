"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/* ============================================================================
   R3F measures its container on mount. When the Canvas arrives via a dynamic
   import — as all three of our scenes do — that measurement can land before
   the container has settled, leaving the drawing buffer at its 300×150
   default. This watches the real container and keeps the buffer honest.
   ========================================================================== */

export default function AutoSize() {
  const gl = useThree((s) => s.gl);
  const setSize = useThree((s) => s.setSize);

  useEffect(() => {
    const canvas = gl.domElement;
    const el = canvas.parentElement;
    if (!el) return;

    let last = { w: 0, h: 0 };

    const apply = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      if (Math.abs(width - last.w) < 1 && Math.abs(height - last.h) < 1) return;
      last = { w: width, h: height };

      // R3F's own store, so its viewport/raycaster stay in step
      setSize(width, height);
      // and the renderer directly, in case the store update is debounced away.
      // updateStyle is left on so three.js writes the canvas CSS itself —
      // reaching in and setting element.style here is what the React compiler
      // (rightly) objects to.
      gl.setSize(width, height);
      // the camera aspect and projection matrix are R3F's job — its own
      // setSize above already recomputes them
    };

    apply();
    const raf = requestAnimationFrame(apply);
    const t = window.setTimeout(apply, 180);

    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [gl, setSize]);

  return null;
}
