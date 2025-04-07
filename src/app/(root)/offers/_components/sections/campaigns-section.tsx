import React from "react";

import { auth } from "@/auth";
import { DEFAULT_LOCATION } from "@/constants";
import { onGetCampaigns } from "@/lib/actions/campaign.action";

import CampaignCard from "../CampaignCard";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
  dealTypes: string[];
  categories: number[];
  distance: number;
};

const CampaignsSection = async ({
  location: { lat, lng },
  dealTypes,
  categories = [],
  distance = 50,
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

  const { success, data } = await onGetCampaigns(
    {
      page: 0,
      pageSize: 55,
      orderBy: "ASC",
    },
    {
      indvId: user?.id ? parseInt(user?.id) : null,
      distance,
      location: locationPayload,
      campaignType: dealTypes,
      categories,
      fetchById: "none",
      fetchByGoal: "INSTORE",
      locQRId: null,
    }
  );

  if (!success || !data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.campaigns.map((campaign) => (
        <CampaignCard key={campaign.objid} campaign={campaign} />
      ))}
    </div>
  );
};

export default CampaignsSection;
