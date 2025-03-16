import React from "react";

import DefaultCard from "@/components/global/cards/DefaultCard";
import { CampaignOfferProps } from "@/types/campaign";

import OfferCard from "./offer-card";

type Props = {
  offers: CampaignOfferProps[];
};

const Offers = ({ offers }: Props) => {
  return (
    <DefaultCard className="flex flex-col gap-4">
      {offers.map((offer) => (
        <OfferCard key={offer.objid} offer={offer} />
      ))}
    </DefaultCard>
  );
};

export default Offers;
