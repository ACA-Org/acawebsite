import { ExpandingIcon } from "./ExpandingIcon";
import { SuitcaseIcon } from "@/icons/SuitcaseIcon";
import { MailIcon } from "@/icons/MailIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import { ShoppingCart } from "@/icons/ShoppingCart";
import { Fragment, useEffect, useRef, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { useRouter } from "next/navigation";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";

const quickLinks = [
  {
    label: "Job Bank",
    value: "job_bank",
    href: "/job-bank",
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
  { label: "Sign In", value: "sign_in", href: "/sign-in", icon: UserIcon },
];

export const IconMenu = () => {
  const [activeItem, setActiveItem] = useState("sign_in");
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number>(0);
  const router = useRouter();

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
      <div className="xl:hidden relative w-full max-w-[200px] px-4 py-2 max-lg:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 text-sm hover:bg-blue-50"
        >
          <span>Quick Links</span>
          <CaretDown
            className={cn("w-2 h-auto transition-transform stroke-blue-300", {
              "rotate-180": isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div className="absolute left-4 right-4 z-10 mt-2 rounded-md bg-white shadow-lg overflow-clip">
            {quickLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  router.push(item.href);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
              >
                <item.icon className="h-auto w-4 stroke-blue-300" />
                <span className="mt-[2px]">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="hidden items-center justify-end xl:flex"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <ExpandingIcon
          icon={SuitcaseIcon}
          label="Job Bank"
          menuId="job_bank"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <ExpandingIcon
          icon={MailIcon}
          label="Contact Us"
          menuId="contact_us"
          onClick={() => {
            router.push("/contact");
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <ExpandingIcon
          icon={SearchIcon}
          label="Search"
          menuId="search"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <ExpandingIcon
          icon={ShoppingCart}
          label="Marketplace"
          menuId="marketplace"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <ExpandingIcon
          icon={UserIcon}
          label="Sign In"
          menuId="sign_in"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
    </>
  );
};
