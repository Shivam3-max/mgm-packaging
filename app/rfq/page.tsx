import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "Request a Quote — LLDPE Polybags",
  description:
    "Send one structured enquiry with every specification you need. Rates per kilogram, lead times and MOQ from MGM Packaging, Barotiwala, Baddi.",
};

const STEPS = [
  { t: "You send the specification", d: "Size, thickness, quantity. If you are unsure of any of it, say so — we would rather work it out with you than guess." },
  { t: "We quote per kilogram", d: `Usually the same day, always ${SITE.responseTime}. The quote states rate, MOQ, lead time and what the price includes.` },
  { t: "Samples if you want them", d: "Free, in your specification, so you can test before committing to a run." },
  { t: "We run it", d: `${SITE.leadTimeStock} for stock sizes, ${SITE.leadTimeCustom} for custom. ${SITE.freeDeliveryNote}.` },
];

export default function RFQPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal className="grid gap-3.5">
            <p className="spec spec--lime">Request a quote</p>
            <h1 className="display text-[clamp(2.1rem,5vw,3.4rem)]">
              One enquiry. Every line you need.
            </h1>
            <p className="measure text-[1.04rem] leading-relaxed text-ink-2">
              Add as many specifications as you like from anywhere on the site — product
              pages, the calculators — and they arrive here as a single list. Then tell us
              who you are and we will price it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <EnquiryForm kind="quote" />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal className="grid gap-4">
              <div className="card p-6">
                <p className="spec spec--lime">What happens next</p>
                <ol className="mt-4 grid gap-4">
                  {STEPS.map((s, i) => (
                    <li key={s.t} className="grid grid-cols-[auto_1fr] gap-3.5">
                      <span className="spec spec--navy pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="display-sm block text-[.97rem]">{s.t}</span>
                        <span className="mt-1 block text-[.88rem] leading-relaxed text-ink-2">{s.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="dark-block rounded-[var(--r)] p-6">
                <p className="spec" style={{ color: "var(--lime)" }}>Rather just talk?</p>
                <p className="mt-2.5 text-[.93rem] leading-relaxed text-on-dark-2">
                  Most of our business starts with a phone call. Both partners answer their
                  own phones — you will not go through a switchboard.
                </p>
                <div className="mt-5 grid gap-3">
                  {SITE.partners.map((p) => (
                    <div key={p.name} className="grid gap-1 border-t pt-3" style={{ borderColor: "rgba(255,255,255,.15)" }}>
                      <p className="text-[.93rem] text-white">{p.name}</p>
                      <p className="text-[.83rem]" style={{ color: "var(--on-dark-3)" }}>{p.handles}</p>
                      <a href={`tel:${p.phoneIntl}`} className="tnum text-[.95rem]" style={{ color: "var(--lime)" }}>
                        {p.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <p className="spec spec--lime">Not ready to quote?</p>
                <div className="mt-3 grid gap-2">
                  {[
                    ["Get free samples first", "/samples"],
                    ["Work out the thickness", "/tools/thickness"],
                    ["Work out the size", "/tools/size-finder"],
                    ["Read the FAQ", "/faq"],
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
    </>
  );
}
