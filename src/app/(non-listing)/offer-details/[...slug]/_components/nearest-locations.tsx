import React from "react";

import { Separator } from "@/components/ui/separator";
import { CampaignLocation } from "@/types/campaign/campaign.types";

import AllLocationsModal from "./all-locations-modal";
import LocationCard from "./location-card";

type Props = {
  locations: CampaignLocation[];
  className?: string;
};

const NearestLocations = ({ locations = [], className }: Props) => {
  if (locations.length === 0) return <></>;

  const slicedLocations = locations.slice(0, 10);

  return (
    <div className={`flex flex-col gap-4 p-4 ${className}`}>
      <p className="heading-6 text-secondary">Nearest Valid Locations:</p>
      <div className="flex flex-col gap-6">
        {slicedLocations.map((item, i) => (
          <React.Fragment key={item.objid}>
            <LocationCard location={item} />
            {i !== slicedLocations.length - 1 && <Separator className="" />}
          </React.Fragment>
        ))}
      </div>
      {locations.length > 10 && <AllLocationsModal locations={locations} />}
    </div>
  );
};

export default NearestLocations;
