"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { removeKeysFromUrlQuery, formUrlQuery } from "@/lib/utils/url";

type Props = {
  categories: CategoryProps[];
  filterType: "checkbox" | "radio";
};

const CategoryList = ({ categories, filterType }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("categories");
  const query = searchParams.get("query");

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

  const handleRadioChange = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "query",
      value,
    });

    router.push(newUrl);
  };

  if (filterType === "radio") {
    return (
      <RadioGroup
        value={query || query?.toLowerCase() || undefined}
        onValueChange={handleRadioChange}
        className="space-y-4 px-2"
      >
        {categories.map((category) => (
          <div key={category.objid} className="flex items-center gap-2">
            <RadioGroupItem
              value={category.name.toLowerCase()}
              id={category.objid.toString()}
            />
            <Label
              htmlFor={category.objid.toString()}
              className="body-3 cursor-pointer leading-none text-black-80"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  return (
    <div className="space-y-4 px-2">
      {categories.map((category) => (
        <div key={category.objid} className="flex items-center gap-2">
          <Checkbox
            id={`${category.objid}`}
            className="data-[state=checked]:bg-secondary"
            value={category.objid}
            onCheckedChange={() => handleCheckboxChange(category.objid)}
            checked={selectedCategory.includes(category.objid)}
          />
          <Label
            htmlFor={`${category.objid}`}
            className="body-3 cursor-pointer leading-none text-black-80"
          >
            {category.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
