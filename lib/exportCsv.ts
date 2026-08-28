import type { HistoryPoint } from "@/types/history";

export function exportHistoryToCsv(points: HistoryPoint[], filename: string) {
    if (points.length === 0) return;

    const header = "Thoi Gian,Oxy(DO),Nhiet Do,pH,Do Duc";
    const rows = points.map((p) => `${p.timestamp},${p.do},${p.temp},${p.ph},${p.turbidity}`);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
}