"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import QuoteButton from "./QuoteButton";
import { NAV, SITE } from "@/data/company";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <header
      className="sticky top-0 z-[60] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,.92)" : "rgba(244,246,250,0)",
        backdropFilter: scrolled ? "blur(12px) saturate(1.6)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
      }}
    >
      <div className="wrap flex items-center justify-between" style={{ height: "var(--header-h)" }}>
        <Link href="/" aria-label="MGM Packaging — home">
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(item.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={item.href}
                className="spec block px-3 py-2 transition-colors hover:text-[var(--navy)]"
                style={{
                  color: pathname.startsWith(item.href) ? "var(--navy)" : undefined,
                }}
              >
                {item.label}
              </Link>

              <div
                className="absolute left-0 top-full pt-2 transition-all duration-200"
                style={{
                  opacity: openGroup === item.label ? 1 : 0,
                  pointerEvents: openGroup === item.label ? "auto" : "none",
                  transform: openGroup === item.label ? "translateY(0)" : "translateY(-5px)",
                }}
              >
                <ul
                  className="min-w-[248px] overflow-hidden rounded-[var(--r)] border border-hairline bg-surface py-1.5"
                  style={{ boxShadow: "var(--sh-3)" }}
                >
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block px-4 py-2 text-[.88rem] text-ink-2 transition-colors hover:bg-[var(--navy-wash)] hover:text-[var(--navy)]"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.partners[0].phoneIntl}`}
            className="spec hidden xl:block px-2 transition-colors hover:text-[var(--navy)]"
          >
            {SITE.partners[0].phone}
          </a>
          <span className="hidden sm:block"><QuoteButton /></span>

          <button
            className="btn lg:hidden"
            style={{ padding: ".55rem .75rem" }}
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className="fixed inset-x-0 bottom-0 z-[59] overflow-y-auto bg-surface lg:hidden"
        style={{
          top: "var(--header-h)",
          transform: menu ? "translateY(0)" : "translateY(-8px)",
          opacity: menu ? 1 : 0,
          pointerEvents: menu ? "auto" : "none",
          transition: "opacity .28s var(--ease), transform .28s var(--ease)",
          borderTop: "1px solid var(--hairline)",
        }}
      >
        <div className="wrap grid gap-6 py-7 pb-28">
          {NAV.map((item) => (
            <div key={item.label} className="grid gap-2.5">
              <Link href={item.href} className="display-sm text-lg">{item.label}</Link>
              <ul className="grid gap-1.5 border-l border-hairline pl-3.5">
                {item.children.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="block py-1 text-[.92rem] text-ink-2">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="grid gap-2 pt-2">
            <Link href="/rfq" className="btn btn--primary">Request a quote</Link>
            <Link href="/samples" className="btn btn--lime">Get free samples</Link>
            <Link href="/contact" className="btn">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
