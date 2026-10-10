/*
 * Shop catalogue, shared by /shop (the code side's filing cards) and
 * /cinema/shop (the black film-stock version). Edit these, then paste each
 * product's Polar checkout link into `checkoutUrl`; until it starts with
 * http the product shows as "Coming soon".
 */

export type Product = {
  slug: string;
  name: string;
  kind: string;
  description: string;
  price: string;
  checkoutUrl: string;
  /** Tailwind gradient stops for the product swatch. */
  accent: string;
};

export const products: Product[] = [
  {
    slug: "cinematic-luts",
    name: "Cinematic LUT Pack",
    kind: "10 LUTs · .cube",
    description:
      "Film-inspired color grades for video — teal & orange, moody, and clean cinematic looks. Works in Premiere, DaVinci & Final Cut.",
    price: "£18",
    checkoutUrl: "#",
    accent: "from-emerald-500 to-teal-700",
  },
  {
    slug: "mobile-presets",
    name: "Mobile Lightroom Presets",
    kind: "12 presets · .dng",
    description:
      "One-tap edits for phone photography. Warm skin tones, rich shadows, and a consistent feed in seconds.",
    price: "£12",
    checkoutUrl: "#",
    accent: "from-amber-400 to-orange-600",
  },
  {
    slug: "moody-film-presets",
    name: "Moody Film Preset Pack",
    kind: "8 presets · .xmp",
    description:
      "Desktop Lightroom presets with a matte film finish — deep greens, faded blacks, and analog grain.",
    price: "£15",
    checkoutUrl: "#",
    accent: "from-neutral-600 to-neutral-900",
  },
  {
    slug: "all-access",
    name: "All-Access Bundle",
    kind: "Everything · save 35%",
    description:
      "Every LUT and preset pack in one download, plus future releases. The best value for creators.",
    price: "£29",
    checkoutUrl: "#",
    accent: "from-emerald-500 via-teal-600 to-neutral-900",
  },
];

export const isLive = (p: Product) => p.checkoutUrl.startsWith("http");
