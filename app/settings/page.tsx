"use client";

import { useEffect, useState } from "react";
import AutomationForm from "@/components/settings/AutomationForm";
import ThresholdForm from "@/components/settings/ThresholdForm";
import TimerForm from "@/components/settings/TimerForm";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import type { Settings, SettingsUpdate } from "@/types/settings";

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        apiClient
            .get<Settings>("/api/settings")
            .then(setSettings)
            .catch((error) => console.error("Không tải được cấu hình:", error))
            .finally(() => setIsLoading(false));
    }, []);

    async function handleSave(update: SettingsUpdate) {
        try {
            const updated = await apiClient.patch<Settings>("/api/settings", update);
            setSettings(updated);
        } catch (error) {
            console.error("Lưu cấu hình thất bại:", error);
        }
    }

    if (isLoading) {
        return <p className="text-sm text-slate-500">{t.common.loading}</p>;
    }

    if (!settings) {
        return <p className="text-sm text-red-600">{t.common.loadError}</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">{t.settings.title}</h1>
            <ThresholdForm settings={settings} onSave={handleSave} />
            <AutomationForm settings={settings} onSave={handleSave} />
            <TimerForm settings={settings} onSave={handleSave} />
        </div>
    );
}