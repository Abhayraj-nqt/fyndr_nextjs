"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { TYPES_OF_DEALS } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils/url";

const TypeOfDeals = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("types");
  const [isPending, startTransition] = useTransition();

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

    startTransition(() => {
      let newUrl = "";

      if (newSelectedTypes.length === 0) {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["types"],
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "types",
          value: newSelectedTypes.join(","),
        });
      }

      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <section>
      <h4 className="body-1-medium mb-4 text-black-heading">Type of deals</h4>
      <div className="space-y-4 px-2">
        {TYPES_OF_DEALS.map((item) => (
          <div
            key={item.label}
            className="body-3 flex items-center gap-2 text-black-80"
          >
            <Checkbox
              id={item.label}
              className="data-[state=checked]:bg-secondary"
              value={item.value}
              onCheckedChange={() => handleCheckboxChange(item.value)}
              checked={selectedDealTypes.includes(item.value)}
              disabled={isPending} // Prevent rapid clicking
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
