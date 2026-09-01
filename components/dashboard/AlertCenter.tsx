"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Bot, Droplets, FlaskConical, Thermometer } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { apiClient } from "@/lib/apiClient";
import type { AlertItem, AlertListResponse, AlertType } from "@/types/alert";

const PAGE_SIZE = 5;

const TYPE_ICON: Record<AlertType, typeof AlertTriangle> = {
    do_low: Droplets,
    temp_out_of_range: Thermometer,
    ph_out_of_range: FlaskConical,
    turbidity_high: AlertTriangle,
    ai_early_warning: Bot,
};

function timeAgo(timestamp: string, locale: "vi" | "en"): string {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return locale === "vi" ? "vừa xong" : "just now";
    if (minutes < 60) return locale === "vi" ? `${minutes} phút trước` : `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return locale === "vi" ? `${hours} giờ trước` : `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return locale === "vi" ? `${days} ngày trước` : `${days}d ago`;
}

export default function AlertCenter() {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { t, language } = useLanguage();

    useEffect(() => {
        apiClient
            .get<AlertListResponse>(`/api/alerts?limit=${PAGE_SIZE}`)
            .then((res) => {
                setAlerts(res.items);
                setTotal(res.total);
            })
            .catch((error) => console.error("Không tải được danh sách cảnh báo:", error))
            .finally(() => setIsLoading(false));
    }, []);

    async function loadMore() {
        try {
            const res = await apiClient.get<AlertListResponse>(`/api/alerts?limit=${PAGE_SIZE}&skip=${alerts.length}`);
            setAlerts((prev) => [...prev, ...res.items]);
        } catch (error) {
            console.error("Không tải thêm được cảnh báo:", error);
        }
    }

    return (
        <div className="rounded-card bg-surface p-6 shadow-card">
            <h2 className="mb-4 text-sm font-semibold text-text-secondary">{t.alertCenter.title}</h2>

            {isLoading && <p className="py-6 text-center text-sm text-text-secondary">{t.common.loading}</p>}

            {!isLoading && alerts.length === 0 && (
                <p className="py-6 text-center text-sm text-text-muted">{t.alertCenter.empty}</p>
            )}

            {!isLoading && alerts.length > 0 && (
                <>
                    <ul className="flex flex-col gap-3">
                        {alerts.map((alert) => {
                            const Icon = TYPE_ICON[alert.type];
                            const isEarlyWarning = alert.type === "ai_early_warning";
                            return (
                                <li
                                    key={`${alert.timestamp}-${alert.type}`}
                                    className={`flex items-start gap-3 rounded-xl border-l-4 p-3 ${isEarlyWarning ? "border-info bg-info-soft" : "border-danger bg-danger-soft"
                                        }`}
                                >
                                    <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${isEarlyWarning ? "text-info" : "text-danger"}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-text-primary">{t.alertCenter.typeLabel[alert.type]}</p>
                                        <p className="truncate text-xs text-text-secondary">{alert.message}</p>
                                    </div>
                                    <span className="shrink-0 text-xs text-text-muted">{timeAgo(alert.timestamp, language)}</span>
                                </li>
                            );
                        })}
                    </ul>

                    {alerts.length < total && (
                        <button
                            type="button"
                            onClick={loadMore}
                            className="mt-4 w-full rounded-pill border border-border py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted"
                        >
                            {t.alertCenter.loadMore}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}