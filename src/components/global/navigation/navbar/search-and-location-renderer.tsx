"use client";

import { usePathname } from "next/navigation";
import React from "react";

import ROUTES from "@/constants/routes";

import LocationSelector from "../../location-selector";
import MobileLocationSelectorModal from "../../location-selector/mobile-location-selector-modal";
import LocalSearch from "../../search/local-search";
import VisibilityWrapper from "../../visibility-wrapper";

const SearchAndLocationRenderer = () => {
  const pathname = usePathname();
  const { HOME, OFFERS_AND_EVENTS, OFFER_LISTING } = ROUTES;

  switch (pathname) {
    case HOME:
      return (
        <>
          <VisibilityWrapper visibleHeight={200}>
            <LocalSearch
              placeholder="Search Offers, Events & Businesses"
              route="/"
              className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 !gap-0 !px-3 xs:min-h-[45px] sm:w-full"
              inputClassName="!px-2"
              navigateTo={ROUTES.OFFER_LISTING}
              navigateParam={"query"}
              isOnNavbar
            />
          </VisibilityWrapper>
          <LocationSelector
            className="hidden w-full max-w-lg sm:flex"
            inputClassName="w-full"
          />
          <div></div>
          <MobileLocationSelectorModal className="sm:hidden" />
        </>
      );

    case OFFERS_AND_EVENTS:
      return (
        <>
          <LocalSearch
            placeholder="Search Offers, Events & Businesses"
            route={ROUTES.OFFERS_AND_EVENTS}
            className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 !gap-0 !px-3 xs:min-h-[45px] sm:w-full md:!hidden"
            inputClassName="!px-2"
            isOnNavbar
          />
          <MobileLocationSelectorModal className="md:hidden" />
        </>
      );

    case OFFER_LISTING:
      return (
        <>
          <LocalSearch
            placeholder="Search Offers, Events & Businesses"
            route="/"
            className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 !gap-0 !px-3 xs:min-h-[45px] sm:w-full"
            inputClassName="!px-2"
            navigateTo={ROUTES.OFFER_LISTING}
            navigateParam={"query"}
            isOnNavbar
          />
          <LocationSelector
            className="hidden w-full max-w-lg sm:flex"
            inputClassName="w-full"
          />
          <MobileLocationSelectorModal className="sm:hidden" />
        </>
      );

    default:
      return null;
  }
};

export default SearchAndLocationRenderer;
