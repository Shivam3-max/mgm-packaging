"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FilmFallback } from "./FilmHero";

/* ============================================================================
   A contained video block, sized to sit inside a column rather than take over
   the page.

   When motion is allowed it behaves like every other showcase clip on the
   web: it starts playing — muted — once the section scrolls into view and
   pauses again when it leaves, with an unmute control in the corner. Under
   prefers-reduced-motion (or with no IntersectionObserver) it falls back to a
   poster and a manual play button.

   Until a file is supplied it renders a deliberate placeholder in the site's
   own film motif — so the section reads as finished, not broken.

   To go live: put the file in /public/video/ and set VIDEO.src / VIDEO.poster
   in data/company.ts. Nothing else changes.
   ========================================================================== */

/** Corner ticks — the same measurement language as the rest of the site. */
function Corners() {
  const base =
    "pointer-events-none absolute h-3.5 w-3.5 border-[var(--on-dark-3)] opacity-60";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

function PlayGlyph({ muted = false }: { muted?: boolean }) {
  return (
    <span
      className="grid h-14 w-14 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105"
      style={{
        background: muted ? "rgba(255,255,255,.10)" : "var(--lime)",
        border: muted ? "1px solid rgba(255,255,255,.28)" : "none",
      }}
    >
      <svg width="17" height="19" viewBox="0 0 17 19" aria-hidden="true">
        <path
          d="M16 8.63a1 1 0 0 1 0 1.74L1.99 18.5A1 1 0 0 1 .5 17.63V1.37A1 1 0 0 1 1.99.5L16 8.63Z"
          fill={muted ? "rgba(255,255,255,.55)" : "#12240A"}
        />
      </svg>
    </span>
  );
}

function SoundGlyph({ on }: { on: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      {on ? (
        <>
          <path d="M16 8.8a4 4 0 0 1 0 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.7 6a7.5 7.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <path d="m16.5 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function VideoBlock({
  src,
  poster,
  caption,
  label = "Inside the unit",
}: {
  src?: string;
  poster?: string;
  caption: string;
  label?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const [failed, setFailed] = useState(false);
  // Autoplay is the default; it is switched off for reduced-motion visitors and
  // anywhere IntersectionObserver is missing, which drops us to a manual poster.
  const [autoplay, setAutoplay] = useState(false);
  const [decided, setDecided] = useState(false);
  const [muted, setMuted] = useState(true);
  const [manual, setManual] = useState(false); // user took control → native controls

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAutoplay(!reduced && "IntersectionObserver" in window);
    setDecided(true);
    if (video.current) video.current.muted = true;
  }, []);

  // Play when the block is on screen, pause when it leaves.
  useEffect(() => {
    const el = stage.current;
    const v = video.current;
    if (!el || !v || !autoplay || !src || failed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void v.play().catch(() => {});
        else if (!v.paused) v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay, src, failed]);

  const toggleSound = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setManual(true);
    if (v.paused) void v.play().catch(() => {});
  }, []);

  // No poster to hold the frame → nudge past frame zero so the browser paints
  // the first frame rather than black.
  const videoSrc = src && !poster ? `${src}#t=0.1` : src;
  const showManualPoster = decided && !autoplay;

  const shell =
    "relative overflow-hidden rounded-[var(--r)] border border-hairline bg-[var(--navy-deep)]";

  return (
    <figure className="film-stack">
      <div className="film-stack-inner overflow-hidden">
        <div ref={stage} className={`${shell} group aspect-video`}>
          {src && !failed ? (
            <>
              <video
                ref={video}
                src={videoSrc}
                poster={poster}
                muted
                loop={autoplay}
                playsInline
                controls={manual}
                preload={autoplay || !poster ? "metadata" : "none"}
                className="h-full w-full object-cover"
                onError={() => setFailed(true)}
              />

              {showManualPoster && !manual && (
                <button
                  onClick={() => {
                    const v = video.current;
                    if (!v) return;
                    v.muted = false;
                    setMuted(false);
                    setManual(true);
                    void v.play().catch(() => {});
                  }}
                  className="absolute inset-0 grid place-items-center"
                  style={{ background: "rgba(1,20,50,.34)" }}
                  aria-label="Play video"
                >
                  <PlayGlyph />
                </button>
              )}

              {decided && autoplay && !manual && (
                <button
                  onClick={toggleSound}
                  className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:bg-[rgba(1,20,50,.8)]"
                  style={{
                    background: "rgba(1,20,50,.55)",
                    border: "1px solid rgba(255,255,255,.22)",
                  }}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                >
                  <SoundGlyph on={!muted} />
                </button>
              )}
            </>
          ) : (
            /* ————— placeholder ————— */
            <div
              className="absolute inset-0 grid place-items-center"
              role="img"
              aria-label="Video coming soon"
            >
              <div className="absolute inset-0 opacity-70">
                <FilmFallback />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(1,20,50,.35), rgba(1,20,50,.72))",
                }}
              />
              <div className="relative grid justify-items-center gap-3.5">
                <PlayGlyph muted />
                <p className="spec" style={{ color: "var(--on-dark-2)" }}>
                  Video coming soon
                </p>
              </div>
              <Corners />
            </div>
          )}
        </div>

        {/* caption bar — the same footer the product cards use */}
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-hairline px-4 py-3">
          <p className="spec spec--navy">{label}</p>
          <p className="spec">{caption}</p>
        </figcaption>
      </div>
    </figure>
  );
}
