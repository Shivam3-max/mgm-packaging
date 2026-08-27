import { SITE } from "./company";

/* ————————————————— process: granule to gusset ————————————————— */

export const PROCESS = [
  {
    no: "01",
    title: "Granule intake",
    lede: "It starts with what we refuse to buy.",
    body: "Every batch is 100% virgin LLDPE film-grade granule. We do not run reprocessed or recycled material — it carries unknown additives and an unknown thermal history, and neither belongs in a bag that touches food or medicine. Granule grade is recorded against the batch.",
    spec: "100% virgin · IS 10146 film grade",
  },
  {
    no: "02",
    title: "Extrusion",
    lede: "Melt, blow, and hold the gauge.",
    body: "Granules melt and are blown into a continuous tube of film. The variable that matters is thickness consistency across the web — a bag that measures 45 micron where it should be 50 is a tenth of your money missing on every kilogram. Gauge is checked through the run, not just at the start.",
    spec: `${SITE.extruders} extrusion lines · 15–200 micron`,
  },
  {
    no: "03",
    title: "Printing",
    lede: "Where the bag becomes yours.",
    body: "Printed work goes through our own line, up to two colours. Doing it in-house means your artwork does not queue at a third party, and when registration drifts we stop rather than ship. A digital proof goes out before every first run.",
    spec: `In-house · up to ${SITE.printColours} colours`,
  },
  {
    no: "04",
    title: "Sealing & cutting",
    lede: "The step that decides whether the bag works.",
    body: "Film is sealed and cut to the specified size. Seal quality is the most common failure point in a cheap bag — under-fused and it peels, over-fused and the film goes brittle right at the weld. Gusseted bags seal through four layers and need longer dwell, so they run slower on purpose.",
    spec: `${SITE.sealingMachines} sealing machines`,
  },
  {
    no: "05",
    title: "Check, count, dispatch",
    lede: "Weighed, counted, and out into the belt.",
    body: "Bags are checked for seal integrity and dimension, then packed by weight and counted. Because we are inside the BBN belt, dispatch is a short drive rather than a freight booking — stock sizes reach most customers the same or next day.",
    spec: `${SITE.leadTimeStock} for stock sizes`,
  },
] as const;

/* ————————————————— why LLDPE ————————————————— */

export const MATERIALS = [
  {
    code: "LD",
    name: "LDPE",
    full: "Low-density polyethylene",
    density: "0.917 – 0.930 g/cm³",
    feel: "Soft, flexible, glossy",
    strengths: ["Excellent clarity and gloss", "Very easy to seal — wide heat window", "Soft hand feel"],
    weaknesses: ["Lower tensile strength", "Punctures more easily", "Needs more thickness for the same job"],
    use: "Garment bags, light retail packing, anywhere appearance leads.",
  },
  {
    code: "LLD",
    name: "LLDPE",
    full: "Linear low-density polyethylene",
    density: "0.915 – 0.925 g/cm³",
    feel: "Tough, slightly less glossy, stretchy",
    strengths: [
      "Higher tensile strength than LDPE",
      "Markedly better puncture and tear resistance",
      "Downgauges well — same strength at lower micron",
    ],
    weaknesses: ["Narrower heat-seal window", "Slightly lower gloss than LDPE"],
    use: "The default for anything that has to survive handling. What we build our range on.",
  },
  {
    code: "HD",
    name: "HDPE",
    full: "High-density polyethylene",
    density: "0.930 – 0.970 g/cm³",
    feel: "Stiff, crinkly, translucent rather than clear",
    strengths: ["Highest strength-to-weight ratio", "Very thin bags carry real load", "Good chemical resistance"],
    weaknesses: ["Hazy — poor clarity", "Crinkles audibly", "Less puncture-tolerant than LLDPE at low gauge"],
    use: "Where weight and cost matter more than looks — liners, waste, high-volume light-duty.",
  },
] as const;

export const DOWNGAUGE_NOTE =
  "LLDPE's practical advantage is that it can often be run thinner than LDPE for the same job. A bag that needs 60 micron in LDPE may perform at 50 in LLDPE — about 17% less film, which is 17% less cost per bag and 17% less plastic entering the waste stream. We will tell you when that applies to your specification, even though it means selling you fewer kilograms.";

/* ————————————————— compliance ————————————————— */

export const COMPLIANCE_UPDATED = "August 2026";

export const COMPLIANCE_POINTS = [
  {
    q: "Does the 120-micron rule apply to my bags?",
    short: "Almost certainly not.",
    a: "The minimum thickness rule — 75 micron from September 2021, then 120 micron from 31 December 2022 — applies to plastic **carry bags**: the bags handed to a customer to carry goods away. It does not set a minimum for product packaging, liners, or bags used inside a manufacturing or dispatch process. A 40-micron garment bag or a 50-micron courier mailer is not a carry bag and is not covered by that limit.",
    tag: "Thickness",
  },
  {
    q: "What is Rule 11A marking?",
    short: "QR or barcode on plastic packaging.",
    a: "The 2024–25 amendments introduced a marking requirement for plastic packaging, with a barcode, QR code or unique identification carrying prescribed details including thickness. Obligations fall primarily on producers, importers and brand owners. If you are the brand owner putting the packaging into the market, this is your obligation — and we can print what you need onto the bag.",
    tag: "Marking",
  },
  {
    q: "Do I need EPR registration?",
    short: "If you are a brand owner, yes.",
    a: "Extended Producer Responsibility registration on the CPCB portal applies to producers, importers and brand owners handling plastic packaging. It involves registering, declaring your packaging categories, and meeting category-wise recycling targets against what you place in the market. Buying bags from us does not create the obligation — placing packaged product into the market does.",
    tag: "EPR",
  },
  {
    q: "Is LLDPE recyclable?",
    short: "Yes — resin code 4.",
    a: "Polyethylene film is recyclable and is recovered through established channels. Our film is single-material LLDPE with no laminate layers, which makes it substantially easier to recycle than multi-layer structures — a mixed laminate has to be separated before it can be recovered, and usually is not.",
    tag: "Recycling",
  },
  {
    q: "What material declaration can you give me?",
    short: "Grade, conformity and specification, in writing.",
    a: "We will confirm in writing that the film is 100% virgin LLDPE of a grade conforming to IS 10146 — polyethylene for safe use in contact with foodstuffs, pharmaceuticals and drinking water — with additives restricted to the IS 10141 positive list, along with the thickness and dimensions of your specification.",
    tag: "Material",
  },
];

