"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Language } from "@/lib/i18n/translations";

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("vi");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage phải được dùng bên trong LanguageProvider");
    }
    return context;
}