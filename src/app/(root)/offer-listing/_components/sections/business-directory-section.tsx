import React from "react";

import { auth } from "@/auth";
import { DEFAULT_LOCATION } from "@/constants";
import { onGetStores } from "@/lib/actions/store.action";

import BusinessDirectoryCard from "../business-directory-card";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
  query: string;
  distance: number;
};

const BusinessDirectorySection = async ({
  location: { lat, lng },
  distance,
  query = "",
}: Props) => {
  const locationPayload = DEFAULT_LOCATION;
  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  if (lat && lng) {
    locationPayload.lat = Number(lat);
    locationPayload.lng = Number(lng);
  }

  const { success, data } = await onGetStores(
    {
      page: 0,
      pageSize: 100,
      search: query,
    },
    {
      distance,
      location: locationPayload,
      indvId: user?.id ? parseInt(user?.id) : null,
      isCategory: false,
    }
  );

  if (!success || !data) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      {data.bizdir.map((bizDir) => (
        <BusinessDirectoryCard
          key={`${bizDir.bizid}-${bizDir.objid}`}
          businessDirectory={bizDir}
        />
      ))}
    </div>
  );
};

export default BusinessDirectorySection;
