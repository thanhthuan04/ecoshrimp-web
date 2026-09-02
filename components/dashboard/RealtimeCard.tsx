import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface RealtimeCardProps {
    label: string;
    value: number | undefined;
    unit: string;
    icon: LucideIcon;
    isDanger?: boolean;
    trendPercent?: number | null;
    themeColor?: "primary" | "info" | "warning" | "success" | "muted";
}

export default function RealtimeCard({
    label,
    value,
    unit,
    icon: Icon,
    isDanger = false,
    trendPercent,
    themeColor = "primary"
}: RealtimeCardProps) {
    const hasTrend = trendPercent !== null && trendPercent !== undefined && Number.isFinite(trendPercent);
    const isUp = hasTrend && trendPercent! > 0;
    const isDown = hasTrend && trendPercent! < 0;

    const THEME_STYLES = {
        primary: "bg-primary-soft text-primary-dark",
        info: "bg-info-soft text-info",
        warning: "bg-warning-soft text-warning",
        success: "bg-success-soft text-success",
        muted: "bg-surface-muted text-text-secondary",
    };

    return (
        <Card
            className={`p-5 transition-shadow hover:shadow-card-hover ${isDanger ? "ring-2 ring-danger" : ""}`}
        >
            <div className="flex items-center justify-between">
                <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDanger ? "bg-danger-soft text-danger" : THEME_STYLES[themeColor]}`}
                >
                    <Icon className="h-5 w-5" />
                </span>

                {hasTrend && (
                    <span
                        className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-success" : isDown ? "text-danger" : "text-text-muted"
                            }`}
                    >
                        {isUp && <ArrowUp className="h-3 w-3" />}
                        {isDown && <ArrowDown className="h-3 w-3" />}
                        {Math.abs(trendPercent!).toFixed(1)}%
                    </span>
                )}
            </div>

            <p className="mt-3 text-sm font-medium text-text-secondary">{label}</p>
            <p className="mt-1 text-3xl font-extrabold text-text-primary">
                {value !== undefined ? value.toFixed(2) : "--"}
                <span className="ml-1 text-base font-normal text-text-muted">{unit}</span>
            </p>
        </Card>
    );
}