export type RiskLevel = "safe" | "warning" | "danger";

export interface RiskResult {
    percent: number;
    level: RiskLevel;
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

function levelFromPercent(percent: number): RiskLevel {
    if (percent >= 70) return "danger";
    if (percent >= 40) return "warning";
    return "safe";
}

export function calcRangeRisk(value: number, min: number, max: number): RiskResult {
    const margin = (max - min) * 0.15 || 1;
    let percent: number;

    if (value < min) {
        percent = clamp(50 + ((min - value) / margin) * 50, 50, 100);
    } else if (value > max) {
        percent = clamp(50 + ((value - max) / margin) * 50, 50, 100);
    } else {
        const center = (min + max) / 2;
        const halfRange = (max - min) / 2 || 1;
        const distFromCenter = Math.abs(value - center) / halfRange;
        percent = clamp(distFromCenter * 50, 0, 50);
    }

    return { percent: Math.round(percent), level: levelFromPercent(percent) };
}

export function calcLowerBoundRisk(value: number, danger: number): RiskResult {
    const margin = danger * 0.3 || 1;
    let percent: number;

    if (value < danger) {
        percent = clamp(50 + ((danger - value) / margin) * 50, 50, 100);
    } else {
        const safeDistance = value - danger;
        percent = clamp(50 - (safeDistance / margin) * 50, 0, 50);
    }

    return { percent: Math.round(percent), level: levelFromPercent(percent) };
}