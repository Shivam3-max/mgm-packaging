/** The heat-seal divider. The site's signature rule. */
export default function Seal({
  className = "",
  faint = false,
  onDark = false,
}: { className?: string; faint?: boolean; onDark?: boolean }) {
  return (
    <hr
      className={`seal ${faint ? "seal--faint" : ""} ${onDark ? "seal--ondark" : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
