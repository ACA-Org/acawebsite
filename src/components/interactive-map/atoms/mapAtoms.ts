import { atom } from "jotai";
import { Location } from "@/app/locations/data/types";
import Supercluster from "supercluster";

// Selected facility atom
export const selectedFacilityAtom = atom<Location | null>(null);

// Filter atoms
export const nameFilterAtom = atom("");
export const zipFilterAtom = atom("");
export const distanceFilterAtom = atom<number | null>(null);

// Map reference atom
export const mapRefAtom = atom<google.maps.Map | null>(null);

// Clusters atom
export const clustersAtom = atom<any[]>([]);

// Supercluster instance atom - initialized with a default instance
export const superclusterAtom = atom<Supercluster>(
  new Supercluster({
    radius: 20,
    maxZoom: 20,
    minZoom: 0,
    minPoints: 1,
    nodeSize: 32,
    reduce: (accumulated, props) => {
      accumulated.point_count =
        (accumulated.point_count || 0) + props.point_count;
    },
    map: (props) => {
      return {
        ...props,
        point_count: 1,
      };
    },
  })
);

// Visible facilities atom
export const visibleFacilitiesAtom = atom<Location[]>([]);

// Mobile tab atom
export const mobileTabAtom = atom<"map" | "list">("map");

// Zip coordinates atom
export const zipCoordinatesAtom = atom<{ lat: number; lng: number } | null>(
  null
);
