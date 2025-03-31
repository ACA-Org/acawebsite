import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <div className="flex flex-col items-start gap-2.5 px-0 py-12 relative">
      <section className="flex flex-col items-start gap-12 px-19 py-24 relative self-stretch w-full flex-[0_0_auto] [background:linear-gradient(90deg,rgba(12,37,69,1)_0%,rgba(8,27,49,1)_100%)]">
        <div className="flex w-[1360px] items-center gap-6 relative flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-4 relative flex-1 grow">
            <div className="flex items-center gap-8 pt-0 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-tag font-[number:var(--tag-font-weight)] text-blue-50 text-[length:var(--tag-font-size)] tracking-[var(--tag-letter-spacing)] leading-[var(--tag-line-height)] [font-style:var(--tag-font-style)]">
                OUR NEXT CONFERENCE
              </div>
            </div>

            <h2 className="relative self-stretch font-heading-2 font-[number:var(--heading-2-font-weight)] text-gold-100 text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              {title}
            </h2>

            <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-100 text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] whitespace-nowrap [font-style:var(--body-XL-font-style)]">
                {location}
              </div>

              <Separator className="relative w-[150px] h-px bg-blue-50 opacity-50" />

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

          <div className="flex flex-col w-[350px] items-center relative border-0 bg-transparent">
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
              className="bg-transparent hover:bg-gold-100 hover:border-gold-100 flex h-13 items-center justify-center gap-4 relative self-stretch w-full rounded-none !rounded-b-xl !border !border-t-0 border-solid border-[#2e3d51]"
            >
              <span className="relative w-fit mt-[-0.50px] body-lg whitespace-nowrap">
                View Details
              </span>
              <ArrowRightIcon className="relative w-[14.5px] h-[13.5px]" />
            </Button>
          </div>
        </div>

        <div className="w-[1360px] h-[350px]">
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
      </section>
    </div>
  );
};
