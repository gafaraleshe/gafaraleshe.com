import { fetchInstagramPosts } from "@/lib/instagram";

// Cache the feed for an hour; Vercel serves the cached copy and revalidates in
// the background, so the Graph API is hit at most once per hour per region.
export const revalidate = 3600;

export async function GET() {
  const posts = await fetchInstagramPosts(9);
  return Response.json(
    { posts },
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
