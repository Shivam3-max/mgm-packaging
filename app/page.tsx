import Image from "next/image";
import Link from "next/link";
import FilmHero from "@/components/FilmHero";
import Marquee from "@/components/Marquee";
import VideoBlock from "@/components/VideoBlock";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import Counter from "@/components/Counter";
import { ProductCard, IndustryCard, SectionHead } from "@/components/Cards";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { PROCESS, DOWNGAUGE_NOTE } from "@/data/content";
import { SITE, BBN, VIDEO } from "@/data/company";

const TOOLS = [
  { href: "/tools/calculator", name: "Bag weight & cost", desc: "Size and micron in, bags per kilo and cost per bag out. The conversion nobody makes easy.", flag: "Most used" },
  { href: "/tools/thickness", name: "Micron · gauge · mil", desc: "Convert all three, and get a recommended thickness from what the bag has to hold." },
  { href: "/tools/material", name: "Material selector", desc: "Four questions, then LD, LLD or HD — with the trade-off explained." },
  { href: "/tools/size-finder", name: "Bag size finder", desc: "Product dimensions in, bag size out, with seal and headspace allowance added." },
  { href: "/tools/compliance-check", name: "Compliance checker", desc: "Does the 120-micron rule apply to your bag? Three questions." },
  { href: "/tools/print-estimator", name: "Print estimator", desc: "Colours, coverage and artwork checklist — turns \"can you print our logo\" into a spec." },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative isolate overflow-hidden" style={{ background: "var(--navy-deep)" }}>
        <FilmHero />

        <div className="wrap relative z-10 grid items-center gap-14 pb-16 pt-14 md:min-h-[clamp(560px,74vh,760px)] md:grid-cols-12 md:pb-24 md:pt-20">
          <div className="md:col-span-7 lg:col-span-6">
            <Reveal className="grid gap-6">
              <p className="spec" style={{ color: "var(--lime)" }}>
                Barotiwala · Baddi · Himachal Pradesh
              </p>

              <h1 className="display text-[clamp(2.6rem,7vw,4.9rem)] text-white">
                Packaging today.
                <br />
                <span style={{ color: "var(--lime)" }}>Protecting tomorrow.</span>
              </h1>

              <p className="max-w-[46ch] text-[1.06rem] leading-relaxed text-on-dark-2">
                LLDPE polybags made inside the Baddi belt — plain, printed, zip lock,
                gusset and coloured, in any size from {SITE.micronMin} to {SITE.micronMax} micron.
                Close enough to deliver the same day, and specific enough to quote in microns.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link href="/rfq" className="btn btn--lime">Request a quote</Link>
                <Link href="/samples" className="btn btn--ghost-dark">Get free samples</Link>
              </div>

              <dl className="mt-4 grid max-w-lg grid-cols-3 gap-6 border-t pt-6"
                  style={{ borderColor: "rgba(255,255,255,.16)" }}>
                {[
                  { v: <><Counter to={SITE.micronMax} />μ</>, l: "maximum thickness" },
                  { v: <><Counter to={6} /></>, l: "bag types" },
                  { v: <><Counter to={SITE.capacityKgDay} />kg</>, l: "a day" },
                ].map((s, idx) => (
                  <div key={idx}>
                    <dd className="display-md text-[1.6rem] text-white md:text-[1.9rem]">{s.v}</dd>
                    <dt className="spec mt-1" style={{ color: "var(--on-dark-3)" }}>{s.l}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* the product, photographed */}
          <div className="relative hidden md:col-span-5 md:block lg:col-span-6">
            <Reveal delay={200} className="relative ml-auto max-w-[440px]">
              <div className="film-stack">
                <div className="film-stack-inner overflow-hidden">
                  <Image
                    src="/img/hero-rolls.webp"
                    alt="LLDPE film rolls produced at MGM Packaging"
                    width={880}
                    height={883}
                    priority
                    className="h-auto w-full"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3">
                    <p className="spec spec--navy">LLDPE film · virgin granule</p>
                    <p className="spec">{SITE.micronMin}–{SITE.micronMax} micron</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ═══════════════════════ THE FILM LINE ═══════════════════════ */}
      <section className="section--tight pt-14 md:pt-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <VideoBlock
              src={VIDEO.src || undefined}
              poster={VIDEO.poster || undefined}
              label={VIDEO.label}
              caption={VIDEO.caption}
            />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <p className="spec spec--lime">See it running</p>
            <h2 className="display-md mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)]">
              A supplier you can watch work.
            </h2>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-2">
              Most packaging is bought from a photograph and a rate. We would rather
              you saw the line — the granule going in, the film coming off the die,
              the seal being made. It tells you more about a supplier than any
              brochure can.
            </p>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-2">
              And if the film is not enough, the unit is a short drive from most of
              the belt. Come and stand next to it.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/quality" className="btn btn--primary">How we make it</Link>
              <Link href="/contact" className="btn">Arrange a visit</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ THE BELT ═══════════════════════ */}
      <section className="section micron-grid">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Why buy from Barotiwala"
              title={<>Your polybags shouldn&apos;t travel further than you do.</>}
            />
            <div className="measure mt-6 grid gap-4 text-[1rem] leading-relaxed text-ink-2">
              <p>
                A polybag is the worst thing you can put on a truck: bulky, light and
                cheap. Freight from Delhi or Ahmedabad eats the saving before the
                pallet is unloaded, and adds a week you did not budget for.
              </p>
              <p>
                We are inside the Baddi–Barotiwala–Nalagarh belt, where{" "}
                <strong className="text-ink">{BBN.industrialUnits} industrial units</strong> —
                including <strong className="text-ink">{BBN.pharmaUnits} pharmaceutical plants</strong>,
                Asia&apos;s largest such cluster — run every day. Most of our customers
                are a short drive away.
              </p>
              <p>
                That is not a marketing advantage. It is arithmetic: lower landed cost,
                samples in days, and a supplier your stores team can physically visit
                when a line is down.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/about" className="btn btn--primary">About the unit</Link>
              <Link href="/contact" className="btn">Find us</Link>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal group className="grid gap-3 sm:grid-cols-2">
              {[
                { v: BBN.industrialUnits, l: "industrial units in the BBN belt" },
                { v: BBN.pharmaUnits, l: "pharmaceutical units — Asia's largest cluster" },
                { v: BBN.fmcgUnits, l: "FMCG companies, plus 80+ herbal and nutraceutical" },
                { v: BBN.workers, l: "people working in the corridor" },
              ].map((s) => (
                <div key={s.l} className="card p-6">
                  <p className="display-md text-[2.1rem]" style={{ color: "var(--navy)" }}>{s.v}</p>
                  <p className="mt-1.5 text-[.92rem] leading-relaxed text-ink-2">{s.l}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={120} className="mt-3">
              <div className="dark-block rounded-[var(--r)] p-6 sm:p-7">
                <p className="spec" style={{ color: "var(--lime)" }}>What that means for you</p>
                <p className="mt-3 text-[1rem] leading-relaxed text-on-dark-2">
                  Stock sizes reach most of the belt in{" "}
                  <strong className="text-white">{SITE.leadTimeStock}</strong>. Samples go out
                  free. {SITE.freeDeliveryNote}. And if something is wrong with a batch,
                  you can be standing on our floor the same morning.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* ═══════════════════════ RANGE ═══════════════════════ */}
      <section className="section">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="The range"
              title="Six bags, and an honest answer about which one you need"
              lede="Every product page says what the bag is for — and what it is not for. If a plain bag would serve you better than a printed one, we would rather tell you now than lose you later."
            />
            <Link href="/products" className="btn shrink-0">All products</Link>
          </Reveal>

          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} p={p} priority={i < 3} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ WHY LLDPE ═══════════════════════ */}
      <section className="section dark-block" style={{ background: "var(--navy)" }}>
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHead
              onDark
              eyebrow="The material"
              title={<>LLDPE lets you buy a thinner bag that works harder.</>}
            />
            <div className="measure mt-6 grid gap-4 text-[1rem] leading-relaxed text-on-dark-2">
              <p>
                Linear low-density polyethylene has meaningfully higher tensile strength
                and far better puncture and tear resistance than ordinary LDPE. In a
                warehouse that translates into one thing: the bag survives handling.
              </p>
              <p>{DOWNGAUGE_NOTE}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/why-lldpe" className="btn btn--lime">Compare the materials</Link>
              <Link href="/tools/material" className="btn btn--ghost-dark">Which do I need?</Link>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal group className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Durable & strong", d: "High tensile strength and real puncture resistance — the two properties a packing line actually tests." },
                { t: "Premium quality", d: "100% virgin film-grade granule. No recycled content, no unknown additives, no surprises in a seal." },
                { t: "Moisture resistant", d: "A genuine moisture barrier, which matters in a region that swings from dry to monsoon." },
                { t: "100% recyclable", d: "Single-material polyethylene, resin code 4 — no laminate layers to separate before recovery." },
              ].map((f) => (
                <div
                  key={f.t}
                  className="rounded-[var(--r)] p-5"
                  style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.13)" }}
                >
                  <h3 className="display-sm text-[1rem] text-white">{f.t}</h3>
                  <p className="mt-2 text-[.9rem] leading-relaxed text-on-dark-2">{f.d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ INDUSTRIES ═══════════════════════ */}
      <section className="section">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Who we supply"
              title="Six industries, six different definitions of a good bag"
              lede="A garment exporter and a QA head mean completely different things by “moisture resistant”. Each page below is written for the person who actually signs off the packaging."
            />
            <Link href="/industries" className="btn shrink-0">All industries</Link>
          </Reveal>

          <Reveal group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <IndustryCard key={i.slug} i={i} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ PROCESS ═══════════════════════ */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="How it's made"
              title="Granule to gusset"
              lede="Five steps, and the one thing that matters most at each. The full sequence — with the film line running — is on the quality page."
            />
          </Reveal>

          <Reveal group className="mt-10 grid gap-px overflow-hidden rounded-[var(--r)] border border-hairline"
                  style={{ background: "var(--hairline)" }}>
            {PROCESS.map((s) => (
              <div key={s.no} className="grid gap-3 bg-surface p-6 md:grid-cols-12 md:gap-6 md:p-7">
                <div className="md:col-span-2">
                  <p className="spec spec--lime">{s.no}</p>
                  <h3 className="display-sm mt-1.5 text-[1.05rem]">{s.title}</h3>
                </div>
                <p className="display-sm text-[1rem] text-ink md:col-span-4" style={{ fontWeight: 600 }}>
                  {s.lede}
                </p>
                <p className="text-[.93rem] leading-relaxed text-ink-2 md:col-span-5">{s.body}</p>
                <p className="spec md:col-span-1 md:text-right">{s.spec}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-8">
            <Link href="/quality" className="btn btn--primary">See the full process</Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ TOOLS ═══════════════════════ */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="Buyer tools"
              title={<>Polybags are sold by the kilo <em style={{ fontStyle: "normal", color: "var(--lime-ink)" }}>and used by the piece.</em></>}
              lede="That conversion is the single most common source of confusion in this trade, and almost nobody makes it easy. These six tools are free, they need no sign-up, and they carry your numbers straight into a quote request."
            />
          </Reveal>

          <Reveal group className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t, i) => (
              <Link key={t.href} href={t.href} className="card card--hover group grid content-start gap-2.5 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="spec spec--lime">{String(i + 1).padStart(2, "0")}</span>
                  {t.flag && <span className="tag tag--lime">{t.flag}</span>}
                </div>
                <h3 className="display-sm text-[1.05rem]">{t.name}</h3>
                <p className="text-[.89rem] leading-relaxed text-ink-2">{t.desc}</p>
                <span className="spec spec--navy pt-1 transition-transform duration-300 group-hover:translate-x-1">
                  Open →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="dark-block--deep dark-block relative overflow-hidden rounded-[var(--r-lg)] px-6 py-12 sm:px-12 sm:py-16">
              <div className="micron-grid pointer-events-none absolute inset-0 opacity-[.35]" />
              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="spec" style={{ color: "var(--lime)" }}>Start with samples</p>
                  <h2 className="display-md mt-3 text-[clamp(1.7rem,3.6vw,2.6rem)] text-white">
                    Hold the bag before you buy a hundred kilos of it.
                  </h2>
                  <p className="measure mt-4 text-[1.02rem] leading-relaxed text-on-dark-2">
                    Tell us what you pack and we will send samples in the sizes and thicknesses
                    that actually suit it — free, anywhere in the BBN belt. No commitment,
                    and no salesperson calling you every week afterwards.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-5 lg:justify-self-end lg:w-full lg:max-w-[300px]">
                  <Link href="/samples" className="btn btn--lime w-full">Request free samples</Link>
                  <Link href="/rfq" className="btn btn--ghost-dark w-full">Get a quote instead</Link>
                  <a
                    href={`tel:${SITE.partners[0].phoneIntl}`}
                    className="spec mt-1 text-center"
                    style={{ color: "var(--on-dark-2)" }}
                  >
                    Or call {SITE.partners[0].phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
