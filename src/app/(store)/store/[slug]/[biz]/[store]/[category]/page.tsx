import { notFound } from "next/navigation";
import React from "react";

import { onGetStoreDetails } from "@/actions/store.action";
import ASSETS from "@/constants/assets";
import { RouteParams } from "@/types/global";

import BannerSection from "./_components/sections/banner-section";
import StoreItemSection from "./_components/sections/store-item-section";

const extractIdFromSlug = (slug: string): number | null => {
  if (!slug || typeof slug !== "string") return null;

  const parts = slug.split("-");
  const lastPart = parts[parts.length - 1];

  // Validate that the last part is a valid ID (numeric IDs)
  return /^\d+$/.test(lastPart) ? Number(lastPart) : null;
};

const extractRouteIds = (params: {
  biz: string;
  store: string;
  category: string;
}) => {
  const bizId = extractIdFromSlug(params.biz);
  const storeId = extractIdFromSlug(params.store);
  const categoryId = extractIdFromSlug(params.category);

  if (!bizId || !storeId || !categoryId) {
    return notFound();
  }

  return { bizId, storeId, categoryId };
};

const StoreDetails = async ({ searchParams, params }: RouteParams) => {
  // const routeParams = (await params) as {
  //   biz: string;
  //   store: string;
  //   category: string;
  // };
  // const { location: locationId } = await searchParams;

  // const { bizId, storeId, categoryId } = extractRouteIds(routeParams);

  // const bizId = 1000138;
  // const storeId = 205;
  // const categoryId = 210;
  const bizId = 1000389;
  const storeId = 512;
  const categoryId = 265;

  console.log({ bizId, storeId, categoryId });

  const { success, data: store } = await onGetStoreDetails({
    params: {
      bizId,
      catalogueId: storeId,
      categoryId,
    },
  });

  if (!success || !store) return null;

  const bannerImage =
    store.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  return (
    <div className="my-10 flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-[1550px] flex-col gap-4">
        <BannerSection imgURL={bannerImage} alt={store.name} />
        <StoreItemSection
          businessName="Hello"
          storeItems={store.catalogueItems}
        />
      </div>
    </div>
  );
};

export default StoreDetails;
