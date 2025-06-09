import React from "react";
import { Location } from "@/app/locations/data/types";
import { MapPinIcon } from "lucide-react";
import { Button } from "../../ui/button";

interface FacilityCardProps {
  facility: Location;
  onClose: () => void;
  onViewLocation: (facility: Location) => void;
}

export const FacilityCard = React.memo(
  ({ facility, onClose, onViewLocation }: FacilityCardProps) => {
    return (
      <div className="absolute right-4 bottom-4 left-4 z-10">
        <div className="flex h-fit cursor-pointer flex-col rounded-lg border border-solid border-[#005f9626] bg-white p-4 shadow-[0px_8px_24px_#00000014] transition-all">
          <div className="mb-4">
            <h2 className="font-heading-4 text-[24px] text-blue-300">
              {facility.companyName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {facility.facilityType}
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <MapPinIcon className="flex-shrink-0 text-gray-300" />
              <div className="whitespace-pre-line text-gray-300">
                {facility.companyAddress}
              </div>
            </div>

            {facility.companyWebsite && (
              <a
                href={facility.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200"
              >
                Visit Website
              </a>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => onViewLocation(facility)}
              >
                View Location
              </Button>
              <Button variant="secondary" className="flex-1" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FacilityCard.displayName = "FacilityCard";

