"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import AutomationForm from "@/components/settings/AutomationForm";
import GeneralForm from "@/components/settings/GeneralForm";
import ThresholdForm from "@/components/settings/ThresholdForm";
import TimerForm from "@/components/settings/TimerForm";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import { DEFAULT_SETTINGS } from "@/lib/defaultSettings";
import type { Settings, SettingsUpdate } from "@/types/settings";

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        apiClient
            .get<Settings>("/api/settings")
            .then((data) => {
                setSettings(data);
                setIsOffline(false);
            })
            .catch((error) => {
                console.error("Không tải được cấu hình, dùng giá trị mặc định:", error);
                setIsOffline(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    async function handleSave(update: SettingsUpdate) {
        try {
            const updated = await apiClient.patch<Settings>("/api/settings", update);
            setSettings(updated);
            setIsOffline(false);
        } catch (error) {
            console.error("Lưu cấu hình thất bại:", error);
            setIsOffline(true);
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6">
                <Skeleton className="h-8 w-48" />
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="rounded-card bg-surface p-6 shadow-card">
                        <Skeleton className="mb-4 h-5 w-40" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-text-primary">{t.settings.title}</h1>

            {isOffline && (
                <div className="flex items-start gap-2 rounded-card border border-warning bg-warning-soft px-4 py-3 text-sm text-warning">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    {t.common.offlineNotice}
                </div>
            )}

            <GeneralForm settings={settings} onSave={handleSave} />
            <ThresholdForm settings={settings} onSave={handleSave} />
            <AutomationForm settings={settings} onSave={handleSave} />
            <TimerForm settings={settings} onSave={handleSave} />
        </div>
    );
}