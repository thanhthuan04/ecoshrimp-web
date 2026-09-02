import { HTMLAttributes, forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div
            ref={ref}
            className={`rounded-card bg-surface shadow-card border border-border backdrop-blur-xl ${className}`}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card };
