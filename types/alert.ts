export type AlertType = "do_low" | "temp_out_of_range" | "ph_out_of_range" | "turbidity_high" | "ai_early_warning";

export interface AlertItem {
    timestamp: string;
    type: AlertType;
    message: string;
    value: number;
    threshold: number;
    sent_telegram: boolean;
}

export interface AlertListResponse {
    items: AlertItem[];
    total: number;
}