"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BagScene = dynamic(() => import("./BagScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

const TINTS: Record<string, { tint: string; opaque: number; gusset: number }> = {
  plain: { tint: "#DCE6F2", opaque: 0, gusset: 0 },
  printed: { tint: "#E7EDF6", opaque: 0.15, gusset: 0 },
  "zip-lock": { tint: "#DCE6F2", opaque: 0, gusset: 0 },
  gusset: { tint: "#DCE6F2", opaque: 0, gusset: 0.55 },
  "custom-sizes": { tint: "#DCE6F2", opaque: 0.05, gusset: 0.2 },
  coloured: { tint: "#2F5FA8", opaque: 0.9, gusset: 0 },
};

export default function BagAnatomy({
  slug,
  image,
  name,
  anatomy,
}: {
  slug: string;
  image: string;
  name: string;
  anatomy: { label: string; note: string }[];
}) {
  const [gl, setGl] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2;
    setGl(hasWebGL() && !weak && !reduced);
  }, []);

  // Health check: if the scene has not actually taken a real size shortly
  // after mounting, something upstream failed to measure it. Rather than
  // leave an empty box, hand the panel back to the photograph.
  useEffect(() => {
    if (gl !== true) return;
    const t = window.setTimeout(() => {
      const c = stage.current?.querySelector("canvas");
      const w = c?.getBoundingClientRect().width ?? 0;
      if (w < 320) setGl(false);
    }, 1600);
    return () => window.clearTimeout(t);
  }, [gl]);

  const cfg = TINTS[slug] ?? TINTS.plain;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      {/* the bag */}
      <div className="lg:col-span-6">
        <div
          ref={stage}
          className="relative aspect-square overflow-hidden rounded-[var(--r)] border border-hairline"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 15%, #F9FBFE 0%, #E6ECF5 55%, #D5DEEC 100%)",
          }}
        >
          {gl === true ? (
            <>
              <BagScene {...cfg} />
              <p className="spec pointer-events-none absolute bottom-3 left-0 right-0 text-center">
                Drag to rotate
              </p>
            </>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* callouts */}
      <div className="lg:col-span-6">
        <p className="spec spec--lime">Anatomy</p>
        <h2 className="display-md mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
          What you are actually specifying
        </h2>

        <ul className="mt-6 grid gap-px overflow-hidden rounded-[var(--r)] border border-hairline"
            style={{ background: "var(--hairline)" }}>
          {anatomy.map((a, i) => {
            const on = active === i;
            return (
              <li key={a.label}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="grid w-full gap-1.5 p-4 text-left transition-colors duration-200 sm:p-5"
                  style={{ background: on ? "var(--navy-wash)" : "var(--surface)" }}
                >
                  <span className="flex items-baseline gap-2.5">
                    <span className="spec spec--lime shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="display-sm text-[1rem] transition-colors"
                      style={{ color: on ? "var(--navy)" : "var(--ink)" }}
                    >
                      {a.label}
                    </span>
                  </span>
                  <span
                    className="overflow-hidden text-[.9rem] leading-relaxed text-ink-2 transition-all duration-300"
                    style={{
                      maxHeight: on ? "7rem" : "0",
                      opacity: on ? 1 : 0,
                    }}
                  >
                    {a.note}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
