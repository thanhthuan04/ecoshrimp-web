"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Settings as SettingsIcon, Waves } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface SidebarProps {
    onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const links = [
        { href: "/", label: t.nav.dashboard, Icon: LayoutDashboard },
        { href: "/history", label: t.nav.history, Icon: History },
        { href: "/settings", label: t.nav.settings, Icon: SettingsIcon },
    ];

    return (
        <aside className="flex h-full w-64 flex-col gap-1 border-r border-black/5 bg-surface p-4">
            <Link href="/" onClick={onNavigate} className="mb-6 flex items-center gap-2 px-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                    <Waves className="h-5 w-5" />
                </span>
                <span className="text-lg font-extrabold text-text-primary">EcoShrimp</span>
            </Link>

            {links.map(({ href, label, Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isActive
                                ? "bg-primary-soft text-primary-dark"
                                : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                            }`}
                    >
                        <Icon className="h-5 w-5" />
                        {label}
                    </Link>
                );
            })}
        </aside>
    );
}