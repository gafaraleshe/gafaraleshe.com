import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// shotbygafar.com signs people up to the same list, cross-origin.
const ALLOWED_ORIGINS = new Set([
  "https://shotbygafar.com",
  "https://www.shotbygafar.com",
]);

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") ?? "";
  const allowed =
    ALLOWED_ORIGINS.has(origin) ||
    (process.env.NODE_ENV !== "production" &&
      /^http:\/\/localhost:\d+$/.test(origin));
  return allowed
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        Vary: "Origin",
      }
    : {};
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request);
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400, headers }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: "The newsletter isn't switched on yet." },
      { status: 503, headers }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    console.error("Resend contacts.create error:", error);
    return NextResponse.json(
      { error: "Couldn't subscribe right now — please try again." },
      { status: 502, headers }
    );
  }

  // Optional welcome email — only sent when a verified sender is configured.
  const from = process.env.RESEND_FROM;
  if (from) {
    await resend.emails.send({
      from,
      to: [email],
      subject: "You're on the list",
      html: "<p>Thanks for subscribing — new LUTs, presets and drops from SHOTBYGAFAR will land in your inbox.</p>",
      text: "Thanks for subscribing — new LUTs, presets and drops from SHOTBYGAFAR will land in your inbox.",
    });
  }

  return NextResponse.json({ ok: true }, { headers });
}
