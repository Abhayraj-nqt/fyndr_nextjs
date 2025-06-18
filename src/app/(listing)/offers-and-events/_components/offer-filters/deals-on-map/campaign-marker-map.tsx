"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import Button from "@/components/global/buttons";
import GoogleMap2, {
  MarkerData,
} from "@/components/global/google-map/google-map2";
import GoogleMap3 from "@/components/global/google-map/google-map3";
import { DEFAULT_LOCATION, TYPES_OF_DEALS } from "@/constants";
import ROUTES from "@/constants/routes";
import { useCampaignMapMarkers } from "@/hooks/campaigns";

const CampaignMarkerMap = () => {
  const searchParams = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // const types = searchParams.get("types") || "";
  // const categories = searchParams.get("categories") || "";
  // const dist = searchParams.get("dist") || "50";
  // const query = searchParams.get("query");
  // const mode = searchParams.get("mode") || "offline";
  // const order = searchParams.get("order") || "asc";

  // Extract search params once
  const searchParamsData = useMemo(
    () => ({
      lat: searchParams.get("lat"),
      lng: searchParams.get("lng"),
      types: searchParams.get("types") || "",
      categories: searchParams.get("categories") || "",
      dist: searchParams.get("dist") || "50",
      query: searchParams.get("query"),
      mode: searchParams.get("mode") || "offline",
      order: searchParams.get("order") || "asc",
    }),
    [searchParams]
  );

  const { data: session } = useSession();
  const user = session?.user;
  const indvId = session?.user?.id;

  // Memoize location payload to prevent unnecessary re-renders
  const locationPayload = useMemo(() => {
    const location = { ...DEFAULT_LOCATION };

    if (user?.location) {
      location.lat = user.location.lat;
      location.lng = user.location.lng;
    }

    // if (lat && lng) {
    //   location.lat = Number(lat);
    //   location.lng = Number(lng);
    // }

    if (searchParamsData.lat && searchParamsData.lng) {
      location.lat = Number(searchParamsData.lat);
      location.lng = Number(searchParamsData.lng);
    }

    return location;
    // }, [user?.location, lat, lng]);
  }, [user?.location, searchParamsData.lat, searchParamsData.lng]);

  // Memoize deal types processing
  // const dealTypes = useMemo(() => {
  //   let processedTypes: string[] = types
  //     ? types.split(",").filter(Boolean)
  //     : ["ALL"];

  //   if (processedTypes.length === 0 || processedTypes[0] === "") {
  //     processedTypes = ["ALL"];
  //   }

  //   if (processedTypes.includes("ALL")) {
  //     return TYPES_OF_DEALS.filter((item) => item.value !== "ALL")
  //       .map((item) => item.value)
  //       .sort();
  //   }

  //   return processedTypes.sort();
  // }, [types]);

  // Memoize category IDs processing
  // const categoryIds = useMemo(() => {
  //   if (!categories) return [];

  //   return categories
  //     .split(",")
  //     .filter(Boolean)
  //     .map(Number)
  //     .filter((num) => !isNaN(num))
  //     .sort((a, b) => a - b);
  // }, [categories]);

  // Memoize query parameters to prevent unnecessary API calls
  // const queryParams = useMemo(
  //   () => ({
  //     orderBy: order.toUpperCase() as "ASC" | "DESC",
  //     search: query || undefined,
  //   }),
  //   [order, query]
  // );

  // const queryPayload = useMemo(
  //   () => ({
  //     indvId: indvId ? Number(indvId) : null,
  //     distance: Math.max(Number(dist), 20),
  //     location: locationPayload,
  //     campaignType: dealTypes,
  //     categories: categoryIds,
  //     fetchById: "none",
  //     fetchByGoal: mode === "offline" ? "INSTORE" : "ONLINE",
  //     locQRId: null,
  //   }),
  //   [indvId, dist, locationPayload, dealTypes, categoryIds, mode]
  // );

  // -----------------------------------------

  const dealTypes = useMemo(() => {
    let processedTypes: string[] = searchParamsData.types
      ? searchParamsData.types.split(",").filter(Boolean)
      : ["ALL"];

    if (processedTypes.length === 0 || processedTypes[0] === "") {
      processedTypes = ["ALL"];
    }

    if (processedTypes.includes("ALL")) {
      return TYPES_OF_DEALS.filter((item) => item.value !== "ALL")
        .map((item) => item.value)
        .sort();
    }

    return processedTypes.sort();
  }, [searchParamsData.types]);

  const categoryIds = useMemo(() => {
    if (!searchParamsData.categories) return [];

    return searchParamsData.categories
      .split(",")
      .filter(Boolean)
      .map(Number)
      .filter((num) => !isNaN(num))
      .sort((a, b) => a - b);
  }, [searchParamsData.categories]);

  const queryParams = useMemo(
    () => ({
      // orderBy: searchParamsData.order.toUpperCase() as "ASC" | "DESC",
      orderBy: "DESC" as const,
      search: searchParamsData.query || undefined,
    }),
    // [searchParamsData.order, searchParamsData.query]
    [searchParamsData.query]
  );

  const queryPayload = useMemo(
    () => ({
      indvId: indvId ? Number(indvId) : null,
      distance: Math.max(Number(searchParamsData.dist), 20),
      location: locationPayload,
      campaignType: dealTypes,
      categories: categoryIds,
      fetchById: "none" as const,
      // fetchByGoal:
      //   searchParamsData.mode === "offline"
      //     ? ("INSTORE" as const)
      //     : ("ONLINE" as const),
      fetchByGoal: "INSTORE",
      locQRId: null,
    }),
    [
      indvId,
      searchParamsData.dist,
      // searchParamsData.mode,
      locationPayload,
      dealTypes,
      categoryIds,
    ]
  );

  const {
    campaigns = [],
    isError,
    isLoading,
  } = useCampaignMapMarkers(queryParams, queryPayload);

  // Memoize marker data processing with performance optimization
  const markerData: MarkerData[] = useMemo(() => {
    if (!campaigns || campaigns.length === 0) return [];

    const markers: MarkerData[] = [];
    const maxMarkers = 1000; // Limit markers for performance
    let markerCount = 0;

    for (const campaign of campaigns) {
      if (markerCount >= maxMarkers) break;

      for (const location of campaign.cmpnLocs) {
        if (markerCount >= maxMarkers) break;

        markers.push({
          id: `${location.locationId}-${campaign.objid}-${campaign.biz.bizid}`,
          position: {
            lat: location.lat,
            lng: location.lng,
          },
          title: campaign.title,
          data: {
            bizName: campaign.biz.bizName,
            imgURL:
              campaign.images?.[0]?.thumbnail_url ||
              campaign.biz?.mainLogo ||
              "/images/fyndr-placeholder-gray.svg",
            href: ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode),
            campaign, // Include full campaign data if needed
          },
        });

        markerCount++;
      }
    }

    console.log(
      `Generated ${markers.length} markers from ${campaigns.length} campaigns`
    );
    return markers;
  }, [campaigns]);

  console.log({ markerData });

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
      <GoogleMap2
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
        // enableClustering={false}
        // maxMarkersToShow={500} // Limit for performance
        renderInfoWindow={(marker) => (
          <div className="max-w-xs p-4">
            <h3 className="mb-2 text-lg font-bold">{marker.title}</h3>
            {marker.data?.imgURL && (
              <Image
                src={marker.data.imgURL}
                alt={marker.data?.bizName}
                className="mb-2 h-32 w-full rounded object-cover"
                height={200}
                width={200}
              />
            )}
            <p className="mb-2 text-sm text-gray-600">{marker.data?.bizName}</p>
            <Link
              href={marker.data.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">View Details</Button>
            </Link>
          </div>
        )}
        onMarkerClick={(marker) => {
          console.log("Marker clicked:", marker);
          // Handle marker click if needed
        }}
      />

      {/* Show data stats */}
      {/* {markerData.length > 0 && (
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {markerData.length} location{markerData.length !== 1 ? "s" : ""}
        </div>
      )} */}
    </div>
  );
};

export default CampaignMarkerMap;
