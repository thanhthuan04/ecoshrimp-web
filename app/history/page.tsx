"use client";

import { useState } from "react";
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
import type { HistoryPoint, HistoryRange } from "@/types/history";

const MOCK_HISTORY: HistoryPoint[] = [
    { timestamp: "08:00", avg_temp: 28.4, avg_ph: 7.6, avg_do: 5.1, avg_turbidity: 22 },
    { timestamp: "10:00", avg_temp: 29.1, avg_ph: 7.7, avg_do: 4.9, avg_turbidity: 24 },
    { timestamp: "12:00", avg_temp: 30.2, avg_ph: 7.8, avg_do: 4.6, avg_turbidity: 27 },
    { timestamp: "14:00", avg_temp: 30.8, avg_ph: 7.8, avg_do: 4.4, avg_turbidity: 29 },
    { timestamp: "16:00", avg_temp: 29.9, avg_ph: 7.7, avg_do: 4.8, avg_turbidity: 25 },
];

export default function HistoryPage() {
    const [range, setRange] = useState<HistoryRange>("day");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Lịch sử dữ liệu</h1>
                <ChartTabs active={range} onChange={setRange} />
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={MOCK_HISTORY}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="avg_temp" stroke="#fb923c" name="Nhiệt độ (°C)" strokeWidth={2} />
                        <Line type="monotone" dataKey="avg_do" stroke="#22c55e" name="DO (mg/L)" strokeWidth={2} />
                        <Line type="monotone" dataKey="avg_ph" stroke="#93c5fd" name="pH" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}