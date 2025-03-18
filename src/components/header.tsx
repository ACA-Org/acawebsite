/* eslint-disable @next/next/no-img-element */
import { MailIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ACA from "@/app/images/aca-blue.png";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsCollapsed(scrollPosition > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: "About" },
        { label: "Departments" },
        { label: "Conferences" },
        { label: "Standards & Accreditation" },
        { label: "Resources" },
    ];

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
            <NavigationMenu className="max-w-none">
                <NavigationMenuList className="flex items-center gap-8">
                    {menuItems.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger className="font-normal text-[#7f7f7f] text-base [font-family:'Poppins',Helvetica] bg-transparent hover:bg-transparent focus:bg-transparent">
                                {item.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4">
                                    <p>Content for {item.label}</p>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6">
                    <SearchIcon className="w-4 h-[13px] text-[#7f7f7f]" />
                    <MailIcon className="w-[15px] h-[10.17px] text-[#7f7f7f]" />
                    <ShoppingCartIcon className="w-[14.5px] h-3 text-[#7f7f7f]" />
                    <UserIcon className="w-[15.13px] h-[15.13px] text-[#7f7f7f]" />

                    <Button
                        variant="default"
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#7f7f7f] rounded-3xl h-auto"
                    >
                        <UserIcon className="w-[10.43px] h-3 text-[#f9f9f9]" />
                        <span className="[font-family:'Poppins',Helvetica] font-medium text-[#f9f9f9] text-sm">
                            Sign In
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
