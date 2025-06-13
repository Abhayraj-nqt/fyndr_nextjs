"use client";

import Image from "next/image";
import React from "react";

import GoogleMap2, {
  MarkerData,
} from "@/components/global/google-map/google-map2";

// Example usage component
const MapExample: React.FC = () => {
  // Sample markers data
  const markers: MarkerData[] = [
    {
      id: "1",
      position: { lat: 37.7749, lng: -122.4194 },
      title: "San Francisco",
      data: {
        name: "San Francisco",
        description: "Beautiful city in California",
        rating: 4.5,
        image:
          "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000138-46bdfa18-547e-4136-9422-0b51c97d8dea-0.webp",
      },
    },
    {
      id: "2",
      position: { lat: 37.7849, lng: -122.4094 },
      title: "Golden Gate Park",
      data: {
        name: "Golden Gate Park",
        description: "Large urban park in San Francisco",
        rating: 4.8,
        image:
          "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000138-46bdfa18-547e-4136-9422-0b51c97d8dea-0.webp",
      },
    },
    {
      id: "3",
      position: { lat: 37.7649, lng: -122.4294 },
      title: "Fisherman's Wharf",
      data: {
        name: "Fisherman's Wharf",
        description: "Popular tourist attraction with shops and restaurants",
        rating: 4.2,
        image:
          "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000138-46bdfa18-547e-4136-9422-0b51c97d8dea-0.webp",
      },
    },
  ];

  // Custom info window renderer
  const renderInfoWindow = (marker: MarkerData) => {
    return (
      <div className="max-w-xs p-4">
        <h3 className="mb-2 text-lg font-bold">
          {marker.data?.name || marker.title}
        </h3>
        {marker.data?.image && (
          <Image
            src={marker.data.image}
            alt={marker.data.name}
            height={200}
            width={200}
            className="mb-2 h-32 w-full rounded object-cover"
          />
        )}
        <p className="mb-2 text-sm text-gray-600">{marker.data?.description}</p>
        {marker.data?.rating && (
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-medium">
              {marker.data.rating}
            </span>
          </div>
        )}
        <button className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
          View Details
        </button>
      </div>
    );
  };

  // Handle marker click
  const handleMarkerClick = (marker: MarkerData) => {
    console.log("Marker clicked:", marker);
  };

  // Handle map click
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    console.log("Map clicked at:", event.latLng?.toJSON());
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Google Map Example</h1>

      <GoogleMap2
        markers={markers}
        height="600px"
        width="100%"
        zoom={14}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        renderInfoWindow={renderInfoWindow}
      />
    </div>
  );
};

export default MapExample;
