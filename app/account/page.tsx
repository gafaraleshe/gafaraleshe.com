import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { AuthShell, NotConfigured } from "../auth-shell";

export const dynamic = "force-dynamic";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default async function AccountPage() {
  if (!clerkEnabled) {
    return (
      <AuthShell>
        <NotConfigured />
      </AuthShell>
    );
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return (
    <AuthShell>
      <div
        className="w-full max-w-sm rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-7 py-9 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Account
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
              Signed in
            </h1>
          </div>
          <UserButton />
        </div>

        <dl className="mt-6 space-y-3 font-mono text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Name
            </dt>
            <dd className="text-neutral-900">{user?.fullName ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              Email
            </dt>
            <dd className="text-neutral-900">
              {user?.primaryEmailAddress?.emailAddress ?? "—"}
            </dd>
          </div>
        </dl>

        <a
          href="/shop"
          className="mt-8 block rounded-md bg-neutral-900 px-4 py-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Go to shop
        </a>
      </div>
    </AuthShell>
  );
}
