import { ActionResponse } from "../global";
import { MakePaymentParams } from "./payment.params";
import { MakePaymentResponse } from "./payment.response";

export type MakePayment = ({
  payload,
}: MakePaymentParams) => Promise<ActionResponse<MakePaymentResponse>>;
