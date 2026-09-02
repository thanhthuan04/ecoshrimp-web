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

    const DEVICE_COLORS: Record<DeviceControlProps["device"], { active: string; icon: string; text: string }> = {
        aerator: { active: "bg-info-soft border-info", icon: "text-info", text: "text-info" },
        pump_in: { active: "bg-success-soft border-success", icon: "text-success", text: "text-success" },
        pump_out: { active: "bg-danger-soft border-danger", icon: "text-danger", text: "text-danger" },
        light: { active: "bg-warning-soft border-warning", icon: "text-warning", text: "text-warning" },
    };
    
    const colorTheme = DEVICE_COLORS[device];

    return (
        <button
            type="button"
            onClick={toggle}
            disabled={isLoading || isAutoMode || isInterlocked}
            title={isAutoMode ? t.dashboard.lockedTooltip : isInterlocked ? t.dashboard.pumpOutBlockedWaterLow : undefined}
            className={`flex flex-col items-center justify-center p-4 rounded-card border shadow-card transition-all active:scale-95 ${
                isOn 
                    ? colorTheme.active
                    : "bg-surface text-text-secondary border-border hover:bg-surface-hover"
            } disabled:cursor-not-allowed disabled:opacity-50`}
        >
            <Icon className={`h-8 w-8 mb-2 ${isOn ? colorTheme.icon : "text-text-muted"}`} />
            <span className={`text-sm font-bold ${isOn ? colorTheme.text : "text-text-primary"}`}>{label}</span>
            {isAutoMode && <span className="text-[10px] mt-1 opacity-80 uppercase font-semibold text-primary">AI CONTROL</span>}
            {!isAutoMode && isInterlocked && (
                <span className="text-[10px] mt-1 text-danger font-semibold text-center">{t.dashboard.pumpOutBlockedWaterLow}</span>
            )}
        </button>
    );
}