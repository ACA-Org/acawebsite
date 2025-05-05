import * as React from "react";

import { cn } from "@/lib/utils";

export const inputStyles = [
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 border bg-transparent px-4 py-3 text-lg transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 rounded-sm",
  "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-blue-100",
  "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
  "flex h-16 items-center gap-2 self-stretch border bg-gray-50 px-4 py-3 border-solid",
];

function Input({
  className,
  type,
  hasError,
  ...props
}: React.ComponentProps<"input"> & {
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(...inputStyles, hasError && "border-red-500", className)}
      {...props}
    />
  );
}

export { Input };
