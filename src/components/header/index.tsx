import React from "react";
import { NavigationMenu } from "./components/NavigationMenu";
import { IconMenu } from "./components/IconMenu";
import { MobileMenu } from "./components/MobileMenu";
import { MenuItemProps } from "@/slices/MenuItem";
import {
  HeaderClient,
  MobileMenuToggle,
  MobileMenuWrapper,
} from "./components/HeaderClient";

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
    <HeaderClient>
      <NavigationMenu slices={data.slices} />
      <IconMenu />
      <MobileMenuToggle />
      <MobileMenuWrapper>
        <MobileMenu slices={data.slices} />
      </MobileMenuWrapper>
    </HeaderClient>
  );
};

export default Header;
