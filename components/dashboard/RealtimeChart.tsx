"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLanguage } from "@/hooks/useLanguage";
import type { SensorData } from "@/types/sensor";
import type { Settings } from "@/types/settings";

const MAX_POINTS = 30;

interface ChartPoint {
    time: string;
    temp: number;
    do: number;
    ph: number;
}

interface RealtimeChartProps {
    data: SensorData | null;
    settings: Settings | null;
}

export default function RealtimeChart({ data, settings }: RealtimeChartProps) {
    const [points, setPoints] = useState<ChartPoint[]>([]);
    const { t, language } = useLanguage();

    useEffect(() => {
        if (!data) return;
        const locale = language === "vi" ? "vi-VN" : "en-US";
        const time = new Date(data.timestamp).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

        setPoints((prev) => {
            const next = [...prev, { time, temp: data.temp, do: data.do, ph: data.ph }];
            return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
        });
    }, [data, language]);

    return (
        <div className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="mb-4 text-sm font-semibold text-text-secondary">{t.dashboard.trend}</h2>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={points}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="time" stroke="var(--color-text-muted)" fontSize={12} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                    <Tooltip />
                    {settings && (
                        <ReferenceArea
                            y1={0}
                            y2={settings.do_danger}
                            fill="var(--color-danger)"
                            fillOpacity={0.08}
                            ifOverflow="extendDomain"
                        />
                    )}
                    <Line type="monotone" dataKey="temp" stroke="var(--color-warning)" name={t.history.tempLegend} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="do" stroke="var(--color-success)" name={t.history.doLegend} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="ph" stroke="var(--color-info)" name={t.history.phLegend} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}