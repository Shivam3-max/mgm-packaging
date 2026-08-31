"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-in reveal. Adds `is-in` once the element enters the viewport.
 *
 * `immediate` opts an element out of the effect entirely: it renders visible
 * from the first paint. Use it for above-the-fold content that must never be
 * gated behind JS — page heroes especially, since that is the LCP element.
 */
export default function Reveal({
  children,
  group = false,
  className = "",
  delay = 0,
  id,
  style,
  immediate = false,
}: {
  children: ReactNode;
  group?: boolean;
  className?: string;
  delay?: number;
  id?: string;
  style?: CSSProperties;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    // If the element is already on screen when we mount, reveal it now rather
    // than waiting for an observer callback — that callback can be delayed by
    // seconds when the main thread is busy hydrating and spinning up WebGL,
    // which left above-the-fold content invisible for far too long.
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.94 && rect.bottom > 0) {
      if (delay) window.setTimeout(() => el.classList.add("is-in"), delay);
      else el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (delay) window.setTimeout(() => el.classList.add("is-in"), delay);
          else el.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, immediate]);

  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className={`${group ? "reveal-group" : "reveal"} ${immediate ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
