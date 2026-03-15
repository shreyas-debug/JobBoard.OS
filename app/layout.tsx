import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobBoard.OS — Find Your Next Role",
  description:
    "Discover top engineering, design, and marketing roles at the world's best technology companies. Filter by type, department, and location.",
  openGraph: {
    title: "JobBoard.OS — Find Your Next Role",
    description:
      "Discover top engineering, design, and marketing roles at the world's best technology companies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
