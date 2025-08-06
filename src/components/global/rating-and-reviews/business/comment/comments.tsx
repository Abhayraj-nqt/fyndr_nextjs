import React from "react";

import { onGetComments } from "@/actions/business.action";
import Pagination from "@/components/global/pagination";
import { cn } from "@/lib/utils";
import { Campaign } from "@/types/campaign/campaign.types";

import CommentCard from "./comment-card";

type Props = {
  sortBy: "RATING" | "CREATED_DT";
  business: Campaign["biz"];
  orderBy: "ASC" | "DESC";
  enablePagination?: boolean;
  page?: number;
  qrCode: string;
};

const Comments = async ({
  business,
  orderBy = "ASC",
  sortBy = "RATING",
  enablePagination = false,
  page = 1,
  qrCode,
}: Props) => {
  const { success, data } = await onGetComments({
    params: {
      bizId: business.bizid,
      orderBy,
      page: !enablePagination ? 1 : page,
      pgSize: 10,
      sortBy,
    },
  });

  if (!success || !data) return null;

  const comments = data.comments;

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div
        className={cn(
          "flex w-full flex-col gap-4",
          enablePagination ? "pb-16" : ""
        )}
      >
        {comments.map((comment) => (
          <CommentCard
            business={business}
            key={comment.commentId}
            comment={comment}
            qrCode={qrCode}
          />
        ))}
      </div>
      {enablePagination ? (
        <>
          <Pagination
            count={data.count}
            isLast={data.last}
            page={Number(page)}
            showRowSelector={false}
            pageSize={10}
            className="fixed inset-x-0 bottom-0 rounded-b-10 bg-white p-4 shadow-pagination"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
