"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { SystemMode } from "@/types/settings";

interface SystemModeToggleProps {
    mode: SystemMode;
    onModeChange: (mode: SystemMode) => void;
}

export default function SystemModeToggle({ mode, onModeChange }: SystemModeToggleProps) {
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
            <button
                type="button"
                onClick={() => switchMode("manual")}
                disabled={isLoading}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${mode === "manual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                    }`}
            >
                Thủ công
            </button>
            <button
                type="button"
                onClick={() => switchMode("auto")}
                disabled={isLoading}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${mode === "auto" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500"
                    }`}
            >
                Tự động (AI)
            </button>
        </div>
    );
}