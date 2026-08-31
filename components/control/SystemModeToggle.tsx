"use client";

import { useState } from "react";
import { Hand, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useLanguage } from "@/hooks/useLanguage";
import type { SystemMode } from "@/types/settings";

interface SystemModeToggleProps {
    mode: SystemMode;
    onModeChange: (mode: SystemMode) => void;
}

export default function SystemModeToggle({ mode, onModeChange }: SystemModeToggleProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();

    async function switchMode(nextMode: SystemMode) {
        if (nextMode === mode || isLoading) return;
        setIsLoading(true);
        try {
            await apiClient.post<{ system_mode: SystemMode }>("/api/control/mode", { mode: nextMode });
            onModeChange(nextMode);
        } catch (error) {
            console.error("Đổi chế độ thất bại:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-2 rounded-pill bg-surface-muted p-1">
            <button
                type="button"
                onClick={() => switchMode("manual")}
                disabled={isLoading}
                className={`flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm font-semibold transition ${mode === "manual" ? "bg-surface text-text-primary shadow-card" : "text-text-secondary"
                    }`}
            >
                <Hand className="h-4 w-4" />
                {t.dashboard.modeManual}
            </button>
            <button
                type="button"
                onClick={() => switchMode("auto")}
                disabled={isLoading}
                className={`flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm font-semibold transition ${mode === "auto" ? "bg-primary text-white shadow-card" : "text-text-secondary"
                    }`}
            >
                <Sparkles className="h-4 w-4" />
                {t.dashboard.modeAuto}
            </button>
        </div>
    );
}