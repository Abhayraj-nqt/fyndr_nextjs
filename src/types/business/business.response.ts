import { Comment } from "./business.types";

export type GetRatingsResponse = {
  bizId: number;
  overallRating: number;
  ratingMap: { 1: number; 2: number; 3: number; 4: number; 5: number };
  totalRatings: number;
};

export type GetCommentsResponse = {
  comments: Comment[];
  count: number;
  last: boolean;
};

export type ReplyToCommentResponse = {
  message: string;
};

export type ReportToCommentResponse = {
  message: string;
};
