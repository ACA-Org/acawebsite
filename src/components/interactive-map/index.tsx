"use client";

import { Location } from "@/app/locations/data/types";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import React, { useCallback, useMemo, useEffect, useRef } from "react";
import { MobileMap } from "./components/MobileMap";
import { DesktopMap } from "./components/DesktopMap";
import { useDebounce, useMapBounds } from "./components/hooks";
import {
  calculateDistance,
  facilitiesToGeoJSON,
  mapOptions,
} from "./components/utils";
import { useAtom } from "jotai";
import {
  selectedFacilityAtom,
  nameFilterAtom,
  zipFilterAtom,
  distanceFilterAtom,
  mapRefAtom,
  clustersAtom,
  superclusterAtom,
  visibleFacilitiesAtom,
  mobileTabAtom,
  zipCoordinatesAtom,
} from "./atoms/mapAtoms";

interface MapProps {
  facilities: Location[];
  isLoading?: boolean;
}

export default function Map({ facilities, isLoading = false }: MapProps) {
  const libraries: Libraries = useMemo(() => ["places"], []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Initialize map reference
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedFacility, setSelectedFacility] = useAtom(selectedFacilityAtom);
  const [nameFilter, setNameFilter] = useAtom(nameFilterAtom);
  const [zipFilter, setZipFilter] = useAtom(zipFilterAtom);
  const [distanceFilter, setDistanceFilter] = useAtom(distanceFilterAtom);
  const [zipCoordinates, setZipCoordinates] = useAtom(zipCoordinatesAtom);
  const [mobileTab, setMobileTab] = useAtom(mobileTabAtom);
  const [, setMapRef] = useAtom(mapRefAtom);
  const [clusters, setClusters] = useAtom(clustersAtom);
  const [supercluster] = useAtom(superclusterAtom);
  const [visibleFacilities, setVisibleFacilities] = useAtom(
    visibleFacilitiesAtom
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
  const getCoordinatesFromZip = useCallback(
    async (zip: string) => {
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
    },
    [setZipCoordinates]
  );

  // Update coordinates when debounced zip changes
  useEffect(() => {
    if (debouncedZipFilter) {
      getCoordinatesFromZip(debouncedZipFilter);
    } else {
      setZipCoordinates(null);
    }
  }, [debouncedZipFilter, getCoordinatesFromZip, setZipCoordinates]);

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

  // Convert facilities to GeoJSON points, filtering out low accuracy scores
  const points = useMemo(() => {
    if (!facilitiesWithPositions.length) {
      return [];
    }
    const highAccuracyFacilities = facilitiesWithPositions.filter(
      (f) => Number(f.accuracyScore) >= 0.6
    );
    const geoJsonPoints = facilitiesToGeoJSON(highAccuracyFacilities);
    return geoJsonPoints;
  }, [facilitiesWithPositions]);

  // Create Supercluster instance
  useEffect(() => {
    if (!points.length) return;
    try {
      supercluster.load(points);
    } catch (error) {
      console.error("Error loading points into supercluster:", error);
    }
  }, [points, supercluster]);

  // Handle map load
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      setMapRef(map);

      // Set initial bounds to show all of US
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(24.396308, -125.0), // Southwest
        new google.maps.LatLng(49.384358, -66.93457) // Northeast
      );
      map.fitBounds(bounds);

      // Force an initial bounds update
      map.getBounds();
    },
    [setMapRef]
  );

  // Get map bounds using custom hook
  const mapBounds = useMapBounds(mapRef.current);

  // Update clusters when map bounds or zoom changes
  useEffect(() => {
    if (!mapBounds || !mapRef.current || !supercluster) {
      console.warn("Map bounds, map reference, or supercluster not available", {
        hasMapBounds: !!mapBounds,
        hasMapRef: !!mapRef.current,
        hasSupercluster: !!supercluster,
        mapCenter: mapRef.current?.getCenter()?.toJSON(),
        mapZoom: mapRef.current?.getZoom(),
      });
      return;
    }

    try {
      const bounds: [number, number, number, number] = [
        mapBounds.getSouthWest().lng(),
        mapBounds.getSouthWest().lat(),
        mapBounds.getNorthEast().lng(),
        mapBounds.getNorthEast().lat(),
      ];

      const zoom = mapRef.current.getZoom() || 0;

      const newClusters = supercluster.getClusters(bounds, Math.floor(zoom));

      if (newClusters.length === 0) {
        console.warn("No clusters generated. Current state:", {
          pointsCount: points.length,
          bounds,
          zoom,
          mapCenter: mapRef.current.getCenter()?.toJSON(),
        });
      }

      setClusters(newClusters);
    } catch (error) {
      console.error("Error generating clusters:", error);
    }
  }, [mapRef, mapBounds, supercluster, points.length, setClusters]);

  // Update visible facilities
  useEffect(() => {
    if (!mapBounds || !mapRef.current) {
      setVisibleFacilities([]);
      return;
    }

    const bounds = mapBounds;
    const visible = facilitiesWithPositions.filter((facility) => {
      if (!facility.latitude || !facility.longitude) return false;
      const position = new google.maps.LatLng(
        Number(facility.latitude),
        Number(facility.longitude)
      );
      return bounds.contains(position);
    });
    setVisibleFacilities(visible);
  }, [facilitiesWithPositions, mapBounds, setVisibleFacilities]);

  const getMapOptions = useCallback(
    (isMobile: boolean) => {
      if (!isLoaded) return mapOptions;

      return {
        ...mapOptions,
        gestureHandling: isMobile ? "greedy" : "cooperative",
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
      };
    },
    [isLoaded]
  );

  const mobileMapOptions = useMemo(() => getMapOptions(true), [getMapOptions]);
  const desktopMapOptions = useMemo(
    () => getMapOptions(false),
    [getMapOptions]
  );

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-solid border-[#aed2ff] sm:flex-row">
      <MobileMap
        facilities={facilities}
        isLoading={isLoading}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        zipFilter={zipFilter}
        setZipFilter={setZipFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        mobileTab={mobileTab}
        setMobileTab={setMobileTab}
        mapRef={mapRef}
        clusters={clusters}
        supercluster={supercluster}
        visibleFacilities={visibleFacilities}
        onLoad={onLoad}
        center={center}
        mapOptions={mobileMapOptions}
      />
      <DesktopMap
        facilities={facilities}
        isLoading={isLoading}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        zipFilter={zipFilter}
        setZipFilter={setZipFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        mapRef={mapRef}
        clusters={clusters}
        supercluster={supercluster}
        visibleFacilities={visibleFacilities}
        onLoad={onLoad}
        center={center}
        mapOptions={desktopMapOptions}
      />
    </div>
  );
}
