import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryPoint } from "@/types/history";

export default function DataTable({ points }: { points: HistoryPoint[] }) {
    const { t } = useLanguage();
    const rows = [...points].reverse();

    return (
        <div className="overflow-x-auto rounded-card bg-surface p-4 shadow-card">
            <h3 className="mb-3 px-2 text-sm font-bold text-text-primary">{t.history.tableTitle}</h3>
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b-2 border-border text-text-secondary">
                        <th className="p-3 font-semibold">{t.history.colTime}</th>
                        <th className="p-3 font-semibold">{t.history.colDo}</th>
                        <th className="p-3 font-semibold">{t.history.colTemp}</th>
                        <th className="p-3 font-semibold">{t.history.colPh}</th>
                        <th className="p-3 font-semibold">{t.history.colTurbidity}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-6 text-center text-text-muted">
                                {t.history.noData}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.timestamp} className="border-b border-border">
                                <td className="p-3">{new Date(row.timestamp).toLocaleString()}</td>
                                <td className="p-3 font-semibold text-success">{row.do.toFixed(2)}</td>
                                <td className="p-3 font-semibold text-warning">{row.temp.toFixed(1)}</td>
                                <td className="p-3 font-semibold text-info">{row.ph.toFixed(2)}</td>
                                <td className="p-3 font-semibold text-danger">{row.turbidity.toFixed(1)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}