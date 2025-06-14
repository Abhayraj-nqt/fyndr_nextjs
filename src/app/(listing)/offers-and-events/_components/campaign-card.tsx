"use client";

import { Separator } from "@radix-ui/react-select";
import { Phone, Globe, Share2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import MailTo from "@/components/global/mail-to";
import PhoneTo from "@/components/global/phone-to";
import toast from "@/components/global/toast";
import WebsiteTo from "@/components/global/website-to";
import DownArrow from "@/components/icons/down-arrow";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ROUTES from "@/constants/routes";
import { HOST } from "@/environment";
import { useOptimisticLike } from "@/hooks/campaigns";
import { parseAddress } from "@/lib/utils/address";
import { CampaignProps } from "@/types/campaign";

import SeeMoreSection from "./sections/see-more-section";

type Props = {
  campaign: CampaignProps;
  refetch?: () => void;
};

const CampaignCard = ({ campaign }: Props) => {
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "offline";
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const { data: session } = useSession();

  // Use the optimistic like hook
  const likeMutation = useOptimisticLike();

  const toggleSeeMore = () => setSeeMore((prev) => !prev);

  const hasVoucher = campaign.cmpnOffers.some((item) => item.isVoucher);

  const handleLikeCampaign = async () => {
    if (!session || !session.user) {
      toast.error({
        message: "Please login first",
      });
      return;
    }

    // Check current like status - if objid exists and isDeleted is false, it's liked
    const isCurrentlyLiked =
      campaign?.indvCmpn?.objid && campaign?.indvCmpn?.isDeleted === false;

    // Determine the new state - if currently liked, we want to unlike (isDeleted: true)
    // If not currently liked, we want to like (isDeleted: false)
    const newIsDeleted = !!isCurrentlyLiked;

    // Trigger optimistic update
    likeMutation.mutate({
      bizId: campaign.biz.bizid,
      cmpnId: campaign.objid,
      indvId: Number(session.user.id),
      isDeleted: newIsDeleted,
      objid: campaign?.indvCmpn?.objid || null, // This will be null for new likes
    });
  };

  // Determine current like state - liked if objid exists and isDeleted is false
  const isLiked =
    campaign?.indvCmpn?.objid && campaign?.indvCmpn?.isDeleted === false;

  return (
    <Card className="relative flex max-h-fit  flex-col gap-3 overflow-x-hidden rounded-10 border-secondary-20 p-3 shadow-none duration-100">
      <Link
        href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
        className="flex flex-col gap-4"
      >
        <CardHeader className="flex-between h-6 flex-row items-center gap-2 p-0">
          <CardTitle className="body-1-medium text-black-70">
            {campaign.title}
          </CardTitle>
          {campaign.isFeatured && (
            <Image
              src={"/images/featured.png"}
              alt="featured"
              width={120}
              height={50}
              className="m-0 w-28"
            />
          )}
        </CardHeader>
      </Link>

      <CardContent className=" grid grid-cols-1 gap-4  p-0 sm:grid-cols-5">
        <Link
          href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
          className="relative col-span-2 w-full"
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
            className="aspect-[2/1] size-full rounded-5 object-cover"
          />
        </Link>
        <div className="col-span-3 flex flex-col gap-4">
          <Link
            href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            className="flex flex-col gap-3"
          >
            <CardTitle className="flex-between">
              <span className="body-1-medium line-clamp-1 text-primary">
                {campaign.biz.bizName}
              </span>
              {hasVoucher ? (
                <Image
                  src={"/icons/voucher.svg"}
                  alt="voucher"
                  height={25}
                  width={50}
                  className="w-8"
                />
              ) : (
                <></>
              )}
            </CardTitle>
            {mode === "offline" ? (
              <CardDescription className="body-5 line-clamp-2 h-[30px] text-black-60">
                {
                  parseAddress(campaign?.cmpnLocs[0], {
                    compactMode: true,
                    includeDistance: true,
                  }).formatted
                }
              </CardDescription>
            ) : (
              <></>
            )}
          </Link>

          <div className="flex items-center gap-4 text-black-60">
            {campaign?.cmpnLocs[0]?.phone ? (
              <PhoneTo phone={campaign?.cmpnLocs[0]?.phone}>
                <Phone size={20} />
              </PhoneTo>
            ) : (
              <></>
            )}

            {campaign.cmpnUrl || campaign.biz.website ? (
              <WebsiteTo
                url={`https://${campaign.cmpnUrl || campaign.biz.website}`}
              >
                <Globe size={20} />
              </WebsiteTo>
            ) : (
              <></>
            )}
            <MailTo
              email=""
              subject={`${campaign.biz.bizName}: ${campaign.title}`}
              body={`Found this deal on fyndr:\n${
                campaign.title
              }\n${HOST}${ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}`}
            >
              <Share2 size={20} />
            </MailTo>
            <div className="flex-center gap-1">
              <button
                onClick={handleLikeCampaign}
                disabled={likeMutation.isPending}
                className="flex items-center transition-opacity disabled:opacity-50"
              >
                {isLiked ? (
                  <Heart
                    fill="#ef4444"
                    strokeWidth={0}
                    size={20}
                    className="cursor-pointer"
                  />
                ) : (
                  <Heart size={20} className="cursor-pointer" />
                )}
              </button>
              {campaign.likedCount > 0 ? <p>{campaign.likedCount}</p> : <></>}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-between body-regular items-end p-0 text-black-80">
        <div className="body-3 capitalize text-black-60">
          {campaign.cmpnType}: {campaign.cmpnOffers.length}
        </div>
        <div
          className="body-3 flex-center cursor-pointer flex-nowrap items-center justify-center gap-2 text-primary"
          onClick={() => toggleSeeMore()}
        >
          See {campaign.cmpnType}
          <span className={`${seeMore ? "rotate-180" : ""} duration-100`}>
            <DownArrow height={20} width={20} />
          </span>
        </div>
      </CardFooter>

      {seeMore ? (
        <div className="flex flex-col gap-3">
          <Separator className="h-[0.5px] bg-black-10" />
          <SeeMoreSection offers={campaign.cmpnOffers} />
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default CampaignCard;
