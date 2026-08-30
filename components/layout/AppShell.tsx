"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-surface-subtle">
            {/* Sidebar cố định - desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Sidebar dạng drawer - mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="relative z-10">
                        <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute right-4 top-4 z-20 rounded-full bg-surface p-2 shadow-card"
                        aria-label="Đóng menu"
                    >
                        <X className="h-5 w-5 text-text-secondary" />
                    </button>
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6">{children}</main>
            </div>
        </div>
    );
}