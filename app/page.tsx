"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Droplet, FlaskConical, Thermometer, Wind } from "lucide-react";
import AlertCenter from "@/components/dashboard/AlertCenter";
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
import { calcTrendPercent } from "@/lib/calcTrend";
import { DEFAULT_SETTINGS } from "@/lib/defaultSettings";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { HistoryMetric, HistoryPoint } from "@/types/history";
import type { Settings, SystemMode } from "@/types/settings";

interface DailyAverage {
  temp: number;
  ph: number;
  do: number;
  turbidity: number;
}

export default function DashboardPage() {
  const { data, status } = useWebSocket();
  const { toasts, showToast } = useToast();
  const { t } = useLanguage();
  const lastAlertedTimestamp = useRef<string | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSettingsOffline, setIsSettingsOffline] = useState(false);
  const [riskMetric, setRiskMetric] = useState<HistoryMetric>("do");
  const [yesterdayAvg, setYesterdayAvg] = useState<DailyAverage | null>(null);

  useEffect(() => {
    apiClient
      .get<Settings>("/api/settings")
      .then((result) => {
        setSettings(result);
        setIsSettingsOffline(false);
      })
      .catch((error) => {
        console.error("Không tải được cấu hình ngưỡng, dùng giá trị mặc định:", error);
        setIsSettingsOffline(true);
      });
  }, []);

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().slice(0, 10);

    apiClient
      .get<HistoryPoint[]>(`/api/history?range=day&date=${dateStr}`)
      .then((points) => {
        if (points.length === 0) return;
        const avg = (key: keyof HistoryPoint) =>
          points.reduce((sum, p) => sum + (p[key] as number), 0) / points.length;
        setYesterdayAvg({ temp: avg("temp"), ph: avg("ph"), do: avg("do"), turbidity: avg("turbidity") });
      })
      .catch((error) => console.error("Không tải được dữ liệu hôm qua để tính trend:", error));
  }, []);

  function handleModeChange(mode: SystemMode) {
    setSettings((prev) => ({ ...prev, system_mode: mode }));
  }

  useEffect(() => {
    if (!data || data.timestamp === lastAlertedTimestamp.current) return;
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

  const isAutoMode = settings.system_mode === "auto";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
        <div className="flex items-center gap-3">
          <SystemModeToggle mode={settings.system_mode} onModeChange={handleModeChange} />
          <StatusBadge status={status} />
        </div>
      </div>

      {isSettingsOffline && (
        <div className="flex items-start gap-2 rounded-card border border-warning bg-warning-soft px-4 py-3 text-sm text-warning">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {t.common.offlineNotice}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <RealtimeCard
          label={t.dashboard.temp}
          value={data?.temp}
          unit="°C"
          icon={Thermometer}
          isDanger={data ? data.temp > settings.temp_max || data.temp < settings.temp_min : false}
          trendPercent={calcTrendPercent(data?.temp, yesterdayAvg?.temp)}
          themeColor="warning"
        />
        <RealtimeCard
          label={t.dashboard.ph}
          value={data?.ph}
          unit=""
          icon={FlaskConical}
          isDanger={data ? data.ph > settings.ph_max || data.ph < settings.ph_min : false}
          trendPercent={calcTrendPercent(data?.ph, yesterdayAvg?.ph)}
          themeColor="success"
        />
        <RealtimeCard
          label={t.dashboard.do}
          value={data?.do}
          unit="mg/L"
          icon={Wind}
          isDanger={data ? data.do < settings.do_danger : false}
          trendPercent={calcTrendPercent(data?.do, yesterdayAvg?.do)}
          themeColor="info"
        />
        <RealtimeCard
          label={t.dashboard.turbidity}
          value={data?.turbidity}
          unit="NTU"
          icon={Droplet}
          isDanger={data ? data.turbidity > settings.turbidity_max : false}
          trendPercent={calcTrendPercent(data?.turbidity, yesterdayAvg?.turbidity)}
          themeColor="muted"
        />
        <WaterLevelCard isNormal={data?.level} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <RealtimeChart data={data} settings={settings} />
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-text-primary px-1">Bảng Điều Khiển</h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
                <DeviceControl device="pump_in" label={t.dashboard.devicePumpIn} isAutoMode={isAutoMode} />
                <DeviceControl
                  device="pump_out"
                  label={t.dashboard.devicePumpOut}
                  isAutoMode={isAutoMode}
                  isWaterLow={data ? !data.level : false}
                  onBlocked={(msg) => showToast(msg, "warning")}
                />
                <DeviceControl device="light" label={t.dashboard.deviceLight} isAutoMode={isAutoMode} />
                <DeviceControl device="aerator" label={t.dashboard.deviceAerator} isAutoMode={isAutoMode} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-2">
          <MetricTabs active={riskMetric} onChange={setRiskMetric} />
          <RecommendationCard forecast={data?.forecast} settings={settings} activeMetric={riskMetric} />
          <AlertCenter />
        </div>
        <WeatherWidget location={settings.farm_location} />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}