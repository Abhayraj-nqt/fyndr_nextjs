import Image from "next/image";
import React from "react";

import LocalSearch from "@/components/global/search/LocalSearch";
import { api } from "@/lib/api";
import { LocationService } from "@/lib/location-service";

const HeroSection = async () => {
  const location = await LocationService.getLocation();
  const { success: bgSuccess, data: bgImage } =
    await api.location.getBackgroundImage({
      lat: location.lat,
      lng: location.lng,
    });

  return (
    <section
      id="hero"
      className="relative flex h-80 w-full items-center justify-center overflow-hidden"
    >
      <div className="size-full">
        <Image
          src={
            bgSuccess && bgImage?.backgroundImageUrl
              ? bgImage?.backgroundImageUrl
              : "/images/home_banner_bg.webp"
          }
          alt="hero"
          fill
          className="object-cover"
          priority
        />
      </div>
      <LocalSearch
        imgSrc="/icons/search.svg"
        placeholder="Search Offers, Events & Businesses"
        route="/"
        otherClasses="flex-1 absolute w-11/12 sm:w-full max-w-lg m-2"
      />
    </section>
  );
};

export default HeroSection;
