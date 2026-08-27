import Link from "next/link";
import Logo from "./Logo";
import { NAV, SITE, waLink } from "@/data/company";

export default function Footer() {
  return (
    <footer className="dark-block--deep dark-block mt-0">
      <div className="wrap pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* identity */}
          <div className="lg:col-span-4 grid gap-5 content-start">
            <Logo onDark />
            <p className="text-[.95rem] leading-relaxed text-on-dark-2 max-w-[34ch]">
              LLDPE polybags manufactured in Barotiwala, inside the Baddi industrial belt.
              Plain, printed, zip lock, gusset and coloured — in any size you need.
            </p>
            <p
              className="display-sm text-[1.05rem]"
              style={{ color: "var(--lime)", letterSpacing: "-.01em" }}
            >
              {SITE.taglineShort}
            </p>
          </div>

          {/* nav */}
          <div className="lg:col-span-5 grid gap-8 sm:grid-cols-2">
            {NAV.map((group) => (
              <div key={group.label} className="grid gap-2.5 content-start">
                <p className="spec" style={{ color: "var(--lime)" }}>{group.label}</p>
                <ul className="grid gap-1.5">
                  {group.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="link-underline text-[.88rem] text-on-dark-2 transition-colors hover:text-white"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* contact */}
          <div className="lg:col-span-3 grid gap-5 content-start">
            <div className="grid gap-1.5">
              <p className="spec" style={{ color: "var(--lime)" }}>The unit</p>
              <address className="not-italic text-[.88rem] leading-relaxed text-on-dark-2">
                {SITE.address.line1}<br />
                {SITE.address.line2}<br />
                {SITE.address.district} ({SITE.address.state}) {SITE.address.pin}
              </address>
            </div>

            <div className="grid gap-2.5">
              <p className="spec" style={{ color: "var(--lime)" }}>Speak to a partner</p>
              {SITE.partners.map((p) => (
                <div key={p.name} className="grid gap-0.5">
                  <p className="text-[.88rem] text-white">{p.name}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    <a href={`tel:${p.phoneIntl}`} className="tnum text-[.85rem] text-on-dark-2 hover:text-white">
                      {p.phone}
                    </a>
                    <a
                      href={waLink(p.whatsapp, `Hello ${p.name} — I'd like to enquire about polybags.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[.85rem] hover:text-white"
                      style={{ color: "var(--lime)" }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`mailto:${SITE.email}`}
              className="link-underline text-[.88rem] text-on-dark-2 hover:text-white break-all"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <hr className="seal seal--ondark my-9" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec" style={{ color: "var(--on-dark-3)" }}>
            © {new Date().getFullYear()} {SITE.name} · {SITE.address.line2}
            {SITE.gstin ? ` · GSTIN ${SITE.gstin}` : ""}
          </p>
          <p className="spec" style={{ color: "var(--on-dark-3)" }}>
            {SITE.workingHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
