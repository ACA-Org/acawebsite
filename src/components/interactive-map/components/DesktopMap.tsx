import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Location } from "@/app/locations/data/types";
import { FilterInputs } from "./FilterInputs";
import { FacilityList } from "./FacilityList";
import { ClusterMarkers } from "./ClusterMarkers";
import Supercluster from "supercluster";
import { useWindowSize } from "./hooks";

interface DesktopMapProps {
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
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  clusters: any[];
  supercluster: Supercluster;
  visibleFacilities: Location[];
  onLoad: (map: google.maps.Map) => void;
  center: { lat: number; lng: number };
  mapOptions: google.maps.MapOptions;
}

export const DesktopMap = React.memo(
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
    mapRef,
    clusters,
    supercluster,
    visibleFacilities,
    onLoad,
    center,
    mapOptions,
  }: DesktopMapProps) => {
    const { width } = useWindowSize();

    if (width && width <= 1024) return null;
    return (
      <>
        <div className="relative hidden flex-1 sm:block">
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
              setSelectedFacility={setSelectedFacility}
            />
          </GoogleMap>
        </div>

        <div className="hidden w-[368px] border-l border-[#aed2ff] bg-blue-50 lg:flex lg:flex-col">
          <div className="border-b border-[#aed2ff] p-4">
            <FilterInputs
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
              zipFilter={zipFilter}
              setZipFilter={setZipFilter}
              distanceFilter={distanceFilter}
              setDistanceFilter={setDistanceFilter}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <FacilityList
              facilities={visibleFacilities}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              map={mapRef.current}
              isLoading={isLoading}
            />
          </div>
        </div>
      </>
    );
  }
);

DesktopMap.displayName = "DesktopMap";
