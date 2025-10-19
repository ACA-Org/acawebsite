import React from "react";
import { NavigationMenu } from "./components/NavigationMenu";
import { IconMenu } from "./components/IconMenu";
import { MenuItemProps } from "@/slices/MenuItem";
import { HeaderClient, MobileMenuToggle } from "./components/HeaderClient";

/**
 * Server component that renders the header
 */
const Header = async ({
  data,
}: {
  data: {
    slices: MenuItemProps[];
  };
}) => {
  return (
    <HeaderClient slices={data.slices}>
      <NavigationMenu slices={data.slices} />
      <IconMenu />
      <MobileMenuToggle />
    </HeaderClient>
  );
};

export default Header;
