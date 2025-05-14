// components/maps/GoogleMap.tsx
"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import {
  useGoogleMaps,
  GoogleMapsProvider,
} from "@/provider/google-maps-provider";
import { MarkerData, MapConfig } from "@/types/google/google-maps";

// Component to render custom marker tooltip
interface MarkerPopupProps {
  marker: MarkerData;
  position: { x: number; y: number };
  children?: ReactNode;
  onClose: () => void;
}

function MarkerPopup({
  marker,
  position,
  children,
  onClose,
}: MarkerPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: -10 });

  useEffect(() => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      // Position the popup just above the marker with slight offset
      // But don't push it too far up
      setOffset({
        x: 0,
        y: -(rect.height + 0), // Position above marker with 0px extra space
      });
    }

    // Close popup when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Calculate final position with offset
  const finalPosition = {
    left: `${position.x + offset.x}px`,
    top: `${position.y + offset.y}px`,
  };

  return createPortal(
    <div
      ref={popupRef}
      className="absolute z-50 w-64 rounded-lg bg-white p-4 shadow-lg"
      style={{
        // left: `${position.x}px`,
        // top: `${position.y}px`,
        // transform: "translate(-50%, -120%)",

        ...finalPosition,
        transform: "translateX(-50%)", // Center horizontally only
        transformOrigin: "bottom center",
        // Add a pointer/triangle at the bottom
        filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.15))",
      }}
    >
      {/* Caret/pointer triangle */}
      <div
        className="absolute bottom-0 left-1/2 size-4 bg-white"
        style={{
          transform: "translate(-50%, 50%) rotate(45deg)",
          zIndex: -1,
        }}
      />

      {children || (
        <div>
          <h3 className="text-lg font-semibold">{marker.title}</h3>
          {marker.description && (
            <p className="mt-1 text-gray-600">{marker.description}</p>
          )}
          <button
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}

interface RenderMarkerProps {
  marker: MarkerData;
}

interface GoogleMapProps {
  apiKey: string;
  markers: MarkerData[];
  config?: MapConfig;
  className?: string;
  height?: string | number;
  width?: string | number;
  libraries?: string[];
  renderMarkerCard?: (props: RenderMarkerProps) => ReactNode;
  onMapLoad?: (map: google.maps.Map) => void;
  onMarkerClick?: (marker: MarkerData) => void;
  onMarkerHover?: (marker: MarkerData | null) => void;
  onBoundsChange?: (bounds: google.maps.LatLngBounds) => void;
}

export default function GoogleMap({
  //   apiKey,
  markers = [],
  config = {
    center: { lat: 40.7128, lng: -74.006 }, // Default to NYC
    zoom: 12,
  },
  className = "",
  height = 500,
  width = "100%",
  //   libraries = ["places", "geometry"],
  renderMarkerCard,
  onMapLoad,
  onMarkerClick,
  onMarkerHover,
  onBoundsChange,
}: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const markersRef = useRef<Map<string | number, google.maps.Marker>>(
    new Map()
  );
  const { isLoaded, hasError } = useGoogleMaps();

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || map) return;

    const mapInstance = new google.maps.Map(mapContainerRef.current, {
      ...config,
      center: config.center,
      zoom: config.zoom || 12,
      mapTypeId: config.mapTypeId || google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: config.disableDefaultUI,
      zoomControl: config.zoomControl !== false,
      scrollwheel: config.scrollwheel !== false,
      styles: config.styles,
    });

    setMap(mapInstance);
    onMapLoad?.(mapInstance);

    // Set up bounds change listener
    if (onBoundsChange) {
      const boundsListener = mapInstance.addListener("bounds_changed", () => {
        const bounds = mapInstance.getBounds();
        if (bounds) {
          onBoundsChange(bounds);
        }
      });

      return () => {
        google.maps.event.removeListener(boundsListener);
      };
    }
  }, [isLoaded, config, map, onMapLoad, onBoundsChange]);

  // Handle markers
  useEffect(() => {
    if (!map || !markers.length) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create bounds for fitting map to markers
    const bounds = new google.maps.LatLngBounds();

    // Add markers to the map
    markers.forEach((markerData) => {
      const position = new google.maps.LatLng(
        markerData.position.lat,
        markerData.position.lng
      );
      bounds.extend(position);

      const marker = new google.maps.Marker({
        position,
        map,
        title: markerData.title,
        icon: markerData.icon,
        animation: google.maps.Animation.DROP,
      });

      // Store marker reference
      markersRef.current.set(markerData.id, marker);

      // Add click listener
      marker.addListener("click", () => {
        const pixel = getMarkerPixelPosition(marker, map);
        setPopupPosition(pixel);
        setActiveMarker(markerData);
        onMarkerClick?.(markerData);
      });

      // Add hover listeners if needed
      if (onMarkerHover || renderMarkerCard) {
        marker.addListener("mouseover", () => {
          const pixel = getMarkerPixelPosition(marker, map);
          setPopupPosition(pixel);

          if (renderMarkerCard) {
            setActiveMarker(markerData);
          }

          onMarkerHover?.(markerData);
        });

        marker.addListener("mouseout", () => {
          if (!renderMarkerCard) {
            onMarkerHover?.(null);
          }
        });
      }
    });

    // Fit map to markers if there are multiple
    if (markers.length > 1) {
      map.fitBounds(bounds);
    } else if (markers.length === 1) {
      map.setCenter(markers[0].position);
    }

    return () => {
      // Clean up markers on unmount
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      markersRef.current.clear();
    };
  }, [map, markers, onMarkerClick, onMarkerHover, renderMarkerCard]);

  // Helper function to get pixel position of marker for positioning popups
  const getMarkerPixelPosition = (
    marker: google.maps.Marker,
    map: google.maps.Map
  ) => {
    const position = marker.getPosition();
    if (!position) return { x: 0, y: 0 };

    const scale = Math.pow(2, map.getZoom() || 0);
    const projection = map.getProjection();
    if (!projection) return { x: 0, y: 0 };

    const bounds = map.getBounds();
    if (!bounds) return { x: 0, y: 0 };

    const nw = projection.fromLatLngToPoint(
      new google.maps.LatLng(
        bounds.getNorthEast().lat(),
        bounds.getSouthWest().lng()
      )
    );
    const point = projection.fromLatLngToPoint(position);
    if (!nw || !point) return { x: 0, y: 0 };

    const mapDiv = map.getDiv();
    // const height = mapDiv.offsetHeight;
    // const width = mapDiv.offsetWidth;

    return {
      x: Math.floor((point.x - nw.x) * scale) + mapDiv.offsetLeft,
      y: Math.floor((point.y - nw.y) * scale) + mapDiv.offsetTop,
    };
  };

  // Full height/width styles
  const containerStyle = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
  };

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      <div
        ref={mapContainerRef}
        className="size-full rounded-lg"
        aria-label="Google Map"
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100/75">
          <div className="flex flex-col items-center">
            <div className="mb-2 size-10 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-50/75">
          <div className="p-4 text-center text-red-600">
            <p className="mb-2 font-semibold">Failed to load Google Maps</p>
            <p>Please check your API key and try again.</p>
          </div>
        </div>
      )}

      {activeMarker && (
        <MarkerPopup
          marker={activeMarker}
          position={popupPosition}
          onClose={() => setActiveMarker(null)}
        >
          {renderMarkerCard ? renderMarkerCard({ marker: activeMarker }) : null}
        </MarkerPopup>
      )}
    </div>
  );
}

// Wrapped component with provider included
export function GoogleMapWithProvider(props: GoogleMapProps) {
  return (
    <GoogleMapsProvider apiKey={props.apiKey} libraries={props.libraries}>
      <GoogleMap {...props} />
    </GoogleMapsProvider>
  );
}
