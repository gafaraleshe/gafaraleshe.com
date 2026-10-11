/*
 * Photography — the SHOTBYGAFAR sets shown on /cinema/photography, the
 * cinema index and the home page, grouped by the kind of shoot. The same
 * sets as shotbygafar.com/portfolio. Each set is one Instagram post: `code`
 * is its shortcode (the part after /p/ in its link) and its frames live in
 * public/photography/<code>/, listed in lib/photography-media.ts.
 * Categories render in this order.
 *
 *   title      the set's label: who or what it was, from the caption.
 *   context    the line under it: where, and anything worth knowing.
 *   frames     show only these slides (1-based) of the post.
 *   strip      show the set as a film strip instead of a cover card.
 *   credit     the account that posted it, when it isn't @shot.by.gafar.
 *   spotlight  a category shown big, as pinned prints, instead of the grid.
 */

import { media, type Frame } from "./photography-media";

export type PortfolioPost = {
  code: string;
  title: string;
  context?: string;
  frames?: number[];
  strip?: boolean;
  credit?: string;
};

export type PortfolioCategory = {
  slug: string;
  title: string;
  blurb: string;
  spotlight?: boolean;
  posts: PortfolioPost[];
};

export const portfolio: PortfolioCategory[] = [
  {
    slug: "concerts",
    title: "Concerts",
    blurb: "Stage light, crowd noise and the second the artist looks up.",
    posts: [
      {
        code: "Db3FcFIiMpQ",
        title: "Zlatan Ibile",
        context: "Live · London, UK · shot on iPhone",
      },
      {
        code: "Db4GYgciKrP",
        title: "Odumodublvck",
        context: "Zlatan's concert · London · shot on iPhone",
      },
    ],
  },
  {
    slug: "events",
    title: "Events",
    blurb: "Full coverage, from the doors opening to the last word.",
    posts: [
      {
        code: "DDpX0smscfh",
        title: "HealthTalks",
        context: "The Next Chapter · Battersea Park, London",
        // The tenth slide is the video's title card, so it's left out.
        frames: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    slug: "birthdays",
    title: "Birthdays",
    blurb: "Milestones shot like the main event they are.",
    spotlight: true,
    posts: [
      {
        code: "DPkEvCDCLcm",
        title: "Crowned",
        context: "@titil4y0 · London, UK",
      },
      {
        code: "DGzF9k_oomt",
        title: "Happy 20th",
        context: "@its_timaaaaaa · Sony a6700",
      },
    ],
  },
  {
    slug: "football",
    title: "Football",
    blurb: "Training sessions shot at full speed, with @trainer_tana.",
    posts: [
      {
        code: "DLSZZ6cIiWA",
        title: "Pre-season",
        context: "@trainer_tana · the marathon continues",
        credit: "@trainer_tana",
      },
      {
        code: "DZF6OdRDhZp",
        title: "Off-season",
        context: "@trainer_tana · Goals Portsmouth",
        credit: "@trainer_tana",
      },
    ],
  },
  {
    slug: "lifestyle",
    title: "Lifestyle",
    blurb: "Car parks, lobbies and street corners, made to look like covers.",
    posts: [
      {
        code: "DGytwyPgGXJ",
        title: "Kai being Kai",
        context: "@lifechangertrims · Portsmouth",
      },
      {
        code: "DHAcOyxojhL",
        title: "Diamond sharp",
        context: "ft. @harrysalami · Portsmouth",
      },
      {
        code: "DHpozDLotIp",
        title: "CVC2CLEAN",
        context: "@christophervchari · Sony a6700",
      },
    ],
  },
  {
    slug: "nightlife",
    title: "Nightlife",
    blurb: "Flash, street light and whatever the night turns into.",
    posts: [
      {
        code: "DA9YxEegKtb",
        title: "Kay.Nyne after dark",
        context: "@kay.nyne · street at night",
      },
      {
        code: "DA9VxJfgMkl",
        title: "Pull&Bear after dark",
        context: "@kay.nyne & @treasure.aug",
        frames: [3, 4, 5, 6],
        strip: true,
      },
    ],
  },
  {
    slug: "brand",
    title: "Brand",
    blurb:
      "Campaign-style content for brands that want to look like themselves.",
    posts: [
      {
        code: "DAzALV0AN7f",
        title: "Kay.Nyne × Modche",
        context: "@modche.ng · Portsmouth",
      },
    ],
  },
];

export const postUrl = (code: string) => `https://www.instagram.com/p/${code}/`;

export type PostFrame = Frame & { n: number; total: number };

/** The frames a set shows, numbered by their place in the original post. */
export function framesOf(post: PortfolioPost): PostFrame[] {
  const all = media[post.code] ?? [];
  const picks = post.frames ?? all.map((_, i) => i + 1);
  return picks
    .filter(n => all[n - 1])
    .map(n => ({ ...all[n - 1], n, total: all.length }));
}
