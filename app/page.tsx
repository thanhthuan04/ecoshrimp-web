"use client";

import { useEffect, useRef, useState } from "react";
import DeviceControl from "@/components/control/DeviceControl";
import SystemModeToggle from "@/components/control/SystemModeToggle";
import RealtimeCard from "@/components/dashboard/RealtimeCard";
import RealtimeChart from "@/components/dashboard/RealtimeChart";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Toast from "@/components/dashboard/Toast";
import WaterLevelCard from "@/components/dashboard/WaterLevelCard";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import MetricTabs from "@/components/history/MetricTabs";
import { useToast } from "@/hooks/useToast";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { HistoryMetric } from "@/types/history";
import type { Settings, SystemMode } from "@/types/settings";

export default function DashboardPage() {
  const { data, status } = useWebSocket();
  const { toasts, showToast } = useToast();
  const { t } = useLanguage();
  const lastAlertedTimestamp = useRef<string | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [riskMetric, setRiskMetric] = useState<HistoryMetric>("do");

  useEffect(() => {
    apiClient
      .get<Settings>("/api/settings")
      .then(setSettings)
      .catch((error) => console.error("Không tải được cấu hình ngưỡng:", error));
  }, []);

  function handleModeChange(mode: SystemMode) {
    setSettings((prev) => (prev ? { ...prev, system_mode: mode } : prev));
  }

  useEffect(() => {
    if (!data || !settings || data.timestamp === lastAlertedTimestamp.current) return;
    lastAlertedTimestamp.current = data.timestamp;

    if (data.do < settings.do_danger) {
      showToast(t.dashboard.alertDoLow(data.do), "danger");
    }
    if (data.temp < settings.temp_min || data.temp > settings.temp_max) {
      showToast(t.dashboard.alertTempAbnormal(data.temp), "warning");
    }
    if (data.turbidity > settings.turbidity_max) {
      showToast(t.dashboard.alertTurbidityHigh(data.turbidity), "warning");
    }
  }, [data, settings, showToast, t]);

  const isAutoMode = settings?.system_mode === "auto";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
        <div className="flex items-center gap-3">
          {settings && <SystemModeToggle mode={settings.system_mode} onModeChange={handleModeChange} />}
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <RealtimeCard
          label={t.dashboard.temp}
          value={data?.temp}
          unit="°C"
          isDanger={data && settings ? data.temp > settings.temp_max || data.temp < settings.temp_min : false}
        />
        <RealtimeCard
          label={t.dashboard.ph}
          value={data?.ph}
          unit=""
          isDanger={data && settings ? data.ph > settings.ph_max || data.ph < settings.ph_min : false}
        />
        <RealtimeCard
          label={t.dashboard.do}
          value={data?.do}
          unit="mg/L"
          isDanger={data && settings ? data.do < settings.do_danger : false}
        />
        <RealtimeCard
          label={t.dashboard.turbidity}
          value={data?.turbidity}
          unit="NTU"
          isDanger={data && settings ? data.turbidity > settings.turbidity_max : false}
        />
        <WaterLevelCard isNormal={data?.level} />
      </div>

      <RealtimeChart data={data} settings={settings} />

      {settings && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <MetricTabs active={riskMetric} onChange={setRiskMetric} />
            <RecommendationCard forecast={data?.forecast} settings={settings} activeMetric={riskMetric} />
          </div>
          <WeatherWidget location={settings.farm_location} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DeviceControl device="aerator" label={t.dashboard.deviceAerator} isAutoMode={isAutoMode} />
        <DeviceControl device="pump_in" label={t.dashboard.devicePumpIn} isAutoMode={isAutoMode} />
        <DeviceControl device="pump_out" label={t.dashboard.devicePumpOut} isAutoMode={isAutoMode} isWaterLow={data ? !data.level : false} onBlocked={(msg) => showToast(msg, "warning")} />
        <DeviceControl device="light" label={t.dashboard.deviceLight} isAutoMode={isAutoMode} />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}