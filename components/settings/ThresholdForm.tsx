"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate } from "@/types/settings";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
        <Card className="p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-lg font-bold text-text-primary">{t.settings.thresholdTitle}</h2>

                <label className="mb-4 flex flex-col gap-1 rounded-xl bg-primary-soft p-3 text-sm text-text-secondary">
                    {t.settings.aiEarlyWarning} (phút)
                    <Input
                        type="number"
                        min={1}
                        step="1"
                        value={form.ai_early_warning}
                        onChange={(e) => handleChange("ai_early_warning", Number(e.target.value))}
                    />
                    <span className="text-xs text-text-muted">{t.settings.aiEarlyWarningHint}</span>
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {fields.map((field) => (
                        <label key={field.key} className="flex flex-col gap-1 text-sm text-text-secondary">
                            {field.label} {field.unit && `(${field.unit})`}
                            <Input
                                type="number"
                                step="0.1"
                                value={form[field.key] as number}
                                onChange={(e) => handleChange(field.key, Number(e.target.value))}
                            />
                        </label>
                    ))}
                </div>

                <Button type="submit" className="mt-6">
                    {t.settings.save}
                </Button>
            </form>
        </Card>
    );
}