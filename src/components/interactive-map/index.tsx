"use client";

import { Location } from "@/app/locations/data/types";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPinIcon } from "lucide-react";
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { NativeSelect } from "../ui/native-select";
import Supercluster from "supercluster";
import { useVirtualizer } from "@tanstack/react-virtual";

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
            className="h-full flex-1"
          />
          <NativeSelect
            value={distanceFilter || ""}
            disabled={!zipFilter}
            defaultValue="10"
            onChange={handleDistanceChange}
            className={"h-full flex-1"}
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
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
      count: facilities.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 285, // Initial estimate, will be adjusted by measureElement
      overscan: 5,
      measureElement: (element) => {
        // Get the actual height of the element including margins
        const style = window.getComputedStyle(element);
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        return (
          element.getBoundingClientRect().height + marginTop + marginBottom
        );
      },
    });

    // Scroll to facility when selectedFacility changes
    useEffect(() => {
      if (selectedFacility && parentRef.current) {
        const index = facilities.findIndex(
          (f) => f.companyCodeId === selectedFacility.companyCodeId
        );
        if (index !== -1) {
          rowVirtualizer.scrollToIndex(index);
        }
      }
    }, [selectedFacility, facilities, rowVirtualizer]);

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
        <div className="p-4 text-center text-gray-500">
          Loading facilities...
        </div>
      );
    }

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
                    selectedFacility?.companyName === facility.companyName &&
                      "ring-2 ring-blue-300"
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

// Memoize the cluster markers component
const ClusterMarkers = React.memo(
  ({
    clusters,
    supercluster,
    map,
    setSelectedFacility,
  }: {
    clusters: any[];
    supercluster: Supercluster;
    map: google.maps.Map | null;
    setSelectedFacility: (facility: Location) => void;
  }) => {
    return (
      <>
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.properties.cluster_id}`}
                position={{ lat: latitude, lng: longitude }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(
                      cluster.properties.cluster_id
                    ),
                    20
                  );
                  map?.panTo({ lat: latitude, lng: longitude });
                  map?.setZoom(expansionZoom);
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10 + Math.min(pointCount, 20),
                  fillColor: "#005f96",
                  fillOpacity: 0.7,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                }}
                label={{
                  text: pointCount.toString(),
                  color: "#ffffff",
                  fontSize: "12px",
                }}
              />
            );
          }

          const facility = cluster.properties.facility;
          return (
            <Marker
              key={`marker-${facility.companyCodeId}`}
              position={{ lat: latitude, lng: longitude }}
              title={facility.companyName}
              onClick={() => setSelectedFacility(facility)}
            />
          );
        })}
      </>
    );
  }
);

ClusterMarkers.displayName = "ClusterMarkers";

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
  const [clusters, setClusters] = useState<any[]>([]);

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

  // Create Supercluster instance
  const supercluster = useMemo(() => {
    return new Supercluster({
      radius: 100, // 50 mile radius
      maxZoom: 100,
      minZoom: 0,
      minPoints: 10,
    });
  }, []);

  // Convert facilities to GeoJSON points
  const points = useMemo(() => {
    return facilitiesWithPositions.map((facility) => ({
      type: "Feature" as const,
      properties: { facility },
      geometry: {
        type: "Point" as const,
        coordinates: [Number(facility.longitude), Number(facility.latitude)],
      },
    }));
  }, [facilitiesWithPositions]);

  // Update clusters when map bounds or zoom changes
  useEffect(() => {
    if (!mapBounds || !map) return;

    const bounds: [number, number, number, number] = [
      mapBounds.getSouthWest().lng(),
      mapBounds.getSouthWest().lat(),
      mapBounds.getNorthEast().lng(),
      mapBounds.getNorthEast().lat(),
    ];

    const zoom = map.getZoom() || 0;
    supercluster.load(points);
    const clusters = supercluster.getClusters(bounds, Math.floor(zoom));
    setClusters(clusters);
  }, [mapBounds, map, points, supercluster]);

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
    <div className="flex h-full overflow-hidden rounded-xl border border-solid border-[#aed2ff]">
      <div className="relative flex-1">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={4}
          center={center}
          options={mapOptions}
          onLoad={onLoad}
          onBoundsChanged={handleBoundsChanged}
        >
          {clusters.map((cluster, index) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${index}`}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(
                        cluster.properties.cluster_id
                      ),
                      20
                    );
                    map?.panTo({ lat: latitude, lng: longitude });
                    map?.setZoom(expansionZoom);
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10 + Math.min(pointCount, 20),
                    fillColor: "#005f96",
                    fillOpacity: 0.7,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                  }}
                  label={{
                    text: pointCount.toString(),
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
              );
            }

            const facility = cluster.properties.facility;
            return (
              <Marker
                key={`marker-${index}`}
                position={{ lat: latitude, lng: longitude }}
                title={facility.companyName}
                onClick={() => setSelectedFacility(facility)}
              />
            );
          })}
        </GoogleMap>
      </div>

      <div className="flex w-[368px] flex-col border-l border-[#aed2ff] bg-blue-50">
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
            map={map}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
