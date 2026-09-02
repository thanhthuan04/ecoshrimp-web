"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryRange } from "@/types/history";
import { Button } from "@/components/ui/Button";

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
                <Button
                    key={tab.key}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(tab.key)}
                    className={`rounded-pill px-4 h-8 transition ${active === tab.key ? "bg-surface text-primary shadow-card hover:bg-surface hover:text-primary" : "text-text-secondary"}`}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}