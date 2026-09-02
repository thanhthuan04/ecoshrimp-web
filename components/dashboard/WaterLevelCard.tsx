"use client";

import { Waves } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/Card";

interface WaterLevelCardProps {
    isNormal: boolean | undefined;
}

export default function WaterLevelCard({ isNormal }: WaterLevelCardProps) {
    const { t } = useLanguage();
    const statusText = isNormal === undefined ? "--" : isNormal ? t.dashboard.waterNormal : t.dashboard.waterLow;
    const isDanger = isNormal === false;

    return (
        <Card className={`p-5 transition-shadow hover:shadow-card-hover ${isDanger ? "ring-2 ring-danger" : ""}`}>
            <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDanger ? "bg-danger-soft text-danger" : "bg-info-soft text-info"
                    }`}
            >
                <Waves className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-medium text-text-secondary">{t.dashboard.waterLevel}</p>
            <p className={`mt-1 text-2xl font-extrabold ${isDanger ? "text-danger" : "text-text-primary"}`}>{statusText}</p>
        </Card>
    );
}