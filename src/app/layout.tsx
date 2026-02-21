import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gafar Aleshe — Portfolio",
    description:
        "Official portfolio of Gafar Aleshe — showcasing design, code, and creative work.",
    icons: {
        icon: "/favicon.ico", // optional, replace if you have one
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-white text-gray-900 antialiased font-sans">
        {children}
        </body>
        </html>
    );
}
