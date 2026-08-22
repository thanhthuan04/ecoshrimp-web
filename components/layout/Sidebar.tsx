"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Settings as SettingsIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const links = [
        { href: "/", label: t.nav.dashboard, Icon: LayoutDashboard },
        { href: "/history", label: t.nav.history, Icon: History },
        { href: "/settings", label: t.nav.settings, Icon: SettingsIcon },
    ];

    return (
        <aside className="flex h-screen w-56 flex-col gap-1 border-r border-slate-200 bg-white p-4">
            <span className="mb-4 text-lg font-bold text-emerald-600">EcoShrimp</span>
            {links.map(({ href, label, Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${pathname === href ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
            ))}
        </aside>
    );
}