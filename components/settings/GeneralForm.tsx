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
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">{t.general.title}</h2>

            <label className="flex flex-col gap-1 text-sm text-slate-600">
                {t.general.farmLocation}
                <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2"
                />
                <span className="text-xs text-slate-400">{t.general.farmLocationHint}</span>
            </label>

            <button type="submit" className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white">
                {t.general.save}
            </button>
        </form>
    );
}