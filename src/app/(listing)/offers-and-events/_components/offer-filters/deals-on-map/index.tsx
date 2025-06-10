import React from "react";

import CampaignMarkerMap from "./campaign-marker-map";
import DistanceSlider from "./distance-slider";

type Props = {
  showHeading?: boolean;
};

const DealsOnMap = ({ showHeading = true }: Props) => {
  return (
    <section>
      <h4
        className={`title-7-medium mb-4 text-black-heading ${showHeading ? "" : "hidden"}`}
      >
        Deals on map
      </h4>
      <CampaignMarkerMap />
      <DistanceSlider />
    </section>
  );
};

export default DealsOnMap;
