export interface TimerConfig {
    enabled: boolean;
    start: string;
    end: string;
}

export type SystemMode = "auto" | "manual";

export interface Settings {
    system_mode: SystemMode;

    do_danger: number;
    ai_early_warning: number;
    temp_max: number;
    temp_min: number;
    ph_max: number;
    ph_min: number;
    turbidity_max: number;
    turbidity_min: number;

    auto_aerator: boolean;
    auto_pump_in: boolean;
    auto_pump_out: boolean;

    timer_aerator: TimerConfig;
    timer_pump_in: TimerConfig;
    timer_pump_out: TimerConfig;
    timer_light: TimerConfig;
}

export type SettingsUpdate = Partial<Settings>;