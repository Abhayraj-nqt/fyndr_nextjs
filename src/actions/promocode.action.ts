import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { VerifyPromocode } from "@/types/api-params/promocode.params";

export const onVerifyPromocode: VerifyPromocode = async (params) => {
  const { code, codeType, countryId, isBusiness } = params;

  const endpoint = `${API_BASE_URL}/identity/verify?isBusiness=${isBusiness}&code=${code}&countryId=${countryId}&codeType=${codeType}`;

  return _get(endpoint);
};
