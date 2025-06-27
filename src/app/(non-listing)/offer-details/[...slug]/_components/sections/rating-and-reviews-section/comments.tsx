import React from "react";

import { onGetComments } from "@/actions/business.action";
import { Campaign } from "@/types/campaign/campaign.types";

import CommentCard from "../../cards/comment-card";

type Props = {
  sortBy: "RATING" | "CREATED_DT";
  business: Campaign["biz"];
  orderBy: "ASC" | "DESC";
};

const Comments = async ({
  business,
  orderBy = "ASC",
  sortBy = "RATING",
}: Props) => {
  const { success, data } = await onGetComments({
    params: {
      bizId: business.bizid,
      orderBy,
      page: 1,
      pgSize: 10,
      sortBy,
    },
  });

  if (!success || !data) return null;

  const comments = data.comments;

  return (
    <div className="flex w-full flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard
          business={business}
          key={comment.commentId}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default Comments;
