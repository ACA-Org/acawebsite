import React, { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Location } from "@/app/locations/data/types";
import { FilterInputs } from "./FilterInputs";
import { FacilityList } from "./FacilityList";
import { ClusterMarkers } from "./ClusterMarkers";
import { FacilityCard } from "./FacilityCard";
import Supercluster from "supercluster";
import { useWindowSize } from "./hooks";

interface MobileMapProps {
  facilities: Location[];
  isLoading: boolean;
  selectedFacility: Location | null;
  setSelectedFacility: (facility: Location) => void;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  zipFilter: string;
  setZipFilter: (value: string) => void;
  distanceFilter: number | null;
  setDistanceFilter: (value: number | null) => void;
  mobileTab: "map" | "list";
  setMobileTab: (tab: "map" | "list") => void;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  clusters: any[];
  supercluster: Supercluster;
  visibleFacilities: Location[];
  onLoad: (map: google.maps.Map) => void;
  center: { lat: number; lng: number };
  mapOptions: google.maps.MapOptions;
}

export const MobileMap = React.memo(
  ({
    isLoading,
    selectedFacility,
    setSelectedFacility,
    nameFilter,
    setNameFilter,
    zipFilter,
    setZipFilter,
    distanceFilter,
    setDistanceFilter,
    mobileTab,
    setMobileTab,
    mapRef,
    clusters,
    supercluster,
    visibleFacilities,
    onLoad,
    center,
    mapOptions,
  }: MobileMapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const controlsContainerRef = useRef<HTMLDivElement>(null);
    const [isMapInteracting, setIsMapInteracting] = useState(false);
    const [selectedMarkerFacility, setSelectedMarkerFacility] =
      useState<Location | null>(null);

    // Handle touch events for the map container
    useEffect(() => {
      const mapContainer = mapContainerRef.current;
      if (!mapContainer) return;

      const preventScroll = (e: TouchEvent) => {
        if (isMapInteracting) {
          e.preventDefault();
        }
      };

      const handleTouchStart = () => {
        setIsMapInteracting(true);
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      };

      const handleTouchEnd = () => {
        setIsMapInteracting(false);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      };

      mapContainer.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      mapContainer.addEventListener("touchend", handleTouchEnd);
      mapContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      });

      return () => {
        mapContainer.removeEventListener("touchstart", handleTouchStart);
        mapContainer.removeEventListener("touchend", handleTouchEnd);
        mapContainer.removeEventListener("touchmove", preventScroll);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      };
    }, [isMapInteracting]);

    const { width } = useWindowSize();

    const handleViewLocation = useCallback(
      (facility: Location) => {
        if (mapRef.current && facility.latitude && facility.longitude) {
          const position = {
            lat: Number(facility.latitude),
            lng: Number(facility.longitude),
          };
          mapRef.current.panTo(position);
          mapRef.current.setZoom(15);

          // Update map bounds after a short delay to ensure the map has moved
          setTimeout(() => {
            const bounds = mapRef.current?.getBounds();
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
              mapRef.current?.fitBounds(newBounds);
            }
          }, 100);
        }
      },
      [mapRef]
    );

    if (width && width > 1024) return null;

    return (
      <div className="h-full w-full">
        <div ref={controlsContainerRef}>
          <div className="border-b border-[#aed2ff] bg-blue-50 p-4">
            <FilterInputs
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
              zipFilter={zipFilter}
              setZipFilter={setZipFilter}
              distanceFilter={distanceFilter}
              setDistanceFilter={setDistanceFilter}
            />
          </div>
          <div className="flex border-b border-[#aed2ff] bg-blue-50">
            <button
              className={`flex-1 py-2 text-center ${
                mobileTab === "map"
                  ? "border-b-2 border-blue-300 bg-white font-bold text-blue-300"
                  : "text-gray-400"
              }`}
              onClick={() => setMobileTab("map")}
            >
              Map
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                mobileTab === "list"
                  ? "border-b-2 border-blue-300 bg-white font-bold text-blue-300"
                  : "text-gray-400"
              }`}
              onClick={() => setMobileTab("list")}
            >
              List
            </button>
          </div>
        </div>

        <div
          style={{
            height: `calc(100% - ${controlsContainerRef.current?.clientHeight}px)`,
          }}
        >
          <div
            ref={mapContainerRef}
            className={
              mobileTab === "map"
                ? "relative h-full touch-none"
                : "hidden h-full"
            }
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={4}
              center={center}
              options={mapOptions}
              onLoad={onLoad}
            >
              <ClusterMarkers
                clusters={clusters}
                supercluster={supercluster}
                map={mapRef.current}
                setSelectedFacility={(facility) => {
                  setSelectedMarkerFacility(facility);
                }}
              />
            </GoogleMap>
            {selectedMarkerFacility && (
              <FacilityCard
                facility={selectedMarkerFacility}
                onClose={() => setSelectedMarkerFacility(null)}
                onViewLocation={handleViewLocation}
              />
            )}
          </div>
          <div
            className={
              mobileTab === "list"
                ? "h-full overflow-auto"
                : "hidden h-full overflow-auto"
            }
          >
            <FacilityList
              facilities={visibleFacilities}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              map={mapRef.current}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
);

MobileMap.displayName = "MobileMap";

