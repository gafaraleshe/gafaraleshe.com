import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "")
      .trim()
      .toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: "The newsletter isn't switched on yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    return NextResponse.json(
      { error: "Couldn't subscribe right now — please try again." },
      { status: 502 }
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

  return NextResponse.json({ ok: true });
}
