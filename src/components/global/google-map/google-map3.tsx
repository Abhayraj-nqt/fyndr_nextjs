/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GridAlgorithm, MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";

import { GOOGLE_MAPS_API_KEY } from "@/environment";

// Types
export interface MarkerData {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  data?: any;
}

interface GoogleMapProps {
  markers?: MarkerData[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  width?: string;
  onMarkerClick?: (marker: MarkerData) => void;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  enableClustering?: boolean;
  mapStyles?: google.maps.MapTypeStyle[];
  renderInfoWindow?: (marker: MarkerData) => React.ReactNode;
  apiKey?: string;
  defaultLocation?: { lat: number; lng: number };
  maxMarkersToShow?: number; // Only limit markers when explicitly provided
}

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const defaultOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  gestureHandling: "cooperative",
  tilt: 0,
};

const DEFAULT_LOCATION = { lat: 37.7749, lng: -122.4194 };

const GoogleMap3: React.FC<GoogleMapProps> = ({
  markers = [],
  center,
  zoom = 12,
  height = "500px",
  width = "100%",
  onMarkerClick,
  onMapClick,
  enableClustering = false, // Changed default to false
  mapStyles,
  renderInfoWindow,
  apiKey = GOOGLE_MAPS_API_KEY,
  defaultLocation = DEFAULT_LOCATION,
  maxMarkersToShow, // No default value - only limit when explicitly provided
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const clustererRef = useRef<MarkerClusterer | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapOptions = useMemo(
    () => ({
      ...defaultOptions,
      styles: mapStyles,
    }),
    [mapStyles]
  );

  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  const mapCenter = useMemo(() => {
    if (center) return center;
    if (markers.length === 1) return markers[0].position;
    return defaultLocation;
  }, [center, markers, defaultLocation]);

  // Only limit markers when maxMarkersToShow is explicitly provided
  const limitedMarkers = useMemo(() => {
    if (!maxMarkersToShow || markers.length <= maxMarkersToShow) {
      return markers;
    }

    // Take first N markers when limit is specified
    console.warn(
      `Too many markers (${markers.length}), showing first ${maxMarkersToShow}`
    );
    return markers.slice(0, maxMarkersToShow);
  }, [markers, maxMarkersToShow]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      // Fit bounds to markers if multiple markers exist
      if (limitedMarkers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        limitedMarkers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds);
      }
    },
    [limitedMarkers]
  );

  const onUnmount = useCallback(() => {
    // Clean up clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
      clustererRef.current = null;
    }

    // Clean up markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    setMap(null);
  }, []);

  // Create markers and clusterer
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Clear existing markers and clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Create new markers
    const googleMarkers = limitedMarkers.map((markerData) => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        title: markerData.title,
        icon: markerData.icon,
        // animation: google.maps.Animation.DROP,
      });

      // Add click listener
      marker.addListener("click", () => {
        setSelectedMarker(markerData);
        onMarkerClick?.(markerData);
      });

      return marker;
    });

    markersRef.current = googleMarkers;

    // Only use clustering if explicitly enabled
    if (enableClustering && googleMarkers.length > 0) {
      try {
        clustererRef.current = new MarkerClusterer({
          map,
          markers: googleMarkers,
          algorithm: new GridAlgorithm({ maxDistance: 50000 }),
        });
      } catch (error) {
        console.warn(
          "Clustering failed, falling back to individual markers:",
          error
        );
        // Fallback: show markers individually
        googleMarkers.forEach((marker) => marker.setMap(map));
      }
    } else {
      // Show markers individually (default behavior)
      googleMarkers.forEach((marker) => marker.setMap(map));
    }

    return () => {
      // Cleanup on effect re-run
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
      }
      googleMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [map, limitedMarkers, enableClustering, onMarkerClick, isLoaded]);

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Handle map click
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      setSelectedMarker(null);
      onMapClick?.(event);
    },
    [onMapClick]
  );

  // Loading state
  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center rounded-10 bg-gray-100"
        style={containerStyle}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div
        className="flex items-center justify-center rounded-10 border border-red-200 bg-red-50"
        style={containerStyle}
      >
        <div className="text-center text-red-600">
          <p className="mb-2 font-semibold">Failed to load Google Maps</p>
          <p className="text-sm">{loadError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Only show marker limit warning when explicitly limiting */}
      {maxMarkersToShow && markers.length > maxMarkersToShow && (
        <div className="absolute left-2 top-2 z-10 rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
          Showing {maxMarkersToShow} of {markers.length} locations
        </div>
      )}

      <ReactGoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={mapOptions}
        mapContainerClassName="rounded-10"
      >
        {/* Info Window */}
        {selectedMarker && renderInfoWindow && (
          <InfoWindowF
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div>{renderInfoWindow(selectedMarker)}</div>
          </InfoWindowF>
        )}
      </ReactGoogleMap>
    </div>
  );
};

export default GoogleMap3;
