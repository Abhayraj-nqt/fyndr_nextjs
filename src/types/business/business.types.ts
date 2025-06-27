export type Comment = {
  commentId: number;
  commentThread: {
    createdDt: string;
    reply: string;
  }[];
  createdDt: string;
  images: string[];
  isReportingAllowed: boolean;
  rating: number;
  reportedComments:
    | null
    | {
        createdDt: string;
        reportedComment: string;
      }[];
  review: string;
  user: { firstName: string; lastName: string };
  firstName: string;
  lastName: string;
  verifiedUser: boolean;
};
