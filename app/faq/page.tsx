import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { SectionHead } from "@/components/Cards";
import { FAQ_GROUPS } from "@/data/content";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "Buyer FAQ — MOQ, Lead Time, Artwork, Delivery",
  description:
    "Minimum order, lead times, payment terms, artwork formats, food-grade compliance and delivery across the BBN belt — answered plainly.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((g) =>
    g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal immediate>
            <SectionHead
              eyebrow="Buyer FAQ"
              title="The questions we get asked before every first order"
              lede="Answered plainly, including the ones where the honest answer is “probably not us”. If yours is not here, call either partner — you will not have to explain yourself twice."
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="grid gap-9">
              {FAQ_GROUPS.map((g, gi) => (
                <Reveal key={g.group}>
                  <h2 className="display-md text-[1.35rem]">{g.group}</h2>
                  <div className="mt-4">
                    <Accordion items={g.items} openFirst={gi === 0} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] grid gap-4">
              <div className="dark-block rounded-[var(--r)] p-6">
                <p className="spec" style={{ color: "var(--lime)" }}>Still stuck?</p>
                <h2 className="display-sm mt-2 text-[1.15rem] text-white">Ask a partner directly</h2>
                <p className="mt-2.5 text-[.92rem] leading-relaxed text-on-dark-2">
                  We answer {SITE.responseTime}, {SITE.workingHours.toLowerCase()}.
                </p>
                <div className="mt-5 grid gap-2">
                  <Link href="/contact" className="btn btn--lime w-full">Contact us</Link>
                  <a href={`tel:${SITE.partners[0].phoneIntl}`} className="btn btn--ghost-dark w-full">
                    {SITE.partners[0].phone}
                  </a>
                </div>
              </div>

              <div className="card p-6">
                <p className="spec spec--lime">Answer it yourself</p>
                <div className="mt-3 grid gap-2">
                  {[
                    ["What thickness do I need?", "/tools/thickness"],
                    ["What size do I need?", "/tools/size-finder"],
                    ["What will it cost per bag?", "/tools/calculator"],
                    ["Do the plastic rules apply?", "/tools/compliance-check"],
                  ].map(([t, h]) => (
                    <Link key={h} href={h} className="link-underline text-[.91rem] text-ink-2 hover:text-[var(--navy)]">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="card p-7 sm:p-9 text-center">
              <h2 className="display-md mx-auto max-w-[26ch] text-[clamp(1.4rem,2.8vw,1.9rem)]">
                The fastest way to a real answer is a real bag.
              </h2>
              <p className="measure mx-auto mt-3.5 text-[1rem] leading-relaxed text-ink-2">
                Send us the bag you buy today, or ask for samples of what you think you need.
                Either way we stop guessing and start measuring.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <Link href="/samples" className="btn btn--primary">Request free samples</Link>
                <Link href="/rfq" className="btn">Request a quote</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
