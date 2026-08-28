import { useLanguage } from "@/hooks/useLanguage";
import type { HistoryPoint } from "@/types/history";

export default function DataTable({ points }: { points: HistoryPoint[] }) {
    const { t } = useLanguage();
    const rows = [...points].reverse(); // mới nhất trước, khớp bản gốc

    return (
        <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-3 px-2 text-sm font-bold text-slate-700">{t.history.tableTitle}</h3>
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b-2 border-slate-100 text-slate-500">
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
                            <td colSpan={5} className="p-6 text-center text-slate-400">
                                {t.history.noData}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.timestamp} className="border-b border-slate-50">
                                <td className="p-3">{new Date(row.timestamp).toLocaleString()}</td>
                                <td className="p-3 font-semibold text-emerald-600">{row.do.toFixed(2)}</td>
                                <td className="p-3 font-semibold text-orange-500">{row.temp.toFixed(1)}</td>
                                <td className="p-3 font-semibold text-blue-500">{row.ph.toFixed(2)}</td>
                                <td className="p-3 font-semibold text-red-500">{row.turbidity.toFixed(1)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}