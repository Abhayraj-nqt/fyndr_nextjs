import React from "react";

import { onGetStore } from "@/actions/store.action";
import ASSETS from "@/constants/assets";
import { RouteParams } from "@/types/global";

import BannerImageSection from "./_components/sections/banner-image-section";
import CategorySection from "./_components/sections/category-section";
import StoreDetailsSection from "./_components/sections/store-details-section";

const Store = async ({ searchParams, params }: RouteParams) => {
  const { slug: catalogueUrl } = (await params) as { slug: string };
  const { location: locationId, query = "" } = await searchParams;

  const { success, data: store } = await onGetStore({
    params: {
      locationId: Number(locationId || -1),
    },
  });

  if (!success || !store) return;

  const parentLocation = store.parentLocation;
  const bannerImage =
    store.catalogue.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  const { bizid, mainLogo, bizName, website } = store.biz;

  return (
    <>
      <main className="my-10 flex flex-col items-center justify-center p-4">
        <BannerImageSection
          imgURL={bannerImage}
          alt={bizName}
          className="mb-4 w-full sm:hidden"
        />
        <div className="flex w-full max-w-[1550px] flex-col gap-4 sm:flex-row xl:w-11/12">
          <StoreDetailsSection
            bizId={bizid}
            businessLogo={mainLogo}
            businessName={bizName}
            parentLocation={parentLocation}
            website={website}
            locationId={locationId ? Number(locationId) : null}
          />
          <div className="flex w-full flex-col gap-4">
            <BannerImageSection
              imgURL={bannerImage}
              alt={bizName}
              className="hidden sm:flex"
            />
            <CategorySection
              categories={store.categories}
              bizId={bizid}
              storeId={store.catalogue.objid}
              locId={Number(locationId)}
              storeUrl={catalogueUrl}
              query={query}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Store;
