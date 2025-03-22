"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ACA from "@/app/images/aca-blue.png";
import { IconMenu } from "./components/IconMenu";
import { NavMenu } from "./components/NavMenu";
import { MenuItemProps } from "@/slices/MenuItem";

const Header = ({
    data,
}: {
    data: {
        slices: MenuItemProps[];
    };
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsCollapsed(scrollPosition > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 px-9 flex items-center justify-between w-full bg-[#f9f9f9] transition-all duration-300 ease-in-out z-50 shadow-sm ${
                isCollapsed ? "py-4" : "py-8"
            }`}
        >
            <div className="flex flex-col items-start justify-center transition-all duration-300">
                <img
                    className={`object-cover transition-all duration-300 ${
                        isCollapsed ? "w-[68px] h-[26px]" : "w-[114.78px] h-11"
                    }`}
                    alt="ACA logo"
                    src={ACA.src}
                />
            </div>
            <NavMenu data={data} />

            <IconMenu />
        </header>
    );
};

export default Header;
