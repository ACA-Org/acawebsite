import * as React from "react";
import { cn } from "@/lib/utils";

export interface CompactButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const CompactButton = React.forwardRef<
  HTMLButtonElement,
  CompactButtonProps
>(({ className, variant = "secondary", children, ...props }, ref) => {
  const baseStyles =
    "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary:
      "bg-blue-300 text-white hover:bg-blue-400 focus-visible:ring-blue-300",
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-300",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
});

CompactButton.displayName = "CompactButton";
