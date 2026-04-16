import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            // Variants
            "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 focus:ring-primary-500":
              variant === "primary",
            "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400":
              variant === "secondary",
            "border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-700 focus:ring-primary-400":
              variant === "outline",
            "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400":
              variant === "ghost",
            "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400":
              variant === "danger",
            // Sizes
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
