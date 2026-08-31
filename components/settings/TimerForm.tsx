"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate, TimerConfig } from "@/types/settings";

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
        <form onSubmit={handleSubmit} className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="mb-4 text-lg font-bold text-text-primary">{t.settings.timerTitle}</h2>

            <div className="flex flex-col gap-4">
                {timerFields.map(({ key, label }) => {
                    const timer = form[key];
                    return (
                        <div key={key} className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
                            <label className="flex w-40 items-center gap-2 text-sm font-medium text-text-primary">
                                <input
                                    type="checkbox"
                                    checked={timer.enabled}
                                    onChange={(e) => updateTimer(key, { enabled: e.target.checked })}
                                    className="accent-primary"
                                />
                                {label}
                            </label>
                            <input
                                type="time"
                                value={timer.start}
                                onChange={(e) => updateTimer(key, { start: e.target.value })}
                                className="rounded-lg border border-border bg-surface px-2 py-1 text-sm text-text-primary"
                                disabled={!timer.enabled}
                            />
                            <span className="text-text-muted">{t.settings.to}</span>
                            <input
                                type="time"
                                value={timer.end}
                                onChange={(e) => updateTimer(key, { end: e.target.value })}
                                className="rounded-lg border border-border bg-surface px-2 py-1 text-sm text-text-primary"
                                disabled={!timer.enabled}
                            />
                        </div>
                    );
                })}
            </div>

            <button type="submit" className="mt-6 rounded-pill bg-primary px-5 py-2 text-sm font-semibold text-white">
                {t.settings.saveTimer}
            </button>
        </form>
    );
}