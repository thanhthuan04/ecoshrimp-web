"use client";

import { Loader2, Wifi, WifiOff } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { ConnectionStatus } from "@/hooks/useWebSocket";

const STATUS_STYLE: Record<ConnectionStatus, string> = {
    online: "bg-emerald-100 text-emerald-700",
    connecting: "bg-amber-100 text-amber-700",
    offline: "bg-red-100 text-red-700",
};

const STATUS_ICON: Record<ConnectionStatus, typeof Wifi> = {
    online: Wifi,
    connecting: Loader2,
    offline: WifiOff,
};

export default function StatusBadge({ status }: { status: ConnectionStatus }) {
    const { t } = useLanguage();
    const Icon = STATUS_ICON[status];

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}
        >
            <Icon className={`h-3.5 w-3.5 ${status === "connecting" ? "animate-spin" : ""}`} />
            {t.status[status]}
        </span>
    );
}