import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { ToastItem } from "@/hooks/useToast";

const TYPE_CONFIG: Record<ToastItem["type"], { border: string; text: string; Icon: typeof AlertTriangle }> = {
    danger: { border: "border-danger", text: "text-danger", Icon: AlertTriangle },
    warning: { border: "border-warning", text: "text-warning", Icon: AlertCircle },
    info: { border: "border-success", text: "text-success", Icon: Info },
};

export default function Toast({ toasts }: { toasts: ToastItem[] }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map((toast) => {
                const { border, text, Icon } = TYPE_CONFIG[toast.type];
                return (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-2 rounded-xl border-l-4 bg-surface px-4 py-3 text-sm font-medium shadow-card-hover ${border} ${text}`}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {toast.message}
                    </div>
                );
            })}
        </div>
    );
}