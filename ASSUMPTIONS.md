# Assumptions to confirm with MGM Packaging

Everything in this list is a **placeholder**. Each one lives in `data/company.ts`
and is used everywhere on the site, so changing the value there updates every
page at once. Nothing here needs a code change beyond editing that one file.

Confirmed facts (taken from the brochure) are marked ✅ and need no action.

---

## ✅ Confirmed — from the brochure artwork

| Fact | Value |
|---|---|
| Company name | MGM Packaging |
| Product | LLDPE polybags |
| Tagline | Packaging Today… Protecting Tomorrow… |
| Address | Khasra No. 454, Barotiwala, Baddi, Solan (HP) 174101 |
| Partner 1 | Ashwani Thakur — 70184-36419 |
| Partner 2 | Sanjeev Guleria — 70183-17629 |
| Email | mgmpackaging1@gmail.com |
| Range | Plain · Printed · Zip lock · Gusset · LD/HD custom · Coloured |
| Stock sizes | 8×10, 10×12, 12×16, 14×20 inches |
| Brand navy | `#022F73` (sampled from the artwork) |
| Brand lime | `#85B53D` (sampled from the artwork) |

### ✅ Confirmed by the partners — August 2026

| Fact | Value |
|---|---|
| Thickness range | 15 – 200 micron |
| Flat width range | 3" – 58" |
| Minimum order | 100 kg **per size** |
| Payment terms | 50% advance, balance on delivery; credit up to 30–60 days for established accounts |

---

## ⚠️ Placeholders — please confirm

### The four that matter most

| Field in `data/company.ts` | Placeholder | Why it matters |
|---|---|---|
| `founded` | 2018 | Appears in schema and lends credibility. |
| `capacityKgDay` / `capacityTonnesMonth` | 1200 kg/day · 30 t/month | Shown on the home hero, about and downloads pages. "Two extruders, 1.2 tonnes a day" closes deals; "advanced technology" does not. |

### Production

| Field | Placeholder |
|---|---|
| `extruders` | 2 |
| `sealingMachines` | 4 |
| `printingInHouse` | `true` |
| `printColours` | 2 |
| `employees` | 20+ |

### Commercial

| Field | Placeholder |
|---|---|
| `leadTimeStock` | 2–3 working days |
| `leadTimeCustom` | 5–7 working days |
| `leadTimePrinted` | 7–10 working days |
| `freeDeliveryNote` | Free delivery across the BBN belt above 200 kg |
| `deliveryRadiusKm` | 60 |
| `workingHours` | Mon–Sat, 9:00 am – 7:00 pm |
| `responseTime` | within 4 working hours |

### ⚠️ One thing to confirm about payment terms

The brief read *"50% advance and rest on delivery … payment terms 30 to 60 days max"*.
That has been implemented as **both**: 50% advance with the balance on delivery to
start, moving to 30–60 day credit for established accounts. If the intent was that
30–60 day credit is the standard term for everyone, change `paymentTerms`,
`paymentTermsShort` and `creditDays` in `data/company.ts` and the FAQ, downloads and
capability sheet all follow.

### Partner responsibilities

The split between the two partners is **invented**. Currently:

- **Ashwani Thakur** — Production & Quality: new enquiries, custom sizes, samples, technical specification
- **Sanjeev Guleria** — Commercial & Dispatch: pricing, repeat orders, scheduling, dispatch

Swap or merge these in `SITE.partners` as appropriate.

### Drive times (`DRIVE_TIMES`)

Approximate, and used to draw the belt map on the contact page. Worth checking
against Google Maps: Barotiwala 5 min · Baddi 15 · Nalagarh 30 · Parwanoo 45 ·
Chandigarh 60 · Mohali 75.

---

## 🚫 Deliberately left blank — do not invent

| Field | Why |
|---|---|
| `gstin` | A real government identifier. Fabricating one could collide with a live business. Fill it in and it appears in the footer automatically. |
| `udyam` | Same reason. |
| `certifications` | **Empty by design.** The site nowhere claims ISO 9001, GMP or any audited certificate, and the quality and downloads pages state plainly that no third-party certification is held. Pharma buyers audit this. If MGM does hold a certificate, add `{ name, body, note }` to the array and the trust sections will render it. |

What the site *does* claim is material provenance (`materialClaims`) — virgin
LLDPE, IS 10146 film grade, IS 10141 additives. **Confirm these with the granule
supplier before going live**, because they are stated to pharmaceutical buyers.

---

## Other open items

- **Domain** — `SITE.domain` is set to `mgmpackaging.in`. Used for canonical URLs,
  the sitemap and OpenGraph metadata.
- **Named clients** — none are used anywhere. Even two or three named BBN units,
  with written permission, would outperform any amount of copy. Anonymised
  descriptions work too ("a top-ten formulations exporter in Baddi").
- **Shop-floor photography** — the site currently uses 16 images extracted from the
  brochure. Real photographs of the extruder running, the sealing machines and a
  loaded pallet would make `/quality` and `/about` dramatically stronger.
- **Enquiry delivery** — see below.

---

## Turning on enquiry email

Form submissions currently: validate → log server-side → forward to a webhook if
one is configured → the visitor is then offered a pre-filled WhatsApp handoff.
Nothing is silently dropped.

To forward enquiries somewhere, set one environment variable:

```
MGM_WEBHOOK_URL=https://hooks.zapier.com/...
```

Any endpoint that accepts a JSON POST works — Zapier, Make, n8n, or a Google
Apps Script bound to a Sheet. For direct SMTP instead, add the provider call in
`app/api/enquiry/route.ts` where the webhook block sits.
