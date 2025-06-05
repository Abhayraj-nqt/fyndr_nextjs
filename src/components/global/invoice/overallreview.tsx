import React from "react";

import { ReviewOverviews } from "@/types/api-response/review.response";

import ReviewStars from "./reviewstars";
import Stars from "../ratings/stars";

type OverallReviewResponse = {
  disable: boolean;
  reviewsOverview: ReviewOverviews;
  rating: number;
  text: string;
  totalRatings: string;
  onClick?: () => void;
  onStarsClick?: () => void;
};

const Overallreview: React.FC<OverallReviewResponse> = ({
  disable,
  reviewsOverview,
  rating,
  text,
  totalRatings,
  onClick,
  onStarsClick,
}) => {
  console.log("inside compoent", reviewsOverview);

  console.log("rating",rating);
  console.log("total rating ", totalRatings);
  return (
    <div>
      {reviewsOverview && (
        <div className="flex flex-col ">
          <div>
            {/* <ReviewStars
              onStarsClick={onStarsClick}
              disable={disable}
              rating={rating}
            /> */}
            <Stars ratings={Number(rating)} />
          </div>
          <div className="pt-2 text-base font-normal leading-5 text-black-70 md:text-sm">
            {rating}
            {text}
          </div>
          <div
            onClick={onClick}
            className="cursor-pointer pt-2 text-base font-normal leading-5  text-primary md:text-sm"
          >
            {totalRatings}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overallreview;
