"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryMetric } from "@/types/history";
import { Button } from "@/components/ui/Button";

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
                <Button
                    key={metric.key}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(metric.key)}
                    className={`whitespace-nowrap rounded-pill h-8 transition flex-1 ${active === metric.key ? "bg-surface text-primary shadow-card hover:bg-surface hover:text-primary" : "text-text-secondary"}`}
                >
                    {metric.label}
                </Button>
            ))}
        </div>
    );
}