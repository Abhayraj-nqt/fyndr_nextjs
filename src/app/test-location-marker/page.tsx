// app/map/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { GoogleMapWithProvider } from "@/components/global/google-map/google-map";
import { MarkerData } from "@/types/google/google-maps";

// Sample data - In a real application, this would come from an API
const locations: MarkerData[] = [
  {
    id: "1",
    position: { lat: 40.7128, lng: -74.006 },
    title: "New York City",
    description:
      "The Big Apple, known for its iconic skyline and vibrant culture.",
    data: {
      rating: 4.8,
      photos: ["/api/placeholder/400/250"],
      address: "New York, NY, USA",
      categories: ["Tourism", "Urban", "Cultural"],
    },
  },
  {
    id: "2",
    position: { lat: 40.73061, lng: -73.935242 },
    title: "Brooklyn",
    description:
      "Hip neighborhood with trendy restaurants and vibrant art scene.",
    data: {
      rating: 4.7,
      photos: ["/api/placeholder/400/250"],
      address: "Brooklyn, NY, USA",
      categories: ["Urban", "Residential", "Cultural"],
    },
  },
  {
    id: "3",
    position: { lat: 40.7614, lng: -73.9776 },
    title: "Central Park",
    description: "An urban park in the heart of Manhattan.",
    data: {
      rating: 4.9,
      photos: ["/api/placeholder/400/250"],
      address: "Central Park, NY, USA",
      categories: ["Park", "Recreation", "Nature"],
    },
  },
];

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    // Get API key from environment in client component
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "");
  }, []);

  // Custom render function for marker cards
  const renderMarkerCard = ({ marker }: { marker: MarkerData }) => (
    <div className="relative">
      <button
        className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-500 shadow-md hover:text-gray-800"
        onClick={() => setSelectedMarker(null)}
        aria-label="Close"
      >
        ×
      </button>

      {marker.data?.photos && marker.data.photos.length > 0 && (
        <div className="-mx-2 -mt-2 mb-2 overflow-hidden rounded-t-lg">
          <Image
            src={marker.data.photos[0]}
            alt={marker.title || ""}
            height={100}
            width={200}
            className="h-40 w-full object-cover"
          />
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900">{marker.title}</h3>

      {marker.data?.rating && (
        <div className="mt-1 flex items-center">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`size-4 ${i < Math.floor(marker.data?.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">
            {marker.data?.rating}
          </span>
        </div>
      )}

      <p className="mt-2 text-sm text-gray-600">{marker.description}</p>

      {marker.data?.address && (
        <div className="mt-3 text-sm text-gray-500">
          <div className="flex items-start">
            <svg
              className="mr-1 mt-0.5 size-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{marker.data.address}</span>
          </div>
        </div>
      )}

      {marker.data?.categories && marker.data.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {marker.data.categories.map((category, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 border-t border-gray-100 pt-3">
        <button className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Interactive Map</h1>
      <p className="mb-6 text-gray-600">
        Explore locations with custom marker cards
      </p>

      {apiKey ? (
        <GoogleMapWithProvider
          apiKey={apiKey}
          markers={locations}
          height={600}
          className="mb-8"
          config={{
            center: { lat: 40.7128, lng: -74.006 },
            zoom: 12,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
          renderMarkerCard={renderMarkerCard}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />
      ) : (
        <div className="mb-8 border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <p className="text-yellow-700">
            API key not found. Make sure to set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            in your environment.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`rounded-lg border p-4 shadow-sm transition-colors ${
              selectedMarker?.id === location.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedMarker(location)}
          >
            <h2 className="text-xl font-semibold">{location.title}</h2>
            <p className="mt-1 text-gray-600">{location.description}</p>
            {location.data?.categories && (
              <div className="mt-3 flex flex-wrap gap-1">
                {location.data.categories.map((category, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
