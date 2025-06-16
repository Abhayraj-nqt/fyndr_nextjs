import React from "react";

import GoBackButton from "@/components/global/buttons/go-back-button";
import LocationSelector from "@/components/global/location-selector";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";

import Distance from "../offer-filters/distance";
import Mode from "../offer-filters/mode";

const ActionBarSection = () => {
  return (
    <div className="mt-12 flex w-full gap-4 md:mt-0">
      <GoBackButton className="!hidden min-w-fit md:!flex" />
      <div className="w-full gap-4 md:grid md:grid-cols-4">
        <div className="!hidden items-center justify-between gap-4 md:!flex">
          <LocationSelector className="w-full" />
        </div>
        <Mode />
        <Distance className="!hidden md:!flex" />
        <LocalSearch
          placeholder="Search"
          route={ROUTES.OFFERS_AND_EVENTS}
          className="!hidden flex-row-reverse !px-1 !pr-2 md:!flex"
        />
      </div>
    </div>
  );
};

export default ActionBarSection;
