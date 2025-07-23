import { API_GATEWAY_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { VerifyPayment } from "@/types/payment/payment.action.types";

export const onVerifyPayment: VerifyPayment = async ({ payload }) => {
  const endpoint = `${API_GATEWAY_URL}/payment/secure/payV2`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
