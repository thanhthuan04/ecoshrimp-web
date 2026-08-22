import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { LanguageProvider } from "@/hooks/useLanguage";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoShrimp - Giám sát ao nuôi tôm",
  description: "Hệ thống giám sát và điều khiển ao nuôi tôm realtime",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.className} min-h-screen bg-slate-50 text-slate-900`}>
        <LanguageProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}