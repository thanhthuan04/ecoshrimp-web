"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import ChartTabs from "@/components/history/ChartTabs";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import type { HistoryPoint, HistoryRange } from "@/types/history";

export default function HistoryPage() {
    const [range, setRange] = useState<HistoryRange>("day");
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

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">{t.history.title}</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="date"
                            value={date}
                            max={new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setDate(e.target.value)}
                            className="rounded-lg border border-slate-200 py-1.5 pl-9 pr-3 text-sm"
                        />
                    </div>
                    <ChartTabs active={range} onChange={setRange} />
                </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                {isLoading ? (
                    <p className="py-16 text-center text-sm text-slate-500">{t.common.loading}</p>
                ) : points.length === 0 ? (
                    <p className="py-16 text-center text-sm text-slate-500">{t.common.loadError}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={points}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip />
                            <Line type="monotone" dataKey="avg_temp" stroke="#fb923c" name={t.history.tempLegend} strokeWidth={2} />
                            <Line type="monotone" dataKey="avg_do" stroke="#22c55e" name={t.history.doLegend} strokeWidth={2} />
                            <Line type="monotone" dataKey="avg_ph" stroke="#93c5fd" name={t.history.phLegend} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}