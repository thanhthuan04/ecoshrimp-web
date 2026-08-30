"use client";

import { useState } from "react";
import { Droplets, Fan, Lightbulb, Waves } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { useLanguage } from "@/hooks/useLanguage";

interface DeviceControlProps {
    device: "aerator" | "pump_in" | "pump_out" | "light";
    label: string;
    isAutoMode: boolean;
    isWaterLow?: boolean;
    onBlocked?: (message: string) => void;
}

const DEVICE_ICON: Record<DeviceControlProps["device"], typeof Fan> = {
    aerator: Fan,
    pump_in: Droplets,
    pump_out: Waves,
    light: Lightbulb,
};

export default function DeviceControl({ device, label, isAutoMode, isWaterLow, onBlocked }: DeviceControlProps) {
    const [isOn, setIsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();
    const Icon = DEVICE_ICON[device];
    const isInterlocked = device === "pump_out" && isWaterLow === true;

    async function toggle() {
        if (isAutoMode) return;
        if (isInterlocked) {
            onBlocked?.(t.dashboard.pumpOutBlockedWaterLow);
            return;
        }
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
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isOn ? "text-emerald-500" : "text-slate-400"}`} />
                <div>
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    {isAutoMode && <p className="text-xs text-emerald-600">{t.dashboard.controllingByAi}</p>}
                    {!isAutoMode && isInterlocked && (
                        <p className="text-xs text-red-500">{t.dashboard.pumpOutBlockedWaterLow}</p>
                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={toggle}
                disabled={isLoading || isAutoMode || isInterlocked}
                title={isAutoMode ? t.dashboard.lockedTooltip : isInterlocked ? t.dashboard.pumpOutBlockedWaterLow : undefined}
                className={`h-8 w-14 rounded-full transition ${isOn ? "bg-emerald-500" : "bg-slate-200"} disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-7" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
}