import type { Settings } from "@/types/settings";

export const DEFAULT_SETTINGS: Settings = {
    system_mode: "manual",
    farm_location: "Đà Nẵng",

    do_danger: 4.0,
    ai_early_warning: 30,
    temp_max: 35.0,
    temp_min: 22.0,
    ph_max: 9.0,
    ph_min: 6.5,
    turbidity_max: 70.0,
    turbidity_min: 20.0,
    temp_low_threshold: 22.0,
    ph_low_threshold: 6.5,

    auto_aerator: false,
    auto_pump_in: false,
    auto_pump_out: false,
    auto_light: false,

    timer_aerator: { enabled: false, start: "", end: "" },
    timer_pump_in: { enabled: false, start: "", end: "" },
    timer_pump_out: { enabled: false, start: "", end: "" },
    timer_light: { enabled: false, start: "", end: "" },
};