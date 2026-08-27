"use client";

import { useQuote } from "./QuoteProvider";

export default function QuoteButton({ onDark = false }: { onDark?: boolean }) {
  const { lines, setOpen, justAdded, ready } = useQuote();

  return (
    <button
      onClick={() => setOpen(true)}
      className={`btn ${onDark ? "btn--ghost-dark" : "btn--primary"} relative`}
      style={{ padding: ".62rem 1rem" }}
      aria-label={`Open quote list, ${lines.length} items`}
    >
      Quote list
      <span
        className="tnum inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full px-1 text-[.68rem] font-semibold transition-transform duration-300"
        style={{
          background: justAdded ? "var(--lime)" : "rgba(255,255,255,.22)",
          color: justAdded ? "#12240A" : "#fff",
          transform: justAdded ? "scale(1.18)" : "scale(1)",
        }}
      >
        {ready ? lines.length : 0}
      </span>
    </button>
  );
}
