"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import ROUTES from "@/constants/routes";

import LocationSelector from "../../location-selector";
import MobileLocationSelectorModal from "../../location-selector/mobile-location-selector-modal";
import LocalSearch from "../../search/local-search";
import VisibilityWrapper from "../../visibility-wrapper";

const SearchAndLocationRenderer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { HOME, OFFERS_AND_EVENTS, OFFER_LISTING } = ROUTES;

  const isOfferListingRoute = pathname.startsWith(OFFER_LISTING);

  switch (true) {
    case pathname === HOME:
      return (
        <>
          <div className="relative flex w-full flex-row gap-2 md:justify-center lg:justify-end lg:gap-4">
            <VisibilityWrapper visibleHeight={200}>
              <LocalSearch
                placeholder="Offers, Events & Coupons"
                route="/"
                className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 flex-row-reverse !gap-0 !px-3 !pl-1 xs:min-h-[45px] sm:w-full"
                inputClassName="!px-2"
                navigateTo={ROUTES.OFFER_LISTING}
                pathVariable="category"
                isOnNavbar
              />
            </VisibilityWrapper>
            <LocationSelector
              className="hidden w-full max-w-lg sm:flex"
              inputClassName="w-full"
            />
          </div>
          <div></div>
          <MobileLocationSelectorModal className="sm:hidden" />
        </>
      );

    case pathname === OFFERS_AND_EVENTS:
      return (
        <>
          <LocalSearch
            placeholder="Offers, Events & Coupons"
            route={ROUTES.OFFERS_AND_EVENTS}
            className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 flex-row-reverse !gap-0 !px-3 !pl-1 xs:min-h-[45px] sm:w-full md:!hidden"
            inputClassName="!px-2"
            isOnNavbar
          />
          <MobileLocationSelectorModal className="md:hidden" />
        </>
      );

    case isOfferListingRoute:
      return (
        <>
          <div className="relative flex w-full flex-row gap-2 md:justify-center lg:justify-end lg:gap-4">
            <LocalSearch
              placeholder="Offers, Events & Coupons"
              route="/"
              className="size-full min-h-9 min-w-[50%] max-w-lg flex-1 flex-row-reverse !gap-0 !px-3 !pl-1 xs:min-h-[45px] sm:w-full"
              inputClassName="!px-2"
              navigateTo={ROUTES.OFFER_LISTING}
              pathVariable="category"
              isOnNavbar
              onEmpty={() => {
                router.push(ROUTES.OFFER_LISTING);
              }}
            />
            <LocationSelector
              className="hidden w-full max-w-lg sm:flex"
              inputClassName="w-full"
            />
          </div>
          <MobileLocationSelectorModal className="sm:hidden" />
        </>
      );

    default:
      return null;
  }
};

export default SearchAndLocationRenderer;
