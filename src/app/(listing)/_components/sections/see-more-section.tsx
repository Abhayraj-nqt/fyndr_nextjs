import React from "react";

import { CampaignOfferProps } from "@/types/campaign";

import SeeMoreCard from "../cards/see-more-card";

type Props = {
  className?: string;
  offers: CampaignOfferProps[];
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
