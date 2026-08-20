export type HistoryRange = "day" | "week" | "month";

export interface HistoryPoint {
    timestamp: string;
    avg_temp: number;
    avg_ph: number;
    avg_do: number;
    avg_turbidity: number;
}