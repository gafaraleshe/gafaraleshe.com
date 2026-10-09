/*
 * Cinema portfolio data. Add a project by appending to `cinemaProjects`:
 *  - `cover`: a 16:9 still or GIF in /public/assets/cinema/ (optional — a
 *    YouTube `video` supplies its own thumbnail, otherwise a title card shows)
 *  - `video`: a YouTube or Vimeo link, embedded on the project page
 *  - `roles`: the line shown under the title, e.g. "SHORT FILM || DIRECTOR || DP"
 * Projects render in array order, so put the newest first.
 */

export type CinemaProject = {
  slug: string;
  title: string;
  year: string;
  roles: string;
  cover?: string;
  video?: string;
  summary?: string;
};

// TODO: replace these with real projects, covers, and video links.
export const cinemaProjects: CinemaProject[] = [
  {
    slug: "showreel-2026",
    title: "Showreel 2026",
    year: "2026",
    roles: "REEL || DP || EDIT || COLOUR",
    summary: "A cut of my favourite frames from the past year.",
  },
  {
    slug: "wedding-films",
    title: "Wedding Films",
    year: "2024–26",
    roles: "CINEMATOGRAPHY || EDIT",
    summary:
      "Cinematic wedding films that capture the day as it felt — vows, first dances, and the moments in between.",
  },
  {
    slug: "event-highlights",
    title: "Event Highlights",
    year: "2024–26",
    roles: "DP || EDIT",
    summary:
      "Highlight reels for parties, conferences, and live shows, delivered fast.",
  },
  {
    slug: "brand-content",
    title: "Brand Content",
    year: "2024–26",
    roles: "COMMERCIAL || DIRECTOR || DP",
    summary:
      "Product films, promos, and social-first content for brands and small businesses.",
  },
];

export function getCinemaProject(slug: string) {
  return cinemaProjects.find(p => p.slug === slug);
}

function youtubeId(url: string) {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m?.[1];
}

function vimeoId(url: string) {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
}

export function embedUrl(url: string) {
  const yt = youtubeId(url);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt}?rel=0`;
  const vm = vimeoId(url);
  if (vm) return `https://player.vimeo.com/video/${vm}?dnt=1`;
  return undefined;
}

export function coverFor(p: CinemaProject) {
  if (p.cover) return p.cover;
  const yt = p.video && youtubeId(p.video);
  return yt ? `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg` : undefined;
}
