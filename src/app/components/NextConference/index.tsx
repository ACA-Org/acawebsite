import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { LinkButton } from "@/components/ui/button";
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
    viewDetailsLink: viewDetails,
    slices,
  } = props;
  return (
    <section
      id="next-conference"
      className="relative [background:linear-gradient(90deg,rgba(12,37,69,1)_0%,rgba(8,27,49,1)_100%)]"
    >
      <div id="conference-sentinel" className="absolute top-0 h-px w-full" />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-24 md:px-8">
        <div className="relative flex w-full flex-col items-start gap-8 self-stretch">
          <div className="relative flex w-full items-center justify-between gap-16 max-md:flex-col max-md:items-start">
            <div className="relative flex flex-1 grow flex-col items-start gap-4">
              <div className="relative flex w-full items-center gap-8 self-stretch px-0 pt-0 pb-4">
                <div className="font-tag relative mt-[-1.00px] w-fit text-[length:var(--tag-font-size)] leading-[var(--tag-line-height)] font-[number:var(--tag-font-weight)] tracking-[var(--tag-letter-spacing)] text-blue-50 [font-style:var(--tag-font-style)]">
                  Our Next Conference
                </div>
              </div>

              <h2 className="font-heading-2 text-gold-100 relative self-stretch text-[length:var(--heading-2-font-size)] leading-[var(--heading-2-line-height)] font-[number:var(--heading-2-font-weight)] tracking-[var(--heading-2-letter-spacing)] [font-style:var(--heading-2-font-style)]">
                {title}
              </h2>

              <div className="relative flex w-full max-w-[600px] items-center gap-8">
                <div className="font-body-XL relative mt-[-1.00px] w-fit text-[length:var(--body-XL-font-size)] leading-[var(--body-XL-line-height)] font-[number:var(--body-XL-font-weight)] tracking-[var(--body-XL-letter-spacing)] whitespace-nowrap text-blue-100 [font-style:var(--body-XL-font-style)]">
                  {location}
                </div>

                <div className="block h-px flex-1 bg-gray-200 opacity-50"></div>

                {conferenceStartDateTime && (
                  <div className="font-body-XL relative mt-[-1.00px] w-fit text-[length:var(--body-XL-font-size)] leading-[var(--body-XL-line-height)] font-[number:var(--body-XL-font-weight)] tracking-[var(--body-XL-letter-spacing)] whitespace-nowrap text-blue-100 [font-style:var(--body-XL-font-style)]">
                    {formatDateRange(
                      conferenceStartDateTime?.toString(),
                      conferenceEndDateTime?.toString()
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="relative flex flex-col items-center border-0 bg-transparent max-md:w-full">
              {conferenceStartDateTime && (
                <div className="rounded-b-0 relative flex h-[122px] w-full items-center justify-center self-stretch overflow-hidden rounded-t-xl border border-solid border-[#2e3d51] px-12 py-3 [background:linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.05)_100%)]">
                  <CountdownTimer
                    targetDate={new Date(conferenceStartDateTime?.toString())}
                  />
                </div>
              )}

              <LinkButton
                className="hover:bg-gold-100 hover:outline-gold-100 relative flex h-13 w-full items-center justify-center gap-4 self-stretch rounded-none !rounded-b-xl !border !border-t-0 border-solid border-[#2e3d51] bg-transparent outline-transparent hover:text-[#0C2645]"
                field={viewDetails}
              >
                <span className="body-lg relative mt-[-0.50px] w-fit whitespace-nowrap">
                  View Details
                </span>
                <ArrowRightIcon className="relative h-[13.5px] w-[14.5px]" />
              </LinkButton>
            </div>
          </div>

          <div className="w-full">
            <ConferenceCarousel slices={slices} />
          </div>

          <div className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch">
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
