"use client";

import { useCallback, useState } from "react";

export interface ToastItem {
    id: number;
    message: string;
    type: "danger" | "warning" | "info";
}

let _nextId = 1;

export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = useCallback((message: string, type: ToastItem["type"] = "danger") => {
        const id = _nextId++;
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    return { toasts, showToast };
}