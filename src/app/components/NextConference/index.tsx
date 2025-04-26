import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { NextConferenceSectionDocumentData } from "../../../../prismicio-types";
import { CountdownTimer } from "./CountdownTimer";
import { ConferenceCarousel } from "./ConferenceCarousel";

function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const startDay = start.getDate();
  const year = start.getFullYear();

  if (!endDate) {
    return `${startMonth} ${startDay}, ${year}`;
  }

  const end = new Date(endDate);
  const endDay = end.getDate();

  return `${startMonth} ${startDay}-${endDay}, ${year}`;
}

export const NextConference = (
  props: NextConferenceSectionDocumentData
): React.JSX.Element => {
  const {
    conferenceEndDateTime,
    conferenceLink: link,
    conferenceStartDateTime,
    conferenceTitle: title,
    conferenceLocation: location,
    slices,
  } = props;
  return (
    <section className="relative [background:linear-gradient(90deg,rgba(12,37,69,1)_0%,rgba(8,27,49,1)_100%)]">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 py-24">
        <div className="flex flex-col items-start gap-12 relative self-stretch w-full">
          <div className="flex items-center justify-between gap-16 relative w-full max-md:flex-col max-md:items-start">
            <div className="flex-1 flex flex-col items-start gap-4 relative flex-1 grow">
              <div className="flex items-center gap-8 pt-0 pb-4 px-0 relative self-stretch w-full">
                <div className="relative w-fit mt-[-1.00px] font-tag font-[number:var(--tag-font-weight)] text-blue-50 text-[length:var(--tag-font-size)] tracking-[var(--tag-letter-spacing)] leading-[var(--tag-line-height)] [font-style:var(--tag-font-style)]">
                  Our Next Conference
                </div>
              </div>

              <h2 className="relative self-stretch font-heading-2 font-[number:var(--heading-2-font-weight)] text-gold-100 text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                {title}
              </h2>

              <div className="flex items-center gap-8 relative w-full max-w-[600px]">
                <div className="relative w-fit mt-[-1.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-100 text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] whitespace-nowrap [font-style:var(--body-XL-font-style)]">
                  {location}
                </div>

                <div className="bg-gray-200 h-px block flex-1 opacity-50"></div>

                {conferenceStartDateTime && (
                  <div className="relative w-fit mt-[-1.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-100 text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] whitespace-nowrap [font-style:var(--body-XL-font-style)]">
                    {formatDateRange(
                      conferenceStartDateTime?.toString(),
                      conferenceEndDateTime?.toString()
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center relative border-0 bg-transparent">
              {conferenceStartDateTime && (
                <div className="flex h-[122px] items-center justify-center px-12 py-3 relative self-stretch w-full rounded-b-0 rounded-t-xl overflow-hidden border border-solid border-[#2e3d51] [background:linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.05)_100%)]">
                  <CountdownTimer
                    targetDate={new Date(conferenceStartDateTime?.toString())}
                  />
                </div>
              )}

              <Button
                variant="secondary"
                outlined
                className="bg-transparent hover:bg-gold-100 outline-transparent hover:outline-gold-100 flex h-13 items-center justify-center gap-4 relative self-stretch w-full rounded-none !rounded-b-xl !border !border-t-0 border-solid border-[#2e3d51]"
              >
                <span className="relative w-fit mt-[-0.50px] body-lg whitespace-nowrap">
                  View Details
                </span>
                <ArrowRightIcon className="relative w-[14.5px] h-[13.5px]" />
              </Button>
            </div>
          </div>

          <div className="w-full">
            <ConferenceCarousel slices={slices} />
          </div>

          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            {link && (
              <LinkButton
                variant={"secondary"}
                outlined
                className="pt-4"
                field={link}
              >
                {link.text}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
