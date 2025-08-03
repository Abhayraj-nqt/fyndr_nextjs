import { PencilLine } from "lucide-react";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import BusinessRatings from "@/components/global/rating-and-reviews/business/business-rating";
import Comments from "@/components/global/rating-and-reviews/business/comment/comments";
import RatingSorter from "@/components/global/rating-and-reviews/business/rating-sorter";
import ReviewSubmitModal from "@/components/global/ratings/review-submit-modal";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign/campaign.types";

import AllReviewsModal from "./all-reviews-modal";

export type RatingsAndReviewsProps = {
  business: Campaign["biz"];
  qrCode: string;
  sortBy: "RATING" | "CREATED_DT";
  orderBy: "ASC" | "DESC";
  page?: number;
  className?: string;
  showSeeAllComments?: boolean;
  showHeading?: boolean;
  enableCommentPagination?: boolean;
};

const RatingAndReviewsSection = async ({
  business,
  qrCode,
  orderBy,
  sortBy,
  page = 1,
  className,
  showSeeAllComments = true,
  showHeading = true,
  enableCommentPagination = false,
}: RatingsAndReviewsProps) => {
  const session = await auth();

  return (
    <DefaultCard className={cn("flex w-full flex-col gap-6 p-6", className)}>
      {showHeading && (
        <h2 className="heading-7-medium mb-2 text-secondary">
          Ratings & Reviews
        </h2>
      )}
      <Suspense fallback={"Loading..."}>
        <BusinessRatings bizId={business.bizid} />
      </Suspense>
      <div className="flex-between">
        <div className="flex flex-col gap-1">
          {/* <div className="heading-7">{business.bizName}</div>
          <Stars outOf={6} ratings={overallRating} /> */}
        </div>
        {session && business.bizid !== session?.user.bizid ? (
          <ReviewSubmitModal
            trigger={
              <Button variant="primary-dark">
                <PencilLine /> Write a review
              </Button>
            }
            bizId={business.bizid}
            bizName={business.bizName}
            qrCode={qrCode}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex-between gap-4">
        <div className="w-full max-w-96">
          <RatingSorter />
        </div>
        {showSeeAllComments && (
          <AllReviewsModal
            trigger={
              <div className="body-1-medium cursor-pointer text-primary">
                See all
              </div>
            }
            business={business}
            page={page}
            qrCode={qrCode}
          />
        )}
      </div>
      <Suspense fallback={"Loading..."}>
        <Comments
          business={business}
          orderBy={orderBy}
          sortBy={sortBy}
          enablePagination={enableCommentPagination}
          page={page}
          qrCode={qrCode}
        />
      </Suspense>
    </DefaultCard>
  );
};

export default RatingAndReviewsSection;
