"use client";

import { useLanguage } from "@/hooks/useLanguage";

interface WaterLevelCardProps {
    isNormal: boolean | undefined;
}

export default function WaterLevelCard({ isNormal }: WaterLevelCardProps) {
    const { t } = useLanguage();
    const statusText = isNormal === undefined ? "--" : isNormal ? t.dashboard.waterNormal : t.dashboard.waterLow;
    const isDanger = isNormal === false;

    return (
        <div className={`rounded-2xl bg-white p-5 shadow-sm ${isDanger ? "ring-2 ring-red-400" : ""}`}>
            <p className="text-sm font-medium text-slate-500">{t.dashboard.waterLevel}</p>
            <p className={`mt-2 text-2xl font-bold ${isDanger ? "text-red-600" : "text-slate-900"}`}>{statusText}</p>
        </div>
    );
}