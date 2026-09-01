"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate } from "@/types/settings";

interface ThresholdFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

export default function ThresholdForm({ settings, onSave }: ThresholdFormProps) {
    const [form, setForm] = useState<Settings>(settings);
    const { t } = useLanguage();

    const fields: { key: keyof Settings; label: string; unit: string }[] = [
        { key: "do_danger", label: t.settings.doDanger, unit: "mg/L" },
        { key: "temp_min", label: t.settings.tempMin, unit: "°C" },
        { key: "temp_max", label: t.settings.tempMax, unit: "°C" },
        { key: "ph_min", label: t.settings.phMin, unit: "" },
        { key: "ph_max", label: t.settings.phMax, unit: "" },
        { key: "turbidity_min", label: t.settings.turbidityMin, unit: "NTU" },
        { key: "turbidity_max", label: t.settings.turbidityMax, unit: "NTU" },
        { key: "temp_low_threshold", label: t.settings.tempLowThreshold, unit: "°C" },
        { key: "ph_low_threshold", label: t.settings.phLowThreshold, unit: "" },
    ];

    function handleChange(key: keyof Settings, value: number) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="mb-4 text-lg font-bold text-text-primary">{t.settings.thresholdTitle}</h2>

            <label className="mb-4 flex flex-col gap-1 rounded-xl bg-primary-soft p-3 text-sm text-text-secondary">
                {t.settings.aiEarlyWarning} (phút)
                <input
                    type="number"
                    min={1}
                    step="1"
                    value={form.ai_early_warning}
                    onChange={(e) => handleChange("ai_early_warning", Number(e.target.value))}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <span className="text-xs text-text-muted">{t.settings.aiEarlyWarningHint}</span>
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                    <label key={field.key} className="flex flex-col gap-1 text-sm text-text-secondary">
                        {field.label} {field.unit && `(${field.unit})`}
                        <input
                            type="number"
                            step="0.1"
                            value={form[field.key] as number}
                            onChange={(e) => handleChange(field.key, Number(e.target.value))}
                            className="rounded-lg border border-border bg-surface px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </label>
                ))}
            </div>

            <button
                type="submit"
                className="mt-6 rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
            >
                {t.settings.save}
            </button>
        </form>
    );
}