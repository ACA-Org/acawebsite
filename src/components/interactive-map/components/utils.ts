import { Location } from "@/app/locations/data/types";

export const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export const mapOptions = {
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

// Helper function to calculate distance between two points using Haversine formula
export function calculateDistance(
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

// Convert facilities to GeoJSON points
export function facilitiesToGeoJSON(facilities: Location[]) {
  return facilities.map((facility) => ({
    type: "Feature" as const,
    properties: { facility },
    geometry: {
      type: "Point" as const,
      coordinates: [Number(facility.longitude), Number(facility.latitude)],
    },
  }));
}
