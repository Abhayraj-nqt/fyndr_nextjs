import React from "react";

import { onGetStore } from "@/actions/store.action";
import ASSETS from "@/constants/assets";
import { RouteParams } from "@/types/global";

import BannerImageSection from "./_components/sections/banner-image-section";
import CategorySection from "./_components/sections/category-section";
import StoreDetailsSection from "./_components/sections/store-details-section";

const Store = async ({ searchParams, params }: RouteParams) => {
  //   const { slug } = (await params) as { slug: string };
  //   const { location: locationId } = await searchParams;

  // const catalogueUrl = "Tasty-bytes-512";
  // const locationId = 493;
  const catalogueUrl = "scafe21";
  const locationId = 444;

  console.log({ catalogueUrl, locationId });

  const { success, data: store } = await onGetStore({
    params: {
      locationId,
    },
  });

  if (!success || !store) return;

  console.log({ store });

  const parentLocation = store.parentLocation;
  const bannerImage =
    store.catalogue.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  const { bizid, mainLogo, bizName, website } = store.biz;

  return (
    <>
      <main className="my-10 flex flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-[1550px] flex-col gap-4">
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
            />
            <div className="flex w-full flex-col gap-4">
              <BannerImageSection
                imgURL={bannerImage}
                alt={bizName}
                className="hidden sm:flex"
              />
              <CategorySection categories={store.categories} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Store;
