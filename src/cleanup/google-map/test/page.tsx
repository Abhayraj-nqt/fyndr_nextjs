// app/map/page.tsx
"use client";

import { useEffect, useState } from "react";

import GoogleMap, { Marker } from "@/cleanup/google-map";

export default function MapPage() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [mode, setMode] = useState<"embed" | "interactive">("interactive");

  //   useEffect(() => {
  //     // Simulate fetching geocoded markers
  //     const load = async () => {
  //       const res = await fetch("/api/geocode", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           addresses: ["Los Angeles, CA", "New York, NY"],
  //         }),
  //       });
  //       const data = await res.json();
  //       setMarkers(data);
  //     };

  //     load();
  //   }, []);

  const center = markers.length > 0 ? markers[0] : { lat: 0, lng: 0 };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reusable Google Map</h1>

      <button
        onClick={() =>
          setMode((prev) => (prev === "embed" ? "interactive" : "embed"))
        }
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Toggle Mode ({mode})
      </button>

      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        center={{ lat: 40.7128, lng: -74.006 }}
        zoom={12}
        mode={mode}
        markers={[
          { position: { lat: 40.7128, lng: -74.006 }, title: "NYC" },
          { position: { lat: 40.73061, lng: -73.935242 }, title: "Brooklyn" },
        ]}
        height={400}
      />
    </div>
  );
}
