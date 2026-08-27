/* ============================================================================
   MGM PACKAGING — single source of truth for company facts.
   ----------------------------------------------------------------------------
   CONFIRMED  = taken directly from the MGM brochure artwork.
   ASSUMED    = plausible placeholder. Change the value here and it updates
                everywhere on the site. See ASSUMPTIONS.md at the project root
                for the full list and what to ask the partners.
   ============================================================================ */

export const SITE = {
  /* CONFIRMED — from brochure */
  name: "MGM Packaging",
  legalName: "MGM Packaging",
  tagline: "Packaging Today… Protecting Tomorrow…",
  taglineShort: "Packaging today. Protecting tomorrow.",
  strapline: "Stronger · Safer · Smarter Packaging",
  descriptor: "LLDPE Polybags",
  promise: "Premium Quality Packaging Solutions",

  /* CONFIRMED — from brochure */
  address: {
    line1: "Khasra No. 454",
    line2: "Barotiwala, Baddi",
    district: "Solan",
    state: "Himachal Pradesh",
    pin: "174101",
    full: "Khasra No. 454, Barotiwala, Baddi, Solan (HP) 174101",
  },
  email: "mgmpackaging1@gmail.com",

  /* CONFIRMED — from brochure */
  partners: [
    {
      name: "Ashwani Thakur",
      role: "Partner — Production & Quality",   // ASSUMED: split of responsibility
      phone: "70184-36419",
      phoneIntl: "+917018436419",
      whatsapp: "917018436419",
      handles: "New enquiries, custom sizes, samples and technical specification.",
    },
    {
      name: "Sanjeev Guleria",
      role: "Partner — Commercial & Dispatch",  // ASSUMED: split of responsibility
      phone: "70183-17629",
      phoneIntl: "+917018317629",
      whatsapp: "917018317629",
      handles: "Pricing, repeat orders, scheduling and dispatch.",
    },
  ],

  /* ASSUMED — confirm all of the following with the partners */
  founded: 2018,
  employees: "20+",
  capacityKgDay: 1200,
  capacityTonnesMonth: 30,
  extruders: 2,
  sealingMachines: 4,
  printingStations: 1,
  printColours: 2,
  printingInHouse: true,
  micronMin: 15,
  micronMax: 200,
  maxBagWidthInch: 40,
  moqKg: 50,
  leadTimeStock: "2–3 working days",
  leadTimeCustom: "5–7 working days",
  leadTimePrinted: "7–10 working days",
  paymentTerms: "50% advance, balance against dispatch",
  deliveryRadiusKm: 60,
  freeDeliveryNote: "Free delivery across the BBN belt on orders above 200 kg",
  workingHours: "Monday to Saturday, 9:00 am – 7:00 pm",
  responseTime: "within 4 working hours",

  /* ASSUMED — no third-party certification is claimed anywhere on the site.
     These are material and process statements, not audited certifications.
     If MGM holds ISO 9001 / GMP / any audited certificate, add it to
     `certifications` below and the trust sections will render it.          */
  certifications: [] as { name: string; body: string; note: string }[],

  materialClaims: [
    "100% virgin LLDPE granules — no recycled or reprocessed content",
    "Film grade conforming to IS 10146 for food, pharmaceutical and drinking-water contact",
    "Additives restricted to the IS 10141 positive list",
  ],

  /* ASSUMED — registration identifiers deliberately left blank rather than
     invented. Fill these in and they appear in the footer automatically.   */
  gstin: "",
  udyam: "",

  /* Derived / editorial */
  serviceArea: ["Baddi", "Barotiwala", "Nalagarh", "Parwanoo", "Solan", "Chandigarh & Panchkula", "Mohali & Dera Bassi"],
  domain: "mgmpackaging.in",   // ASSUMED — confirm the domain
} as const;

/* ————— BBN market context. Sourced figures, used in copy. ————— */
export const BBN = {
  industrialUnits: "2,150+",
  pharmaUnits: "700+",
  fmcgUnits: "150+",
  herbalUnits: "80+",
  workers: "100,000+",
  formulationShare: "over a quarter",
  note: "Published reporting on the Baddi–Barotiwala–Nalagarh industrial corridor.",
} as const;

/* ————— drive times from the unit. ASSUMED — verify against Maps. ————— */
export const DRIVE_TIMES = [
  { place: "Barotiwala",            mins: 5,   km: 2 },
  { place: "Baddi industrial area", mins: 15,  km: 9 },
  { place: "Nalagarh",              mins: 30,  km: 20 },
  { place: "Parwanoo",              mins: 45,  km: 30 },
  { place: "Panchkula / Chandigarh",mins: 60,  km: 40 },
  { place: "Mohali / Dera Bassi",   mins: 75,  km: 52 },
] as const;

export const NAV = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Plain polybags",       href: "/products/plain" },
      { label: "Printed polybags",     href: "/products/printed" },
      { label: "Zip lock bags",        href: "/products/zip-lock" },
      { label: "Gusset bags",          href: "/products/gusset" },
      { label: "LD / HD custom sizes", href: "/products/custom-sizes" },
      { label: "Coloured polybags",    href: "/products/coloured" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Garment & textile",     href: "/industries/garment-textile" },
      { label: "Food & grocery",        href: "/industries/food-grocery" },
      { label: "Pharmaceutical",        href: "/industries/pharmaceutical" },
      { label: "Industrial & hardware", href: "/industries/industrial-hardware" },
      { label: "E-commerce & courier",  href: "/industries/ecommerce-courier" },
      { label: "General purpose",       href: "/industries/general-purpose" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "Bag weight & cost",    href: "/tools/calculator" },
      { label: "Micron · gauge · mil", href: "/tools/thickness" },
      { label: "Material selector",    href: "/tools/material" },
      { label: "Bag size finder",      href: "/tools/size-finder" },
      { label: "Compliance checker",   href: "/tools/compliance-check" },
      { label: "Print estimator",      href: "/tools/print-estimator" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About MGM",       href: "/about" },
      { label: "How we make it",  href: "/quality" },
      { label: "Why LLDPE",       href: "/why-lldpe" },
      { label: "Plastic rules",   href: "/compliance" },
      { label: "Downloads",       href: "/downloads" },
      { label: "FAQ",             href: "/faq" },
    ],
  },
] as const;

export const TICKER = [
  "100% virgin LLDPE granules",
  "Barotiwala, Baddi — inside the BBN belt",
  "Custom sizes from 15 to 200 micron",
  "In-house printing",
  "Same-belt delivery",
  "Plain · printed · zip lock · gusset · coloured",
  "Free samples across BBN",
] as const;

export function waLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
