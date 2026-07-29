import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScreenshotModeToggle } from "@/components/ui/screenshot-mode-toggle";
import { SplashScreen } from "@/components/ui/splash-screen";
import { brand } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: brand.name,
  description: `${brand.tagline} — ${brand.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <ScreenshotModeToggle />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
