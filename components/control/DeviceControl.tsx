"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";

interface DeviceControlProps {
    device: "aerator" | "pump_in" | "pump_out" | "light";
    label: string;
}

export default function DeviceControl({ device, label }: DeviceControlProps) {
    const [isOn, setIsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function toggle() {
        const nextState = isOn ? "OFF" : "ON";
        setIsLoading(true);
        try {
            await apiClient.post("/api/control", { device, state: nextState });
            setIsOn(!isOn);
        } catch (error) {
            console.error(`Điều khiển ${device} thất bại:`, error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <button
                type="button"
                onClick={toggle}
                disabled={isLoading}
                className={`h-8 w-14 rounded-full transition ${isOn ? "bg-emerald-500" : "bg-slate-200"} disabled:opacity-50`}
            >
                <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-7" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
}