export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <a
        href="/"
        className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
      >
        ← Gafar Aleshe
      </a>
      {children}
    </div>
  );
}

export function NotConfigured() {
  return (
    <div
      className="w-full max-w-sm rounded-md border border-neutral-900/10 bg-[#f4f3ec] px-7 py-9 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        Accounts
      </p>
      <h1 className="mt-1 font-display text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
        Coming soon
      </h1>
      <p className="mt-3 font-mono text-[12px] leading-relaxed text-neutral-600">
        Sign-in isn&apos;t switched on yet. Add the Clerk keys
        (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY) to enable
        accounts.
      </p>
    </div>
  );
}
