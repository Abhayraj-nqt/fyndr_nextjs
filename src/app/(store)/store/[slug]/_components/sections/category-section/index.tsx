import Link from "next/link";
import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";
import { GetStoreResponse } from "@/types/store/store.response";

import CategoryCard from "./category-card";

type Props = {
  categories: GetStoreResponse["categories"];
  bizId: number;
  storeId: number;
  locId: number;
  storeUrl: string;
  query: string;
};

const CategorySection = ({
  categories,
  bizId,
  storeId,
  locId,
  storeUrl,
  query = "",
}: Props) => {
  const filteredCategories = categories.filter((category) => {
    if (!query || query.trim() === "") {
      return true;
    }

    const searchTerm = query.toLowerCase().trim();
    const nameMatch = category.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = category.description
      ? category.description.toLowerCase().includes(searchTerm)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <DefaultCard className="p-0">
      <div className="heading-6-medium border-b border-secondary-20 p-4 text-secondary">
        Categories
      </div>
      <div className="flex flex-col gap-4 p-4">
        <LocalSearch
          route={ROUTES.STORE(storeUrl)}
          placeholder="Search category"
        />
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"> */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredCategories.map((category) => (
              <Link
                href={ROUTES.STORE_ITEMS({
                  bizId,
                  storeId,
                  categoryId: category.objid,
                  locId,
                  storeUrl,
                })}
                key={category.objid}
              >
                <CategoryCard key={category.objid} category={category} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex-center w-full py-4">
            <p className="text-black-70">No category found</p>
          </div>
        )}
      </div>
    </DefaultCard>
  );
};

export default CategorySection;
