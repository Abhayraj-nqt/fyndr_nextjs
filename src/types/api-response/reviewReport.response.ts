type ReportCommentDetail = {
  commentId: number;
  businessName: string;
  businessEmail: string;
  commentedBy: string;
  rating: number;
  reportedDt: string;
  email: string;
};

type ReportedCommentsResponse = {
  last: boolean;
  reportCommentDetails: ReportCommentDetail[];
  count: number;
};
