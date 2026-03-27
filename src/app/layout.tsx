import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gafar Aleshe — Full-Stack Developer",
  description:
    "Full-Stack JavaScript Developer building web applications with React, Next.js, Node.js, and PostgreSQL. Based in the UK.",
  openGraph: {
    title: "Gafar Aleshe — Full-Stack Developer",
    description:
      "Full-Stack JavaScript Developer building web applications with React, Next.js, Node.js, and PostgreSQL.",
    url: "https://gafaraleshe.com",
    siteName: "Gafar Aleshe",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gafar Aleshe — Full-Stack Developer",
    description: "Full-Stack JavaScript Developer. React, Next.js, Node.js.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
