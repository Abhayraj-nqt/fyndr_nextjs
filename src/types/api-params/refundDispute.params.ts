import { RefundDisputeResponse } from "../api-response/refundDispute.response";
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
