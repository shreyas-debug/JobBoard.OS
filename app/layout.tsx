import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
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

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "JobBoard.OS",
  description:
    "Discover top engineering, design, and marketing roles at the world's best technology companies. Filter by type, department, and location.",
  keywords: ["jobs", "engineering jobs", "design jobs", "remote work", "tech careers"],
  openGraph: {
    title: "JobBoard.OS",
    description:
      "Discover top engineering, design, and marketing roles at the world's best technology companies.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
        style={{ backgroundColor: "#0A0A0A", color: "#ffffff" }}
      >
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
