import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryPoint } from "@/types/history";
import { Card } from "@/components/ui/Card";

interface StatCardsProps {
    points: HistoryPoint[];
}

export default function StatCards({ points }: StatCardsProps) {
    const { t } = useLanguage();

    if (points.length === 0) {
        return (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[t.history.statAvgDo, t.history.statMaxTemp, t.history.statPhRange, t.history.statMaxTurbidity].map(
                    (label) => (
                        <Card key={label} className="p-5 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{label}</p>
                            <p className="mt-2 text-2xl font-extrabold text-text-muted">--</p>
                        </Card>
                    )
                )}
            </div>
        );
    }

    const avgDo = points.reduce((sum, p) => sum + p.do, 0) / points.length;
    const maxTemp = Math.max(...points.map((p) => p.temp));
    const minPh = Math.min(...points.map((p) => p.ph));
    const maxPh = Math.max(...points.map((p) => p.ph));
    const maxTurbidity = Math.max(...points.map((p) => p.turbidity));

    const stats = [
        { label: t.history.statAvgDo, value: avgDo.toFixed(1), color: "text-success" },
        { label: t.history.statMaxTemp, value: maxTemp.toFixed(1), color: "text-warning" },
        { label: t.history.statPhRange, value: `${minPh.toFixed(1)} - ${maxPh.toFixed(1)}`, color: "text-info" },
        { label: t.history.statMaxTurbidity, value: maxTurbidity.toFixed(1), color: "text-danger" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="p-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{stat.label}</p>
                    <p className={`mt-2 text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </Card>
            ))}
        </div>
    );
}