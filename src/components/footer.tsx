"use client";

import React from "react";
import ACA from "@/app/images/aca-white-gold.png";
import { Facebook } from "@/icons/Facebook";
import { Instagram } from "@/icons/Instagram";
import { LinkedIn } from "@/icons/LinkedIn";
import { X } from "@/icons/X";

import { FooterDocumentData, Simplify } from "../../prismicio-types";
import { TextLink } from "./ui/button";
import Link from "next/link";

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
    <footer className="flex w-full flex-col items-center overflow-clip text-white [background:linear-gradient(90deg,#0F2D52_0%,#0C2545_100%)]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-8">
        <div className="relative flex items-start justify-between gap-12 max-lg:flex-col">
          {/* Contact Info */}
          <div className="flex w-full flex-col items-start gap-8 self-stretch border-blue-200 max-lg:border-b max-lg:pb-12 lg:max-w-1/3 lg:border-r">
            <div className="flex w-full flex-col items-start gap-[22px] self-stretch">
              <img
                className="h-11 w-[114.78px] object-cover"
                alt="Aca logo blue"
                src={ACA.src}
              />

              <div className="flex w-full flex-col items-start gap-1 self-stretch">
                <div className="heading-5 self-stretch text-blue-50">
                  {organizationInfo.name}
                </div>

                <div className="body-lg self-stretch italic">
                  {organizationInfo.tagline}
                </div>
              </div>
            </div>

            <div className="body-sm flex w-[200px] flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-1 self-stretch">
                {organizationInfo.address.map((line, index) => (
                  <div
                    key={`address-${index}`}
                    className={`self-stretch ${index === 0 ? "mt-[-1.00px]" : ""}`}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-col items-start gap-1 self-stretch">
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

          {/* Columns */}
          <div className="flex flex-1 gap-12 max-lg:w-full max-md:flex-col">
            {/* Helpful Links */}
            <div className="flex flex-1 flex-col items-start gap-4">
              <div className="heading-5 mt-[-1.00px] w-fit text-blue-50">
                Helpful Links
              </div>

              <div className="flex w-full flex-col items-start gap-2 self-stretch">
                {helpfulNavLinks?.map((link, index) => (
                  <TextLink
                    key={`helpful-${index}`}
                    className={index === 0 ? "mt-[-1.00px]" : ""}
                    field={link}
                  >
                    {link.text}
                  </TextLink>
                ))}
              </div>
            </div>

            {/* Member Links */}
            <div className="flex flex-1 flex-col items-start gap-4">
              <div className="heading-5 mt-[-1.00px] w-fit text-blue-50">
                Members
              </div>

              <div className="flex w-full flex-col items-start gap-2 self-stretch">
                {memberNavLinks?.map((link, index) => (
                  <TextLink
                    key={`member-${index}`}
                    className={index === 0 ? "mt-[-1.00px]" : ""}
                    field={link}
                  >
                    {link.text}
                  </TextLink>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-4">
              <div className="heading-5 mt-[-1.00px] w-fit text-blue-50">
                Connect with Us
              </div>

              <div className="flex flex-row gap-4">
                <Link
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://www.facebook.com/AmericanCorrectionalAssociation"
                >
                  <Facebook className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
                </Link>
                <Link
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://www.instagram.com/amercorrectionalassoc"
                >
                  <Instagram className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
                </Link>
                <Link
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://www.linkedin.com/company/american-correctional-association/mycompany/?viewAsMember=true"
                >
                  <LinkedIn className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
                </Link>
                <Link
                  rel="noreferrer noopener"
                  target="_blank"
                  href="https://twitter.com/ACAinfo"
                >
                  <X className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between self-stretch bg-[#091B31] px-[76px] py-8">
        <div className="inline-flex items-center gap-6">
          {subFooterNavLinks?.map((link, index) => (
            <TextLink
              key={`sub-footer-${index}`}
              className={index === 0 ? "mt-[-1.00px]" : ""}
              field={link}
            >
              {link.text}
            </TextLink>
          ))}
        </div>

        <div className="body-sm">
          Copyright © American Correctional Association
        </div>
      </div>
    </footer>
  );
};

export default Footer;
