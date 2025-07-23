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
  options: {
    validatePath: string;
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
  options: {
    validatePath: string;
  };
};

export type SubmitReviewParams = {
  payload: {
    businessId: number;
    images: {
      image: string;
      imageType: string;
    }[];
    invoiceId: null;
    rating: number;
    text: string;
    userId: number;
  };
  options: {
    validatePath: string;
  };
};
