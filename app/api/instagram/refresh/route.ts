import { refreshAccessToken } from "@/lib/instagram";

// Invoked monthly by the Vercel cron (see vercel.json) to keep the long-lived
// token from expiring. Vercel automatically sends
// `Authorization: Bearer ${CRON_SECRET}` on cron requests when CRON_SECRET is
// set, so the endpoint can't be triggered by the public.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
  const result = await refreshAccessToken();
  return Response.json(result, { status: result.ok ? 200 : 500 });
}
