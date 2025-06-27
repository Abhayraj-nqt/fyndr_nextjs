import { ActionResponse } from "../global";
import {
  GetCommentsParams,
  GetRatingsParams,
  ReplyToCommentParams,
  ReportToCommentParams,
} from "./business.params";
import {
  GetCommentsResponse,
  GetRatingsResponse,
  ReplyToCommentResponse,
  ReportToCommentResponse,
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
}: ReplyToCommentParams) => Promise<ActionResponse<ReplyToCommentResponse>>;

export type ReportToComment = ({
  params,
  payload,
}: ReportToCommentParams) => Promise<ActionResponse<ReportToCommentResponse>>;
