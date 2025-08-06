import Image from "next/image";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ASSETS from "@/constants/assets";
import { getRemaining } from "@/lib/utils";
import { parseAmount, parseDiscount } from "@/lib/utils/parser/index";
import {
  Campaign,
  CampaignBiz,
  CampaignOffer,
} from "@/types/campaign/campaign.types";

import BuyNowButton from "./buy-now-button";
import OfferAmountSummary from "./offer-amount-summary";
import OfferQtySelector from "./offer-qty-selector";

type Props = {
  offer: CampaignOffer;
  campaignImages: string[];
  campaignLocations: Campaign["cmpnLocs"];
  merchantId: CampaignBiz["merchantId"];
  indvId: number | null;
};

const OfferCard = ({
  offer,
  campaignImages,
  campaignLocations = [],
  merchantId,
  indvId,
}: Props) => {
  const remainingOffers: number | null = offer.offerLimit
    ? getRemaining(offer.offerLimit, offer?.offerSold || 0)
    : null;

  const offerSoldOut: boolean =
    !!offer?.offerLimit && !(remainingOffers && remainingOffers > 0);

  console.log({ indvId, offerSoldOut, merchantId });

  return (
    <Card className="flex flex-col border-none bg-primary-0.5 shadow-none">
      <div className="flex flex-col gap-4 p-4 lg:flex-row">
        <Image
          src={
            offer.imageFilePath
              ? offer.imageFilePath
              : campaignImages?.length > 0
                ? campaignImages[0]
                : ASSETS.IMAGES.PLACEHOLDER.FYNDR
          }
          alt={offer.title}
          height={150}
          width={300}
          className="aspect-[2/1] w-full rounded-md lg:h-32 lg:w-64"
        />
        <div className="w-full">
          <CardHeader className="flex-between flex-row gap-2 space-y-0 p-0">
            <CardTitle className="body-3 text-black-80">
              {offer.title}
            </CardTitle>
            {offer.isVoucher && (
              <Image
                src={ASSETS.ICONS.VOUCHER.BLUE}
                alt="voucher"
                height={20}
                width={40}
              />
            )}
          </CardHeader>
          <CardContent className="mt-2 flex flex-col gap-2 p-0">
            <div className="flex-between flex gap-2">
              <div className="flex items-center gap-3">
                {offer.amount > 0 && (
                  <p className="body-3-medium text-black-40 line-through">
                    {offer.currencySymbol}
                    {parseAmount(offer.retailPrice)}
                  </p>
                )}
                <p className="body-3-medium text-primary">
                  {offer.currencySymbol}
                  {parseAmount(offer.offerPrice)}
                </p>
              </div>
              {offer.amount > 0 && (
                <>
                  <div className="flex w-full max-w-28 justify-center">
                    <div className="relative flex h-10 w-full max-w-28 items-center justify-center overflow-hidden">
                      {/* Main background */}
                      <div className="absolute inset-0 bg-yellow-300"></div>
                      {/* Left cutout */}
                      <div className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-gray-100"></div>
                      {/* Right cutout */}
                      <div className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-gray-100"></div>
                      {/* Content */}
                      <div className="body-3-medium relative z-10 text-black-80">
                        {parseDiscount(
                          offer.amount,
                          offer.discountType,
                          offer.currencySymbol
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {offer?.offerLimit && (
              <div className="flex gap-2">
                {remainingOffers && remainingOffers > 0 ? (
                  <p className="body-3 text-black-80">
                    Offer Remaining: <span>{remainingOffers}</span>
                  </p>
                ) : (
                  <p className="body-3-medium text-red-500">Offer Sold Out</p>
                )}
              </div>
            )}
            {indvId && !offerSoldOut && merchantId ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="body-3 text-black-80">Qty: </div>
                  <OfferQtySelector
                    campaignLocations={campaignLocations}
                    offer={offer}
                  />
                  {offer.usageLimit !== -1 && (
                    <div className="body-3 text-black-80">
                      Limit: {offer.usageLimit}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>{!indvId && merchantId && <BuyNowButton />}</>
            )}
          </CardContent>
        </div>
      </div>
      <OfferAmountSummary offerId={offer.objid} />
    </Card>
  );
};

export default OfferCard;
