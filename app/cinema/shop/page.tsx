/*
 * Cinema shop — the LUTs and presets, sold from the film side on black
 * stock. Same catalogue (lib/shop.ts) and Polar embedded checkout as /shop;
 * the dark checkout theme matches the page.
 */

import type { Metadata } from "next";
import { products } from "@/lib/shop";
import { ProductCard } from "@/components/cinema/ProductCard";
import PolarEmbed from "@/app/shop/polar-embed";
import NewsletterForm from "@/app/newsletter-form";

export const metadata: Metadata = {
  title: "Shop — Gafar Aleshe Cinema",
  description:
    "Cinematic LUTs and Lightroom presets from SHOTBYGAFAR — the colour grades from Gafar Aleshe's films.",
};

const notes = [
  "Instant download after checkout",
  "Premiere · DaVinci · Final Cut · Lightroom",
  "Free updates to every pack",
];

export default function CinemaShop() {
  return (
    <main className="px-[5%] md:px-[4%]">
      <PolarEmbed />

      <section className="pb-12 pt-4 md:pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          Shop — LUTs &amp; presets
        </p>
        <h1 className="mt-4 font-cine text-[clamp(64px,12.5vw,200px)] uppercase leading-[0.85] tracking-wide text-white">
          The grade,
          <br />
          <span className="text-white/30">to go.</span>
        </h1>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            The colour I use on my films and photos, packed up for yours. Drop a
            LUT on your footage or a preset on your shots and you&apos;re most
            of the way there.
          </p>
          <ul className="flex flex-col gap-1.5 md:items-end">
            {notes.map(n => (
              <li
                key={n}
                className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.map(p => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <div className="mt-16">
        <NewsletterForm tone="cinema" />
      </div>
    </main>
  );
}
