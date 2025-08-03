import React from "react";

import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import {
  Campaign,
  CampaignBiz,
  CampaignOffer,
} from "@/types/campaign/campaign.types";

import OfferAppointmentModal from "./appointment/offer-appointment-modal";
import PaymentInfoWrapper from "./payment-info-wrapper";
import ProceedToPayWrapper from "./proceed-to-pay-wrapper";
import SelectLocationModal from "./select-location-modal";
import OfferCard from "../../cards/offer-card";
import DefaultDataFiller from "../../helpers/default-data-filler";
import NavigationCleanerOfferCartStore from "../../helpers/navigation-cleaner-offer-cart-store";

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
