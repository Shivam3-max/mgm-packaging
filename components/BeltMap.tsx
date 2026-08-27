import { DRIVE_TIMES } from "@/data/company";

/* ============================================================================
   Not a geographic map — a drive-time diagram.
   We don't have surveyed coordinates and won't fake the precision of a real
   map. What a purchase manager actually wants to know is "how far is this from
   me", so the rings are minutes and the bearings are approximate. Honest, and
   more useful than an unreadable grey embed.
   ========================================================================== */

const RINGS = [15, 30, 45, 60, 75];

// approximate bearing from Barotiwala, in degrees clockwise from north
const BEARING: Record<string, number> = {
  "Barotiwala": 20,
  "Baddi industrial area": 250,
  "Nalagarh": 275,
  "Parwanoo": 130,
  "Panchkula / Chandigarh": 195,
  "Mohali / Dera Bassi": 215,
};

const SIZE = 520;
const C = SIZE / 2;
const R_MAX = 218;

function pos(mins: number, bearingDeg: number) {
  const r = (Math.min(mins, 78) / 78) * R_MAX;
  const a = ((bearingDeg - 90) * Math.PI) / 180;
  return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r };
}

export default function BeltMap() {
  return (
    <figure className="card overflow-hidden">
      {/* radial diagram — needs room for its labels, so tablet and up */}
      <div className="hidden p-4 sm:block sm:p-6">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full"
          role="img"
          aria-label="Drive-time diagram showing MGM Packaging in Barotiwala and approximate travel times to Baddi, Nalagarh, Parwanoo, Chandigarh and Mohali"
        >
          <defs>
            <radialGradient id="belt-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#022F73" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#022F73" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={C} cy={C} r={R_MAX} fill="url(#belt-glow)" />

          {/* drive-time rings */}
          {RINGS.map((m) => {
            const r = (m / 78) * R_MAX;
            return (
              <g key={m}>
                <circle
                  cx={C} cy={C} r={r}
                  fill="none"
                  stroke="var(--hairline-2)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <text
                  x={C + 4} y={C - r - 5}
                  fill="var(--ink-4)"
                  fontFamily="var(--font-plex-mono)"
                  fontSize="10"
                  letterSpacing="1"
                >
                  {m} MIN
                </text>
              </g>
            );
          })}

          {/* spokes to each place */}
          {DRIVE_TIMES.map((d) => {
            const p = pos(d.mins, BEARING[d.place] ?? 0);
            return (
              <line
                key={`l-${d.place}`}
                x1={C} y1={C} x2={p.x} y2={p.y}
                stroke="var(--hairline-2)"
                strokeWidth="1"
              />
            );
          })}

          {/* the places */}
          {DRIVE_TIMES.map((d) => {
            const p = pos(d.mins, BEARING[d.place] ?? 0);
            const right = p.x >= C;
            return (
              <g key={d.place}>
                <circle cx={p.x} cy={p.y} r="4.5" fill="var(--navy)" />
                <text
                  x={right ? p.x + 10 : p.x - 10}
                  y={p.y - 1}
                  textAnchor={right ? "start" : "end"}
                  fill="var(--ink)"
                  fontFamily="var(--font-plex-sans)"
                  fontSize="12.5"
                  fontWeight="600"
                >
                  {d.place}
                </text>
                <text
                  x={right ? p.x + 10 : p.x - 10}
                  y={p.y + 13}
                  textAnchor={right ? "start" : "end"}
                  fill="var(--ink-3)"
                  fontFamily="var(--font-plex-mono)"
                  fontSize="10.5"
                >
                  ~{d.mins} min · {d.km} km
                </text>
              </g>
            );
          })}

          {/* the unit */}
          <circle cx={C} cy={C} r="15" fill="var(--lime)" opacity="0.22" />
          <circle cx={C} cy={C} r="7.5" fill="var(--lime)" stroke="#fff" strokeWidth="2.5" />
          <text
            x={C} y={C + 34}
            textAnchor="middle"
            fill="var(--navy)"
            fontFamily="var(--font-archivo)"
            fontSize="14"
            fontWeight="800"
            letterSpacing="-0.3"
          >
            MGM PACKAGING
          </text>
          <text
            x={C} y={C + 50}
            textAnchor="middle"
            fill="var(--ink-3)"
            fontFamily="var(--font-plex-mono)"
            fontSize="10"
            letterSpacing="1.4"
          >
            KHASRA 454, BAROTIWALA
          </text>
        </svg>
      </div>

      {/* mobile: the same information as a vertical distance rail, where a
          radial diagram's labels would render far too small to read */}
      <div className="p-5 sm:hidden">
        <div className="flex items-center gap-3 pb-1">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ background: "var(--lime)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--lime) 25%, transparent)" }}
          />
          <span className="display-sm text-[.95rem]" style={{ color: "var(--navy)" }}>
            MGM Packaging, Barotiwala
          </span>
        </div>

        <ol className="ml-[5px] border-l-2 border-dashed" style={{ borderColor: "var(--hairline-2)" }}>
          {DRIVE_TIMES.map((d) => (
            <li key={d.place} className="relative flex items-baseline justify-between gap-3 py-2.5 pl-5">
              <span
                className="absolute left-[-5px] top-[1.15rem] h-2 w-2 rounded-full"
                style={{ background: "var(--navy)" }}
                aria-hidden="true"
              />
              <span className="text-[.9rem] leading-snug text-ink">{d.place}</span>
              <span className="tnum shrink-0 text-[.82rem] text-ink-3">
                ~{d.mins} min · {d.km} km
              </span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="border-t border-hairline px-5 py-3">
        <p className="spec">
          Approximate drive times, not surveyed distances
        </p>
      </figcaption>
    </figure>
  );
}
