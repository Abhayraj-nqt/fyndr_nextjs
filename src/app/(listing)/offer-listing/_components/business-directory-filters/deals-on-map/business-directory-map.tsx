"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

import GoogleMap3, {
  MarkerData,
} from "@/components/global/google-map/google-map3";
import { DEFAULT_LOCATION } from "@/constants";
import ASSETS from "@/constants/assets";
import { useBusinessDirectoryMap } from "@/hooks/store/use-business-directory-map";

const BusinessDirectoryMap = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const searchParamsData = useMemo(
    () => ({
      lat: searchParams.get("lat"),
      lng: searchParams.get("lng"),
      dist: searchParams.get("dist") || "50",
      query: Array.isArray(params?.category)
        ? params?.category[0]
        : params?.category,
    }),
    [params?.category, searchParams]
  );

  const { data: session } = useSession();
  const user = session?.user;
  const indvId = session?.user?.id;

  const locationPayload = useMemo(() => {
    const location = { ...DEFAULT_LOCATION };

    if (user?.location) {
      location.lat = user.location.lat;
      location.lng = user.location.lng;
    }

    if (searchParamsData.lat && searchParamsData.lng) {
      location.lat = Number(searchParamsData.lat);
      location.lng = Number(searchParamsData.lng);
    }

    return location;
  }, [user?.location, searchParamsData.lat, searchParamsData.lng]);

  const queryParams = useMemo(
    () => ({
      search: searchParamsData.query || undefined,
      page: 1,
      pageSize: 500,
    }),
    // [searchParamsData.order, searchParamsData.query]
    [searchParamsData.query]
  );

  const queryPayload = useMemo(
    () => ({
      indvId: indvId ? Number(indvId) : null,
      distance: Math.max(Number(searchParamsData.dist), 20),
      location: locationPayload,
      isCategory: false,
    }),
    [indvId, searchParamsData.dist, locationPayload]
  );

  const {
    bizDir = [],
    isError,
    isLoading,
  } = useBusinessDirectoryMap({
    params: queryParams,
    payload: queryPayload,
  });

  const markerData: MarkerData[] = useMemo(() => {
    if (!bizDir || bizDir.length === 0) return [];

    const markers: MarkerData[] = [];
    for (const business of bizDir) {
      markers.push({
        id: `${business.bizid}-${business.objid}-${business.phone}-${business.lat}-${business.lng}`,
        position: {
          lat: business.lat,
          lng: business.lng,
        },
        title: business.bizName,
        data: {
          imgURL: business?.mainLogo || ASSETS.IMAGES.PLACEHOLDER.FYNDR,
        },
      });
    }

    return markers;
  }, [bizDir]);

  console.log({ bizDir, queryParams, queryPayload });

  // Show loading state for map
  if (isLoading) {
    return (
      <div className="flex h-[250px] items-center justify-center rounded-10 bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-2 size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <GoogleMap3
        height="250px"
        center={locationPayload}
        markers={[]} // Empty markers on error
      />
    );
  }

  return (
    <div className="relative">
      <GoogleMap3
        height="250px"
        center={locationPayload}
        markers={markerData}
        renderInfoWindow={(marker) => (
          <div className="max-w-xs p-4">
            <h3 className="mb-2 text-lg font-bold">{marker.title}</h3>
            {marker.data?.imgURL && (
              <Image
                src={marker.data.imgURL}
                alt={marker?.title || "marker"}
                className="mb-2 h-32 w-full rounded object-cover"
                height={200}
                width={200}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};

export default BusinessDirectoryMap;
