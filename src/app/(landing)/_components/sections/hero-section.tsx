import Image from "next/image";
import React, { Suspense } from "react";

import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";

import BannerImage from "../banner-image";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
};

const HeroSection = async ({ location }: Props) => {
  return (
    <section
      id="hero"
      className="relative flex h-[23rem] w-full items-center justify-center overflow-hidden"
    >
      <div className="relative size-full">
        <Suspense
          key={`${location.lat}-${location.lng}`}
          fallback={
            <div className="relative flex h-[23rem] w-full items-center justify-center overflow-hidden">
              <Image src={"/images/home-page-banner.webp"} fill alt="Fyndr" />
            </div>
          }
        >
          <BannerImage location={location} />
        </Suspense>
      </div>
      <LocalSearch
        icon="/icons/search.svg"
        placeholder="Search Offers, Events & Businesses"
        route={ROUTES.OFFER_LISTING}
        className="absolute m-2 min-h-[56px] w-11/12 max-w-lg flex-1 sm:w-full"
        navigateTo={ROUTES.OFFER_LISTING}
      />
    </section>
  );
};

export default HeroSection;
