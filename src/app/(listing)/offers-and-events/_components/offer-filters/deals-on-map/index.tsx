import React from "react";

import CampaignMarkerMap from "./campaign-marker-map";
import DistanceSlider from "./distance-slider";

const DealsOnMap = () => {
  return (
    <section>
      <h4 className="base-semibold mb-4 text-secondary">Deals on map</h4>
      <CampaignMarkerMap />
      <DistanceSlider />
    </section>
  );
};

export default DealsOnMap;
