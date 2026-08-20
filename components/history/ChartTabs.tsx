"use client";

import type { HistoryRange } from "@/types/history";

const TABS: { key: HistoryRange; label: string }[] = [
    { key: "day", label: "Ngày" },
    { key: "week", label: "Tuần" },
    { key: "month", label: "Tháng" },
];

interface ChartTabsProps {
    active: HistoryRange;
    onChange: (range: HistoryRange) => void;
}

export default function ChartTabs({ active, onChange }: ChartTabsProps) {
    return (
        <div className="flex gap-2 rounded-full bg-slate-100 p-1">
            {TABS.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    onClick={() => onChange(tab.key)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${active === tab.key ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}