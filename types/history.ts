export type HistoryRange = "day" | "week" | "month";
export type HistoryMetric = "temp" | "ph" | "do" | "turbidity";

export interface HistoryPoint {
    timestamp: string;
    temp: number;
    ph: number;
    do: number;
    turbidity: number;
}