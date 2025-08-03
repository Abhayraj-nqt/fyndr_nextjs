"use client";

import React from "react";

import { Campaign } from "@/types/campaign/campaign.types";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

type Props = {
  campaignId: number;
  campaignLocations: Campaign["cmpnLocs"];
  campaignName: string;
  bizName: string;
};

const DefaultDataFiller = ({
  campaignId,
  campaignLocations,
  campaignName,
  bizName,
}: Props) => {
  const { setCampaignId, setLocationId, setCampaignName, setBizName } =
    useOfferCartStore();

  React.useEffect(() => {
    setCampaignId(campaignId);
    setCampaignName(campaignName);
    setBizName(bizName);

    // Automatically set locationId if only one location is available
    if (campaignLocations && campaignLocations.length === 1) {
      setLocationId(campaignLocations[0].locationId);
    }
  }, [
    bizName,
    campaignId,
    campaignLocations,
    campaignName,
    setBizName,
    setCampaignId,
    setCampaignName,
    setLocationId,
  ]);

  return null;
};

export default DefaultDataFiller;
