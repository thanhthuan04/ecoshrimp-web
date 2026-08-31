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
        <div className="flex items-center justify-between rounded-card bg-surface p-4 shadow-card">
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isOn ? "text-primary" : "text-text-muted"}`} />
                <div>
                    <span className="text-sm font-medium text-text-primary">{label}</span>
                    {isAutoMode && <p className="text-xs text-primary">{t.dashboard.controllingByAi}</p>}
                    {!isAutoMode && isInterlocked && (
                        <p className="text-xs text-danger">{t.dashboard.pumpOutBlockedWaterLow}</p>
                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={toggle}
                disabled={isLoading || isAutoMode || isInterlocked}
                title={isAutoMode ? t.dashboard.lockedTooltip : isInterlocked ? t.dashboard.pumpOutBlockedWaterLow : undefined}
                className={`h-8 w-14 rounded-pill transition ${isOn ? "bg-primary" : "bg-surface-muted"} disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <span
                    className={`block h-6 w-6 rounded-full bg-surface shadow transition-transform ${isOn ? "translate-x-7" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
}