"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { removeKeysFromUrlQuery, formUrlQuery } from "@/lib/url";

type Props = {
  categories: CategoryProps[];
};

const CategoryList = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("categories");

  const initialSelected = filterParams
    ? filterParams
        .split(",")
        .filter((item) => item.length > 0)
        .map((item) => Number(item))
    : [];

  const [selectedCategory, setSelectedCategory] =
    useState<number[]>(initialSelected);

  const handleCheckboxChange = (categoryId: number) => {
    let newSelectedCategory = [...selectedCategory];

    if (newSelectedCategory.includes(categoryId)) {
      newSelectedCategory = newSelectedCategory.filter(
        (item) => item !== categoryId
      );
    } else {
      newSelectedCategory.push(categoryId);
    }

    setSelectedCategory(newSelectedCategory);

    let newUrl = "";

    if (newSelectedCategory.length === 0) {
      // If no checkboxes are selected, remove the "types" query parameter
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["categories"],
      });
    } else {
      // If checkboxes are selected, update the URL with the selected types
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "categories",
        value: newSelectedCategory.join(","),
      });
    }

    router.push(newUrl);
  };

  return (
    <div className="space-y-4 px-2">
      {categories.map((category) => (
        <div
          key={category.objid}
          className="body-medium flex items-center gap-2"
        >
          <Checkbox
            id={`${category.objid}`}
            className="data-[state=checked]:bg-primary-900"
            value={category.objid}
            onCheckedChange={() => handleCheckboxChange(category.objid)}
            checked={selectedCategory.includes(category.objid)}
          />
          <label
            htmlFor={`${category.objid}`}
            className="cursor-pointer leading-none"
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
