"use client";

import { useState } from "react";
import AutomationForm from "@/components/settings/AutomationForm";
import ThresholdForm from "@/components/settings/ThresholdForm";
import TimerForm from "@/components/settings/TimerForm";
import type { Settings, SettingsUpdate } from "@/types/settings";

const MOCK_SETTINGS: Settings = {
    system_mode: "manual",
    do_danger: 4.0,
    ai_early_warning: 30,
    temp_max: 35.0,
    temp_min: 22.0,
    ph_max: 9.0,
    ph_min: 6.5,
    turbidity_max: 70.0,
    turbidity_min: 20.0,
    auto_aerator: false,
    auto_pump_in: false,
    auto_pump_out: false,
    timer_aerator: { enabled: false, start: "", end: "" },
    timer_pump_in: { enabled: false, start: "", end: "" },
    timer_pump_out: { enabled: false, start: "", end: "" },
    timer_light: { enabled: false, start: "", end: "" },
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>(MOCK_SETTINGS);

    function handleSave(update: SettingsUpdate) {
        setSettings((prev) => ({ ...prev, ...update }));
        console.log("Lưu cấu hình (mock):", update);
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Cấu hình hệ thống</h1>
            <ThresholdForm settings={settings} onSave={handleSave} />
            <AutomationForm settings={settings} onSave={handleSave} />
            <TimerForm settings={settings} onSave={handleSave} />
        </div>
    );
}