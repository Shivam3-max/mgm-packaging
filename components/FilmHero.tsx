"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FilmScene = dynamic(() => import("./FilmScene"), { ssr: false });

/** Does this browser actually have a usable WebGL context? */
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/* ============================================================================
   The fallback is not an apology. It is a rendered SVG of the same sheet —
   the same navy, the same lime fold, the same specular band. A visitor on a
   six-year-old office desktop in Baddi gets a complete, handsome hero.
   ========================================================================== */
export function FilmFallback() {
  const bands = Array.from({ length: 16 });
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fb-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#02255C" />
          <stop offset="55%" stopColor="#02306F" />
          <stop offset="100%" stopColor="#011B45" />
        </linearGradient>
        <linearGradient id="fb-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D2E8FF" stopOpacity="0.04" />
          <stop offset="46%" stopColor="#ECF7FF" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#D2E8FF" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="fb-vig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#01163A" stopOpacity="0.86" />
          <stop offset="100%" stopColor="#01163A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="700" fill="url(#fb-ground)" />

      {bands.map((_, i) => {
        const p = i / (bands.length - 1);
        const y = 60 + p * 590;
        const amp = 12 + 18 * Math.sin(p * Math.PI);
        const ph = p * 2.6;
        const pts: string[] = [];
        for (let x = -20; x <= 1220; x += 20) {
          const u = x / 1200;
          const yy =
            y +
            Math.sin(u * 5 + ph) * amp +
            Math.sin(u * 11 - ph * 1.3) * amp * 0.32;
          pts.push(`${x},${yy.toFixed(1)}`);
        }
        return (
          <polyline
            key={i}
            points={pts.join(" ")}
            fill="none"
            stroke={i % 4 === 2 ? "#85B53D" : "url(#fb-sheen)"}
            strokeOpacity={i % 4 === 2 ? 0.28 : 1}
            strokeWidth="1.5"
          />
        );
      })}

      <rect width="1200" height="700" fill="url(#fb-vig)" />
    </svg>
  );
}

export default function FilmHero() {
  const [mode, setMode] = useState<"pending" | "gl" | "fallback">("pending");
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);

    // Very low-core devices get the SVG: the shader is cheap, but not free,
    // and a hero that janks is worse than a hero that is still.
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2;

    setMode(hasWebGL() && !weak ? "gl" : "fallback");
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* the SVG always paints first — it is the instant, no-flash ground */}
      <FilmFallback />

      {mode === "gl" && (
        <div
          className="absolute inset-0"
          style={{ animation: "riseIn .9s cubic-bezier(.16,1,.3,1) forwards", opacity: 0 }}
        >
          <FilmScene reduced={reduced} />
        </div>
      )}
    </div>
  );
}
