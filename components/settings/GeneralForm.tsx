"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Settings, SettingsUpdate } from "@/types/settings";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface GeneralFormProps {
    settings: Settings;
    onSave: (update: SettingsUpdate) => void;
}

export default function GeneralForm({ settings, onSave }: GeneralFormProps) {
    const [farmLocation, setFarmLocation] = useState(settings.farm_location);
    const { t } = useLanguage();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({ farm_location: farmLocation });
    }

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-lg font-bold text-text-primary">{t.general.title}</h2>

                <label className="flex flex-col gap-1 text-sm text-text-secondary">
                    {t.general.farmLocation}
                    <Input
                        type="text"
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                    />
                    <span className="text-xs text-text-muted">{t.general.farmLocationHint}</span>
                </label>

                <Button type="submit" className="mt-4">
                    {t.general.save}
                </Button>
            </form>
        </Card>
    );
}