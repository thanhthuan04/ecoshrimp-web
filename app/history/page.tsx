"use client";

import { useEffect, useState } from "react";
import { Calendar, Download } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartTabs from "@/components/history/ChartTabs";
import DataTable from "@/components/history/DataTable";
import MetricTabs from "@/components/history/MetricTabs";
import StatCards from "@/components/history/StatCards";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import { exportHistoryToCsv } from "@/lib/exportCsv";
import type { HistoryMetric, HistoryPoint, HistoryRange } from "@/types/history";

const METRIC_COLOR: Record<HistoryMetric, string> = {
    temp: "var(--color-warning)",
    do: "var(--color-success)",
    ph: "var(--color-info)",
    turbidity: "var(--color-danger)",
};

export default function HistoryPage() {
    const [range, setRange] = useState<HistoryRange>("day");
    const [metric, setMetric] = useState<HistoryMetric>("do");
    const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
    const [points, setPoints] = useState<HistoryPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        setIsLoading(true);
        apiClient
            .get<HistoryPoint[]>(`/api/history?range=${range}&date=${date}`)
            .then(setPoints)
            .catch((error) => console.error("Không tải được lịch sử:", error))
            .finally(() => setIsLoading(false));
    }, [range, date]);

    const metricLabel = {
        temp: t.history.tempLegend,
        do: t.history.doLegend,
        ph: t.history.phLegend,
        turbidity: t.history.metricTurbidity,
    }[metric];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold text-text-primary">{t.history.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input
                            type="date"
                            value={date}
                            max={new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setDate(e.target.value)}
                            className="rounded-lg border border-border bg-surface py-1.5 pl-9 pr-3 text-sm text-text-primary"
                        />
                    </div>
                    <ChartTabs active={range} onChange={setRange} />
                    <button
                        type="button"
                        onClick={() => exportHistoryToCsv(points, `Bao_Cao_EcoShrimp_${date}.csv`)}
                        disabled={points.length === 0}
                        className="flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary disabled:opacity-40"
                    >
                        <Download className="h-3.5 w-3.5" />
                        {t.history.exportCsv}
                    </button>
                </div>
            </div>

            <StatCards points={points} />

            <div className="rounded-card bg-surface p-6 shadow-card">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-text-secondary">{metricLabel}</h2>
                    <MetricTabs active={metric} onChange={setMetric} />
                </div>
                {isLoading ? (
                    <p className="py-16 text-center text-sm text-text-secondary">{t.common.loading}</p>
                ) : points.length === 0 ? (
                    <p className="py-16 text-center text-sm text-text-secondary">{t.history.noData}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={points}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis
                                dataKey="timestamp"
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickFormatter={(v) => new Date(v).toLocaleTimeString()}
                            />
                            <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                            <Tooltip labelFormatter={(v) => typeof v === "string" || typeof v === "number" ? new Date(v).toLocaleString() : ""} />
                            <Line type="monotone" dataKey={metric} stroke={METRIC_COLOR[metric]} name={metricLabel} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>

            <DataTable points={points} />
        </div>
    );
}