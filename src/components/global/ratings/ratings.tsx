import { Star } from "lucide-react";
import React from "react";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type RatingData = {
  rating: 1 | 2 | 3 | 4 | 5;
  count: number;
};

type Props = {
  overallRating: number;
  totalReviews: number;
  ratings: RatingData[];
  className?: string;
};

const Ratings = ({
  overallRating = 0,
  ratings = [
    {
      rating: 1,
      count: 0,
    },
    {
      rating: 2,
      count: 0,
    },
    {
      rating: 3,
      count: 0,
    },
    {
      rating: 4,
      count: 0,
    },
    {
      rating: 5,
      count: 0,
    },
  ],
  totalReviews = 10,
  className = "",
}: Props) => {
  const getBarWidth = (count: number) => {
    return (count / totalReviews) * 100;
  };

  const getBarColor = (rating: number) => {
    switch (rating) {
      case 5:
        return "#008B0E";
      case 4:
        return "#00CC14";
      case 3:
        return "#FFD600";
      case 2:
        return "#FF8A00";
      case 1:
        return "#F10000";
      default:
        return "#4D4D4D";
    }
  };

  return (
    <div className="w-full">
      <div className={cn("grid grid-cols-5", className)}>
        <div className="col-span-1 content-center justify-self-end text-black-80">
          <div className="text-center text-[64px] font-semibold leading-[100%]">
            {overallRating.toFixed(1)}
          </div>
          <div className="heading-6-bold text-center">Out of 5</div>
        </div>
        <div className="col-span-1 justify-self-center">
          <Separator
            orientation="vertical"
            className="h-32 w-px bg-secondary-20"
          />
        </div>
        <div className="col-span-3 w-full">
          {ratings
            .sort((a, b) => b.rating - a.rating)
            .map((item) => {
              const percentage = getBarWidth(item.count);
              const barColor = getBarColor(item.rating);
              const count = item.count;
              return (
                <div
                  key={item.rating}
                  className="flex-center flex w-full gap-2"
                >
                  <div className="flex-center heading-7-bold gap-1 text-black-70">
                    <span className="flex-center">{item.rating}</span>{" "}
                    <Star size={16} fill="#4d4d4d " />
                  </div>
                  <div className="flex-center w-full gap-2">
                    <Progress
                      value={percentage}
                      className={cn(
                        `h-[5px] bg-black-20`,
                        `[&>div]:bg-[${barColor}]`
                      )}
                      indicatorColor={barColor}
                    />
                    <span className="min-w-4">{count}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
