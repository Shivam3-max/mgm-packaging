"use client";

import { useRef, useState } from "react";
import { FilmFallback } from "./FilmHero";

/* ============================================================================
   A contained video block, sized to sit inside a column rather than take over
   the page. Until a file is supplied it renders a deliberate placeholder in
   the site's own film motif — so the section reads as finished, not broken.

   To go live: put the file in /public/video/ and set VIDEO.src in
   data/company.ts. Nothing else changes.
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
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  // The block sits high on the page, so nothing about the video is fetched
  // until the visitor actually asks for it — the poster carries the section
  // on its own. When there is no poster, nudging the media fragment past
  // frame zero at least gets the browser to paint the first frame.
  const needsMetadata = !poster;
  const videoSrc = src && !poster ? `${src}#t=0.1` : src;

  const shell =
    "relative overflow-hidden rounded-[var(--r)] border border-hairline bg-[var(--navy-deep)]";

  return (
    <figure className="film-stack">
      <div className="film-stack-inner overflow-hidden">
        <div className={`${shell} group aspect-video`}>
          {src && !failed ? (
            <>
              <video
                ref={video}
                src={videoSrc}
                poster={poster}
                controls={started}
                playsInline
                preload={needsMetadata ? "metadata" : "none"}
                className="h-full w-full object-cover"
                onPlay={() => setStarted(true)}
                onError={() => setFailed(true)}
              />
              {!started && (
                <button
                  onClick={() => {
                    void video.current?.play();
                    setStarted(true);
                  }}
                  className="absolute inset-0 grid place-items-center"
                  style={{ background: "rgba(1,20,50,.34)" }}
                  aria-label="Play video"
                >
                  <PlayGlyph />
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
