import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PolarEmbed from "./polar-embed";
import NewsletterForm from "../newsletter-form";

export const metadata: Metadata = {
  title: "Shop — Gafar Aleshe",
  description: "LUTs and Lightroom presets by Gafar Aleshe / SHOTBYGAFAR.",
};

const DOTTED = {
  backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
} as const;

// Edit these, then paste each product's Polar checkout link into `checkoutUrl`.
const products = [
  {
    name: "Cinematic LUT Pack",
    kind: "10 LUTs · .cube",
    description:
      "Film-inspired color grades for video — teal & orange, moody, and clean cinematic looks. Works in Premiere, DaVinci & Final Cut.",
    price: "£18",
    checkoutUrl: "#",
    accent: "from-emerald-500 to-teal-700",
  },
  {
    name: "Mobile Lightroom Presets",
    kind: "12 presets · .dng",
    description:
      "One-tap edits for phone photography. Warm skin tones, rich shadows, and a consistent feed in seconds.",
    price: "£12",
    checkoutUrl: "#",
    accent: "from-amber-400 to-orange-600",
  },
  {
    name: "Moody Film Preset Pack",
    kind: "8 presets · .xmp",
    description:
      "Desktop Lightroom presets with a matte film finish — deep greens, faded blacks, and analog grain.",
    price: "£15",
    checkoutUrl: "#",
    accent: "from-neutral-600 to-neutral-900",
  },
  {
    name: "All-Access Bundle",
    kind: "Everything · save 35%",
    description:
      "Every LUT and preset pack in one download, plus future releases. The best value for creators.",
    price: "£29",
    checkoutUrl: "#",
    accent: "from-emerald-500 via-teal-600 to-neutral-900",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 sm:py-8">
      {/* Top bar */}
      <header className="mx-auto mb-8 flex max-w-3xl items-center justify-between sm:mb-10">
        <a
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white"
        >
          Gafar Aleshe
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/links"
            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
          >
            Links
          </a>
          <a
            href="/"
            className="rounded-full border border-white/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
          >
            Portfolio ↗
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl pb-14">
        <PolarEmbed />
        {/* Intro card */}
        <section
          className="relative rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-6 py-8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
          style={DOTTED}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Shop:
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            LUTs &amp; Presets
          </h1>
          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-neutral-700">
            Colour grades and presets from my work as SHOTBYGAFAR. Instant
            download after checkout — use them across photo and video.
          </p>
        </section>

        {/* Products */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {products.map(p => {
            const isLive = p.checkoutUrl.startsWith("http");
            return (
              <div
                key={p.name}
                className="flex flex-col overflow-hidden rounded-md border border-neutral-900/10 bg-[#f4f3ec] shadow-sm"
                style={DOTTED}
              >
                <div
                  className={`h-28 bg-gradient-to-br ${p.accent} flex items-end p-4`}
                >
                  <span className="rounded bg-black/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white backdrop-blur-sm">
                    {p.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900">
                      {p.name}
                    </h2>
                    <span className="font-mono text-sm font-semibold text-neutral-900">
                      {p.price}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 font-mono text-[12px] leading-relaxed text-neutral-600">
                    {p.description}
                  </p>
                  <a
                    href={p.checkoutUrl}
                    target={isLive ? "_blank" : undefined}
                    rel={isLive ? "noreferrer" : undefined}
                    aria-disabled={!isLive}
                    {...(isLive
                      ? {
                          "data-polar-checkout": "",
                          "data-polar-checkout-theme": "light",
                        }
                      : {})}
                    className={`mt-4 flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wide transition-opacity ${
                      isLive
                        ? "bg-neutral-900 text-white hover:opacity-90"
                        : "cursor-not-allowed border border-neutral-900/15 bg-white text-neutral-400"
                    }`}
                  >
                    {isLive ? (
                      <>
                        Buy {p.price}
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Coming soon"
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <NewsletterForm />

        {/* Footer */}
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between px-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            © {new Date().getFullYear()} Gafar Aleshe
          </p>
          <a
            href="/links"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            All Links →
          </a>
        </div>
      </main>
    </div>
  );
}
