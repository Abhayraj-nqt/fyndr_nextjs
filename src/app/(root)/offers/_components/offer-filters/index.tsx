import Categories from "./categories";
import DealsMap from "./deals-map";
import TypeOfDeals from "./type-of-deals";

const OfferFilters = () => {
  return (
    <div className="flex h-fit w-full flex-col gap-6 p-4">
      <DealsMap />
      <TypeOfDeals />
      <Categories />
    </div>
  );
};

export default OfferFilters;
