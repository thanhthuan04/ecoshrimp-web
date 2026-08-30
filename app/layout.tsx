import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import { LanguageProvider } from "@/hooks/useLanguage";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "EcoShrimp - Giám sát ao nuôi tôm",
  description: "Hệ thống giám sát và điều khiển ao nuôi tôm realtime",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-surface-subtle font-sans text-text-primary antialiased">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}