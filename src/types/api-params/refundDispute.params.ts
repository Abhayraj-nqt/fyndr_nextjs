import {
  DisputeCommentsListResponse,
  RefundDisputeResponse,
} from "../api-response/refundDispute.response";
import { ActionResponse } from "../global";

export type RefundDisputeParams = (payload: {
  disputeId: number;
  refundAmt: number;
  paymentId: number;
  reason: string;
  refundApplicationFee: boolean;
  reverseTransfer: boolean;
  remarks: string;
}) => Promise<ActionResponse<RefundDisputeResponse>>;

export type DisputeCommentParams = (params: {
  disputeId: number;
}) => Promise<ActionResponse<DisputeCommentsListResponse>>;

export type DisputeCommenttParams = (payload: {
  disputeId: number;
  userId: number;
  comment: string;
}) => Promise<ActionResponse<DisputeCommentsListResponse>>;
