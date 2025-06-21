import { forwardRef } from "react";

import { inputStyles } from "./input";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export type NativeSelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hasError?: boolean;
    helperText?: string;
  };

const NativeSelect = forwardRef(
  (
    {
      name,
      id,
      className,
      autoComplete = "off",
      value,
      children,
      defaultValue: _defaultValue,
      ...rest
    }: NativeSelectProps,
    ref: any
  ) => {
    return (
      <div className={cn("relative", className)}>
        <select
          autoComplete={autoComplete}
          name={name}
          id={id || name}
          className={cn(
            ...inputStyles,
            "appearance-none leading-normal",
            className
          )}
          value={value}
          ref={ref}
          {...rest}
        >
          {children}
        </select>
        <ChevronDownIcon className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500" />
      </div>
    );
  }
);

NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
