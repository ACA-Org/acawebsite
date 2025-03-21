import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
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
    buttonType,
    menuId,
    variant = "primary",
    setActiveItem,
    activeItem,
    className,
    ...props
}: ExpandingIconButtonProps) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <motion.div
            className="w-fit"
            initial={false}
            animate={{
                width: menuId === activeItem ? "auto" : "40px",
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            <Button
                ref={buttonRef}
                variant={variant}
                buttonType={buttonType}
                className={cn(
                    "w-full px-4 py-2 rounded-full transition-colors duration-300 ease-out bg-transparent hover:bg-blue-100",
                    menuId === activeItem && "bg-blue-100",
                    className
                )}
                onMouseEnter={() => setActiveItem(menuId)}
                onMouseLeave={() => {
                    // setTimeout(() => {
                    setActiveItem("sign_in");
                    // }, 150);
                }}
                {...props}
            >
                <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={false}
                    animate={{
                        width: menuId === activeItem ? "auto" : "20px",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    <Icon
                        className={cn(
                            "h-6 aspect-square stroke-blue-300",
                            menuId === activeItem && "strokeWhite"
                        )}
                    />
                    <AnimatePresence>
                        {menuId === activeItem && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{
                                    opacity: 1,
                                    width: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    width: 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                                className="whitespace-nowrap overflow-hidden text-sm leading-[14px]"
                            >
                                {label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Button>
        </motion.div>
    );
}
