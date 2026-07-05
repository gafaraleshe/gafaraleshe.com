/*
 * Instagram Graph API helper — "Instagram API with Instagram Login".
 *
 * Auto-fetches the connected account's recent media using a long-lived access
 * token, and can refresh that token before it expires (they last 60 days).
 *
 * Token storage, in priority order:
 *   1. Vercel KV / Upstash Redis (set via the KV REST API) — survives refresh,
 *      so the site is truly set-and-forget once KV is connected.
 *   2. The IG_ACCESS_TOKEN env var — the bootstrap token you paste in first.
 *
 * Everything degrades gracefully: with no token (or on any API error) the
 * helpers return an empty list, so the UI falls back to the branded grid and
 * the page never breaks.
 */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const TOKEN_KEY = "ig_access_token";

async function kvGet(key: string): Promise<string | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const r = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const data = (await r.json()) as { result?: string | null };
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: string): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const r = await fetch(`${KV_URL}/set/${key}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: value,
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function getAccessToken(): Promise<string | null> {
  return (await kvGet(TOKEN_KEY)) || process.env.IG_ACCESS_TOKEN || null;
}

export async function saveAccessToken(token: string): Promise<boolean> {
  return kvSet(TOKEN_KEY, token);
}

export type IgPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
  type: string;
};

type IgMedia = {
  id: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  caption?: string;
};

export async function fetchInstagramPosts(limit = 9): Promise<IgPost[]> {
  const token = await getAccessToken();
  if (!token) return [];
  const fields =
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const data = (await r.json()) as { data?: IgMedia[] };
    const items = Array.isArray(data.data) ? data.data : [];
    return items
      .map((m): IgPost => ({
        id: m.id,
        permalink: m.permalink,
        image: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
        caption: m.caption ?? "",
        type: m.media_type,
      }))
      .filter(p => p.image);
  } catch {
    return [];
  }
}

export type RefreshResult = {
  ok: boolean;
  expiresIn?: number;
  persisted?: boolean;
  error?: string;
};

export async function refreshAccessToken(): Promise<RefreshResult> {
  const token = await getAccessToken();
  if (!token) return { ok: false, error: "No access token configured." };
  try {
    const r = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
      { cache: "no-store" },
    );
    const data = (await r.json()) as {
      access_token?: string;
      expires_in?: number;
      error?: { message?: string };
    };
    if (!r.ok || !data.access_token) {
      return { ok: false, error: data.error?.message ?? "Refresh failed." };
    }
    const persisted = await saveAccessToken(data.access_token);
    return { ok: true, expiresIn: data.expires_in, persisted };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
