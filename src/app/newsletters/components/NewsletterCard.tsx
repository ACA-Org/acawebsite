import { FC } from "react";
import { LinkButton } from "@/components/ui/button";
import { Newsletter } from "./types";

export const NewsletterCard: FC<Newsletter> = (props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { newsetterFile, newsletterDate, newsletterDesc, newsletterTitle } =
    props;

  return (
    <div className="flex flex-col items-stretch gap-4 self-stretch rounded-xl border border-blue-500/15 bg-white p-4 max-lg:w-[calc(50%-16px)] max-md:w-full lg:flex-1">
      <div className="mt-2 flex h-full flex-col justify-between gap-4">
        {(newsletterTitle || newsletterDesc) && (
          <div className="flex flex-1 flex-col gap-4">
            {newsletterTitle && (
              <h3 className="heading-3">{newsletterTitle}</h3>
            )}

            {newsletterDesc && <p className="body-md">{newsletterDesc}</p>}
            {newsletterDate && (
              <p className="tag">{formatDate(newsletterDate)}</p>
            )}
          </div>
        )}

        {newsetterFile?.text && (
          <LinkButton field={newsetterFile}>{newsetterFile.text}</LinkButton>
        )}
      </div>
    </div>
  );
};

