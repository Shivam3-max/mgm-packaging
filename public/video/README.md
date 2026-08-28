# Video

Drop the homepage video here, then set `VIDEO.src` in `data/company.ts`:

```ts
export const VIDEO = {
  src: "/video/mgm-line.mp4",
  poster: "/img/video-poster.webp",
  ...
};
```

Until `src` is set, the block on the homepage renders a placeholder in the
site's film motif — the section reads as finished rather than broken.

**Practical notes**

- **MP4 (H.264 + AAC)** plays everywhere. Add a WebM only if you want the
  smaller file as well.
- **Keep it short.** Thirty to sixty seconds of the line actually running
  beats three minutes of anything else. This is a buyer checking a supplier,
  not an audience watching a film.
- **Aim under ~10 MB.** The block sits high on the homepage, so a heavy file
  costs you on the metrics that matter. 1280×720 is plenty at this size —
  the block renders around 650 px wide on a desktop.
- **Set a poster frame.** Without one the block flashes black while the video
  loads. A still exported from the video itself works well.
- **Assume no sound.** Most people will watch muted, so the video has to make
  sense without narration.
