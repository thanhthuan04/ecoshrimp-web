"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    const navLinks = [
        { href: "/", label: t.nav.dashboard },
        { href: "/history", label: t.nav.history },
        { href: "/settings", label: t.nav.settings },
    ];

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-bold text-emerald-600">
                    EcoShrimp
                </Link>

                <nav className="hidden gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <LanguageSwitcher />
                </div>

                <button
                    type="button"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Mở menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 md:hidden">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600">
                            {link.label}
                        </Link>
                    ))}
                    <LanguageSwitcher />
                </nav>
            )}
        </header>
    );
}