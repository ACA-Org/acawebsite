"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PrismicNextLink } from "@prismicio/next";
import { linkResolver } from "@/lib/linkResolver";
import { useAtomValue } from "jotai";
import { pathMapAtom } from "@/app/atoms/pathMapAtom";
import { useTransitionRouter } from "next-view-transitions";
import { asLink } from "@prismicio/client";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 rounded-[4px] body-lg transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:outline-destructive px-7 py-4 has-[>svg]:px-3 min-w-0 text-center",
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

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, outlined, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, outlined, className }))}
      {...props}
    />
  );
}

export type TransitionLinkProps = React.ComponentProps<typeof PrismicNextLink>;

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ className, onClick, ...props }, ref) => {
    const pathMap = useAtomValue(pathMapAtom);

    const { push } = useTransitionRouter();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (props.field?.link_type === "Media") {
        e.preventDefault();
        window.open(props.field.url, "_blank");
        return onClick?.(e);
      }

      if (props.field?.link_type === "Web") {
        e.preventDefault();
        window.open(props.field.url, props.field.target);
        return onClick?.(e);
      }

      onClick?.(e);

      const { href, field } = props;
      let resolvedHref: string | null | undefined;

      if (href) {
        resolvedHref = typeof href === "string" ? href : undefined;
      } else if (field) {
        resolvedHref = linkResolver
          ? linkResolver(field as any, pathMap)
          : asLink(field);
      }

      if (resolvedHref) {
        e.preventDefault();
        return push(resolvedHref);
      }
    };

    return (
      <PrismicNextLink
        linkResolver={(doc) => linkResolver(doc as any, pathMap)}
        className={className}
        ref={ref}
        onClick={handleClick}
        prefetch={false}
        {...props}
      />
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export type LinkButtonProps = React.ComponentProps<typeof PrismicNextLink> &
  VariantProps<typeof buttonVariants>;

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, outlined, ...props }, ref) => {
    return (
      <TransitionLink
        className={cn(buttonVariants({ variant, outlined, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

LinkButton.displayName = "LinkButton";

const TextLink = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <TransitionLink
        {...props}
        className={cn(
          "body-md hover:text-gold-100 cursor-pointer self-stretch transition-colors",
          className
        )}
        ref={ref}
      />
    );
  }
);

TextLink.displayName = "TextLink";

export { LinkButton, Button, buttonVariants, TextLink, TransitionLink };
