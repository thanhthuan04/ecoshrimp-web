"use client";

import { useEffect, useState } from "react";
import { CloudSun, Droplet, Wind } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
}

interface WeatherState {
    currentTemp: number;
    humidity: number;
    windSpeed: number;
    daily: DailyForecast[];
}

export default function WeatherWidget({ location }: { location: string }) {
    const [weather, setWeather] = useState<WeatherState | null>(null);
    const [error, setError] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        if (!location) return;
        let isCancelled = false;

        async function fetchWeather() {
            try {
                setError(false);
                setWeather(null);

                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=vi`
                );
                const geoData = await geoRes.json();
                const place = geoData?.results?.[0];
                if (!place) throw new Error("Không tìm thấy vị trí");

                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
                    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
                    `&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`
                );
                const weatherData = await weatherRes.json();

                if (isCancelled) return;

                setWeather({
                    currentTemp: weatherData.current.temperature_2m,
                    humidity: weatherData.current.relative_humidity_2m,
                    windSpeed: weatherData.current.wind_speed_10m,
                    daily: weatherData.daily.time.map((date: string, i: number) => ({
                        date,
                        maxTemp: weatherData.daily.temperature_2m_max[i],
                        minTemp: weatherData.daily.temperature_2m_min[i],
                    })),
                });
            } catch {
                if (!isCancelled) setError(true);
            }
        }

        fetchWeather();
        return () => {
            isCancelled = true;
        };
    }, [location]);

    return (
        <div className="rounded-card bg-surface p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-info" />
                <h2 className="text-sm font-semibold text-text-secondary">{t.weather.title}</h2>
            </div>

            {error && <p className="text-sm text-danger">{t.weather.error}</p>}
            {!error && !weather && <p className="text-sm text-text-muted">{t.weather.loading}</p>}

            {weather && (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-4xl font-extrabold text-text-primary">{Math.round(weather.currentTemp)}°C</p>
                        <div className="flex flex-col gap-1 text-xs text-text-secondary">
                            <span className="flex items-center gap-1">
                                <Droplet className="h-3.5 w-3.5" /> {t.weather.humidity}: {weather.humidity}%
                            </span>
                            <span className="flex items-center gap-1">
                                <Wind className="h-3.5 w-3.5" /> {t.weather.wind}: {weather.windSpeed} km/h
                            </span>
                        </div>
                    </div>

                    <p className="mb-2 mt-5 text-xs font-semibold text-text-muted">{t.weather.forecast4Days}</p>
                    <div className="grid grid-cols-4 gap-2">
                        {weather.daily.map((day) => (
                            <div key={day.date} className="rounded-xl bg-surface-muted p-2 text-center">
                                <p className="text-[11px] text-text-muted">
                                    {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-text-primary">{Math.round(day.maxTemp)}°</p>
                                <p className="text-[11px] text-text-muted">{Math.round(day.minTemp)}°</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}