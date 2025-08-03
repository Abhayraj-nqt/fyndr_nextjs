import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import { GetStoreResponse } from "@/types/store/store.response";

import CategoryCard from "./category-card";

type Props = {
  categories: GetStoreResponse["categories"];
};

const CategorySection = ({ categories }: Props) => {
  return (
    <DefaultCard className="p-0">
      <div className="heading-6-medium border-b border-secondary-20 p-4 text-secondary">
        Categories
      </div>
      <div className="flex flex-col gap-4 p-4">
        <LocalSearch route="/" placeholder="Search here" />
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.objid} category={category} />
          ))}
        </div>
      </div>
    </DefaultCard>
  );
};

export default CategorySection;
