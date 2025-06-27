"use client";

import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import GoogleMap3, {
  MarkerData,
} from "@/components/global/google-map/google-map3";
import { Campaign } from "@/types/campaign/campaign.types";

type Props = {
  campaignLocations: Campaign["cmpnLocs"];
};

const OfferDetailsMap = ({ campaignLocations }: Props) => {
  const markerData: MarkerData[] = campaignLocations.map((location) => ({
    id: location.objid.toString(),
    position: {
      lat: location.lat,
      lng: location.lng,
    },
  }));

  return (
    <DefaultCard className="relative">
      <GoogleMap3 markers={markerData} zoom={12} height="350px" />
    </DefaultCard>
  );
};

export default OfferDetailsMap;
