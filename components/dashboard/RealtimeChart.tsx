"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SensorData } from "@/types/sensor";

const MAX_POINTS = 30;

interface ChartPoint {
    time: string;
    temp: number;
    do: number;
    ph: number;
}

export default function RealtimeChart({ data }: { data: SensorData | null }) {
    const [points, setPoints] = useState<ChartPoint[]>([]);

    useEffect(() => {
        if (!data) return;
        const time = new Date(data.timestamp).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

        setPoints((prev) => {
            const next = [...prev, { time, temp: data.temp, do: data.do, ph: data.ph }];
            return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
        });
    }, [data]);

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-slate-500">Xu hướng gần đây</h2>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={points}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#fb923c" name="Nhiệt độ (°C)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="do" stroke="#22c55e" name="DO (mg/L)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="ph" stroke="#93c5fd" name="pH" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}