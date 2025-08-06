import React from "react";

import Categories from "@/app/(listing)/_components/categories";

import DealsOnMap from "./deals-on-map";

const BusinessDirectoryFilters = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-6 p-4">
      <DealsOnMap />
      <Categories filterType="radio" />
    </div>
  );
};

export default BusinessDirectoryFilters;
