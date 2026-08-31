"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryRange } from "@/types/history";

interface ChartTabsProps {
    active: HistoryRange;
    onChange: (range: HistoryRange) => void;
}

export default function ChartTabs({ active, onChange }: ChartTabsProps) {
    const { t } = useLanguage();

    const tabs: { key: HistoryRange; label: string }[] = [
        { key: "day", label: t.history.tabDay },
        { key: "week", label: t.history.tabWeek },
        { key: "month", label: t.history.tabMonth },
    ];

    return (
        <div className="flex gap-2 rounded-pill bg-surface-muted p-1">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    onClick={() => onChange(tab.key)}
                    className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition ${active === tab.key ? "bg-surface text-primary shadow-card" : "text-text-secondary"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}