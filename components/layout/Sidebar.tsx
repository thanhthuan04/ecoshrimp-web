"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Settings as SettingsIcon, Waves, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
    onNavigate?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export default function Sidebar({ onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();

    const links = [
        { href: "/", label: t.nav.dashboard, Icon: LayoutDashboard },
        { href: "/history", label: t.nav.history, Icon: History },
        { href: "/settings", label: t.nav.settings, Icon: SettingsIcon },
    ];

    return (
        <aside className={`flex h-full w-full flex-col border-r border-border bg-surface shadow-2xl transition-all duration-300 relative ${isCollapsed ? 'items-center px-2 py-6' : 'px-4 py-6'}`}>
            {onToggleCollapse && (
                <button
                    type="button"
                    onClick={onToggleCollapse}
                    className="absolute -right-3 top-[44px] -translate-y-1/2 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface shadow-md transition-colors hover:bg-surface-hover hover:text-primary text-text-muted cursor-pointer"
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            )}

            <Link href="/" onClick={onNavigate} className={`flex items-center mb-4 overflow-hidden whitespace-nowrap transition-all ${isCollapsed ? 'justify-center w-10' : 'gap-3 w-full'}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
                    <Waves className="h-6 w-6" />
                </span>
                {!isCollapsed && (
                    <span className="text-lg font-bold text-text-primary tracking-tight">EcoShrimp</span>
                )}
            </Link>

            <div className={`w-full h-px bg-border mb-4 shrink-0 ${isCollapsed ? 'px-2' : ''}`} />

            <nav className="flex w-full flex-col gap-4 flex-1">
            {links.map(({ href, label, Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onNavigate}
                        className={`flex items-center transition-all overflow-hidden whitespace-nowrap group rounded-xl ${
                            isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-3 py-2.5 w-full border-l-4'
                        } ${isActive
                            ? isCollapsed 
                                ? "bg-primary-soft text-primary" 
                                : "border-primary bg-primary-soft text-primary"
                            : isCollapsed
                                ? "text-text-secondary hover:bg-primary/10 hover:text-primary"
                                : "border-transparent text-text-secondary hover:bg-primary/10 hover:text-primary"
                            }`}
                        title={isCollapsed ? label : undefined}
                    >
                        <Icon className={`shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'} ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`} />
                        {!isCollapsed && (
                            <span className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}>{label}</span>
                        )}
                    </Link>
                );
            })}
            </nav>

            <div className={`mt-auto w-full pt-4 border-t border-border flex items-center overflow-hidden whitespace-nowrap transition-all ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                {isCollapsed ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-text-secondary">
                        v1
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary">EcoShrimp</span>
                        <span className="text-xs text-text-muted">Phiên bản 1.0.0</span>
                    </div>
                )}
            </div>
        </aside>
    );
}