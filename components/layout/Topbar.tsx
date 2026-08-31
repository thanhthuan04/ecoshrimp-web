"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

export default function Topbar({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const pageTitle =
        pathname === "/history" ? t.nav.history : pathname === "/settings" ? t.nav.settings : t.nav.dashboard;

    return (
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenMobileMenu}
                    className="rounded-lg p-1.5 text-text-secondary hover:bg-surface-muted md:hidden"
                    aria-label="Mở menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-base font-bold text-text-primary md:text-lg">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-muted"
                    aria-label="Thông báo"
                >
                    <Bell className="h-5 w-5" />
                </button>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </header>
    );
}