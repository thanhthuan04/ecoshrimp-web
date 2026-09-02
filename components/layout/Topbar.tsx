"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, User } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import type { AlertListResponse } from "@/types/alert";

export default function Topbar({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {
        apiClient
            .get<AlertListResponse>("/api/alerts?limit=1")
            .then((res) => setAlertCount(res.total))
            .catch(() => setAlertCount(0));
    }, [pathname]);

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface shadow-sm px-4 md:px-6 relative z-30">
            <div className="flex items-center gap-4 flex-1">
                <Button
                    type="button"
                    onClick={onOpenMobileMenu}
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Mở menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                
                <div className="hidden md:flex items-center w-full max-w-md bg-surface-subtle rounded-full px-4 py-2 border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <Search className="h-4 w-4 text-text-muted mr-2 shrink-0" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm ao nuôi, thiết bị..." 
                        className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none text-sm w-full text-text-primary placeholder:text-text-muted"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                <Link
                    href="/"
                    className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-muted"
                    aria-label="Thông báo"
                >
                    <Bell className="h-5 w-5" />
                    {alertCount > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow-sm">
                            {alertCount > 9 ? "9+" : alertCount}
                        </span>
                    )}
                </Link>
                <ThemeSwitcher />
                <LanguageSwitcher />
                
                <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
                
                <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-surface-muted transition-colors border border-transparent hover:border-border cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-primary-soft text-primary-dark flex items-center justify-center overflow-hidden border border-primary/20">
                        <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary hidden md:block">Admin</span>
                </button>
            </div>
        </header>
    );
}