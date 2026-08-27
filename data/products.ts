export interface SizeRow { size: string; micron: string; use: string }

export interface Product {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  image: string;
  /** one-line answer to "what is this for?" */
  bestFor: string;
  intro: string[];
  /** the honest trade-off — what this bag is NOT for */
  notFor: string;
  features: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  sizes: SizeRow[];
  industries: string[];
  /** 3D anatomy callouts */
  anatomy: { label: string; note: string }[];
  faq: { q: string; a: string }[];
}

export const products: Product[] = [
  {
    slug: "plain",
    name: "Plain Polybags",
    short: "Plain",
    tagline: "The everyday bag, made properly",
    image: "/img/product-plain.webp",
    bestFor: "High-volume packing where clarity and consistent thickness matter more than branding.",
    intro: [
      "A plain LLDPE bag is the most honest product we make: there is nothing to hide behind. No print to distract from a thin patch, no zip to disguise a weak seal. What you are buying is film quality and gauge consistency, and that is exactly what we compete on.",
      "We run plain bags from 100% virgin LLDPE granules on a controlled thickness profile. That matters more than it sounds — an underweight bag that measures 45 micron where it should be 50 is a 10% shortfall you pay for on every kilogram, and you only discover it when bags start splitting on the packing line.",
    ],
    notFor: "If your contents are sharp-edged and heavy, ask about a gusset bag or a higher micron before defaulting to plain.",
    features: [
      { title: "Consistent gauge", body: "Thickness held to a tight profile across the web, so the bag you test is the bag you get on the thousandth piece." },
      { title: "High clarity", body: "Virgin granules and a clean die give film you can actually read a label through — important for stores and dispatch scanning." },
      { title: "Clean bottom seal", body: "A straight, fully-fused bottom seal with no thinning at the edges, which is where cheap bags fail first." },
      { title: "Any size", body: "Stock sizes ship immediately; custom sizes are cut to your product rather than the other way round." },
    ],
    specs: [
      { label: "Material", value: "100% virgin LLDPE" },
      { label: "Thickness", value: "15 – 200 micron (60 – 800 gauge)" },
      { label: "Seal", value: "Bottom seal, side seal on request" },
      { label: "Clarity", value: "High clarity natural" },
      { label: "Finish", value: "Plain, unprinted" },
      { label: "Packing", value: "Bundled in 1 kg / 5 kg packs, or loose in cartons" },
    ],
    sizes: [
      { size: '8" × 10"',  micron: "25 – 50",  use: "Small components, garments, documents" },
      { size: '10" × 12"', micron: "30 – 60",  use: "General purpose, retail packing" },
      { size: '12" × 16"', micron: "40 – 75",  use: "Folded garments, mid-weight goods" },
      { size: '14" × 20"', micron: "50 – 100", use: "Bulk packing, dispatch" },
      { size: "Custom",    micron: "15 – 200", use: "Cut to your product dimensions" },
    ],
    industries: ["garment-textile", "industrial-hardware", "general-purpose"],
    anatomy: [
      { label: "Open mouth", note: "Cut square and clean — no ragged edge to catch on an operator's glove." },
      { label: "Film wall", note: "Single-layer LLDPE at your specified micron, consistent across the width." },
      { label: "Bottom seal", note: "Fully fused weld, tested for peel rather than just eyeballed." },
    ],
    faq: [
      { q: "What is the minimum order?", a: "50 kg for stock sizes. For a custom size we usually ask for 100 kg so the setup is worth running." },
      { q: "Can I get a sample before ordering?", a: "Yes — we send a free sample pack anywhere in the BBN belt, usually the same week." },
    ],
  },
  {
    slug: "printed",
    name: "Printed Polybags",
    short: "Printed",
    tagline: "Your brand, on the first thing they touch",
    image: "/img/product-printed.webp",
    bestFor: "Retail, D2C and dispatch packing where the bag is part of the brand experience.",
    intro: [
      "The bag is often the first physical thing a customer touches. A printed polybag turns a packing cost into a brand asset, and for e-commerce sellers it does double duty — logo on one side, care instructions or a returns note on the other.",
      "We print in-house, which matters for two reasons: your artwork does not sit in a queue at a third party, and if the registration drifts we stop the line rather than shipping it. Turnaround for printed stock is measured in days, not weeks.",
    ],
    notFor: "Very small runs. Below about 100 kg the cylinder setup dominates the cost and a plain bag with a label is usually the cheaper answer — we will tell you so.",
    features: [
      { title: "In-house printing", body: "Up to two colours, printed on our own line. No third-party queue, no surprise lead times." },
      { title: "Artwork support", body: "Send a logo in almost any format — we will convert it, position it and send back a proof before we run anything." },
      { title: "Registration held", body: "Print position stays put across the run, so bag one thousand looks like bag one." },
      { title: "Food-safe inks", body: "Print sits on the outer face; the inner contact surface stays clean virgin film." },
    ],
    specs: [
      { label: "Material", value: "100% virgin LLDPE" },
      { label: "Thickness", value: "25 – 150 micron (100 – 600 gauge)" },
      { label: "Print", value: "Up to 2 colours, flexographic" },
      { label: "Print area", value: "Up to 80% of one or both faces" },
      { label: "Artwork", value: "AI, EPS, PDF, PNG or SVG — we will redraw if needed" },
      { label: "Proof", value: "Digital proof before every first run" },
    ],
    sizes: [
      { size: '10" × 12"', micron: "40 – 60",  use: "Retail and D2C dispatch" },
      { size: '12" × 16"', micron: "50 – 75",  use: "Apparel, mid-size goods" },
      { size: '14" × 20"', micron: "50 – 100", use: "Bulk retail, courier" },
      { size: "Custom",    micron: "25 – 150", use: "Any size, any print position" },
    ],
    industries: ["garment-textile", "ecommerce-courier", "food-grocery"],
    anatomy: [
      { label: "Print face", note: "Up to two colours, outer surface only — the food-contact face stays unprinted." },
      { label: "Repeat length", note: "Set by the cylinder; it determines your bag length, so we match them at quoting stage." },
      { label: "Bleed margin", note: "We hold a clear margin at the seal so heat never runs through printed ink." },
    ],
    faq: [
      { q: "How many colours can you print?", a: "Two as standard. If you need more, tell us at enquiry stage and we will be straight with you about whether we should be the ones to run it." },
      { q: "Do I pay for the cylinder every time?", a: "No. The cylinder is a one-time cost per design and we keep it for your repeat orders." },
    ],
  },
  {
    slug: "zip-lock",
    name: "Zip Lock Bags",
    short: "Zip lock",
    tagline: "Reclosable, and it stays closed",
    image: "/img/product-ziplock.webp",
    bestFor: "Anything opened and reclosed repeatedly — samples, spares, dispensing, retail packs.",
    intro: [
      "A zip lock bag lives or dies on the track. A soft or shallow profile feels fine on the first close and fails on the twentieth, which is precisely when your customer notices. We run a proper interlocking profile with an audible close.",
      "For pharmaceutical and laboratory use the zip does something else useful: it gives a tamper-evident state. A bag that has been opened does not go back to looking factory-sealed.",
    ],
    notFor: "Heavy or sharp contents. The zip track is not a load-bearing structure — if the bag is going to be lifted by its top, specify a gusset bag or a higher micron body.",
    features: [
      { title: "Positive close", body: "An interlocking track you can hear engage, held through repeated open-close cycles." },
      { title: "Full-width track", body: "The zip runs the entire bag width so there is no unsealed corner at either end." },
      { title: "Clear body", body: "High clarity so contents identify at a glance — critical in stores and dispensing." },
      { title: "Optional lip", body: "A tear-notch or extended lip above the track, for easier opening with gloves on." },
    ],
    specs: [
      { label: "Material", value: "100% virgin LLDPE" },
      { label: "Thickness", value: "40 – 125 micron (160 – 500 gauge)" },
      { label: "Closure", value: "Interlocking zip track, full width" },
      { label: "Options", value: "Plain or printed, tear notch, hang hole, write-on panel" },
      { label: "Seal", value: "Three-side sealed with top zip" },
      { label: "Clarity", value: "High clarity natural" },
    ],
    sizes: [
      { size: '4" × 6"',   micron: "40 – 50",  use: "Small parts, tablets, samples" },
      { size: '6" × 8"',   micron: "40 – 60",  use: "Spares, electronics, sachets" },
      { size: '8" × 10"',  micron: "50 – 75",  use: "General retail, dispensing" },
      { size: '10" × 12"', micron: "50 – 100", use: "Larger contents, kits" },
      { size: "Custom",    micron: "40 – 125", use: "Cut to your product" },
    ],
    industries: ["pharmaceutical", "industrial-hardware", "food-grocery", "general-purpose"],
    anatomy: [
      { label: "Zip track", note: "Male and female profiles extruded to interlock — the part cheap bags get wrong." },
      { label: "Lip", note: "The grip above the track. We can extend it if your operators wear gloves." },
      { label: "Side seals", note: "Sealed through the track at both ends so nothing escapes the corners." },
      { label: "Body film", note: "Specified independently of the zip — a thicker body does not need a thicker track." },
    ],
    faq: [
      { q: "Are these suitable for pharmaceutical use?", a: "The film is virgin LLDPE conforming to IS 10146 for pharmaceutical contact. Tell us the application at enquiry stage and we will confirm the right specification in writing." },
      { q: "Can you print on a zip lock bag?", a: "Yes, up to two colours, with a clear margin held around the track." },
    ],
  },
  {
    slug: "gusset",
    name: "Gusset Bags",
    short: "Gusset",
    tagline: "Depth, so the bag fits the box",
    image: "/img/product-gusset.webp",
    bestFor: "Bulky or three-dimensional contents that a flat bag would strain around.",
    intro: [
      "A flat bag around a boxy product does two bad things: it stresses the side seals, and it wastes space in the carton because the bag will not sit square. A gusset solves both. The side folds open out to give the bag real depth, so it takes the shape of what is inside it.",
      "Gussets are also how you line a drum or a carton. A side-gusseted liner opens to the full internal dimension and sits flat against the walls instead of bunching — which is why the pharmaceutical units around us buy them by the thousand.",
    ],
    notFor: "Thin, flat items. You will pay for film you do not need — a plain bag is the right answer there.",
    features: [
      { title: "Side or bottom gusset", body: "Side gussets for depth on a standing bag; bottom gussets for a flat base that lets the bag stand up." },
      { title: "Squares up properly", body: "Opens to the full specified depth so cartons pack tight and pallets stack straight." },
      { title: "Drum and carton liners", body: "Cut to the internal dimension of your drum or carton, in food and pharma grade film." },
      { title: "Higher effective strength", body: "Load spreads across four walls instead of two, so seams see less stress at the same micron." },
    ],
    specs: [
      { label: "Material", value: "100% virgin LLDPE" },
      { label: "Thickness", value: "30 – 200 micron (120 – 800 gauge)" },
      { label: "Gusset type", value: "Side gusset or bottom gusset" },
      { label: "Gusset depth", value: "2\" – 12\", specified to your carton" },
      { label: "Seal", value: "Bottom seal; box-bottom on request" },
      { label: "Applications", value: "Drum liners, carton liners, bulk transfer" },
    ],
    sizes: [
      { size: '10" × 14" × 4" gusset', micron: "50 – 75",   use: "Boxed goods, retail" },
      { size: '12" × 18" × 6" gusset', micron: "50 – 100",  use: "Bulk components" },
      { size: '16" × 24" × 8" gusset', micron: "75 – 150",  use: "Carton liners" },
      { size: "Drum liner",            micron: "100 – 200", use: "200 L drums, pharma transfer" },
      { size: "Custom",                micron: "30 – 200",  use: "Cut to internal dimension" },
    ],
    industries: ["pharmaceutical", "food-grocery", "industrial-hardware"],
    anatomy: [
      { label: "Side gusset", note: "The M-fold. It opens out to give the bag its depth — and it is the shape in our logo." },
      { label: "Gusset depth", note: "Measured flat, but it opens to twice this. We size it to your carton's internal dimension." },
      { label: "Bottom seal", note: "Runs through four layers of film at the gusset, so it needs more dwell time than a plain seal." },
      { label: "Effective width", note: "Flat width plus gusset — this is what the weight calculation uses, and why gusset bags cost more per piece." },
    ],
    faq: [
      { q: "How do I measure a gusset?", a: "Lay the bag flat and measure one side fold. That is the gusset depth — it opens to double that. Our size finder tool does the arithmetic for you." },
      { q: "Can you match our existing drum liner?", a: "Send us one. We will measure it, match the film and the dimensions, and quote against it." },
    ],
  },
  {
    slug: "custom-sizes",
    name: "LD / HD Custom Sizes",
    short: "Custom sizes",
    tagline: "Cut to your product, not to a catalogue",
    image: "/img/product-custom-sizes.webp",
    bestFor: "Anyone currently buying a stock size that is slightly wrong and paying for the difference.",
    intro: [
      "Most packing lines run a stock bag that is close enough. Close enough has a cost: every inch of excess film is film you bought and will throw away, on every unit, forever. At meaningful volumes, sizing a bag properly pays for the setup within weeks.",
      "We run LD, LLD and HD film so the material can be chosen for the job rather than for what happens to be on the machine. Soft and clear, tough and puncture-resistant, or stiff and crinkly with a high strength-to-weight ratio — each has a right answer, and they are not interchangeable.",
    ],
    notFor: "One-off small quantities. Setup only makes sense from about 100 kg — below that, buy a stock size.",
    features: [
      { title: "Any dimension", body: "Width and length cut to your product, with the seal and headspace allowance calculated in." },
      { title: "Three materials", body: "LD for softness and clarity, LLD for puncture resistance and downgauging, HD for stiffness at low weight." },
      { title: "Downgauging advice", body: "LLDPE often holds the same strength at a lower micron. Fewer rupees and less plastic per bag — we will tell you when it applies." },
      { title: "Matched to a sample", body: "Send an existing bag and we will match the size, the gauge and the feel." },
    ],
    specs: [
      { label: "Materials", value: "LD, LLD, HD polyethylene" },
      { label: "Thickness", value: "15 – 200 micron (60 – 800 gauge)" },
      { label: "Max width", value: 'Up to 40" flat width' },
      { label: "Seal options", value: "Bottom seal, side seal, box bottom" },
      { label: "Setup", value: "One-time, retained for repeat orders" },
      { label: "Minimum", value: "About 100 kg for a new custom size" },
    ],
    sizes: [
      { size: '8" × 10"',  micron: "25 – 50",  use: "Stock — ships immediately" },
      { size: '10" × 12"', micron: "30 – 60",  use: "Stock — ships immediately" },
      { size: '12" × 16"', micron: "40 – 75",  use: "Stock — ships immediately" },
      { size: '14" × 20"', micron: "50 – 100", use: "Stock — ships immediately" },
      { size: "Your size",  micron: "15 – 200", use: "Cut to specification" },
    ],
    industries: ["industrial-hardware", "garment-textile", "pharmaceutical", "general-purpose"],
    anatomy: [
      { label: "Flat width", note: "Measured across the bag lying flat. Add gusset depth for the material calculation." },
      { label: "Length", note: "Mouth to bottom seal. Always allow headspace above your product for closing." },
      { label: "Seal allowance", note: "Roughly half an inch of the length is consumed by the seal itself." },
      { label: "Micron", note: "Chosen from load, sharpness and handling — not from what the last supplier happened to run." },
    ],
    faq: [
      { q: "What size do I actually need?", a: "Use our bag size finder — enter your product dimensions and it adds the seal and headspace allowance for you." },
      { q: "Which material should I pick?", a: "Our material selector asks four questions and recommends LD, LLD or HD with the reasoning shown." },
    ],
  },
  {
    slug: "coloured",
    name: "Coloured Polybags",
    short: "Coloured",
    tagline: "Sort by sight, or hide what's inside",
    image: "/img/product-coloured.webp",
    bestFor: "Colour-coded operations, light-sensitive contents, and dispatch where privacy matters.",
    intro: [
      "Colour is not decoration in a warehouse — it is an error-prevention system. Line operators sorting by colour make fewer mistakes than operators reading labels, and a colour-coded bag tells a picker they have the wrong item before it reaches the packing bench.",
      "Opaque film also does real work. Black and dark colours block light for photo-sensitive contents, and any opaque bag stops a courier bag advertising what is inside it — which for D2C and pharmaceutical dispatch is often the point.",
    ],
    notFor: "Anything that needs to be scanned or identified through the bag. Specify clear or a light tint instead.",
    features: [
      { title: "Colour coding", body: "Assign a colour per department, per shift, per SKU class. Fewer picking errors, faster sorting." },
      { title: "Opacity on demand", body: "From light tint to fully opaque — specified by what you need to hide or protect." },
      { title: "Light protection", body: "Black and dark film blocks light for photo-sensitive contents." },
      { title: "Consistent batches", body: "Masterbatch dosed to a fixed ratio so this month's blue matches last month's." },
    ],
    specs: [
      { label: "Material", value: "Virgin LLDPE with colour masterbatch" },
      { label: "Standard colours", value: "Black, blue, green, red, pink, yellow, white" },
      { label: "Thickness", value: "25 – 150 micron (100 – 600 gauge)" },
      { label: "Opacity", value: "Tinted translucent to fully opaque" },
      { label: "Custom colour", value: "Matched to a shade reference, from about 200 kg" },
      { label: "Print", value: "Up to 2 colours over the base" },
    ],
    sizes: [
      { size: '10" × 12"', micron: "40 – 60",  use: "Colour-coded picking" },
      { size: '12" × 16"', micron: "50 – 75",  use: "Dispatch, opaque courier" },
      { size: '14" × 20"', micron: "50 – 100", use: "Bulk sorting" },
      { size: "Custom",    micron: "25 – 150", use: "Any size, any colour" },
    ],
    industries: ["ecommerce-courier", "pharmaceutical", "industrial-hardware", "general-purpose"],
    anatomy: [
      { label: "Masterbatch", note: "Colour compounded into the melt, not printed on — so it cannot scuff off." },
      { label: "Opacity", note: "Controlled by pigment loading. More pigment means less light, and slightly less film strength." },
      { label: "Base film", note: "Still 100% virgin LLDPE underneath the colour." },
    ],
    faq: [
      { q: "Can you match our exact brand colour?", a: "Send a shade reference and we will match it. Custom shades usually need about 200 kg to be worth compounding." },
      { q: "Does colour weaken the bag?", a: "Heavy pigment loading costs a little strength. At normal loadings the difference is not measurable in use — we will flag it if your specification pushes it." },
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
