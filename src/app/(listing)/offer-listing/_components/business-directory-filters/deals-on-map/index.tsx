import React from "react";

import DistanceSlider from "@/app/(listing)/_components/distance-slider";

import BusinessDirectoryMap from "./business-directory-map";

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
      <BusinessDirectoryMap />
      <DistanceSlider />
    </section>
  );
};

export default DealsOnMap;
