import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
    trigger: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const NavMenuItem = ({
    trigger,
    children,
}: React.HTMLAttributes<HTMLDivElement> & NavItemProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (!timeoutRef?.current) return;
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                asChild
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="p-1 group cursor-pointer flex gap-3">
                    {trigger}

                    {children && (
                        <ChevronDown
                            className={cn(
                                "w-4 h-auto transition-transform group-hover:text-blue-200",
                                isOpen && "rotate-180"
                            )}
                        />
                    )}
                </div>
            </PopoverTrigger>
            {children && (
                <PopoverContent
                    className="p-2 w-max border-none rounded-xl shadow-xl"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    align="center"
                >
                    {children}
                </PopoverContent>
            )}
        </Popover>
    );
};

NavMenuItem.displayName = "NavMenuItem";

const NavLink = ({
    className,
    children,
    field,
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    field: LinkField;
}) => (
    <PrismicNextLink field={field} className={cn(className)}>
        {children}
    </PrismicNextLink>
);
NavLink.displayName = "NavLink";

const NavContent = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(className)} {...props}>
        {children}
    </div>
);
NavContent.displayName = "NavContent";

export { NavMenuItem, NavLink, NavContent };
