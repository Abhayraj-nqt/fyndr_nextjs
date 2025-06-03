import React from "react";

import { Separator } from "@/components/ui/separator";
import { CampaignLocationProps } from "@/types/campaign";

import LocationCard from "./location-card";

type Props = {
  locations: CampaignLocationProps[];
  className?: string;
};

const NearestLocations = ({ locations = [], className }: Props) => {
  if (locations.length === 0) return <></>;

  return (
    <div className={`flex flex-col gap-4 p-4 ${className}`}>
      <p className="text-xl text-black-80">Nearest Valid Locations:</p>
      <div className="flex flex-col gap-4">
        {locations.map((item, i) => (
          <React.Fragment key={item.objid}>
            <LocationCard location={item} />
            {i !== locations.length - 1 && <Separator className="mb-4 mt-2" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NearestLocations;
