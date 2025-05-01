"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPinIcon, PhoneIcon } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

interface Location {
  name: string;
  address: string;
  phone: string;
  position: { lat: number; lng: number };
}

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

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfdLxuGeYWvVJzdiv_FMtgQvouwnylXbI",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Location data for the cards
  const locations: Location[] = useMemo(
    () => [
      {
        name: "American Correctional Association",
        address: "206 N. Washington Street\nSuite 200\nAlexandria, VA 22314",
        phone: "(703) 224-0000",
        position: { lat: 38.804836, lng: -77.047375 },
      },
      {
        name: "American Correctional Association",
        address: "206 N. Washington Street\nSuite 200\nAlexandria, VA 22314",
        phone: "(703) 224-0000",
        position: { lat: 38.805836, lng: -77.047375 },
      },
      {
        name: "American Correctional Association",
        address: "206 N. Washington Street\nSuite 200\nAlexandria, VA 22314",
        phone: "(703) 224-0000",
        position: { lat: 38.806836, lng: -77.047375 },
      },
    ],
    []
  );

  const center = useMemo(() => locations[0].position, [locations]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

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
          zoom={14}
          center={center}
          options={mapOptions}
          onLoad={onLoad}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.position}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </div>

      <div className="w-[368px] bg-blue-50 border-l border-[#aed2ff] overflow-y-auto">
        <div className="flex flex-col gap-4 p-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-solid border-[#005f9626] shadow-[0px_8px_24px_#00000014] p-4"
            >
              <div className="mb-4">
                <h2 className="font-heading-4 text-blue-300 text-[24px]">
                  {location.name}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2.5">
                  <MapPinIcon className="flex-shrink-0 text-gray-300" />
                  <div className="text-gray-300 whitespace-pre-line">
                    {location.address}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <PhoneIcon className="flex-shrink-0 text-gray-300" />
                  <div className="text-gray-300">{location.phone}</div>
                </div>

                <button
                  className="w-full bg-blue-300 text-white hover:bg-blue-200 py-2 px-4 rounded-md transition-colors"
                  onClick={() => {
                    if (map) {
                      map.panTo(location.position);
                      map.setZoom(15);
                    }
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
