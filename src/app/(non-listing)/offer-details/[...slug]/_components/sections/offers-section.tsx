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
import ProceedToPayWrapper from "../checkout/proceed-to-pay-wrapper";
import OfferCard from "../offer-card";
import SelectLocationModal from "../select-location-modal";
import PaymentInfoWrapper from "./payment-info-wrapper";
import NavigationCleanerOfferCartStore from "../navigation-cleaner-offer-cart-store";

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
              campaignImages={campaignImages}
              campaignLocations={campaignLocations}
              merchantId={merchantId}
              indvId={indvId}
            />
          ))}
          {showProceedToPay && <ProceedToPayWrapper />}
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
      <NavigationCleanerOfferCartStore />
      <DefaultDataFiller
        campaignId={campaignId}
        campaignLocations={campaignLocations}
        campaignName={campaignName}
        bizName={bizName}
      />
      <PaymentInfoWrapper />
    </>
  );
};

export default OffersSection;
