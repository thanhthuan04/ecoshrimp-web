interface RealtimeCardProps {
    label: string;
    value: number | undefined;
    unit: string;
    isDanger?: boolean;
}

export default function RealtimeCard({ label, value, unit, isDanger = false }: RealtimeCardProps) {
    return (
        <div className={`rounded-2xl bg-white p-5 shadow-sm ${isDanger ? "ring-2 ring-red-400" : ""}`}>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
                {value !== undefined ? value.toFixed(2) : "--"}
                <span className="ml-1 text-base font-normal text-slate-400">{unit}</span>
            </p>
        </div>
    );
}