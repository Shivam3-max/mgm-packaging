# MGM Packaging

Marketing and enquiry site for **MGM Packaging** — an LLDPE polybag manufacturer
at Khasra No. 454, Barotiwala, Baddi, Solan (HP).

## Running it

```bash
npm install
npm run dev      # http://localhost:3670
npm run build
```

## What's here

30 routes: home, 6 product pages, 6 industry pages, 6 buyer tools, plus quality,
compliance, why-LLDPE, about, contact, FAQ, downloads, RFQ and samples.

| Path | Purpose |
|---|---|
| `data/company.ts` | **Every company fact in one file.** See `ASSUMPTIONS.md`. |
| `data/products.ts` | The six bag types, with specs, sizes and anatomy. |
| `data/industries.ts` | The six markets, written for their actual buyer. |
| `data/content.ts` | Process, materials, compliance and FAQ copy. |
| `lib/calc.ts` | Polybag weight/cost maths. Verified against two trade formulas. |
| `components/FilmScene.tsx` | WebGL hero — a rippling sheet of polyethylene. |
| `components/ProcessScene.tsx` | WebGL particle morph: granule → film → bag. |
| `components/BagScene.tsx` | WebGL inflated bag on product pages. |

## Lead delivery — required before launch

Every quote / sample / contact submission is POSTed as JSON to
`process.env.MGM_WEBHOOK_URL` (see `app/api/enquiry/route.ts`).

**If that variable is not set, enquiries are written to the server log only and
nobody is notified.** The route logs a loud warning on every such submission.

1. `cp .env.example .env.local` and set `MGM_WEBHOOK_URL` for local testing.
2. On Vercel, set it under **Project → Settings → Environment Variables**.

Any JSON-accepting endpoint works — a Zapier/Make/n8n hook or a Google Apps
Script web app. A good hook: email both partners + append to a Google Sheet.

The API responds `{ ok: true, delivered: <bool> }`; `delivered` is `false` when
the webhook is missing or errored.

## The maths

Polybags are sold by weight and used by the piece. `lib/calc.ts` uses the metric
trade formula:

```
kg per 1,000 bags = width(cm) × length(cm) × micron × 0.0002 × density
```

The constant encodes film density (0.9245 g/cm³ for LLDPE) — two film layers,
micron converted to centimetres, across a thousand bags. Cross-checked against
the imperial rule of thumb (`W(in) × L(in) × gauge ÷ 3300`), which agrees to
within 1.6%.

Worked example: 10″ × 12″ at 50 micron = 7.16 g/bag ≈ 140 bags/kg.

## WebGL and fallbacks

Every 3D scene ships with a real fallback and hands over when WebGL is
unavailable, `prefers-reduced-motion` is set, or the device reports ≤2 cores:

- **Home hero** → a rendered SVG of the same film sheet (paints first, always)
- **Quality sequence** → a stacked, readable process list
- **Product bag** → the product photograph

The 3D is the reward for good hardware, never the requirement. Each scene also
parks its render loop (`frameloop="never"`) whenever its canvas scrolls out of
view, via `useInView`, so an idle 3D section costs nothing.

## Note on lint

A handful of `react-hooks/set-state-in-effect` warnings remain in
`FilmHero`, `BagAnatomy`, `ProcessSequence`, `Counter`, `Header`,
`QuoteProvider` and `VideoBlock`. All are the canonical SSR-safe pattern for
reading a browser-only value (WebGL support, reduced-motion, scroll position,
localStorage) after mount. They are intentional.

## Responsive

Verified with no horizontal overflow at 320, 375, 390, 768 and 1440 px across
home, products, product detail, industries, tools, contact, RFQ, quality,
downloads and FAQ.

Specific accommodations:

- **Belt map** — the radial drive-time diagram needs room for its labels, so
  below 640 px it is replaced by a vertical distance rail carrying the same
  information. At 320 px the radial version's labels would render at ~6 px.
- **Pinned process sequence** — the GSAP-pinned stage is disabled below 768 px
  and falls back to a stacked list; pinning a full-height stage on a phone
  fights the browser chrome.
- **Tables** — every table sits in `.tablewrap` (`overflow-x: auto`) with a
  `min-width`, so wide spec tables scroll inside their own container rather
  than the page.
- **Mobile action bar** — Call / WhatsApp / Quote, fixed to the bottom below
  640 px. `body` carries matching bottom padding so it never covers the footer.
- **Grid guards** — grid and flex tracks default to min-content, so a long
  unbreakable string can widen a track past its container. `globals.css` sets
  `min-width: 0` on the common containers and `overflow-wrap` on labels.