/* ————————————————— FAQ ————————————————— */

export const FAQ_GROUPS = [
  {
    group: "Ordering",
    items: [
      { q: "What is your minimum order?", a: `${SITE.moqKg} kg for stock sizes. A new custom size usually needs about 100 kg to be worth setting up, and a custom colour about 200 kg.` },
      { q: "How do you quote — per bag or per kilogram?", a: "Per kilogram. That is how polyethylene is bought and sold at every stage, and it is the only unit that stays honest across sizes. Our calculator converts a per-kilogram rate into cost per bag for you." },
      { q: "How long does an order take?", a: `Stock sizes ${SITE.leadTimeStock}. Custom sizes ${SITE.leadTimeCustom}. Printed work ${SITE.leadTimePrinted}, because it includes a proof step.` },
      { q: "What are your payment terms?", a: `${SITE.paymentTerms}. For established repeat customers we are flexible — talk to Sanjeev.` },
    ],
  },
  {
    group: "Specification",
    items: [
      { q: "I don't know what thickness I need.", a: "Use the thickness advisor — tell it what the bag will hold, whether the contents are sharp and whether it will be couriered, and it returns a micron with the reasoning shown. Or send us the product and we will specify against it." },
      { q: "What size bag do I need for my product?", a: "Our size finder takes your product dimensions and adds the seal and headspace allowance. Most units are running a stock size an inch or two larger than they need, and paying for that inch on every piece." },
      { q: "What is the difference between micron and gauge?", a: "Two ways of saying the same thing. 100 gauge = 25 micron, so gauge is simply micron × 4. Indian trade usually quotes gauge; written specifications usually use micron. Our converter handles both plus mil." },
      { q: "Can you match a bag we already buy?", a: "Yes, and it is the easiest way to get an accurate quote. Send us one bag. We will measure the size, check the gauge, identify the material and quote against it." },
    ],
  },
  {
    group: "Material & compliance",
    items: [
      { q: "Do you use recycled material?", a: "No. Everything we run is 100% virgin LLDPE granule. Recycled film carries unknown additives and an unknown thermal history, which makes it unsuitable for food and pharmaceutical contact and unpredictable in a seal." },
      { q: "Are your bags food grade?", a: "The film grade we run conforms to IS 10146 for contact with foodstuffs, pharmaceuticals and drinking water, with additives on the IS 10141 positive list. Tell us the application and we will confirm the specification in writing." },
      { q: "Does the 120-micron rule apply to me?", a: "Probably not — that rule governs carry bags, not product packaging or liners. Our compliance checker walks through it in three questions." },
    ],
  },
  {
    group: "Printing & artwork",
    items: [
      { q: "How many colours can you print?", a: `${SITE.printColours} colours as standard, printed in-house. If you need more we will say so rather than take the order and struggle.` },
      { q: "What artwork format do you need?", a: "Vector is best — AI, EPS, PDF or SVG. A high-resolution PNG usually works too, and if all you have is a logo on a letterhead we will redraw it." },
      { q: "Do I pay for the printing cylinder each time?", a: "No. It is a one-time cost per design, and we keep it for your repeat orders." },
    ],
  },
  {
    group: "Delivery",
    items: [
      { q: "Where do you deliver?", a: `Across the Baddi–Barotiwala–Nalagarh belt and the wider region — Solan, Parwanoo, Chandigarh, Panchkula, Mohali and Dera Bassi. ${SITE.freeDeliveryNote}.` },
      { q: "Can I collect from the unit?", a: `Yes. We are at ${SITE.address.full}, and you are welcome to come and see the line running before you order.` },
      { q: "Do you supply outside Himachal?", a: "We do, but be realistic with us about freight — polybags are bulky and light, and beyond a few hundred kilometres transport starts to dominate the landed cost. Inside the belt we are hard to beat; a thousand kilometres away we probably are not." },
    ],
  },
];

/* ————————————————— downloads ————————————————— */

export const DOWNLOADS = [
  { name: "Stock size chart", desc: "Every stock size with recommended micron ranges and typical applications.", kind: "Reference", href: "/downloads#size-chart" },
  { name: "Micron & gauge conversion table", desc: "Micron, gauge and mil side by side, with the thicknesses we actually run.", kind: "Reference", href: "/downloads#conversion" },
  { name: "Material comparison", desc: "LD, LLD and HD compared on strength, clarity, sealing and cost.", kind: "Technical", href: "/downloads#materials" },
  { name: "Capability summary", desc: "What we run, in what range, and how fast — a one-page supplier summary.", kind: "Company", href: "/downloads#capability" },
];
