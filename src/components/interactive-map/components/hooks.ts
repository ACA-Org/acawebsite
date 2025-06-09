import { useState, useEffect } from "react";

// Custom hook for debouncing values
export function useDebounce<T>(value: T, delay: number): T {
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

// Custom hook for handling map bounds
export function useMapBounds(map: google.maps.Map | null) {
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );

  useEffect(() => {
    if (!map) return;

    const handleBoundsChanged = () => {
      const bounds = map.getBounds();
      if (bounds) {
        setMapBounds(bounds);
      } else {
        console.warn("No bounds available in handleBoundsChanged");
      }
    };

    // Initial bounds
    handleBoundsChanged();

    // Add bounds changed listener
    const boundsChangedListener = map.addListener(
      "bounds_changed",
      handleBoundsChanged
    );

    // Add idle listener to ensure bounds are set after map is fully loaded
    const idleListener = map.addListener("idle", handleBoundsChanged);

    return () => {
      google.maps.event.removeListener(boundsChangedListener);
      google.maps.event.removeListener(idleListener);
    };
  }, [map]);

  return mapBounds;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

