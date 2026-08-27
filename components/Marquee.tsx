import { TICKER } from "@/data/company";

export default function Marquee({ onDark = false }: { onDark?: boolean }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className="marquee border-y"
      style={{
        borderColor: onDark ? "rgba(255,255,255,.14)" : "var(--hairline)",
        background: onDark ? "transparent" : "var(--surface)",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track py-3">
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span
              className="spec px-6"
              style={{ color: onDark ? "var(--on-dark-2)" : undefined }}
            >
              {t}
            </span>
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "var(--lime)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
