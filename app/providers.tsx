"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MotionProvider } from "@/components/motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {/* Dark is the default; light is the original green graph paper. A
          visitor's pick is stored in localStorage and applied before paint,
          so there's no flash. */}
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <TooltipProvider>
          <MotionProvider>
            <Toaster />
            {children}
            {/* The light/dark tab on the right edge (hidden on /cinema). */}
            <ThemeToggle />
          </MotionProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
