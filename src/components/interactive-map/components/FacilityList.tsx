import React, { useCallback, useEffect, useRef } from "react";
import { Location } from "@/app/locations/data/types";
import { MapPinIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

interface FacilityListProps {
  facilities: Location[];
  selectedFacility: Location | null;
  setSelectedFacility: (facility: Location) => void;
  map: google.maps.Map | null;
  isLoading: boolean;
}

export const FacilityList = React.memo(
  ({
    facilities,
    selectedFacility,
    setSelectedFacility,
    map,
  }: FacilityListProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [visibleFacilities, setVisibleFacilities] = React.useState<
      Set<string>
    >(() => new Set());
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const rowVirtualizer = useVirtualizer({
      count: facilities.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 285,
      overscan: 5,
      measureElement: (element) => {
        const style = window.getComputedStyle(element);
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        return (
          element.getBoundingClientRect().height + marginTop + marginBottom
        );
      },
    });

    // Update visible facilities when map bounds change
    useEffect(() => {
      if (!map) return;

      const updateVisibleFacilities = () => {
        const bounds = map.getBounds();
        if (!bounds) return;

        const visible = new Set<string>();
        facilities.forEach((facility) => {
          if (facility.latitude && facility.longitude) {
            const position = new google.maps.LatLng(
              Number(facility.latitude),
              Number(facility.longitude)
            );
            if (bounds.contains(position)) {
              visible.add(facility.companyCodeId);
            }
          }
        });
        setVisibleFacilities(visible);
      };

      // Update on map movement
      const boundsListener = map.addListener("bounds_changed", () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(updateVisibleFacilities, 100);
      });

      // Initial update
      updateVisibleFacilities();

      return () => {
        google.maps.event.removeListener(boundsListener);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [map, facilities]);

    // Scroll to selected facility
    useEffect(() => {
      if (selectedFacility && parentRef.current) {
        const index = facilities.findIndex(
          (f) => f.companyCodeId === selectedFacility.companyCodeId
        );
        if (index !== -1) {
          rowVirtualizer.scrollToIndex(index, {
            align: "center",
            behavior: "smooth",
          });
        }
      }
    }, [selectedFacility, facilities, rowVirtualizer]);

    const handleViewLocation = useCallback(
      (facility: Location) => {
        if (map && facility.latitude && facility.longitude) {
          const position = {
            lat: Number(facility.latitude),
            lng: Number(facility.longitude),
          };
          map.panTo(position);
          map.setZoom(15);

          // Update map bounds after a short delay to ensure the map has moved
          setTimeout(() => {
            const bounds = map.getBounds();
            if (bounds) {
              // Create a slightly larger bounds to ensure the marker is centered
              const sw = bounds.getSouthWest();
              const ne = bounds.getNorthEast();
              const latDiff = (ne.lat() - sw.lat()) * 0.1;
              const lngDiff = (ne.lng() - sw.lng()) * 0.1;

              const newBounds = new google.maps.LatLngBounds(
                { lat: sw.lat() - latDiff, lng: sw.lng() - lngDiff },
                { lat: ne.lat() + latDiff, lng: ne.lng() + lngDiff }
              );
              map.fitBounds(newBounds);
            }
          }, 100);
        }
      },
      [map]
    );

    return (
      <div ref={parentRef} className="h-full overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const facility = facilities[virtualRow.index];
            const isVisible = visibleFacilities.has(facility.companyCodeId);

            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="my-2 px-4"
              >
                <div
                  className={cn(
                    "flex h-fit cursor-pointer flex-col rounded-lg border border-solid border-[#005f9626] bg-white p-4 shadow-[0px_8px_24px_#00000014] transition-all",
                    selectedFacility?.companyCodeId ===
                      facility.companyCodeId && "ring-2 ring-blue-300",
                    isVisible && "border-blue-300"
                  )}
                  onClick={() => setSelectedFacility(facility)}
                >
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

                    <Button
                      className="mt-auto w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewLocation(facility);
                      }}
                    >
                      View Location
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

FacilityList.displayName = "FacilityList";
