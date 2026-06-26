import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  const provider = user.app_metadata?.provider ?? "email";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div
        className="relative w-full max-w-sm rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-7 py-9 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Account
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
          Signed in
        </h1>

        <dl className="mt-6 space-y-3 font-mono text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Email
            </dt>
            <dd className="text-neutral-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Signed in via
            </dt>
            <dd className="capitalize text-neutral-900">{provider}</dd>
          </div>
        </dl>

        <div className="mt-8 flex items-center gap-3">
          <a
            href="/links"
            className="flex-1 rounded-md border border-neutral-900/15 bg-white px-4 py-2.5 text-center text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            Back to links
          </a>
          <form action={signOut} className="flex-1">
            <button
              type="submit"
              className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
