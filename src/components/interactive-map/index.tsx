"use client";

import { Location } from "@/app/locations/data/types";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPinIcon } from "lucide-react";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { NativeSelect } from "../ui/native-select";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "all",
      stylers: [{ saturation: 0 }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

interface MapProps {
  facilities: Location[];
  isLoading?: boolean;
}

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Custom hook for debouncing values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Separate FilterInputs component
const FilterInputs = React.memo(
  ({
    nameFilter,
    setNameFilter,
    zipFilter,
    setZipFilter,
    distanceFilter,
    setDistanceFilter,
  }: {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    zipFilter: string;
    setZipFilter: (value: string) => void;
    distanceFilter: number | null;
    setDistanceFilter: (value: number | null) => void;
  }) => {
    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
      },
      [setNameFilter]
    );

    const handleZipChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipFilter(e.target.value);
      },
      [setZipFilter]
    );

    const handleDistanceChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistanceFilter(e.target.value ? Number(e.target.value) : null);
      },
      [setDistanceFilter]
    );

    return (
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={handleNameChange}
          className="flex-1"
        />
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Enter ZIP code..."
            value={zipFilter}
            onChange={handleZipChange}
            className="flex-1 h-full"
          />
          <NativeSelect
            value={distanceFilter || ""}
            disabled={!zipFilter}
            defaultValue="10"
            onChange={handleDistanceChange}
            className={"flex-1 h-full"}
          >
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
            <option value="100">100 miles</option>
          </NativeSelect>
        </div>
      </div>
    );
  }
);

FilterInputs.displayName = "FilterInputs";

// Separate FacilityList component
const FacilityList = React.memo(
  ({
    facilities,
    selectedFacility,
    setSelectedFacility,
    map,
    isLoading,
  }: {
    facilities: Location[];
    selectedFacility: Location | null;
    setSelectedFacility: (facility: Location) => void;
    map: google.maps.Map | null;
    isLoading: boolean;
  }) => {
    const handleViewLocation = useCallback(
      (facility: Location) => {
        if (map && facility.latitude && facility.longitude) {
          map.panTo({
            lat: Number(facility.latitude),
            lng: Number(facility.longitude),
          });
          map.setZoom(15);
        }
      },
      [map]
    );

    if (isLoading) {
      return (
        <div className="text-center text-gray-500 p-4">
          Loading facilities...
        </div>
      );
    }

    return (
      <div className="h-full overflow-y-auto">
        {facilities.map((facility, index) => (
          <div key={index} className="px-4 my-2">
            <div
              className={cn(
                "bg-white rounded-lg border border-solid border-[#005f9626] shadow-[0px_8px_24px_#00000014] p-4 cursor-pointer transition-all flex flex-col",
                selectedFacility?.companyName === facility.companyName &&
                  "ring-2 ring-blue-300"
              )}
              onClick={() => setSelectedFacility(facility)}
            >
              <div className="mb-4">
                <h2 className="font-heading-4 text-blue-300 text-[24px]">
                  {facility.companyName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {facility.facilityType}
                </p>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-start gap-2.5">
                  <MapPinIcon className="flex-shrink-0 text-gray-300" />
                  <div className="text-gray-300 whitespace-pre-line">
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
                  className="w-full mt-auto"
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
        ))}
      </div>
    );
  }
);

FacilityList.displayName = "FacilityList";

export default function Map({ facilities, isLoading = false }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Location | null>(
    null
  );
  const [nameFilter, setNameFilter] = useState("");
  const [zipFilter, setZipFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);
  const [zipCoordinates, setZipCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );

  // Debounce the filter values
  const debouncedNameFilter = useDebounce(nameFilter, 1000);
  const debouncedZipFilter = useDebounce(zipFilter, 1000);

  // Fixed center point for the US
  const center = useMemo(
    () => ({
      lat: 39.8283,
      lng: -98.5795,
    }),
    []
  );

  // Memoize the getCoordinatesFromZip function
  const getCoordinatesFromZip = useCallback(async (zip: string) => {
    if (!zip || zip.length !== 5) {
      setZipCoordinates(null);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setZipCoordinates({ lat, lng });
      } else {
        setZipCoordinates(null);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setZipCoordinates(null);
    }
  }, []);

  // Update coordinates when debounced zip changes
  useEffect(() => {
    if (debouncedZipFilter) {
      getCoordinatesFromZip(debouncedZipFilter);
    } else {
      setZipCoordinates(null);
    }
  }, [debouncedZipFilter, getCoordinatesFromZip]);

  // Memoize the filtered facilities
  const facilitiesWithPositions = useMemo(
    () =>
      facilities
        .filter((f) => f.latitude && f.longitude)
        .filter((f) => {
          const matchesName = f.companyName
            .toLowerCase()
            .includes(debouncedNameFilter.toLowerCase());

          if (zipCoordinates && distanceFilter) {
            const distance = calculateDistance(
              zipCoordinates.lat,
              zipCoordinates.lng,
              Number(f.latitude),
              Number(f.longitude)
            );
            return matchesName && distance <= distanceFilter;
          }

          const matchesZip = f.companyAddress
            ? f.companyAddress
                .toLowerCase()
                .includes(debouncedZipFilter.toLowerCase())
            : false;
          return matchesName && matchesZip;
        }),
    [
      facilities,
      debouncedNameFilter,
      debouncedZipFilter,
      zipCoordinates,
      distanceFilter,
    ]
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setMapBounds(map.getBounds() || null);
  }, []);

  // Memoize the bounds changed handler
  const handleBoundsChanged = useCallback(() => {
    if (map) {
      setMapBounds(map.getBounds() || null);
    }
  }, [map]);

  // Add bounds changed listener
  useEffect(() => {
    if (!map) return;

    const boundsChangedListener = map.addListener(
      "bounds_changed",
      handleBoundsChanged
    );

    return () => {
      google.maps.event.removeListener(boundsChangedListener);
    };
  }, [map, handleBoundsChanged]);

  // Memoize visible facilities
  const visibleFacilities = useMemo(() => {
    if (!mapBounds) return facilitiesWithPositions;

    return facilitiesWithPositions.filter((facility) => {
      if (!facility.latitude || !facility.longitude) return false;

      const position = new google.maps.LatLng(
        Number(facility.latitude),
        Number(facility.longitude)
      );

      return mapBounds.contains(position);
    });
  }, [facilitiesWithPositions, mapBounds]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="flex h-full rounded-xl overflow-hidden border border-solid border-[#aed2ff]">
      <div className="relative flex-1">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={4}
          center={center}
          options={mapOptions}
          onLoad={onLoad}
          onBoundsChanged={handleBoundsChanged}
        >
          {facilitiesWithPositions.map((facility, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(facility?.latitude),
                lng: Number(facility?.longitude),
              }}
              title={facility.companyName}
              onClick={() => setSelectedFacility(facility)}
            />
          ))}
        </GoogleMap>
      </div>

      <div className="w-[368px] bg-blue-50 border-l border-[#aed2ff] flex flex-col">
        <div className="p-4 border-b border-[#aed2ff]">
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
            map={map}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
