"use client";

import { useState } from "react";
import type { Settings, SettingsUpdate, TimerConfig } from "@/types/settings";

interface TimerFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

type TimerKey = "timer_aerator" | "timer_pump_in" | "timer_pump_out" | "timer_light";

const TIMER_FIELDS: { key: TimerKey; label: string }[] = [
    { key: "timer_aerator", label: "Máy sục khí" },
    { key: "timer_pump_in", label: "Bơm nước vào" },
    { key: "timer_pump_out", label: "Bơm nước ra" },
    { key: "timer_light", label: "Đèn" },
];

export default function TimerForm({ settings, onSave }: TimerFormProps) {
    const [form, setForm] = useState<Settings>(settings);

    function updateTimer(key: TimerKey, patch: Partial<TimerConfig>) {
        setForm((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Hẹn giờ thiết bị</h2>

            <div className="flex flex-col gap-4">
                {TIMER_FIELDS.map(({ key, label }) => {
                    const timer = form[key];
                    return (
                        <div key={key} className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-3">
                            <label className="flex w-40 items-center gap-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    checked={timer.enabled}
                                    onChange={(e) => updateTimer(key, { enabled: e.target.checked })}
                                />
                                {label}
                            </label>
                            <input
                                type="time"
                                value={timer.start}
                                onChange={(e) => updateTimer(key, { start: e.target.value })}
                                className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
                                disabled={!timer.enabled}
                            />
                            <span className="text-slate-400">đến</span>
                            <input
                                type="time"
                                value={timer.end}
                                onChange={(e) => updateTimer(key, { end: e.target.value })}
                                className="rounded-lg border border-slate-200 px-2 py-1 text-sm"
                                disabled={!timer.enabled}
                            />
                        </div>
                    );
                })}
            </div>

            <button type="submit" className="mt-6 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white">
                Lưu hẹn giờ
            </button>
        </form>
    );
}