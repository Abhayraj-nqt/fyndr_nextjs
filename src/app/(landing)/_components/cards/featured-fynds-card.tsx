import Image from "next/image";
import React from "react";

import PlaceholderImage from "@/components/global/placeholder-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ASSETS from "@/constants/assets";
import { parseAddress } from "@/lib/utils/address";
import { CampaignProps } from "@/types/campaign";

type Props = {
  campaign: CampaignProps;
};

const FeatureFyndsCard = ({ campaign }: Props) => {
  return (
    <Card className="relative size-full min-h-[23rem] cursor-pointer rounded-10 border-none p-4 shadow-none transition duration-300 hover:scale-105 sm:max-w-80">
      <CardHeader className="flex-between mb-4 flex-row gap-2 space-y-0 p-0">
        <CardTitle>
          <h3 className="body-1 text-black-80">{campaign.biz.bizName}</h3>
        </CardTitle>
        <Image
          // src={"/icons/crown.svg"}
          src={ASSETS.IMAGES.CROWN}
          height={28}
          width={28}
          alt="crown-img"
          className="m-0 size-7"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="relative w-full ">
          <PlaceholderImage
            src={
              (campaign.images &&
                campaign.images.length > 0 &&
                campaign?.images[0]?.img_url) ||
              "/images/fyndr-placeholder-gray.svg"
            }
            alt={`${campaign.title}: Book now on Fyndr`}
            width={600}
            height={300}
            className={`aspect-[2/1] rounded-5 object-cover`}
          />
        </div>
        <div className="flex-between h-11 gap-2">
          <h4 className="body-3 line-clamp-2 text-black-80">
            {campaign.title}
          </h4>
          <div className="flex-center relative flex min-w-20">
            <Image
              src={"/icons/chips.svg"}
              width={80}
              height={20}
              alt="offer-tag"
            />
            <p className="body-3 absolute text-primary">{campaign.cmpnType}</p>
          </div>
        </div>
        <CardDescription className="body-5 mb-4 line-clamp-2 h-8 text-black-60">
          {
            parseAddress(campaign?.cmpnLocs[0], {
              compactMode: true,
              includeDistance: true,
            }).formatted
          }
        </CardDescription>
      </CardContent>
      <CardFooter className="items-end justify-between p-0">
        <div className="flex-center gap-2">
          {campaign.cmpnType !== "coupons" &&
            campaign.cmpnOffers[0]?.retailPrice !==
              campaign.cmpnOffers[0]?.offerPrice && (
              <div className="body-5-medium text-black-30 line-through">
                {campaign.cmpnOffers[0]?.currencySymbol}
                {campaign.cmpnOffers[0]?.retailPrice?.toFixed(2)}
              </div>
            )}
          {campaign.cmpnType !== "coupons" && (
            <div className="body-1-medium text-primary">
              {campaign.cmpnOffers[0]?.currencySymbol}
              {campaign.cmpnOffers[0]?.offerPrice?.toFixed(2)}
            </div>
          )}
          {campaign.cmpnType === "coupons" &&
            campaign.cmpnOffers.length > 0 && (
              <div className="body-1-medium text-primary">
                {campaign.cmpnOffers[0]?.couponCode}
              </div>
            )}
        </div>
        {campaign.cmpnOffers[0]?.amount > 0 && (
          <>
            {campaign.cmpnOffers[0]?.discountType === "%" &&
              campaign.cmpnOffers[0]?.amount > 0 && (
                <div className="body-3-medium flex-center rounded bg-[#50B85A] px-3 py-1 capitalize text-white">
                  {campaign.cmpnOffers[0]?.amount}% OFF
                </div>
              )}
            {campaign.cmpnOffers[0]?.discountType === "flat" &&
              campaign.cmpnOffers[0]?.amount > 0 && (
                <div className="body-3-medium flex-center rounded bg-[#50B85A] px-3 py-1 capitalize text-white">
                  {campaign.cmpnOffers[0]?.currencySymbol}
                  {campaign.cmpnOffers[0]?.amount?.toFixed(2)} OFF
                </div>
              )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeatureFyndsCard;
