"use client";

import { Clock, Globe, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { useSession } from "next-auth/react";
import React from "react";

// import { onLikeBusiness } from "@/actions/store.action";
import Button from "@/components/global/buttons/index";
import PhoneTo from "@/components/global/phone-to";
// import toast from "@/components/global/toast";
import WebsiteTo from "@/components/global/website-to";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ASSETS from "@/constants/assets";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils/address";
// import { LikeBusinessParams } from "@/types/store/store.params";
import { EnhancedBusinessDirectory } from "@/types/store/store.types";

import BusinessLocationMapModal from "./business-location-map-modal";
import WorkingHourModal from "./working-hour-modal";

type Props = {
  businessDirectory: EnhancedBusinessDirectory;
  refetchReviews?: () => void;
};

const BusinessDirectoryCard = ({
  businessDirectory,
  // refetchReviews,
}: Props) => {
  // const { data: session } = useSession();
  const address = parseAddress(businessDirectory, {
    compactMode: true,
    includeDistance: true,
  }).formatted;

  const viewStoreUrl: string = "";
  const viewActiveOffersAndEventsUrl: string =
    (businessDirectory.locationOfferData?.activeCampaignCount || 0) > 1
      ? `${ROUTES.OFFERS_AND_EVENTS}/?locQrId=${businessDirectory.qrid}`
      : ROUTES.OFFER_DETAILS(
          businessDirectory.bizName,
          businessDirectory.locationOfferData?.cmpnQrCode || ""
        );

  const canViewStore: boolean = !!businessDirectory?.catalogueId;
  // const isLiked: boolean = businessDirectory?.liked === "yes";

  // const handleLike = async () => {
  //   if (!session || !session?.user) {
  //     toast.error({
  //       message: "Please sign-in to like this business.",
  //     });
  //     return;
  //   }
  //   const payload: LikeBusinessParams["payload"] = {
  //     bizid: businessDirectory.bizid,
  //     indvid: Number(session.user.id) || 0,
  //   };

  //   const { success, data, error } = await onLikeBusiness({ payload });

  //   if (!success || !data) {
  //     toast.error({
  //       message:
  //         error?.details?.message ||
  //         "Failed to like the business. Please try again.",
  //     });
  //   } else {
  //     if (refetchReviews) {
  //       refetchReviews();
  //     }
  //   }
  // };

  return (
    <>
      <Card className="grid max-h-fit w-full grid-cols-1 flex-col gap-4 rounded-10 border border-secondary-20 p-4 shadow-none duration-100 lg:grid-cols-5 lg:gap-6">
        <Link href={viewActiveOffersAndEventsUrl} className="lg:col-span-2">
          <Image
            src={
              businessDirectory?.mainLogo
                ? businessDirectory.mainLogo
                : businessDirectory?.catImg
                  ? businessDirectory.catImg
                  : ASSETS.IMAGES.PLACEHOLDER.FYNDR
            }
            alt={`${businessDirectory.bizName} on Fyndr Now!`}
            width={400}
            height={200}
            className="aspect-[2/1] size-full rounded-10 object-cover"
          />
        </Link>
        <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
          <CardHeader className="flex-between flex-row items-center gap-2 p-0">
            <CardTitle>
              <h2 className="title-7-medium text-black-80">
                {businessDirectory.bizName}
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-0">
            <CardDescription className="body-1 text-black-60">
              {address}
            </CardDescription>
            <div className="mt-3 flex items-center gap-4 text-black-60">
              {businessDirectory?.phone ? (
                <PhoneTo phone={businessDirectory.phone}>
                  <Phone size={20} className="cursor-pointer" />
                </PhoneTo>
              ) : (
                <></>
              )}
              {businessDirectory?.website ? (
                <WebsiteTo url={businessDirectory.website}>
                  <Globe size={20} />
                </WebsiteTo>
              ) : (
                <></>
              )}
              {businessDirectory?.lat && businessDirectory?.lng ? (
                <BusinessLocationMapModal
                  id={`${businessDirectory.objid}-${businessDirectory.lat}-${businessDirectory.lng}-${businessDirectory.bizid}`}
                  location={{
                    lat: businessDirectory.lat,
                    lng: businessDirectory.lng,
                  }}
                  trigger={<MapPin size={20} className="cursor-pointer" />}
                  address={address}
                />
              ) : (
                <></>
              )}
              {businessDirectory?.workingHours ? (
                <WorkingHourModal
                  trigger={<Clock size={20} className="cursor-pointer" />}
                  workingHours={businessDirectory.businessWorkingHours}
                />
              ) : (
                <></>
              )}
              {/* <div className="flex items-center justify-center gap-1">
                <div className="flex" onClick={handleLike}>
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
                </div>
                {businessDirectory.bizDirLikes > 0 && (
                  <p>{businessDirectory.bizDirLikes}</p>
                )}
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="grid h-full grid-cols-1 content-end gap-4 p-0 lg:grid-cols-2">
            <Button variant="primary-outlined" stdHeight stdWidth asChild>
              <Link href={viewActiveOffersAndEventsUrl}>
                {businessDirectory.locationOfferData?.count} Active Offers &
                Events
              </Link>
            </Button>
            <Button
              variant="primary"
              stdHeight
              stdWidth
              disabled={!canViewStore}
              asChild
            >
              <Link href={viewStoreUrl}>View Store</Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default BusinessDirectoryCard;
