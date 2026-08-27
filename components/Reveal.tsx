"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Scroll-in reveal. Adds `is-in` once the element enters the viewport. */
export default function Reveal({
  children,
  group = false,
  className = "",
  delay = 0,
  id,
  style,
}: {
  children: ReactNode;
  group?: boolean;
  className?: string;
  delay?: number;
  id?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
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
  }, [delay]);

  return (
    <div ref={ref} id={id} style={style} className={`${group ? "reveal-group" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
