import React from "react";

import Categories from "@/app/(listing)/_components/categories";

const BusinessDirectoryFilters = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-6 p-4">
      {/* <DealsMap /> */}
      <Categories filterType="radio" />
    </div>
  );
};

export default BusinessDirectoryFilters;
