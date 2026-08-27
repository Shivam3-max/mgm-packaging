export interface Industry {
  slug: string;
  name: string;
  short: string;
  image: string;
  /** who at this customer actually reads the page */
  reader: string;
  tagline: string;
  intro: string[];
  /** what this buyer actually worries about */
  concerns: { title: string; body: string }[];
  /** the specification we'd recommend, pre-loaded into the RFQ */
  recommended: { product: string; slug: string; micron: string; note: string }[];
  specNote: string;
  products: string[];
}

export const industries: Industry[] = [
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical Packaging",
    short: "Pharmaceutical",
    image: "/img/industry-pharmaceutical.webp",
    reader: "QA and packaging development",
    tagline: "Material provenance you can put in a file",
    intro: [
      "We manufacture inside the BBN belt, where more than seven hundred pharmaceutical units operate. That is not a marketing line — it is why our film specification is written for your auditors rather than for a catalogue.",
      "The question a QA head asks is never \"is it a good bag?\" It is \"what is it made of, can you prove it, and will the next batch be the same?\" Everything below is written to answer that.",
    ],
    concerns: [
      { title: "No recycled content", body: "100% virgin LLDPE granules. Reprocessed material carries unknown additives and unknown history, and it has no place against a drug product." },
      { title: "Contact compliance", body: "Film grade conforming to IS 10146 — polyethylene for safe use in contact with foodstuffs, pharmaceuticals and drinking water — with additives restricted to the IS 10141 positive list." },
      { title: "Batch consistency", body: "The bag in your validation batch must be the bag in your hundredth batch. Same granule grade, same thickness profile, same supplier." },
      { title: "Documentation", body: "We will confirm material grade and specification in writing against your enquiry, so it can go straight into your supplier file." },
    ],
    recommended: [
      { product: "Zip lock bags", slug: "zip-lock", micron: "50 – 75 micron", note: "In-process transfer and sampling, with a tamper-evident close." },
      { product: "Gusset bags", slug: "gusset", micron: "100 – 200 micron", note: "Drum and carton liners, sized to your internal dimension." },
      { product: "Plain polybags", slug: "plain", micron: "40 – 75 micron", note: "Secondary packing and dispatch." },
      { product: "Coloured polybags", slug: "coloured", micron: "50 – 100 micron", note: "Opaque film for light-sensitive product and discreet dispatch." },
    ],
    specNote: "Tell us the application — primary, secondary, in-process or dispatch — and we will confirm the specification in writing before you order.",
    products: ["zip-lock", "gusset", "plain", "coloured"],
  },
  {
    slug: "garment-textile",
    name: "Garment & Textile Packaging",
    short: "Garment & textile",
    image: "/img/industry-garment-textile.webp",
    reader: "Packing and dispatch supervisors",
    tagline: "Clarity that sells the garment through the bag",
    intro: [
      "A folded garment is judged through its bag. Hazy film makes good fabric look cheap, and a bag that creases badly on the shelf undoes the pressing you just paid for.",
      "The other half of the job is throughput. A packing line moves at the speed of its slowest step, and a bag with a ragged mouth or an inconsistent opening is that step. We cut clean and we hold the gauge.",
    ],
    concerns: [
      { title: "High clarity", body: "Virgin granules and a clean die give film you can read a size label through — no haze, no yellowing on the shelf." },
      { title: "Opens first time", body: "A clean square-cut mouth so operators are not fighting the bag between garments." },
      { title: "Right thickness", body: "Heavy enough not to split at the seam, light enough that you are not paying for film the garment does not need." },
      { title: "Branding", body: "Two-colour in-house print puts your label on the bag without adding a week to the lead time." },
    ],
    recommended: [
      { product: "Plain polybags", slug: "plain", micron: "30 – 50 micron", note: "Folded garments, shirts and knitwear." },
      { product: "Printed polybags", slug: "printed", micron: "40 – 60 micron", note: "Retail-facing packs carrying your brand." },
      { product: "LD / HD custom sizes", slug: "custom-sizes", micron: "25 – 75 micron", note: "Sized to your folded dimension instead of a stock approximation." },
    ],
    specNote: "Send us a folded sample and we will size the bag to it — most garment units are running a stock size an inch or two too big.",
    products: ["plain", "printed", "custom-sizes"],
  },
  {
    slug: "food-grocery",
    name: "Food & Grocery Packaging",
    short: "Food & grocery",
    image: "/img/industry-food-grocery.webp",
    reader: "Production and quality supervisors",
    tagline: "Food-contact film, and a seal that holds",
    intro: [
      "Grains, pulses, spices, dry snacks and flour all fail the same way: a seal that looks fine and opens in transit. Weight makes it worse, because a five-kilogram pack puts real load on a seal every time it is handled.",
      "We run food packing in virgin LLDPE with the contact face left clean and unprinted, at a thickness matched to the pack weight rather than to habit.",
    ],
    concerns: [
      { title: "Food-contact material", body: "Virgin LLDPE conforming to IS 10146 for foodstuff contact, additives on the IS 10141 positive list." },
      { title: "Seal integrity under load", body: "Thickness specified from actual pack weight, so a 5 kg pack is not running on a 1 kg bag's film." },
      { title: "Moisture barrier", body: "Polyethylene is a genuine moisture barrier — it protects dry goods from the humidity swings this region gets." },
      { title: "Clean contact face", body: "Where bags are printed, ink stays on the outer face. Nothing printed touches the product." },
    ],
    recommended: [
      { product: "Plain polybags", slug: "plain", micron: "40 – 75 micron", note: "Grains, pulses and dry goods by weight." },
      { product: "Zip lock bags", slug: "zip-lock", micron: "50 – 75 micron", note: "Reclosable retail packs for spices, nuts and snacks." },
      { product: "Gusset bags", slug: "gusset", micron: "50 – 100 micron", note: "Bulk packs and carton liners that need to stand square." },
    ],
    specNote: "Tell us the pack weight and whether it is dry, oily or moist — those three answers set the specification.",
    products: ["plain", "zip-lock", "gusset"],
  },
  {
    slug: "ecommerce-courier",
    name: "E-commerce & Courier Packaging",
    short: "E-commerce & courier",
    image: "/img/industry-ecommerce-courier.webp",
    reader: "Operations and packaging leads",
    tagline: "Survives the network, carries your brand",
    intro: [
      "A courier bag has a hard life: sorted by machine, thrown into a sack, stacked under heavier parcels, and handled by people who are paid by the parcel. It has to arrive intact, and increasingly it has to arrive looking like something.",
      "The failure mode is almost always the same — abrasion at the corners and a split at the seal. Both are thickness and material problems, and both are cheap to fix at specification stage.",
    ],
    concerns: [
      { title: "Transit strength", body: "LLDPE gives markedly better puncture and tear resistance than plain LDPE at the same micron — which is exactly what a sorting network tests." },
      { title: "Opaque by default", body: "A courier bag should not advertise its contents. Opaque film is standard for us, not an upgrade." },
      { title: "Brand on the bag", body: "Two-colour print in-house — the first physical touchpoint your customer has with you." },
      { title: "Label adhesion", body: "The outer surface takes a thermal shipping label cleanly and holds it through the network." },
    ],
    recommended: [
      { product: "Coloured polybags", slug: "coloured", micron: "50 – 75 micron", note: "Opaque courier bags, colour-coded by channel if useful." },
      { product: "Printed polybags", slug: "printed", micron: "50 – 75 micron", note: "Branded mailers carrying your logo and returns note." },
      { product: "LD / HD custom sizes", slug: "custom-sizes", micron: "40 – 100 micron", note: "Sized to your top three SKU dimensions." },
    ],
    specNote: "Most D2C sellers run two or three bag sizes covering 80% of orders. Tell us your top SKUs and we will work out what those sizes should be.",
    products: ["coloured", "printed", "custom-sizes"],
  },
  {
    slug: "industrial-hardware",
    name: "Industrial & Hardware Packaging",
    short: "Industrial & hardware",
    image: "/img/industry-industrial-hardware.webp",
    reader: "Stores and dispatch managers",
    tagline: "Sharp, heavy, oily — the hard cases",
    intro: [
      "Fasteners, castings, gears and machined components are the worst thing you can put in a polybag: heavy, angular and often oily. A bag specified for garments will be through at the corner before it leaves the stores.",
      "This is where LLDPE earns its price. Its puncture and tear resistance is meaningfully better than LDPE at the same thickness, which means a thinner, cheaper bag can outperform the thicker one you are currently buying.",
    ],
    concerns: [
      { title: "Puncture resistance", body: "LLDPE resists point loads from sharp edges far better than LDPE — the single most common industrial failure mode." },
      { title: "Load-rated thickness", body: "Specified from actual component weight, not from what was on the shelf. Our thickness advisor shows the working." },
      { title: "Oil and coolant", body: "Polyethylene is unaffected by machine oils and cutting fluid, so bagged components do not degrade the packaging." },
      { title: "Kit identification", body: "Colour-coded bags for kitting and line-side supply, so the wrong part is visible before it is fitted." },
    ],
    recommended: [
      { product: "Zip lock bags", slug: "zip-lock", micron: "60 – 100 micron", note: "Fastener and spares kitting, reclosable for partial issue." },
      { product: "Gusset bags", slug: "gusset", micron: "75 – 150 micron", note: "Bulk components and carton liners." },
      { product: "LD / HD custom sizes", slug: "custom-sizes", micron: "50 – 200 micron", note: "Heavy or awkward components sized individually." },
    ],
    specNote: "Send us the heaviest and sharpest component you bag. We will specify for that, and everything lighter is covered.",
    products: ["zip-lock", "gusset", "custom-sizes"],
  },
  {
    slug: "general-purpose",
    name: "General Purpose Packaging",
    short: "General purpose",
    image: "/img/industry-general-purpose.webp",
    reader: "Purchase and admin",
    tagline: "The bags every unit needs, without the runaround",
    intro: [
      "Not every requirement needs an engineering discussion. Stationery, tools, documents, spares, samples, stores issue — most units get through a surprising quantity of ordinary bags, and mostly buy them badly: whatever the last vendor had, at whatever rate was quoted.",
      "Stock sizes ship from us quickly and consistently, at a rate that does not change every time you call. If that is all you need, this is the easiest thing we do.",
    ],
    concerns: [
      { title: "Available when you call", body: "Stock sizes held and dispatched in two to three working days across the belt." },
      { title: "One consistent rate", body: "Quoted per kilogram and held, so your purchase records make sense month to month." },
      { title: "Small quantities", body: "Fifty kilograms is a real order to us, not an inconvenience." },
      { title: "One supplier, many sizes", body: "Consolidate the four or five sizes your unit actually uses into a single order and a single invoice." },
    ],
    recommended: [
      { product: "Plain polybags", slug: "plain", micron: "25 – 60 micron", note: "The workhorse. Four stock sizes cover most requirements." },
      { product: "Zip lock bags", slug: "zip-lock", micron: "40 – 60 micron", note: "Small parts, samples and document control." },
      { product: "Coloured polybags", slug: "coloured", micron: "40 – 75 micron", note: "Departmental colour coding and waste segregation." },
    ],
    specNote: "Send us a list of what you currently buy and how much. We will quote it as one consolidated order.",
    products: ["plain", "zip-lock", "coloured"],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
