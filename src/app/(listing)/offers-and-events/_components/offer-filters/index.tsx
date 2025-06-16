import Categories from "@/app/(listing)/_components/categories";

import DealsOnMap from "./deals-on-map";
import TypeOfDeals from "./type-of-deals";

const OfferFilters = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-6 p-4">
      <DealsOnMap />
      <TypeOfDeals />
      <Categories filterType="checkbox" />
    </div>
  );
};

export default OfferFilters;
