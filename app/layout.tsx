import type { Metadata, Viewport } from "next";
import { Archivo, DM_Serif_Display, Geist_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import "./globals.css";

// Clerk activates only once its publishable key is set.
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gafar Aleshe — Software Engineer",
  description:
    "Gafar Aleshe — Software Engineer working across full-stack and frontend development. TypeScript, React, Next.js, Node.js and accessible interfaces. Portsmouth, United Kingdom.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Gafar Aleshe — Software Engineer",
    description:
      "Software Engineer — Full-Stack & Frontend Development. Portsmouth, United Kingdom.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = (
    <>
      <Providers>{children}</Providers>
      <Analytics />
    </>
  );

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivo.variable} ${dmSerif.variable} ${geistMono.variable}`}
      >
        {clerkEnabled ? <ClerkProvider>{tree}</ClerkProvider> : tree}
      </body>
    </html>
  );
}
