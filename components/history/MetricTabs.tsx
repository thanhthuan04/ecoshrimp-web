"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryMetric } from "@/types/history";

interface MetricTabsProps {
    active: HistoryMetric;
    onChange: (metric: HistoryMetric) => void;
}

export default function MetricTabs({ active, onChange }: MetricTabsProps) {
    const { t } = useLanguage();

    const metrics: { key: HistoryMetric; label: string }[] = [
        { key: "do", label: t.history.metricDo },
        { key: "temp", label: t.history.metricTemp },
        { key: "ph", label: t.history.metricPh },
        { key: "turbidity", label: t.history.metricTurbidity },
    ];

    return (
        <div className="flex gap-1 overflow-x-auto rounded-pill border border-border bg-surface-muted p-1">
            {metrics.map((metric) => (
                <button
                    key={metric.key}
                    type="button"
                    onClick={() => onChange(metric.key)}
                    className={`whitespace-nowrap rounded-pill px-3 py-1.5 text-xs font-bold transition ${active === metric.key ? "bg-surface text-primary shadow-card" : "text-text-secondary"
                        }`}
                >
                    {metric.label}
                </button>
            ))}
        </div>
    );
}