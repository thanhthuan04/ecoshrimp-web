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

const PH_LOW_THRESHOLD = 6.5;
const TURBIDITY_LOW_THRESHOLD_KEY = "turbidity_min" as const;

function resolveDevice(
    metric: HistoryMetric,
    forecast: ForecastData,
    settings: Settings
): "aerator" | "pump_in" | "pump_out" | "light" | null {
    switch (metric) {
        case "do":
            return "aerator";
        case "temp":
            return forecast.future_temp < 22 ? "light" : "pump_in";
        case "ph":
            return forecast.future_ph < PH_LOW_THRESHOLD ? "pump_in" : "pump_out";
        case "turbidity":
            return forecast.future_turbidity < settings[TURBIDITY_LOW_THRESHOLD_KEY] ? "pump_in" : "pump_out";
        default:
            return null;
    }
}

export default function RecommendationCard({ forecast, settings, activeMetric }: RecommendationCardProps) {
    const { t } = useLanguage();

    if (!forecast) {
        return (
            <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-400">{t.common.loading}</p>
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
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
            <RiskGauge percent={risk.percent} level={risk.level} />
            <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t.dashboard.riskTitle}</p>
                <p className="mt-1 text-base font-bold text-slate-800">{t.dashboard.riskLevel[risk.level]}</p>
                <p className="mt-1 text-sm text-slate-500">{t.dashboard.riskHint[activeMetric]}</p>

                {settings.system_mode === "auto" && risk.level !== "safe" && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">{t.dashboard.riskAutoNote}</p>
                )}

                {canExecute && (
                    <button
                        type="button"
                        onClick={handleExecute}
                        className="mt-3 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white"
                    >
                        {t.dashboard.riskExecute}
                    </button>
                )}
            </div>
        </div>
    );
}