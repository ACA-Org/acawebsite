import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PrismicNextLink } from "@prismicio/next";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] body-lg transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:outline-destructive px-7 py-4 has-[>svg]:px-3",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-300 text-white hover:bg-blue-200 outline-0 outline-blue-300",
        secondary: "bg-blue-200 text-white hover:bg-blue-300",
        tertiary:
          "bg-gold-100 outline-gold-100 hover:bg-blue-300 text-blue-300 hover:text-gold-100",
        white: "outline-white",
      },
      outlined: {
        false: "",
        true: "!outline-2 bg-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        outlined: true,
        className:
          "text-blue-300 hover:bg-blue-300 hover:text-white outline-solid -outline-offset-2",
      },
      {
        variant: "secondary",
        outlined: true,
        className:
          "text-blue-50 outline-blue-50 hover:bg-blue-50 hover:text-blue-300 outline-solid -outline-offset-2",
      },
      {
        variant: "tertiary",
        outlined: true,
        className:
          "text-gold-100 hover:bg-gold-100 hover:text-blue-300 outline-solid -outline-offset-2",
      },
      {
        variant: "white",
        outlined: true,
        className:
          "text-white hover:text-blue-200 hover:bg-white outline-solid -outline-offset-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      outlined: false,
    },
  }
);

function Button({
  className,
  variant,
  outlined,
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
      className={cn(buttonVariants({ variant, outlined, className }))}
      {...props}
    />
  );
}

export type LinkButtonProps = React.ComponentProps<typeof PrismicNextLink> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, href, outlined, field, ...props }, ref) => {
    return (
      // @ts-expect-error PrismicNextLink field issue
      <PrismicNextLink
        className={cn(buttonVariants({ variant, outlined, className }))}
        ref={ref}
        href={href || ""}
        field={field}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "LinkButton";

export { LinkButton, Button, buttonVariants };
