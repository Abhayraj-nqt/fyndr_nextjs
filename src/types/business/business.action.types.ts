import { ActionResponse } from "../global";
import {
  GetCommentsParams,
  GetRatingsParams,
  ReplyToCommentParams,
  ReportToCommentParams,
  SubmitReviewParams,
} from "./business.params";
import {
  GetCommentsResponse,
  GetRatingsResponse,
  ReplyToCommentResponse,
  ReportToCommentResponse,
  SubmitReviewResponse,
} from "./business.response";

export type GetRatings = ({
  params,
}: GetRatingsParams) => Promise<ActionResponse<GetRatingsResponse>>;

export type GetComments = ({
  params,
}: GetCommentsParams) => Promise<ActionResponse<GetCommentsResponse>>;

export type ReplyToComment = ({
  params,
  payload,
  options,
}: ReplyToCommentParams) => Promise<ActionResponse<ReplyToCommentResponse>>;

export type ReportToComment = ({
  params,
  payload,
  options,
}: ReportToCommentParams) => Promise<ActionResponse<ReportToCommentResponse>>;

export type SubmitReview = ({
  payload,
  options,
}: SubmitReviewParams) => Promise<ActionResponse<SubmitReviewResponse>>;
