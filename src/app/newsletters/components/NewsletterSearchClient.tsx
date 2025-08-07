"use client";
import { useState, useMemo } from "react";
import { NewsletterGrid } from "./NewsletterGrid";
import type { Newsletter } from "./types";
import { Input } from "@/components/ui/input";

interface Props {
  newsletters: Newsletter[];
}

export default function NewsletterSearchClient({ newsletters }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredNewsletters = useMemo(() => {
    return newsletters.filter((card) => {
      const matchesSearch =
        card.newsletterTitle
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        card.newsletterDesc?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!card.newsletterDate) return false;
      const cardDate = new Date(card.newsletterDate).getTime();

      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const inDateRange =
        (!start || cardDate >= start) && (!end || cardDate <= end);

      return matchesSearch && inDateRange;
    });
  }, [searchTerm, startDate, endDate, newsletters]);

  return (
    <div className="relative flex w-full gap-8">
      <div className="w-1/4 space-y-4">
        <div className="sticky top-24 flex flex-col gap-4 rounded-lg border border-blue-500/15 p-6">
          <h3 className="heading-3">Filter Newsletters</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="newsletterKeyword">Keyword</label>
            <Input
              type="text"
              placeholder="Search newsletters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded border"
              id="newsletterKeyword"
              name="newsletterKeyword"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="newsletterStartDate">Start Date:</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block h-12 w-full rounded border"
                id="newsletterStartDate"
                name="newsletterStartDate"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="newsletterEndDate">End Date:</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block h-12 w-full rounded border"
                id="newsletterEndDate"
                name="newsletterEndDate"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4">
        <NewsletterGrid newsletters={filteredNewsletters} />
      </div>
    </div>
  );
}
