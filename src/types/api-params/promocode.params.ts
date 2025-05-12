import { VerifyPromocodeResponse } from "../api-response/promocode.response";
import { ActionResponse } from "../global";

export type VerifyPromocode = (params: {
  isBusiness: boolean;
  code: string;
  countryId: number;
  codeType: "REDEEM_PROMOCODE";
}) => Promise<ActionResponse<VerifyPromocodeResponse>>;
