export type GetRatingsParams = {
  params: {
    bizId: number;
  };
};

export type GetCommentsParams = {
  params: {
    bizId: number;
    pgSize: number;
    orderBy: "ASC" | "DESC";
    sortBy: "RATING" | "CREATED_DT";
    page: number;
  };
};

export type ReplyToCommentParams = {
  params: {
    commentId: number;
  };
  payload: {
    businessId: number;
    reply: string;
  };
};

export type ReportToCommentParams = {
  params: {
    commentId: number;
  };
  payload: {
    businessId: number;
    reportMessage: string;
  };
};
