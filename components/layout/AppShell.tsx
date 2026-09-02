"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Button } from "@/components/ui/Button";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar cố định - desktop */}
            <div className={`hidden md:block shrink-0 transition-all duration-300 relative z-20 ${isCollapsed ? "w-20" : "w-64"}`}>
                <Sidebar 
                    isCollapsed={isCollapsed} 
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
                />
            </div>

            {/* Sidebar dạng drawer - mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="relative z-10 w-64 h-full shadow-2xl">
                        <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} isCollapsed={false} />
                    </div>
                    <Button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-4 z-20 rounded-full shadow-card"
                        aria-label="Đóng menu"
                    >
                        <X className="h-5 w-5 text-text-secondary" />
                    </Button>
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col relative z-10">
                <div className="relative z-20">
                    <Topbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
                </div>
                <main className="w-full flex-1 px-4 py-6 md:px-8 lg:px-12 animate-slide-up-fade overflow-y-auto relative z-0">
                    {children}
                </main>
            </div>
        </div>
    );
}