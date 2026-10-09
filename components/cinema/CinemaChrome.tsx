"use client";

/*
 * Cinema chrome — the black, film-portfolio header and footer shared by
 * /cinema and its project pages. Big condensed wordmark on the left, plain
 * uppercase nav and social icons on the right; collapses to a full-screen
 * menu on small screens.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Instagram, Mail } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/shot.by.gafar/";
const EMAIL = "contact@gafaraleshe.com";
// Visitors who reach /cinema have made their pick, so the home page chooser
// stays closed when they hop back over to the code portfolio.
const PATH_KEY = "gafar:path";

const nav = [
  { href: "/cinema", label: "Work" },
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
          <Instagram className="h-5 w-5" strokeWidth={1.5} />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email"
          className="block text-white/80 transition-colors hover:text-white"
        >
          <Mail className="h-5 w-5" strokeWidth={1.5} />
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

  const isActive = (href: string) =>
    href === "/cinema" && pathname.startsWith("/cinema");

  return (
    <>
      <header className="relative z-10 flex h-24 items-center justify-between px-[5%] md:h-40 md:px-[4%]">
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
                className={`font-cine text-[19px] uppercase leading-none tracking-wide transition-opacity ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
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
      className="scroll-mt-10 px-[5%] pb-14 pt-24 text-center md:px-[4%]"
    >
      <p className="font-cine text-[15px] uppercase tracking-[0.2em] text-white/50">
        Available for shoots · Portsmouth, UK
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-3 inline-block font-cine text-[34px] uppercase leading-none tracking-wide text-white transition-opacity hover:opacity-70 sm:text-[48px]"
      >
        {EMAIL}
      </a>
      <Socials className="mt-6 justify-center" />
      <a
        href="#top"
        className="mt-14 inline-block font-cine text-[16px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
      >
        ↑ Back to top
      </a>
    </footer>
  );
}
