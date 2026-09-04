"use client";

import React, { useEffect, useRef, useState } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { DynamicImage } from "@/components/image";
import { ArrowRight } from "@/icons/ArrowRight";
import { Link2 } from "lucide-react";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import SVG from "react-inlinesvg";
import { TransitionLink } from "@/components/ui/button";

export interface NavigationMenuProps {
  className?: string;
  slices: MenuItemProps[];
}

export function NavigationMenu({ className, slices }: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSlice, setActiveSlice] = useState<MenuItemProps | null>(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeItem === null) {
      animationTimeoutRef.current = setTimeout(() => {
        setActiveSlice(null);
      }, 200);

      return;
    }

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    setActiveSlice(slices[activeItem]);
  }, [activeItem, slices]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeSlice || !dropdownRef.current || !navContainerRef.current) {
      return;
    }

    const adjustDropdownPosition = () => {
      const dropdown = dropdownRef.current;
      const nav = navContainerRef.current;

      if (!dropdown || !nav) return;

      const dropdownRect = dropdown.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();

      const viewportPadding = 20;

      let viewportLeft = navRect.left + dropdownLeft;

      if (
        viewportLeft + dropdownRect.width >
        window.innerWidth - viewportPadding
      ) {
        viewportLeft =
          window.innerWidth - dropdownRect.width - viewportPadding;
      }

      if (viewportLeft < viewportPadding) {
        viewportLeft = viewportPadding;
      }

      const correctedLeft = viewportLeft - navRect.left;

      if (Math.abs(correctedLeft - dropdownLeft) > 1) {
        setDropdownLeft(correctedLeft);
      }
    };

    requestAnimationFrame(adjustDropdownPosition);
  }, [activeSlice, dropdownLeft]);

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 150);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleItemEnter = (
    index: number,
    element: HTMLElement
  ) => {
    handleMouseEnter();

    if (navContainerRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = element.getBoundingClientRect();

      setDropdownLeft(itemRect.left - navRect.left);
                      
