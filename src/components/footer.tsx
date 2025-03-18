/* eslint-disable @next/next/no-img-element */
import React from "react";
import ACA from "@/app/images/aca-blue.png";
import { Facebook } from "@/icons/Facebook";
import { Instagram } from "@/icons/Instagram";
import { LinkedIn } from "@/icons/LinkedIn";
import { X } from "@/icons/X";
import { Simplify } from "@/lib/utils";
import { FooterDocumentData } from "../../prismicio-types";
import { PrismicNextLink } from "@prismicio/next";

export type FooterProps = Simplify<FooterDocumentData>;

const Footer = (props: FooterProps) => {
    const {
        footerAddress,
        footerContactInfo,
        helpfulNavLinks,
        memberNavLinks,
        subFooterNavLinks,
    } = props;
    // Organization information
    const organizationInfo = {
        name: "American Correctional Association",
        tagline: "Advance. Connect. Achieve.",
        address: footerAddress.map((i) => i.footerAddressLine),
        contact: footerContactInfo.map((i) => i.footerContactLine),
    };

    return (
        <footer className="flex flex-col w-full items-start">
            <div className="flex items-start gap-24 px-[76px] py-16 relative self-stretch w-full bg-[#eaeaea]">
                <div className="flex flex-col w-[352px] items-start gap-12">
                    <div className="flex flex-col items-start gap-[22px] self-stretch w-full">
                        <img
                            className="w-[114.78px] h-11 object-cover"
                            alt="Aca logo blue"
                            src={ACA.src}
                        />

                        <div className="flex flex-col items-start gap-1 self-stretch w-full">
                            <div className="self-stretch mt-[-1.00px] font-['Poppins',Helvetica] font-semibold text-[#7f7f7f] text-lg">
                                {organizationInfo.name}
                            </div>

                            <div className="self-stretch font-['Poppins',Helvetica] font-normal italic text-[#7f7f7f] text-sm">
                                {organizationInfo.tagline}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[200px] items-start gap-6">
                        <div className="flex flex-col items-start gap-1 w-full self-stretch">
                            {organizationInfo.address.map((line, index) => (
                                <div
                                    key={`address-${index}`}
                                    className={`self-stretch font-['Poppins',Helvetica] font-normal text-[#7f7f7f] text-base ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-start gap-1 w-full self-stretch">
                            {organizationInfo.contact.map((line, index) => (
                                <div
                                    key={`contact-${index}`}
                                    className={`self-stretch font-['Poppins',Helvetica] font-normal text-[#7f7f7f] text-base ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[233px] items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] font-['Poppins',Helvetica] font-semibold text-[#7f7f7f] text-lg">
                        Helpful Links
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                        {helpfulNavLinks?.map((link, index) => (
                            <PrismicNextLink
                                key={`helpful-${index}`}
                                className={`self-stretch font-['Poppins',Helvetica] font-normal text-[#7f7f7f] text-base cursor-pointer hover:text-gray-600 ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                field={link}
                            >
                                {link.text}
                            </PrismicNextLink>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-[233px] items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] font-['Poppins',Helvetica] font-semibold text-[#7f7f7f] text-lg">
                        Members
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                        {memberNavLinks?.map((link, index) => (
                            <PrismicNextLink
                                key={`member-${index}`}
                                className={`self-stretch font-['Poppins',Helvetica] font-normal text-[#7f7f7f] text-base cursor-pointer hover:text-gray-600 ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                field={link}
                            >
                                {link.text}
                            </PrismicNextLink>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-[233px] items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] font-['Poppins',Helvetica] font-semibold text-[#7f7f7f] text-lg">
                        Connect with Us
                    </div>

                    <div className="gap-4 flex flex-row">
                        <Facebook
                            role="button"
                            className="fill-[#808080] h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <Instagram
                            role="button"
                            className="fill-[#808080] h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <LinkedIn
                            role="button"
                            className="fill-[#808080] h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <X
                            role="button"
                            className="fill-[#808080] h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-[76px] py-8 self-stretch w-full bg-[#dddddd]">
                <div className="inline-flex items-center gap-6">
                    {subFooterNavLinks?.map((link, index) => (
                        <PrismicNextLink
                            key={`sub-footer-${index}`}
                            field={link}
                            className="w-fit mt-[-1.00px] font-['Poppins',Helvetica] font-normal text-[#7f7f7f] text-base cursor-pointer hover:text-gray-600"
                        >
                            {link.text}
                        </PrismicNextLink>
                    ))}
                </div>

                <div className="w-fit mt-[-1.00px] font-['Poppins',Helvetica] font-medium text-[#7f7f7f] text-base">
                    Copyright © American Correctional Association
                </div>
            </div>
        </footer>
    );
};

export default Footer;
