import React from "react";
import { NewsletterCard } from "./NewsletterCard";
import { Newsletter } from "./types";

interface NewsletterGridProps {
  newsletters: Newsletter[];
  className?: string;
}

export const NewsletterGrid: React.FC<NewsletterGridProps> = ({
  newsletters,
  className,
}) => {
  return (
    <div className={`w-full space-y-8 ${className}`}>
      {newsletters.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.newsletterTitle} {...newsletter} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              No newsletters found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or clearing the filters to see
              more results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

