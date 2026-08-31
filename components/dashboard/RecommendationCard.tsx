"use client";

import RiskGauge from "@/components/dashboard/RiskGauge";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import { calcLowerBoundRisk, calcRangeRisk } from "@/lib/riskCalculator";
import type { ForecastData } from "@/types/sensor";
import type { HistoryMetric } from "@/types/history";
import type { Settings } from "@/types/settings";

interface RecommendationCardProps {
    forecast: ForecastData | undefined;
    settings: Settings;
    activeMetric: HistoryMetric;
}

function resolveDevice(
    metric: HistoryMetric,
    forecast: ForecastData,
    settings: Settings
): "aerator" | "pump_in" | "pump_out" | "light" | null {
    switch (metric) {
        case "do":
            return "aerator";
        case "temp":
            return forecast.future_temp < settings.temp_low_threshold ? "light" : "pump_in";
        case "ph":
            return forecast.future_ph < settings.ph_low_threshold ? "pump_in" : "pump_out";
        case "turbidity":
            return forecast.future_turbidity < settings.turbidity_min ? "pump_in" : "pump_out";
        default:
            return null;
    }
}

export default function RecommendationCard({ forecast, settings, activeMetric }: RecommendationCardProps) {
    const { t } = useLanguage();

    if (!forecast) {
        return (
            <div className="flex items-center justify-center rounded-card bg-surface p-6 shadow-card">
                <p className="text-sm text-text-muted">{t.common.loading}</p>
            </div>
        );
    }

    const risk =
        activeMetric === "do"
            ? calcLowerBoundRisk(forecast.future_do, settings.do_danger)
            : activeMetric === "temp"
                ? calcRangeRisk(forecast.future_temp, settings.temp_min, settings.temp_max)
                : activeMetric === "ph"
                    ? calcRangeRisk(forecast.future_ph, settings.ph_min, settings.ph_max)
                    : calcRangeRisk(forecast.future_turbidity, settings.turbidity_min, settings.turbidity_max);

    const device = resolveDevice(activeMetric, forecast, settings);
    const canExecute = device && risk.level !== "safe" && settings.system_mode === "manual";

    async function handleExecute() {
        if (!device) return;
        try {
            await apiClient.post("/api/control", { device, state: "ON" });
        } catch (error) {
            console.error("Thực thi khuyến nghị thất bại:", error);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-6 text-center shadow-card sm:flex-row sm:text-left">
            <RiskGauge percent={risk.percent} level={risk.level} />
            <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{t.dashboard.riskTitle}</p>
                <p className="mt-1 text-base font-bold text-text-primary">{t.dashboard.riskLevel[risk.level]}</p>
                <p className="mt-1 text-sm text-text-secondary">{t.dashboard.riskHint[activeMetric]}</p>

                {settings.system_mode === "auto" && risk.level !== "safe" && (
                    <p className="mt-2 text-xs font-medium text-primary">{t.dashboard.riskAutoNote}</p>
                )}

                {canExecute && (
                    <button
                        type="button"
                        onClick={handleExecute}
                        className="mt-3 rounded-pill bg-primary px-4 py-1.5 text-xs font-semibold text-white"
                    >
                        {t.dashboard.riskExecute}
                    </button>
                )}
            </div>
        </div>
    );
}