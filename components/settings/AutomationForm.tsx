"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate } from "@/types/settings";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";

interface AutomationFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

export default function AutomationForm({ settings, onSave }: AutomationFormProps) {
    const [form, setForm] = useState<Settings>(settings);
    const { t } = useLanguage();

    const autoFields: { key: "auto_aerator" | "auto_pump_in" | "auto_pump_out" | "auto_light"; label: string; hint: string }[] = [
        { key: "auto_aerator", label: t.settings.deviceAerator, hint: t.settings.autoAeratorHint },
        { key: "auto_pump_in", label: t.settings.devicePumpIn, hint: t.settings.autoPumpInHint },
        { key: "auto_pump_out", label: t.settings.devicePumpOut, hint: t.settings.autoPumpOutHint },
        { key: "auto_light", label: t.settings.deviceLight, hint: t.settings.autoLightHint },
    ];

    function toggle(key: (typeof autoFields)[number]["key"]) {
        setForm((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-1 text-lg font-bold text-text-primary">{t.settings.automationTitle}</h2>
                <p className="mb-4 text-sm text-text-secondary">{t.settings.automationDesc}</p>

                <div className="flex flex-col gap-3">
                    {autoFields.map((field) => (
                        <div key={field.key} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                            <div>
                                <p className="text-sm font-medium text-text-primary">{field.label}</p>
                                <p className="text-xs text-text-muted">{field.hint}</p>
                            </div>
                            <Switch
                                checked={form[field.key]}
                                onChange={() => toggle(field.key)}
                            />
                        </div>
                    ))}
                </div>

                <Button type="submit" className="mt-6">
                    {t.settings.save}
                </Button>
            </form>
        </Card>
    );
}