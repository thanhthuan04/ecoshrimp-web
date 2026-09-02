import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "default", ...props }, ref) => {
        let baseStyles = "inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
        
        let variantStyles = "";
        switch (variant) {
            case "primary":
                variantStyles = "bg-primary text-white hover:bg-primary-light";
                break;
            case "secondary":
                variantStyles = "bg-surface-muted text-text-primary hover:bg-surface-hover";
                break;
            case "danger":
                variantStyles = "bg-danger text-white hover:bg-danger/90";
                break;
            case "ghost":
                variantStyles = "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary";
                break;
        }

        let sizeStyles = "";
        switch (size) {
            case "default":
                sizeStyles = "h-10 px-4 py-2 rounded-lg text-sm";
                break;
            case "sm":
                sizeStyles = "h-8 px-3 rounded-md text-xs";
                break;
            case "lg":
                sizeStyles = "h-12 px-8 rounded-lg text-base";
                break;
            case "icon":
                sizeStyles = "h-10 w-10 rounded-lg";
                break;
        }

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
