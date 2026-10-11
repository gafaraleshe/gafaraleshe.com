/*
 * Newsletter sign-up, shared by the inline form and the shop popup. The
 * list lives in Resend (app/api/subscribe); shotbygafar.com posts to the
 * same endpoint, so both sites build one list.
 *
 * What the popup remembers, per browser: a subscriber is never asked
 * again; closing the popup snoozes it for SNOOZE_DAYS.
 */

const SUBSCRIBED_KEY = "newsletter:subscribed";
const SNOOZE_KEY = "newsletter:snoozed-until";
const SNOOZE_DAYS = 30;

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribe(email: string): Promise<SubscribeResult> {
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data?.error ?? "Something went wrong." };
    }
    markSubscribed();
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please try again." };
  }
}

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function markSubscribed() {
  store(SUBSCRIBED_KEY, "1");
}

export function snooze() {
  store(SNOOZE_KEY, String(Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000));
}

/** False for subscribers and while a snooze runs (or storage is blocked). */
export function shouldPrompt() {
  try {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return false;
    const until = Number(localStorage.getItem(SNOOZE_KEY) ?? 0);
    return !(until > Date.now());
  } catch {
    return false;
  }
}
