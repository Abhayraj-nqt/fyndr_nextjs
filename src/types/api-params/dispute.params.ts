import { DisputeListResponse } from "../api-response/dispute.response";
import { ActionResponse } from "../global";

export type DisputeListParams = (payload: {
  endDate: string;
  startDate: string;
  status: string[];
}) => Promise<ActionResponse<DisputeListResponse>>;
