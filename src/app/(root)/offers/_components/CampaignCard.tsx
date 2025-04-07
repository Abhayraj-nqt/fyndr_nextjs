"use client";

import { Phone, Globe, Share2, Heart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseAddress } from "@/lib/utils";
import { CampaignOfferProps, CampaignProps } from "@/types/campaign";

type SeeCampaignProps = {
  className?: string;
  href: string;
  offers: CampaignOfferProps[];
};

const SeeCampaignCard = ({ className, href, offers }: SeeCampaignProps) => {
  return (
    <div className="no-scrollbar flex gap-4 overflow-y-scroll">
      {offers.map((offer) => (
        <Link key={offer.objid} href={href}>
          <Card className={`${className} flex flex-col shadow-none`}>
            <Image
              src={offer?.imageFilePath || "/fyndr-placeholder-gray.svg"}
              alt="img/alt"
              width={200}
              height={100}
              className="aspect-[2/1] rounded-t-md object-cover"
            />
            <div className="flex flex-col gap-2 p-2">
              <h3 className="paragraph-regular">{offer.title}</h3>
              <div className="flex gap-2">
                <span className="small-regular text-light-400 line-through">
                  {offer.currencySymbol}
                  {offer.retailPrice.toFixed(2)}
                </span>
                <span className="paragraph-semibold text-primary-500">
                  {offer.currencySymbol}
                  {offer.offerPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

type Props = {
  campaign: CampaignProps;
};

const CampaignCard = ({ campaign }: Props) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const toggleSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <Card className="flex max-h-fit max-w-xl flex-col gap-4 rounded-lg border-none p-4 shadow-none duration-100">
      <Link
        href={`/offers/${campaign?.biz?.bizName?.replace(
          /[.\W]+/g,
          "-"
        )}/${campaign?.qrCode}`.toLowerCase()}
        className="flex flex-col gap-4"
      >
        <CardHeader className="flex-between flex-row items-center gap-2 p-0">
          <CardTitle>{campaign.title}</CardTitle>
          {campaign.isFeatured && (
            <Image
              src={"/images/featured.png"}
              alt="featured"
              width={120}
              height={50}
              className="m-0"
            />
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0 xl:flex-row">
          <Image
            src={
              campaign?.images && campaign?.images.length > 0
                ? campaign?.images[0]?.img_url
                : "/fyndr-placeholder-gray.svg"
            }
            alt="img/alt"
            width={200}
            height={100}
            className="aspect-[2/1] size-full rounded-md object-cover xl:max-w-60"
          />
          <div className="space-y-4">
            <CardTitle>{campaign.biz.bizName}</CardTitle>
            <CardDescription className="body-regular text-light-300">
              {`${
                campaign?.cmpnLocs[0]?.distance
                  ? campaign?.cmpnLocs[0]?.distance.toFixed(1)
                  : "0"
              } miles, ${parseAddress(campaign?.cmpnLocs[0])}`}
            </CardDescription>
            <div className="flex items-center gap-4">
              <Phone size={20} />
              <Globe size={20} />
              <Share2 size={20} />
              <div className="flex items-center justify-center gap-2">
                <Heart size={20} />
                <p>1</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex-between p-0">
        <div className="capitalize">
          {campaign.cmpnType}: {campaign.cmpnOffers.length}
        </div>
        <div
          className="flex cursor-pointer flex-nowrap items-center justify-center gap-1"
          onClick={() => toggleSeeMore()}
        >
          See {campaign.cmpnType}
          <span className={`${seeMore ? "rotate-180" : ""} duration-100`}>
            <ChevronDown />
          </span>
        </div>
      </CardFooter>

      {seeMore && (
        <SeeCampaignCard
          className={`${seeMore ? "flex" : "hidden"} duration-100`}
          href={`/offers/${campaign?.biz?.bizName?.replace(
            /[.\W]+/g,
            "-"
          )}/${campaign?.qrCode}`.toLowerCase()}
          offers={campaign.cmpnOffers}
        />
      )}
    </Card>
  );
};

export default CampaignCard;
