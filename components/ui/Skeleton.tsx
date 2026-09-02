interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return <div className={`animate-skeleton rounded-lg bg-surface-muted ${className}`} />;
}

export function SkeletonCard() {
    return (
        <div className="rounded-card bg-surface p-5 shadow-card">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="mt-3 h-4 w-20" />
            <Skeleton className="mt-2 h-8 w-24" />
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div className="flex items-center gap-3 rounded-xl p-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
            <div className="flex-1">
                <Skeleton className="h-3.5 w-1/3" />
                <Skeleton className="mt-2 h-3 w-2/3" />
            </div>
        </div>
    );
}

export function SkeletonChart() {
    return <Skeleton className="h-65 w-full rounded-xl" />;
}