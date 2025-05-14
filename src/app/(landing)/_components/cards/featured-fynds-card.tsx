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
import { parseAddress } from "@/lib/utils";
import { CampaignProps } from "@/types/campaign";

type Props = {
  campaign: CampaignProps;
};

const FeatureFyndsCard = ({ campaign }: Props) => {
  return (
    <Card className="relative min-h-[25rem] w-full cursor-pointer space-y-4 border-none p-4 shadow-none transition duration-500 hover:scale-105 sm:max-w-80">
      <CardHeader className="flex-between flex-row gap-2 space-y-0 p-0">
        <CardTitle>{campaign.biz.bizName}</CardTitle>
        <Image
          src={"/icons/crown.svg"}
          height={30}
          width={30}
          alt="crown-img"
          className="m-0"
        />
      </CardHeader>
      <CardContent className="space-y-6 p-0">
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
            className={`aspect-[2/1] rounded-md object-cover`}
          />
        </div>
        <div className="flex-between h-11 gap-2">
          <h4 className="paragraph-regular line-clamp-2">{campaign.title}</h4>
          <div className="flex-center relative flex min-w-20">
            <Image
              src={"/icons/chips.svg"}
              width={80}
              height={20}
              alt="offer-tag"
            />
            <p className="absolute text-primary-500">{campaign.cmpnType}</p>
          </div>
        </div>
        <CardDescription className="body-regular line-clamp-2 h-10 text-light-300">
          {`${
            campaign?.cmpnLocs[0]?.distance
              ? campaign?.cmpnLocs[0]?.distance.toFixed(1)
              : "0"
          } miles, ${parseAddress(campaign?.cmpnLocs[0])}`}
        </CardDescription>
      </CardContent>
      <CardFooter className="items-end justify-between p-0">
        <div className="flex flex-col gap-1">
          {campaign.cmpnType !== "coupons" &&
            campaign.cmpnOffers[0]?.retailPrice !==
              campaign.cmpnOffers[0]?.offerPrice && (
              <div className="small-regular text-light-400 line-through">
                {campaign.cmpnOffers[0]?.currencySymbol}
                {campaign.cmpnOffers[0]?.retailPrice?.toFixed(2)}
              </div>
            )}
          {campaign.cmpnType !== "coupons" && (
            <div className="paragraph-semibold text-primary-500">
              {campaign.cmpnOffers[0]?.currencySymbol}
              {campaign.cmpnOffers[0]?.offerPrice?.toFixed(2)}
            </div>
          )}
          {campaign.cmpnType === "coupons" &&
            campaign.cmpnOffers.length > 0 && (
              <div className="paragraph-semibold text-primary-500">
                {campaign.cmpnOffers[0]?.couponCode}
              </div>
            )}
        </div>
        {campaign.cmpnOffers[0]?.amount > 0 && (
          <>
            {campaign.cmpnOffers[0]?.discountType === "%" &&
              campaign.cmpnOffers[0]?.amount > 0 && (
                <div className="body-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
                  {campaign.cmpnOffers[0]?.amount}% OFF
                </div>
              )}
            {campaign.cmpnOffers[0]?.discountType === "flat" &&
              campaign.cmpnOffers[0]?.amount > 0 && (
                <div className="body-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
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
