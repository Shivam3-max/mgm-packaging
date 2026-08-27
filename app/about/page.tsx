import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import Counter from "@/components/Counter";
import { SectionHead } from "@/components/Cards";
import { SITE, BBN, waLink } from "@/data/company";

export const metadata: Metadata = {
  title: "About MGM Packaging — Barotiwala, Baddi",
  description:
    "A two-partner LLDPE polybag unit at Khasra No. 454, Barotiwala, Baddi — inside the BBN industrial belt. What we run, what we will and won't claim, and who to call.",
};

const PRINCIPLES = [
  {
    t: "We quote per kilogram, and we hold it",
    d: "Polyethylene is bought and sold by weight at every stage. Quoting per bag hides the specification and lets a supplier quietly thin the film. We quote per kilogram, publish a calculator that converts it to a price per bag, and hold the rate between orders.",
  },
  {
    t: "We will tell you to buy less",
    d: "LLDPE frequently holds the same strength at a lower micron than LDPE. Saying so means selling fewer kilograms — but a customer who over-specifies on our advice and finds out later is a customer we lose entirely.",
  },
  {
    t: "We claim only what we can show you",
    d: "We hold no third-party quality certification today. Rather than imply one, we publish what gets checked and invite you to come and watch the line. If that is not enough for your audit, tell us — we would rather know.",
  },
  {
    t: "Virgin granule, every batch",
    d: "No recycled or reprocessed material. It carries unknown additives and an unknown thermal history, and it has no place in a bag that touches food or medicine.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <SectionHead
              eyebrow="About"
              title="A polybag unit in Barotiwala, run by the two people who answer the phone"
            />
            <div className="measure mt-6 grid gap-4 text-[1.02rem] leading-relaxed text-ink-2">
              <p>
                MGM Packaging makes LLDPE polybags at Khasra No. 454, Barotiwala — a few
                kilometres from Baddi, inside the industrial belt that produces{" "}
                {BBN.formulationShare} of India&apos;s formulation drugs.
              </p>
              <p>
                It is a small operation and we are not going to pretend otherwise. Two
                partners, {SITE.extruders} extrusion lines, {SITE.sealingMachines} sealing
                machines and in-house printing. What that buys you is a supplier who can
                actually change something when you ask — and who is close enough to fix a
                problem the same morning.
              </p>
              <p>
                Most of our customers are within half an hour of the unit. That is not an
                accident; it is the entire commercial logic of the business. Polybags are
                bulky, light and cheap, and freight destroys the economics. Being here is
                the advantage.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="film-stack">
              <div className="film-stack-inner overflow-hidden">
                <Image
                  src="/img/feature-bags-trio.webp"
                  alt="LLDPE bags produced at MGM Packaging, Barotiwala"
                  width={880}
                  height={892}
                  priority
                  className="h-auto w-full"
                />
                <div className="grid gap-1 border-t border-hairline px-5 py-4">
                  <p className="spec spec--navy">{SITE.address.line1}</p>
                  <p className="text-[.9rem] text-ink-2">
                    {SITE.address.line2}, {SITE.address.district} ({SITE.address.state}) {SITE.address.pin}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* numbers */}
      <section className="section--tight">
        <div className="wrap">
          <Reveal group className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: <Counter to={SITE.capacityKgDay} suffix=" kg" />, l: "a day, across both lines" },
              { v: <Counter to={SITE.micronMax} suffix="µ" />, l: `maximum thickness (from ${SITE.micronMin}µ)` },
              { v: <Counter to={SITE.maxBagWidthInch} suffix='"' />, l: "maximum flat width" },
              { v: <Counter to={SITE.moqKg} suffix=" kg" />, l: "minimum order" },
            ].map((s, i) => (
              <div key={i} className="card p-6">
                <p className="display-md text-[2rem]" style={{ color: "var(--navy)" }}>{s.v}</p>
                <p className="mt-1.5 text-[.9rem] leading-relaxed text-ink-2">{s.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="How we work"
              title="Four things we have decided to be strict about"
              lede="These are not values on a wall. Each one costs us something, which is the only reason any of them are worth stating."
            />
          </Reveal>

          <Reveal group className="mt-9 grid gap-3 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.t} className="card p-6 sm:p-7">
                <span className="spec spec--lime">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-sm mt-2 text-[1.1rem]">{p.t}</h3>
                <p className="mt-2.5 text-[.93rem] leading-relaxed text-ink-2">{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* partners */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="The partners"
              title="Who you will actually be dealing with"
            />
          </Reveal>

          <Reveal group className="mt-8 grid gap-4 md:grid-cols-2">
            {SITE.partners.map((p) => (
              <div key={p.name} className="card p-6 sm:p-7">
                <p className="spec spec--lime">{p.role}</p>
                <h3 className="display-md mt-2 text-[1.5rem]">{p.name}</h3>
                <p className="mt-2.5 text-[.94rem] leading-relaxed text-ink-2">{p.handles}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a href={`tel:${p.phoneIntl}`} className="btn">{p.phone}</a>
                  <a
                    href={waLink(p.whatsapp, `Hello ${p.name.split(" ")[0]} — I found MGM Packaging online.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--lime"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="dark-block--deep dark-block rounded-[var(--r-lg)] p-8 sm:p-12 text-center">
              <p className="display-md mx-auto max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.4rem)] text-white">
                {SITE.taglineShort}
              </p>
              <p className="measure mx-auto mt-4 text-[1rem] leading-relaxed text-on-dark-2">
                It is on every piece of our artwork, so we may as well be held to it. The bag
                protects what is inside it today, and being recyclable single-material film is
                how it earns the second half of that sentence.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <Link href="/samples" className="btn btn--lime">Get free samples</Link>
                <Link href="/quality" className="btn btn--ghost-dark">See how we make it</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
