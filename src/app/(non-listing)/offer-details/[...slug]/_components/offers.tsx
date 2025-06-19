import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import { CampaignOffer } from "@/types/campaign/campaign.types";

import OfferCard from "./offer-card";

type Props = {
  offers: CampaignOffer[];
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
