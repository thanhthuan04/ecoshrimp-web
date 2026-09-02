"use client";

import { useState } from "react";
import { Hand, Sparkles } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useLanguage } from "@/hooks/useLanguage";
import type { SystemMode } from "@/types/settings";
import { Button } from "@/components/ui/Button";

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
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => switchMode("manual")}
                disabled={isLoading}
                className={`rounded-pill px-4 h-8 transition ${mode === "manual" ? "bg-surface text-text-primary shadow-card" : "text-text-secondary"}`}
            >
                <Hand className="h-4 w-4 mr-1.5" />
                {t.dashboard.modeManual}
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => switchMode("auto")}
                disabled={isLoading}
                className={`rounded-pill px-4 h-8 transition ${mode === "auto" ? "bg-primary text-white shadow-card hover:bg-primary-light hover:text-white" : "text-text-secondary"}`}
            >
                <Sparkles className="h-4 w-4 mr-1.5" />
                {t.dashboard.modeAuto}
            </Button>
        </div>
    );
}