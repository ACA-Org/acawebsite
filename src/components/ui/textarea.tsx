import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  hasError,
  ...props
}: React.ComponentProps<"textarea"> & {
  hasError?: boolean;
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 border bg-transparent px-4 py-3 text-lg transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 rounded-sm",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-blue-100",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
        "flex items-center gap-2 self-stretch border bg-gray-50 px-4 py-3 border-solid",
        hasError && "border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
