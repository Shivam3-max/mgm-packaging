import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import { SectionHead } from "@/components/Cards";
import { COMPLIANCE_POINTS, COMPLIANCE_UPDATED } from "@/data/content";

export const metadata: Metadata = {
  title: "Plastic Rules, Explained — PWM, EPR & the 120-Micron Confusion",
  description:
    "Does the 120-micron rule apply to your polybags? A plain-English guide to India's Plastic Waste Management Rules, Rule 11A marking and EPR registration for packaging buyers.",
};

function md(text: string) {
  // the source copy uses **bold** for the one or two phrases that matter
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-ink">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function CompliancePage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal immediate>
            <SectionHead
              eyebrow="Plastic rules, explained"
              title="No, the 120-micron rule almost certainly doesn't apply to your bags."
              lede="This is the single most common misunderstanding we hear, and it costs buyers real money — units over-specifying thickness they do not need because somebody half-remembered a headline. Here is what the rules actually say."
            />
          </Reveal>

          <Reveal className="mt-8">
            <div
              className="rounded-[var(--r)] border p-5"
              style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 30%, transparent)" }}
            >
              <p className="spec" style={{ color: "var(--warn)" }}>Read this first</p>
              <p className="measure mt-2 text-[.95rem] leading-relaxed text-ink-2">
                This page is written to help you ask better questions, not to replace legal
                advice. Rules change, and your obligations depend on what you sell and how you
                sell it. Check your own position with a competent adviser before relying on it.
                Last reviewed {COMPLIANCE_UPDATED}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal group className="grid gap-4">
              {COMPLIANCE_POINTS.map((c, i) => (
                <article key={c.q} className="card p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="spec spec--lime">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tag">{c.tag}</span>
                  </div>
                  <h2 className="display-sm mt-3 text-[1.15rem]">{c.q}</h2>
                  <p className="display-sm mt-2 text-[1rem]" style={{ color: "var(--lime-ink)", fontWeight: 600 }}>
                    {c.short}
                  </p>
                  <p className="measure mt-3 text-[.96rem] leading-relaxed text-ink-2">{md(c.a)}</p>
                </article>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="dark-block rounded-[var(--r)] p-6">
                <p className="spec" style={{ color: "var(--lime)" }}>Three questions</p>
                <h2 className="display-sm mt-2 text-[1.15rem] text-white">
                  Find out what applies to you
                </h2>
                <p className="mt-3 text-[.92rem] leading-relaxed text-on-dark-2">
                  Our checker walks through the same logic as this page and tells you which
                  obligations attach to your specific bag and how you use it.
                </p>
                <Link href="/tools/compliance-check" className="btn btn--lime mt-5 w-full">
                  Open the checker
                </Link>
              </div>

              <div className="card mt-4 p-6">
                <p className="spec spec--lime">Why we wrote this</p>
                <p className="mt-2.5 text-[.92rem] leading-relaxed text-ink-2">
                  A thicker bag is a bigger invoice for us. We would earn more by letting the
                  confusion stand. But a customer who over-specifies once and finds out later
                  is a customer who stops trusting the supplier who let it happen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="dark-block--deep dark-block rounded-[var(--r-lg)] p-8 sm:p-11">
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h2 className="display-md text-[clamp(1.5rem,3vw,2.1rem)] text-white">
                    Need a material declaration for your file?
                  </h2>
                  <p className="measure mt-3.5 text-[1rem] leading-relaxed text-on-dark-2">
                    We will confirm the grade, the conformity references and your exact
                    specification in writing against any enquiry — the document your QA
                    team actually needs.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-4">
                  <Link href="/contact" className="btn btn--lime w-full">Ask for a declaration</Link>
                  <Link href="/quality" className="btn btn--ghost-dark w-full">How we make it</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
