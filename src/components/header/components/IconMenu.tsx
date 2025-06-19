import { ExpandingIcon } from "./ExpandingIcon";
import { SuitcaseIcon } from "@/icons/SuitcaseIcon";
import { MailIcon } from "@/icons/MailIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import { ShoppingCart } from "@/icons/ShoppingCart";
import { useEffect, useRef, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/atoms/userAtom";
import { signOut } from "next-auth/react";
import { TextLink } from "@/components/ui/button";
import { useSignIn } from "@/app/hooks/useSignIn";

const quickLinks = [
  {
    label: "Job Bank",
    value: "job_bank",
    href: "/resources/job-bank",
    icon: SuitcaseIcon,
  },
  {
    label: "Contact Us",
    value: "contact_us",
    href: "/contact",
    icon: MailIcon,
  },
  { label: "Search", value: "search", href: "/search", icon: SearchIcon },
  {
    label: "Marketplace",
    value: "marketplace",
    href: "/marketplace",
    icon: ShoppingCart,
  },
  {
    label: "Sign In",
    value: "sign_in",
    href: "",
    icon: UserIcon,
  },
];

export const IconMenu = () => {
  const [activeItem, setActiveItem] = useState("sign_in");
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number>(0);
  const user = useAtomValue(userAtom);
  const { signIn } = useSignIn();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setActiveItem("sign_in");
    }, 150);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-[200px] max-lg:hidden xl:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 text-sm hover:bg-blue-50"
        >
          <span className="mt-1 block">Quick Links</span>
          <CaretDown
            className={cn("h-auto w-2 stroke-blue-300 transition-transform", {
              "rotate-180": isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div className="absolute right-4 left-4 z-10 mt-2 overflow-clip rounded-md bg-white shadow-lg">
            {quickLinks.map((item) =>
              item.value === "sign_in" ? (
                user?.id ? (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                  >
                    <UserIcon className="h-auto w-4 stroke-blue-300" />
                    <span className="mt-[2px]">{item.label}</span>
                  </button>
                ) : (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                    onClick={() => {
                      signIn();
                      setIsOpen(false);
                    }}
                  >
                    <UserIcon className="h-auto w-4 stroke-blue-300" />
                    <span className="mt-[2px]">{item.label}</span>
                  </button>
                )
              ) : (
                <TextLink
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                >
                  <item.icon className="h-auto w-4 stroke-blue-300" />
                  <span className="mt-[2px]">{item.label}</span>
                </TextLink>
              )
            )}
          </div>
        )}
      </div>

      <div
        className="hidden items-center justify-end xl:flex"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {quickLinks.map((item) => (
          <ExpandingIcon
            key={item.label}
            icon={item.icon}
            label={item.label}
            menuId={item.value}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            href={item.href}
          />
        ))}
      </div>
    </>
  );
};
