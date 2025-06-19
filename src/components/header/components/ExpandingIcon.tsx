import * as React from "react";
import { LucideIcon } from "lucide-react";
import { buttonVariants, LinkButton, Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { userAtom } from "@/app/atoms/userAtom";
import { useAtomValue } from "jotai";
import { useImisLoginUrl } from "@/lib/redirect";

type ExpandingIconButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    icon:
      | LucideIcon
      | ((props: React.HTMLAttributes<SVGSVGElement>) => React.JSX.Element);
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
  ...props
}: ExpandingIconButtonProps) {
  const user = useAtomValue(userAtom);
  const isActive = menuId === activeItem;
  const imisLoginUrl = useImisLoginUrl();

  if (menuId === "sign_in" && user?.id) {
    return (
      <div className="relative">
        <Button
          className={cn(
            "relative z-10 flex h-8 items-center overflow-hidden rounded-full bg-transparent px-0 transition-all duration-300 ease-in-out",
            isActive && "bg-blue-300 px-2 hover:bg-blue-300"
          )}
          onClick={() => signOut()}
          onMouseEnter={() => setActiveItem(menuId)}
        >
          <Icon
            className={cn(
              "aspect-square h-5 stroke-gray-300 transition-colors duration-300 ease-in-out",
              isActive && "stroke-white"
            )}
          />
          <span
            className={cn(
              "origin-right overflow-hidden text-sm font-medium whitespace-nowrap text-white transition-all duration-500 ease-in-out",
              isActive
                ? "ml-1 max-w-[150px] scale-100 opacity-100"
                : "ml-0 max-w-0 scale-95 opacity-0"
            )}
          >
            Sign Out
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <LinkButton
        className={cn(
          "relative z-10 flex h-8 items-center overflow-hidden rounded-full bg-transparent px-0 transition-all duration-300 ease-in-out",
          isActive && "bg-blue-300 px-2 hover:bg-blue-300"
        )}
        onMouseEnter={() => setActiveItem(menuId)}
        {...props}
        href={menuId === "sign_in" ? imisLoginUrl : props.href || ""}
      >
        <Icon
          className={cn(
            "aspect-square h-5 stroke-gray-300 transition-colors duration-300 ease-in-out",
            isActive && "stroke-white"
          )}
        />
        <span
          className={cn(
            "origin-right overflow-hidden text-sm font-medium whitespace-nowrap text-white transition-all duration-500 ease-in-out",
            isActive
              ? "ml-1 max-w-[150px] scale-100 opacity-100"
              : "ml-0 max-w-0 scale-95 opacity-0"
          )}
        >
          {label}
        </span>
      </LinkButton>
    </div>
  );
}
