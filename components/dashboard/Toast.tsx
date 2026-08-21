import type { ToastItem } from "@/hooks/useToast";

const TYPE_STYLE: Record<ToastItem["type"], string> = {
    danger: "border-red-500 text-red-700",
    warning: "border-amber-500 text-amber-700",
    info: "border-emerald-500 text-emerald-700",
};

export default function Toast({ toasts }: { toasts: ToastItem[] }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`rounded-xl border-l-4 bg-white px-4 py-3 text-sm font-medium shadow-lg ${TYPE_STYLE[toast.type]}`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}