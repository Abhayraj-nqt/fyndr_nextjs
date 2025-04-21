import Image from "next/image";
import React from "react";

import { onGetBackgroundImage } from "@/actions/others.action";
import { auth } from "@/auth";
import LocalSearch from "@/components/global/search/LocalSearch";
import { DEFAULT_LOCATION } from "@/constants";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
};

const HeroSection = async ({ location: { lat, lng } }: Props) => {
  const locationPayload = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  if (lat && lng) {
    locationPayload.lat = Number(lat);
    locationPayload.lng = Number(lng);
  }

  const { success: bgSuccess, data: bgImage } =
    await onGetBackgroundImage(locationPayload);

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
          fetchPriority="high"
          loading="eager"
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
