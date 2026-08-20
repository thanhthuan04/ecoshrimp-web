export interface ForecastData {
    future_do: number;
    future_temp: number;
    future_ph: number;
    future_turbidity: number;
}

export interface SensorData {
    timestamp: string;
    temp: number;
    ph: number;
    do: number;
    turbidity: number;
    level: number;
    forecast?: ForecastData;
}