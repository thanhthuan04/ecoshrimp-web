"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate, TimerConfig } from "@/types/settings";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface TimerFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

type TimerKey = "timer_aerator" | "timer_pump_in" | "timer_pump_out" | "timer_light";

export default function TimerForm({ settings, onSave }: TimerFormProps) {
    const [form, setForm] = useState<Settings>(settings);
    const { t } = useLanguage();

    const timerFields: { key: TimerKey; label: string }[] = [
        { key: "timer_aerator", label: t.settings.deviceAerator },
        { key: "timer_pump_in", label: t.settings.devicePumpIn },
        { key: "timer_pump_out", label: t.settings.devicePumpOut },
        { key: "timer_light", label: t.settings.deviceLight },
    ];

    function updateTimer(key: TimerKey, patch: Partial<TimerConfig>) {
        setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-lg font-bold text-text-primary">{t.settings.timerTitle}</h2>

                <div className="flex flex-col gap-4">
                    {timerFields.map(({ key, label }) => {
                        const timer = form[key];
                        return (
                            <div key={key} className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
                                <label className="flex w-40 items-center gap-2 text-sm font-medium text-text-primary cursor-pointer">
                                    <Switch
                                        checked={timer.enabled}
                                        onChange={(e) => updateTimer(key, { enabled: e.target.checked })}
                                    />
                                    {label}
                                </label>
                                <Input
                                    type="time"
                                    value={timer.start}
                                    onChange={(e) => updateTimer(key, { start: e.target.value })}
                                    className="w-auto"
                                    disabled={!timer.enabled}
                                />
                                <span className="text-text-muted">{t.settings.to}</span>
                                <Input
                                    type="time"
                                    value={timer.end}
                                    onChange={(e) => updateTimer(key, { end: e.target.value })}
                                    className="w-auto"
                                    disabled={!timer.enabled}
                                />
                            </div>
                        );
                    })}
                </div>

                <Button type="submit" className="mt-6">
                    {t.settings.saveTimer}
                </Button>
            </form>
        </Card>
    );
}