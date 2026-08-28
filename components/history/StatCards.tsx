import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryPoint } from "@/types/history";

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
                        <div key={label} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                            <p className="mt-2 text-2xl font-extrabold text-slate-300">--</p>
                        </div>
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
        { label: t.history.statAvgDo, value: avgDo.toFixed(1), color: "text-emerald-600" },
        { label: t.history.statMaxTemp, value: maxTemp.toFixed(1), color: "text-orange-500" },
        { label: t.history.statPhRange, value: `${minPh.toFixed(1)} - ${maxPh.toFixed(1)}`, color: "text-blue-500" },
        { label: t.history.statMaxTurbidity, value: maxTurbidity.toFixed(1), color: "text-red-500" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                    <p className={`mt-2 text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
}