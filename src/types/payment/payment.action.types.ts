import { ActionResponse } from "../global";
import { VerifyPaymentParams } from "./payment.params";
import { VerifyPaymentResponse } from "./payment.response";

export type VerifyPayment = ({
  payload,
}: VerifyPaymentParams) => Promise<ActionResponse<VerifyPaymentResponse>>;
