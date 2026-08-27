/* ============================================================================
   MGM mark.
   The side gusset of a polybag, seen in cross-section, folds into an M.
   So the mark is not a letter dressed up as a bag — it is the bag's own
   geometry, which happens to be the company's initial.
   One facet is lime: the fold face catching the light.
   ========================================================================== */

export function LogoMark({
  className = "",
  navy = "var(--navy)",
  lime = "var(--lime)",
}: { className?: string; navy?: string; lime?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} role="img" aria-label="MGM Packaging" fill="none">
      {/* the full M — folded film, mitred at every vertex */}
      <path
        d="M3.6 29.2 V5.2 L20 21.4 L36.4 5.2 V29.2"
        stroke={navy}
        strokeWidth="5.6"
        strokeLinejoin="miter"
        strokeLinecap="square"
        strokeMiterlimit="10"
      />
      {/* one fold face, lit */}
      <path
        d="M20 21.4 L36.4 5.2"
        stroke={lime}
        strokeWidth="5.6"
        strokeLinecap="butt"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  onDark = false,
  compact = false,
}: { className?: string; onDark?: boolean; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        className={compact ? "h-6 w-[30px]" : "h-7 w-[35px]"}
        navy={onDark ? "#FFFFFF" : "var(--navy)"}
        lime="var(--lime)"
      />
      <span className="flex flex-col leading-none">
        <span
          className="display"
          style={{
            fontSize: compact ? "1.02rem" : "1.16rem",
            letterSpacing: "-.045em",
            color: onDark ? "#fff" : "var(--navy)",
            lineHeight: 1,
          }}
        >
          MGM
        </span>
        <span
          className="spec"
          style={{
            fontSize: compact ? ".52rem" : ".55rem",
            letterSpacing: ".26em",
            marginTop: "2px",
            color: onDark ? "var(--on-dark-2)" : "var(--ink-3)",
          }}
        >
          PACKAGING
        </span>
      </span>
    </span>
  );
}
