import React from "react";

import { onGetRatings } from "@/actions/business.action";
import Ratings, { RatingData } from "@/components/global/ratings/ratings";

type Props = {
  bizId: number;
};

const BusinessRatings = async ({ bizId }: Props) => {
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

  return (
    <Ratings
      overallRating={overallRating}
      totalReviews={totalReviews}
      ratings={ratings}
    />
  );
};

export default BusinessRatings;
