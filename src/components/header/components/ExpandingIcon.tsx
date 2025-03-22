import * as React from "react";
import { LucideIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ExpandingIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        icon:
            | LucideIcon
            | ((
                  props: React.HTMLAttributes<SVGSVGElement>
              ) => React.JSX.Element);
        label: string;
        menuId: string;
        activeItem: string;
        setActiveItem: React.Dispatch<React.SetStateAction<string>>;
    };

export function ExpandingIcon({
    icon: Icon,
    label,
    menuId,
    activeItem,
    setActiveItem,
}: ExpandingIconButtonProps) {
    const isActive = menuId === activeItem;

    return (
        <div className="relative">
            <Button
                className={cn(
                    "flex items-center overflow-hidden rounded-full h-8 px-2 transition-all duration-500 ease-in-out z-10 relative bg-transparent",
                    isActive && "bg-blue-300 hover:bg-blue-300"
                )}
                onMouseEnter={() => setActiveItem(menuId)}
            >
                <Icon
                    className={cn(
                        "h-5 aspect-square transition-colors duration-500 ease-in-out stroke-gray-300",
                        isActive && "stroke-white"
                    )}
                />
                <span
                    className={cn(
                        "text-sm font-medium overflow-hidden whitespace-nowrap origin-left transition-all duration-500 ease-in-out text-white",
                        isActive
                            ? "opacity-100 max-w-[150px] scale-100 ml-1"
                            : "opacity-0 max-w-0 scale-95 ml-0"
                    )}
                >
                    {label}
                </span>
            </Button>
        </div>
    );
}
