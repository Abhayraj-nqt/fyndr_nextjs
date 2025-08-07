import { API_GATEWAY_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { MakePayment } from "@/types/payment/payment.action.types";

export const onMakePayment: MakePayment = async ({ payload }) => {
  const endpoint = `${API_GATEWAY_URL}/payment/secure/payV2`;

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
