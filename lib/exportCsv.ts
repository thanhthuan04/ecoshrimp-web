import type { HistoryPoint } from "@/types/history";

interface ExportOptions {
    farmLocation?: string;
    rangeLabel?: string;
}

export function exportHistoryToCsv(points: HistoryPoint[], filename: string, options: ExportOptions = {}) {
    if (points.length === 0) return;

    const summaryLines: string[] = ["BAO CAO ECOSHRIMP"];
    if (options.farmLocation) summaryLines.push(`Vi tri ao,${options.farmLocation}`);
    if (options.rangeLabel) summaryLines.push(`Khoang thoi gian,${options.rangeLabel}`);
    summaryLines.push(`So dong du lieu,${points.length}`);

    const avgDo = points.reduce((sum, p) => sum + p.do, 0) / points.length;
    const maxTemp = Math.max(...points.map((p) => p.temp));
    summaryLines.push(`DO trung binh,${avgDo.toFixed(2)}`);
    summaryLines.push(`Nhiet do cao nhat,${maxTemp.toFixed(1)}`);
    summaryLines.push("");

    const tableHeader = "Thoi Gian,Oxy(DO),Nhiet Do,pH,Do Duc";
    const rows = points.map((p) => `${p.timestamp},${p.do},${p.temp},${p.ph},${p.turbidity}`);

    const csvContent = "data:text/csv;charset=utf-8," + [...summaryLines, tableHeader, ...rows].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
}