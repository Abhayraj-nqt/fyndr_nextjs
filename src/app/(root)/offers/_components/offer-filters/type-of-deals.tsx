"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { TYPES_OF_DEALS } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const TypeOfDeals = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("types");

  const initialSelected = filterParams ? filterParams.split(",") : ["ALL"];

  const [selectedDealTypes, setSelectedDealTypes] =
    useState<string[]>(initialSelected);

  const handleCheckboxChange = (dealType: string) => {
    let newSelectedTypes = [...selectedDealTypes];

    if (dealType === "ALL") {
      if (!newSelectedTypes.includes(dealType)) {
        newSelectedTypes = ["ALL"];
      }
    } else if (newSelectedTypes.includes(dealType)) {
      newSelectedTypes = newSelectedTypes.filter((item) => item !== dealType);
    } else {
      newSelectedTypes.push(dealType);
    }

    if (newSelectedTypes.length > 1 && newSelectedTypes.includes("ALL")) {
      newSelectedTypes = newSelectedTypes.filter((item) => item !== "ALL");
    }

    if (newSelectedTypes.length === 0) newSelectedTypes = ["ALL"];

    setSelectedDealTypes(newSelectedTypes);

    let newUrl = "";

    if (newSelectedTypes.length === 0) {
      // If no checkboxes are selected, remove the "types" query parameter
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["types"],
      });
    } else {
      // If checkboxes are selected, update the URL with the selected types
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "types",
        value: newSelectedTypes.join(","),
      });
    }

    router.push(newUrl);
  };

  return (
    <section>
      <h4 className="paragraph-semibold mb-4 text-primary-900">
        Type of deals
      </h4>
      <div className="space-y-4 px-2">
        {TYPES_OF_DEALS.map((item) => (
          <div key={item.label} className="body-medium flex items-center gap-2">
            <Checkbox
              id={item.label}
              className="data-[state=checked]:bg-primary-900"
              value={item.value}
              onCheckedChange={() => handleCheckboxChange(item.value)}
              checked={selectedDealTypes.includes(item.value)}
            />
            <label htmlFor={item.label} className="cursor-pointer leading-none">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TypeOfDeals;
