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
  onStarsClick?: () =>void
};

const Overallreview: React.FC<OverallReviewResponse> = ({
  disable,
  reviewsOverview,
  rating,
  text,
  totalRatings,
  onClick,
  onStarsClick
}) => {
  console.log("inside compoent", reviewsOverview);

  console.log("total rating ",totalRatings)
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
            <Stars 
           
             ratings={Number(rating)}
            />

            
            
          </div>
          <div className="font-normal text-base leading-5 text-[#4d4d4d] pt-2 md:text-sm">
            {rating}
            {text}
          </div>
          <div
            onClick={onClick}
            className="font-normal text-base leading-5 text-[#257cdb] pt-2  cursor-pointer md:text-sm"
          >
        {totalRatings}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overallreview;
