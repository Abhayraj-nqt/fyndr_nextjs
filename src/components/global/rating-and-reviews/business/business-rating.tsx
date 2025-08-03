import React from "react";

import { onGetRatings } from "@/actions/business.action";
import { cn } from "@/lib/utils";

import DetailedRating, { RatingData } from "../detailed-rating";
import StarRating from "../star-rating";
import TotalReviews from "../total-reviews";

type Props = {
  bizId: number;
  compact?: boolean;
  comments?: boolean;
  className?: string;
};

const BusinessRatings = async ({ bizId, compact, className }: Props) => {
  const { success, data } = await onGetRatings({
    params: {
      bizId,
    },
  });

  if (!success || !data) return null;

  const overallRating = data?.overallRating || 0;
  const totalReviews = data?.totalRatings || 0;
  const ratingMap = data?.ratingMap || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const ratings: RatingData[] = [
    { rating: 1, count: ratingMap[1] || 0 },
    { rating: 2, count: ratingMap[2] || 0 },
    { rating: 3, count: ratingMap[3] || 0 },
    { rating: 4, count: ratingMap[4] || 0 },
    { rating: 5, count: ratingMap[5] || 0 },
  ];

  if (compact) {
    return (
      <div className={cn(`flex items-center gap-3`, className)}>
        <StarRating outOf={5} rating={overallRating} allowHalf size={20} />{" "}
        <div className="body-3 text-black-60">{overallRating} out of 5 </div>
        <TotalReviews totalReviews={totalReviews} />
      </div>
    );
  }

  return (
    <DetailedRating
      overallRating={overallRating}
      totalReviews={totalReviews}
      ratings={ratings}
    />
  );
};

export default BusinessRatings;
