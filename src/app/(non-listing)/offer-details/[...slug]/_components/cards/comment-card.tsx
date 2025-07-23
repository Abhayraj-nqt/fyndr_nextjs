import Image from "next/image";
import React from "react";

import StarRating from "@/components/global/ratings/star-rating";
// import Stars from "@/components/global/ratings/stars";
// import UserAvatar from "@/components/global/user-avatar";
// import { getTimeStamp } from "@/lib/utils/date";
import { Comment } from "@/types/business/business.types";
import { Campaign } from "@/types/campaign/campaign.types";

import ReplyCard from "./reply-card";
import Metric from "../sections/rating-and-reviews-section/metric";
import ReplyReportSection from "../sections/rating-and-reviews-section/reply-report-section";

type Props = {
  comment: Comment;
  business: Campaign["biz"];
  qrCode: string;
};

const CommentCard = ({ comment, business, qrCode }: Props) => {
  const data = new Date(comment.createdDt);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative flex flex-col gap-6 rounded-10 bg-primary-0.5 p-4">
      <div className="flex w-fit flex-col gap-2">
        {/* <div className="flex items-center gap-4">
          <div className="heading-7 flex-center gap-3 text-black-60">
            <UserAvatar name={`${comment.user.firstName}`} className="size-8" />
            <div>
              {comment.user.firstName} {comment.user.lastName}
            </div>
          </div>
          <div className="body-1 text-black-50">
            {" • "}
            {getTimeStamp(new Date(comment.createdDt))}
          </div>
        </div> */}
        <Metric
          name={`${comment.user.firstName} ${comment.user.lastName}`}
          alt={`${comment.commentId}`}
          value={`${comment.user.firstName} ${comment.user.lastName}`}
          // title={`• ${getTimeStamp(new Date(comment.createdDt))}`}
          title={`• ${formattedDate}`}
          textStyles="body-medium"
        />
        {/* <Stars outOf={5} ratings={comment.rating} /> */}
        <StarRating allowHalf outOf={5} rating={comment.rating} size={20} />
      </div>
      {comment.images && comment.images.length > 0 && (
        <div className="no-scrollbar flex gap-4 overflow-x-scroll">
          {comment.images.map((imgURL, i) => (
            <Image
              key={`${comment.commentId}-${i}`}
              src={imgURL}
              alt={comment?.firstName || "user-review"}
              height={50}
              width={100}
              className="h-24 w-36 rounded-10"
            />
          ))}
        </div>
      )}
      <div className="body-1 flex flex-col gap-4 rounded-10 bg-primary-10 p-4 text-black-70">
        <div>{comment.review}</div>
        {comment.commentThread && comment.commentThread.length > 0 && (
          <div className="no-scrollbar flex max-h-56 flex-col gap-4 overflow-y-scroll">
            {comment.commentThread.map((item) => (
              <ReplyCard
                key={item.createdDt}
                name={business.bizName}
                imgUrl={business.mainLogo}
                reply={item.reply}
                createdAt={item.createdDt}
              />
            ))}
          </div>
        )}
      </div>
      <ReplyReportSection
        business={business}
        comment={comment}
        qrCode={qrCode}
      />
    </div>
  );
};

export default CommentCard;
