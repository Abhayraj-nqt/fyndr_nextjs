"use client";

import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { CATEGORY_ICON_MAP } from "@/constants";
import { cn } from "@/lib/utils";
import { getCategoryIcon } from "@/lib/utils/campaign";
import { Category } from "@/types/category/category.types";

import CategoryCard from "./cards/category-card";

type Props = {
  categories: Category[];
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
          alt={category.name}
        />
      ))}
      {clickedMore &&
        categories
          .slice(10)
          .map((category) => (
            <CategoryCard
              key={category.objid}
              categoryName={category.name}
              icon={CATEGORY_ICON_MAP.get(category.name.toLowerCase())}
            />
          ))}
      <Button
        className={
          cn(
            "!rounded-full border border-secondary-20 px-4 py-2 gap-2 body-3 transition duration-300",
            "hover:border-secondary-20 hover:scale-105"
          )
          // `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
          // "hover:bg-primary-10 text-primary bg-primary-10"
        }
        variant="primary-dark"
        stdHeight
        onClick={() => handleClickMore()}
      >
        {clickedMore ? "Less" : "More"}
      </Button>
    </div>
  );
};

export default Categories;
