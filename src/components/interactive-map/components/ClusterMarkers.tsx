import React, { useCallback } from "react";
import { Marker } from "@react-google-maps/api";
import { Location } from "@/app/locations/data/types";
import Supercluster from "supercluster";

interface ClusterMarkersProps {
  clusters: any[];
  supercluster: Supercluster;
  map: google.maps.Map | null;
  setSelectedFacility: (facility: Location) => void;
}

export const ClusterMarkers = React.memo(
  ({
    clusters,
    supercluster,
    map,
    setSelectedFacility,
  }: ClusterMarkersProps) => {
    const handleClusterClick = useCallback(
      (cluster: any) => {
        if (!map) return;

        const [longitude, latitude] = cluster.geometry.coordinates;
        const expansionZoom = Math.min(
          supercluster.getClusterExpansionZoom(cluster.properties.cluster_id),
          20
        );

        map.panTo({ lat: latitude, lng: longitude });
        map.setZoom(expansionZoom);
      },
      [map, supercluster]
    );

    return (
      <>
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.properties.cluster_id}`}
                position={{ lat: latitude, lng: longitude }}
                onClick={() => handleClusterClick(cluster)}
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

