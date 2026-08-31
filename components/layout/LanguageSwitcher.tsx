"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 rounded-full bg-surface-muted p-1 text-xs font-semibold">
            <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`rounded-full px-2.5 py-1 transition ${language === "vi" ? "bg-surface shadow-card" : "text-text-secondary"}`}
            >
                VI
            </button>
            <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 transition ${language === "en" ? "bg-surface shadow-card" : "text-text-secondary"}`}
            >
                EN
            </button>
        </div>
    );
}