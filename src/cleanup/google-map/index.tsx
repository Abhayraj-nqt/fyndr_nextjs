"use client";

import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";

import { GoogleMapsProvider } from "./google-maps-provider";

type LatLng = { lat: number; lng: number };

export type Marker = {
  id?: string | number;
  position: LatLng;
  title?: string;
};

export type GoogleMapProps = {
  apiKey: string;
  center: LatLng;
  zoom?: number;
  markers?: Marker[];
  height?: number | string;
  width?: number | string;
  mode?: "embed" | "interactive";
  embedQuery?: string;
  libraries?: string[];
  mapOptions?: google.maps.MapOptions;
};

export default function GoogleMap({
  apiKey,
  center,
  zoom = 14,
  markers = [],
  height = 400,
  width = "100%",
  mode = "embed",
  embedQuery,
  libraries = [],
  mapOptions = {},
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<Marker | null>(null);

  useEffect(() => {
    if (
      mode !== "interactive" ||
      !mapReady ||
      !mapRef.current ||
      !window.google
    )
      return;

    const gMap = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      ...mapOptions,
    });

    markers.forEach((marker) => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const gMarker = new window.google.maps.Marker({
        position: marker.position,
        map: gMap,
        title: marker.title,
      });

      gMarker.addListener("mouseover", () => setHoveredMarker(marker));
      gMarker.addListener("mouseout", () => setHoveredMarker(null));
    });

    setMap(gMap);

    return () => setMap(null);
  }, [mode, center, zoom, markers, mapReady, mapOptions]);

  if (mode === "embed") {
    return (
      <GoogleMapsEmbed
        apiKey={apiKey}
        height={height}
        width={width}
        mode="place"
        q={embedQuery || `${center.lat},${center.lng}`}
      />
    );
  }

  return (
    <>
      <GoogleMapsProvider
        apiKey={apiKey}
        libraries={libraries}
        onLoad={() => setMapReady(true)}
        onError={(e) => console.error("Maps load error", e)}
      />
      <div
        ref={mapRef}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: typeof width === "number" ? `${width}px` : width,
        }}
        className={`size-full`}
      />
    </>
  );
}
