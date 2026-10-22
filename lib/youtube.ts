/*
 * Latest upload from youtube.com/@gafaraleshe, for the links page's "Latest
 * video" card. No API key needed; two sources, best first:
 *   1. The channel's RSS feed. Clean XML with publish dates, but it lists
 *      Shorts too (skipped: a vertical clip doesn't suit the 16:9 card) and
 *      YouTube serves it intermittently.
 *   2. The channel's Videos tab, parsed from the ytInitialData JSON the page
 *      embeds. Long-form uploads only, newest first.
 *
 * Cached for an hour, so a new upload shows up within the hour without a
 * redeploy. Any failure resolves to null and the card falls back to a
 * subscribe prompt, so the page never breaks.
 */

export const YOUTUBE_HANDLE = "gafaraleshe";
export const YOUTUBE_CHANNEL_ID = "UC2z14OE8ntlAUlawOwABMtQ";
export const YOUTUBE_URL = `https://www.youtube.com/@${YOUTUBE_HANDLE}`;
export const YOUTUBE_SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`;

export type LatestVideo = {
  id: string;
  title: string;
  // ISO date from the feed, or YouTube's own "3 days ago" from the page.
  published?: string;
  publishedText?: string;
};

const REVALIDATE = 3600; // one hour, matching app/links/page.tsx
const TIMEOUT_MS = 8000;
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  "Accept-Language": "en-GB,en;q=0.9",
  // Skips the EU cookie-consent interstitial.
  Cookie: "SOCS=CAI",
};
const VIDEO_ID = /^[\w-]{11}$/;

export async function fetchLatestVideo(): Promise<LatestVideo | null> {
  return (
    (await fromFeed().catch(() => null)) ??
    (await fromChannelPage().catch(() => null))
  );
}

// ── 1. RSS feed ──

async function fromFeed(): Promise<LatestVideo | null> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
    {
      headers: HEADERS,
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }
  );
  if (!res.ok) return null;
  const xml = await res.text();

  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1];
    const link = /<link rel="alternate" href="([^"]+)"/.exec(entry)?.[1] ?? "";
    if (!id || !VIDEO_ID.test(id) || link.includes("/shorts/")) continue;
    return {
      id,
      title: decodeXml(/<title>([^<]*)<\/title>/.exec(entry)?.[1] ?? ""),
      published: /<published>([^<]+)<\/published>/.exec(entry)?.[1],
    };
  }
  return null;
}

function decodeXml(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// ── 2. Channel page ──

async function fromChannelPage(): Promise<LatestVideo | null> {
  const res = await fetch(`${YOUTUBE_URL}/videos`, {
    headers: HEADERS,
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) return null;
  const html = await res.text();
  const json = /var ytInitialData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/.exec(
    html
  )?.[1];
  if (!json) return null;
  return firstVideo(JSON.parse(json));
}

type Node = Record<string, unknown>;
const isNode = (v: unknown): v is Node =>
  typeof v === "object" && v !== null && !Array.isArray(v);

// Depth-first, so the first hit is the top-left tile of the grid. YouTube
// has shipped two shapes for it: the current lockupViewModel and the older
// videoRenderer.
function firstVideo(value: unknown): LatestVideo | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const hit = firstVideo(item);
      if (hit) return hit;
    }
    return null;
  }
  if (!isNode(value)) return null;

  const lockup = value.lockupViewModel;
  if (isNode(lockup) && lockup.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
    const video = fromLockup(lockup);
    if (video) return video;
  }
  const renderer = value.videoRenderer;
  if (isNode(renderer)) {
    const video = fromRenderer(renderer);
    if (video) return video;
  }

  for (const child of Object.values(value)) {
    const hit = firstVideo(child);
    if (hit) return hit;
  }
  return null;
}

function fromLockup(lockup: Node): LatestVideo | null {
  const id = lockup.contentId;
  if (typeof id !== "string" || !VIDEO_ID.test(id)) return null;
  const meta = path(lockup, "metadata", "lockupMetadataViewModel");
  const title = path(meta, "title", "content");
  // Metadata parts are ["138 views", "1 month ago"]; take the "ago" one.
  const rows = path(
    meta,
    "metadata",
    "contentMetadataViewModel",
    "metadataRows"
  );
  const parts = Array.isArray(rows)
    ? rows.flatMap(row => {
        const p = path(row, "metadataParts");
        return Array.isArray(p) ? p : [];
      })
    : [];
  const ago = parts
    .map(
      part => path(part, "accessibilityLabel") ?? path(part, "text", "content")
    )
    .find((t): t is string => typeof t === "string" && /\bago$/.test(t));
  return {
    id,
    title: typeof title === "string" ? title : "",
    publishedText: ago,
  };
}

function fromRenderer(renderer: Node): LatestVideo | null {
  const id = renderer.videoId;
  if (typeof id !== "string" || !VIDEO_ID.test(id)) return null;
  const title =
    path(renderer, "title", "runs", 0, "text") ??
    path(renderer, "title", "simpleText");
  const ago = path(renderer, "publishedTimeText", "simpleText");
  return {
    id,
    title: typeof title === "string" ? title : "",
    publishedText: typeof ago === "string" ? ago : undefined,
  };
}

function path(value: unknown, ...keys: (string | number)[]): unknown {
  let current = value;
  for (const key of keys) {
    if (typeof key === "number") {
      if (!Array.isArray(current)) return undefined;
      current = current[key];
    } else {
      if (!isNode(current)) return undefined;
      current = current[key];
    }
  }
  return current;
}
