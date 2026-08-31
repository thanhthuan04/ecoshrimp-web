"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate } from "@/types/settings";

interface GeneralFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

export default function GeneralForm({ settings, onSave }: GeneralFormProps) {
    const [farmLocation, setFarmLocation] = useState(settings.farm_location);
    const { t } = useLanguage();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({ farm_location: farmLocation });
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="mb-4 text-lg font-bold text-text-primary">{t.general.title}</h2>

            <label className="flex flex-col gap-1 text-sm text-text-secondary">
                {t.general.farmLocation}
                <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-text-primary"
                />
                <span className="text-xs text-text-muted">{t.general.farmLocationHint}</span>
            </label>

            <button type="submit" className="mt-4 rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white">
                {t.general.save}
            </button>
        </form>
    );
}