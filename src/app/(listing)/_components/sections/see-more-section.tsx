import React from "react";

import { CampaignOffer } from "@/types/campaign/campaign.types";

import SeeMoreCard from "../cards/see-more-card";

type Props = {
  className?: string;
  offers: CampaignOffer[];
};

const SeeMoreSection = ({ className, offers }: Props) => {
  return (
    <div className={`no-scrollbar flex gap-3 overflow-x-scroll ${className}`}>
      {offers.map((offer) => (
        <SeeMoreCard key={offer.objid} offer={offer} />
      ))}
    </div>
  );
};

export default SeeMoreSection;
