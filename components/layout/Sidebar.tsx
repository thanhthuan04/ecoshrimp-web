"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const links = [
        { href: "/", label: t.nav.dashboard },
        { href: "/history", label: t.nav.history },
        { href: "/settings", label: t.nav.settings },
    ];

    return (
        <aside className="flex h-screen w-56 flex-col gap-1 border-r border-slate-200 bg-white p-4">
            <span className="mb-4 text-lg font-bold text-emerald-600">EcoShrimp</span>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    {link.label}
                </Link>
            ))}
        </aside>
    );
}