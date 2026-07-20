"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MotionProvider } from "@/components/motion";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <MotionProvider>
            <Toaster />
            {children}
          </MotionProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
