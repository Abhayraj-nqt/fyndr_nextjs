"use client";

import React, { useState } from "react";

import { CATEGORY_ICON } from "@/constants";
import { cn, getCategoryIcon } from "@/lib/utils";

import CategoryCard from "./cards/category-card";
import { Button } from "../../../components/ui/button";

type Props = {
  categories: CategoryProps[];
};

const Categories = ({ categories }: Props) => {
  const [clickedMore, setClickedMore] = useState<boolean>(false);

  const handleClickMore = () => {
    setClickedMore((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.slice(0, 10).map((category) => (
        <CategoryCard
          key={category.objid}
          categoryName={category.name}
          icon={getCategoryIcon(category.name)}
        />
      ))}
      {clickedMore &&
        categories
          .slice(10)
          .map((category) => (
            <CategoryCard
              key={category.objid}
              categoryName={category.name}
              icon={CATEGORY_ICON.get(category.name.toLowerCase())}
            />
          ))}
      <Button
        className={cn(
          `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
          "hover:bg-primary-100 text-primary-500 bg-primary-100"
        )}
        onClick={() => handleClickMore()}
      >
        {clickedMore ? "Less" : "More"}
      </Button>
    </div>
  );
};

export default Categories;
