import { Phone, Store } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { CampaignLocationProps } from "@/types/campaign";

type Props = {
  location: CampaignLocationProps;
};

const LocationCard = ({ location }: Props) => {
  const {
    objid,
    addressLine1,
    addressLine2,
    postalCode,
    phone,
    city,
    state,
    distance,
    locName,
  } = location;

  return (
    <div
      key={objid}
      className="body-regular flex flex-col gap-1 text-light-300"
    >
      <div className="text-dark-300">{locName}</div>
      <div>
        {addressLine1}, {addressLine2}, {city}, {state} {postalCode}
      </div>
      <div>({distance ? distance.toFixed(1) : "0"} miles)</div>
      <div className="paragraph-regular mt-4 flex gap-2 text-dark-300">
        <Phone /> {phone}
      </div>
      <Button className="my-4 w-fit bg-primary-500 text-white">
        <Store /> View Store
      </Button>
    </div>
  );
};

export default LocationCard;
