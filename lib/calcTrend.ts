export function calcTrendPercent(current: number | undefined, baseline: number | undefined): number | null {
    if (current === undefined || baseline === undefined || baseline === 0) return null;
    return ((current - baseline) / baseline) * 100;
}