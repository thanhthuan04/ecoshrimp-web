"use client";

import { useState } from "react";
import type { Settings, SettingsUpdate } from "@/types/settings";

interface AutomationFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

const AUTO_FIELDS: { key: "auto_aerator" | "auto_pump_in" | "auto_pump_out"; label: string; hint: string }[] = [
    { key: "auto_aerator", label: "Máy sục khí", hint: "Tự bật khi AI dự báo DO sắp xuống thấp" },
    { key: "auto_pump_in", label: "Bơm nước vào", hint: "Tự bật khi AI dự báo pH thấp hoặc độ đục cao" },
    { key: "auto_pump_out", label: "Bơm nước ra", hint: "Tự bật khi nước đang ổn định, không cần pha loãng" },
];

export default function AutomationForm({ settings, onSave }: AutomationFormProps) {
    const [form, setForm] = useState<Settings>(settings);

    function toggle(key: (typeof AUTO_FIELDS)[number]["key"]) {
        setForm((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-bold">Thiết bị theo AI (chế độ Tự động)</h2>
            <p className="mb-4 text-sm text-slate-500">
                Chỉ có tác dụng khi hệ thống đang ở chế độ Tự động (bật ở Dashboard).
            </p>

            <div className="flex flex-col gap-3">
                {AUTO_FIELDS.map((field) => (
                    <label
                        key={field.key}
                        className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-700">{field.label}</p>
                            <p className="text-xs text-slate-400">{field.hint}</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={form[field.key]}
                            onChange={() => toggle(field.key)}
                            className="h-5 w-5"
                        />
                    </label>
                ))}
            </div>

            <button type="submit" className="mt-6 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white">
                Lưu cấu hình
            </button>
        </form>
    );
}