import { Globe, Phone, Store } from "lucide-react";
import Link from "next/link";
import React from "react";

import Button from "@/components/global/buttons";
import WebsiteTo from "@/components/global/website-to";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils/address";
import { CampaignLocation } from "@/types/campaign/campaign.types";

type Props = {
  location: CampaignLocation;
  website?: string | null;
  variant?: "default" | "modal";
  radio?: boolean;
};

const LocationCard = ({
  location,
  variant = "default",
  radio = false,
  website = null,
}: Props) => {
  const { phone, locName } = location;
  const fullUrl = website
    ? website.startsWith("http")
      ? website
      : `https://${website}`
    : null;

  const storeUrl = ROUTES.STORE("");

  return (
    <div
      className={`body-3 flex w-full gap-4 text-black-50 ${variant === "modal" ? "flex-between flex-row" : "flex-col"}`}
    >
      <div className={`flex flex-col gap-4`}>
        <div className="flex flex-col gap-1">
          <div className="body-2 text-black-70">{locName}</div>
          <div>
            {
              parseAddress(location, {
                compactMode: true,
              }).formatted
            }
          </div>
          <div>
            ({location.distance ? location.distance.toFixed(1) : "0"} miles)
          </div>
        </div>
        {phone && (
          <div className="body-1 flex items-center gap-2 text-black-60">
            <Phone size={20} /> {phone}
          </div>
        )}
      </div>
      <div className="">
        {location?.catalogueId && !radio && (
          <Button variant="primary" className="self-start" asChild>
            <Link href={storeUrl}>
              <Store /> View Store
            </Link>
          </Button>
        )}
        {website && fullUrl && radio && (
          <WebsiteTo url={website}>
            <div className="flex-center gap-1">
              <Globe size={20} />{" "}
              <span className="text-primary underline">Website</span>
            </div>
          </WebsiteTo>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
