import React from "react";

import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import {
  Campaign,
  CampaignBiz,
  CampaignOffer,
} from "@/types/campaign/campaign.types";

import DefaultDataFiller from "../checkout/default-data-filler";
import OfferAppointmentModal from "../checkout/offer-appointment-modal";
import OfferCard from "../offer-card";
import ProceedToPay from "../proceed-to-pay";
import SelectLocationModal from "../select-location-modal";

type Props = {
  offers: CampaignOffer[];
  campaignId: number;
  campaignName: string;
  bizName: string;
  campaignType: Campaign["cmpnType"];
  campaignImages: string[];
  campaignLocations: Campaign["cmpnLocs"];
  merchantId: CampaignBiz["merchantId"];
};

const OffersSection = async ({
  offers,
  campaignId,
  campaignName,
  bizName,
  campaignImages = [],
  campaignLocations = [],
  merchantId,
  campaignType,
}: Props) => {
  const session = await auth();
  const indvId: number | null = session?.user ? Number(session.user.id) : null;

  const showProceedToPay =
    indvId &&
    merchantId &&
    (campaignType === "offers" || campaignType === "events");

  // const totalofferSold = offers.reduce((sum, current) => {
  //   return sum + current.offerSold;
  // }, 0);

  return (
    <>
      <DefaultCard className="flex flex-col gap-4">
        {/* {totalofferSold > 0 && <div>Total Offers Sold: {totalofferSold}</div>} */}
        <div className="flex flex-col gap-4">
          {offers.map((offer) => (
            <OfferCard
              key={offer.objid}
              offer={offer}
              campaignId={campaignId}
              campaignImages={campaignImages}
              campaignLocations={campaignLocations}
              merchantId={merchantId}
              indvId={indvId}
            />
          ))}
          {showProceedToPay && <ProceedToPay />}
        </div>
      </DefaultCard>
      <SelectLocationModal
        locations={campaignLocations}
        campaignId={campaignId}
      />
      <OfferAppointmentModal
        campaignId={campaignId}
        campaignLocations={campaignLocations}
      />
      <DefaultDataFiller
        campaignId={campaignId}
        campaignLocations={campaignLocations}
        campaignName={campaignName}
        bizName={bizName}
      />
    </>
  );
};

export default OffersSection;
