"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Tổng quan" },
    { href: "/history", label: "Lịch sử" },
    { href: "/settings", label: "Cấu hình" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-bold text-emerald-600">
                    EcoShrimp
                </Link>

                <nav className="hidden gap-6 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Mở menu"
                >
                    ☰
                </button>
            </div>

            {isMenuOpen && (
                <nav className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 md:hidden">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}