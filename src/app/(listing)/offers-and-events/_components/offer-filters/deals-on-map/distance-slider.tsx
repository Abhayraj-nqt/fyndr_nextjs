"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { formUrlQuery } from "@/lib/utils/url";

const DEFAULT_RANGE = 50;
const MIN = 20;
const MAX = 100;

const DistanceSlider = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("dist") || DEFAULT_RANGE;

  const initialRange: number = Math.max(Number(filterParams), MIN);

  const [range, setRange] = useState<number>(initialRange);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (range) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "dist",
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
    <div className="">
      <p className="body-1-medium my-4 flex flex-col text-black-heading">
        Range ({range} miles)
      </p>
      <div>
        <Slider
          defaultValue={[50]}
          max={MAX}
          min={MIN}
          step={1}
          className={``}
          onValueChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DistanceSlider;
