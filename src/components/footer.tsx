"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import ACA from "@/app/images/aca-white-gold.png";
import { Facebook } from "@/icons/Facebook";
import { Instagram } from "@/icons/Instagram";
import { LinkedIn } from "@/icons/LinkedIn";
import { X } from "@/icons/X";
import { Simplify } from "@/lib/utils";
import { FooterDocumentData } from "../../prismicio-types";
import { PrismicNextLink } from "@prismicio/next";

export type FooterProps = Simplify<FooterDocumentData>;

const Footer = ({ data }: { data: FooterProps }) => {
    const {
        footerAddress,
        footerContactInfo,
        helpfulNavLinks,
        memberNavLinks,
        subFooterNavLinks,
    } = data;
    // Organization information
    const organizationInfo = {
        name: "American Correctional Association",
        tagline: "Advance. Connect. Achieve.",
        address: footerAddress.map((i) => i.footerAddressLine),
        contact: footerContactInfo.map((i) => i.footerContactLine),
    };

    return (
        <footer className="flex flex-col w-full items-center text-white">
            <div className="flex items-start justify-between gap-24 px-[76px] py-16 relative self-stretch w-full bg-blue-300 h-full [background:linear-gradient(90deg,#0C2545_0%,#081B31_100%)]">
                <div className="flex flex-col w-[352px] items-start gap-12">
                    <div className="flex flex-col items-start gap-[22px] self-stretch w-full">
                        <img
                            className="w-[114.78px] h-11 object-cover"
                            alt="Aca logo blue"
                            src={ACA.src}
                        />

                        <div className="flex flex-col items-start gap-1 self-stretch w-full">
                            <div className="self-stretch heading-5 text-blue-50">
                                {organizationInfo.name}
                            </div>

                            <div className="self-stretch italic body-lg">
                                {organizationInfo.tagline}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[200px] items-start gap-6 body-sm">
                        <div className="flex flex-col items-start gap-1 w-full self-stretch">
                            {organizationInfo.address.map((line, index) => (
                                <div
                                    key={`address-${index}`}
                                    className={`self-stretch ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-start gap-1 w-full self-stretch">
                            {organizationInfo.contact.map((line, index) => (
                                <div
                                    key={`contact-${index}`}
                                    className={`self-stretch ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                >
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full w-px" />

                <div className="flex w-[233px] flex-col items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] heading-5 text-blue-50">
                        Helpful Links
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                        {helpfulNavLinks?.map((link, index) => (
                            <PrismicNextLink
                                key={`helpful-${index}`}
                                className={`self-stretch body-md cursor-pointer transition-colors hover:text-gold-100 ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                field={link}
                            >
                                {link.text}
                            </PrismicNextLink>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-[233px] items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] heading-5 text-blue-50">
                        Members
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch w-full">
                        {memberNavLinks?.map((link, index) => (
                            <PrismicNextLink
                                key={`member-${index}`}
                                className={`self-stretch body-md cursor-pointer transition-colors hover:text-gold-100 ${index === 0 ? "mt-[-1.00px]" : ""}`}
                                field={link}
                            >
                                {link.text}
                            </PrismicNextLink>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-[233px] items-start gap-4 pt-8">
                    <div className="w-fit mt-[-1.00px] heading-5 text-blue-50">
                        Connect with Us
                    </div>

                    <div className="gap-4 flex flex-row">
                        <Facebook
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gold-100 transition-colors cursor-pointer"
                        />
                        <Instagram
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gold-100 transition-colors cursor-pointer"
                        />
                        <LinkedIn
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gold-100 transition-colors cursor-pointer"
                        />
                        <X
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gold-100 transition-colors cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-[76px] py-8 self-stretch w-full bg-[#091B31]">
                <div className="inline-flex items-center gap-6">
                    {subFooterNavLinks?.map((link, index) => (
                        <PrismicNextLink
                            key={`sub-footer-${index}`}
                            field={link}
                            className="w-fit mt-[-1.00px] body-sm cursor-pointer hover:text-blue-100"
                        >
                            {link.text}
                        </PrismicNextLink>
                    ))}
                </div>

                <div className="w-fit mt-[-1.00px] body-sm">
                    Copyright © American Correctional Association
                </div>
            </div>
        </footer>
    );
};

export default Footer;
