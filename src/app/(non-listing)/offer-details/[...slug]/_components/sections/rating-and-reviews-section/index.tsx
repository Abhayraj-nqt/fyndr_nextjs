import { PencilLine } from "lucide-react";
import React, { Suspense } from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import ReviewSubmitModal from "@/components/global/ratings/review-submit-modal";
import { Campaign } from "@/types/campaign/campaign.types";

import BusinessRatings from "./business-ratings";
import Comments from "./comments";
import RatingsSorterSelect from "./ratings-sorter-select";

type Props = {
  business: Campaign["biz"];
  sortBy: "RATING" | "CREATED_DT";
  orderBy: "ASC" | "DESC";
};

const RatingAndReviewsSection = ({ business, orderBy, sortBy }: Props) => {
  return (
    <DefaultCard className="flex w-full flex-col gap-6 p-6">
      <h2 className="heading-7-medium mb-2 text-secondary">
        Ratings & Reviews
      </h2>
      <Suspense fallback={"Loading..."}>
        <BusinessRatings bizId={business.bizid} />
      </Suspense>
      <div className="flex-between">
        <div className="flex flex-col gap-1">
          {/* <div className="heading-7">{business.bizName}</div>
          <Stars outOf={6} ratings={overallRating} /> */}
        </div>
        <ReviewSubmitModal
          trigger={
            <Button variant="primary-dark">
              <PencilLine /> Write a review
            </Button>
          }
        />
      </div>
      <div className="flex-between gap-4">
        <div className="w-full max-w-96">
          <RatingsSorterSelect />
        </div>
        <div className="body-1-medium cursor-pointer text-primary">See all</div>
      </div>
      <Suspense fallback={"Loading..."}>
        <Comments business={business} orderBy={orderBy} sortBy={sortBy} />
      </Suspense>
    </DefaultCard>
  );
};

export default RatingAndReviewsSection;
