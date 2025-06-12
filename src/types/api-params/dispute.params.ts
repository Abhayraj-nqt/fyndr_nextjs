import {
  DisputeReasonResponse,
  RaiseDisputeResponse,
} from "../api-response/dispute.response";
import { RaiseDisputePayload } from "../dispute-response";
import { ActionResponse } from "../global";

export type GetDisputeReasonsProps = () => Promise<
  ActionResponse<DisputeReasonResponse>
>;

export type UpdateDisputeStatusProps = (
  invoiceId: number,
  payload: RaiseDisputePayload
) => Promise<ActionResponse<RaiseDisputeResponse>>;
