"use client";

/*
 * Cinema chrome — the black, film-portfolio header and footer shared by
 * /cinema, its film pages and the cinema shop. Big condensed wordmark on the left, plain
 * uppercase nav and social icons on the right; collapses to a full-screen
 * menu on small screens.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { InstagramGlyph, MailGlyph } from "@/components/BrandIcons";

const INSTAGRAM_URL = "https://www.instagram.com/shot.by.gafar/";
const EMAIL = "contact@gafaraleshe.com";
const BOOKING_URL = "https://shotbygafar.com";
// Visitors who reach /cinema have made their pick, so the home page chooser
// stays closed when they hop back over to the code portfolio.
const PATH_KEY = "gafar:path";

const nav = [
  { href: "/cinema", label: "Work" },
  { href: "/cinema/shop", label: "Shop" },
  { href: "#contact", label: "Contact" },
  { href: "/", label: "Code ↗" },
];

function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      <li>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="block text-white/80 transition-colors hover:text-white"
        >
          <InstagramGlyph size={18} />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email"
          className="block text-white/80 transition-colors hover:text-white"
        >
          <MailGlyph size={19} />
        </a>
      </li>
    </ul>
  );
}

export function CinemaHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(PATH_KEY, "cinema");
    } catch {}
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Work covers the index and every film page; Shop is its own section.
  const inShop = pathname.startsWith("/cinema/shop");
  const isActive = (href: string) =>
    href === "/cinema/shop"
      ? inShop
      : href === "/cinema" && pathname.startsWith("/cinema") && !inShop;

  return (
    <>
      <header className="relative z-10 flex h-24 items-center justify-between px-[5%] md:h-32 md:px-[4%]">
        <a
          href="/cinema"
          className="font-cine text-[26px] uppercase leading-none tracking-wide text-white sm:text-[35px]"
        >
          Gafar Aleshe
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-7">
            {nav.map(item => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative font-cine text-[19px] uppercase leading-none tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-white after:transition-all after:duration-300 ${
                  isActive(item.href)
                    ? "text-white after:w-full"
                    : "text-white/60 after:w-0 hover:text-white hover:after:w-full"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Socials />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[4px] md:hidden"
        >
          <i className="block h-[2px] w-6 bg-white" />
          <i className="block h-[2px] w-6 bg-white" />
          <i className="block h-[2px] w-6 bg-white" />
        </button>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-[#222] md:hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-[5%] top-8 h-10 w-10 text-3xl leading-none text-white"
          >
            ×
          </button>
          <nav className="m-auto flex flex-col items-center gap-8">
            {nav.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-cine text-[28px] uppercase leading-none tracking-wide text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Socials className="justify-center border-t border-white/10 py-8" />
        </div>
      )}
    </>
  );
}

export function CinemaFooter() {
  return (
    <footer
      id="contact"
      className="mt-28 scroll-mt-10 border-t border-white/10 bg-black/60 px-[5%] pb-12 pt-20 text-center backdrop-blur-[2px] md:px-[4%]"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
        Available for shoots · Portsmouth, UK
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-4 inline-block break-all font-cine text-[34px] uppercase leading-none tracking-wide text-white transition-opacity hover:opacity-70 sm:text-[56px]"
      >
        {EMAIL}
      </a>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="bg-white px-5 py-2.5 font-cine text-[18px] uppercase tracking-wide text-black transition-opacity hover:opacity-85"
        >
          Book a shoot ↗
        </a>
        <a
          href="/cinema/shop"
          className="border border-white/30 px-5 py-2.5 font-cine text-[18px] uppercase tracking-wide text-white transition-colors hover:bg-white/10"
        >
          LUTs &amp; presets
        </a>
      </div>
      <Socials className="mt-8 justify-center" />
      <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        <span>© {new Date().getFullYear()} SHOTBYGAFAR</span>
        <a href="#top" className="transition-colors hover:text-white">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
