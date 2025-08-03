import { Phone, Globe, MapPin, StoreIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import BusinessRatings from "@/components/global/rating-and-reviews/business/business-rating";
import { parseAddress } from "@/lib/utils/address";
import { GetStoreResponse } from "@/types/store/store.response";

type Props = {
  parentLocation: GetStoreResponse["parentLocation"];
  businessLogo: string;
  businessName: string;
  bizId: number;
  website: string;
};

const StoreDetailsSection = ({
  bizId,
  businessLogo,
  businessName,
  parentLocation,
  website,
}: Props) => {
  return (
    <DefaultCard className="flex size-full flex-col p-0 sm:max-w-72 lg:min-w-96 lg:max-w-96">
      <div className="flex flex-col gap-4 border-b border-secondary-20 p-4">
        <Image
          src={businessLogo}
          alt={businessName}
          height={300}
          width={300}
          className="size-32 rounded-full"
        />
        <h2 className="heading-6 text-secondary">{businessName}</h2>
        <BusinessRatings bizId={bizId} compact className="flex-wrap" />
      </div>
      <div className="relative flex size-full flex-col">
        <div className="body-2 flex flex-col gap-4 border-b border-secondary-20 p-4 py-8 text-black-60">
          {
            parseAddress(parentLocation, {
              compactMode: true,
            }).formatted
          }
        </div>
        <div className="flex flex-col gap-2 border-b border-secondary-20 p-4 py-8">
          <div className="flex items-center gap-2 text-black-70">
            <Phone size={20} /> Contact Number
          </div>
          <div className="text-black-60">{parentLocation.phone}</div>
        </div>
        <div className="flex flex-col gap-2 border-b border-secondary-20 p-4 py-8">
          <div className="flex items-center gap-2 text-black-70">
            <Globe size={20} /> Website
          </div>
          <div className="text-black-60 underline">{website}</div>
        </div>
        <div className="flex flex-col gap-2 p-4 py-8">
          <Button variant="primary" stdHeight className="w-full">
            <MapPin size={20} /> Get Directions
          </Button>
          <Button variant="primary-dark" stdHeight className="w-full">
            <StoreIcon size={20} /> {"12"} Active Offers
          </Button>
        </div>
      </div>
    </DefaultCard>
  );
};

export default StoreDetailsSection;
