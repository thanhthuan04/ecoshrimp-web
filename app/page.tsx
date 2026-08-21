"use client";

import { useEffect, useRef, useState } from "react";
import DeviceControl from "@/components/control/DeviceControl";
import SystemModeToggle from "@/components/control/SystemModeToggle";
import RealtimeCard from "@/components/dashboard/RealtimeCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Toast from "@/components/dashboard/Toast";
import { useToast } from "@/hooks/useToast";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { SystemMode } from "@/types/settings";

const THRESHOLDS = {
  do_danger: 4.0,
  temp_min: 22.0,
  temp_max: 35.0,
  ph_min: 6.5,
  ph_max: 9.0,
  turbidity_max: 70.0,
};

export default function DashboardPage() {
  const { data, status } = useWebSocket();
  const { toasts, showToast } = useToast();
  const lastAlertedTimestamp = useRef<string | null>(null);
  const [systemMode, setSystemMode] = useState<SystemMode>("manual");

  useEffect(() => {
    if (!data || data.timestamp === lastAlertedTimestamp.current) return;
    lastAlertedTimestamp.current = data.timestamp;

    if (data.do < THRESHOLDS.do_danger) {
      showToast(`DO nguy hiểm: ${data.do} mg/L`, "danger");
    }
    if (data.temp < THRESHOLDS.temp_min || data.temp > THRESHOLDS.temp_max) {
      showToast(`Nhiệt độ bất thường: ${data.temp}°C`, "warning");
    }
    if (data.turbidity > THRESHOLDS.turbidity_max) {
      showToast(`Độ đục cao: ${data.turbidity} NTU`, "warning");
    }
  }, [data, showToast]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tổng quan ao nuôi</h1>
        <div className="flex items-center gap-3">
          <SystemModeToggle mode={systemMode} onModeChange={setSystemMode} />
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RealtimeCard
          label="Nhiệt độ"
          value={data?.temp}
          unit="°C"
          isDanger={data ? data.temp > THRESHOLDS.temp_max || data.temp < THRESHOLDS.temp_min : false}
        />
        <RealtimeCard
          label="pH"
          value={data?.ph}
          unit=""
          isDanger={data ? data.ph > THRESHOLDS.ph_max || data.ph < THRESHOLDS.ph_min : false}
        />
        <RealtimeCard
          label="Oxy hoà tan (DO)"
          value={data?.do}
          unit="mg/L"
          isDanger={data ? data.do < THRESHOLDS.do_danger : false}
        />
        <RealtimeCard
          label="Độ đục"
          value={data?.turbidity}
          unit="NTU"
          isDanger={data ? data.turbidity > THRESHOLDS.turbidity_max : false}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DeviceControl device="aerator" label="Máy sục khí" isAutoMode={systemMode === "auto"} />
        <DeviceControl device="pump_in" label="Bơm nước vào" isAutoMode={systemMode === "auto"} />
        <DeviceControl device="pump_out" label="Bơm nước ra" isAutoMode={systemMode === "auto"} />
        <DeviceControl device="light" label="Đèn" isAutoMode={systemMode === "auto"} />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}