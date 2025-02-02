import Link from "next/link";
import React from "react";

import NonFeaturedFyndsCard from "@/app/(root)/_components/cards/NonFeaturedFyndsCard";
import { Button } from "@/components/ui/button";
import { CAT_LIST_HOME } from "@/constants";
import ROUTES from "@/constants/routes";
import { getLowestPriceOffer, parseAddress } from "@/lib/utils";

type Props = {
  campaigns: Campaign[];
};

const NearbyOffers = ({ campaigns }: Props) => {
  const popularOffers = campaigns.filter(
    (i) =>
      i?.category?.name !== CAT_LIST_HOME[0]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[1]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[2]?.keyword
  );

  const catOneData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[0].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);
  const catTwoData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[1].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);
  const catThreeData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[2].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);

  const nearbyOffersAll = [
    ...popularOffers,
    ...catOneData,
    ...catTwoData,
    ...catThreeData,
  ];

  const imglistValue = 32;

  const nearbyOffers =
    nearbyOffersAll
      ?.filter(
        (item) =>
          item.cmpnType !== "events" &&
          !item.isFeatured &&
          item.cmpnType !== "brochure"
      )
      ?.slice(0, imglistValue)
      .sort((a, b) => {
        // Safely access the distance property, defaulting to Infinity if not present
        const distanceA = a.cmpnLocs[0]?.distance ?? Infinity;
        const distanceB = b.cmpnLocs[0]?.distance ?? Infinity;

        return distanceA - distanceB;
      }) || [];

  return (
    <section className="mt-10 flex flex-col">
      <h2 className="h2-semibold">Offers Near You</h2>
      <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {nearbyOffers.map((item) => (
          <Link
            key={item.objid}
            href={`/offer-details/${item?.biz?.bizName?.replace(/[.\W]+/g, "-")}/${item?.qrCode}`}
          >
            <NonFeaturedFyndsCard
              bizName={item.biz.bizName}
              currencySymbol={item.cmpnOffers[0]?.currencySymbol}
              title={item.title}
              address={`${item?.cmpnLocs[0]?.distance ? item?.cmpnLocs[0]?.distance.toFixed(1) : "0"} miles, ${parseAddress(item?.cmpnLocs[0])}`}
              imageURL={
                (item.images.length > 0 && item?.images[0]?.img_url) ||
                "/images/grayPlaceholderFyn.png"
              }
              discountType={item.cmpnOffers[0]?.discountType}
              discount={getLowestPriceOffer(item.cmpnOffers)?.amount}
              offerPrice={item.cmpnOffers[0]?.offerPrice}
              retailPrice={item.cmpnOffers[0]?.retailPrice}
            />
          </Link>
        ))}
      </div>
      {
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary-500 px-6 py-3 text-primary-500 hover:bg-light-900 hover:text-primary-500"
          asChild
        >
          <Link href={ROUTES.OFFERS}>See all offers</Link>
        </Button>
      }
    </section>
  );
};

export default NearbyOffers;
