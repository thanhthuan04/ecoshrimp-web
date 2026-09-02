"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 rounded-full bg-surface-muted p-1 text-xs font-semibold">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("vi")}
                className={`rounded-full px-2.5 h-7 transition ${language === "vi" ? "bg-surface shadow-card text-text-primary" : "text-text-secondary"}`}
            >
                VI
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 h-7 transition ${language === "en" ? "bg-surface shadow-card text-text-primary" : "text-text-secondary"}`}
            >
                EN
            </Button>
        </div>
    );
}