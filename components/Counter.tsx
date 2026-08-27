"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up once, when it scrolls into view. */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: { to: number; suffix?: string; prefix?: string; duration?: number; className?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setN(to);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}{n.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
