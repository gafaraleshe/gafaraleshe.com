import { fetchGitHubActivity } from "@/lib/github";

// Cache the contribution calendar for six hours; Vercel serves the cached copy
// and revalidates in the background, so GitHub is asked at most every six
// hours. `activity` is null when GitHub couldn't be read.
export const revalidate = 21600;

export async function GET() {
  const activity = await fetchGitHubActivity();
  return Response.json(
    { activity },
    {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    }
  );
}
