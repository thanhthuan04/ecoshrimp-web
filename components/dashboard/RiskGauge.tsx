import type { RiskLevel } from "@/lib/riskCalculator";

const LEVEL_COLOR: Record<RiskLevel, string> = {
    safe: "var(--color-success)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
};

export default function RiskGauge({ percent, level }: { percent: number; level: RiskLevel }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    const color = LEVEL_COLOR[level];

    return (
        <svg viewBox="0 0 130 130" className="h-28 w-28 shrink-0">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="12" />
            <circle
                cx="65"
                cy="65"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
            <text x="65" y="72" textAnchor="middle" fontSize="26" fontWeight="800" fill={color}>
                {percent}%
            </text>
        </svg>
    );
}