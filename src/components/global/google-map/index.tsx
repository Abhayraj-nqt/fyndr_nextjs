/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  GoogleMap as ReactGoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import React, { useState, useCallback, useMemo } from "react";

import { GOOGLE_MAPS_API_KEY } from "@/environment";

// Types
export interface MarkerData {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  data?: any; // Additional data for the marker
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

const DEFAULT_LOCATION = { lat: 37.7749, lng: -122.4194 }; // San Francisco

const GoogleMap: React.FC<GoogleMapProps> = ({
  markers = [],
  center,
  zoom = 12,
  height = "500px",
  width = "100%",
  onMarkerClick,
  onMapClick,
  mapStyles,
  renderInfoWindow,
  apiKey = GOOGLE_MAPS_API_KEY,
  defaultLocation = DEFAULT_LOCATION,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

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

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      // Fit bounds to markers if multiple markers exist
      if (markers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [markers]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback(
    (marker: MarkerData) => {
      setSelectedMarker(marker);
      onMarkerClick?.(marker);
    },
    [onMarkerClick]
  );

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Handle map click
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      setSelectedMarker(null); // Close info window on map click
      onMapClick?.(event);
    },
    [onMapClick]
  );

  // Loading state
  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center rounded-lg bg-gray-100"
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
        className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50"
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
      {markers.map((marker) => (
        <MarkerF
          key={marker.id}
          position={marker.position}
          title={marker.title}
          icon={marker.icon}
          onClick={() => handleMarkerClick(marker)}
          animation={google.maps.Animation.DROP}
        />
      ))}

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
  );
};

export default GoogleMap;
