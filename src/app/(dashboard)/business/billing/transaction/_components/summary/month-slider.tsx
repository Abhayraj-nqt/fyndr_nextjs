"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { formUrlQuery } from "@/lib/url";

const DEFAULT_RANGE = 1;
const MIN = 1;
const MAX = 12;

const MonthSlider = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("month") || DEFAULT_RANGE;

  const initialRange: number = Math.max(Number(filterParams), MIN);

  const [range, setRange] = useState<number>(initialRange);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (range) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "month",
          value: range.toString(),
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [range, router, searchParams]);

  const handleChange = (value: number[]) => {
    if (value.length > 0) {
      setRange(value[0]);
    }
  };

  return (
    <>
      <Slider
        value={[range]}
        min={MIN}
        max={MAX}
        step={1}
        onValueChange={handleChange}
        className="w-full"
      />
      <span className="mt-1 text-right text-sm">
        Past {range} {range > 1 ? "Months" : "Month"}
      </span>
    </>
  );
};

export default MonthSlider;
