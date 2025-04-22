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
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils";
import { CampaignOfferProps, CampaignProps } from "@/types/campaign";

type SeeCampaignProps = {
  className?: string;
  href: string;
  offers: CampaignOfferProps[];
};

const SeeCampaignCard = ({ className, href, offers }: SeeCampaignProps) => {
  return (
    <>
      {offers.map((offer) => (
        <Link key={offer.objid} href={href}>
          <Card className={`${className} flex flex-col shadow-none`}>
            <div className="relative w-48 rounded-t-md">
              <Image
                src={offer?.imageFilePath || "/fyndr-placeholder-gray.svg"}
                alt="img/alt"
                width={200}
                height={100}
                className="aspect-[2/1] size-full rounded-t-md object-cover"
              />
            </div>
            <div className="flex w-48 flex-col gap-2 p-2">
              <h3 className="body-regular line-clamp-1">{offer.title}</h3>
              <div className="flex gap-2">
                <span className="small-regular text-light-400 line-through">
                  {offer.currencySymbol}
                  {offer.retailPrice.toFixed(2)}
                </span>
                <span className="body-regular text-primary-500">
                  {offer.currencySymbol}
                  {offer.offerPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
};

type Props = {
  campaign: CampaignProps;
};

const CampaignCard = ({ campaign }: Props) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const toggleSeeMore = () => setSeeMore((prev) => !prev);

  return (
    <Card className="relative flex max-h-fit max-w-xl flex-col gap-4 rounded-lg border-light-700 p-4 shadow-none duration-100">
      <Link
        href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
        className="flex flex-col gap-4"
      >
        <CardHeader className="flex-between flex-row items-center gap-2 p-0">
          <CardTitle className="paragraph-semibold text-dark-200">
            {campaign.title}
          </CardTitle>
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
      </Link>

      <CardContent className="flex flex-col gap-4 p-0 xl:flex-row">
        <Link
          href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
          className="relative w-full xl:max-w-56"
        >
          <Image
            src={
              campaign?.images && campaign?.images.length > 0
                ? campaign?.images[0]?.img_url
                : "/fyndr-placeholder-gray.svg"
            }
            alt="img/alt"
            width={200}
            height={100}
            className="aspect-[2/1] size-full rounded-md object-cover xl:max-w-56"
          />
        </Link>
        <div className="space-y-4">
          <Link
            href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            className="space-y-4"
          >
            <CardTitle className="paragraph-semibold line-clamp-1 text-dark-200">
              {campaign.biz.bizName}
            </CardTitle>
            <CardDescription className="body-regular line-clamp-2 h-11 text-light-300">
              {`${
                campaign?.cmpnLocs[0]?.distance
                  ? campaign?.cmpnLocs[0]?.distance.toFixed(1)
                  : "0"
              } miles, ${parseAddress(campaign?.cmpnLocs[0])}`}
            </CardDescription>
          </Link>

          <div className="flex items-center gap-4 text-dark-300">
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

      <CardFooter className="flex-between body-regular p-0 text-dark-300">
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
        <div className="no-scrollbar relative flex flex-row gap-4 overflow-y-scroll">
          <SeeCampaignCard
            className={`${seeMore ? "flex" : "hidden"} duration-100`}
            href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            offers={campaign.cmpnOffers}
          />
        </div>
      )}
    </Card>
  );
};

export default CampaignCard;
