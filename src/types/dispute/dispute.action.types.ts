import { ActionResponse } from "../global";
import { UpdateDisputeStatusPropsParams } from "./dispute.params";
import { DisputeReasonResponse } from "./dispute.response";
import { RaiseDisputeResponse } from "./dispute.types";

export type GetDisputeReasonsProps = () => Promise<
  ActionResponse<DisputeReasonResponse>
>;

export type UpdateDisputeStatusProps = (
  props: UpdateDisputeStatusPropsParams
) => Promise<ActionResponse<RaiseDisputeResponse>>;
