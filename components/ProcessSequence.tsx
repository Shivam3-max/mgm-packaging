"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/data/content";

const ProcessScene = dynamic(() => import("./ProcessScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

/* ============================================================================
   A pinned stage: the scroll scrubs one continuous body of material through
   five states. Falls back to a plain stacked list — which is not a lesser
   version, just a quieter one.
   ========================================================================== */

export default function ProcessSequence() {
  const [gl, setGl] = useState<boolean | null>(null);
  const [step, setStep] = useState(0);
  const progress = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 2;
    const ok = hasWebGL() && !weak && !reduced && window.innerWidth >= 768;
    setGl(ok);
    if (!ok) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: wrapRef.current,
            start: "top top",
            end: `+=${PROCESS.length * 70}%`,
            pin: ".process-stage",
            scrub: 0.6,
            onUpdate: (self) => {
              progress.current = self.progress;
              const i = Math.min(
                PROCESS.length - 1,
                Math.floor(self.progress * PROCESS.length)
              );
              setStep(i);
            },
          });
        }, wrapRef);
      }
    );

    return () => ctx?.revert();
  }, []);

  /* ————— fallback: an honest stacked list ————— */
  if (gl === false) {
    return (
      <div className="grid gap-px overflow-hidden rounded-[var(--r)] border border-hairline"
           style={{ background: "var(--hairline)" }}>
        {PROCESS.map((s) => (
          <div key={s.no} className="grid gap-3 bg-surface p-6 md:grid-cols-12 md:gap-6 md:p-8">
            <div className="md:col-span-3">
              <p className="spec spec--lime">{s.no}</p>
              <h3 className="display-sm mt-1.5 text-[1.15rem]">{s.title}</h3>
              <p className="spec mt-2">{s.spec}</p>
            </div>
            <div className="md:col-span-9">
              <p className="display-sm text-[1.05rem]" style={{ fontWeight: 600 }}>{s.lede}</p>
              <p className="measure mt-2 text-[.95rem] leading-relaxed text-ink-2">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="process-stage relative flex h-[100svh] items-center overflow-hidden rounded-[var(--r-lg)]"
        style={{ background: "var(--navy-deep)" }}
      >
        {gl === true && <ProcessScene progressRef={progress} />}

        {/* a soft ground so the copy always has contrast */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(1,20,50,.94) 0%, rgba(1,20,50,.66) 42%, rgba(1,20,50,0) 72%)" }}
        />

        <div className="relative z-10 grid w-full gap-8 px-7 sm:px-12 md:grid-cols-12 md:px-16">
          <div className="md:col-span-6 lg:col-span-5">
            {/* step rail — real sequence, so numbering earns its place */}
            <ol className="mb-8 flex gap-1.5" aria-hidden="true">
              {PROCESS.map((s, i) => (
                <li
                  key={s.no}
                  className="h-[3px] flex-1 rounded-full transition-all duration-500"
                  style={{
                    background: i <= step ? "var(--lime)" : "rgba(255,255,255,.2)",
                  }}
                />
              ))}
            </ol>

            {PROCESS.map((s, i) => (
              <div
                key={s.no}
                className="transition-all duration-500"
                style={{
                  display: i === step ? "block" : "none",
                  opacity: i === step ? 1 : 0,
                }}
              >
                <p className="spec" style={{ color: "var(--lime)" }}>
                  Step {s.no} of 0{PROCESS.length} · {s.spec}
                </p>
                <h3 className="display-md mt-4 text-[clamp(1.7rem,3.6vw,2.7rem)] text-white">
                  {s.title}
                </h3>
                <p className="display-sm mt-3 text-[1.1rem]" style={{ color: "var(--lime)", fontWeight: 600 }}>
                  {s.lede}
                </p>
                <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-on-dark-2">
                  {s.body}
                </p>
              </div>
            ))}

            <p className="spec mt-10" style={{ color: "var(--on-dark-3)" }}>
              Keep scrolling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
