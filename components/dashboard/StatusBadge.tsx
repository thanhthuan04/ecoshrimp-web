import type { ConnectionStatus } from "@/hooks/useWebSocket";

const STATUS_CONFIG: Record<ConnectionStatus, { label: string; className: string }> = {
    online: { label: "Đang kết nối", className: "bg-emerald-100 text-emerald-700" },
    connecting: { label: "Đang kết nối lại...", className: "bg-amber-100 text-amber-700" },
    offline: { label: "Mất kết nối", className: "bg-red-100 text-red-700" },
};

export default function StatusBadge({ status }: { status: ConnectionStatus }) {
    const config = STATUS_CONFIG[status];

    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            {config.label}
        </span>
    );
}