import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import EnquiryForm from "@/components/EnquiryForm";
import BeltMap from "@/components/BeltMap";
import { SITE, waLink } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact — MGM Packaging, Barotiwala, Baddi",
  description:
    "Call or WhatsApp either partner directly. MGM Packaging, Khasra No. 454, Barotiwala, Baddi, Solan (HP) 174101. We answer within four working hours.",
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Barotiwala, Baddi, Solan, Himachal Pradesh 174101"
)}`;

export default function ContactPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal className="grid gap-3.5">
            <p className="spec spec--lime">Contact</p>
            <h1 className="display text-[clamp(2.1rem,5vw,3.4rem)]">
              Both partners answer their own phones.
            </h1>
            <p className="measure text-[1.04rem] leading-relaxed text-ink-2">
              There is no switchboard and no sales team. You will speak to one of the two
              people who own the unit — which is usually the fastest way to get a straight
              answer about whether we can do what you need.
            </p>
          </Reveal>
        </div>
      </section>

      {/* partners */}
      <section className="section--tight">
        <div className="wrap">
          <Reveal group className="grid gap-4 md:grid-cols-2">
            {SITE.partners.map((p) => (
              <div key={p.name} className="card p-6 sm:p-7">
                <p className="spec spec--lime">{p.role}</p>
                <h2 className="display-md mt-2 text-[1.5rem]">{p.name}</h2>
                <p className="mt-2.5 text-[.94rem] leading-relaxed text-ink-2">{p.handles}</p>

                <div className="mt-6 grid gap-2.5">
                  <a href={`tel:${p.phoneIntl}`} className="btn btn--primary w-full">
                    Call {p.phone}
                  </a>
                  <a
                    href={waLink(p.whatsapp, `Hello ${p.name.split(" ")[0]} — I'd like to enquire about LLDPE polybags.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--lime w-full"
                  >
                    WhatsApp {p.name.split(" ")[0]}
                  </a>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
              { k: "Working hours", v: SITE.workingHours },
              { k: "We reply", v: SITE.responseTime },
            ].map((r) => (
              <div key={r.k} className="card p-5">
                <p className="spec spec--lime">{r.k}</p>
                {r.href ? (
                  <a href={r.href} className="link-underline mt-1.5 block break-all text-[.94rem] text-ink hover:text-[var(--navy)]">
                    {r.v}
                  </a>
                ) : (
                  <p className="mt-1.5 text-[.94rem] text-ink">{r.v}</p>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* map + address */}
      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="spec spec--lime">Where we are</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              Inside the belt, not shipping into it
            </h2>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-2">
              This is the whole commercial argument in one diagram. Most of the units that buy
              polybags in this region are inside the first two rings.
            </p>
            <div className="mt-7">
              <BeltMap />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal className="grid gap-4">
              <div className="card p-6">
                <p className="spec spec--lime">The unit</p>
                <address className="not-italic mt-3 text-[1.05rem] leading-relaxed text-ink">
                  {SITE.address.line1}<br />
                  {SITE.address.line2}<br />
                  {SITE.address.district} ({SITE.address.state}) {SITE.address.pin}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-5 w-full"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="dark-block rounded-[var(--r)] p-6">
                <p className="spec" style={{ color: "var(--lime)" }}>You are welcome to visit</p>
                <p className="mt-2.5 text-[.94rem] leading-relaxed text-on-dark-2">
                  Come and watch the line running before you place an order. Most of our
                  customers have — it is a twenty-minute drive from most of Baddi, and it
                  tells you more about a supplier than any brochure.
                </p>
                <p className="mt-3 text-[.94rem] leading-relaxed text-on-dark-2">
                  Call ahead so one of us is on the floor when you arrive.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* form */}
      <section className="section pb-16" style={{ background: "var(--ground-2)" }}>
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="spec spec--lime">Send a message</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              Or write to us here
            </h2>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-2">
              Tell us what you pack and roughly how much of it. That is genuinely enough to
              start — we will come back with questions if we need more.
            </p>
            <div className="mt-7">
              <EnquiryForm kind="contact" />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal className="grid gap-4">
              <div className="card p-6">
                <p className="spec spec--lime">Faster routes</p>
                <div className="mt-3.5 grid gap-2.5">
                  {[
                    ["Request a quote with specifications", "/rfq"],
                    ["Get free samples", "/samples"],
                    ["Read the buyer FAQ", "/faq"],
                    ["Download the size chart", "/downloads"],
                  ].map(([t, h]) => (
                    <Link key={h} href={h} className="link-underline text-[.93rem] text-ink-2 hover:text-[var(--navy)]">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <p className="spec spec--lime">Delivery</p>
                <p className="mt-2.5 text-[.93rem] leading-relaxed text-ink-2">
                  {SITE.freeDeliveryNote}. We deliver across{" "}
                  {SITE.serviceArea.join(", ")}.
                </p>
                <p className="mt-3 text-[.93rem] leading-relaxed text-ink-2">
                  Further afield we can supply, but be realistic with us about freight — beyond
                  a few hundred kilometres transport starts to dominate the landed cost, and we
                  would rather tell you that than win an order you regret.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
