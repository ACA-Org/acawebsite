import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { PrismicNextLink } from "@prismicio/next";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-lg leading-[18px] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive px-8 py-3 has-[>svg]:px-3 border-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-200 border-blue-200 text-white hover:bg-blue-200/70",
                secondary:
                    "bg-blue-300 border-blue-200 text-white hover:bg-blue-300/70",
                tertiary:
                    "bg-gold-100 border-gold-100 hover:bg-gold-100/70 text-blue-300",
                error: "bg-red-200 text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                ghost: "hover:bg-gold-200 hover:text-grey-white dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            buttonType: {
                ghost: "border-2",
                filled: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            buttonType: "filled",
        },
    }
);

function Button({
    className,
    variant,
    buttonType,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, buttonType, className }))}
            {...props}
        />
    );
}

export type LinkButtonProps = React.ComponentProps<typeof PrismicNextLink> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ className, variant, href, buttonType, field, ...props }, ref) => {
        return (
            // @ts-expect-error PrismicNextLink field issue
            <PrismicNextLink
                className={cn(
                    buttonVariants({ variant, buttonType, className })
                )}
                ref={ref}
                href={href || ""}
                field={field}
                {...props}
            />
        );
    }
);
LinkButton.displayName = "LinkButton";

type ExpandingIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        icon: LucideIcon;
        label: string;
    };

function ExpandingIconButton({
    icon: Icon,
    label,
    buttonType,
    variant = "primary",
    className,
    ...props
}: ExpandingIconButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <motion.div
            className="w-fit"
            initial={false}
            animate={{
                width: isHovered ? "auto" : "40px",
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
                    "w-full transition-colors duration-300 ease-out bg-transparent group",
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <motion.div
                    className="flex items-center gap-2"
                    initial={false}
                    animate={{
                        width: isHovered ? "auto" : "20px",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    <Icon className="h-6 aspect-square stroke-blue-300 group-hover:stroke-white" />
                    <AnimatePresence>
                        {isHovered && (
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
                                className="whitespace-nowrap overflow-hidden"
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

export { LinkButton, Button, buttonVariants, ExpandingIconButton };
