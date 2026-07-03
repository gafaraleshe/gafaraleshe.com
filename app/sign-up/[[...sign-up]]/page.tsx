import { SignUp } from "@clerk/nextjs";
import { AuthShell, NotConfigured } from "../../auth-shell";

export const dynamic = "force-dynamic";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function SignUpPage() {
  return <AuthShell>{clerkEnabled ? <SignUp /> : <NotConfigured />}</AuthShell>;
}
