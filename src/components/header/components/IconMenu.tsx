import { ExpandingIcon } from "./ExpandingIcon";
import { SuitcaseIcon } from "@/icons/SuitcaseIcon";
import { MailIcon } from "@/icons/MailIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import { ShoppingCart } from "@/icons/ShoppingCart";
import { useEffect, useRef, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";

export const IconMenu = () => {
  const [activeItem, setActiveItem] = useState("sign_in");
  const timeoutRef = useRef<number>(0);

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
    <div
      className="flex items-center justify-end gap-1 min-w-[400px]"
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
  );
};
